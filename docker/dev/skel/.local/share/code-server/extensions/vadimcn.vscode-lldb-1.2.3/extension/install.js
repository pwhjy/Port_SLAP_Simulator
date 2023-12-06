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
const zip = require("yauzl");
const https = require("https");
const fs = require("fs");
const os = require("os");
const path = require("path");
const vscode_1 = require("vscode");
const async_1 = require("./async");
const MaxRedirects = 10;
function ensurePlatformPackage(context, output) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield async_1.existsAsync(path.join(context.extensionPath, 'lldb/bin')))
            return true;
        let choice = yield vscode_1.window.showInformationMessage('The selected debug adapter type requires installation of platform-specific files.', { modal: true }, { title: 'Download and install automatically', id: 'auto' }, { title: 'Open URL in a browser', id: 'manual' });
        if (choice == undefined) {
            return false;
        }
        try {
            let packageUrl = yield getPlatformPackageUrl();
            output.appendLine('Platform package is located at ' + packageUrl);
            if (choice.id == 'manual') {
                vscode_1.commands.executeCommand('vscode.open', vscode_1.Uri.parse(packageUrl));
                return false;
            }
            let vsixTmp = path.join(os.tmpdir(), 'vscode-lldb-full.vsix');
            output.show();
            output.appendLine('Downloading platform package...');
            try {
                try {
                    let lastPercent = -100;
                    yield download(packageUrl, vsixTmp, (downloaded, contentLength) => {
                        let percent = Math.round(100 * downloaded / contentLength);
                        if (percent > lastPercent + 5) {
                            output.appendLine(`Downloaded ${percent}%`);
                            lastPercent = percent;
                        }
                    });
                }
                catch (err) {
                    let choice = yield vscode_1.window.showErrorMessage(`Download of the platform package has failed.\n` +
                        `${err}.\n\n` +
                        `You can try to download and install it manually.`, { modal: true }, 'Open URL in a browser');
                    if (choice != undefined) {
                        vscode_1.commands.executeCommand('vscode.open', vscode_1.Uri.parse(packageUrl));
                    }
                    return false;
                }
                output.appendLine('Download complete.');
                output.appendLine('Installing...');
            }
            catch (err) {
            }
            yield installVsix(context, vsixTmp);
            output.appendLine('Done.');
            return true;
        }
        catch (err) {
            vscode_1.window.showErrorMessage(err.toString());
            return false;
        }
    });
}
exports.ensurePlatformPackage = ensurePlatformPackage;
function getPlatformPackageUrl() {
    return __awaiter(this, void 0, void 0, function* () {
        let pkg = vscode_1.extensions.getExtension('vadimcn.vscode-lldb').packageJSON;
        let pp = pkg.config.platformPackages;
        let platformPackage = pp.platforms[process.platform];
        if (platformPackage == undefined) {
            throw new Error('Current platform is not suported.');
        }
        return pp.url.replace('${version}', pkg.version).replace('${platformPackage}', platformPackage);
    });
}
function download(srcUrl, destPath, progress) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let response;
            for (let i = 0; i < MaxRedirects; ++i) {
                response = yield new Promise(resolve => https.get(srcUrl, resolve));
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    srcUrl = response.headers.location;
                }
                else {
                    break;
                }
            }
            if (response.statusCode < 200 || response.statusCode >= 300) {
                reject(new Error(`HTTP status ${response.statusCode} : ${response.statusMessage}`));
            }
            if (response.headers['content-type'] != 'application/octet-stream') {
                reject(new Error('HTTP response does not contain an octet stream'));
            }
            else {
                let stm = fs.createWriteStream(destPath);
                let pipeStm = response.pipe(stm);
                if (progress) {
                    let contentLength = response.headers['content-length'] ? Number.parseInt(response.headers['content-length']) : null;
                    let downloaded = 0;
                    response.on('data', (chunk) => {
                        downloaded += chunk.length;
                        progress(downloaded, contentLength);
                    });
                }
                pipeStm.on('finish', resolve);
                pipeStm.on('error', reject);
                response.on('error', reject);
            }
        }));
    });
}
function installVsix(context, vsixPath) {
    return __awaiter(this, void 0, void 0, function* () {
        let destDir = context.extensionPath;
        yield extractZip(vsixPath, (entry) => __awaiter(this, void 0, void 0, function* () {
            if (entry.fileName.startsWith('extension/')) {
                let destPath = path.join(destDir, entry.fileName.substr(10));
                yield ensureDirectory(path.dirname(destPath));
                let stream = fs.createWriteStream(destPath);
                stream.on('finish', () => {
                    let attrs = (entry.externalFileAttributes >> 16) & 0o7777;
                    fs.chmod(destPath, attrs, (err) => { });
                });
                return stream;
            }
            else {
                return null;
            }
        }));
    });
}
function extractZip(zipPath, callback) {
    return new Promise((resolve, reject) => zip.open(zipPath, { lazyEntries: true }, (err, zipfile) => {
        if (err) {
            reject(err);
        }
        else {
            zipfile.readEntry();
            zipfile.on('entry', (entry) => {
                callback(entry).then(outstream => {
                    if (outstream != null) {
                        zipfile.openReadStream(entry, (err, zipstream) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                outstream.on('error', reject);
                                zipstream.on('error', reject);
                                zipstream.on('end', () => zipfile.readEntry());
                                zipstream.pipe(outstream);
                            }
                        });
                    }
                    else {
                        zipfile.readEntry();
                    }
                });
            });
            zipfile.on('end', () => {
                zipfile.close();
                resolve();
            });
            zipfile.on('error', reject);
        }
    }));
}
function ensureDirectory(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        let exists = yield new Promise(resolve => fs.exists(dir, exists => resolve(exists)));
        if (!exists) {
            yield ensureDirectory(path.dirname(dir));
            yield new Promise((resolve, reject) => fs.mkdir(dir, err => {
                if (err)
                    reject(err);
                else
                    resolve();
            }));
        }
    });
}
//# sourceMappingURL=install.js.map