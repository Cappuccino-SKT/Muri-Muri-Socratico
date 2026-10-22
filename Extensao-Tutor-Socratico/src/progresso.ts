// Progresso do aluno nos exercícios da lista (concluídos e ajudas pedidas) e
// a árvore "Progresso" na barra lateral do Tutor Socrático.
import * as vscode from 'vscode';
import { Catalogo, ExercicioDoCatalogo } from './catalogo';

export interface ProgressoDoExercicio {
    concluido?: boolean;
    concluidoEm?: string;
    ajudas?: number;
}

const CHAVE = 'tutorSocratico.progresso';

export class Progresso {
    private readonly aoMudar = new vscode.EventEmitter<void>();
    readonly onDidChange = this.aoMudar.event;

    // Cópia em memória (mesmo motivo do registro de exercícios: o globalState
    // pode devolver um valor antigo logo depois de gravações seguidas).
    private registros: Record<string, ProgressoDoExercicio>;

    constructor(private readonly memoria: vscode.Memento) {
        this.registros = { ...memoria.get<Record<string, ProgressoDoExercicio>>(CHAVE, {}) };
    }

    de(id: string): ProgressoDoExercicio {
        return this.todos()[id] ?? {};
    }

    async marcarConcluido(id: string, concluido: boolean) {
        await this.atualizar(id, { concluido, concluidoEm: concluido ? new Date().toISOString() : undefined });
    }

    async somarAjuda(id: string) {
        await this.atualizar(id, { ajudas: (this.de(id).ajudas ?? 0) + 1 });
    }

    private todos(): Record<string, ProgressoDoExercicio> {
        return this.registros;
    }

    private async atualizar(id: string, mudancas: ProgressoDoExercicio) {
        const todos = { ...this.todos() };
        todos[id] = { ...todos[id], ...mudancas };
        this.registros = todos;
        this.aoMudar.fire();
        await this.memoria.update(CHAVE, todos);
    }
}

type Item = { tipo: 'aula'; aula: number; titulo: string; exercicios: ExercicioDoCatalogo[] } | { tipo: 'exercicio'; exercicio: ExercicioDoCatalogo };

export class ArvoreDeProgresso implements vscode.TreeDataProvider<Item> {
    private readonly aoMudar = new vscode.EventEmitter<Item | undefined>();
    readonly onDidChangeTreeData = this.aoMudar.event;

    constructor(private readonly catalogo: Catalogo, private readonly progresso: Progresso) {
        progresso.onDidChange(() => this.aoMudar.fire(undefined));
    }

    getChildren(item?: Item): Item[] {
        if (!item) {
            const aulas = new Map<number, ExercicioDoCatalogo[]>();
            for (const e of this.catalogo.exercicios) {
                aulas.set(e.aula, [...(aulas.get(e.aula) ?? []), e]);
            }
            return [...aulas.entries()].map(([aula, exercicios]) => ({ tipo: 'aula', aula, titulo: exercicios[0].tituloAula, exercicios }));
        }
        return item.tipo === 'aula' ? item.exercicios.map(exercicio => ({ tipo: 'exercicio', exercicio })) : [];
    }

    getTreeItem(item: Item): vscode.TreeItem {
        if (item.tipo === 'aula') {
            const feitos = item.exercicios.filter(e => this.progresso.de(e.id).concluido).length;
            const total = item.exercicios.length;
            const no = new vscode.TreeItem(`Aula ${String(item.aula).padStart(2, '0')} – ${item.titulo}`, vscode.TreeItemCollapsibleState.Collapsed);
            no.description = `${feitos}/${total}${feitos === total ? ' ✓' : ''}`;
            no.iconPath = new vscode.ThemeIcon(feitos === total ? 'pass-filled' : feitos > 0 ? 'circle-large-outline' : 'book',
                feitos === total ? new vscode.ThemeColor('testing.iconPassed') : undefined);
            no.tooltip = `${feitos} de ${total} exercícios concluídos`;
            return no;
        }
        const e = item.exercicio;
        const p = this.progresso.de(e.id);
        const no = new vscode.TreeItem(`Exercício ${e.numero}`, vscode.TreeItemCollapsibleState.None);
        no.description = e.enunciado.length > 60 ? e.enunciado.slice(0, 57) + '...' : e.enunciado;
        no.iconPath = p.concluido
            ? new vscode.ThemeIcon('pass-filled', new vscode.ThemeColor('testing.iconPassed'))
            : new vscode.ThemeIcon('circle-large-outline');
        const ajudas = p.ajudas ? `\n\nAjudas pedidas ao tutor: ${p.ajudas}` : '';
        no.tooltip = new vscode.MarkdownString(`**Aula ${e.aula} – ${e.tituloAula}, exercício ${e.numero}**\n\n${e.enunciado}${ajudas}${p.concluido ? '\n\n✅ Concluído' : ''}`);
        no.contextValue = p.concluido ? 'exercicioConcluido' : 'exercicio';
        no.command = { command: 'tutorSocratico.abrirExercicio', title: 'Abrir exercício', arguments: [e.id] };
        return no;
    }
}
