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
const child_process = require("child_process");
const vscode = require("vscode");
/** Common functionality used to execute Bazel commands. */
class BazelCommand {
    /**
     * Initializes a new Bazel command instance.
     *
     * @param workingDirectory The path to the directory from which Bazel will be spawned.
     * @param options Command line options that will be passed to Bazel (targets, query strings,
     *     flags, etc.).
     */
    constructor(workingDirectory, options = []) {
        this.workingDirectory = workingDirectory;
        this.options = options;
    }
    /** The command line string used to execute the query. */
    commandLine(additionalOptions = []) {
        var result = `${getDefaultBazelExecutablePath()} ${this.bazelCommand()}`;
        if (this.options.length > 0) {
            result += " ";
            result += this.options.join(" ");
        }
        if (additionalOptions.length > 0) {
            result += " ";
            result += additionalOptions.join(" ");
        }
        return result;
    }
}
exports.BazelCommand = BazelCommand;
/** Commands that are executed as child processes, returning their output as a promise. */
class BazelChildProcessCommand extends BazelCommand {
    /**
     * Initializes a new Bazel command instance.
     *
     * @param workingDirectory The path to the directory from which Bazel will be spawned.
     * @param options Command line options that will be passed to Bazel (targets, query strings,
     *     flags, etc.).
     * @param ignoresErrors If true, a non-zero exit code for the child process is ignored and the
     *     {@link #run} function's promise is resolved with the empty string instead.
     */
    constructor(workingDirectory, options = [], ignoresErrors = false) {
        super(workingDirectory, options);
        this.ignoresErrors = ignoresErrors;
    }
    /**
     * Executes the command and returns a promise for the contents of standard output.
     *
     * @param additionalOptions Additional command line options that apply only to this particular
     *     invocation of the command.
     * @returns A promise that is resolved with the contents of the process's standard output, or
     *     rejected if the command fails.
     */
    run(additionalOptions = []) {
        return new Promise((resolve, reject) => {
            const execOptions = {
                cwd: this.workingDirectory,
                maxBuffer: 500 * 1024
            };
            child_process.exec(this.commandLine(additionalOptions), execOptions, (error, stdout, stderr) => {
                if (error) {
                    if (this.ignoresErrors) {
                        resolve("");
                    }
                    else {
                        reject(error);
                    }
                }
                else {
                    resolve(stdout);
                }
            });
        });
    }
}
exports.BazelChildProcessCommand = BazelChildProcessCommand;
/** The singleton terminal managed by {@link provideBazelTerminal}. */
let bazelGlobalTerminal = null;
/** Returns the singleton terminal used to execute Bazel commands, creating it if needed. */
function getBazelGlobalTerminal() {
    if (bazelGlobalTerminal === null) {
        bazelGlobalTerminal = vscode.window.createTerminal("Bazel");
    }
    return bazelGlobalTerminal;
}
/** Commands that are executed in a terminal panel. */
class BazelTerminalCommand extends BazelCommand {
    /**
     * Executes the command, sending its output to the Bazel terminal panel.
     *
     * @param additionalOptions Additional command line options that apply only to this particular
     *     invocation of the command.
     */
    run(additionalOptions = []) {
        const terminal = getBazelGlobalTerminal();
        terminal.sendText("clear");
        terminal.show(true);
        terminal.sendText(`cd ${this.workingDirectory} && ${this.commandLine(additionalOptions)}`);
    }
}
exports.BazelTerminalCommand = BazelTerminalCommand;
/** Executes a Bazel build command and displays its output in the terminal. */
class BazelBuild extends BazelTerminalCommand {
    bazelCommand() { return "build"; }
}
exports.BazelBuild = BazelBuild;
/** Executes a Bazel test command and displays its output in the terminal. */
class BazelTest extends BazelTerminalCommand {
    bazelCommand() { return "test"; }
}
exports.BazelTest = BazelTest;
/**
 * Gets the path to the Bazel executable specified by the workspace configuratio, if present.
 *
 * @returns The path to the Bazel executable specified in the workspace configuration, or just
 *     "bazel" if not present (in which case the system path will be searched).
 */
function getDefaultBazelExecutablePath() {
    // Try to retrieve the executable from VS Code's settings. If it's not set, just use "bazel" as
    // the default and get it from the system PATH.
    const bazelConfig = vscode.workspace.getConfiguration("bazel");
    let bazelExecutable = bazelConfig.executable;
    if (bazelExecutable.length == 0) {
        return "bazel";
    }
    return bazelExecutable;
}
exports.getDefaultBazelExecutablePath = getDefaultBazelExecutablePath;
//# sourceMappingURL=commands.js.map