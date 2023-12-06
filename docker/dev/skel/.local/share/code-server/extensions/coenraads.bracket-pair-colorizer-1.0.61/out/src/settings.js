"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const bracketPair_1 = require("./bracketPair");
const colorMode_1 = require("./colorMode");
const colors_1 = require("./colors");
class Settings {
    constructor(languageID, gutterIcons, documentUri) {
        this.bracketPairs = [];
        this.isDisposed = false;
        this.gutterIcons = gutterIcons;
        this.prismLanguageID = languageID;
        const configuration = vscode.workspace.getConfiguration("bracketPairColorizer", documentUri);
        const activeScopeCSS = configuration.get("activeScopeCSS");
        const excludedLanguages = configuration.get("excludedLanguages");
        if (!Array.isArray(excludedLanguages)) {
            throw new Error("excludedLanguages is not an array");
        }
        this.excludedLanguages = new Set(excludedLanguages);
        if (!Array.isArray(activeScopeCSS)) {
            throw new Error("activeScopeCSS is not an array");
        }
        this.activeBracketCSSElements = activeScopeCSS.map((e) => [e.substring(0, e.indexOf(":")).trim(),
            e.substring(e.indexOf(":") + 1).trim()]);
        const scopeLineCSS = configuration.get("scopeLineCSS");
        if (!Array.isArray(scopeLineCSS)) {
            throw new Error("scopeLineCSS is not an array");
        }
        this.activeScopeLineCSSElements = scopeLineCSS.map((e) => [e.substring(0, e.indexOf(":")).trim(),
            e.substring(e.indexOf(":") + 1).trim()]);
        const borderStyle = this.activeScopeLineCSSElements.filter((e) => e[0] === "borderStyle");
        if (borderStyle && borderStyle[0].length === 2) {
            this.activeScopeLineCSSBorder = borderStyle[0][1];
        }
        else {
            this.activeScopeLineCSSBorder = "none";
        }
        this.highlightActiveScope = configuration.get("highlightActiveScope");
        if (typeof this.highlightActiveScope !== "boolean") {
            throw new Error("alwaysHighlightActiveScope is not a boolean");
        }
        this.showVerticalScopeLine = configuration.get("showVerticalScopeLine");
        if (typeof this.showVerticalScopeLine !== "boolean") {
            throw new Error("showVerticalScopeLine is not a boolean");
        }
        this.showHorizontalScopeLine = configuration.get("showHorizontalScopeLine");
        if (typeof this.showHorizontalScopeLine !== "boolean") {
            throw new Error("showHorizontalScopeLine is not a boolean");
        }
        this.scopeLineRelativePosition = configuration.get("scopeLineRelativePosition");
        if (typeof this.scopeLineRelativePosition !== "boolean") {
            throw new Error("scopeLineRelativePosition is not a boolean");
        }
        this.showBracketsInGutter = configuration.get("showBracketsInGutter");
        if (typeof this.showBracketsInGutter !== "boolean") {
            throw new Error("showBracketsInGutter is not a boolean");
        }
        this.showBracketsInRuler = configuration.get("showBracketsInRuler");
        if (typeof this.showBracketsInRuler !== "boolean") {
            throw new Error("showBracketsInRuler is not a boolean");
        }
        this.rulerPosition = configuration.get("rulerPosition");
        if (typeof this.rulerPosition !== "string") {
            throw new Error("rulerPosition is not a string");
        }
        this.forceUniqueOpeningColor = configuration.get("forceUniqueOpeningColor");
        if (typeof this.forceUniqueOpeningColor !== "boolean") {
            throw new Error("forceUniqueOpeningColor is not a boolean");
        }
        this.forceIterationColorCycle = configuration.get("forceIterationColorCycle");
        if (typeof this.forceIterationColorCycle !== "boolean") {
            throw new Error("forceIterationColorCycle is not a boolean");
        }
        this.colorMode = colorMode_1.default[configuration.get("colorMode")];
        if (typeof this.colorMode !== "number") {
            throw new Error("colorMode enum could not be parsed");
        }
        this.timeOutLength = configuration.get("timeOut");
        if (typeof this.timeOutLength !== "number") {
            throw new Error("timeOutLength is not a number");
        }
        if (this.timeOutLength <= 0) {
            this.timeOutLength = 1;
        }
        if (this.colorMode === colorMode_1.default.Consecutive) {
            const consecutiveSettings = configuration.get("consecutivePairColors");
            if (!Array.isArray(consecutiveSettings)) {
                throw new Error("consecutivePairColors is not an array");
            }
            if (consecutiveSettings.length < 3) {
                throw new Error("consecutivePairColors expected at least 3 parameters, actual: "
                    + consecutiveSettings.length);
            }
            const orphanColor = consecutiveSettings[consecutiveSettings.length - 1];
            if (typeof orphanColor !== "string") {
                throw new Error("consecutivePairColors[" + (consecutiveSettings.length - 1) + "] is not a string");
            }
            const colors = consecutiveSettings[consecutiveSettings.length - 2];
            if (!Array.isArray(colors)) {
                throw new Error("consecutivePairColors[" + (consecutiveSettings.length - 2) + "] is not a string[]");
            }
            consecutiveSettings.slice(0, consecutiveSettings.length - 2).forEach((brackets, index) => {
                if (typeof brackets === "string" || Array.isArray(brackets)) {
                    if (brackets.length !== 2) {
                        throw new Error("consecutivePairColors[" + index + "] requires 2 element, e.g. ['(',')']");
                    }
                    this.bracketPairs.push(new bracketPair_1.default(brackets[0], brackets[1], colors, orphanColor));
                    return;
                }
                throw new Error("consecutivePairColors[ " + index + "] should be a string or an array of strings");
            });
        }
        else {
            const independentSettings = configuration.get("independentPairColors");
            if (!Array.isArray(independentSettings)) {
                throw new Error("independentPairColors is not an array");
            }
            independentSettings.forEach((innerArray, index) => {
                if (!Array.isArray(innerArray)) {
                    throw new Error("independentPairColors[" + index + "] is not an array");
                }
                const brackets = innerArray[0];
                if (typeof brackets !== "string" && !Array.isArray(brackets)) {
                    throw new Error("independentSettings[" + index + "][0] is not a string or an array of strings");
                }
                if (brackets.length < 2) {
                    throw new Error("independentSettings[" + index + "][0] needs at least 2 elements");
                }
                const colors = innerArray[1];
                if (!Array.isArray(colors)) {
                    throw new Error("independentSettings[" + index + "][1] is not string[]");
                }
                const orphanColor = innerArray[2];
                if (typeof orphanColor !== "string") {
                    throw new Error("independentSettings[" + index + "][2] is not a string");
                }
                this.bracketPairs.push(new bracketPair_1.default(brackets[0], brackets[1], colors, orphanColor));
            });
        }
        this.regexNonExact = this.createRegex(this.bracketPairs, false);
        this.bracketDecorations = this.createBracketDecorations(this.bracketPairs);
    }
    dispose() {
        if (!this.isDisposed) {
            this.bracketDecorations.forEach((decoration, key) => {
                decoration.dispose();
            });
            this.bracketDecorations.clear();
            this.isDisposed = true;
        }
    }
    createGutterBracketDecorations(color, bracket) {
        const gutterIcon = this.gutterIcons.GetIconUri(bracket, color);
        const decorationSettings = {
            gutterIconPath: gutterIcon,
        };
        const decoration = vscode.window.createTextEditorDecorationType(decorationSettings);
        return decoration;
    }
    createRulerBracketDecorations(color) {
        const decorationSettings = {
            overviewRulerColor: color,
            overviewRulerLane: vscode.OverviewRulerLane[this.rulerPosition],
        };
        const decoration = vscode.window.createTextEditorDecorationType(decorationSettings);
        return decoration;
    }
    createScopeBracketDecorations(color) {
        const decorationSettings = {
            rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        };
        this.activeBracketCSSElements.forEach((element) => {
            decorationSettings[element[0]] = element[1].replace("{color}", color);
        });
        const decoration = vscode.window.createTextEditorDecorationType(decorationSettings);
        return decoration;
    }
    createScopeLineDecorations(color, top = true, right = true, bottom = true, left = true, yOffset) {
        const decorationSettings = {
            rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
        };
        const none = "none";
        const topBorder = top ? this.activeScopeLineCSSBorder : none;
        const rightBorder = right ? this.activeScopeLineCSSBorder : none;
        const botBorder = bottom ? this.activeScopeLineCSSBorder : none;
        const leftBorder = left ? this.activeScopeLineCSSBorder : none;
        this.activeScopeLineCSSElements.forEach((element) => {
            if (element[0].includes("Color")) {
                const colorElement = element[1].replace("{color}", color);
                if (!colorElement.includes("rgb") && colorElement.includes("opacity")) {
                    const colorSplit = colorElement.split(";");
                    const opacitySplit = colorSplit[1].split(":");
                    if (colorSplit[0].includes("#")) {
                        const rgb = colors_1.default.hex2rgb(colorSplit[0]);
                        if (rgb) {
                            const rbgaString = `rgba(${rgb.r},${rgb.g},${rgb.b},${opacitySplit[1]});`;
                            decorationSettings[element[0]] = rbgaString;
                        }
                    }
                    else { // Assume css color
                        const rgb = colors_1.default.name2rgb(colorSplit[0]);
                        if (rgb) {
                            const rbgaString = `rgba(${rgb.r},${rgb.g},${rgb.b},${opacitySplit[1]});`;
                            decorationSettings[element[0]] = rbgaString;
                        }
                    }
                }
                else {
                    decorationSettings[element[0]] = colorElement;
                }
            }
            else {
                decorationSettings[element[0]] = element[1];
            }
        });
        let borderStyle = `${topBorder} ${rightBorder} ${botBorder} ${leftBorder}`;
        if (yOffset !== undefined && yOffset !== 0) {
            borderStyle += "; transform: translateY(" + yOffset * 100 + "%); z-index: 1;";
        }
        // tslint:disable-next-line:no-string-literal
        decorationSettings["borderStyle"] = borderStyle;
        const decoration = vscode.window.createTextEditorDecorationType(decorationSettings);
        return decoration;
    }
    createRegex(bracketPairs, exact) {
        const escape = (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        let regex = "";
        const matches = [];
        bracketPairs.forEach((bracketPair) => {
            matches.push(bracketPair.openCharacter);
            matches.push(bracketPair.closeCharacter);
        });
        const sortedByLengthMatches = matches.sort((a, b) => b.length - a.length);
        sortedByLengthMatches.forEach((match) => {
            if (regex !== "") {
                regex += "|";
            }
            if (exact) {
                regex += `${escape(match)}`;
            }
            else {
                regex += `${escape(match)}`;
            }
        });
        return new RegExp(regex, !exact ? "g" : undefined);
        ;
    }
    createBracketDecorations(bracketPairs) {
        const decorations = new Map();
        for (const bracketPair of bracketPairs) {
            for (const color of bracketPair.colors) {
                const decoration = vscode.window.createTextEditorDecorationType({
                    color, rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
                });
                decorations.set(color, decoration);
            }
            const errorDecoration = vscode.window.createTextEditorDecorationType({
                color: bracketPair.orphanColor,
                rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
            });
            decorations.set(bracketPair.orphanColor, errorDecoration);
        }
        return decorations;
    }
}
exports.default = Settings;
//# sourceMappingURL=settings.js.map