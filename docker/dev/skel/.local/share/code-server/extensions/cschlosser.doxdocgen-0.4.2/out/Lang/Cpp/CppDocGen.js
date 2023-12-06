"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const vscode_1 = require("vscode");
const CppParser = require("./CppParser");
const CppToken_1 = require("./CppToken");
var SpecialCase;
(function (SpecialCase) {
    SpecialCase[SpecialCase["none"] = 0] = "none";
    SpecialCase[SpecialCase["constructor"] = 1] = "constructor";
    SpecialCase[SpecialCase["destructor"] = 2] = "destructor";
    SpecialCase[SpecialCase["getter"] = 3] = "getter";
    SpecialCase[SpecialCase["setter"] = 4] = "setter";
    SpecialCase[SpecialCase["factoryMethod"] = 5] = "factoryMethod";
})(SpecialCase = exports.SpecialCase || (exports.SpecialCase = {}));
var CommentType;
(function (CommentType) {
    CommentType[CommentType["method"] = 0] = "method";
    CommentType[CommentType["file"] = 1] = "file";
})(CommentType = exports.CommentType || (exports.CommentType = {}));
var CasingType;
(function (CasingType) {
    CasingType[CasingType["Pascal"] = 0] = "Pascal";
    CasingType[CasingType["camel"] = 1] = "camel";
    CasingType[CasingType["snake"] = 2] = "snake";
    CasingType[CasingType["SCREAMING_SNAKE"] = 3] = "SCREAMING_SNAKE";
    CasingType[CasingType["UPPER"] = 4] = "UPPER";
    CasingType[CasingType["uncertain"] = 5] = "uncertain";
})(CasingType = exports.CasingType || (exports.CasingType = {}));
class CppDocGen {
    /**
     * @param  {TextEditor} actEdit Active editor window
     * @param  {Position} cursorPosition Where the cursor of the user currently is
     * @param  {string[]} templateParams The template parameters of the declaration.
     * @param  {CppArgument} func The type and name of the function to generate doxygen.
     *                          Doesn't contain anything if it is not a function.
     * @param  {CppArgument[]} params The parameters of the function. Doesn't contain anything if it is not a function.
     */
    constructor(actEdit, cursorPosition, cfg, templateParams, func, params, specialCase, commentType, casingType) {
        this.activeEditor = actEdit;
        this.cfg = cfg;
        this.templateParams = templateParams;
        this.func = func;
        this.params = params;
        this.specialCase = specialCase;
        this.commentType = commentType;
        this.smartTextLength = 0;
        this.casingType = casingType;
    }
    /**
     * @inheritdoc
     */
    GenerateDoc(rangeToReplace) {
        let comment = "";
        if (this.commentType === CommentType.file) {
            comment = this.generateFileDescription();
        }
        else if (this.commentType === CommentType.method) {
            comment = this.generateComment();
        }
        this.activeEditor.edit((editBuilder) => {
            editBuilder.replace(rangeToReplace, comment); // Insert the comment
        });
        // Set cursor to first DoxyGen command.
        this.moveCursurToFirstDoxyCommand(comment, rangeToReplace.start.line, rangeToReplace.start.character);
    }
    /***************************************************************************
                                    Implementation
     ***************************************************************************/
    getIndentation() {
        return this.activeEditor.document.lineAt(this.activeEditor.selection.start.line).text.match("^\\s*")[0];
    }
    getTemplatedString(replace, template, param) {
        return template.replace(replace, param);
    }
    getMultiTemplatedString(replace, template, param) {
        // For each replace entry, attempt to replace it with the corresponding param in the template
        for (let i = 0; i < replace.length; i++) {
            if (i < param.length) {
                template = template.replace(replace[i], param[i]);
            }
        }
        return template;
    }
    getSmartText() {
        if (!this.cfg.Generic.generateSmartText) {
            return "";
        }
        let val = "";
        let text = "";
        switch (this.specialCase) {
            case SpecialCase.constructor: {
                if (this.func.name === null) {
                    return "";
                }
                else {
                    const ctorText = this.func.name.trim();
                    this.casingType = CppParser.default.checkCasing(ctorText, 0);
                    val = this.splitCasing(ctorText).trim();
                    text = this.cfg.Cpp.ctorText;
                    break;
                }
            }
            case SpecialCase.destructor: {
                if (this.func.name === null) {
                    return "";
                }
                else {
                    const dtorText = this.func.name.replace("~", "").trim();
                    this.casingType = CppParser.default.checkCasing(dtorText, 0);
                    val = this.splitCasing(dtorText).trim();
                    text = this.cfg.Cpp.dtorText;
                    break;
                }
            }
            case SpecialCase.getter: {
                val = this.splitCasing(this.func.name.trim()).trim().substr(3).trim();
                text = this.cfg.C.getterText;
                break;
            }
            case SpecialCase.setter: {
                val = this.splitCasing(this.func.name.trim()).trim().substr(3).trim();
                text = this.cfg.C.setterText;
                break;
            }
            case SpecialCase.factoryMethod: {
                val = this.splitCasing(this.func.name.trim()).trim().substr(6).trim();
                text = this.cfg.C.factoryMethodText;
                break;
            }
            case SpecialCase.none:
            default: {
                return "";
            }
        }
        const str = this.getTemplatedString(this.cfg.nameTemplateReplace, text, val);
        this.smartTextLength = str.length;
        return str;
    }
    generateBrief(lines) {
        lines.push(this.getTemplatedString(this.cfg.textTemplateReplace, this.cfg.C.commentPrefix + this.cfg.Generic.briefTemplate, this.getSmartText()));
    }
    generateFromTemplate(lines, replace, template, templateWith) {
        let line = "";
        templateWith.forEach((element) => {
            // Ignore null values
            if (element !== null) {
                line = this.cfg.C.commentPrefix;
                line += this.getTemplatedString(replace, template, element);
                lines.push(line);
            }
        });
    }
    generateReturnParams() {
        if (this.cfg.Generic.includeTypeAtReturn === false) {
            return [""];
        }
        const params = [];
        // Check if return type is a pointer
        const ptrReturnIndex = this.func.type.nodes
            .findIndex((n) => n instanceof CppToken_1.CppToken && n.type === CppToken_1.CppTokenType.Pointer);
        // Special case for void functions.
        const voidReturnIndex = this.func.type.nodes
            .findIndex((n) => n instanceof CppToken_1.CppToken && n.type === CppToken_1.CppTokenType.Symbol && n.value === "void");
        // Special case for bool return type.
        const boolReturnIndex = this.func.type.nodes
            .findIndex((n) => n instanceof CppToken_1.CppToken && n.type === CppToken_1.CppTokenType.Symbol && n.value === "bool");
        if (boolReturnIndex !== -1 && this.cfg.Generic.boolReturnsTrueFalse === true) {
            params.push("true");
            params.push("false");
        }
        else if (voidReturnIndex !== -1 && ptrReturnIndex !== -1) {
            params.push(this.cfg.Generic.includeTypeAtReturn === true ? this.func.type.Yield() : "");
        }
        else if (voidReturnIndex === -1 && this.func.type.nodes.length > 0) {
            params.push(this.cfg.Generic.includeTypeAtReturn === true ? this.func.type.Yield() : "");
        }
        return params;
    }
    generateAuthorTag(lines) {
        if (this.cfg.Generic.authorTag.trim().length !== 0) {
            // Allow substitution of {author} and {email} only
            lines.push(this.cfg.C.commentPrefix +
                this.getMultiTemplatedString([this.cfg.authorTemplateReplace, this.cfg.emailTemplateReplace], this.cfg.Generic.authorTag, [this.cfg.Generic.authorName, this.cfg.Generic.authorEmail]));
        }
    }
    generateFilenameFromTemplate(lines) {
        if (this.cfg.File.fileTemplate.trim().length !== 0) {
            this.generateFromTemplate(lines, this.cfg.nameTemplateReplace, this.cfg.File.fileTemplate, [this.activeEditor.document.fileName.replace(/^.*[\\\/]/, "")]);
        }
    }
    generateVersionTag(lines) {
        if (this.cfg.File.versionTag.trim().length !== 0) {
            lines.push(this.cfg.C.commentPrefix + this.cfg.File.versionTag);
        }
    }
    generateCopyrightTag(lines) {
        // This currently only supports year substitution
        this.cfg.File.copyrightTag.forEach((element) => {
            this.generateFromTemplate(lines, this.cfg.yearTemplateReplace, element, [moment().format("YYYY")]);
        });
    }
    generateCustomTag(lines) {
        let dateFormat = "YYYY-MM-DD"; // Default to ISO standard if not defined
        if (this.cfg.Generic.dateFormat.trim().length !== 0) {
            dateFormat = this.cfg.Generic.dateFormat; // Overwrite with user format
        }
        // For each line of the customTag
        this.cfg.File.customTag.forEach((element) => {
            // Allow any of date, year, author, email to be replaced
            lines.push(this.cfg.C.commentPrefix +
                this.getMultiTemplatedString([this.cfg.authorTemplateReplace, this.cfg.emailTemplateReplace,
                    this.cfg.dateTemplateReplace, this.cfg.yearTemplateReplace], element, [this.cfg.Generic.authorName, this.cfg.Generic.authorEmail,
                    moment().format(dateFormat), moment().format("YYYY")]));
        });
    }
    generateDateFromTemplate(lines) {
        if (this.cfg.Generic.dateTemplate.trim().length !== 0 &&
            this.cfg.Generic.dateFormat.trim().length !== 0) {
            this.generateFromTemplate(lines, this.cfg.dateTemplateReplace, this.cfg.Generic.dateTemplate, [moment().format(this.cfg.Generic.dateFormat)]);
        }
    }
    insertFirstLine(lines) {
        if (this.cfg.C.firstLine.trim().length !== 0) {
            lines.push(this.cfg.C.firstLine);
        }
    }
    insertBrief(lines) {
        if (this.cfg.Generic.briefTemplate.trim().length !== 0) {
            this.generateBrief(lines);
        }
    }
    insertLastLine(lines) {
        if (this.cfg.C.lastLine.trim().length !== 0) {
            lines.push(this.cfg.C.lastLine);
        }
    }
    generateFileDescription() {
        const lines = [];
        this.insertFirstLine(lines);
        this.cfg.File.fileOrder.forEach((element) => {
            switch (element) {
                case "brief": {
                    this.insertBrief(lines);
                    break;
                }
                case "empty": {
                    lines.push(this.cfg.C.commentPrefix);
                    break;
                }
                case "file": {
                    this.generateFilenameFromTemplate(lines);
                    break;
                }
                case "version": {
                    this.generateVersionTag(lines);
                    break;
                }
                case "author": {
                    this.generateAuthorTag(lines);
                    break;
                }
                case "date": {
                    this.generateDateFromTemplate(lines);
                    break;
                }
                case "copyright": {
                    this.generateCopyrightTag(lines);
                    break;
                }
                case "custom": {
                    this.generateCustomTag(lines);
                    break;
                }
                default: {
                    break;
                }
            }
        });
        this.insertLastLine(lines);
        return lines.join("\n");
    }
    generateComment() {
        const lines = [];
        this.insertFirstLine(lines);
        this.cfg.Generic.order.forEach((element) => {
            switch (element) {
                case "brief": {
                    this.insertBrief(lines);
                    break;
                }
                case "empty": {
                    lines.push(this.cfg.C.commentPrefix);
                    break;
                }
                case "tparam": {
                    if (this.cfg.Cpp.tparamTemplate.trim().length !== 0 && this.templateParams.length > 0) {
                        this.generateFromTemplate(lines, this.cfg.paramTemplateReplace, this.cfg.Cpp.tparamTemplate, this.templateParams);
                    }
                    break;
                }
                case "param": {
                    if (this.cfg.Generic.paramTemplate.trim().length !== 0 && this.params.length > 0) {
                        const paramNames = this.params.map((p) => p.name);
                        // tslint:disable-next-line:max-line-length
                        this.generateFromTemplate(lines, this.cfg.paramTemplateReplace, this.cfg.Generic.paramTemplate, paramNames);
                    }
                    break;
                }
                case "return": {
                    if (this.cfg.Generic.returnTemplate.trim().length !== 0 && this.func.type !== null) {
                        const returnParams = this.generateReturnParams();
                        // tslint:disable-next-line:max-line-length
                        this.generateFromTemplate(lines, this.cfg.typeTemplateReplace, this.cfg.Generic.returnTemplate, returnParams);
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        });
        this.insertLastLine(lines);
        const comment = lines.join("\n" + this.getIndentation());
        return comment;
    }
    moveCursurToFirstDoxyCommand(comment, baseLine, baseCharacter) {
        // Find first offset of a new line in the comment. Since that's when the line where the first param starts.
        let line = baseLine;
        let character = comment.indexOf("\n");
        // If a first line is included find the 2nd line with a newline.
        if (this.cfg.C.firstLine.trim().length !== 0) {
            line++;
            const oldCharacter = character;
            character = comment.indexOf("\n", oldCharacter + 1) - oldCharacter;
        }
        // If newline is not found means no first param was found so Set to base line before the newline.
        if (character < 0) {
            line = baseLine;
            character = baseCharacter;
        }
        const to = new vscode_1.Position(line, character);
        this.activeEditor.selection = new vscode_1.Selection(to, to);
    }
    splitCasing(text) {
        if (!this.cfg.Generic.splitCasingSmartText) {
            return text;
        }
        let txt = text;
        let vals = [];
        switch (this.casingType) {
            case CasingType.SCREAMING_SNAKE: {
                txt = txt.toLowerCase();
            }
            case CasingType.snake: {
                vals = txt.split("_");
                break;
            }
            case CasingType.Pascal: {
                txt = txt.replace(/([A-Z0-9])/g, " $1");
                vals.push(txt);
                break;
            }
            case CasingType.camel: {
                txt = txt.replace(/([a-zA-Z0-9])(?=[A-Z])/g, "$1 ");
                vals.push(txt);
                break;
            }
            case CasingType.UPPER:
            case CasingType.uncertain:
            default: {
                return text;
            }
        }
        return vals.join(" ");
    }
}
exports.CppDocGen = CppDocGen;
//# sourceMappingURL=CppDocGen.js.map