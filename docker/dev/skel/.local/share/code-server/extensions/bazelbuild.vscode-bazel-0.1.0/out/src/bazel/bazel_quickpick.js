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
const bazel_query_1 = require("./bazel_query");
const bazel_workspace_info_1 = require("./bazel_workspace_info");
/**
 * Represents a Bazel target in a QuickPick items window. Implements the
 * IBazelCommandAdapter interface so that it can be given directly to any of the
 * registered bazel commands.
 */
class BazelTargetQuickPick {
    /**
     * Initializes a new Bazel QuickPick target.
     * @param label The fully qualified bazel target label.
     * @param workspaceInfo Information about the workspace in which the target
     *     should be built.
     */
    constructor(label, workspaceInfo) {
        this.targetLabel = label;
        this.workspaceInfo = workspaceInfo;
    }
    get alwaysShow() {
        return true;
    }
    get label() {
        return this.targetLabel;
    }
    get picked() {
        return false;
    }
    getBazelCommandOptions() {
        return {
            options: [],
            targets: [this.targetLabel],
            workspaceInfo: this.workspaceInfo,
        };
    }
}
exports.BazelTargetQuickPick = BazelTargetQuickPick;
/**
 * Runs the given bazel query command in the given bazel workspace and returns
 * the resulting array of BazelTargetQuickPick as a promise.
 * @param workspace The bazel workspace to run the bazel command from.
 * @param query The bazel query string to run.
 */
function queryWorkspaceQuickPickTargets(workspaceInfo, query) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryResult = yield new bazel_query_1.BazelQuery(workspaceInfo.bazelWorkspacePath, query, []).queryTargets();
        const result = [];
        for (const target of queryResult.target) {
            result.push(new BazelTargetQuickPick(target.rule.name, workspaceInfo));
        }
        return result;
    });
}
/**
 * Runs the given bazel query command in an automatically determined bazel
 * workspace and returns the resulting array of BazelTargetQuickPick as a
 * promise. The workspace is determined by trying to determine the bazel
 * workspace the currently active text editor is in.
 * @param query The bazel query string to run.
 */
function queryQuickPickTargets(query) {
    return __awaiter(this, void 0, void 0, function* () {
        // Use the active text editor's file to determine the directory of the Bazel
        // workspace.
        if (vscode.window.activeTextEditor === undefined) {
            vscode.window.showErrorMessage("Unable to determine Bazel workspace. Open a file in the Bazel workspace");
            return [];
        }
        const document = vscode.window.activeTextEditor.document;
        const workspace = bazel_workspace_info_1.BazelWorkspaceInfo.fromDocument(document);
        if (workspace === undefined) {
            const filePath = document.uri.fsPath;
            vscode.window.showErrorMessage(filePath + " is not in a Bazel workspace");
            return [];
        }
        return queryWorkspaceQuickPickTargets(workspace, query);
    });
}
exports.queryQuickPickTargets = queryQuickPickTargets;
//# sourceMappingURL=bazel_quickpick.js.map