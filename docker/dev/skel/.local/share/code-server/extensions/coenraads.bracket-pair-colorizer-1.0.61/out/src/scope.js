"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class Scope {
    constructor(range, color, open, close) {
        // Scope does not include edges
        this.range = new vscode_1.Range(range.start.translate(0, 1), range.end.translate(0, -1));
        this.color = color;
        this.open = open;
        this.close = close;
    }
}
exports.default = Scope;
//# sourceMappingURL=scope.js.map