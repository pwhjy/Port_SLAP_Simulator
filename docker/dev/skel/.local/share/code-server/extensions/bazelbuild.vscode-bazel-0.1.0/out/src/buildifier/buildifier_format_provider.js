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
const buildifier_1 = require("./buildifier");
/**
 * Provides document formatting functionality for Bazel files by invoking
 * buildifier.
 */
class BuildifierFormatProvider {
    provideDocumentFormattingEdits(document, options, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const bazelConfig = vscode.workspace.getConfiguration("bazel");
            const applyLintFixes = bazelConfig.buildifierFixOnFormat;
            const fileContent = document.getText();
            const type = buildifier_1.getBuildifierFileType(document.uri.fsPath);
            try {
                const formattedContent = yield buildifier_1.buildifierFormat(fileContent, type, applyLintFixes);
                if (formattedContent === fileContent) {
                    // If the file didn't change, return any empty array of edits.
                    return [];
                }
                const edits = [
                    new vscode.TextEdit(new vscode.Range(document.positionAt(0), document.positionAt(fileContent.length)), formattedContent),
                ];
                return edits;
            }
            catch (err) {
                vscode.window.showErrorMessage(`${err}`);
            }
        });
    }
}
exports.BuildifierFormatProvider = BuildifierFormatProvider;
//# sourceMappingURL=buildifier_format_provider.js.map