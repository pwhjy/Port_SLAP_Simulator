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
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const bazel_1 = require("../bazel");
const bazel_workspace_folder_tree_item_1 = require("./bazel_workspace_folder_tree_item");
/**
 * Provides a tree of Bazel build packages and targets for the VS Code explorer
 * interface.
 */
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
        // If we're given an element, we're not asking for the top-level elements,
        // so just delegate to that element to get its children.
        if (element) {
            return element.getChildren();
        }
        if (vscode.workspace.workspaceFolders) {
            // If the user has a workspace open and there's only one folder in it,
            // then don't show the workspace folder; just show its packages at the top
            // level.
            if (vscode.workspace.workspaceFolders.length === 1) {
                const workspaceFolder = vscode.workspace.workspaceFolders[0];
                const folderItem = new bazel_workspace_folder_tree_item_1.BazelWorkspaceFolderTreeItem(bazel_1.BazelWorkspaceInfo.fromWorkspaceFolder(workspaceFolder));
                return folderItem.getChildren();
            }
            // If the user has multiple workspace folders open, then show them as
            // individual top level items.
            return Promise.resolve(vscode.workspace.workspaceFolders.map((folder) => {
                return new bazel_workspace_folder_tree_item_1.BazelWorkspaceFolderTreeItem(bazel_1.BazelWorkspaceInfo.fromWorkspaceFolder(folder));
            }));
        }
        // If the user doesn't have a folder open in the workspace, don't show
        // anything.
        return Promise.resolve([]);
    }
    getTreeItem(element) {
        const label = element.getLabel();
        const collapsibleState = element.mightHaveChildren()
            ? vscode.TreeItemCollapsibleState.Collapsed
            : vscode.TreeItemCollapsibleState.None;
        const treeItem = new vscode.TreeItem(label, collapsibleState);
        treeItem.contextValue = element.getContextValue();
        treeItem.iconPath = element.getIcon();
        treeItem.tooltip = element.getTooltip();
        treeItem.command = element.getCommand();
        return treeItem;
    }
    /** Forces a re-query and refresh of the tree's contents. */
    refresh() {
        this.onDidChangeTreeDataEmitter.fire();
    }
    /**
     * Called to update the tree when a BUILD file is created, deleted, or
     * changed.
     *
     * @param uri The file system URI of the file that changed.
     */
    onBuildFilesChanged(uri) {
        // TODO(allevato): Look into firing the event only for tree items that are
        // affected by the change.
        this.refresh();
    }
}
exports.BazelWorkspaceTreeProvider = BazelWorkspaceTreeProvider;
//# sourceMappingURL=bazel_workspace_tree_provider.js.map