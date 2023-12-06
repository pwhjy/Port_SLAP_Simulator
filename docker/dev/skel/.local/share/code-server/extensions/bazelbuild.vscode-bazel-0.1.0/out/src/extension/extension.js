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
const which = require("which");
const bazel_1 = require("../bazel");
const buildifier_1 = require("../buildifier");
const codelens_1 = require("../codelens");
const symbols_1 = require("../symbols");
const workspace_tree_1 = require("../workspace-tree");
/**
 * Called when the extension is activated; that is, when its first command is
 * executed.
 *
 * @param context The extension context.
 */
function activate(context) {
    const workspaceTreeProvider = new workspace_tree_1.BazelWorkspaceTreeProvider(context);
    const codeLensProvider = new codelens_1.BazelBuildCodeLensProvider(context);
    const buildifierDiagnostics = new buildifier_1.BuildifierDiagnosticsManager();
    context.subscriptions.push(vscode.window.registerTreeDataProvider("bazelWorkspace", workspaceTreeProvider), 
    // Commands
    vscode.commands.registerCommand("bazel.buildTarget", bazelBuildTarget), vscode.commands.registerCommand("bazel.buildTargetWithDebugging", bazelBuildTargetWithDebugging), vscode.commands.registerCommand("bazel.testTarget", bazelTestTarget), vscode.commands.registerCommand("bazel.clean", bazelClean), vscode.commands.registerCommand("bazel.refreshBazelBuildTargets", () => {
        workspaceTreeProvider.refresh();
    }), 
    // CodeLens provider for BUILD files
    vscode.languages.registerCodeLensProvider([{ pattern: "**/BUILD" }, { pattern: "**/BUILD.bazel" }], codeLensProvider), 
    // Buildifier formatting support
    vscode.languages.registerDocumentFormattingEditProvider([
        { pattern: "**/BUILD" },
        { pattern: "**/BUILD.bazel" },
        { pattern: "**/WORKSPACE" },
        { pattern: "**/WORKSPACE.bazel" },
        { pattern: "**/*.bzl" },
        { pattern: "**/*.sky" },
    ], new buildifier_1.BuildifierFormatProvider()), buildifierDiagnostics, 
    // Symbol provider for BUILD files
    vscode.languages.registerDocumentSymbolProvider([{ pattern: "**/BUILD" }, { pattern: "**/BUILD.bazel" }], new symbols_1.BazelTargetSymbolProvider()));
    // Notify the user if buildifier is not available on their path (or where
    // their settings expect it).
    checkBuildifierIsAvailable();
}
exports.activate = activate;
/** Called when the extension is deactivated. */
function deactivate() {
    // Nothing to do here.
}
exports.deactivate = deactivate;
/**
 * Builds a Bazel target and streams output to the terminal.
 *
 * @param adapter An object that implements {@link IBazelCommandAdapter} from
 *     which the command's arguments will be determined.
 */
function bazelBuildTarget(adapter) {
    return __awaiter(this, void 0, void 0, function* () {
        if (adapter === undefined) {
            // If the command adapter was unspecified, it means this command is being
            // invoked via the command palatte. Provide quickpick build targets for
            // the user to choose from.
            const quickPick = yield vscode.window.showQuickPick(bazel_1.queryQuickPickTargets("\"kind('.* rule', ...)\""), {
                canPickMany: false,
            });
            // If the result was undefined, the user cancelled the quick pick, so don't
            // try again.
            if (quickPick) {
                bazelBuildTarget(quickPick);
            }
            return;
        }
        const commandOptions = adapter.getBazelCommandOptions();
        const task = bazel_1.createBazelTask("build", commandOptions);
        vscode.tasks.executeTask(task);
    });
}
/**
 * Builds a Bazel target and attaches the Starlark debugger.
 *
 * @param adapter An object that implements {@link IBazelCommandAdapter} from
 *     which the command's arguments will be determined.
 */
