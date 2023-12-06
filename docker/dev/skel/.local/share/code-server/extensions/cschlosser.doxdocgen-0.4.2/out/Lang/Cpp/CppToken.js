"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CppTokenType;
(function (CppTokenType) {
    CppTokenType[CppTokenType["Symbol"] = 0] = "Symbol";
    CppTokenType[CppTokenType["Pointer"] = 1] = "Pointer";
    CppTokenType[CppTokenType["Reference"] = 2] = "Reference";
    CppTokenType[CppTokenType["ArraySubscript"] = 3] = "ArraySubscript";
    CppTokenType[CppTokenType["OpenParenthesis"] = 4] = "OpenParenthesis";
    CppTokenType[CppTokenType["CloseParenthesis"] = 5] = "CloseParenthesis";
    CppTokenType[CppTokenType["CurlyBlock"] = 6] = "CurlyBlock";
    CppTokenType[CppTokenType["Assignment"] = 7] = "Assignment";
    CppTokenType[CppTokenType["Comma"] = 8] = "Comma";
    CppTokenType[CppTokenType["Arrow"] = 9] = "Arrow";
    CppTokenType[CppTokenType["CommentBlock"] = 10] = "CommentBlock";
    CppTokenType[CppTokenType["CommentLine"] = 11] = "CommentLine";
    CppTokenType[CppTokenType["Ellipsis"] = 12] = "Ellipsis";
    CppTokenType[CppTokenType["Attribute"] = 13] = "Attribute";
    CppTokenType[CppTokenType["MemberPointer"] = 14] = "MemberPointer";
})(CppTokenType = exports.CppTokenType || (exports.CppTokenType = {}));
class CppToken {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}
exports.CppToken = CppToken;
//# sourceMappingURL=CppToken.js.map