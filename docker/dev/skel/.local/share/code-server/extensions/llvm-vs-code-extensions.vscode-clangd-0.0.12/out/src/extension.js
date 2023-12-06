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
const vscode = require("vscode");
const vscodelc = require("vscode-languageclient");
const fs_1 = require("fs");
/**
 * Method to get workspace configuration option
 * @param option name of the option (e.g. for clangd.path should be path)
 * @param defaultValue default value to return if option is not set
 */
function getConfig(option, defaultValue) {
    const config = vscode.workspace.getConfiguration('clangd');
    return config.get(option, defaultValue);
}
var SwitchSourceHeaderRequest;
(function (SwitchSourceHeaderRequest) {
    SwitchSourceHeaderRequest.type = new vscodelc.RequestType('textDocument/switchSourceHeader');
})(SwitchSourceHeaderRequest || (SwitchSourceHeaderRequest = {}));
class FileStatus {
    constructor() {
        this.statuses = new Map();
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
    }
    onFileUpdated(fileStatus) {
        const filePath = vscode.Uri.parse(fileStatus.uri);
        this.statuses.set(filePath.fsPath, fileStatus);
        this.updateStatus();
    }
    updateStatus() {
        const path = vscode.window.activeTextEditor.document.fileName;
        const status = this.statuses.get(path);
        if (!status) {
            this.statusBarItem.hide();
            return;
        }
        this.statusBarItem.text = `clangd: ` + status.state;
        this.statusBarItem.show();
    }
    clear() {
        this.statuses.clear();
        this.statusBarItem.hide();
    }
    dispose() {
        this.statusBarItem.dispose();
    }
}
/**
 *  this method is called when your extension is activate
 *  your extension is activated the very first time the command is executed
 */
function activate(context) {
    const syncFileEvents = getConfig('syncFileEvents', true);
    const clangd = {
        command: getConfig('path'),
        args: getConfig('arguments')
    };
    const traceFile = getConfig('trace');
    if (!!traceFile) {
        const trace = { CLANGD_TRACE: traceFile };
        clangd.options = { env: Object.assign({}, process.env, trace) };
    }
    const serverOptions = clangd;
    // Note that CUDA ('.cu') files are special. When opening files of all other
    // extensions, VSCode would load clangd automatically. This is achieved by
    // having a corresponding 'onLanguage:...' activation event in package.json.
    // However, VSCode does not have CUDA as a supported language yet, so we
    // cannot add a corresponding activationEvent for CUDA files and clangd will
    // *not* load itself automatically on '.cu' files. When any of the files
    // with other extensions are open, clangd will load itself and will also
    // work on '.cu' files.
    const filePattern = '**/*.{' +
        ['cpp', 'c', 'cc', 'cu', 'cxx', 'c++', 'm', 'mm',
            'h', 'hh', 'hpp', 'hxx', 'inc'].join()
        + '}';
    const clientOptions = {
        // Register the server for C/C++ files
        documentSelector: [{ scheme: 'file', pattern: filePattern }],
        synchronize: !syncFileEvents ? undefined : {
            fileEvents: vscode.workspace.createFileSystemWatcher(filePattern)
        },
        initializationOptions: { clangdFileStatus: true },
        // Resolve symlinks for all files provided by clangd.
        // This is a workaround for a bazel + clangd issue - bazel produces a symlink tree to build in,
        // and when navigating to the included file, clangd passes its path inside the symlink tree
        // rather than its filesystem path.
        // FIXME: remove this once clangd knows enough about bazel to resolve the
        // symlinks where needed (or if this causes problems for other workflows).
        uriConverters: {
            code2Protocol: (value) => value.toString(),
            protocol2Code: (value) => vscode.Uri.file(fs_1.realpathSync(vscode.Uri.parse(value).fsPath))
        },
        // Do not switch to output window when clangd returns output
        revealOutputChannelOn: vscodelc.RevealOutputChannelOn.Never
    };
    const clangdClient = new vscodelc.LanguageClient('Clang Language Server', serverOptions, clientOptions);
    console.log('Clang Language Server is now active!');
    context.subscriptions.push(clangdClient.start());
    context.subscriptions.push(vscode.commands.registerCommand('clangd-vscode.switchheadersource', () => __awaiter(this, void 0, void 0, function* () {
        const uri = vscode.Uri.file(vscode.window.activeTextEditor.document.fileName);
        if (!uri) {
            return;
        }
        const docIdentifier = vscodelc.TextDocumentIdentifier.create(uri.toString());
        const sourceUri = yield clangdClient.sendRequest(SwitchSourceHeaderRequest.type, docIdentifier);
        if (!sourceUri) {
            return;
        }
        const doc = yield vscode.workspace.openTextDocument(vscode.Uri.parse(sourceUri));
        vscode.window.showTextDocument(doc);
    })));
    const status = new FileStatus();
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(() => {
        status.updateStatus();
    }));
    clangdClient.onDidChangeState(({ newState }) => {
        if (newState == vscodelc.State.Running) {
            // clangd starts or restarts after crash.
            clangdClient.onNotification('textDocument/clangd.fileStatus', (fileStatus) => { status.onFileUpdated(fileStatus); });
        }
        else if (newState == vscodelc.State.Stopped) {
            // Clear all cached statuses when clangd crashes.
            status.clear();
        }
    });
    // An empty place holder for the activate command, otherwise we'll get an
    // "command is not registered" error.
    context.subscriptions.push(vscode.commands.registerCommand('clangd-vscode.activate', () => __awaiter(this, void 0, void 0, function* () { })));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map