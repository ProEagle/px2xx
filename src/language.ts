
import * as vscode from 'vscode';

let provider:vscode.CompletionItemProvider = {
    provideCompletionItems: function (document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
        let line = document.lineAt(position);
        console.log('line', line);
        let ret = new vscode.CompletionItem('new px', vscode.CompletionItemKind.Field);
        return [ret];
    }
};

export default provider;