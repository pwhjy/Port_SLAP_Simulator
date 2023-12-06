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
const vscode = require("vscode");
const icons_1 = require("./icons");
const query_1 = require("../bazel/query");
/** A tree item representing a workspace folder. */
class BazelWorkspaceFolderTreeItem {
    /**
     * Initializes a new tree item with the given workspace folder.
     *
     * @param workspaceFolder The workspace folder that the tree item represents.
     */
    constructor(workspaceFolder) {
        this.workspaceFolder = workspaceFolder;
    }
    mightHaveChildren() { return true; }
    getChildren() {
        return this.getPackages();
    }
    getLabel() {
        return this.workspaceFolder.name;
    }
    getIcon() {
        return vscode.ThemeIcon.Folder;
    }
    getTooltip() {
        return this.workspaceFolder.uri.fsPath;
    }
    getCommand() {
        return undefined;
    }
    getContextValue() {
        return "workspaceFolder";
    }
    /**
     * Recursively creates the tree items that represent packages found in a Bazel query.
     *
     * @param packagePaths The array of package paths that were found under the folder in which the
     *     Bazel query was executed.
     * @param startIndex The starting index within the package paths where common prefixes should be
     *     searched.
     * @param endIndex The ending index (exclusive) within the package paths where common prefixes
     *     should be searched.
     * @param treeItems An array into which the tree items created at this level in the tree will be
     *     pushed.
     * @param parentPackagePath The parent package path of the items being created by this call, which
     *     is used to trim the package prefix from labels in the tree items.
     */
    buildPackageTree(packagePaths, startIndex, endIndex, treeItems, parentPackagePath) {
        // We can assume that the caller has sorted the packages, so we scan them to find groupings into
        // which we should traverse more deeply. For example, if we have the following structure:
        //
        //   foo
        //   foo/bar
        //   foo/baz
        //
        // ...then groupStart will point to "foo" and groupEnd will point to the index after "foo/baz",
        // indicating that they share a common prefix, that "foo" should be its own node, and then
        // we should recurse into that group to create child nodes. Then, if we have the following
        // structure:
        //
        //   foo/bar
        //   foo/baz
        //
        // ...then groupStart will point to "foo/bar", but since it's not a prefix of "foo/baz", then
        // it becomes its own group (and thus node) at that level, and the same happens subsequently for
        // "foo/bar".
        //
        // This means we only create intermediate tree nodes for directories that actually represent
        // packages (i.e., contain a BUILD file), and collapse intermediate directories that don't.
        let groupStart = startIndex;
        while (groupStart < endIndex) {
            const packagePath = packagePaths[groupStart];
            let groupEnd = groupStart + 1;
            // Make sure to check for a slash after the prefix so that we don't erroneously collapse
            // something like "foo" and "foobar".
            while (groupEnd < endIndex && packagePaths[groupEnd].startsWith(packagePath + "/")) {
                groupEnd++;
            }
            // At this point, groupStart points to a prefix and the elements at (groupStart + 1) to
            // groupEnd are preceded by that prefix. We create a tree node for the element at groupStart
            // and then recursively call the algorithm again to group its children.
            const item = new BazelPackageTreeItem(this.workspaceFolder.uri.fsPath, packagePath, parentPackagePath);
            treeItems.push(item);
            this.buildPackageTree(packagePaths, groupStart + 1, groupEnd, item.directSubpackages, packagePath);
            // Move our index to start looking for more groups in the next iteration of the loop.
            groupStart = groupEnd;
        }
    }
    /** Returns a promise for an array of tree items representing build packages. */
    getPackages() {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieve the list of all packages underneath the current workspace folder. Note that if the
            // workspace folder is not the root of a Bazel workspace but is instead a folder underneath it,
            // we query for *only* the packages under that folder (including the folder itself). This lets
            // us have a VS Code workspace that is pointed at a subpackage of a large workspace without
            // the performance penalty of querying the entire workspace.
            const workspacePath = this.workspaceFolder.uri.fsPath;
            const queryResult = yield new query_1.BazelQuery(workspacePath, "...", ["--output=package"]).run();
            let packagePaths = queryResult.trim().split("\n");
            packagePaths.sort();
            const topLevelItems = [];
            this.buildPackageTree(packagePaths, 0, packagePaths.length, topLevelItems, "");
            return Promise.resolve(topLevelItems);
        });
    }
}
/** A tree item representing a build package. */
class BazelPackageTreeItem {
    /**
     * Initializes a new tree item with the given workspace path and package path.
     *
     * @param workspacePath The path to the VS Code workspace folder.
     * @param packagePath The path to the build package that this item represents.
     * @param parentPackagePath The path to the build package of the tree item that is this item's
     *     parent, which indicates how much of {@code packagePath} should be stripped for the item's
     *     label.
     */
    constructor(workspacePath, packagePath, parentPackagePath) {
        this.workspacePath = workspacePath;
        this.packagePath = packagePath;
        this.parentPackagePath = parentPackagePath;
        /** The array of subpackages that should be shown directly under this package item. */
        this.directSubpackages = [];
    }
    mightHaveChildren() { return true; }
    getChildren() {
        return __awaiter(this, void 0, void 0, function* () {
            const queryResult = yield new query_1.BazelQuery(this.workspacePath, `//${this.packagePath}:all`, [], true).runAndParse();
            let targets = queryResult.rules.map((rule) => {
                return new BazelTargetTreeItem(rule);
            });
            return this.directSubpackages.concat(targets);
        });
    }
    getLabel() {
        // If this is a top-level package, include the leading double-slash on the label.
        if (this.parentPackagePath.length == 0) {
            return `//${this.packagePath}`;
        }
        // Otherwise, strip off the part of the package path that came from the parent item (along with
        // the slash).
        return this.packagePath.substring(this.parentPackagePath.length + 1);
    }
    getIcon() {
        return vscode.ThemeIcon.Folder;
    }
    getTooltip() {
        return `//${this.packagePath}`;
    }
    getCommand() {
        return undefined;
    }
    getContextValue() {
        return "package";
    }
}
/** A tree item representing a build target. */
class BazelTargetTreeItem {
    /**
     * Initializes a new tree item with the given query result representing a build target.
     *
     * @param queriedRule An object representing a build target that was produced by a query.
     */
    constructor(queriedRule) {
        this.queriedRule = queriedRule;
    }
    mightHaveChildren() { return false; }
    getChildren() {
        return Promise.resolve([]);
    }
    getLabel() {
        const fullPath = this.queriedRule.name;
        const colonIndex = fullPath.lastIndexOf(":");
        const targetName = fullPath.substr(colonIndex);
        return `${targetName}  (${this.queriedRule.ruleClass})`;
    }
    getIcon() {
        return icons_1.getBazelRuleIcon(this.queriedRule);
    }
    getTooltip() {
        return `${this.queriedRule.name}`;
    }
    getCommand() {
        const location = this.queriedRule.location;
        return {
            command: "vscode.open",
            title: "Jump to Build Target",
            arguments: [vscode.Uri.file(location.path), { selection: location.range }],
        };
    }
    getContextValue() {
        if (this.queriedRule.ruleClass.endsWith("_test")) {
            return "testRule";
        }
        return "rule";
    }
    getBazelCommandArgs() {
        const workingDirectory = path.dirname(this.queriedRule.location.path);
        return { "workingDirectory": workingDirectory, "options": [`${this.queriedRule.name}`] };
    }
}
/** Provides a tree of Bazel build packages and targets for the VS Code explorer interface. */
class BazelWorkspaceTreeProvider {
    /**
     * Initializes a new tree provider with the given extension context.
     *
     * @param context The VS Code extension context.
     */
    constructor(context) {
        this.context = context;
        /** Fired when BUILD files change in the workspace. */
        this.onDidChangeTreeDataEmitter = new vscode.EventEmitter();
        this.onDidChangeTreeData = this.onDidChangeTreeDataEmitter.event;
        const buildWatcher = vscode.workspace.createFileSystemWatcher("**/{BUILD,BUILD.bazel}", false, false, false);
        buildWatcher.onDidChange(this.onBuildFilesChanged, this, context.subscriptions);
        buildWatcher.onDidCreate(this.onBuildFilesChanged, this, context.subscriptions);
        buildWatcher.onDidDelete(this.onBuildFilesChanged, this, context.subscriptions);
    }
    getChildren(element) {
        // If we're given an element, we're not asking for the top-level elements, so just delegate to
        // that element to get its children.
        if (element) {
            return element.getChildren();
        }
        if (vscode.workspace.workspaceFolders) {
            // If the user has a workspace open and there's only one folder in it, then don't show the
            // workspace folder; just show its packages at the top level.
            if (vscode.workspace.workspaceFolders.length == 1) {
                const folderItem = new BazelWorkspaceFolderTreeItem(vscode.workspace.workspaceFolders[0]);
                return folderItem.getChildren();
            }
            // If the user has multiple workspace folders open, then show them as individual top level
            // items.
            return Promise.resolve(vscode.workspace.workspaceFolders.map((folder) => {
                return new BazelWorkspaceFolderTreeItem(folder);
            }));
        }
        // If the user doesn't have a folder open in the workspace, don't show anything.
        return Promise.resolve([]);
    }
    getTreeItem(element) {
        const label = element.getLabel();
        const collapsibleState = element.mightHaveChildren()
            ? vscode.TreeItemCollapsibleState.Collapsed
            : vscode.TreeItemCollapsibleState.None;
        let treeItem = new vscode.TreeItem(label, collapsibleState);
        treeItem.contextValue = element.getContextValue();
        treeItem.iconPath = element.getIcon();
        treeItem.tooltip = element.getTooltip();
        treeItem.command = element.getCommand();
        return treeItem;
    }
    /**
     * Called to update the tree when a BUILD file is created, deleted, or changed.
     *
     * @param uri The file system URI of the file that changed.
     */
    onBuildFilesChanged(uri) {
        // TODO(allevato): Look into firing the event only for tree items that are affected by the
        // change.
        this.onDidChangeTreeDataEmitter.fire();
    }
}
exports.BazelWorkspaceTreeProvider = BazelWorkspaceTreeProvider;
//# sourceMappingURL=workspace-tree.js.map