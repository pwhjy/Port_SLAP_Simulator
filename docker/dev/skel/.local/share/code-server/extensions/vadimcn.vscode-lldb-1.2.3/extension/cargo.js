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
const cp = require("child_process");
const path = require("path");
const util_1 = require("util");
const util = require("./util");
const main_1 = require("./main");
const async_1 = require("./async");
function getProgramFromCargo(cargoConfig, cwd) {
    return __awaiter(this, void 0, void 0, function* () {
        let cargoArgs = cargoConfig.args;
        let pos = cargoArgs.indexOf('--');
        // Insert either before `--` or at the end.
        cargoArgs.splice(pos >= 0 ? pos : cargoArgs.length, 0, '--message-format=json');
        main_1.output.appendLine('Running `cargo ' + cargoArgs.join(' ') + '`...');
        let artifacts = yield getCargoArtifacts(cargoArgs, cwd);
        main_1.output.appendLine('Raw artifacts:');
        for (let artifact of artifacts) {
            main_1.output.appendLine(util_1.inspect(artifact));
        }
        if (cargoConfig.filter != undefined) {
            let filter = cargoConfig.filter;
            artifacts = artifacts.filter(a => {
                if (filter.name != undefined && a.name != filter.name)
                    return false;
                if (filter.kind != undefined && a.kind != filter.kind)
                    return false;
                return true;
            });
            main_1.output.appendLine('Filtered artifacts: ');
            for (let artifact of artifacts) {
                main_1.output.appendLine(util_1.inspect(artifact));
            }
        }
        if (artifacts.length == 0) {
            main_1.output.show();
            vscode_1.window.showErrorMessage('Cargo has produced no matching compiler artifacts.', { modal: true });
            throw new Error('Cannot start debugging.');
        }
        else if (artifacts.length > 1) {
            main_1.output.show();
            vscode_1.window.showErrorMessage('Cargo has produced more than one matching compiler artifact.', { modal: true });
            throw new Error('Cannot start debugging.');
        }
        return artifacts[0].fileName;
    });
}
exports.getProgramFromCargo = getProgramFromCargo;
// Runs cargo, returns a list of compilation artifacts.
function getCargoArtifacts(cargoArgs, folder) {
    return __awaiter(this, void 0, void 0, function* () {
        let artifacts = [];
        try {
            yield runCargo(cargoArgs, folder, message => {
                if (message.reason == 'compiler-artifact') {
                    let isBinary = message.target.crate_types.includes('bin');
                    let isBuildScript = message.target.kind.includes('custom-build');
                    if ((isBinary && !isBuildScript) || message.profile.test) {
                        if (message.executable !== undefined) {
                            if (message.executable !== null) {
                                artifacts.push({
                                    fileName: message.executable,
                                    name: message.target.name,
                                    kind: message.target.kind[0]
                                });
                            }
                        }
                        else { // Older cargo
                            for (let i = 0; i < message.filenames.length; ++i) {
                                if (message.filenames[i].endsWith('.dSYM'))
                                    continue;
                                artifacts.push({
                                    fileName: message.filenames[i],
                                    name: message.target.name,
                                    kind: message.target.kind[i]
                                });
                            }
                        }
                    }
                }
                else if (message.reason == 'compiler-message') {
                    main_1.output.appendLine(message.message.rendered);
                }
            }, stderr => { main_1.output.append(stderr); });
        }
        catch (err) {
            main_1.output.show();
            throw new Error(`Cargo invocation has failed: ${err}`);
        }
        return artifacts;
    });
}
function getLaunchConfigs(folder) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield async_1.existsAsync(path.join(folder, 'Cargo.toml'))))
            return [];
        let metadata = null;
        yield runCargo(['metadata', '--no-deps', '--format-version=1'], folder, m => { metadata = m; }, stderr => { main_1.output.append(stderr); });
        if (!metadata)
            throw new Error(`Cargo produced no metadata`);
        let configs = [];
        for (let pkg of metadata.packages) {
            function addConfig(name, cargo_args, filter) {
                configs.push({
                    type: 'lldb',
                    request: 'launch',
                    name: name,
                    cargo: {
                        args: cargo_args.concat(`--package=${pkg.name}`),
                        filter: filter
                    },
                    args: [],
                    cwd: '${workspaceFolder}'
                });
            }
            ;
            for (let target of pkg.targets) {
                let libAdded = false;
                for (let kind of target.kind) {
                    switch (kind) {
                        case 'lib':
                        case 'rlib':
                        case 'staticlib':
                        case 'dylib':
                        case 'cstaticlib':
                            if (!libAdded) {
                                addConfig(`Debug unit tests in library '${target.name}'`, ['test', '--no-run', '--lib'], { name: target.name, kind: 'lib' });
                                libAdded = true;
                            }
                            break;
                        case 'bin':
                        case 'example':
                            {
                                let prettyKind = (kind == 'bin') ? 'executable' : kind;
                                addConfig(`Debug ${prettyKind} '${target.name}'`, ['build', `--${kind}=${target.name}`], { name: target.name, kind: kind });
                                addConfig(`Debug unit tests in ${prettyKind} '${target.name}'`, ['test', '--no-run', `--${kind}=${target.name}`], { name: target.name, kind: kind });
                            }
                            break;
                        case 'bench':
                        case 'test':
                            {
                                let prettyKind = (kind == 'bench') ? 'benchmark' : (kind == 'test') ? 'integration test' : kind;
                                addConfig(`Debug ${prettyKind} '${target.name}'`, ['test', '--no-run', `--${kind}=${target.name}`], { name: target.name, kind: kind });
                            }
                            break;
                    }
                }
            }
        }
        return configs;
    });
}
exports.getLaunchConfigs = getLaunchConfigs;
// Runs cargo, invokes stdout/stderr callbacks as data comes in, returns the exit code.
function runCargo(cargoArgs, cwd, onStdoutJson, onStderrString) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let cargo = cp.spawn('cargo', cargoArgs, {
                stdio: ['ignore', 'pipe', 'pipe'],
                cwd: cwd
            });
            cargo.on('error', err => {
                reject(new Error(`could not launch cargo: ${err}`));
            });
            cargo.stderr.on('data', chunk => {
                onStderrString(chunk.toString());
            });
            let stdout = '';
            cargo.stdout.on('data', chunk => {
                stdout += chunk;
                let lines = stdout.split('\n');
                stdout = lines.pop();
                for (let line of lines) {
                    let message = JSON.parse(line);
                    onStdoutJson(message);
                }
            });
            cargo.on('exit', (exitCode, signal) => {
                if (exitCode == 0)
                    resolve(exitCode);
                else
                    reject(new Error(`exit code: ${exitCode}.`));
            });
        });
    });
}
function expandCargo(launchConfig, cargoDict) {
    let expander = (type, key) => {
        if (type == 'cargo') {
            let value = cargoDict[key];
            if (value == undefined)
                throw new Error('cargo:' + key + ' is not defined');
            return value.toString();
        }
    };
    return util.expandVariablesInObject(launchConfig, expander);
}
exports.expandCargo = expandCargo;
//# sourceMappingURL=cargo.js.map