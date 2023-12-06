"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cp = require("child_process");
const path = require("path");
const util = require("./util");
const async_1 = require("./async");
function startClassic(extensionRoot, lldbLocation, extraEnv, // extra environment to be set for adapter
workDir, adapterParameters, // feature parameters that should be passed on to the adapter
verboseLogging) {
    return __awaiter(this, void 0, void 0, function* () {
        let env = util.mergeEnv(extraEnv);
        if (verboseLogging) {
            adapterParameters['logLevel'] = 0;
        }
        let paramsBase64 = new Buffer(JSON.stringify(adapterParameters)).toString('base64');
        let args = ['-b',
            '-O', `command script import '${path.join(extensionRoot, 'adapter')}'`,
            '-O', `script adapter.run_tcp_session(0, '${paramsBase64}')`
        ];
        return spawnDebugAdapter(lldbLocation, args, env, workDir);
    });
}
exports.startClassic = startClassic;
function startNative(extensionRoot, liblldb, extraEnv, // extra environment to be set for adapter
workDir, adapterParameters, // feature parameters that should be passed on to the adapter
verboseLogging) {
    return __awaiter(this, void 0, void 0, function* () {
        let env = util.mergeEnv(extraEnv);
        let executable = path.join(extensionRoot, 'adapter2/codelldb');
        let args = ['--preload', liblldb];
        if (process.platform == 'win32') {
            // Add liblldb's directory to PATH so it can find msdia dll later.
            env['PATH'] = env['PATH'] + ';' + path.dirname(liblldb);
            // LLDB will need python36.dll anyways, and we can provide a better error message
            // if we preload it explicitly.
            args = ['--preload', 'python36.dll'].concat(args);
        }
        if (adapterParameters) {
            args = args.concat(['--params', JSON.stringify(adapterParameters)]);
        }
        if (verboseLogging) {
            env['RUST_LOG'] = 'error,codelldb=debug';
            env['RUST_TRACEBACK'] = '1';
        }
        return spawnDebugAdapter(executable, args, env, workDir);
    });
}
exports.startNative = startNative;
function spawnDebugAdapter(executable, args, env, cwd) {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.platform == 'darwin') {
            // Make sure LLDB finds system Python before Brew Python
            // https://github.com/Homebrew/legacy-homebrew/issues/47201
            env['PATH'] = '/usr/bin:' + env['PATH'];
        }
        else if (process.platform == 'win32') {
            // Try to locate Python installation and add it to the PATH.
            let pythonPath = yield getWindowsPythonPath();
            if (pythonPath) {
                env['PATH'] = env['PATH'] + ';' + pythonPath;
            }
        }
        return cp.spawn(executable, args, {
            stdio: ['ignore', 'pipe', 'pipe'],
            env: env,
            cwd: cwd
        });
    });
}
exports.spawnDebugAdapter = spawnDebugAdapter;
function getDebugServerPort(adapter) {
    return __awaiter(this, void 0, void 0, function* () {
        let regex = /^Listening on port (\d+)\s/m;
        let match = yield waitForPattern(adapter, adapter.stdout, regex);
        return parseInt(match[1]);
    });
}
exports.getDebugServerPort = getDebugServerPort;
function waitForPattern(process, channel, pattern, timeoutMillis = 10000) {
    return new Promise((resolve, reject) => {
        let promisePending = true;
        let processOutput = '';
        // Wait for expected pattern in channel.
        channel.on('data', chunk => {
            let chunkStr = chunk.toString();
            if (promisePending) {
                processOutput += chunkStr;
                let match = pattern.exec(processOutput);
                if (match) {
                    clearTimeout(timer);
                    processOutput = null;
                    promisePending = false;
                    resolve(match);
                }
            }
        });
        // On spawn error.
        process.on('error', err => {
            promisePending = false;
            reject(err);
        });
        // Bail if LLDB does not start within the specified timeout.
        let timer = setTimeout(() => {
            if (promisePending) {
                process.kill();
                let err = Error('The debugger did not start within the allotted time.');
                err.code = 'Timeout';
                err.stdout = processOutput;
                promisePending = false;
                reject(err);
            }
        }, timeoutMillis);
        // Premature exit.
        process.on('exit', (code, signal) => {
            if (promisePending) {
                let err = Error('The debugger exited without completing startup handshake.');
                err.code = 'Handshake';
                err.stdout = processOutput;
                promisePending = false;
                reject(err);
            }
        });
    });
}
exports.waitForPattern = waitForPattern;
function findLibLLDB(pathHint) {
    return __awaiter(this, void 0, void 0, function* () {
        let stat = yield async_1.statAsync(pathHint);
        if (stat.isFile())
            return pathHint;
        let libDir;
        let pattern;
        if (process.platform == 'linux') {
            libDir = path.join(pathHint, 'lib');
            pattern = /liblldb.*\.so.*/;
        }
        else if (process.platform == 'darwin') {
            libDir = path.join(pathHint, 'lib');
            pattern = /liblldb\..*dylib|LLDB/;
        }
        else if (process.platform == 'win32') {
            libDir = path.join(pathHint, 'bin');
            pattern = /liblldb\.dll/;
        }
        for (let dir of [pathHint, libDir]) {
            let file = yield util.findFileByPattern(dir, pattern);
            if (file) {
                return path.join(dir, file);
            }
        }
        return null;
    });
}
exports.findLibLLDB = findLibLLDB;
exports.pythonVersion = '3.6';
function getWindowsPythonPath() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.platform != 'win32')
            throw new Error('Windows only!');
        let path = yield getPythonPathAsync;
        if (path == null) { // Don't cache negative result - in case they install Python without restarting VSCode.
            getPythonPathAsync = getWindowsPythonPathImpl();
            path = yield getPythonPathAsync;
        }
        return path;
    });
}
exports.getWindowsPythonPath = getWindowsPythonPath;
// Kick off this query as soon as the module gets loaded.
let getPythonPathAsync = getWindowsPythonPathImpl();
function getWindowsPythonPathImpl() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.platform != 'win32')
            return undefined;
        let path = yield util.readRegistry(`HKCU\\Software\\Python\\PythonCore\\${exports.pythonVersion}\\InstallPath`, null);
        if (!path) {
            path = yield util.readRegistry(`HKLM\\Software\\Python\\PythonCore\\${exports.pythonVersion}\\InstallPath`, null);
        }
        return path;
    });
}
//# sourceMappingURL=adapter.js.map