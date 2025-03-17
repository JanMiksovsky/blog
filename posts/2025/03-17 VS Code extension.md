---
title: Writing a VS Code extension in ES modules in early 2025
---

VS Code is moving towards letting people write VS Code extensions directly in native ES modules but as of this writing it’s still not possible. If you are writing a new VS Code extension in early 2025, here is a way to write your extension nearly entirely in ES modules today.

*I haven’t published a version of a VS Code extension that uses this technique yet, but an in-progress [branch](https://github.com/WebOrigami/origami-vscode-extension/tree/lsp) works locally and I believe this will work in production. I’m sharing this technique before shipping it because it’s clear other people are also actively searching for a solution to this problem.*

This strategy leverages Node’s current support for mixing CommonJS and ES modules. You create a small CommonJS wrapper for your extension, then do all your real work in ES modules. Everything can be done in plain JavaScript (no compilation or bundling required).

* In `package.json`, set `"type": "commonjs"`. This lets Node treat plain `.js` file extensions as CommonJS so that VS Code’s own modules can load.
* Create an entry point to your VS Code extension with a `.cjs`  file extension: e.g. `extension.cjs`. (You could potentially use a `.js` extension but the `.cjs` will help you and others remember that this is CommonJS.) This file is just a wrapper, and the only place where you write using CommonJS conventions: `require` and `module.exports`.
* In `package.json`, set this wrapper as the extension entry point: `"main": "./src/extension.cjs"`
* Create an ES module with an `.mjs` file extension: `extension.mjs`. This module is your extension’s real code, and here you’ll use the ES module conventions: `import` and `export`.
* Have `extension.cjs` use a _dynamic_ import to load `extension.mjs`. You can’t use `require()` for this, because `require` is synchronous and ES modules are fundamentally asynchronous. [Example](https://github.com/WebOrigami/origami-vscode-extension/blob/lsp/src/client/extension.cjs)
* The main export of `extension.cjs` is a tiny VS Code extension that delegates all lifecycle methods like `activate` to the real code in the ES module.
* Your `extension.mjs` code will want to use the `vscode` package, but that’s not a regular npm package. The VS Code extension host makes that dynamically available but only to CommonJS modules. Work around this by having `extension.cjs` obtain a `vscode` reference and pass it to `extension.mjs`. You could pass it as a function parameter, but to keep things simpler, I just had `extension.cjs` set a global variable on `globalThis` so `extension.mjs` can read that global. I believe each extension runs in its own process; this should be safe enough.
* Inside your `extension.mjs` module you can freely `import` additional ES modules in your project as long as they have `.mjs` file extensions. (The project’s `"type": "commonjs"` will treat plain `.js` files as CommonJS.)
* Your `.mjs` modules can `import` VS Code dependencies like `vscode-languageclient`. However, since those are CommonJS packages, you can not extract specific package members with the ES syntax `import  { thing }`. Instead, import the entire package as a constant, then destructure the constant to extract the members you want. [Example](https://github.com/WebOrigami/origami-vscode-extension/blob/lsp/src/client/extension.mjs#L8-L9)
* Your `.mjs` modules can `import` dependencies from external ES module projects. Their own `"type": "module"` declaration will let them use `.js` file extensions as usual.
* If you’re writing a language server, you can use the same technique to define the server. The CommonJS wrapper for the server is simpler because it just needs to load the server’s ES module; that will trigger running the server code. Note that a CommonJS module can’t contain a dynamic `import` at the top level, so you’ll need to put the import inside an immediately-executed async function. [Example](https://github.com/WebOrigami/origami-vscode-extension/blob/lsp/src/server/server.cjs)

Once this is set up, you can do your real work in ES modules and generally ignore the CommonJS wrapper. When VS Code eventually supports extensions as native ES modules, migration should mostly entail deleting the CommonJS wrapper, setting `"type": "module"`, and renaming the `.mjs` files to plain `.js` files.