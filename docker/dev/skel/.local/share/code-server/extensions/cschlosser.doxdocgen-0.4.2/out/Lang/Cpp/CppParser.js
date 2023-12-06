"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const CppArgument_1 = require("./CppArgument");
const CppDocGen_1 = require("./CppDocGen");
const CppParseTree_1 = require("./CppParseTree");
const CppToken_1 = require("./CppToken");
/**
 *
 * Parses C code for methods and signatures
 *
 * @export
 * @class CParser
 * @implements {ICodeParser}
 */
class CppParser {
    /**
     * Get the casing of a specified text
     *
     * @private
     * @param {string} name Text to check
     * @param {number} validateFrom Check if only a substr is the same casing as the whole string.
     *                              Set to 0 to disable check.
     * @returns {CasingType} Detected type of casing
     *
     * @memberOf CppParser
     */
    static checkCasing(name, validateFrom) {
        let containsUnderscores = name.indexOf("_") !== -1;
        if (containsUnderscores) {
            containsUnderscores = name.indexOf("_") !== name.length - 1; // last character _ may be Google style
        }
        // first letter upper case
        let methodCasing;
        let match = name.match("^([_|\\d|]*[A-Z]).+");
        if (match !== null) {
            match = name.match("^([A-Z|_|\\d]{2,})");
            if (match !== null) {
                methodCasing = containsUnderscores ? CppDocGen_1.CasingType.SCREAMING_SNAKE : CppDocGen_1.CasingType.UPPER;
            }
            else {
                methodCasing = containsUnderscores ? CppDocGen_1.CasingType.uncertain : CppDocGen_1.CasingType.Pascal;
            }
        }
        else {
            methodCasing = containsUnderscores ? CppDocGen_1.CasingType.snake : CppDocGen_1.CasingType.camel;
        }
        if (validateFrom > 0 && methodCasing !== CppDocGen_1.CasingType.uncertain) {
            // validate after
            switch (methodCasing) {
                case CppDocGen_1.CasingType.SCREAMING_SNAKE: {
                    // Take the leading _ after removing the characters into consideration
                    const testCasing = this.checkCasing(name.substr(validateFrom + 1), 0);
                    // screaming or upper
                    if (testCasing !== CppDocGen_1.CasingType.SCREAMING_SNAKE && testCasing !== CppDocGen_1.CasingType.UPPER) {
                        methodCasing = CppDocGen_1.CasingType.uncertain;
                    }
                    break;
                }
                case CppDocGen_1.CasingType.snake: {
                    // Take the leading _ after removing the characters into consideration
                    const textCheck = name.substr(validateFrom + 1);
                    const testCasing = this.checkCasing(textCheck, 0);
                    // snake
                    if (testCasing !== CppDocGen_1.CasingType.snake) {
                        if (textCheck.match("([a-z\\d]+)") === null) {
                            methodCasing = CppDocGen_1.CasingType.uncertain;
                        }
                    }
                    break;
                }
                case CppDocGen_1.CasingType.Pascal:
                case CppDocGen_1.CasingType.camel: {
                    const testCasing = this.checkCasing(name.substr(validateFrom), 0);
                    // pascal
                    if (testCasing !== CppDocGen_1.CasingType.Pascal) {
                        methodCasing = CppDocGen_1.CasingType.uncertain;
                    }
                    break;
                }
                case CppDocGen_1.CasingType.UPPER: {
                    const testCasing = this.checkCasing(name.substr(validateFrom), 0);
                    // upper
                    if (name.substr(validateFrom).match("([A-Z\\d]+)") === null) {
                        methodCasing = CppDocGen_1.CasingType.uncertain;
                    }
                    break;
                }
                default: {
                    break; // No op
                }
            }
        }
        return methodCasing;
    }
    constructor(cfg) {
        this.cfg = cfg;
        this.typeKeywords = [
            "constexpr",
            "const",
            "struct",
            "enum",
        ];
        this.stripKeywords = [
            "final",
            "static",
            "inline",
            "friend",
            "virtual",
            "extern",
            "explicit",
            "class",
            "override",
            "typename",
        ];
        this.attributes = [
            "noexcept",
            "throw",
            "alignas",
        ];
        // Non type keywords will be stripped from the final return type.
        this.keywords = this.typeKeywords.concat(this.stripKeywords);
        this.lexerVocabulary = {
            ArraySubscript: (x) => (x.match("^\\[[^\\[]*?\\]") || [])[0],
            Arrow: (x) => (x.match("^->") || [])[0],
            Assignment: (x) => {
                if (!x.match("^=")) {
                    return undefined;
                }
                const nesters = new Map([
                    ["<", ">"], ["(", ")"], ["{", "}"], ["[", "]"],
                ]);
                for (let i = 0; i < x.length; i++) {
                    const v = nesters.get(x[i]);
                    if (v !== undefined) {
                        const startEndOffset = this.GetSubExprStartEnd(x, i, x[i], v);
                        if (startEndOffset[1] === 0) {
                            return undefined;
                        }
                        i = startEndOffset[1] - 1;
                    }
                    else if (x[i] === "\"" || x[i] === "'") {
                        // Check if raw literal. Since those may have unescaped characters
                        // but require ()
                        if (x[i - 1] !== "R") {
                            // Skip to next end of the string or char literal.
                            let found = false;
                            for (let j = i + 1; j < x.length; j++) {
                                if (x[j] === x[i] && x[j - 1] !== "\\") {
                                    found = true;
                                    i = j;
                                    break;
                                }
                            }
                            if (!found) {
                                return undefined;
                            }
                        }
                        else {
                            const startEndOffset = this.GetSubExprStartEnd(x, i, "(", ")");
                            if (startEndOffset[1] === 0) {
                                return undefined;
                            }
                            i = startEndOffset[1];
                        }
                    }
                    else if (x[i] === "," || x[i] === ")") {
                        return x.slice(0, i);
                    }
                }
                return x;
            },
            Attribute: (x) => {
                const attribute = (x.match("^\\[\\[[^\\[]*?\\]\\]") || [])[0];
                if (attribute !== undefined) {
                    return attribute;
                }
                const foundIndex = this.attributes
                    .findIndex((n) => x.startsWith(n) === true);
                if (foundIndex === -1) {
                    return undefined;
                }
                if (x.slice(this.attributes[foundIndex].length).trim().startsWith("(") === false) {
                    return x.slice(0, this.attributes[foundIndex].length);
                }
                const startEndOffset = this.GetSubExprStartEnd(x, 0, "(", ")");
                return startEndOffset[1] === 0 ? undefined : x.slice(0, startEndOffset[1]);
            },
            CloseParenthesis: (x) => (x.match("^\\)") || [])[0],
            Comma: (x) => (x.match("^,") || [])[0],
            CommentBlock: (x) => {
                if (x.startsWith("/*") === false) {
                    return undefined;
                }
                let closeOffset = x.indexOf("*/");
                closeOffset = closeOffset === -1 ? x.length : closeOffset + 2;
                return x.slice(0, closeOffset);
            },
            CommentLine: (x) => {
                if (x.startsWith("//") === false) {
                    return undefined;
                }
                let closeOffset = x.indexOf("\n");
                closeOffset = closeOffset === -1 ? x.length : closeOffset + 1;
                return x.slice(0, closeOffset);
            },
            CurlyBlock: (x) => {
                if (x.startsWith("{") === false) {
                    return undefined;
                }
                const startEndOffset = this.GetSubExprStartEnd(x, 0, "{", "}");
                return startEndOffset[1] === 0 ? undefined : x.slice(0, startEndOffset[1]);
            },
            Ellipsis: (x) => (x.match("^\\.\\.\\.") || [])[0],
            OpenParenthesis: (x) => (x.match("^\\(") || [])[0],
            Pointer: (x) => (x.match("^\\*") || [])[0],
            Reference: (x) => (x.match("^&") || [])[0],
            Symbol: (x) => {
                // Handle specifiers
                const specifierFound = this.attributes
                    .findIndex((n) => x.startsWith(n) === true);
                if (specifierFound !== -1) {
                    return undefined;
                }
                // Handle decltype special cases.
                if (x.startsWith("decltype") === true) {
                    const startEndOffset = this.GetSubExprStartEnd(x, 0, "(", ")");
                    return startEndOffset[1] === 0 ? undefined : x.slice(0, startEndOffset[1]);
                }
                // Special case group up the fundamental types with the modifiers.
                // tslint:disable-next-line:max-line-length
                let reMatch = (x.match("^(unsigned|signed|short|long|int|char|double|float)(\\s*(unsigned|signed|short|long|int|char|double|float)\\s)+(?!a-z|A-Z|:|_|\\d)") || [])[0];
                if (reMatch !== undefined) {
                    return reMatch.trim();
                }
                // Regex to handle a part of all symbols and includes all symbol special cases.
                // This is run in a loop because template parts of a symbol can't be parsed using regex.
                // Also check if it doesn't start with a number since those are always literals
                // tslint:disable-next-line:max-line-length
                const symbolRegex = "^([a-z|A-Z|:|_|~|\\d]*operator\\s*(\"\"_[a-z|A-Z|_|\\d]+|>>=|<<=|->\\*|\\+=|-=|\\*=|\\/=|%=|\\^=|&=|\\|=|<<|>>|==|!=|<=|->|>=|&&|\\|\\||\\+\\+|--|\\+|-|\\*|\\/|%|\\^|&|\||~|!|=|<|>|,|\\[\\s*\\]|\\(\\s*\\)|(new|delete)\\s*(\\[\\s*\\]){0,1}){0,1}|[a-z|A-Z|:|_|~|\\d]+)";
                reMatch = (x.match(symbolRegex) || [])[0];
                if (reMatch === undefined || x.match(/^\d/)) {
                    return undefined;
                }
                let symbol = reMatch;
                while (true) {
                    if (x.slice(symbol.length).trim().startsWith("<") === true) {
                        const offsets = this.GetSubExprStartEnd(x, symbol.length, "<", ">");
                        if (offsets[1] === 0) {
                            return undefined;
                        }
                        symbol = x.slice(0, offsets[1]);
                    }
                    reMatch = (x.slice(symbol.length).match(symbolRegex) || [])[0];
                    if (reMatch === undefined) {
                        break;
                    }
                    symbol += reMatch;
                }
                return symbol.replace(/\s+$/, "");
            },
        };
        this.specialCase = CppDocGen_1.SpecialCase.none;
        this.commentType = CppDocGen_1.CommentType.method;
    }
    /**
     * @inheritdoc
     */
    Parse(activeEdit) {
        this.activeEditor = activeEdit;
        this.activeSelection = this.activeEditor.selection.active;
        let line = "";
        try {
            line = this.getLogicalLine();
        }
        catch (err) {
            // console.dir(err);
        }
        const templateArgs = [];
        let args = [new CppArgument_1.CppArgument(), []];
        if (activeEdit.selection.active.line === 0 && line.length === 0) { // head of file
            this.commentType = CppDocGen_1.CommentType.file;
        }
        else { // method
            // template parsing is simpler by using heuristics rather then CppTokenizing first.
            while (line.startsWith("template")) {
                const template = this.GetTemplate(line);
                templateArgs.push.apply(templateArgs, this.GetArgsFromTemplate(template));
                line = line.slice(template.length, line.length + 1).trim();
            }
            try {
                args = this.GetReturnAndArgs(line);
            }
            catch (err) {
                // console.dir(err);
            }
        }
        if (args[0].name !== null) {
            const methodName = args[0].name;
            if (methodName.toLowerCase().startsWith("get")) {
                this.casingType = CppParser.checkCasing(methodName, 3);
                if (this.casingType !== CppDocGen_1.CasingType.uncertain) {
                    this.specialCase = CppDocGen_1.SpecialCase.getter;
                }
            }
            else if (methodName.toLowerCase().startsWith("set")) {
                this.casingType = CppParser.checkCasing(methodName, 3);
                if (this.casingType !== CppDocGen_1.CasingType.uncertain) {
                    this.specialCase = CppDocGen_1.SpecialCase.setter;
                }
            }
            else if (methodName.toLowerCase().startsWith("create")) {
                this.casingType = CppParser.checkCasing(methodName, 6);
                if (this.casingType !== CppDocGen_1.CasingType.uncertain) {
                    this.specialCase = CppDocGen_1.SpecialCase.factoryMethod;
                }
            }
        }
        return new CppDocGen_1.CppDocGen(this.activeEditor, this.activeSelection, this.cfg, templateArgs, args[0], args[1], this.specialCase, this.commentType, this.casingType);
    }
    /***************************************************************************
                                    Implementation
     ***************************************************************************/
    getLogicalLine() {
        let logicalLine = "";
        let nextLine = new vscode_1.Position(this.activeSelection.line + 1, this.activeSelection.character);
        let nextLineTxt = this.activeEditor.document.lineAt(nextLine.line).text.trim();
        // VSCode may enter a * on itself, we don"t want that in our method
        if (nextLineTxt === "*") {
            nextLineTxt = "";
        }
        let currentNest = 0;
        logicalLine = nextLineTxt;
        // Get method end line
        let linesToGet = this.cfg.Generic.linesToGet;
        while (linesToGet-- > 0) { // Check for end of expression.
            nextLine = new vscode_1.Position(nextLine.line + 1, nextLine.character);
            nextLineTxt = this.activeEditor.document.lineAt(nextLine.line).text.trim();
            // Check if method has finished if curly brace is opened while
            // nesting is occuring.
            for (let i = 0; i < nextLineTxt.length; i++) {
                if (nextLineTxt[i] === "(") {
                    currentNest++;
                }
                else if (nextLineTxt[i] === ")") {
                    currentNest--;
                }
                else if (nextLineTxt[i] === "{" && currentNest === 0) {
                    logicalLine += "\n" + nextLineTxt.slice(0, i);
                    return logicalLine.replace(/^\s+|\s+$/g, "");
                }
                else if ((nextLineTxt[i] === ";"
                    || (nextLineTxt[i] === ":" && nextLineTxt[i - 1] !== ":" && nextLineTxt[i + 1] !== ":"))
                    && currentNest === 0) {
                    logicalLine += "\n" + nextLineTxt.slice(0, i);
                    return logicalLine.replace(/^\s+|\s+$/g, "");
                }
            }
            // Head of file probably
            if (nextLineTxt.startsWith("#include")) {
                this.commentType = CppDocGen_1.CommentType.file;
                return "";
            }
            logicalLine += "\n" + nextLineTxt;
        }
        throw new Error("More than " + linesToGet + " lines were read from editor and no end of expression was found.");
    }
    Tokenize(expression) {
        const CppTokens = [];
        expression = expression.replace(/^\s+|\s+$/g, "");
        while (expression.length !== 0) {
            const matches = Object.keys(this.lexerVocabulary)
                .map((k) => new CppToken_1.CppToken(CppToken_1.CppTokenType[k], this.lexerVocabulary[k](expression)))
                .filter((t) => t.value !== undefined);
            if (matches.length === 0) {
                throw new Error("Next CppToken couldn\'t be determined: " + expression);
            }
            else if (matches.length > 1) {
                throw new Error("Multiple matches for next CppToken: " + expression);
            }
            CppTokens.push(matches[0]);
            expression = expression.slice(matches[0].value.length, expression.length).replace(/^\s+|\s+$/g, "");
        }
        return CppTokens;
    }
    GetReturnAndArgs(line) {
        if (this.GetArgumentFromCastOperator(line) !== null) {
            const opFunc = new CppArgument_1.CppArgument();
            opFunc.name = this.GetArgumentFromCastOperator(line)[1].trim();
            opFunc.type.nodes.push(new CppToken_1.CppToken(CppToken_1.CppTokenType.Symbol, opFunc.name));
            return [opFunc, []];
        }
        // CppTokenize rest of expression and remove comment CppTokens;
        const CppTokens = this.Tokenize(line)
            .filter((t) => t.type !== CppToken_1.CppTokenType.CommentBlock)
            .filter((t) => t.type !== CppToken_1.CppTokenType.CommentLine);
        // Create hierarchical tree based on the parenthesis.
        const tree = CppParseTree_1.CppParseTree.CreateTree(CppTokens).Compact();
        // return argument.
        const func = this.GetArgument(tree);
        // check if it is a constructor or descructor since these have no name.
        // Also reverse the assignment of type and name.
        if (func.name === null) {
            if (func.type.nodes.length !== 1) {
                throw new Error("Too many symbols found for constructor/descructor.");
            }
            else if (func.type.nodes[0] instanceof CppParseTree_1.CppParseTree) {
                throw new Error("One node found with just a CppParseTree. Malformed input.");
            }
            if (line.includes("~")) {
                this.specialCase = CppDocGen_1.SpecialCase.destructor;
            }
            else {
                this.specialCase = CppDocGen_1.SpecialCase.constructor;
            }
            func.name = func.type.nodes[0].value;
            func.type.nodes = [];
        }
        // Get arguments list as a CppParseTree and create arguments from them.
        const params = this.GetArgumentList(tree)
            .map((a) => this.GetArgument(a));
        return [func, params];
    }
    RemoveUnusedTokens(tree) {
        tree = tree.Copy();
        // First slice of everything after assignment since that will not be used.
        const assignmentIndex = tree.nodes
            .findIndex((n) => n instanceof CppToken_1.CppToken && n.type === CppToken_1.CppTokenType.Assignment);
        if (assignmentIndex !== -1) {
            tree.nodes = tree.nodes.slice(0, assignmentIndex);
        }
        // Specifiers aren't needed so remove them.
        tree.nodes = tree.nodes
            .filter((n) => n instanceof CppParseTree_1.CppParseTree || (n instanceof CppToken_1.CppToken && n.type !== CppToken_1.CppTokenType.Attribute));
        return tree;
    }
    GetArgumentList(tree) {
        const args = [];
        tree = this.RemoveUnusedTokens(tree);
        let cursor = tree;
        while (this.IsFuncPtr(cursor.nodes) === true) {
            cursor = cursor.nodes.find((n) => n instanceof CppParseTree_1.CppParseTree);
        }
        const argTree = cursor.nodes.find((n) => n instanceof CppParseTree_1.CppParseTree);
        if (argTree === undefined) {
            throw new Error("Function arguments not found.");
        }
        // Split the argument tree on commas
        let arg = new CppParseTree_1.CppParseTree();
        for (const node of argTree.nodes) {
            if (node instanceof CppToken_1.CppToken && node.type === CppToken_1.CppTokenType.Comma) {
                args.push(arg);
                arg = new CppParseTree_1.CppParseTree();
            }
            else {
                arg.nodes.push(node);
            }
        }
        if (arg.nodes.length > 0) {
            args.push(arg);
        }
        return args;
    }
    IsFuncPtr(nodes) {
        return nodes.filter((n) => n instanceof CppParseTree_1.CppParseTree).length === 2;
    }
    StripNonTypeNodes(tree) {
        tree.nodes = tree.nodes
            // All strippable keywords.
            .filter((n) => {
            return !(n instanceof CppToken_1.CppToken
                && n.type === CppToken_1.CppTokenType.Symbol
                && this.stripKeywords.find((k) => k === n.value) !== undefined);
        });
    }
    GetArgumentFromCastOperator(line) {
        const copy = line;
        return copy.match("[explicit|\\s]*\\s*operator\\s*([a-zA-Z].*)\\(\\).*");
    }
    GetArgumentFromTrailingReturn(tree, startTrailingReturn) {
        const argument = new CppArgument_1.CppArgument();
        // Find index of auto prior to the first CppParseTree.
        // If auto is not found something is going wrong since trailing return
        // requires auto.
        let autoIndex = -1;
        for (let i = 0; i < tree.nodes.length; i++) {
            const node = tree.nodes[i];
            if (node instanceof CppParseTree_1.CppParseTree) {
                break;
            }
            if (node.type === CppToken_1.CppTokenType.Symbol && node.value === "auto") {
                autoIndex = i;
                break;
            }
        }
        if (autoIndex === -1) {
            throw new Error("Function declaration has trailing return but type is not auto.");
        }
        // Get symbol between auto and CppParseTree which is the argument name. It also may not be a keyword.
        for (let i = autoIndex + 1; i < tree.nodes.length; i++) {
            const node = tree.nodes[i];
            if (node instanceof CppParseTree_1.CppParseTree) {
                break;
            }
            if (node.type === CppToken_1.CppTokenType.Symbol && this.keywords.find((k) => k === node.value) === undefined) {
                argument.name = node.value;
                break;
            }
        }
        argument.type.nodes = tree.nodes.slice(startTrailingReturn + 1, tree.nodes.length);
        this.StripNonTypeNodes(argument.type);
        return argument;
    }
    GetArgumentFromFuncPtr(tree) {
        const argument = new CppArgument_1.CppArgument();
        argument.type = tree;
        let cursor = tree;
        while (this.IsFuncPtr(cursor.nodes) === true) {
            cursor = cursor.nodes.find((n) => n instanceof CppParseTree_1.CppParseTree);
        }
        // Remove CppParseTree. This can be if it is a function declaration.
        const argumentsIndex = cursor.nodes.findIndex((n) => n instanceof CppParseTree_1.CppParseTree);
        if (argumentsIndex !== -1) {
            cursor.nodes.splice(argumentsIndex, 1);
        }
        // Find first symbol that is the argument name.
        // Remove it from the tree and set the name to the argument name
        for (let i = 0; i < cursor.nodes.length; i++) {
            const node = cursor.nodes[i];
            if (node instanceof CppParseTree_1.CppParseTree) {
                continue;
            }
            if (node.type === CppToken_1.CppTokenType.Symbol && this.keywords.find((k) => k === node.value) === undefined) {
                argument.name = node.value;
                cursor.nodes.splice(i, 1);
            }
        }
        this.StripNonTypeNodes(argument.type);
        return argument;
    }
    GetDefaultArgument(tree) {
        const argument = new CppArgument_1.CppArgument();
        for (const node of tree.nodes) {
            if (node instanceof CppParseTree_1.CppParseTree) {
                break;
            }
            const symbolCount = argument.type.nodes
                .filter((n) => n instanceof CppToken_1.CppToken)
                .map((n) => n)
                .filter((n) => n.type === CppToken_1.CppTokenType.Symbol)
                .filter((n) => this.keywords.find((k) => k === n.value) === undefined)
                .length;
            if (node.type === CppToken_1.CppTokenType.Symbol
                && this.keywords.find((k) => k === node.value) === undefined) {
                if (symbolCount === 1 && argument.name === null) {
                    argument.name = node.value;
                    continue;
                }
                else if (symbolCount > 1) {
                    throw new Error("Too many non keyword symbols.");
                }
            }
            argument.type.nodes.push(node);
        }
        this.StripNonTypeNodes(argument.type);
        return argument;
    }
    GetArgument(tree) {
        // Copy tree structure leave original untouched.
        const copy = this.RemoveUnusedTokens(tree);
        // Special case with only ellipsis. C style variadic arguments
        if (copy.nodes.length === 1) {
            const node = copy.nodes[0];
            if (node instanceof CppToken_1.CppToken && node.type === CppToken_1.CppTokenType.Ellipsis) {
                const argument = new CppArgument_1.CppArgument();
                argument.name = node.value;
                return argument;
            }
        }
        // Check if it is has a trailing return.
        const startTrailingReturn = copy.nodes
            .findIndex((t) => t instanceof CppToken_1.CppToken ? t.type === CppToken_1.CppTokenType.Arrow : false);
        // Special case trailing return.
        if (startTrailingReturn !== -1) {
            return this.GetArgumentFromTrailingReturn(copy, startTrailingReturn);
        }
        // Handle function pointers
        if (this.IsFuncPtr(copy.nodes) === true) {
            return this.GetArgumentFromFuncPtr(copy);
        }
        // Handle member pointers
        for (let token = 0; token < copy.nodes.length - 1; token++) {
            const firstToken = copy.nodes[token];
            const secondToken = copy.nodes[token + 1];
            if (firstToken.type === CppToken_1.CppTokenType.Symbol && secondToken.type === CppToken_1.CppTokenType.Pointer &&
                firstToken.value.endsWith("::")) {
                firstToken.type = CppToken_1.CppTokenType.MemberPointer;
            }
        }
        return this.GetDefaultArgument(copy);
    }
    GetSubExprStartEnd(expression, startSearch, openExpr, closeExpr) {
        let openExprOffset = -1;
        let nestedCount = 0;
        for (let i = startSearch; i < expression.length; i++) {
            if (expression[i] === openExpr && openExprOffset === -1) {
                openExprOffset = i;
            }
            if (expression[i] === openExpr) {
                nestedCount++;
            }
            else if (expression[i] === closeExpr && nestedCount > 0) {
                nestedCount--;
            }
            if (expression[i] === closeExpr && nestedCount === 0 && openExprOffset !== -1) {
                return [openExprOffset, i + 1];
            }
        }
        return [0, 0];
    }
    GetTemplate(expression) {
        if (expression.startsWith("template") === false) {
            return "";
        }
        let startTemplateOffset = -1;
        for (let i = "template".length; i < expression.length; i++) {
            if (expression[i] === "<") {
                startTemplateOffset = i;
                break;
            }
            else if (expression[i] !== " ") {
                return "";
            }
        }
        if (startTemplateOffset === -1) {
            return "";
        }
        const [start, end] = this.GetSubExprStartEnd(expression, startTemplateOffset, "<", ">");
        return expression.slice(0, end);
    }
    GetArgsFromTemplate(template) {
        const args = [];
        if (template === "") {
            return args;
        }
        // Remove <> and add a comma to the end to remove edge case.
        template = template.slice(template.indexOf("<") + 1, template.lastIndexOf(">")).replace(/^\s+|\s+$/g, "") + ",";
        const nestedCounts = {
            "(": 0,
            "<": 0,
            "{": 0,
        };
        let lastSeparator = 0;
        for (let i = 0; i < template.length; i++) {
            const notInSubExpr = nestedCounts["<"] === 0
                && nestedCounts["("] === 0
                && nestedCounts["{"] === 0;
            if (notInSubExpr === true && template[i] === ",") {
                args.push(template.slice(lastSeparator + 1, i).replace(/^\s+|\s+$/g, ""));
            }
            else if (notInSubExpr === true && (template[i] === " " || template[i] === ".")) {
                lastSeparator = i;
            }
            if (template[i] === "(") {
                nestedCounts["("]++;
            }
            else if (template[i] === ")" && nestedCounts["("] > 0) {
                nestedCounts["("]--;
            }
            else if (template[i] === "<") {
                nestedCounts["<"]++;
            }
            else if (template[i] === ">" && nestedCounts["<"] > 0) {
                nestedCounts["<"]--;
            }
            else if (template[i] === "{") {
                nestedCounts["{"]++;
            }
            else if (template[i] === "}" && nestedCounts["{"] > 0) {
                nestedCounts["{"]--;
            }
        }
        return args;
    }
}
exports.default = CppParser;
//# sourceMappingURL=CppParser.js.map