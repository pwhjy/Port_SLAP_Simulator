"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const documentDecoration_1 = require("./documentDecoration");
const gutterIconManager_1 = require("./gutterIconManager");
const settings_1 = require("./settings");
class DocumentDecorationManager {
    constructor() {
        this.loadLanguages = require("prismjs/components/index.js");
        this.loadedLanguages = new Set();
        this.components = require("prismjs/components");
        this.supportedLanguages = new Set(Object.keys(this.components.languages));
        this.gutterIcons = new gutterIconManager_1.default();
        this.showError = true;
        this.documents = new Map();
    }
    Dispose() {
        this.documents.forEach((document, key) => {
            document.dispose();
        });
        this.gutterIcons.Dispose();
    }
    expandBracketSelection(editor) {
        const documentDecoration = this.getDocumentDecorations(editor.document);
        if (documentDecoration) {
            documentDecoration.expandBracketSelection(editor);
        }
    }
    undoBracketSelection(editor) {
        const documentDecoration = this.getDocumentDecorations(editor.document);
        if (documentDecoration) {
            documentDecoration.undoBracketSelection(editor);
        }
    }
    updateDocument(document) {
        const documentDecoration = this.getDocumentDecorations(document);
        if (documentDecoration) {
            documentDecoration.triggerUpdateDecorations();
        }
    }
    onDidOpenTextDocument(document) {
        const documentDecoration = this.getDocumentDecorations(document);
        if (documentDecoration) {
            documentDecoration.triggerUpdateDecorations();
        }
    }
    onDidChangeTextDocument(event) {
        const documentDecoration = this.getDocumentDecorations(event.document);
        if (documentDecoration) {
            documentDecoration.onDidChangeTextDocument(event.contentChanges);
        }
    }
    onDidCloseTextDocument(closedDocument) {
        const uri = closedDocument.uri.toString();
        const document = this.documents.get(uri);
        if (document !== undefined) {
            document.dispose();
            this.documents.delete(closedDocument.uri.toString());
        }
    }
    onDidChangeSelection(event) {
        const documentDecoration = this.getDocumentDecorations(event.textEditor.document);
        if (documentDecoration &&
            (documentDecoration.settings.highlightActiveScope ||
                documentDecoration.settings.showBracketsInGutter ||
                documentDecoration.settings.showVerticalScopeLine ||
                documentDecoration.settings.showHorizontalScopeLine)) {
            documentDecoration.triggerUpdateScopeDecorations(event);
        }
    }
    updateAllDocuments() {
        vscode_1.window.visibleTextEditors.forEach((editor) => {
            this.updateDocument(editor.document);
        });
    }
    getDocumentDecorations(document) {
        if (!this.isValidDocument(document)) {
            return;
        }
        const uri = document.uri.toString();
        let documentDecorations = this.documents.get(uri);
        if (documentDecorations === undefined) {
            try {
                const languages = this.getPrismLanguageID(document.languageId);
                const primaryLanguage = languages[0];
                if (!this.supportedLanguages.has(primaryLanguage)) {
                    return;
                }
                const settings = new settings_1.default(primaryLanguage, this.gutterIcons, document.uri);
                if (settings.excludedLanguages.has(document.languageId)) {
                    return;
                }
                this.loadLanguageOnce(primaryLanguage);
                documentDecorations = new documentDecoration_1.default(document, settings);
                this.documents.set(uri, documentDecorations);
            }
            catch (error) {
                if (error instanceof Error) {
                    if (this.showError) {
                        vscode_1.window.showErrorMessage("BracketPair Settings: " + error.message);
                        // Don't spam errors
                        this.showError = false;
                        setTimeout(() => {
                            this.showError = true;
                        }, 3000);
                    }
                }
                return;
            }
        }
        return documentDecorations;
    }
    getPrismLanguageID(languageID) {
        // Some VSCode language ids need to be mapped to match http://prismjs.com/#languages-list
        switch (languageID) {
            case "ahk": return ["autohotkey"];
            case "bat": return ["batch"];
            case "apex": return ["java"];
            case "gradle": return ["groovy"];
            case "html": return ["markup", "javascript"];
            case "javascriptreact": return ["jsx"];
            case "json5": return ["javascript"];
            case "jsonc": return ["javascript"];
            case "mathml": return ["markup"];
            case "nunjucks": return ["twig"];
            case "razor": return ["markup", "javascript", "csharp", "aspnet"]; // Workaround
            case "scad": return ["swift"]; // Workaround
            case "svg": return ["markup"];
            case "systemverilog": return ["verilog"];
            case "typescriptreact": return ["tsx"];
            case "vb": return ["vbnet"];
            case "vue": return ["markup", "javascript"];
            case "xml": return ["markup"];
            default: return [languageID];
        }
    }
    isValidDocument(document) {
        if (document === undefined || document.lineCount === 0 || document.uri.scheme === "vscode") {
            return false;
        }
        return true;
    }
    loadLanguageOnce(prismLanguageId) {
        if (this.loadedLanguages.has(prismLanguageId)) {
            return;
        }
        this.loadLanguages([prismLanguageId]);
        this.loadedLanguages.add(prismLanguageId);
    }
}
exports.default = DocumentDecorationManager;
//# sourceMappingURL=documentDecorationManager.js.map