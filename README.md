# Zen C Language Support

This extension provides comprehensive language support for Zen C, featuring syntax highlighting, intelligent code completion, error detection, and more through the official Zen C Language Server.

## Features

- Syntax highlighting for `.zc` files
- Intelligent code completion
- Error detection and diagnostics
- Go to definition and references
- Find all references
- Hover information
- Document symbols and outline
- Rename symbol support
- Code formatting
- Signature help

## Requirements

- [Zen C compiler](https://github.com/zen-c-lang/zc) installed and accessible in your PATH
- The `zc lsp` command must be working correctly

## Extension Settings

This extension contributes the following commands:

* `zen-c.restartLanguageServer`: Restarts the Zen C language server
* `zen-c.run`: Compile and run the current Zen C program
* `zen-c.build`: Compile the current file to an executable
* `zen-c.check`: Check the current file for errors
* `zen-c.repl`: Start the Zen C interactive REPL
* `zen-c.transpile`: Transpile the current file to C code

### Configuration

* `zen-c.cCompiler`: Specifies the C compiler to use for building Zen C programs. Options are `gcc`, `clang`, `tcc`, and `zig`. Defaults to `gcc`.

## Known Issues

None at this time.

## Release Notes

### 0.0.1

Initial release of Zen C language support extension.

---

## Development

To develop this extension:

1. Clone the repository
2. Run `npm install` to install dependencies
3. Open the project in VS Code
4. Press F5 to launch the extension in a new Extension Development Host window

## Contributing

Contributions are welcome! Please submit issues and pull requests on the GitHub repository.