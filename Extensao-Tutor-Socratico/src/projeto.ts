// Projeto final de Fundamentos 2: o projeto do jogo fica num arquivo da pasta
// do aluno, projeto-do-jogo.md (veja diario.ts), com o plano, as etapas, onde
// ele parou e o mapa do código. Por ficar junto com o código, o "save" vai
// para outro computador (pen drive, GitHub) e não se perde quando o perfil do
// VS Code do laboratório é apagado.
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { aplicarAtualizacao, ArquivoDoProjeto, AtualizacaoDoDiario, Diario, diarioVazio, escreverDiario, gerarMapa, lerDiario, NOME_DO_DIARIO } from './diario';
import { Etapa, juntarEtapas } from './pontos';

export interface ProjetoDoJogo extends Diario {
    pasta: string;
    arquivo: string;
}

// Versão 0.9 guardava o plano e as etapas na memória do VS Code: migra para o arquivo.
const CHAVE_ANTIGA = 'tutorSocratico.projetosDeJogo';
const MAX_ARQUIVOS_NO_MAPA = 40;

export class ProjetosDeJogo implements vscode.Disposable {
    private readonly aoMudar = new vscode.EventEmitter<void>();
    readonly onDidChange = this.aoMudar.event;
    private readonly vigia: vscode.FileSystemWatcher;

    constructor(private readonly memoria: vscode.Memento) {
        // O aluno também pode editar o arquivo à mão (ou trazê-lo de outro computador).
        this.vigia = vscode.workspace.createFileSystemWatcher(`**/${NOME_DO_DIARIO}`);
        const avisar = () => this.aoMudar.fire();
        this.vigia.onDidChange(avisar);
        this.vigia.onDidCreate(avisar);
        this.vigia.onDidDelete(avisar);
    }

    dispose() {
        this.vigia.dispose();
        this.aoMudar.dispose();
    }

    caminhoDoDiario(uri: vscode.Uri): string {
        return path.join(path.dirname(uri.fsPath), NOME_DO_DIARIO);
    }

    /** O projeto da pasta do arquivo, se o aluno começou um. */
    doArquivo(uri: vscode.Uri): ProjetoDoJogo | undefined {
        const arquivo = this.caminhoDoDiario(uri);
        const texto = this.lerTexto(arquivo) ?? this.migrar(uri);
        return texto === undefined ? undefined : { pasta: path.dirname(arquivo), arquivo, ...lerDiario(texto) };
    }

    async comecar(uri: vscode.Uri) {
        if (!this.doArquivo(uri)) {
            await this.gravar(uri, diarioVazio());
        }
    }

    /** Apaga o arquivo do projeto (a pasta volta ao modo exercício). */
    async encerrar(uri: vscode.Uri) {
        const arquivo = this.caminhoDoDiario(uri);
        const aberto = vscode.workspace.textDocuments.find(d => mesmoCaminho(d.fileName, arquivo));
        if (aberto) {
            await vscode.window.showTextDocument(aberto);
            await vscode.commands.executeCommand('workbench.action.revertAndCloseActiveEditor');
        }
        if (fs.existsSync(arquivo)) {
            fs.unlinkSync(arquivo);
        }
        this.aoMudar.fire();
    }

    async salvarPlano(uri: vscode.Uri, plano: string) {
        const atual = this.doArquivo(uri) ?? { ...diarioVazio() };
        if (atual.plano !== plano.trim()) {
            await this.gravar(uri, { ...atual, plano });
        }
    }

    /** Etapas que o tutor montou; as que já estavam feitas continuam marcadas. */
    async definirEtapas(uri: vscode.Uri, etapas: Etapa[]) {
        const atual = this.doArquivo(uri) ?? { ...diarioVazio() };
        await this.gravar(uri, { ...atual, etapas: juntarEtapas(atual.etapas, etapas) });
    }

    async marcarEtapa(uri: vscode.Uri, indice: number, feita: boolean) {
        const atual = this.doArquivo(uri);
        if (!atual || !atual.etapas[indice]) {
            return;
        }
        await this.gravar(uri, { ...atual, etapas: atual.etapas.map((e, i) => i === indice ? { ...e, feita } : e) });
    }

