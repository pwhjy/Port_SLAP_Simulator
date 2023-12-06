"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class DebuggerHtmlView {
    constructor(context) {
        this.panels = {};
        let subscriptions = context.subscriptions;
        subscriptions.push(vscode_1.debug.onDidTerminateDebugSession(this.onTerminatedDebugSession, this));
        subscriptions.push(vscode_1.debug.onDidReceiveDebugSessionCustomEvent(this.onDebugSessionCustomEvent, this));
    }
    onTerminatedDebugSession(session) {
        if (session.type == 'lldb') {
            delete this.panels[session.id];
        }
    }
    onDebugSessionCustomEvent(e) {
        if (e.session.type == 'lldb') {
            if (e.event = 'displayHtml') {
                this.onDisplayHtml(e.session, e.body);
            }
        }
    }
    onDisplayHtml(session, body) {
        if (!body.html)
            return;
        let title = body.title || session.name;
        let panel = this.panels[session.name];
        if (!panel) {
            let position = body.position !== null ? body.position : vscode_1.ViewColumn.Active;
            panel = vscode_1.window.createWebviewPanel('lldb', title, position, {
                enableScripts: true
            });
            panel.onDidDispose(() => delete this.panels[session.name]);
            this.panels[session.name] = panel;
        }
        else {
            panel.title = title;
        }
        panel.webview.html = body.html;
        if (body.reveal) {
            panel.reveal();
        }
    }
}
exports.DebuggerHtmlView = DebuggerHtmlView;
//# sourceMappingURL=htmlView.js.map