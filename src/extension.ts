/** 
 * DotEnv-Sanatize
 * @author Jacob Ebey
 * @description Sanitize your dotenv files to easily create examples, or cleanup before a commit.
 * @version 1.0.0
*/

import * as vscode from 'vscode'
import * as crypto from 'crypto'

/** 
 * Extension Activate
 * @description this method is called when your extension is activated 
 * your extension is activated the very first time the command is executed
 * @private
 * @param context An extension context is a collection of utilities private to an extension.
 * @returns Absolutely nothing, but will raise an error if activation isn't possible in VSCode.
*/
export function activate(context: vscode.ExtensionContext): void {

	console.log('Congratulations, your extension "dotenv-sanitize" is now active!')

	const disposable = vscode.commands.registerCommand('dotenvSanitize.sanitizeFile', () => {

		const editor = vscode.window.activeTextEditor;
		if (!editor) { return }
		const document = editor.document;
		
		/** 
		 * Extension Option: dotenvSecretReplacement 
		*/
		const dotenvSecretReplacement: string | undefined = vscode.workspace.getConfiguration().get('editor.dotenvSecretReplacement')
		
		/** 
		 * Extension Option: dotenvSecretReplacementRedactions 
		*/
		const dotenvSecretReplacementRedactions: string[] | undefined = vscode.workspace.getConfiguration().get('editor.dotenvSecretReplacementRedactions')

		const checkAvailableCiphers = ((ciphers: string[], value: string) => {
			return ciphers.some((result) => {
				return value === result
			})
		})

		if(checkAvailableCiphers(crypto.getCiphers(), dotenvSecretReplacement || "blowfish")) {

			// crypto.scryptSync()

		}

		// Build up the edits we are going to do to the document
		editor.edit((editBuilder) => {
			for (let i = 0; i < document.lineCount; i++) {
				const line = document.lineAt(i)
				const text = line.text;
				const trimmed = text.trim()
	
				// If this line is a comment, ignore...
				if (trimmed[0] === "#") continue
	
				// Same with if there is no equal sign to indicate a value
				const split = text.split('=', 2)
				if (split.length !== 2) continue
				

				// If it's a number, we just keep the value.
				let newValue = split[1];
				if (Number.isNaN(Number.parseFloat(split[1]))) {
					// Otherwise we replace it
					newValue = `"${dotenvSecretReplacement}"`
				}
				
				const newLine = split[0] + '=' + newValue

				editBuilder.replace(line.range, newLine)
			}
		})

		// Display a message box to the user
		vscode.window.showInformationMessage('Sanitized your file 😁')
	})

	context.subscriptions.push(disposable)
}

// this method is called when your extension is deactivated
export function deactivate() {}
