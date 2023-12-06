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
const fs = require("fs");
const path = require("path");
const vscode_debugadapter_1 = require("vscode-debugadapter");
const protos_1 = require("../protos");
const connection_1 = require("./connection");
const handles_1 = require("./handles");
/**
 * Returns a {@code number} equivalent to the given {@code number} or
 * {@code Long}.
 *
 * @param value If a {@code number}, the value itself is returned; if it is a
 *     {@code Long}, its equivalent is returned.
 * @returns A {@code number} equivalent to the given {@code number} or
 *     {@code Long}.
 */
function number64(value) {
    if (value instanceof Number) {
        return value;
    }
    return value.toNumber();
}
/** Manages the state of the debugging client's session. */
class BazelDebugSession extends vscode_debugadapter_1.DebugSession {
    /** Initializes a new Bazel debug session. */
    constructor() {
        super();
        /** Caches the result of invoking {@code bazel info} when debugging begins. */
        this.bazelInfo = new Map();
        /** Currently set breakpoints, keyed by source path. */
        this.sourceBreakpoints = new Map();
        /** Information about paused threads, keyed by thread number. */
        this.pausedThreads = new Map();
        /** An auto-indexed mapping of stack frames. */
        this.frameHandles = new handles_1.Handles();
        /**
         * An auto-indexed mapping of variables references, which may be either scopes
         * (whose values are directly members of the scope) or values with child
         * values (which need to be requested by contacting the debug server).
         */
        this.variableHandles = new handles_1.Handles();
        /** A mapping from frame reference numbers to thread IDs. */
        this.frameThreadIds = new Map();
        /** A mapping from scope reference numbers to thread IDs. */
        this.scopeThreadIds = new Map();
        /** A mapping from value reference numbers to thread IDs. */
        this.valueThreadIds = new Map();
        // Starlark uses 1-based line and column numbers.
        this.setDebuggerLinesStartAt1(true);
        this.setDebuggerColumnsStartAt1(true);
    }
    // Life-cycle requests
    initializeRequest(response, args) {
        response.body = response.body || {};
        response.body.supportsConfigurationDoneRequest = true;
        response.body.supportsConditionalBreakpoints = true;
        response.body.supportsEvaluateForHovers = true;
        this.sendResponse(response);
    }
    configurationDoneRequest(response, args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bazelConnection.sendRequest({
                startDebugging: protos_1.skylark_debugging.StartDebuggingRequest.create(),
            });
            this.sendResponse(response);
        });
    }
    launchRequest(response, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const port = args.port || 7300;
            const verbose = args.verbose || false;
            const bazelExecutable = this.bazelExecutable(args);
            this.bazelInfo = yield this.getBazelInfo(bazelExecutable, args.cwd);
            const bazelArgs = [
                args.bazelCommand,
                "--color=yes",
                "--experimental_skylark_debug",
                `--experimental_skylark_debug_server_port=${port}`,
                `--experimental_skylark_debug_verbose_logging=${verbose}`,
            ].concat(args.args);
            this.launchBazel(bazelExecutable, args.cwd, bazelArgs);
            this.bazelConnection = new connection_1.BazelDebugConnection("localhost", port, this.debugLog);
            this.bazelConnection.on("connect", () => {
                this.sendResponse(response);
                this.sendEvent(new vscode_debugadapter_1.InitializedEvent());
            });
            this.bazelConnection.on("event", (event) => {
                this.handleBazelEvent(event);
            });
        });
    }
    disconnectRequest(response, args) {
        // Kill the spawned Bazel process on disconnect. The Bazel server will stay
        // up, but this should terminate processing of the invoked command.
        this.bazelProcess.kill("SIGKILL");
        this.bazelProcess = null;
        this.isBazelRunning = false;
        this.sendResponse(response);
    }
    // Breakpoint requests
    setBreakPointsRequest(response, args) {
        // The path we need to pass to Bazel here depends on how the .bzl file has
        // been loaded. Unfortunately this means we have to create two breakpoints,
        // one for each possible path, because the way the .bzl file is loaded is
        // chosen by the user:
        //
        // 1. If the file is loaded using an explicit repository reference (i.e.,
        //    `@foo//:bar.bzl`), then it will appear in the `external` subdirectory
        //    of Bazel's output_base.
        // 2. If the file is loaded as a same-repository path (i.e., `//:bar.bzl`),
        //    then Bazel will treat it as if it were under `execroot`, which is a
        //    symlink to the actual filesystem location of the file.
        //
        // TODO(allevato): We may be able to simplify this once
        // https://github.com/bazelbuild/bazel/issues/6848 is in a release.
        const workspaceName = path.basename(this.bazelInfo.get("execution_root"));
        const relativeSourcePath = path.relative(this.bazelInfo.get("workspace"), args.source.path);
        const sourcePathInExternal = path.join(this.bazelInfo.get("output_base"), "external", workspaceName, relativeSourcePath);
        this.sourceBreakpoints.set(args.source.path, args.breakpoints);
        this.sourceBreakpoints.set(sourcePathInExternal, args.breakpoints);
        // Convert to Bazel breakpoints.
        const bazelBreakpoints = new Array();
        for (const [sourcePath, breakpoints] of this.sourceBreakpoints) {
            for (const breakpoint of breakpoints) {
                bazelBreakpoints.push(protos_1.skylark_debugging.Breakpoint.create({
                    expression: breakpoint.condition,
                    location: protos_1.skylark_debugging.Location.create({
                        lineNumber: breakpoint.line,
                        path: sourcePath,
                    }),
                }));
            }
        }
        this.bazelConnection.sendRequest({
            setBreakpoints: protos_1.skylark_debugging.SetBreakpointsRequest.create({
                breakpoint: bazelBreakpoints,
            }),
        });
        this.sendResponse(response);
    }
    // Thread, stack frame, and variable requests
    threadsRequest(response) {
        return __awaiter(this, void 0, void 0, function* () {
            response.body = {
                threads: Array.from(this.pausedThreads.values()).map((bazelThread) => {
                    return new vscode_debugadapter_1.Thread(number64(bazelThread.id), bazelThread.name);
                }),
            };
            this.sendResponse(response);
        });
    }
    stackTraceRequest(response, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.bazelConnection.sendRequest({
                listFrames: protos_1.skylark_debugging.ListFramesRequest.create({
                    threadId: args.threadId,
                }),
            });
            if (event.listFrames) {
                const bazelFrames = event.listFrames.frame;
                const vsFrames = new Array();
                for (const bazelFrame of bazelFrames) {
                    const frameHandle = this.frameHandles.create(bazelFrame);
                    this.frameThreadIds.set(frameHandle, args.threadId);
                    const location = bazelFrame.location;
                    const vsFrame = new vscode_debugadapter_1.StackFrame(frameHandle, bazelFrame.functionName || "<global scope>");
                    if (location) {
                        // Resolve the real path to the file, which will make sure that when
                        // the user interacts with the stack frame, VS Code loads the file
                        // from it's actual path instead of from a location inside Bazel's
                        // output base.
                        const sourcePath = fs.realpathSync(location.path);
                        vsFrame.source = new vscode_debugadapter_1.Source(path.basename(sourcePath), sourcePath);
                        vsFrame.line = location.lineNumber;
                    }
                    vsFrames.push(vsFrame);
                }
                response.body = { stackFrames: vsFrames, totalFrames: vsFrames.length };
            }
            this.sendResponse(response);
        });
    }
    scopesRequest(response, args) {
        const frameThreadId = this.frameThreadIds.get(args.frameId);
        const bazelFrame = this.frameHandles.get(args.frameId);
        const vsScopes = new Array();
        for (const bazelScope of bazelFrame.scope) {
            const scopeHandle = this.variableHandles.create(bazelScope);
            const vsScope = new vscode_debugadapter_1.Scope(bazelScope.name, scopeHandle);
            vsScopes.push(vsScope);
            // Associate the thread ID from the frame with the scope so that it can be
            // passed through to child values as well.
            this.scopeThreadIds.set(scopeHandle, frameThreadId);
        }
        response.body = { scopes: vsScopes };
        this.sendResponse(response);
    }
    variablesRequest(response, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let bazelValues;
            let threadId;
            const reference = args.variablesReference;
            const scopeOrParentValue = this.variableHandles.get(reference);
            if (scopeOrParentValue instanceof protos_1.skylark_debugging.Scope) {
                // If the reference is to a scope, then we ask for the thread ID
                // associated with the scope so that we can associate it later with the
                // top-level values in the scope.
                threadId = this.scopeThreadIds.get(reference);
                bazelValues = scopeOrParentValue.binding;
            }
            else if (scopeOrParentValue instanceof protos_1.skylark_debugging.Value) {
                // If the reference is to a value, we need to send a request to Bazel to
                // get its child values.
                threadId = this.valueThreadIds.get(reference);
                bazelValues = (yield this.bazelConnection.sendRequest({
                    getChildren: protos_1.skylark_debugging.GetChildrenRequest.create({
                        threadId,
                        valueId: scopeOrParentValue.id,
                    }),
                })).getChildren.children;
            }
            else {
                bazelValues = [];
                threadId = 0;
            }
            const variables = new Array();
            for (const value of bazelValues) {
                let valueHandle;
                if (value.hasChildren && value.id) {
                    // Record the value in a handle so that its children can be queried when
                    // the user expands it in the UI. We also record the thread ID for the
                    // value since we need it when we make that request later.
                    valueHandle = this.variableHandles.create(value);
                    this.valueThreadIds.set(valueHandle, threadId);
                }
                else {
                    valueHandle = 0;
                }
                const variable = new vscode_debugadapter_1.Variable(value.label, value.description, valueHandle);
                variables.push(variable);
            }
            response.body = { variables };
            this.sendResponse(response);
        });
    }
    evaluateRequest(response, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const threadId = this.frameThreadIds.get(args.frameId);
            const value = (yield this.bazelConnection.sendRequest({
                evaluate: protos_1.skylark_debugging.EvaluateRequest.create({
                    statement: args.expression,
                    threadId,
                }),
            })).evaluate.result;
            let valueHandle;
            if (value.hasChildren && value.id) {
                // Record the value in a handle so that its children can be queried when
                // the user expands it in the UI. We also record the thread ID for the
                // value since we need it when we make that request later.
                valueHandle = this.variableHandles.create(value);
                this.valueThreadIds.set(valueHandle, threadId);
            }
            else {
                valueHandle = 0;
            }
            response.body = {
                result: value.description,
                variablesReference: valueHandle,
            };
            this.sendResponse(response);
        });
    }
    // Execution/control flow requests
    continueRequest(response, args) {
        response.body = { allThreadsContinued: false };
        this.sendControlFlowRequest(args.threadId, protos_1.skylark_debugging.Stepping.NONE);
        this.sendResponse(response);
    }
    nextRequest(response, args) {
        this.sendControlFlowRequest(args.threadId, protos_1.skylark_debugging.Stepping.OVER);
        this.sendResponse(response);
    }
    stepInRequest(response, args) {
        this.sendControlFlowRequest(args.threadId, protos_1.skylark_debugging.Stepping.INTO);
        this.sendResponse(response);
    }
    stepOutRequest(response, args) {
        this.sendControlFlowRequest(args.threadId, protos_1.skylark_debugging.Stepping.OUT);
        this.sendResponse(response);
    }
    /**
     * Sends a request to Bazel to continue the execution of the given thread,
     * with stepping behavior.
     *
     * @param threadId The identifier of the thread to continue.
     * @param stepping The stepping behavior of the request (OVER, INTO, OUT, or
     *     NONE).
     */
    sendControlFlowRequest(threadId, stepping) {
        // Clear out all the cached state when the user resumes a thread.
        this.frameHandles.clear();
        this.variableHandles.clear();
        this.frameThreadIds.clear();
        this.scopeThreadIds.clear();
        this.valueThreadIds.clear();
        this.bazelConnection.sendRequest({
            continueExecution: protos_1.skylark_debugging.ContinueExecutionRequest.create({
                stepping,
                threadId,
            }),
        });
    }
    /**
     * Dispatches an asynchronous Bazel debug event received from the server.
     *
     * @param event The event that was received from the server.
     */
    handleBazelEvent(event) {
        switch (event.payload) {
            case "threadPaused":
                this.handleThreadPaused(event.threadPaused);
                break;
            case "threadContinued":
                this.handleThreadContinued(event.threadContinued);
                break;
            default:
                break;
        }
    }
    handleThreadPaused(event) {
        this.pausedThreads.set(number64(event.thread.id), event.thread);
        this.sendEvent(new vscode_debugadapter_1.StoppedEvent("a breakpoint", number64(event.thread.id)));
    }
    handleThreadContinued(event) {
        this.sendEvent(new vscode_debugadapter_1.ContinuedEvent(number64(event.threadId)));
        this.pausedThreads.delete(number64(event.threadId));
    }
    /**
     * Returns the path to the Bazel executable from launch arguments, or a
     * reasonable default.
     */
    bazelExecutable(launchArgs) {
        const bazelExecutable = launchArgs.bazelExecutablePath;
        if (!bazelExecutable || bazelExecutable.length === 0) {
            return "bazel";
        }
        return bazelExecutable;
    }
    /**
     * Invokes {@code bazel info} and returns the information in a map.
     *
     * @param bazelExecutable The name/path of the Bazel executable.
     * @param cwd The working directory in which Bazel should be launched.
     */
    getBazelInfo(bazelExecutable, cwd) {
        return new Promise((resolve, reject) => {
            const execOptions = {
                cwd,
                // The maximum amount of data allowed on stdout. 500KB should be plenty
                // of `bazel info`, but if this becomes problematic we can switch to the
                // event-based `child_process` APIs instead.
                maxBuffer: 500 * 1024,
            };
            child_process.exec([bazelExecutable, "info"].join(" "), execOptions, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
                else {
                    const keyValues = new Map();
                    const lines = stdout.trim().split("\n");
                    for (const line of lines) {
                        const [key, value] = line.split(":", 2);
                        keyValues.set(key.trim(), value.trim());
                    }
                    resolve(keyValues);
                }
            });
        });
    }
    /**
     * Launches the Bazel process to be debugged.
     *
     * @param bazelExecutable The name/path of the Bazel executable.
     * @param cwd The working directory in which Bazel should be launched.
     * @param args The command line arguments to pass to Bazel.
     */
    launchBazel(bazelExecutable, cwd, args) {
        const options = { cwd };
        this.bazelProcess = child_process
            .spawn(bazelExecutable, args, options)
            .on("error", (error) => {
            this.onBazelTerminated(error);
        })
            .on("exit", (code, signal) => {
            this.onBazelTerminated({ code, signal });
        });
        this.isBazelRunning = true;
        // We intentionally render stderr from Bazel as stdout in VS Code so that
        // normal build log text shows up as white instead of red. ANSI color codes
        // are applied as expected in either case.
        this.bazelProcess.stdout.on("data", (data) => {
            this.onBazelOutput(data);
        });
        this.bazelProcess.stderr.on("data", (data) => {
            this.onBazelOutput(data);
        });
    }
    /**
     * Called when the Bazel child process as terminated.
     *
     * @param result The outcome of the process; either an object containing the
     *     exit code and signal by which it terminated, or an {@code Error}
     *     describing an exceptional situation that occurred.
     */
    onBazelTerminated(result) {
        // TODO(allevato): Handle abnormal termination.
        if (this.isBazelRunning) {
            this.isBazelRunning = false;
            this.sendEvent(new vscode_debugadapter_1.TerminatedEvent());
        }
    }
    /**
     * Called when the Bazel child process has produced output on stdout or
     * stderr.
     *
     * @param data The string that was output.
     */
    onBazelOutput(data) {
        this.sendEvent(new vscode_debugadapter_1.OutputEvent(data.toString(), "stdout"));
    }
    /**
     * Sends output events to the client to log messages and optional
     * pretty-printed objects.
     */
    debugLog(message, ...objects) {
        this.sendEvent(new vscode_debugadapter_1.OutputEvent(message, "console"));
        for (const object of objects) {
            const s = JSON.stringify(object, undefined, 2);
            if (s) {
                this.sendEvent(new vscode_debugadapter_1.OutputEvent(`\n${s}`, "console"));
            }
        }
        this.sendEvent(new vscode_debugadapter_1.OutputEvent("\n", "console"));
    }
}
// Start the debugging session.
vscode_debugadapter_1.DebugSession.run(BazelDebugSession);
//# sourceMappingURL=client.js.map