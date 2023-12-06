"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const cp = require("child_process");
const util_1 = require("util");
exports.readdirAsync = util_1.promisify(fs.readdir);
exports.readFileAsync = util_1.promisify(fs.readFile);
exports.existsAsync = util_1.promisify(fs.exists);
exports.statAsync = util_1.promisify(fs.stat);
exports.execFileAsync = util_1.promisify(cp.execFile);
//# sourceMappingURL=async.js.map