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
const bazel_command_1 = require("./bazel_command");
/**
 * Commands that are executed as child processes, returning their output as a
 * promise.
 */
class BazelChildProcessCommand extends bazel_command_1.BazelCommand {
    /**
     * Initializes a new Bazel command instance.
     *
     * @param workingDirectory The path to the directory from which Bazel will be
     *     spawned.
     * @param options Command line options that will be passed to Bazel (targets,
     *     query strings, flags, etc.).
     * @param ignoresErrors If true, a non-zero exit code for the child process is
     *     ignored and the {@link #run} function's promise is resolved with the
     *     empty string instead.
     */
    constructor(workingDirectory, options = [], ignoresErrors = false) {
        super(workingDirectory, options);
        this.ignoresErrors = ignoresErrors;
    }
}
exports.BazelChildProcessCommand = BazelChildProcessCommand;
//# sourceMappingURL=bazel_child_process_command.js.map