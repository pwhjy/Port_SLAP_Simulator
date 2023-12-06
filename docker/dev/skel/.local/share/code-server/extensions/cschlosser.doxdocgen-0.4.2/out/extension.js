"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const opn = require("opn");
const vscode = require("vscode");
const CodeParserController_1 = require("./CodeParserController");
var ConfigChangedNotificationOptions;
(function (ConfigChangedNotificationOptions) {
    ConfigChangedNotificationOptions["CHANGED"] = "What's changed";
    ConfigChangedNotificationOptions["HIDE"] = "Don't show me again";
    ConfigChangedNotificationOptions["GLOBAL_STORAGE_KEY"] = "doxdocgen_hide_config_changed_notification";
})(ConfigChangedNotificationOptions || (ConfigChangedNotificationOptions = {}));
var Version;
(function (Version) {
    Version["CURRENT"] = "0.4.2";
    Version["PREVIOUS"] = "0.4.1";
    Version["KEY"] = "doxdocgen_version";
})(Version || (Version = {}));
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const parser = new CodeParserController_1.default();
    context.subscriptions.push(parser);
    let change = false;
    const version = context.globalState.get(Version.KEY);
    if (version === undefined) {
        context.globalState.update(Version.KEY, Version.CURRENT);
    }
    else if (version !== Version.CURRENT) {
        change = true;
        context.globalState.update(Version.KEY, Version.CURRENT);
    }
    let notificationHideThenable;
    const active = context.globalState.get(ConfigChangedNotificationOptions.GLOBAL_STORAGE_KEY);
    if (change && (active === undefined || active !== "false")) {
        // tslint:disable-next-line:max-line-length
        notificationHideThenable = vscode.window.showWarningMessage("DoxDocGen: Config keys have changed. Please check your config!", ConfigChangedNotificationOptions.CHANGED, ConfigChangedNotificationOptions.HIDE);
    }
    if (notificationHideThenable !== undefined) {
        notificationHideThenable.then((action) => {
            if (action === ConfigChangedNotificationOptions.CHANGED) {
                // tslint:disable-next-line:max-line-length
                opn("https://github.com/christophschlosser/doxdocgen/blob/0.3.0/CHANGELOG.md#config-update");
            }
            else if (action === ConfigChangedNotificationOptions.HIDE) {
                context.globalState.update(ConfigChangedNotificationOptions.GLOBAL_STORAGE_KEY, "false");
            }
        });
    }
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map