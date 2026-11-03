// Projeto final de Fundamentos 2: o plano do jogo que o aluno escreveu e as
// etapas de desenvolvimento, por pasta (um jogo costuma ter vários .c na
// mesma pasta). O tutor usa o plano como base, no lugar do enunciado.
import * as path from 'path';
import * as vscode from 'vscode';
import { Etapa, juntarEtapas } from './pontos';

interface RegistroDoProjeto {
    plano: string;
    etapas: Etapa[];
}

export interface ProjetoDoJogo extends RegistroDoProjeto {
    pasta: string;
}

const CHAVE = 'tutorSocratico.projetosDeJogo';

export class ProjetosDeJogo {
    private readonly aoMudar = new vscode.EventEmitter<void>();
    readonly onDidChange = this.aoMudar.event;
    // Cópia em memória, como em Exercicios: é a fonte de verdade durante a sessão.
    private registros: Record<string, RegistroDoProjeto>;

    constructor(private readonly memoria: vscode.Memento) {
        this.registros = { ...memoria.get<Record<string, RegistroDoProjeto>>(CHAVE, {}) };
    }

    /** O projeto da pasta do arquivo, se o aluno começou um. */
    doArquivo(uri: vscode.Uri): ProjetoDoJogo | undefined {
        const pasta = pastaDoArquivo(uri);
        const registro = this.registros[pasta];
        return registro ? { pasta, ...registro, etapas: [...registro.etapas] } : undefined;
    }

    async comecar(uri: vscode.Uri) {
        const pasta = pastaDoArquivo(uri);
        if (!this.registros[pasta]) {
            await this.gravar(pasta, { plano: '', etapas: [] });
        }
    }

    async encerrar(uri: vscode.Uri) {
        const pasta = pastaDoArquivo(uri);
        delete this.registros[pasta];
        await this.memoria.update(CHAVE, this.registros);
        this.aoMudar.fire();
    }

    async salvarPlano(uri: vscode.Uri, plano: string) {
        const pasta = pastaDoArquivo(uri);
        const atual = this.registros[pasta] ?? { plano: '', etapas: [] };
        if (atual.plano !== plano) {
            await this.gravar(pasta, { ...atual, plano });
        }
    }

    /** Etapas que o tutor montou; as que já estavam feitas continuam marcadas. */
    async definirEtapas(uri: vscode.Uri, etapas: Etapa[]) {
        const pasta = pastaDoArquivo(uri);
        const atual = this.registros[pasta] ?? { plano: '', etapas: [] };
        await this.gravar(pasta, { ...atual, etapas: juntarEtapas(atual.etapas, etapas) });
    }

    async marcarEtapa(uri: vscode.Uri, indice: number, feita: boolean) {
        const pasta = pastaDoArquivo(uri);
        const atual = this.registros[pasta];
        if (!atual || !atual.etapas[indice]) {
            return;
        }
        const etapas = atual.etapas.map((e, i) => i === indice ? { ...e, feita } : e);
        await this.gravar(pasta, { ...atual, etapas });
    }

    private async gravar(pasta: string, registro: RegistroDoProjeto) {
        this.registros = { ...this.registros, [pasta]: registro };
        await this.memoria.update(CHAVE, this.registros);
        this.aoMudar.fire();
    }
}

function pastaDoArquivo(uri: vscode.Uri): string {
    return path.dirname(uri.fsPath).toLowerCase();
}
