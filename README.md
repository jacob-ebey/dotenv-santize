# dotenv-sanitize README

Quickly sanitize your .env (dotenv) files.

## Features
- Cross Platform
- Windows / Linux
- - `Ctrl + Shift + P` to bring up the dialog and search for "Dotenv: Sanitize" on VSCode for PCs.
- macOS
`- - Cmd + Shift + P` to bring up the dialog and search for "Dotenv: Sanitize" on VSCode for macOS.

## VS Code Settings

All updates to be configured from within 

* `editor.dotenvSecretReplacement`: The value to replace string secrets with
* `editor.dotenvSecretReplacementRedactions:` An array of keys to remove entirely from the results of the sanitization process.
* `editor.dotenvSecretReplacementExemptions:` An array of keys to ignore from sanatizing entirely.

## Release Notes

### 1.0.0

Initial release of dotenv-sanitize
