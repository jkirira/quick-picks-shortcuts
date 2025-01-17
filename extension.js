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

		let config = vscode.workspace.getConfiguration('quick-picks-shortcuts');

		// console.log('config', config, config.shortcuts);

		let shortcuts = config.shortcuts ?? {};

		let shortcutsList = Object.keys(shortcuts);

		let placeholderIndex = Object.values(shortcuts).findIndex(shortcutCommand => shortcutCommand == "example.command.name")

		if (placeholderIndex > -1) {
			shortcutsList.splice(placeholderIndex, 1);
		}

		new Promise(async (res, rej) => {
			try {
				let selection = await vscode.window.showQuickPick(shortcutsList);
				// console.log('selection', selection);

				if (!selection) {
					return;
				}

				let availableCommands = await vscode.commands.getCommands(true);
				// console.log('availableCommands', availableCommands)

				let commandExists = !!shortcuts[selection] && availableCommands.some(command => command === shortcuts[selection]);

				if (commandExists) {
					await vscode.commands.executeCommand(shortcuts[selection]);
				}

			} catch (e) {
				console.log('showQuickPicksShortcuts error: ', e)
				await vscode.window.showErrorMessage('Could not complete this action.')
			}

			res();
		});

	});

	context.subscriptions.push(showQuickPicksShortcuts);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
