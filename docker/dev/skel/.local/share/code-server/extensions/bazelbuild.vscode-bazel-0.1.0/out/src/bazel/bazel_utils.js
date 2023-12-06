"use strict";
// Copyright 2018 The Bazel Authors. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const bazel_query_1 = require("./bazel_query");
/**
 * Get the targets in the build file
 *
 * @param workspace The path to the workspace
 * @param buildFile The path to the build file
 * @returns A query result for targets in the build file
 */
function getTargetsForBuildFile(workspace, buildFile) {
    return __awaiter(this, void 0, void 0, function* () {
        // Path to the BUILD file relative to the workspace.
        const relPathToDoc = path.relative(workspace, buildFile);
        // Strip away the name of the BUILD file from the relative path.
        let relDirWithDoc = path.dirname(relPathToDoc);
        // Strip away the "." if the BUILD file was in the same directory as the
        // workspace.
        if (relDirWithDoc === ".") {
            relDirWithDoc = "";
        }
        // Turn the relative path into a package label
        const pkg = `//${relDirWithDoc}`;
        const queryResult = yield new bazel_query_1.BazelQuery(workspace, `'kind(rule, ${pkg}:all)'`, []).queryTargets();
        return queryResult;
    });
}
exports.getTargetsForBuildFile = getTargetsForBuildFile;
//# sourceMappingURL=bazel_utils.js.map