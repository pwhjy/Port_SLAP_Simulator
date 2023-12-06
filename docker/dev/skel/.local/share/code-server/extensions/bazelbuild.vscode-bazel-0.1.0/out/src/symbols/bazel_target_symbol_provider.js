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
const vscode = require("vscode");
const bazel_1 = require("../bazel");
/** Provids Symbols for targets in Bazel BUILD files. */
class BazelTargetSymbolProvider {
    provideDocumentSymbols(document, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const workspaceInfo = bazel_1.BazelWorkspaceInfo.fromDocument(document);
            if (workspaceInfo === undefined) {
                vscode.window.showWarningMessage("Bazel BUILD Symbols unavailable as currently opened file is not in " +
                    "a Bazel workspace");
                return [];
            }
            const queryResult = yield bazel_1.getTargetsForBuildFile(workspaceInfo.bazelWorkspacePath, document.uri.fsPath);
            return this.computeSymbols(queryResult);
        });
    }
    /**
     * Takes the result of a Bazel query for targets defined in a package and
     * returns a list of Symbols for the BUILD file in that package.
     *
     * @param queryResult The result of the bazel query.
     */
    computeSymbols(queryResult) {
        const result = [];
        for (const target of queryResult.target) {
            const location = new bazel_1.QueryLocation(target.rule.location);
            let targetName = target.rule.name;
            const colonIndex = targetName.indexOf(":");
            if (colonIndex !== -1) {
                targetName = targetName.substr(colonIndex + 1);
            }
            result.push(new vscode.DocumentSymbol(targetName, "", vscode.SymbolKind.Function, location.range, location.range));
        }
        return result;
    }
}
exports.BazelTargetSymbolProvider = BazelTargetSymbolProvider;
//# sourceMappingURL=bazel_target_symbol_provider.js.map