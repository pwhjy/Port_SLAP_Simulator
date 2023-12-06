"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const Config_1 = require("./Config");
const CppParser_1 = require("./Lang/Cpp/CppParser");
/**
 *
 * Checks if the event matches the specified guidelines and if a parser exists for this language
 *
 * @export
 * @class CodeParserController
 */
class CodeParserController {
    /**
     * Creates an instance of CodeParserController
     *
     * @memberOf CodeParserController
     */
    constructor() {
        const subscriptions = [];
        // Hand off the event to the parser if a valid parser is found
        vscode_1.workspace.onDidChangeTextDocument((event) => {
            const activeEditor = vscode_1.window.activeTextEditor;
            if (activeEditor && event.document === activeEditor.document) {
                this.cfg = Config_1.Config.ImportFromSettings();
                this.onEvent(activeEditor, event.contentChanges[0]);
            }
        }, this, subscriptions);
        this.disposable = vscode_1.Disposable.from(...subscriptions);
    }
    /**
     *
     * Disposes of the subscriptions
     *
     * @memberOf CodeParserController
     */
    dispose() {
        this.disposable.dispose();
    }
    /***************************************************************************
                                    Implementation
     ***************************************************************************/
    check(activeEditor, event) {
        if (activeEditor === undefined || activeEditor == null ||
            event === undefined || event.text == null) {
            return false;
        }
        const activeSelection = activeEditor.selection.active;
        const activeLine = activeEditor.document.lineAt(activeSelection.line);
        const activeChar = activeLine.text.charAt(activeSelection.character);
        const startsWith = event.text.startsWith("\n") || event.text.startsWith("\r\n");
        // Check if enter was pressed. Note the !
        if (!((activeChar === "") && startsWith)) {
            return false;
        }
        // Check if currently in a comment block
        if (this.inComment(activeEditor, activeSelection.line)) {
            return false;
        }
        // Do not trigger when there's whitespace after the trigger sequence
        // tslint:disable-next-line:max-line-length
        const seq = "[\\s]*(" + this.cfg.C.triggerSequence.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + ")$";
        const match = activeLine.text.match(seq);
        if (match !== null) {
            const cont = match[1];
            return this.cfg.C.triggerSequence === cont;
        }
        else {
            return false;
        }
    }
    inComment(activeEditor, activeLine) {
        if (activeLine === 0) {
            return false;
        }
        const txt = activeEditor.document.lineAt(activeLine - 1).text.trim();
        if (!txt.startsWith("///") && !txt.startsWith("*") &&
            !txt.startsWith("/**") && !txt.startsWith("/*!")) {
            return false;
        }
        else {
            return true;
        }
    }
    onEvent(activeEditor, event) {
        if (!this.check(activeEditor, event)) {
            return null;
        }
        const lang = activeEditor.document.languageId;
        let parser;
        switch (lang) {
            case "c":
            case "cpp":
                parser = new CppParser_1.default(this.cfg);
                break;
            default:
                // tslint:disable-next-line:no-console
                console.log("No comments can be generated for language: " + lang);
                return null;
        }
        const currentPos = vscode_1.window.activeTextEditor.selection.active;
        const startReplace = new vscode_1.Position(currentPos.line, currentPos.character - this.cfg.C.triggerSequence.length);
        const nextLineText = vscode_1.window.activeTextEditor.document.lineAt(startReplace.line + 1).text;
        const endReplace = new vscode_1.Position(currentPos.line + 1, nextLineText.length);
        parser.Parse(activeEditor).GenerateDoc(new vscode_1.Range(startReplace, endReplace));
    }
}
exports.default = CodeParserController;
//# sourceMappingURL=CodeParserController.js.map