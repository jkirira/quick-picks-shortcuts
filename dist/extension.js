/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./extension.js":
/*!**********************!*\
  !*** ./extension.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(/*! vscode */ "vscode");

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

		// get shortcuts from settings configuration
		let config = vscode.workspace.getConfiguration('quick-picks-shortcuts');
		// console.log('config', config, config.shortcuts);

		let shortcuts = config.shortcuts ?? {};

		let shortcutsList = Object.keys(shortcuts);

		// remove placeholder shortcut
		let placeholderIndex = Object.values(shortcuts).findIndex(shortcutCommand => shortcutCommand == "example.command.name")

		if (placeholderIndex > -1) {
			shortcutsList.splice(placeholderIndex, 1);
		}

		new Promise(async (res, rej) => {
			try {
				// show shortcuts as quick picks
				let selection = await vscode.window.showQuickPick(shortcutsList);
				// console.log('selection', selection);

				if (!selection) {
					return;
				}

				// check if selected command exists
				let availableCommands = await vscode.commands.getCommands(true);
				// console.log('availableCommands', availableCommands)

				let commandExists = !!shortcuts[selection] && availableCommands.some(command => command === shortcuts[selection]);

				if (commandExists) {
					// if selected command exists run it
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


/***/ }),

/***/ "vscode":
/*!*************************!*\
  !*** external "vscode" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("vscode");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./extension.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map