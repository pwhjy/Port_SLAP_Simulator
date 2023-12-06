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
const buildifier_1 = require("../buildifier");
/** Manages diagnostics emitted by buildifier's lint mode. */
class BuildifierDiagnosticsManager {
    constructor() {
        /** The diagnostics collection for buildifier lint warnings. */
        this.diagnosticsCollection = vscode.languages.createDiagnosticCollection("buildifier");
    }
    /**
     * Updates the diagnostics collection with lint warnings for the given text
     * document.
     *
     * @param document The text document whose diagnostics should be updated.
     */
    updateDiagnostics(document) {
        return __awaiter(this, void 0, void 0, function* () {
            if (document.languageId === "starlark") {
                const warnings = yield buildifier_1.buildifierLint(document.getText(), buildifier_1.getBuildifierFileType(document.uri.fsPath), "warn");
                this.diagnosticsCollection.set(document.uri, warnings.map((warning) => {
                    // Buildifier returns 1-based line numbers, but VS Code is 0-based.
                    const lineNumber = warning.line - 1;
                    const line = document.lineAt(lineNumber);
                    // Buildifier doesn't give us column numbers for warnings, so we cover
                    // the entire line but start with the first non-space character.
                    const range = new vscode.Range(lineNumber, line.firstNonWhitespaceCharacterIndex, lineNumber + 1, 0);
                    const diagnostic = new vscode.Diagnostic(range, warning.message, vscode.DiagnosticSeverity.Warning);
                    diagnostic.source = "buildifier";
                    diagnostic.code = warning.category;
                    return diagnostic;
                }));
            }
        });
    }
}
exports.BuildifierDiagnosticsManager = BuildifierDiagnosticsManager;
//# sourceMappingURL=diagnostics.js.map