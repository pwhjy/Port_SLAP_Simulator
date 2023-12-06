"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const bracket_1 = require("./bracket");
const scope_1 = require("./scope");
class MultipleIndexes {
    constructor(settings, previousState) {
        this.openBrackets = {};
        this.previousOpenBracketColorIndexes = {};
        this.bracketScopes = [];
        this.settings = settings;
        if (previousState !== undefined) {
            this.openBrackets = previousState.currentOpenBracketColorIndexes;
            this.previousOpenBracketColorIndexes = previousState.previousOpenBracketColorIndexes;
        }
        else {
            settings.bracketPairs.forEach((bracketPair) => {
                this.openBrackets[bracketPair.openCharacter] = [];
                this.previousOpenBracketColorIndexes[bracketPair.openCharacter] = -1;
            });
        }
    }
    getOpenBrackets() {
        const brackets = new Set();
        Object.keys(this.openBrackets).forEach((key) => {
            if (this.openBrackets[key].length > 0) {
                brackets.add(key);
            }
        });
        return brackets;
    }
    getPreviousIndex(bracketPair) {
        return this.previousOpenBracketColorIndexes[bracketPair.openCharacter];
    }
    setCurrent(bracketPair, range, colorIndex) {
        this.openBrackets[bracketPair.openCharacter].push(new bracket_1.default(bracketPair.openCharacter, range, colorIndex));
        this.previousOpenBracketColorIndexes[bracketPair.openCharacter] = colorIndex;
    }
    getCurrentLength(bracketPair) {
        return this.openBrackets[bracketPair.openCharacter].length;
    }
    getCurrentColorIndex(bracketPair, range) {
        const openBracket = this.openBrackets[bracketPair.openCharacter].pop();
        if (openBracket) {
            const closeBracket = new bracket_1.default(bracketPair.closeCharacter, range, openBracket.colorIndex);
            const scopeRange = new vscode_1.Range(openBracket.range.start, range.end);
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
        const bracketColorIndexesCopy = {};
        Object.keys(this.openBrackets).forEach((key) => {
            bracketColorIndexesCopy[key] = this.openBrackets[key].slice();
        });
        const previousOpenBracketIndexesCopy = {};
        Object.keys(this.previousOpenBracketColorIndexes).forEach((key) => {
            previousOpenBracketIndexesCopy[key] = this.previousOpenBracketColorIndexes[key];
        });
        return new MultipleIndexes(this.settings, {
            currentOpenBracketColorIndexes: bracketColorIndexesCopy,
            previousOpenBracketColorIndexes: previousOpenBracketIndexesCopy,
        });
    }
}
exports.default = MultipleIndexes;
//# sourceMappingURL=multipleIndexes.js.map