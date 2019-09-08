import * as vscode from 'vscode';
import Process from './Process';

export default class Provider implements vscode.CompletionItemProvider {
    constructor(private process: Process) {}

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Thenable<vscode.CompletionItem[]> {
        return new Promise((resolve, reject) => {
            const lineText = document.getText(new vscode.Range(position.with(undefined, 0), position));
            const res = this.process.convert(lineText);
            if(res.length === 0) {
                return resolve([]);
            }
            let hintArray = res.map(item => {
                var completionItem = new vscode.CompletionItem(`${item.pxValue}px -> ${item.replaceText}`, vscode.CompletionItemKind.Snippet);
                completionItem.insertText = item.replaceText;
                return completionItem;
            });
            return resolve(hintArray);
        });
    }
}