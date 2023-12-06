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
const path = require("path");
const diagnostics = require("./diagnostics");
const htmlView = require("./htmlView");
const cargo = require("./cargo");
const util = require("./util");
const adapter = require("./adapter");
const install = require("./install");
const common_1 = require("./common");
exports.output = vscode_1.window.createOutputChannel('LLDB');
// Main entry point
function activate(context) {
    let extension = new Extension(context);
    extension.onActivate();
}
exports.activate = activate;
class Extension {
    constructor(context) {
        this.context = context;
        this.htmlViewer = new htmlView.DebuggerHtmlView(context);
        let subscriptions = context.subscriptions;
        subscriptions.push(vscode_1.debug.registerDebugConfigurationProvider('lldb', this));
        subscriptions.push(vscode_1.debug.registerDebugAdapterDescriptorFactory('lldb', this));
        subscriptions.push(vscode_1.commands.registerCommand('lldb.diagnose', () => this.runDiagnostics()));
        subscriptions.push(vscode_1.commands.registerCommand('lldb.getCargoLaunchConfigs', () => this.getCargoLaunchConfigs()));
        subscriptions.push(vscode_1.commands.registerCommand('lldb.pickProcess', () => this.pickProcess(false)));
        subscriptions.push(vscode_1.commands.registerCommand('lldb.pickMyProcess', () => this.pickProcess(true)));
        subscriptions.push(vscode_1.commands.registerCommand('lldb.changeDisplaySettings', () => this.changeDisplaySettings()));
        subscriptions.push(vscode_1.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration('lldb.displayFormat') ||
                event.affectsConfiguration('lldb.showDisassembly') ||
                event.affectsConfiguration('lldb.dereferencePointers')) {
                this.propagateDisplaySettings();
            }
        }));
        this.registerDisplaySettingCommand('lldb.showDisassembly', (settings) => __awaiter(this, void 0, void 0, function* () {
            settings.showDisassembly = (yield vscode_1.window.showQuickPick(['always', 'auto', 'never']));
        }));
        this.registerDisplaySettingCommand('lldb.toggleDisassembly', (settings) => __awaiter(this, void 0, void 0, function* () {
            settings.showDisassembly = (settings.showDisassembly == 'auto') ? 'always' : 'auto';
        }));
        this.registerDisplaySettingCommand('lldb.displayFormat', (settings) => __awaiter(this, void 0, void 0, function* () {
            settings.displayFormat = (yield vscode_1.window.showQuickPick(['auto', 'hex', 'decimal', 'binary']));
        }));
        this.registerDisplaySettingCommand('lldb.toggleDerefPointers', (settings) => __awaiter(this, void 0, void 0, function* () {
            settings.dereferencePointers = !settings.dereferencePointers;
        }));
        this.status = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left, 0);
        this.status.command = 'lldb.changeDisplaySettings';
        this.status.tooltip = 'Change debugger display settings';
        this.status.hide();
        subscriptions.push(vscode_1.debug.onDidChangeActiveDebugSession(session => {
            if (session && session.type == 'lldb')
                this.status.show();
            else
                this.status.hide();
        }));
    }
    registerDisplaySettingCommand(command, updater) {
        this.context.subscriptions.push(vscode_1.commands.registerCommand(command, () => __awaiter(this, void 0, void 0, function* () {
            let settings = this.getDisplaySettings();
            yield updater(settings);
            this.setDisplaySettings(settings);
        })));
    }
    getDisplaySettings() {
        let folder = vscode_1.debug.activeDebugSession ? vscode_1.debug.activeDebugSession.workspaceFolder.uri : undefined;
        let config = vscode_1.workspace.getConfiguration('lldb', folder);
        let settings = {
            displayFormat: config.get('displayFormat'),
            showDisassembly: config.get('showDisassembly'),
            dereferencePointers: config.get('dereferencePointers'),
            containerSummary: true,
        };
        return settings;
    }
    setDisplaySettings(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            let folder = vscode_1.debug.activeDebugSession ? vscode_1.debug.activeDebugSession.workspaceFolder.uri : undefined;
            let config = vscode_1.workspace.getConfiguration('lldb', folder);
            yield config.update('displayFormat', settings.displayFormat);
            yield config.update('showDisassembly', settings.showDisassembly);
            yield config.update('dereferencePointers', settings.dereferencePointers);
        });
    }
    propagateDisplaySettings() {
        return __awaiter(this, void 0, void 0, function* () {
            let settings = this.getDisplaySettings();
            this.status.text =
                `Format: ${settings.displayFormat}  ` +
                    `Disasm: ${settings.showDisassembly}  ` +
                    `Deref: ${settings.dereferencePointers ? 'on' : 'off'}`;
            if (vscode_1.debug.activeDebugSession && vscode_1.debug.activeDebugSession.type == 'lldb') {
                yield vscode_1.debug.activeDebugSession.customRequest('displaySettings', settings);
            }
        });
    }
    changeDisplaySettings() {
        return __awaiter(this, void 0, void 0, function* () {
            let settings = this.getDisplaySettings();
            let qpick = vscode_1.window.createQuickPick();
            qpick.items = [
                {
                    label: `Value formatting: ${settings.displayFormat}`,
                    detail: 'Default format for displaying variable values and evaluation results.',
                    command: 'lldb.displayFormat'
                },
                {
                    label: `Show disassembly: ${settings.showDisassembly}`,
                    detail: 'When to display disassembly.',
                    command: 'lldb.showDisassembly'
                },
                {
                    label: `Dereference pointers: ${settings.dereferencePointers ? 'on' : 'off'}`,
                    detail: 'Whether to show a summary of the pointee or a numeric pointer value.',
                    command: 'lldb.toggleDerefPointers'
                }
            ];
            qpick.title = 'Debugger display settings';
            qpick.onDidAccept(() => {
                let item = qpick.selectedItems[0];
                qpick.hide();
                vscode_1.commands.executeCommand(item.command);
            });
            qpick.show();
        });
    }
    onActivate() {
        return __awaiter(this, void 0, void 0, function* () {
            let pkg = vscode_1.extensions.getExtension('vadimcn.vscode-lldb').packageJSON;
            let currVersion = pkg.version;
            let lastVersion = this.context.globalState.get('lastLaunchedVersion');
            if (currVersion != lastVersion) {
                this.context.globalState.update('lastLaunchedVersion', currVersion);
                let choice = yield vscode_1.window.showInformationMessage('CodeLLDB extension has been updated', 'What\'s new?');
                if (choice != null) {
                    let changelog = path.join(this.context.extensionPath, 'CHANGELOG.md');
                    let uri = vscode_1.Uri.parse(`file://${changelog}`);
                    yield vscode_1.commands.executeCommand('markdown.showPreview', uri, null, { locked: true });
                }
            }
            this.propagateDisplaySettings();
        });
    }
    provideDebugConfigurations(folder, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let debugConfigs = yield cargo.getLaunchConfigs(folder ? folder.uri.fsPath : vscode_1.workspace.rootPath);
                if (debugConfigs.length > 0) {
                    let response = yield vscode_1.window.showInformationMessage('Cargo.toml has been detected in this workspace.\r\n' +
                        'Would you like to generate launch configurations for its targets?', { modal: true }, 'Yes', 'No');
                    if (response == 'Yes') {
                        return debugConfigs;
                    }
                }
            }
            catch (err) {
                exports.output.appendLine(err.toString());
            }
            return [{
                    type: 'lldb',
                    request: 'launch',
                    name: 'Debug',
                    program: '${workspaceFolder}/<your program>',
                    args: [],
                    cwd: '${workspaceFolder}'
                }];
        });
    }
    // Invoked by VSCode to initiate a new debugging session.
    resolveDebugConfiguration(folder, launchConfig, token) {
        return __awaiter(this, void 0, void 0, function* () {
            exports.output.clear();
            if (launchConfig.type === undefined) {
                yield vscode_1.window.showErrorMessage('Cannot start debugging because no launch configuration has been provided.', { modal: true });
                return null;
            }
            if (!(yield this.checkPrerequisites(folder)))
                return undefined;
            let launchDefaults = vscode_1.workspace.getConfiguration('lldb.launch', folder ? folder.uri : undefined);
            launchConfig = this.mergeWorkspaceSettings(launchDefaults, launchConfig);
            let dbgconfigConfig = vscode_1.workspace.getConfiguration('lldb.dbgconfig', folder ? folder.uri : undefined);
            launchConfig = util.expandDbgConfig(launchConfig, dbgconfigConfig);
            // Transform "request":"custom" to "request":"launch" + "custom":true
            if (launchConfig.request == 'custom') {
                launchConfig.request = 'launch';
                launchConfig.custom = true;
            }
            // Deal with Cargo
            let cargoDict = {};
            if (launchConfig.cargo != undefined) {
                let cargoCwd = folder ? folder.uri.fsPath : vscode_1.workspace.rootPath;
                cargoDict.program = yield cargo.getProgramFromCargo(launchConfig.cargo, cargoCwd);
                delete launchConfig.cargo;
                // Expand ${cargo:program}.
                launchConfig = cargo.expandCargo(launchConfig, cargoDict);
                if (launchConfig.program == undefined) {
                    launchConfig.program = cargoDict.program;
                }
                // Add 'rust' to sourceLanguages, since this project obviously (ha!) involves Rust.
                if (!launchConfig.sourceLanguages)
                    launchConfig.sourceLanguages = [];
                launchConfig.sourceLanguages.push('rust');
            }
            exports.output.appendLine(`configuration: ${util_1.inspect(launchConfig)}`);
            launchConfig._displaySettings = this.getDisplaySettings();
            return launchConfig;
        });
    }
    createDebugAdapterDescriptor(session, executable) {
        return __awaiter(this, void 0, void 0, function* () {
            let lldbConfig = vscode_1.workspace.getConfiguration('lldb', session.workspaceFolder ? session.workspaceFolder.uri : undefined);
            let adapterParams = this.getAdapterParameters(lldbConfig);
            if (session.configuration.sourceLanguages) {
                adapterParams.sourceLanguages = session.configuration.sourceLanguages;
                delete session.configuration.sourceLanguages;
            }
            try {
                let [adapter, port] = yield this.startDebugAdapter(session.workspaceFolder, adapterParams);
                let descriptor = new vscode_1.DebugAdapterServer(port);
                return descriptor;
            }
            catch (err) {
                diagnostics.analyzeStartupError(err, this.context, exports.output);
                throw err;
            }
        });
    }
    // Merge launch configuration with workspace settings
    mergeWorkspaceSettings(launchConfig, debugConfig) {
        let mergeConfig = (key, reverse = false) => {
            let value1 = util.getConfigNoDefault(launchConfig, key);
            let value2 = debugConfig[key];
            let value = !reverse ? util.mergeValues(value1, value2) : util.mergeValues(value2, value1);
            if (!util.isEmpty(value))
                debugConfig[key] = value;
        };
        mergeConfig('initCommands');
        mergeConfig('preRunCommands');
        mergeConfig('postRunCommands');
        mergeConfig('exitCommands', true);
        mergeConfig('env');
        mergeConfig('cwd');
        mergeConfig('terminal');
        mergeConfig('stdio');
        mergeConfig('expressions');
        mergeConfig('sourceMap');
        mergeConfig('sourceLanguages');
        mergeConfig('debugServer');
        return debugConfig;
    }
    getAdapterParameters(config, params = {}) {
        util.setIfDefined(params, config, 'reverseDebugging');
        util.setIfDefined(params, config, 'suppressMissingSourceFiles');
        util.setIfDefined(params, config, 'evaluationTimeout');
        return params;
    }
    getCargoLaunchConfigs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let debugConfigs = yield cargo.getLaunchConfigs(vscode_1.workspace.rootPath);
                let doc = yield vscode_1.workspace.openTextDocument({
                    content: JSON.stringify(debugConfigs, null, 4),
                    language: 'jsonc'
                });
                yield vscode_1.window.showTextDocument(doc, 1, false);
            }
            catch (err) {
                exports.output.show();
                vscode_1.window.showErrorMessage(err.toString());
            }
        });
    }
    pickProcess(currentUserOnly) {
        return __awaiter(this, void 0, void 0, function* () {
            let items = util.getProcessList(currentUserOnly);
            let item = yield vscode_1.window.showQuickPick(items);
            if (item) {
                return item.pid.toString();
            }
            else {
                return undefined;
            }
        });
    }
    startDebugAdapter(folder, params) {
        return __awaiter(this, void 0, void 0, function* () {
            let config = vscode_1.workspace.getConfiguration('lldb', folder ? folder.uri : undefined);
            let adapterType = this.getAdapterType(folder);
            let adapterEnv = config.get('adapterEnv', {});
            let verboseLogging = config.get('verboseLogging');
            let adapterProcess;
            if (adapterType == 'classic') {
                adapterProcess = yield adapter.startClassic(this.context.extensionPath, config.get('executable', 'lldb'), adapterEnv, vscode_1.workspace.rootPath, params, verboseLogging);
            }
            else if (adapterType == 'bundled') {
                adapterProcess = yield adapter.startClassic(this.context.extensionPath, path.join(this.context.extensionPath, 'lldb/bin/lldb'), adapterEnv, vscode_1.workspace.rootPath, params, verboseLogging);
            }
            else {
                let executablePath = util.getConfigNoDefault(config, 'executable');
                let libraryPath = util.getConfigNoDefault(config, 'library');
                if (!executablePath && !libraryPath) { // Use bundled
                    libraryPath = yield adapter.findLibLLDB(path.join(this.context.extensionPath, 'lldb'));
                }
                else if (libraryPath) {
                    libraryPath = yield adapter.findLibLLDB(libraryPath);
                }
                else { // Infer from executablePath
                    let dirs;
                    let cachedDirs = this.context.workspaceState.get('lldb_directories');
                    if (!cachedDirs || cachedDirs.key != executablePath) {
                        dirs = yield util.getLLDBDirectories(executablePath);
                        this.context.workspaceState.update('lldb_directories', { key: executablePath, value: dirs });
                    }
                    else {
                        dirs = cachedDirs.value;
                    }
                    libraryPath = yield adapter.findLibLLDB(dirs.shlibDir);
                }
                if (!libraryPath)
                    throw new Error('Could not locate liblldb');
                if (verboseLogging) {
                    exports.output.appendLine(`library: ${libraryPath}`);
                    exports.output.appendLine(`environment: ${util_1.inspect(adapterEnv)}`);
                    exports.output.appendLine(`params: ${util_1.inspect(params)}`);
                }
                adapterProcess = yield adapter.startNative(this.context.extensionPath, libraryPath, adapterEnv, vscode_1.workspace.rootPath, params, verboseLogging);
            }
            util.logProcessOutput(adapterProcess, exports.output);
            let port = yield adapter.getDebugServerPort(adapterProcess);
            return [adapterProcess, port];
        });
    }
    checkPrerequisites(folder) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.getAdapterType(folder) == 'classic') {
                if (!this.context.globalState.get('lldb_works')) {
                    vscode_1.window.showInformationMessage("Since this is the first time you are starting LLDB, I'm going to run some quick diagnostics...");
                    if (!(yield diagnostics.diagnoseExternalLLDB(this.context, exports.output)))
                        return false;
                    this.context.globalState.update('lldb_works', true);
                }
            }
            else {
                if (!(yield diagnostics.checkPython(exports.output)))
                    return false;
                if (!(yield install.ensurePlatformPackage(this.context, exports.output)))
                    return false;
            }
            return true;
        });
    }
    runDiagnostics() {
        return __awaiter(this, void 0, void 0, function* () {
            let adapterType = this.getAdapterType(undefined);
            let succeeded;
            switch (adapterType) {
                case 'classic':
                    succeeded = yield diagnostics.diagnoseExternalLLDB(this.context, exports.output);
                    break;
                case 'bundled':
                case 'native':
                    succeeded = yield diagnostics.checkPython(exports.output);
                    break;
            }
            if (succeeded) {
                vscode_1.window.showInformationMessage('LLDB self-test completed successfuly.');
            }
        });
    }
    getAdapterType(folder) {
        let lldbConfig = vscode_1.workspace.getConfiguration('lldb', folder ? folder.uri : undefined);
        return common_1.toAdapterType(lldbConfig.get('adapterType'));
    }
}
//# sourceMappingURL=main.js.map