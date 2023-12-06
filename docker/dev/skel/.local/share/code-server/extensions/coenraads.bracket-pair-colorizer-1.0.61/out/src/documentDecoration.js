"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Prism = require("prismjs");
const vscode = require("vscode");
const foundBracket_1 = require("./foundBracket");
const textLine_1 = require("./textLine");
class DocumentDecoration {
    constructor(document, settings) {
        // This program caches lines, and will only analyze linenumbers including or above a modified line
        this.lineToUpdateWhenTimeoutEnds = 0;
        this.lines = [];
        this.scopeDecorations = [];
        this.scopeSelectionHistory = [];
        // What have I created..
        this.stringStrategies = new Map();
        this.stringOrTokenArrayStrategies = new Map();
        this.settings = settings;
        this.document = document;
        this.largeFileRange = new vscode.Range(new vscode.Position(0, 0), new vscode.Position(5000, 0));
        const basicStringMatch = (content, lineIndex, charIndex, positions) => {
            return this.matchString(content, lineIndex, charIndex, positions);
        };
        // Match punctuation on all languages
        this.stringStrategies.set("punctuation", basicStringMatch);
        if (settings.prismLanguageID === "markup") {
            this.stringStrategies.set("attr-name", basicStringMatch);
        }
        if (settings.prismLanguageID === "powershell") {
            this.stringStrategies.set("namespace", basicStringMatch);
        }
        switch (settings.prismLanguageID) {
            case "abap":
            case "lua":
            case "pascal":
                this.stringStrategies.set("keyword", basicStringMatch);
                break;
            default: break;
        }
        if (settings.prismLanguageID === "markdown") {
            const markdownUrl = (array, lineIndex, charIndex, positions) => {
                // Input: ![Disabled](images/forceUniqueOpeningColorDisabled.png "forceUniqueOpeningColor Disabled")
                // [0]: ![Disabled](images/forceUniqueOpeningColorDisabled.png
                // [1]: "forceUniqueOpeningColor Disabled"
                // [2]: )
                return this.matchStringOrTokenArray(new Set([0, array.length - 1]), array, lineIndex, charIndex, positions);
            };
            this.stringOrTokenArrayStrategies.set("url", markdownUrl);
        }
    }
    dispose() {
        this.settings.dispose();
        this.disposeScopeDecorations();
    }
    onDidChangeTextDocument(contentChanges) {
        this.updateLowestLineNumber(contentChanges);
        this.triggerUpdateDecorations();
    }
    expandBracketSelection(editor) {
        const newSelections = [];
        editor.selections.forEach((selection) => {
            let selections = [];
            if (this.scopeSelectionHistory.length !== 0) {
                selections = this.scopeSelectionHistory[this.scopeSelectionHistory.length - 1];
            }
            else {
                this.scopeSelectionHistory.push(editor.selections);
            }
            const nextPos = this.document.validatePosition(selection.active.translate(0, 1));
            const nextScope = this.getScope(nextPos);
            if (nextScope) {
                const start = this.document.validatePosition(nextScope.open.range.start.translate(0, 1));
                const end = this.document.validatePosition(nextScope.close.range.end.translate(0, -1));
                newSelections.push(new vscode.Selection(start, end));
            }
        });
        if (newSelections.length > 0) {
            this.scopeSelectionHistory.push(newSelections);
            editor.selections = newSelections;
        }
    }
    undoBracketSelection(editor) {
        this.scopeSelectionHistory.pop();
        if (this.scopeSelectionHistory.length === 0) {
            return;
        }
        const scopes = this.scopeSelectionHistory[this.scopeSelectionHistory.length - 1];
        editor.selections = scopes;
    }
    // Lines are stored in an array, if line is requested outside of array bounds
    // add emptys lines until array is correctly sized
    getLine(index, document) {
        if (index < this.lines.length) {
            return this.lines[index];
        }
        else {
            if (this.lines.length === 0) {
                this.lines.push(new textLine_1.default(document.lineAt(0).text, this.settings, 0));
            }
            for (let i = this.lines.length; i <= index; i++) {
                const previousLine = this.lines[this.lines.length - 1];
                const newLine = new textLine_1.default(document.lineAt(i).text, this.settings, i, previousLine.copyMultilineContext());
                this.lines.push(newLine);
            }
            const lineToReturn = this.lines[this.lines.length - 1];
            return lineToReturn;
        }
    }
    triggerUpdateDecorations() {
        if (this.updateDecorationTimeout) {
            clearTimeout(this.updateDecorationTimeout);
        }
        this.updateDecorationTimeout = setTimeout(() => {
            this.updateDecorationTimeout = null;
            this.updateDecorations();
            if (this.nextScopeEvent) {
                this.updateScopeDecorations();
            }
        }, this.settings.timeOutLength);
    }
    triggerUpdateScopeDecorations(event) {
        this.nextScopeEvent = event;
        if (this.updateDecorationTimeout) {
            return;
        }
        if (this.updateScopeTimeout) {
            clearTimeout(this.updateScopeTimeout);
        }
        else {
            this.updateScopeDecorations();
        }
        this.updateScopeTimeout = setTimeout(() => {
            this.updateScopeTimeout = null;
            this.updateScopeDecorations();
        }, this.settings.timeOutLength);
    }
    updateScopeDecorations() {
        if (!this.nextScopeEvent) {
            return;
        }
        const event = this.nextScopeEvent;
        this.nextScopeEvent = undefined;
        if (event === this.previousScopeEvent) {
            return;
        }
        this.previousScopeEvent = event;
        if (this.settings.isDisposed) {
            return;
        }
        // console.time("updateScopeDecorations");
        this.disposeScopeDecorations();
        const scopes = new Set();
        event.selections.forEach((selection) => {
            const scope = this.getScope(selection.active);
            if (scope) {
                scopes.add(scope);
            }
        });
        for (const scope of scopes) {
            {
                if (this.settings.highlightActiveScope) {
                    const decoration = this.settings.createScopeBracketDecorations(scope.color);
                    event.textEditor.setDecorations(decoration, [scope.open.range, scope.close.range]);
                    this.scopeDecorations.push(decoration);
                }
            }
            if (this.settings.showBracketsInGutter) {
                if (scope.open.range.start.line === scope.close.range.start.line) {
                    const decoration = this.settings.createGutterBracketDecorations(scope.color, scope.open.character + scope.close.character);
                    event.textEditor.setDecorations(decoration, [scope.open.range, scope.close.range]);
                    this.scopeDecorations.push(decoration);
                }
                else {
                    const decorationOpen = this.settings.createGutterBracketDecorations(scope.color, scope.open.character);
                    event.textEditor.setDecorations(decorationOpen, [scope.open.range]);
                    this.scopeDecorations.push(decorationOpen);
                    const decorationClose = this.settings.createGutterBracketDecorations(scope.color, scope.close.character);
                    event.textEditor.setDecorations(decorationClose, [scope.close.range]);
                    this.scopeDecorations.push(decorationClose);
                }
            }
            if (this.settings.showBracketsInRuler) {
                const decoration = this.settings.createRulerBracketDecorations(scope.color);
                event.textEditor.setDecorations(decoration, [scope.open.range, scope.close.range]);
                this.scopeDecorations.push(decoration);
            }
            const lastWhiteSpaceCharacterIndex = this.document.lineAt(scope.close.range.start).firstNonWhitespaceCharacterIndex;
            const lastBracketStartIndex = scope.close.range.start.character;
            const lastBracketIsFirstCharacterOnLine = lastWhiteSpaceCharacterIndex === lastBracketStartIndex;
            let leftBorderColumn = Infinity;
            const tabSize = event.textEditor.options.tabSize;
            const position = this.settings.scopeLineRelativePosition ?
                Math.min(scope.close.range.start.character, scope.open.range.start.character) : 0;
            let leftBorderIndex = position;
            const start = scope.open.range.start.line + 1;
            const end = scope.close.range.start.line;
            // Start -1 because prefer draw line at current indent level
            for (let lineIndex = start - 1; lineIndex <= end; lineIndex++) {
                const line = this.document.lineAt(lineIndex);
                if (!line.isEmptyOrWhitespace) {
                    const firstCharIndex = line.firstNonWhitespaceCharacterIndex;
                    leftBorderIndex = Math.min(leftBorderIndex, firstCharIndex);
                    leftBorderColumn = Math.min(leftBorderColumn, this.calculateColumnFromCharIndex(line.text, firstCharIndex, tabSize));
                }
            }
            if (this.settings.showVerticalScopeLine) {
                const verticalLineRanges = [];
                const endOffset = lastBracketIsFirstCharacterOnLine ? end - 1 : end;
                for (let lineIndex = start; lineIndex <= endOffset; lineIndex++) {
                    const line = this.document.lineAt(lineIndex);
                    const linePosition = new vscode.Position(lineIndex, this.calculateCharIndexFromColumn(line.text, leftBorderColumn, tabSize));
                    const range = new vscode.Range(linePosition, linePosition);
                    const valid = line.text.length >= leftBorderIndex;
                    verticalLineRanges.push({ range, valid });
                }
                const safeFallbackPosition = new vscode.Position(start - 1, leftBorderIndex);
                this.setVerticalLineDecoration(scope, event, safeFallbackPosition, verticalLineRanges);
            }
            if (this.settings.showHorizontalScopeLine) {
                const underlineLineRanges = [];
                const overlineLineRanges = [];
                if (scope.open.range.start.line === scope.close.range.start.line) {
                    underlineLineRanges.push(new vscode.Range(scope.open.range.start, scope.close.range.end));
                }
                else {
                    const startLine = this.document.lineAt(scope.open.range.start.line);
                    const endLine = this.document.lineAt(scope.close.range.start.line);
                    const leftStartPos = new vscode.Position(scope.open.range.start.line, this.calculateCharIndexFromColumn(startLine.text, leftBorderColumn, tabSize));
                    const leftEndPos = new vscode.Position(scope.close.range.start.line, this.calculateCharIndexFromColumn(endLine.text, leftBorderColumn, tabSize));
                    underlineLineRanges.push(new vscode.Range(leftStartPos, scope.open.range.end));
                    if (lastBracketIsFirstCharacterOnLine) {
                        overlineLineRanges.push(new vscode.Range(leftEndPos, scope.close.range.end));
                    }
                    else {
                        underlineLineRanges.push(new vscode.Range(leftEndPos, scope.close.range.end));
                    }
                }
                if (underlineLineRanges) {
                    this.setUnderLineDecoration(scope, event, underlineLineRanges);
                }
                if (overlineLineRanges) {
                    this.setOverLineDecoration(scope, event, overlineLineRanges);
                }
            }
        }
        // console.timeEnd("updateScopeDecorations");
    }
    setOverLineDecoration(scope, event, overlineLineRanges) {
        const lineDecoration = this.settings.createScopeLineDecorations(scope.color, true, false, false, false);
        event.textEditor.setDecorations(lineDecoration, overlineLineRanges);
        this.scopeDecorations.push(lineDecoration);
    }
    setUnderLineDecoration(scope, event, underlineLineRanges) {
        const lineDecoration = this.settings.createScopeLineDecorations(scope.color, false, false, true, false);
        event.textEditor.setDecorations(lineDecoration, underlineLineRanges);
        this.scopeDecorations.push(lineDecoration);
    }
    setVerticalLineDecoration(scope, event, fallBackPosition, verticleLineRanges) {
        const offsets = [];
        const normalDecoration = this.settings.createScopeLineDecorations(scope.color, false, false, false, true);
        if (verticleLineRanges.length === 0) {
            return;
        }
        const normalRanges = verticleLineRanges.filter((e) => e.valid).map((e) => e.range);
        // Get first valid range, if non fall-back to opening position
        let aboveValidRange = new vscode.Range(fallBackPosition, fallBackPosition);
        for (const lineRange of verticleLineRanges) {
            if (lineRange.valid) {
                aboveValidRange = lineRange.range;
                break;
            }
        }
        /* Keep updating last valid range to keep offset distance minimum
         to prevent missing decorations when scrolling */
        for (const lineRange of verticleLineRanges) {
            if (lineRange.valid) {
                aboveValidRange = lineRange.range;
            }
            else {
                const offset = lineRange.range.start.line - aboveValidRange.start.line;
                offsets.push({ range: aboveValidRange, downOffset: offset });
            }
        }
        event.textEditor.setDecorations(normalDecoration, normalRanges);
        this.scopeDecorations.push(normalDecoration);
        offsets.forEach((offset) => {
            const decoration = this.settings.createScopeLineDecorations(scope.color, false, false, false, true, offset.downOffset);
            event.textEditor.setDecorations(decoration, [offset.range]);
            this.scopeDecorations.push(decoration);
        });
    }
    disposeScopeDecorations() {
        this.scopeDecorations.forEach((decoration) => {
            decoration.dispose();
        });
        this.scopeDecorations = [];
    }
    getScope(position) {
        for (let i = position.line; i < this.lines.length; i++) {
            const scope = this.lines[i].getScope(position);
            if (scope) {
                return scope;
            }
        }
    }
    updateLowestLineNumber(contentChanges) {
        for (const contentChange of contentChanges) {
            this.lineToUpdateWhenTimeoutEnds =
                Math.min(this.lineToUpdateWhenTimeoutEnds, contentChange.range.start.line);
        }
    }
    updateDecorations() {
        if (this.settings.isDisposed) {
            return;
        }
        // One document may be shared by multiple editors (side by side view)
        const editors = vscode.window.visibleTextEditors.filter((e) => this.document === e.document);
        if (editors.length === 0) {
            console.warn("No editors associated with document: " + this.document.fileName);
            return;
        }
        // console.time("updateDecorations");
        const lineNumber = this.lineToUpdateWhenTimeoutEnds;
        const amountToRemove = this.lines.length - lineNumber;
        // Remove cached lines that need to be updated
        this.lines.splice(lineNumber, amountToRemove);
        const languageID = this.settings.prismLanguageID;
        const text = this.document.getText(this.largeFileRange);
        let tokenized;
        try {
            tokenized = Prism.tokenize(text, Prism.languages[languageID]);
            if (!tokenized) {
                console.log("Could not tokenize document: " + this.document.fileName);
                return;
            }
        }
        catch (err) {
            console.warn(err);
            return;
        }
        const positions = [];
        this.parseTokenOrStringArray(tokenized, 0, 0, positions);
        positions.forEach((element) => {
            const currentLine = this.getLine(element.range.start.line, this.document);
            currentLine.addBracket(element);
        });
        this.colorDecorations(editors);
        // console.timeEnd("updateDecorations");
    }
    parseTokenOrStringArray(tokenized, lineIndex, charIndex, positions) {
        tokenized.forEach((token) => {
            if (token instanceof Prism.Token) {
                const result = this.parseToken(token, lineIndex, charIndex, positions);
                charIndex = result.charIndex;
                lineIndex = result.lineIndex;
            }
            else {
                const result = this.parseString(token, lineIndex, charIndex);
                charIndex = result.charIndex;
                lineIndex = result.lineIndex;
            }
        });
        return { lineIndex, charIndex };
    }
    parseString(content, lineIndex, charIndex) {
        const split = content.split("\n");
        if (split.length > 1) {
            lineIndex += split.length - 1;
            charIndex = split[split.length - 1].length;
        }
        else {
            charIndex += content.length;
        }
        return { lineIndex, charIndex };
    }
    parseToken(token, lineIndex, charIndex, positions) {
        if (typeof token.content === "string") {
            const strategy = this.stringStrategies.get(token.type);
            if (strategy) {
                return strategy(token.content, lineIndex, charIndex, positions);
            }
            return this.parseString(token.content, lineIndex, charIndex);
        }
        else if (Array.isArray(token.content)) {
            const strategy = this.stringOrTokenArrayStrategies.get(token.type);
            if (strategy) {
                return strategy(token.content, lineIndex, charIndex, positions);
            }
            return this.parseTokenOrStringArray(token.content, lineIndex, charIndex, positions);
        }
        else {
            return this.parseToken(token.content, lineIndex, charIndex, positions);
        }
    }
    matchString(content, lineIndex, charIndex, positions) {
        if (lineIndex < this.lineToUpdateWhenTimeoutEnds) {
            return this.parseString(content, lineIndex, charIndex);
        }
        this.settings.regexNonExact.lastIndex = 0;
        let match;
        // tslint:disable-next-line:no-conditional-assignment
        while ((match = this.settings.regexNonExact.exec(content)) !== null) {
            const startPos = new vscode.Position(lineIndex, charIndex + match.index);
            const endPos = startPos.translate(0, match[0].length);
            positions.push(new foundBracket_1.default(new vscode.Range(startPos, endPos), match[0]));
        }
        return this.parseString(content, lineIndex, charIndex);
    }
    // Array can be Token or String. Indexes are which indexes should be parsed for brackets
    matchStringOrTokenArray(indexes, array, lineIndex, charIndex, positions) {
        for (let i = 0; i < array.length; i++) {
            const content = array[i];
            let result;
            if (indexes.has(i) && typeof content === "string") {
                result = this.matchString(content, lineIndex, charIndex, positions);
            }
            else {
                result = this.parseTokenOrStringArray([content], lineIndex, charIndex, positions);
            }
            lineIndex = result.lineIndex;
            charIndex = result.charIndex;
        }
        return { lineIndex, charIndex };
    }
    colorDecorations(editors) {
        const colorMap = new Map();
        // Reduce all the colors/ranges of the lines into a singular map
        for (const line of this.lines) {
            {
                for (const [color, ranges] of line.colorRanges) {
                    const existingRanges = colorMap.get(color);
                    if (existingRanges !== undefined) {
                        existingRanges.push(...ranges);
                    }
                    else {
                        // Slice because we will be adding values to this array in the future,
                        // but don't want to modify the original array which is stored per line
                        colorMap.set(color, ranges.slice());
                    }
                }
            }
        }
        for (const [color, decoration] of this.settings.bracketDecorations) {
            if (color === "") {
                continue;
            }
            const ranges = colorMap.get(color);
            editors.forEach((editor) => {
                if (ranges !== undefined) {
                    editor.setDecorations(decoration, ranges);
                }
                else {
                    // We must set non-used colors to an empty array
                    // or previous decorations will not be invalidated
                    editor.setDecorations(decoration, []);
                }
            });
        }
        this.lineToUpdateWhenTimeoutEnds = Infinity;
    }
    calculateColumnFromCharIndex(lineText, charIndex, tabSize) {
        let spacing = 0;
        for (let index = 0; index < charIndex; index++) {
            if (lineText.charAt(index) === "\t") {
                spacing += tabSize - spacing % tabSize;
            }
            else {
                spacing++;
            }
        }
        return spacing;
    }
    calculateCharIndexFromColumn(lineText, column, tabSize) {
        let spacing = 0;
        for (let index = 0; index <= column; index++) {
            if (spacing >= column) {
                return index;
            }
            if (lineText.charAt(index) === "\t") {
                spacing += tabSize - spacing % tabSize;
            }
            else {
                spacing++;
            }
        }
        return spacing;
    }
}
exports.default = DocumentDecoration;
//# sourceMappingURL=documentDecoration.js.map