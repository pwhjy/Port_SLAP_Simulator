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
const vscode_1 = require("vscode");
const util_1 = require("util");
const ver = require("./ver");
const adapter = require("./adapter");
const install = require("./install");
const util = require("./util");
var DiagnosticsStatus;
(function (DiagnosticsStatus) {
    DiagnosticsStatus[DiagnosticsStatus["Succeeded"] = 0] = "Succeeded";
    DiagnosticsStatus[DiagnosticsStatus["Warning"] = 1] = "Warning";
    DiagnosticsStatus[DiagnosticsStatus["Failed"] = 2] = "Failed";
    DiagnosticsStatus[DiagnosticsStatus["NotFound"] = 3] = "NotFound";
})(DiagnosticsStatus || (DiagnosticsStatus = {}));
function diagnoseExternalLLDB(context, output, quiet = false) {
    return __awaiter(this, void 0, void 0, function* () {
        let status = DiagnosticsStatus.Succeeded;
        let config = vscode_1.workspace.getConfiguration('lldb', null);
        try {
            output.appendLine('--- Checking version ---');
            let versionPattern = '^lldb version ([0-9.]+)';
            let desiredVersion = '3.9.1';
            if (process.platform == 'win32') {
                desiredVersion = '4.0.0';
            }
            else if (process.platform == 'darwin') {
                versionPattern = '^lldb-([0-9.]+)';
                desiredVersion = '360.1.68';
            }
            let pattern = new RegExp(versionPattern, 'm');
            let adapterPathOrginal = config.get('executable', 'lldb');
            let adapterPath = adapterPathOrginal;
            let adapterEnv = config.get('adapterEnv', {});
            // Try to locate LLDB and get its version.
            let version = null;
            let lldbNames;
            if (process.platform == 'linux') {
                // Linux tends to have versioned binaries only.
                lldbNames = ['lldb', 'lldb-10.0', 'lldb-9.0', 'lldb-8.0', 'lldb-7.0',
                    'lldb-6.0', 'lldb-5.0', 'lldb-4.0', 'lldb-3.9'];
            }
            else {
                lldbNames = ['lldb'];
            }
            if (adapterPathOrginal != 'lldb') {
                lldbNames.unshift(adapterPathOrginal); // Also try the explicitly configured value.
            }
            for (let name of lldbNames) {
                try {
                    let env = util.mergeEnv(adapterEnv);
                    let lldb = yield adapter.spawnDebugAdapter(name, ['-v'], env, vscode_1.workspace.rootPath);
                    util.logProcessOutput(lldb, output);
                    version = (yield adapter.waitForPattern(lldb, lldb.stdout, pattern))[1];
                    adapterPath = name;
                    break;
                }
                catch (err) {
                    output.appendLine(util_1.inspect(err));
                }
            }
            if (!version) {
                status = DiagnosticsStatus.NotFound;
            }
            else {
                if (ver.lt(version, desiredVersion)) {
                    output.appendLine(`Warning: The version of your LLDB was detected as ${version}, which had never been tested with this extension. ` +
                        `Please consider upgrading to least version ${desiredVersion}.`);
                    status = DiagnosticsStatus.Warning;
                }
                // Check if Python scripting is usable.
                output.appendLine('--- Checking Python ---');
                let env = util.mergeEnv(adapterEnv);
                let lldb2 = yield adapter.spawnDebugAdapter(adapterPath, [
                    '-b',
                    '-O', 'script import sys, io, lldb',
                    '-O', 'script print(lldb.SBDebugger.Create().IsValid())',
                    '-O', 'script print("OK")'
                ], env, vscode_1.workspace.rootPath);
                util.logProcessOutput(lldb2, output);
                // [^] = match any char, including newline
                let match2 = yield adapter.waitForPattern(lldb2, lldb2.stdout, new RegExp('^True$[^]*^OK$', 'm'));
            }
            output.appendLine('--- Done ---');
            output.show(true);
            // If we updated adapterPath, ask user what to do.
            if (adapterPathOrginal != adapterPath) {
                if (!quiet) {
                    let action = yield vscode_1.window.showInformationMessage(`Could not launch LLDB executable "${adapterPathOrginal}", ` +
                        `however we did locate a usable LLDB binary: "${adapterPath}". ` +
                        `Would you like to update LLDB configuration with this value ? `, { modal: true }, 'Yes', 'No');
                    if (action == 'Yes') {
                        output.appendLine(`Setting "lldb.executable": "${adapterPath}".`);
                        config.update('executable', adapterPath, vscode_1.ConfigurationTarget.Global);
                    }
                    else {
                        status = DiagnosticsStatus.Failed;
                    }
                }
                else {
                    status = DiagnosticsStatus.Failed;
                }
            }
        }
        catch (err) {
            output.appendLine('');
            output.appendLine('*** An exception was raised during self-test ***');
            output.appendLine(util_1.inspect(err));
            status = DiagnosticsStatus.Failed;
        }
        if (!quiet) {
            output.show(true);
            switch (status) {
                case DiagnosticsStatus.Warning:
                    vscode_1.window.showWarningMessage('LLDB self-test completed with warnings.  Please check LLDB output panel for details.');
                    break;
                case DiagnosticsStatus.Failed:
                    vscode_1.window.showErrorMessage('LLDB self-test has failed!');
                    break;
                case DiagnosticsStatus.NotFound:
                    let buttons = [{ title: 'Show installation instructions', action: 'instructions' }];
                    if (config.get('adapterType') == 'classic') {
                        buttons.push({ title: 'Use bundled LLDB [Beta]', action: 'bundled' });
                    }
                    let choice = yield vscode_1.window.showErrorMessage('Could not find LLDB on this machine.', { modal: true }, ...buttons);
                    if (choice != null) {
                        if (choice.action == 'instructions') {
                            vscode_1.commands.executeCommand('vscode.open', vscode_1.Uri.parse('https://github.com/vadimcn/vscode-lldb/wiki/Installing-LLDB'));
                        }
                        else if (choice.action == 'bundled') {
                            output.appendLine('Setting "lldb.adapterType": "bundled".');
                            config.update('adapterType', 'bundled', vscode_1.ConfigurationTarget.Global);
                            if (yield install.ensurePlatformPackage(context, output))
                                status = DiagnosticsStatus.Succeeded;
                        }
                    }
                    break;
            }
        }
        return status < DiagnosticsStatus.Failed;
    });
}
exports.diagnoseExternalLLDB = diagnoseExternalLLDB;
function checkPython(output, quiet = false) {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.platform == 'win32') {
            let path = yield adapter.getWindowsPythonPath();
            if (path == null) {
                let action = yield vscode_1.window.showErrorMessage(`CodeLLDB requires Python ${adapter.pythonVersion} (64-bit), but looks like it is not installed on this machine.`, { modal: true }, 'Take me to Python website');
                if (action != null)
                    vscode_1.commands.executeCommand('vscode.open', vscode_1.Uri.parse('https://www.python.org/downloads/windows/'));
                return false;
            }
            else {
                return true;
            }
        }
        return true;
    });
}
exports.checkPython = checkPython;
function analyzeStartupError(err, context, output) {
    return __awaiter(this, void 0, void 0, function* () {
        output.appendLine(err.toString());
        output.show(true);
        let e = err;
        let diagnostics = 'Run diagnostics';
        let actionAsync;
        if (e.code == 'ENOENT') {
            actionAsync = vscode_1.window.showErrorMessage(`Could not start debugging because executable "${e.path}" was not found.`, diagnostics);
        }
        else if (e.code == 'Timeout' || e.code == 'Handshake') {
            actionAsync = vscode_1.window.showErrorMessage(err.message, diagnostics);
        }
        else {
            actionAsync = vscode_1.window.showErrorMessage('Could not start debugging.', diagnostics);
        }
        if ((yield actionAsync) == diagnostics) {
            yield diagnoseExternalLLDB(context, output);
        }
    });
}
exports.analyzeStartupError = analyzeStartupError;
//# sourceMappingURL=diagnostics.js.map