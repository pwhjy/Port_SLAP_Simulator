"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cmp(ver_a, ver_b) {
    let a_parts = ver_a.split('.');
    let b_parts = ver_b.split('.');
    for (let i = 0; i < Math.min(a_parts.length, b_parts.length); ++i) {
        let a = parseInt(a_parts[i]);
        let b = parseInt(b_parts[i]);
        if (a != b) {
            return a - b;
        }
    }
    return a_parts.length - b_parts.length;
}
exports.cmp = cmp;
function lt(ver_a, ver_b) {
    return cmp(ver_a, ver_b) < 0;
}
exports.lt = lt;
function gt(ver_a, ver_b) {
    return cmp(ver_a, ver_b) > 0;
}
exports.gt = gt;
//# sourceMappingURL=ver.js.map