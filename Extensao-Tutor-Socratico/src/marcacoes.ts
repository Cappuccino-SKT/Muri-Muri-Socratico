// Marca no editor o ponto que o tutor pediu para o aluno revisar: seta na
// margem, linha destacada, a pergunta no fim da linha e botões em cima dela.
// Só o ponto atual aparece; quando o aluno o resolve, vem o próximo.
import * as vscode from 'vscode';
import { BlocoDePontos, moverLinha, Ponto } from './pontos';

export interface PontosDoArquivo {
    pontos: Ponto[];
    resolvidos: number;
}

export interface PontoAtual {
    ponto: Ponto;
    numero: number;
    total: number;
}

const COMANDOS_DO_PONTO = ['tutorSocratico.proximoPonto', 'tutorSocratico.pistaDoPonto', 'tutorSocratico.limparPontos'];

export class Marcacoes implements vscode.CodeLensProvider, vscode.Disposable {
    private readonly porArquivo = new Map<string, PontosDoArquivo>();
    private readonly decoracao: vscode.TextEditorDecorationType;
    private readonly mudou = new vscode.EventEmitter<void>();
    readonly onDidChangeCodeLenses = this.mudou.event;
    readonly onDidChange = this.mudou.event;

    constructor(extensionUri: vscode.Uri) {
        this.decoracao = vscode.window.createTextEditorDecorationType({
            isWholeLine: true,
            backgroundColor: 'rgba(255, 196, 0, 0.13)',
            gutterIconPath: vscode.Uri.joinPath(extensionUri, 'media', 'seta.svg'),
            gutterIconSize: 'contain',
            overviewRulerColor: 'rgba(255, 196, 0, 0.9)',
            overviewRulerLane: vscode.OverviewRulerLane.Full,
        });
    }

    dispose() {
        this.decoracao.dispose();
        this.mudou.dispose();
    }

    /** Guarda os pontos que vieram na resposta do tutor. */
    definir(uri: vscode.Uri, bloco: BlocoDePontos, conferindo: boolean) {
        const chave = uri.toString();
        const antes = this.porArquivo.get(chave);
        const resolvidos = conferindo && antes ? antes.resolvidos + (bloco.resolvido ? 1 : 0) : 0;
        if (bloco.pontos.length === 0) {
            this.porArquivo.delete(chave);
        } else {
            this.porArquivo.set(chave, { pontos: bloco.pontos, resolvidos });
        }
        this.redesenhar();
    }

    limpar(uri?: vscode.Uri) {
        if (uri) {
            this.porArquivo.delete(uri.toString());
        } else {
            this.porArquivo.clear();
        }
        this.redesenhar();
    }

    doArquivo(uri: vscode.Uri): PontosDoArquivo | undefined {
        return this.porArquivo.get(uri.toString());
    }

    atual(uri: vscode.Uri): PontoAtual | undefined {
        const estado = this.porArquivo.get(uri.toString());
        if (!estado) {
            return undefined;
        }
        return { ponto: estado.pontos[0], numero: estado.resolvidos + 1, total: estado.resolvidos + estado.pontos.length };
    }

    /** Leva o cursor até o ponto atual. */
    async irPara(uri: vscode.Uri) {
        const atual = this.atual(uri);
        if (!atual) {
            return;
        }
        const editor = await vscode.window.showTextDocument(uri, { preserveFocus: false });
        const linha = Math.min(atual.ponto.linha, editor.document.lineCount) - 1;
        const inicio = new vscode.Position(linha, editor.document.lineAt(linha).firstNonWhitespaceCharacterIndex);
        editor.selection = new vscode.Selection(inicio, inicio);
        editor.revealRange(new vscode.Range(inicio, inicio), vscode.TextEditorRevealType.InCenterIfOutsideViewport);
    }