    /** O que o tutor mandou no bloco DIARIO: onde parou, decisões, problemas e histórico. */
    async atualizarDiario(uri: vscode.Uri, atualizacao: AtualizacaoDoDiario) {
        const atual = this.doArquivo(uri) ?? { ...diarioVazio() };
        await this.gravar(uri, aplicarAtualizacao(atual, atualizacao, new Date()));
    }

    /** Refaz o mapa do código (depois de salvar um .c ou .h da pasta). */
    async atualizarMapa(uri: vscode.Uri) {
        const atual = this.doArquivo(uri);
        if (atual) {
            await this.gravar(uri, atual);
        }
    }

    /** Mapa do código da pasta, gerado na hora a partir dos .c e .h. */
    mapaDoCodigo(uri: vscode.Uri): string {
        return gerarMapa(arquivosDoCodigo(path.dirname(uri.fsPath)));
    }

    private lerTexto(arquivo: string): string | undefined {
        const aberto = vscode.workspace.textDocuments.find(d => mesmoCaminho(d.fileName, arquivo));
        if (aberto) {
            return aberto.getText();
        }
        try {
            return fs.readFileSync(arquivo, 'utf8');
        } catch {
            return undefined;
        }
    }

    /** Projeto da versão 0.9 (na memória do VS Code): grava no arquivo e apaga da memória. */
    private migrar(uri: vscode.Uri): string | undefined {
        const antigos = this.memoria.get<Record<string, { plano: string; etapas: Etapa[] }>>(CHAVE_ANTIGA, {});
        const chave = path.dirname(uri.fsPath).toLowerCase();
        const antigo = antigos[chave];
        if (!antigo) {
            return undefined;
        }
        const texto = escreverDiario({ ...diarioVazio(), plano: antigo.plano, etapas: antigo.etapas }, this.mapaDoCodigo(uri));
        try {
            fs.writeFileSync(this.caminhoDoDiario(uri), texto, 'utf8');
        } catch {
            return texto;
        }
        const resto = { ...antigos };
        delete resto[chave];
        void this.memoria.update(CHAVE_ANTIGA, resto);
        return texto;
    }

    private async gravar(uri: vscode.Uri, diario: Diario) {
        const arquivo = this.caminhoDoDiario(uri);
        const texto = escreverDiario(diario, this.mapaDoCodigo(uri));
        if (this.lerTexto(arquivo) === texto) {
            return;
        }
        const aberto = vscode.workspace.textDocuments.find(d => mesmoCaminho(d.fileName, arquivo));
        if (aberto) {
            // Aberto no editor: troca pelo próprio editor, para não dar conflito com o que está na tela.
            const edicao = new vscode.WorkspaceEdit();
            edicao.replace(aberto.uri, new vscode.Range(0, 0, aberto.lineCount, 0), texto);
            await vscode.workspace.applyEdit(edicao);
            await aberto.save();
        } else {
            fs.writeFileSync(arquivo, texto, 'utf8');
        }
        this.aoMudar.fire();
    }
}

function mesmoCaminho(a: string, b: string): boolean {
    return path.resolve(a).toLowerCase() === path.resolve(b).toLowerCase();
}

/** Os .c e .h da pasta (com o texto que está no editor, se estiver aberto). */
export function arquivosDoCodigo(pasta: string): ArquivoDoProjeto[] {
    let nomes: string[];
    try {
        nomes = fs.readdirSync(pasta).filter(nome => /\.(c|h)$/i.test(nome)).slice(0, MAX_ARQUIVOS_NO_MAPA);
    } catch {
        return [];
    }
    return nomes.map(nome => {
        const caminho = path.join(pasta, nome);
        const aberto = vscode.workspace.textDocuments.find(d => mesmoCaminho(d.fileName, caminho));
        let texto = '';
        try {
            texto = aberto ? aberto.getText() : fs.readFileSync(caminho, 'utf8');
        } catch {
            // arquivo sumiu no meio do caminho: fica sem conteúdo no mapa
        }
        return { nome, texto };
    });
}
