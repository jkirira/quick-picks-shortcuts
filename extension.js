// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "quick-picks-shortcuts" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const showQuickPicksShortcuts = vscode.commands.registerCommand('quick-picks-shortcuts.showQuickPicksShortcuts', function () {
		let items = [];

		vscode.window.showQuickPick(items).then(selection => {
			// the user canceled the selection
			if (!selection) {
				return;
			}

			// the user selected some item. You could use `selection.name` too
			switch (selection.description) {
				case "onItem":
					doSomething();
					break;
				case "anotherItem":
					doSomethingElse();
					break;
				//.....
				default:
					break;
			}
		});
	});

	context.subscriptions.push(showQuickPicksShortcuts);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
