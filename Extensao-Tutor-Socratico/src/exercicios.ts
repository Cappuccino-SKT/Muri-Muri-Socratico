// Guarda, por arquivo .c, o enunciado do exercício informado pelo aluno e se
// ele já respondeu (ou recusou) o pedido para informar o exercício.
import * as path from 'path';
import * as vscode from 'vscode';
import { CasoDeTeste } from './testes';

interface RegistroDoArquivo {
    enunciado?: string;
    exercicioId?: string;
    ajudas?: number;
    casos?: CasoDeTeste[];
    naoEhExercicio?: boolean;
    perguntado?: boolean;
}

const CHAVE = 'tutorSocratico.exercicios';
const MAX_REGISTROS = 500;

export class Exercicios {
    private readonly aoMudar = new vscode.EventEmitter<vscode.Uri>();
    readonly onDidChange = this.aoMudar.event;

    // Cópia em memória do registro: é a fonte de verdade durante a sessão.
    // O globalState pode devolver um valor antigo logo depois de gravações
    // seguidas; por isso a leitura é feita daqui e a gravação vai para lá.
    private registros: Record<string, RegistroDoArquivo>;

    constructor(private readonly memoria: vscode.Memento) {
        this.registros = { ...memoria.get<Record<string, RegistroDoArquivo>>(CHAVE, {}) };
    }

    enunciado(uri: vscode.Uri): string | undefined {
        return this.registro(uri).enunciado;
    }

    exercicioId(uri: vscode.Uri): string | undefined {
        return this.registro(uri).exercicioId;
    }

    ajudas(uri: vscode.Uri): number {
        return this.registro(uri).ajudas ?? 0;
    }

    async somarAjuda(uri: vscode.Uri) {
        await this.atualizar(uri, { ajudas: this.ajudas(uri) + 1 });
    }

    /** Liga o arquivo a um exercício da lista da aula. */
    async vincular(uri: vscode.Uri, exercicioId: string, enunciado: string, casosOficiais: CasoDeTeste[]) {
        const casos = this.casos(uri).length > 0 ? this.casos(uri) : casosOficiais;
        await this.atualizar(uri, { exercicioId, enunciado, casos, naoEhExercicio: false, perguntado: true });
    }

    casos(uri: vscode.Uri): CasoDeTeste[] {
        return this.registro(uri).casos ?? [];
    }

    async salvarCasos(uri: vscode.Uri, casos: CasoDeTeste[]) {
        const limpos = casos
            .map(c => ({
                entrada: String(c.entrada ?? ''),
                saidaEsperada: String(c.saidaEsperada ?? ''),
                ...(c.previsao ? { previsao: String(c.previsao) } : {}),
            }))
            .slice(0, 30);
        await this.atualizar(uri, { casos: limpos, naoEhExercicio: false, perguntado: true });
    }

    naoEhExercicio(uri: vscode.Uri): boolean {
        return this.registro(uri).naoEhExercicio === true;
    }

    jaPerguntado(uri: vscode.Uri): boolean {
        const r = this.registro(uri);
        return r.perguntado === true || r.naoEhExercicio === true || !!r.enunciado;
    }

    async salvarEnunciado(uri: vscode.Uri, texto: string) {
        const enunciado = texto.trim();
        // Se o aluno reescreveu o enunciado, o arquivo deixa de estar ligado ao exercício da lista.
        const atual = this.registro(uri);
        const exercicioId = atual.enunciado === enunciado ? atual.exercicioId : undefined;
        await this.atualizar(uri, { enunciado: enunciado || undefined, exercicioId, naoEhExercicio: false, perguntado: true });
    }

    async marcarNaoEhExercicio(uri: vscode.Uri) {
        await this.atualizar(uri, { enunciado: undefined, exercicioId: undefined, casos: undefined, naoEhExercicio: true, perguntado: true });
    }

    async marcarPerguntado(uri: vscode.Uri) {
        await this.atualizar(uri, { perguntado: true });
    }

    private registro(uri: vscode.Uri): RegistroDoArquivo {
        return this.todos()[chaveDoArquivo(uri)] ?? {};
    }

    private todos(): Record<string, RegistroDoArquivo> {
        return this.registros;
    }

    private async atualizar(uri: vscode.Uri, mudancas: RegistroDoArquivo) {
        const todos = { ...this.todos() };
        const chave = chaveDoArquivo(uri);
        // Reinsere no fim para que os mais antigos sejam descartados primeiro.
        const atual = todos[chave] ?? {};
        delete todos[chave];
        todos[chave] = { ...atual, ...mudancas };

        const chaves = Object.keys(todos);
        for (const antiga of chaves.slice(0, Math.max(0, chaves.length - MAX_REGISTROS))) {
            delete todos[antiga];
        }
        this.registros = todos;
        this.aoMudar.fire(uri);
        await this.memoria.update(CHAVE, todos);
    }
}

/**
 * Chave do arquivo no registro. Usa o caminho no disco normalizado: o mesmo
 * arquivo pode chegar como "C:\..." ou "c:\..." conforme o lugar de onde foi aberto.
 */
function chaveDoArquivo(uri: vscode.Uri): string {
    if (uri.scheme !== 'file') {
        return uri.toString();
    }
    const caminho = path.normalize(uri.fsPath);
    return process.platform === 'win32' ? caminho.toLowerCase() : caminho;
}
