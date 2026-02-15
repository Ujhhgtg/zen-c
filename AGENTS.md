# Agent Configuration and Best Practices

## VS Code Extension Development

### Activation Events

- VS Code automatically infers activation events from the `contributes` section
- For language extensions, if you contribute a language for `.extension` files, VS Code will automatically activate the extension when those files are opened
- Do not manually add `onLanguage:language-id` to `activationEvents` as it's redundant and unnecessary
- This applies specifically to language contributions - other contribution types may still require explicit activation events

### Publishing Checklist

1. Ensure all dependencies are properly declared
2. Test the extension thoroughly before publishing
3. Update README.md with proper documentation
4. Maintain accurate CHANGELOG.md
5. Include appropriate LICENSE file
6. Verify package.json metadata is correct
7. Package and test the .vsix file before uploading
8. Follow semantic versioning for releases

## Build/Lint/Test Commands

### Building

- `npm run compile` - Compile TypeScript files to JavaScript
- `npm run watch` - Watch and compile TypeScript files continuously
- `npm run vscode:prepublish` - Prepublish script (runs compile)

### Linting

- `npm run lint` - Run ESLint on source files
- ESLint configuration is in `eslint.config.mjs`
- Uses TypeScript ESLint plugin for TypeScript-specific rules

### Testing

- `npm run pretest` - Run compile and lint before tests
- `npm run test` - Run VS Code extension tests (currently not configured)
- To run a single test, you would typically use: `npm run test -- --grep="test-name"`

### Packaging

- `npm run package` - Package the extension into a .vsix file using vsce

## Code Style Guidelines

### General Principles

- Follow functional programming patterns where appropriate
- Prefer immutability over mutation
- Keep functions small and focused on a single responsibility
- Use meaningful variable and function names

### Imports

- Import only what you need
- Group imports logically:
  1. External dependencies
  2. VS Code APIs
  3. Local modules
- Use destructuring imports when importing specific functions/objects
- Sort imports alphabetically within each group

### Formatting

- Use 4 spaces for indentation (TypeScript default)
- No trailing whitespace
- Line length should ideally be <= 100 characters
- Use semicolons consistently
- Place opening braces on the same line as the statement
- Use single quotes for strings unless escaping is needed

### Types

- Use TypeScript's type inference when possible
- Explicitly type function parameters and return values
- Use interfaces for object shapes
- Use type aliases for unions, primitives, or tuples
- Avoid using `any` type unless absolutely necessary

### Naming Conventions

- Use camelCase for variables and functions
- Use PascalCase for classes, interfaces, and types
- Use UPPER_SNAKE_CASE for constants
- Use descriptive names that convey purpose
- Boolean variables should be prefixed with is/has/can/etc. when appropriate

### Error Handling

- Handle errors gracefully with try/catch blocks
- Use VS Code's logging mechanisms for debugging
- Provide meaningful error messages to users
- Avoid silent failures
- Use proper error types when throwing exceptions

### VS Code Extension Specific

- Always dispose of resources in the deactivate function
- Register commands with proper disposal
- Use VS Code's configuration API for extension settings
- Follow VS Code's UI guidelines for notifications and dialogs
- Use the language client properly for LSP interactions

### TypeScript Configuration

- Target: ES2022
- Module: Node16
- Strict mode enabled
- Source maps enabled for debugging
- Root directory: src/
- Output directory: out/

### ESLint Rules

- curly: warn - Enforce consistent brace style
- eqeqeq: warn - Require === and !== comparisons
- no-throw-literal: warn - Disallow throwing literals as exceptions
- semi: warn - Require semicolons
- @typescript-eslint/naming-convention: warn - Enforce naming conventions for imports

## Debugging

- Use VS Code's built-in debugger for extension development
- Set breakpoints in the TypeScript source files
- Use the Extension Development Host for testing
- Check the developer tools console for errors (Help > Toggle Developer Tools)

## Performance Considerations

- Deactivate expensive operations when the extension is deactivated
- Use debounce/throttle for event handlers that might fire frequently
- Dispose of listeners and timers properly
- Minimize file system operations
- Cache expensive computations when appropriate

## Security Best Practices

- Never log or expose sensitive information
- Validate all inputs from users or external sources
- Sanitize file paths to prevent directory traversal
- Use VS Code's APIs for file operations instead of direct Node.js fs calls when possible
