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
const child_process = require("child_process");
const path = require("path");
const vscode = require("vscode");
const buildifier_warning_1 = require("./buildifier_warning");
/**
 * Invokes buildifier in format mode.
 *
 * @param fileContent The BUILD or .bzl file content to process, which is sent
 *     via stdin.
 * @param type Indicates whether to treat the file content as a BUILD file or a
 *     .bzl file.
 * @param applyLintFixes If true, lint warnings with automatic fixes will be
 *     fixed as well.
 * @returns The formatted file content.
 */
function buildifierFormat(fileContent, type, applyLintFixes) {
    return __awaiter(this, void 0, void 0, function* () {
        const args = [`--mode=fix`, `--type=${type}`];
        if (applyLintFixes) {
            args.push(`--lint=fix`);
        }
        return (yield executeBuildifier(fileContent, args)).stdout;
    });
}
exports.buildifierFormat = buildifierFormat;
function buildifierLint(fileContent, type, lintMode) {
    return __awaiter(this, void 0, void 0, function* () {
        const args = [`--type=${type}`, `--lint=${lintMode}`];
        const outputs = yield executeBuildifier(fileContent, args);
        switch (lintMode) {
            case "fix":
                return outputs.stdout;
            case "warn":
                const trimmedOutput = outputs.stderr.trim();
                if (trimmedOutput.length) {
                    return parseLintWarnings(trimmedOutput.split("\n"));
                }
                return [];
        }
    });
}
exports.buildifierLint = buildifierLint;
/**
 * Returns the file type of a file with the given path.
 *
 * @param fsPath The file path, whose extension and basename are used to
 *     determine the file type.
 * @returns The buildifier type of the file.
 */
function getBuildifierFileType(fsPath) {
    // NOTE: The implementation here should be kept in sync with buildifier's
    // automatic format detection (see:
    // https://github.com/bazelbuild/buildtools/blob/d39e4d/build/lex.go#L88)
    // so that user actions in the IDE are consistent with the behavior they
    // would see running buildifier on the command line.
    const parsedPath = path.parse(fsPath.toLowerCase());
    if (parsedPath.ext === ".bzl" || parsedPath.ext === ".sky") {
        return "bzl";
    }
    if (parsedPath.ext === ".build" || parsedPath.base === "build") {
        return "build";
    }
    if (parsedPath.ext === ".workspace" || parsedPath.base === "workspace") {
        return "workspace";
    }
    return "bzl";
}
exports.getBuildifierFileType = getBuildifierFileType;
/**
 * Gets the path to the buildifier executable specified by the workspace
 * configuration, if present.
 *
 * @returns The path to the buildifier executable specified in the workspace
 *     configuration, or just "buildifier" if not present (in which case the
 *     system path will be searched).
 */
function getDefaultBuildifierExecutablePath() {
    // Try to retrieve the executable from VS Code's settings. If it's not set,
    // just use "buildifier" as the default and get it from the system PATH.
    const bazelConfig = vscode.workspace.getConfiguration("bazel");
    const buildifierExecutable = bazelConfig.buildifierExecutable;
    if (buildifierExecutable.length === 0) {
        return "buildifier";
    }
    return buildifierExecutable;
}
exports.getDefaultBuildifierExecutablePath = getDefaultBuildifierExecutablePath;
/**
 * Parses the output of buildifier's {@code --lint=warn} mode and constructs
 * objects representing the warnings.
 *
 * @param lines The lines of output from standard error.
 */
function parseLintWarnings(lines) {
    const warnings = new Array();
    let lineNumber = 0;
    let category = "";
    let message = "";
    for (const line of lines) {
        // Lines that start a new lint warning will have the following format:
        // "stdin:10: category: message"
        // Some messages may span multiple lines; the loop below handled that by
        // waiting until we see a new message start line (or the end of the input)
        // before committing a warning.
        if (line.startsWith("stdin:")) {
            if (message) {
                warnings.push(new buildifier_warning_1.BuildifierWarning(lineNumber, category, message));
            }
            const [_, lineNumberPart, categoryPart, ...remainder] = line.split(":");
            lineNumber = parseInt(lineNumberPart, 10);
            category = categoryPart.trim();
            message = remainder.join(":");
        }
        else {
            message += `\n${line}`;
        }
    }
    if (message) {
        warnings.push(new buildifier_warning_1.BuildifierWarning(lineNumber, category, message));
    }
    return warnings;
}
/**
 * Executes buildifier with the given file content and arguments.
 *
 * @param fileContent The BUILD or .bzl file content to process, which is sent
 *     via stdin.
 * @param args Command line arguments to pass to buildifier.
 */
function executeBuildifier(fileContent, args) {
    return new Promise((resolve, reject) => {
        const execOptions = {
            maxBuffer: Number.MAX_SAFE_INTEGER,
        };
        const process = child_process.exec(
        // TODO(allevato): If we can use the `--path=<path>` argument in the
        // future, we'll need to quote the path to avoid issues with spaces.
        [getDefaultBuildifierExecutablePath()].concat(args).join(" "), execOptions, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            else {
                resolve({ stdout, stderr });
            }
        });
        // Write the file being linted/formatted to stdin and close the stream so
        // that the buildifier process continues.
        process.stdin.write(fileContent);
        process.stdin.end();
    });
}
//# sourceMappingURL=buildifier.js.map