    /** As linhas marcadas acompanham o código quando o aluno edita acima delas. */
    aoEditar(evento: vscode.TextDocumentChangeEvent) {
        const estado = this.porArquivo.get(evento.document.uri.toString());
        if (!estado || evento.contentChanges.length === 0) {
            return;
        }
        let mexeu = false;
        for (const ponto of estado.pontos) {
            for (const mudanca of evento.contentChanges) {
                const m = {
                    inicio: mudanca.range.start.line + 1,
                    fim: mudanca.range.end.line + 1,
                    linhasNovas: mudanca.text.split('\n').length - 1,
                    noComecoDaLinha: mudanca.range.isEmpty && mudanca.range.start.character === 0,
                };
                const linha = moverLinha(ponto.linha, m);
                const ate = ponto.ate ? moverLinha(ponto.ate, m) : undefined;
                if (linha !== ponto.linha || ate !== ponto.ate) {
                    ponto.linha = linha;
                    ponto.ate = ate && ate > linha ? ate : undefined;
                    mexeu = true;
                }
            }
        }
        if (mexeu) {
            this.redesenhar();
        }
    }

    /** Desenha a marcação em todos os editores visíveis. */
    redesenhar() {
        for (const editor of vscode.window.visibleTextEditors) {
            const atual = this.atual(editor.document.uri);
            if (!atual) {
                editor.setDecorations(this.decoracao, []);
                continue;
            }
            const total = editor.document.lineCount;
            const inicio = Math.min(atual.ponto.linha, total) - 1;
            const fim = Math.min(atual.ponto.ate ?? atual.ponto.linha, total) - 1;
            const opcoes: vscode.DecorationOptions[] = [];
            for (let linha = inicio; linha <= fim; linha++) {
                opcoes.push({
                    range: new vscode.Range(linha, 0, linha, 0),
                    hoverMessage: linha === inicio ? this.dica(atual) : undefined,
                    renderOptions: linha === inicio ? {
                        after: {
                            contentText: `  ◀ 🎓 Ponto ${atual.numero} de ${atual.total}: ${encurtar(atual.ponto.pergunta, 70)}`,
                            color: new vscode.ThemeColor('editorCodeLens.foreground'),
                            fontStyle: 'italic',
                        },
                    } : undefined,
                });
            }
            editor.setDecorations(this.decoracao, opcoes);
        }
        this.mudou.fire();
    }

    provideCodeLenses(documento: vscode.TextDocument): vscode.CodeLens[] {
        const atual = this.atual(documento.uri);
        if (!atual) {
            return [];
        }
        const linha = Math.min(atual.ponto.linha, documento.lineCount) - 1;
        const local = new vscode.Range(linha, 0, linha, 0);
        return [
            new vscode.CodeLens(local, { title: `🎓 Ponto ${atual.numero} de ${atual.total}`, command: 'tutorSocratico.irParaPonto', arguments: [documento.uri] }),
            new vscode.CodeLens(local, { title: '✅ Já corrigi, conferir', command: 'tutorSocratico.proximoPonto', arguments: [documento.uri] }),
            new vscode.CodeLens(local, { title: '💡 Pista', command: 'tutorSocratico.pistaDoPonto', arguments: [documento.uri] }),
            new vscode.CodeLens(local, { title: '✖ Esconder', command: 'tutorSocratico.limparPontos', arguments: [documento.uri] }),
        ];
    }

    private dica(atual: PontoAtual): vscode.MarkdownString {
        const texto = new vscode.MarkdownString(
            `**🎓 Ponto ${atual.numero} de ${atual.total}**\n\n${atual.ponto.pergunta}\n\n` +
            '[✅ Já corrigi, conferir](command:tutorSocratico.proximoPonto) · ' +
            '[💡 Pista](command:tutorSocratico.pistaDoPonto) · ' +
            '[✖ Esconder](command:tutorSocratico.limparPontos)');
        texto.isTrusted = { enabledCommands: COMANDOS_DO_PONTO };
        return texto;
    }
}

function encurtar(texto: string, maximo: number): string {
    return texto.length <= maximo ? texto : texto.slice(0, maximo - 1).trimEnd() + '…';
}
