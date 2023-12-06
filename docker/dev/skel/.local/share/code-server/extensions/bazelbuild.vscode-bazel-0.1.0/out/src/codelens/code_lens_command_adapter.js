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
/**
 * Command adapter to pass arguments to Bazel commands.
 */
class CodeLensCommandAdapter {
    /**
     * Initializes a new CodeLens command adapter that invokes Bazel.
     *
     * @param workspaceFolder Workspace folder from which to execute Bazel.
     * @param options Other command line arguments to pass to Bazel.
     */
    constructor(workspaceInfo, targets, options = []) {
        this.workspaceInfo = workspaceInfo;
        this.targets = targets;
        this.options = options;
    }
    getBazelCommandOptions() {
        return {
            options: this.options,
            targets: this.targets,
            workspaceInfo: this.workspaceInfo,
        };
    }
}
exports.CodeLensCommandAdapter = CodeLensCommandAdapter;
//# sourceMappingURL=code_lens_command_adapter.js.map