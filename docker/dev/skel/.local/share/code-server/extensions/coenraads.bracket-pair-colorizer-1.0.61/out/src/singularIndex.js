"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const bracket_1 = require("./bracket");
const scope_1 = require("./scope");
class SingularIndex {
    constructor(previousState) {
        this.openBrackets = [];
        this.previousOpenBracketColorIndex = -1;
        this.bracketScopes = [];
        if (previousState !== undefined) {
            this.openBrackets = previousState.currentOpenBracketColorIndexes;
            this.previousOpenBracketColorIndex = previousState.previousOpenBracketColorIndex;
        }
    }
    getOpenBrackets() {
        return new Set(this.openBrackets.map((e) => e.character));
    }
    getPreviousIndex(bracketPair) {
        return this.previousOpenBracketColorIndex;
    }
    setCurrent(bracketPair, range, colorIndex) {
        this.openBrackets.push(new bracket_1.default(bracketPair.openCharacter, range, colorIndex));
        this.previousOpenBracketColorIndex = colorIndex;
    }
    getCurrentLength(bracketPair) {
        return this.openBrackets.length;
    }
    getCurrentColorIndex(bracketPair, range) {
        const openBracket = this.openBrackets.pop();
        if (openBracket) {
            const closeBracket = new bracket_1.default(bracketPair.closeCharacter, range, openBracket.colorIndex);
            const scopeRange = new vscode.Range(openBracket.range.start, range.end);
            this.bracketScopes.push(new scope_1.default(scopeRange, bracketPair.colors[openBracket.colorIndex], openBracket, closeBracket));
            return openBracket.colorIndex;
        }
    }
    getScope(position) {
        for (const scope of this.bracketScopes) {
            if (scope.range.contains(position)) {
                return scope;
            }
        }
    }
    clone() {
        return new SingularIndex({
            currentOpenBracketColorIndexes: this.openBrackets.slice(),
            previousOpenBracketColorIndex: this.previousOpenBracketColorIndex,
        });
    }
}
exports.default = SingularIndex;
//# sourceMappingURL=singularIndex.js.map