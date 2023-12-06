'use strict';

import vscode = require('vscode');
import fs = require('fs');
import path = require('path');
import cp = require('child_process');
import { Proto3CompletionItemProvider } from './proto3Suggest';
import { Proto3LanguageDiagnosticProvider } from './proto3Diagnostic';
import { Proto3Compiler } from './proto3Compiler';
import { PROTO3_MODE } from './proto3Mode';

function getClangFormatStyle(document): string | null {
    let ret = vscode.workspace.getConfiguration('clang-format').get<string>('style');
    if (ret && ret.trim()) {
        return ret.trim();
    }
    else {
        return null;
    }
}

export function activate(ctx: vscode.ExtensionContext): void {

    ctx.subscriptions.push(vscode.languages.registerCompletionItemProvider(PROTO3_MODE, new Proto3CompletionItemProvider(), '.', '\"'));

    let compiler = new Proto3Compiler();

    let diagnosticProvider = new Proto3LanguageDiagnosticProvider(compiler);
    vscode.workspace.onDidSaveTextDocument(event => {
        if (event.languageId == 'proto3') {
            diagnosticProvider.createDiagnostics(event);
        }
    });

    ctx.subscriptions.push(vscode.commands.registerCommand('proto3.compile.one', () => {
        compiler.compileActiveProto();
    }));

    ctx.subscriptions.push(vscode.commands.registerCommand('proto3.compile.all', () => {
        compiler.compileAllProtos();
    }));


    //console.log('Congratulations, your extension "vscode-pb3" is now active!');

    vscode.languages.setLanguageConfiguration(PROTO3_MODE.language, {
        indentationRules: {
            // ^(.*\*/)?\s*\}.*$
            decreaseIndentPattern: /^(.*\*\/)?\s*\}.*$/,
            // ^.*\{[^}'']*$
            increaseIndentPattern: /^.*\{[^}'']*$/
        },
        wordPattern: /(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,
        comments: {
            lineComment: '//',
            blockComment: ['/*', '*/']
        },
        brackets: [
            ['{', '}'],
            ['[', ']'],
            ['(', ')'],
            ['<', '>'],
        ],

        __electricCharacterSupport: {
            brackets: [
                { tokenType: 'delimiter.curly.ts', open: '{', close: '}', isElectric: true },
                { tokenType: 'delimiter.square.ts', open: '[', close: ']', isElectric: true },
                { tokenType: 'delimiter.paren.ts', open: '(', close: ')', isElectric: true }
            ]
        },

        __characterPairSupport: {
            autoClosingPairs: [
                { open: '{', close: '}' },
                { open: '[', close: ']' },
                { open: '(', close: ')' },
                { open: '`', close: '`', notIn: ['string'] },
                { open: '"', close: '"', notIn: ['string'] },
                { open: '\'', close: '\'', notIn: ['string', 'comment'] }
            ]
        }
    });

    vscode.languages.registerDocumentFormattingEditProvider('proto3', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): Thenable<vscode.TextEdit[]> {
            return document.save().then(x => {

                const style = getClangFormatStyle(document)
                let args = [];
                if (style) args.push(`-style=${style}`);
                args.push(document.fileName);

                try {
                    var output = cp.execFileSync("clang-format", args);
                    if (output) {
                        let start = new vscode.Position(0, 0)
                        let end = new vscode.Position(document.lineCount, 0)
                        let range = new vscode.Range(start, end);
                        return [vscode.TextEdit.replace(range, output.toString())];
                    }
                } catch (e) {
                    vscode.window.showErrorMessage(e.message);
                }
            })
        }
    });

    if (vscode.window.activeTextEditor) {
        // 
    }
}

function deactivate() {
    //
}
