// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "dotenv-sanitize" is now active!');

	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('dotenvSanitize.sanitizeFile', () => {
		// The code you place here will be executed every time your command is executed

		// Read the user configuration
		const secretReplacement = vscode.workspace.getConfiguration().get('editor.dotenvSecretReplacement');

		// Get the active text editor
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		// Get the active document
		const document = editor.document;

		// Build up the edits we are going to do to the document
		editor.edit((editBuilder) => {
			for (let i = 0; i < document.lineCount; i++) {
				const line = document.lineAt(i);
				const text = line.text;
				const trimmed = text.trim();
	
				// If the line is too short, or it's a comment, skip shit
				if (trimmed.length < 3 || trimmed[0] === "#") {
					continue;
				}
	
				// Same with if there is no equal sign to indicate a value
				const split = text.split('=', 2);
				if (split.length !== 2) {
					continue;
				}
	
				// If it's a number, we just keep the value.
				let newValue = split[1];
				if (Number.isNaN(Number.parseFloat(split[1]))) {
					// Otherwise we replace it
					newValue = `"${secretReplacement}"`;
				}
				
				const newLine = split[0] + '=' + newValue;

				editBuilder.replace(line.range, newLine);
			}
		});

		// Display a message box to the user
		vscode.window.showInformationMessage('Sanitized your file 😁');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
