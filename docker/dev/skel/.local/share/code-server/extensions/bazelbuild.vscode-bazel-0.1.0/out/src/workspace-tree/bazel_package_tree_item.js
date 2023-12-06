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
const bazel_target_tree_item_1 = require("./bazel_target_tree_item");
/** A tree item representing a build package. */
class BazelPackageTreeItem {
    /**
     * Initializes a new tree item with the given workspace path and package path.
     *
     * @param workspacePath The path to the VS Code workspace folder.
     * @param packagePath The path to the build package that this item represents.
     * @param parentPackagePath The path to the build package of the tree item
     *     that is this item's parent, which indicates how much of
     *     {@code packagePath} should be stripped for the item's label.
     */
    constructor(workspaceInfo, packagePath, parentPackagePath) {
        this.workspaceInfo = workspaceInfo;
        this.packagePath = packagePath;
        this.parentPackagePath = parentPackagePath;
        /**
         * The array of subpackages that should be shown directly under this package
         * item.
         */
        this.directSubpackages = [];
    }
    mightHaveChildren() {
        return true;
    }
    getChildren() {
        return __awaiter(this, void 0, void 0, function* () {
            const queryResult = yield new bazel_1.BazelQuery(this.workspaceInfo.bazelWorkspacePath, `//${this.packagePath}:all`, [], true).queryTargets();
            const targets = queryResult.target.map((target) => {
                return new bazel_target_tree_item_1.BazelTargetTreeItem(this.workspaceInfo, target);
            });
            return this.directSubpackages.concat(targets);
        });
    }
    getLabel() {
        // If this is a top-level package, include the leading double-slash on the
        // label.
        if (this.parentPackagePath.length === 0) {
            return `//${this.packagePath}`;
        }
        // Otherwise, strip off the part of the package path that came from the
        // parent item (along with the slash).
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
exports.BazelPackageTreeItem = BazelPackageTreeItem;
//# sourceMappingURL=bazel_package_tree_item.js.map