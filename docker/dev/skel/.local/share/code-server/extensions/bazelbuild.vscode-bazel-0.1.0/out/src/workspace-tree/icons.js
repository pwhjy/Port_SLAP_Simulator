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
/**
 * Icons to use for specific rule classes.
 *
 * This mapping is checked before the general suffix checks for
 * binary/library/test rules, so it can be used to override specific rules, or
 * rules that don't have the standard suffixes. For example, Apple
 * application/extension/framework targets are shown with folder-like icons
 * because those bundles are conceptually folders.
 */
const SPECIFIC_RULE_CLASS_ICONS = {
    android_binary: "android_binary",
    apple_bundle_import: "resource_bundle",
    apple_resource_bundle: "resource_bundle",
    config_setting: "config_setting",
    filegroup: "filegroup",
    genrule: "genrule",
    ios_application: "apple_application",
    ios_extension: "apple_executable_bundle",
    ios_framework: "apple_framework",
    macos_application: "apple_application",
    macos_bundle: "apple_executable_bundle",
    macos_extension: "apple_executable_bundle",
    objc_bundle: "resource_bundle",
    objc_bundle_library: "resource_bundle",
    objc_framework: "apple_framework",
    objc_import: "library",
    proto_library: "proto",
    swift_c_module: "library",
    swift_import: "library",
    test_suite: "test_suite",
    tvos_application: "apple_application",
    tvos_extension: "apple_executable_bundle",
    watchos_application: "apple_application",
    watchos_extension: "apple_executable_bundle",
};
/**
 * Returns a string or {@code vscode.ThemeIcon} representing the icon to display
 * for the given build target.
 *
 * @param rule The {@code QueriedRule} representing the build target.
 */
function getBazelRuleIcon(target) {
    const ruleClass = target.rule.ruleClass;
    let iconName = SPECIFIC_RULE_CLASS_ICONS[ruleClass];
    if (!iconName) {
        if (ruleClass.endsWith("_binary")) {
            iconName = "binary";
        }
        else if (ruleClass.endsWith("_proto_library")) {
            iconName = "proto";
        }
        else if (ruleClass.endsWith("_library")) {
            iconName = "library";
        }
        else if (ruleClass.endsWith("_test")) {
            iconName = "test";
        }
    }
    if (iconName) {
        return path.join(__dirname, "../../../icons", `${iconName}.svg`);
    }
    else {
        return vscode.ThemeIcon.File;
    }
}
exports.getBazelRuleIcon = getBazelRuleIcon;
//# sourceMappingURL=icons.js.map