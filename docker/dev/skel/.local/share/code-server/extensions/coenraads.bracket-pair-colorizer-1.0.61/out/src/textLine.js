"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lineState_1 = require("./lineState");
class TextLine {
    constructor(content, settings, index, lineState) {
        this.colorRanges = new Map();
        this.settings = settings;
        this.content = content;
        this.index = index;
        if (lineState !== undefined) {
            this.lineState = lineState;
        }
        else {
            this.lineState = new lineState_1.default(settings);
        }
    }
    // Return a copy of the line while mantaining bracket state. colorRanges is not mantained.
    copyMultilineContext() {
        return this.lineState.copyMultilineContext();
    }
    addBracket(bracket) {
        const openBrackets = this.lineState.getOpenBrackets();
        this.settings.bracketPairs.sort((a, b) => {
            const x = openBrackets.has(a.openCharacter);
            const y = openBrackets.has(b.openCharacter);
            return x === y ? 0 : x ? -1 : 1;
        });
        for (const bracketPair of this.settings.bracketPairs) {
            if (bracketPair.openCharacter === bracket.character) {
                const color = this.lineState.getOpenBracketColor(bracketPair, bracket.range);
                const colorRanges = this.colorRanges.get(color);
                if (colorRanges !== undefined) {
                    colorRanges.push(bracket.range);
                }
                else {
                    this.colorRanges.set(color, [bracket.range]);
                }
                return;
            }
            else if (bracketPair.closeCharacter === bracket.character) {
                const color = this.lineState.getCloseBracketColor(bracketPair, bracket.range);
                const colorRanges = this.colorRanges.get(color);
                if (colorRanges !== undefined) {
                    colorRanges.push(bracket.range);
                }
                else {
                    this.colorRanges.set(color, [bracket.range]);
                }
                return;
            }
        }
    }
    getScope(position) {
        return this.lineState.getScope(position);
    }
}
exports.default = TextLine;
//# sourceMappingURL=textLine.js.map