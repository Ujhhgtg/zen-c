import { workspace, ExtensionContext, commands, window, Terminal } from 'vscode';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient;
let terminal: Terminal | undefined;

function getTerminal(): Terminal {
    if (!terminal) {
        terminal = window.createTerminal('Zen C');
    }
    return terminal;
}

function executeZCCommand(command: string, args: string[] = []): void {
    const terminal = getTerminal();
    const config = workspace.getConfiguration('zen-c');
    const cCompiler = config.get<string>('cCompiler', 'gcc');
    
    const compileCommands = ['run', 'build'];
    if (compileCommands.includes(command)) {
        args = [`--cc`, cCompiler, ...args];
    }
    
    terminal.show(true);
    terminal.sendText(`zc ${command} ${args.join(' ')}`);
}

export function activate(context: ExtensionContext) {
    const command = 'zc';
    const args = ['lsp'];

    const serverOptions: ServerOptions = {
        command,
        args,
        options: {
            cwd: workspace.workspaceFolders && workspace.workspaceFolders.length > 0
                ? workspace.workspaceFolders[0].uri.fsPath
                : undefined
        }
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'zen-c' }],
        synchronize: {
            fileEvents: workspace.createFileSystemWatcher('**/*.zc')
        }
    };

    client = new LanguageClient(
        'zenCLanguageServer',
        'Zen-C Language Server',
        serverOptions,
        clientOptions
    );

    client.start();

    const restartLspCommand = commands.registerCommand('zen-c.lsp.restart', () => {
        client.stop().then(() => {
            client.start();
        });
    });

    const runCommand = commands.registerCommand('zen-c.run', (resource) => {
        let args: string[] = [];
        if (resource && resource.fsPath) {
            args = [resource.fsPath];
        }
        executeZCCommand('run', args);
    });

    const buildCommand = commands.registerCommand('zen-c.build', (resource) => {
        let args: string[] = [];
        if (resource && resource.fsPath) {
            args = [resource.fsPath];
        }
        executeZCCommand('build', args);
    });

    context.subscriptions.push(
        restartLspCommand,
        runCommand,
        buildCommand,
    );
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    if (terminal) {
        terminal.dispose();
    }
    return client.stop();
}
