# coc-json

Json language server extension for [coc.nvim](https://github.com/neoclide/coc.nvim).

The server code are extracted from VSCode, which using
[vscode-json-languageservice](https://www.npmjs.com/package/vscode-json-languageservice)

## Install

In your vim/neovim, run command:

```
:CocInstall coc-json
```

## Features

Same as VSCode.

All features of [vscode-json-languageservice](https://www.npmjs.com/package/vscode-json-languageservice) are supported.

* `doCompletion` for JSON properties and values based on the document's JSON schema.
* `doHover`  for values based on descriptions in the document's JSON schema.<Paste>
* Document Symbols for quick navigation to properties in the document.
* Document Colors for showing color decorators on values representing colors.
* Code Formatting supporting ranges and formatting the whole document.
* Diagnostics (Validation) are pushed for all open documents
    * syntax errors
    * structural validation based on the document's JSON schema.

## Configuration options

* `json.enable` set to `false` to disable json language server.
* `json.trace.server` trace LSP traffic in output channel.
* `json.execArgv` add `execArgv` to `child_process.spawn`
* `json.format.enable` set to `false` to disable format.
* `json.schemas` schema associations for json files.

## License

MIT
