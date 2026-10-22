// Abre uma janela do VS Code com perfil e extensões isolados (não mexe nas
// configurações do usuário) e roda src/test/integracao. Uso: npm run test:integracao
// Atenção: no Windows, o caminho da pasta da extensão não pode ter espaços
// (o VS Code de teste divide o caminho no espaço); rode a partir de uma cópia sem espaços.
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { runTests } from '@vscode/test-electron';

async function principal() {
    const raiz = path.resolve(__dirname, '..', '..');
    const temporario = fs.mkdtempSync(path.join(os.tmpdir(), 'tutor-socratico-teste-'));
    // VSCODE_EXECUTAVEL: caminho do Code.exe local; sem ele, baixa uma versão de teste do VS Code.
    const executavel = process.env.VSCODE_EXECUTAVEL;
    await runTests({
        ...(executavel ? { vscodeExecutablePath: executavel } : {}),
        extensionDevelopmentPath: raiz,
        extensionTestsPath: path.join(__dirname, 'integracao', 'index'),
        launchArgs: [
            '--user-data-dir', path.join(temporario, 'dados'),
            '--extensions-dir', path.join(temporario, 'extensoes'),
            '--disable-workspace-trust',
            path.join(raiz, 'exemplos'),
        ],
    });
}

principal().catch(erro => {
    console.error(erro);
    process.exit(1);
});
