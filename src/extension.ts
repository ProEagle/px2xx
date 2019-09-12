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
}

// this method is called when your extension is deactivated
export function deactivate() {}
