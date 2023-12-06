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
const path = require("path");
const vscode = require("vscode");
const bazel_1 = require("../bazel");
const icons_1 = require("./icons");
/** A tree item representing a build target. */
class BazelTargetTreeItem {
    /**
     * Initializes a new tree item with the given query result representing a
     * build target.
     *
     * @param target An object representing a build target that was produced by a
     *     query.
     */
    constructor(workspaceInfo, target) {
        this.workspaceInfo = workspaceInfo;
        this.target = target;
    }
    mightHaveChildren() {
        return false;
    }
    getChildren() {
        return Promise.resolve([]);
    }
    getLabel() {
        const fullPath = this.target.rule.name;
        const colonIndex = fullPath.lastIndexOf(":");
        const targetName = fullPath.substr(colonIndex);
        return `${targetName}  (${this.target.rule.ruleClass})`;
    }
    getIcon() {
        return icons_1.getBazelRuleIcon(this.target);
    }
    getTooltip() {
        return `${this.target.rule.name}`;
    }
    getCommand() {
        const location = new bazel_1.QueryLocation(this.target.rule.location);
        return {
            arguments: [
                vscode.Uri.file(location.path),
                { selection: location.range },
            ],
            command: "vscode.open",
            title: "Jump to Build Target",
        };
    }
    getContextValue() {
        const ruleClass = this.target.rule.ruleClass;
        if (ruleClass.endsWith("_test") || ruleClass === "test_suite") {
            return "testRule";
        }
        return "rule";
    }
    getBazelCommandOptions() {
        const location = new bazel_1.QueryLocation(this.target.rule.location);
        const workingDirectory = path.dirname(location.path);
        return {
            options: [],
            targets: [`${this.target.rule.name}`],
            workspaceInfo: this.workspaceInfo,
        };
    }
}
exports.BazelTargetTreeItem = BazelTargetTreeItem;
//# sourceMappingURL=bazel_target_tree_item.js.map