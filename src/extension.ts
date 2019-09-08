// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// import provider from './language';
import Process from './Process';
import Provider from './Provider';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld" is now active!');



	let config = vscode.workspace.getConfiguration("px2xx");
	const process = new Process(config);
	const provider = new Provider(process);
	const LANS = ['html', 'vue', 'css', 'less', 'scss', 'sass', 'stylus'];

	for(let lan of LANS) {
		console.log("inject extension file code: ", lan);
		let providerDisposable = vscode.languages.registerCompletionItemProvider(lan, provider);
		context.subscriptions.push(providerDisposable);
	}

	// const process = new vscode.ProcessExecution(config);
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerTextEditorCommand('extension.px2xx', (textEditor: vscode.TextEditor, edit) => {
	// 	// The code you place here will be executed every time your command is executed

	// 	// Display a message box to the user
	// 	vscode.window.showWarningMessage('px2upx vs code!');

	// 	const doc = textEditor.document;
	// 	let selection: vscode.Selection | vscode.Range = textEditor.selection;

	// 	if(selection.isEmpty) {
	// 		const start = new vscode.Position(0, 0);
	// 		const end = new vscode.Position(doc.lineCount - 1, doc.lineAt(doc.lineCount - 1).text.length);
	// 		selection = new vscode.Range(start, end);
	// 	}

	// 	let text = doc.getText(selection);
	// 	textEditor.edit(builder => {
	// 		builder.replace(selection, process.convertAll(text));
	// 	});
	// });
	
	// context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
