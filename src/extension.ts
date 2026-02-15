import { workspace, ExtensionContext, commands } from 'vscode';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient;

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

    const restartCommand = commands.registerCommand('zen-c.restartLanguageServer', () => {
        client.stop().then(() => {
            client.start();
        });
    });

    context.subscriptions.push(restartCommand);
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
