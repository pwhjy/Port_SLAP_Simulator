"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CppToken_1 = require("./CppToken");
class CppParseTree {
    constructor() {
        this.nodes = [];
    }
    /**
     * Create a tree from CppTokens. This consumes the CppTokens.
     * @param CppTokens The CppTokens to create a tree for.
     * @param inNested If currently allready nesting.
     */
    static CreateTree(CppTokens, inNested = false) {
        const tree = new CppParseTree();
        while (CppTokens.length > 0) {
            const token = CppTokens.shift();
            switch (token.type) {
                case CppToken_1.CppTokenType.OpenParenthesis:
                    tree.nodes.push(this.CreateTree(CppTokens, true));
                    break;
                case CppToken_1.CppTokenType.CloseParenthesis:
                    if (inNested === false) {
                        throw new Error("Unmatched closing parenthesis.");
                    }
                    return tree;
                default:
                    tree.nodes.push(token);
                    break;
            }
        }
        if (inNested === true) {
            throw new Error("No match found for an opening parenthesis.");
        }
        return tree;
    }
    /**
     * Compact empty branches. Example ((foo))(((bar))) will become (foo)(bar)
     * @param tree The CppParseTree to compact. Defaults to the current tree.
     */
    Compact(tree = this) {
        const newTree = new CppParseTree();
        newTree.nodes = tree.nodes.map((n) => n);
        const isNotCompact = (n) => {
            return n instanceof CppParseTree
                && n.nodes.length === 1 && n.nodes[0] instanceof CppParseTree;
        };
        // Compact current level of nodes to the maximum amount.
        while (newTree.nodes.some((n) => isNotCompact(n))) {
            newTree.nodes = newTree.nodes
                .map((n) => n instanceof CppParseTree && isNotCompact(n) ? n.nodes[0] : n);
        }
        // Compact all nested CppParseTrees.
        newTree.nodes = newTree.nodes
            .map((n) => n instanceof CppParseTree ? this.Compact(n) : n);
        return newTree;
    }
    /**
     * Copy CppParseTree.
     * @param tree The CppParseTree to compact. Defaults to the current tree.
     */
    Copy(tree = this) {
        const newTree = new CppParseTree();
        newTree.nodes = tree.nodes
            .map((n) => n instanceof CppToken_1.CppToken ? n : this.Copy(n));
        return newTree;
    }
    /**
     * Create string from the CppParseTree which is a representation of the original code.
     * @param tree The CppParseTree to compact. Defaults to the current tree.
     */
    Yield(tree = this) {
        let code = "";
        for (const node of tree.nodes) {
            if (node instanceof CppParseTree) {
                code += "(" + this.Yield(node) + ")";
                continue;
            }
            switch (node.type) {
                case CppToken_1.CppTokenType.Symbol:
                    code += code === "" ? node.value : " " + node.value;
                    break;
                case CppToken_1.CppTokenType.Pointer:
                    code += node.value;
                    break;
                case CppToken_1.CppTokenType.Reference:
                    code += node.value;
                    break;
                case CppToken_1.CppTokenType.ArraySubscript:
                    code += node.value;
                    break;
                case CppToken_1.CppTokenType.CurlyBlock:
                    code += node.value;
                    break;
                case CppToken_1.CppTokenType.Assignment:
                    code += " " + node.value;
                    break;
                case CppToken_1.CppTokenType.Comma:
                    code += node.value;
                    break;
                case CppToken_1.CppTokenType.Arrow:
                    code += " " + node.value;
                    break;
                case CppToken_1.CppTokenType.Ellipsis:
                    code += node.value;
                    break;
                case CppToken_1.CppTokenType.Attribute:
                    code += code === "" ? node.value : " " + node.value;
                    break;
            }
        }
        return code;
    }
}
exports.CppParseTree = CppParseTree;
//# sourceMappingURL=CppParseTree.js.map