function bazelBuildTargetWithDebugging(adapter) {
    return __awaiter(this, void 0, void 0, function* () {
        if (adapter === undefined) {
            // If the command adapter was unspecified, it means this command is being
            // invoked via the command palatte. Provide quickpick build targets for
            // the user to choose from.
            const quickPick = yield vscode.window.showQuickPick(bazel_1.queryQuickPickTargets("\"kind('.* rule', ...)\""), {
                canPickMany: false,
            });
            // If the result was undefined, the user cancelled the quick pick, so don't
            // try again.
            if (quickPick) {
                bazelBuildTargetWithDebugging(quickPick);
            }
            return;
        }
        const commandOptions = adapter.getBazelCommandOptions();
        vscode.debug.startDebugging(undefined, {
            args: commandOptions.targets.concat(commandOptions.options),
            bazelCommand: "build",
            bazelExecutablePath: bazel_1.getDefaultBazelExecutablePath(),
            cwd: commandOptions.workspaceInfo.bazelWorkspacePath,
            name: "On-demand Bazel Build Debug",
            request: "launch",
            type: "bazel-launch-build",
        });
    });
}
/**
 * Tests a Bazel target and streams output to the terminal.
 *
 * @param adapter An object that implements {@link IBazelCommandAdapter} from
 *     which the command's arguments will be determined.
 */
function bazelTestTarget(adapter) {
    return __awaiter(this, void 0, void 0, function* () {
        if (adapter === undefined) {
            // If the command adapter was unspecified, it means this command is being
            // invoked via the command palatte. Provide quickpick test targets for
            // the user to choose from.
            const quickPick = yield vscode.window.showQuickPick(bazel_1.queryQuickPickTargets("\"kind('.*_test rule', ...)\""), {
                canPickMany: false,
            });
            // If the result was undefined, the user cancelled the quick pick, so don't
            // try again.
            if (quickPick) {
                bazelTestTarget(quickPick);
            }
            return;
        }
        const commandOptions = adapter.getBazelCommandOptions();
        const task = bazel_1.createBazelTask("test", commandOptions);
        vscode.tasks.executeTask(task);
    });
}
/**
 * Cleans a Bazel workspace.
 *
 * If there is only a single workspace open, it will be cleaned immediately. If
 * there are multiple workspace folders open, a quick-pick window will be opened
 * asking the user to choose one.
 */
function bazelClean() {
    return __awaiter(this, void 0, void 0, function* () {
        const workspaces = vscode.workspace.workspaceFolders;
        let workspaceFolder;
        switch (workspaces.length) {
            case 0:
                vscode.window.showInformationMessage("Please open a Bazel workspace folder to use this command.");
                return;
            case 1:
                workspaceFolder = workspaces[0];
                break;
            default:
                workspaceFolder = yield vscode.window.showWorkspaceFolderPick();
                if (workspaceFolder === undefined) {
                    return;
                }
        }
        const task = bazel_1.createBazelTask("clean", {
            options: [],
            targets: [],
            workspaceInfo: bazel_1.BazelWorkspaceInfo.fromWorkspaceFolder(workspaceFolder),
        });
        vscode.tasks.executeTask(task);
    });
}
/** The URL to load for buildifier's releases. */
const BUILDTOOLS_RELEASES_URL = "https://github.com/bazelbuild/buildtools/releases";
/**
 * Checks whether buildifier is available (either at the system PATH or a
 * user-specified path, depending on the value in Settings).
 *
 * If not available, a warning message will be presented to the user with a
 * Download button that they can use to go to the GitHub releases page.
 */
function checkBuildifierIsAvailable() {
    const buildifierExecutable = buildifier_1.getDefaultBuildifierExecutablePath();
    which(buildifierExecutable, (err, _) => __awaiter(this, void 0, void 0, function* () {
        if (err) {
            const item = yield vscode.window.showWarningMessage("Buildifier was not found; linting and formatting of Bazel files " +
                "will not be available. Please download it from " +
                `${BUILDTOOLS_RELEASES_URL} and install it ` +
                "on your system PATH or set its location in Settings.", { title: "Download" });
            if (item && item.title === "Download") {
                vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(BUILDTOOLS_RELEASES_URL));
            }
        }
    }));
}
//# sourceMappingURL=extension.js.map