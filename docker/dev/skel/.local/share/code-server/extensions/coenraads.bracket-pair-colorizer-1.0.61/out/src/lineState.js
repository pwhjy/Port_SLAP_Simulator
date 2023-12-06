"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colorMode_1 = require("./colorMode");
const multipleIndexes_1 = require("./multipleIndexes");
const singularIndex_1 = require("./singularIndex");
class LineState {
    constructor(settings, previousState) {
        this.settings = settings;
        if (previousState !== undefined) {
            this.colorIndexes = previousState.colorIndexes;
            this.previousBracketColor = previousState.previousBracketColor;
        }
        else {
            switch (settings.colorMode) {
                case colorMode_1.default.Consecutive:
                    this.colorIndexes = new singularIndex_1.default();
                    break;
                case colorMode_1.default.Independent:
                    this.colorIndexes = new multipleIndexes_1.default(settings);
                    break;
                default: throw new RangeError("Not implemented enum value");
            }
        }
    }
    getOpenBracketColor(bracketPair, range) {
        let colorIndex;
        if (this.settings.forceIterationColorCycle) {
            colorIndex = (this.colorIndexes.getPreviousIndex(bracketPair) + 1) % bracketPair.colors.length;
        }
        else {
            colorIndex = this.colorIndexes.getCurrentLength(bracketPair) % bracketPair.colors.length;
        }
        let color = bracketPair.colors[colorIndex];
        if (this.settings.forceUniqueOpeningColor && color === this.previousBracketColor) {
            colorIndex = (colorIndex + 1) % bracketPair.colors.length;
            color = bracketPair.colors[colorIndex];
        }
        this.previousBracketColor = color;
        this.colorIndexes.setCurrent(bracketPair, range, colorIndex);
        return color;
    }
    ;
    getCloseBracketColor(bracketPair, range) {
        const colorIndex = this.colorIndexes.getCurrentColorIndex(bracketPair, range);
        let color;
        if (colorIndex !== undefined) {
            color = bracketPair.colors[colorIndex];
        }
        else {
            color = bracketPair.orphanColor;
        }
        this.previousBracketColor = color;
        return color;
    }
    getOpenBrackets() {
        return this.colorIndexes.getOpenBrackets();
    }
    copyMultilineContext() {
        const clone = {
            colorIndexes: this.colorIndexes.clone(),
            previousBracketColor: this.previousBracketColor,
        };
        return new LineState(this.settings, clone);
    }
    getScope(position) {
        return this.colorIndexes.getScope(position);
    }
}
exports.default = LineState;
//# sourceMappingURL=lineState.js.map