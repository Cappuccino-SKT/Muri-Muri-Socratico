import * as vscode from 'vscode';
import * as path from 'path';
import { carregarMaterial, Material, selecionarAulas } from './material';
import { verificarComGcc } from './gcc';
import { instrucaoDoComando, montarContexto, REGRAS_DO_TUTOR } from './prompt';
import { Exercicios } from './exercicios';
import { ID_PAINEL, PainelExercicio } from './painel';
import { CasoDeTeste, resumirResultados, ResultadoDosTestes, rodarCasos } from './testes';
import { aulaDoExercicio, Catalogo, montarCatalogo } from './catalogo';
import { analisarCodigo, traduzirMensagemGcc } from './didatico';
import { ArvoreDeProgresso, Progresso } from './progresso';

const ID_PARTICIPANTE = 'tutor-socratico.tutor';
// Comandos do chat que contam como "ajuda pedida" no exercício.
const COMANDOS_DE_AJUDA = new Set([undefined, 'pista', 'erro', 'teste', 'verificar', 'depurar']);

let material: Material;
let catalogo: Catalogo;
let diagnosticosGcc: vscode.DiagnosticCollection;
let diagnosticosDicas: vscode.DiagnosticCollection;
let exercicios: Exercicios;
let progresso: Progresso;
let painel: PainelExercicio;
let barraModo: vscode.StatusBarItem;
// Último resultado dos testes por arquivo (só vale enquanto os casos não mudarem).
const ultimosTestes = new Map<string, { casos: string; resultado: ResultadoDosTestes }>();

export function activate(context: vscode.ExtensionContext) {
    const pastaMaterial = path.join(context.extensionPath, 'material');
    material = carregarMaterial(pastaMaterial);
    catalogo = montarCatalogo(material, pastaMaterial);
    diagnosticosGcc = vscode.languages.createDiagnosticCollection('Tutor Socrático (GCC)');
    diagnosticosDicas = vscode.languages.createDiagnosticCollection('Tutor Socrático (dicas)');
    exercicios = new Exercicios(context.globalState);
    progresso = new Progresso(context.globalState);
    contextoGlobal = context.globalState;
    painel = new PainelExercicio(exercicios, modoAprendizadoLigado, ultimoResultado, infoDoExercicio);

    const tutor = vscode.chat.createChatParticipant(ID_PARTICIPANTE, responder);
    tutor.iconPath = new vscode.ThemeIcon('mortar-board');
    tutor.followupProvider = { provideFollowups: sugerirProximosPassos };

    barraModo = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    barraModo.command = 'tutorSocratico.alternarModoAprendizado';

    context.subscriptions.push(
        tutor,
        diagnosticosGcc,
        diagnosticosDicas,
        barraModo,
        vscode.window.registerWebviewViewProvider(ID_PAINEL, painel),
        vscode.window.registerTreeDataProvider('tutorSocratico.progresso', new ArvoreDeProgresso(catalogo, progresso)),
        vscode.commands.registerCommand('tutorSocratico.escolherExercicio', escolherExercicio),
        vscode.commands.registerCommand('tutorSocratico.abrirExercicio', abrirExercicio),
        vscode.commands.registerCommand('tutorSocratico.alternarConcluido', alternarConcluido),
        vscode.commands.registerCommand('tutorSocratico.explicarCodigo', () => abrirChat('@tutor /explicar Meu programa funciona. Quero explicar meu código.', false)),
        vscode.commands.registerCommand('tutorSocratico.quiz', quizDaAula),
        vscode.commands.registerCommand('tutorSocratico.depurar', () => abrirChat('@tutor /depurar Quero encontrar o erro sozinho. Por onde começo a depurar?', false)),
        vscode.commands.registerCommand('tutorSocratico.abrirVideo', (url: string) => vscode.env.openExternal(vscode.Uri.parse(url))),
        progresso.onDidChange(() => painel.atualizar()),
        vscode.workspace.onDidOpenTextDocument(documento => analisarDocumento(documento)),
        vscode.workspace.onDidChangeTextDocument(evento => analisarComAtraso(evento.document)),
        vscode.workspace.onDidCloseTextDocument(documento => diagnosticosDicas.delete(documento.uri)),
        vscode.commands.registerCommand('tutorSocratico.verificarCodigo', verificarCodigo),
        vscode.commands.registerCommand('tutorSocratico.perguntar', () => abrirChat('@tutor ', true)),
        vscode.commands.registerCommand('tutorSocratico.rodarTestes', rodarTestes),
        vscode.commands.registerCommand('tutorSocratico.pistaSobreTeste', pistaSobreTeste),
        vscode.commands.registerCommand('tutorSocratico.informarExercicio', informarExercicio),
        vscode.commands.registerCommand('tutorSocratico.alternarModoAprendizado', alternarModoAprendizado),
        vscode.window.onDidChangeActiveTextEditor(editor => {
            painel.atualizar(editor);
            atualizarBarraModo(editor);
            perguntarSeEhExercicio(editor);
        }),
        exercicios.onDidChange(() => painel.atualizar()),
        vscode.workspace.onDidChangeConfiguration(evento => {
            if (evento.affectsConfiguration('tutorSocratico.dicasOffline')) {
                vscode.workspace.textDocuments.forEach(analisarDocumento);
            }
            if (evento.affectsConfiguration('editor.inlineSuggest.enabled', { languageId: 'c' })) {
                painel.atualizar();
                atualizarBarraModo(vscode.window.activeTextEditor);
            }
        }),
        vscode.commands.registerCommand('tutorSocratico.pedirPista', pedirPista),
        vscode.commands.registerCommand('tutorSocratico.verificarArquivo', () => {
            const editor = vscode.window.activeTextEditor;
            if (editor && editor.document.languageId === 'c') {
                verificarDocumento(editor.document, true);
            }
        }),
        vscode.languages.registerCodeActionsProvider({ language: 'c' }, new AcoesDoTutor(), {
            providedCodeActionKinds: [vscode.CodeActionKind.QuickFix],
        }),
        vscode.workspace.onDidSaveTextDocument(documento => {
            const ativo = vscode.workspace.getConfiguration('tutorSocratico').get<boolean>('verificarAoSalvar', true);
            if (ativo && documento.languageId === 'c') {
                verificarDocumento(documento, false);
            }
        }),
        vscode.workspace.onDidCloseTextDocument(documento => diagnosticosGcc.delete(documento.uri)),
    );

    vscode.workspace.textDocuments.forEach(analisarDocumento);
    atualizarBarraModo(vscode.window.activeTextEditor);
    perguntarSeEhExercicio(vscode.window.activeTextEditor);
}

export function deactivate() {}

// ---------------------------------------------------------------------------
// Chat: @tutor
// ---------------------------------------------------------------------------

async function responder(
    request: vscode.ChatRequest,
    chatContext: vscode.ChatContext,
    stream: vscode.ChatResponseStream,
    token: vscode.CancellationToken,
): Promise<vscode.ChatResult> {
    const documento = documentoCAberto();
    const codigo = documento?.getText();
    const problemas = documento ? problemasDoDocumento(documento) : [];
    const pergunta = request.prompt.trim();

    if (!pergunta && !request.command) {
        stream.markdown('Olá! Me conte sua dúvida sobre o exercício, ou use `/verificar`, `/pista`, `/erro`, `/teste`, `/depurar`, `/explicar`, `/quiz`, `/video` ou `/conceito`.');
        return {};
    }

    const exercicio = documento ? exercicios.enunciado(documento.uri) : undefined;
    const aulaDoArquivo = documento ? aulaDoExercicio(exercicios.exercicioId(documento.uri)) : undefined;
    let aulas = selecionarAulas(material, `${request.command ?? ''} ${pergunta} ${exercicio ?? ''} ${problemas.join(' ')}`, codigo);
    // A aula do exercício da lista vem sempre primeiro (no /quiz, só se o aluno não citou outra aula).
    const aulaCitada = /\baula\s*\d+/i.test(pergunta);
    if (aulaDoArquivo && !(request.command === 'quiz' && aulaCitada)) {
        const daAula = material.aulas.find(a => a.numero === aulaDoArquivo);
        if (daAula) {
            aulas = [daAula, ...aulas.filter(a => a.numero !== aulaDoArquivo)].slice(0, 3);
        }
    }
    if (request.command === 'quiz') {
        aulas = aulas.slice(0, 1);
    }
    if (documento && COMANDOS_DE_AJUDA.has(request.command)) {
        await exercicios.somarAjuda(documento.uri);
        const id = exercicios.exercicioId(documento.uri);
        if (id) {
            await progresso.somarAjuda(id);
        }
    }
    if (documento) {
        stream.reference(documento.uri);
    }
    stream.progress(aulas.length > 0
        ? `Consultando o material: ${aulas.map(a => `Aula ${String(a.numero).padStart(2, '0')}`).join(', ')}...`
        : 'Consultando o material da disciplina...');

    const mensagens: vscode.LanguageModelChatMessage[] = [
        vscode.LanguageModelChatMessage.User(REGRAS_DO_TUTOR),
        vscode.LanguageModelChatMessage.User(montarContexto(material, aulas, {
            nomeArquivo: documento ? path.basename(documento.fileName) : undefined,
            codigo,
            problemas,
            exercicio,
            testes: documento ? resumoDosTestes(documento.uri) : undefined,
        })),
        vscode.LanguageModelChatMessage.Assistant('Entendido. Vou ajudar o aluno com perguntas e pistas, seguindo o material, sem entregar a solução.'),
        ...historicoDaConversa(chatContext),
    ];

    const instrucao = instrucaoDoComando(request.command);
    const textoDoAluno = pergunta || '(o aluno não escreveu nada além do comando)';
    mensagens.push(vscode.LanguageModelChatMessage.User(instrucao ? `[${instrucao}]\n\nAluno: ${textoDoAluno}` : `Aluno: ${textoDoAluno}`));

    try {
        const resposta = await request.model.sendRequest(mensagens, {}, token);
        for await (const trecho of resposta.text) {
            stream.markdown(trecho);
        }
    } catch (erro) {
        stream.markdown(mensagemDeErro(erro));
        return { metadata: { comando: request.command, falhou: true } };
    }
    return { metadata: { comando: request.command } };
}

/** Converte as trocas anteriores com o @tutor em mensagens para o modelo. */
function historicoDaConversa(chatContext: vscode.ChatContext): vscode.LanguageModelChatMessage[] {
    const mensagens: vscode.LanguageModelChatMessage[] = [];
    for (const turno of chatContext.history.slice(-10)) {
        if (turno.participant !== ID_PARTICIPANTE) {
            continue;
        }
        if (turno instanceof vscode.ChatRequestTurn) {
            mensagens.push(vscode.LanguageModelChatMessage.User(`Aluno: ${turno.prompt}`));
        } else if (turno instanceof vscode.ChatResponseTurn) {
            const texto = turno.response
                .filter((parte): parte is vscode.ChatResponseMarkdownPart => parte instanceof vscode.ChatResponseMarkdownPart)
                .map(parte => parte.value.value)
                .join('');
            if (texto) {
                mensagens.push(vscode.LanguageModelChatMessage.Assistant(texto));
            }
        }
    }
    return mensagens;
}

function sugerirProximosPassos(resultado: vscode.ChatResult): vscode.ChatFollowup[] {
    if (resultado.metadata?.falhou) {
        return [];
    }
    return [
        { prompt: 'Ainda não entendi, pode me dar outra pista?', label: 'Outra pista', command: 'pista' },
        { prompt: 'Qual videoaula explica esse assunto?', label: 'Qual vídeo assistir?', command: 'video' },
    ];
}

function mensagemDeErro(erro: unknown): string {
    if (erro instanceof vscode.LanguageModelError) {
        if (erro.code === vscode.LanguageModelError.NoPermissions().code) {
            return '⚠️ O Tutor precisa da sua permissão para usar o modelo de IA do Copilot. Tente de novo e aceite o pedido de permissão.';
        }
        if (erro.code === vscode.LanguageModelError.NotFound().code) {
            return '⚠️ Nenhum modelo de IA disponível. Verifique se o **GitHub Copilot** está instalado e se você entrou na sua conta do GitHub.';
        }
        if (erro.code === vscode.LanguageModelError.Blocked().code) {
            return '⚠️ O limite de uso do Copilot foi atingido por enquanto. Tente novamente mais tarde.';
        }
    }
    const detalhe = erro instanceof Error ? erro.message : String(erro);
    return `⚠️ Não consegui falar com o modelo de IA agora. Detalhe: ${detalhe}`;
}

// ---------------------------------------------------------------------------
// Código aberto, erros do compilador e lâmpada "Pedir uma pista"
// ---------------------------------------------------------------------------

function documentoCAberto(): vscode.TextDocument | undefined {
    const editor = vscode.window.activeTextEditor;
    if (editor && editor.document.languageId === 'c') {
        return editor.document;
    }
    // Com o foco no chat, procura um editor C visível.
    return vscode.window.visibleTextEditors.find(e => e.document.languageId === 'c')?.document;
}

/** Erros e avisos de todas as fontes (GCC desta extensão, extensão C/C++, tarefas). */
function problemasDoDocumento(documento: vscode.TextDocument): string[] {
    const vistos = new Set<string>();
    const lista: string[] = [];
    for (const d of vscode.languages.getDiagnostics(documento.uri)) {
        if (d.severity > vscode.DiagnosticSeverity.Warning) {
            continue;
        }
        const tipo = d.severity === vscode.DiagnosticSeverity.Error ? 'erro' : 'aviso';
        const texto = `Linha ${d.range.start.line + 1} (${tipo}): ${d.message}`;
        if (!vistos.has(texto)) {
            vistos.add(texto);
            lista.push(texto);
        }
    }
    return lista.slice(0, 20);
}

class AcoesDoTutor implements vscode.CodeActionProvider {
    provideCodeActions(
        documento: vscode.TextDocument,
        _intervalo: vscode.Range,
        contexto: vscode.CodeActionContext,
    ): vscode.CodeAction[] {
        const acoes: vscode.CodeAction[] = [];
        for (const d of contexto.diagnostics.filter(d => d.severity <= vscode.DiagnosticSeverity.Information).slice(0, 3)) {
            const acao = new vscode.CodeAction('💡 Pedir uma pista ao Tutor Socrático', vscode.CodeActionKind.QuickFix);
            acao.diagnostics = [d];
            acao.command = {
                command: 'tutorSocratico.pedirPista',
                title: 'Pedir uma pista ao Tutor Socrático',
                arguments: [{ linha: d.range.start.line + 1, mensagem: d.message, arquivo: path.basename(documento.fileName) }],
            };
            acoes.push(acao);

            const video = typeof d.code === 'object' ? d.code : undefined;
            if (video && !acoes.some(a => a.title.includes(String(video.value)))) {
                const assistir = new vscode.CodeAction(`📺 Assistir à videoaula (${video.value})`, vscode.CodeActionKind.QuickFix);
                assistir.diagnostics = [d];
                assistir.command = { command: 'tutorSocratico.abrirVideo', title: 'Assistir à videoaula', arguments: [video.target.toString()] };
                acoes.push(assistir);
            }
        }
        return acoes;
    }
}

// ---------------------------------------------------------------------------
// Dicas offline (sem IA): erros clássicos e tradução das mensagens do GCC
// ---------------------------------------------------------------------------

/** Código do diagnóstico com link para a videoaula da aula indicada. */
function codigoDaAula(aula: number): vscode.Diagnostic['code'] {
    const rotulo = `Aula ${String(aula).padStart(2, '0')}`;
    const video = catalogo.videos.get(aula);
    return video ? { value: rotulo, target: vscode.Uri.parse(video) } : rotulo;
}

function analisarDocumento(documento: vscode.TextDocument) {
    const ativo = vscode.workspace.getConfiguration('tutorSocratico').get<boolean>('dicasOffline', true);
    if (documento.languageId !== 'c' || !ativo) {
        diagnosticosDicas.delete(documento.uri);
        return;
    }
    diagnosticosDicas.set(documento.uri, analisarCodigo(documento.getText()).map(dica => {
        const linha = Math.min(dica.linha - 1, documento.lineCount - 1);
        const inicio = Math.max(0, dica.coluna - 1);
        const diagnostico = new vscode.Diagnostic(
            new vscode.Range(linha, inicio, linha, Math.min(inicio + dica.comprimento, documento.lineAt(linha).range.end.character)),
            '🎓 ' + dica.mensagem,
            vscode.DiagnosticSeverity.Information,
        );
        diagnostico.source = 'Tutor Socrático';
        diagnostico.code = codigoDaAula(dica.aula);
        return diagnostico;
    }));
}

const atrasos = new Map<string, NodeJS.Timeout>();

function analisarComAtraso(documento: vscode.TextDocument) {
    if (documento.languageId !== 'c') {
        return;
    }
    const chave = documento.uri.toString();
    clearTimeout(atrasos.get(chave));
    atrasos.set(chave, setTimeout(() => {
        atrasos.delete(chave);
        analisarDocumento(documento);
    }, 700));
}

interface ProblemaSelecionado {
    linha: number;
    mensagem: string;
    arquivo: string;
}

async function pedirPista(problema?: ProblemaSelecionado) {
    if (problema) {
        await abrirChat(`@tutor /erro O compilador mostrou isto na linha ${problema.linha} de ${problema.arquivo}: "${problema.mensagem}". O que isso quer dizer?`, false);
    } else {
        await abrirChat('@tutor /pista ', true);
    }
}

async function abrirChat(texto: string, parcial: boolean) {
    try {
        await vscode.commands.executeCommand('workbench.action.chat.open', { query: texto, isPartialQuery: parcial });
    } catch {
        await vscode.env.clipboard.writeText(texto);
        vscode.window.showInformationMessage('Não consegui abrir o chat. A pergunta foi copiada: abra o chat do Copilot e cole.');
    }
}

// ---------------------------------------------------------------------------
// Exercício do arquivo, botão "Verificar meu código" e modo aprendizado
// ---------------------------------------------------------------------------

const perguntasAbertas = new Set<string>();

/** Ao abrir um .c ainda sem exercício, pergunta (uma vez) se é um exercício. */
async function perguntarSeEhExercicio(editor: vscode.TextEditor | undefined) {
    if (!editor || editor.document.languageId !== 'c' || editor.document.uri.scheme !== 'file') {
        return;
    }
    const uri = editor.document.uri;
    const perguntar = vscode.workspace.getConfiguration('tutorSocratico').get<boolean>('perguntarExercicio', true);
    if (!perguntar || exercicios.jaPerguntado(uri) || perguntasAbertas.has(uri.toString())) {
        return;
    }
    perguntasAbertas.add(uri.toString());
    await exercicios.marcarPerguntado(uri);

    const resposta = await vscode.window.showInformationMessage(
        `Você vai resolver um exercício em "${path.basename(uri.fsPath)}"? Informe o enunciado e o tutor poderá verificar se o seu programa faz o que foi pedido.`,
        'Informar exercício',
        'Não é exercício',
        'Não perguntar mais',
    );
    perguntasAbertas.delete(uri.toString());

    if (resposta === 'Informar exercício') {
        await informarExercicio();
    } else if (resposta === 'Não é exercício') {
        await exercicios.marcarNaoEhExercicio(uri);
    } else if (resposta === 'Não perguntar mais') {
        await vscode.workspace.getConfiguration('tutorSocratico').update('perguntarExercicio', false, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage('Tudo bem. Você ainda pode informar o exercício quando quiser pelo painel 🎓 Tutor Socrático, na barra lateral.');
    }
}

async function informarExercicio() {
    await vscode.commands.executeCommand(`${ID_PAINEL}.focus`);
    painel.focarEnunciado();
}

/** Botão ao lado do "Executar": salva, verifica com o GCC e pede a revisão ao tutor. */
async function verificarCodigo(uri?: vscode.Uri) {
    const documento = uri instanceof vscode.Uri
        ? vscode.workspace.textDocuments.find(d => d.uri.toString() === uri.toString())
        : documentoCAberto();
    if (!documento || documento.languageId !== 'c') {
        vscode.window.showInformationMessage('Abra um arquivo .c para o tutor verificar.');
        return;
    }
    if (documento.isDirty) {
        await documento.save();
    }
    await verificarDocumento(documento, false);

    const temExercicio = !!exercicios.enunciado(documento.uri);
    const pedido = temExercicio
        ? 'Terminei (ou travei). Verifique meu código em relação ao exercício.'
        : 'Terminei (ou travei). Verifique meu código.';
    await abrirChat(`@tutor /verificar ${pedido}`, false);
}

// ---------------------------------------------------------------------------
// Casos de teste
// ---------------------------------------------------------------------------

function chaveDosCasos(casos: CasoDeTeste[]): string {
    return JSON.stringify(casos);
}

function ultimoResultado(uri: vscode.Uri): ResultadoDosTestes | undefined {
    const ultimo = ultimosTestes.get(uri.toString());
    return ultimo && ultimo.casos === chaveDosCasos(exercicios.casos(uri)) ? ultimo.resultado : undefined;
}

function resumoDosTestes(uri: vscode.Uri): string[] | undefined {
    const resultado = ultimoResultado(uri);
    return resultado ? resumirResultados(exercicios.casos(uri), resultado) : undefined;
}

async function rodarTestes(uri?: vscode.Uri): Promise<ResultadoDosTestes | undefined> {
    const documento = uri instanceof vscode.Uri
        ? vscode.workspace.textDocuments.find(d => d.uri.toString() === uri.toString())
        : documentoCAberto();
    if (!documento || documento.languageId !== 'c' || documento.uri.scheme !== 'file') {
        vscode.window.showInformationMessage('Abra um arquivo .c para rodar os testes.');
        return undefined;
    }
    const casos = exercicios.casos(documento.uri);
    if (casos.length === 0) {
        painel.mostrarTestes(documento.uri, { erro: 'Adicione pelo menos um caso de teste.' });
        return undefined;
    }
    if (documento.isDirty) {
        await documento.save();
    }
    painel.mostrarTestes(documento.uri, 'rodando');
    const caminhoGcc = vscode.workspace.getConfiguration('tutorSocratico').get<string>('caminhoGcc', 'gcc');
    try {
        const resultado = await rodarCasos(caminhoGcc, documento.fileName, casos);
        ultimosTestes.set(documento.uri.toString(), { casos: chaveDosCasos(casos), resultado });
        painel.mostrarTestes(documento.uri, resultado);
        await comemorarSeConcluiu(documento.uri, resultado);
        return resultado;
    } catch (erro) {
        painel.mostrarTestes(documento.uri, { erro: erro instanceof Error ? erro.message : String(erro) });
        return undefined;
    }
}

async function pistaSobreTeste(indice: number) {
    const numero = Number(indice) + 1;
    await abrirChat(`@tutor /teste O caso de teste ${numero} não passou. Não entendi por quê, pode me ajudar?`, false);
}

// ---------------------------------------------------------------------------
// Exercícios da lista da aula, progresso, quiz
// ---------------------------------------------------------------------------

export interface InfoDoExercicio {
    rotulo?: string;
    concluido: boolean;
    ajudas: number;
}

function infoDoExercicio(uri: vscode.Uri): InfoDoExercicio {
    const id = exercicios.exercicioId(uri);
    const e = id ? catalogo.exercicios.find(x => x.id === id) : undefined;
    return {
        rotulo: e ? `Aula ${String(e.aula).padStart(2, '0')} – ${e.tituloAula}, exercício ${e.numero}` : undefined,
        concluido: id ? progresso.de(id).concluido === true : false,
        ajudas: exercicios.ajudas(uri),
    };
}

async function escolherExercicio() {
    type ItemDaLista = vscode.QuickPickItem & { id?: string };
    const itens: ItemDaLista[] = [];
    let aulaAtual = 0;
    for (const e of catalogo.exercicios) {
        if (e.aula !== aulaAtual) {
            aulaAtual = e.aula;
            itens.push({ label: `Aula ${String(e.aula).padStart(2, '0')} – ${e.tituloAula}`, kind: vscode.QuickPickItemKind.Separator });
        }
        itens.push({
            id: e.id,
            label: `${progresso.de(e.id).concluido ? '$(pass-filled)' : '$(circle-large-outline)'} Exercício ${e.numero} (Aula ${String(e.aula).padStart(2, '0')})`,
            detail: e.enunciado,
        });
    }
    const escolhido = await vscode.window.showQuickPick(itens, {
        title: 'Escolher exercício da lista da aula',
        placeHolder: 'Digite para filtrar (ex.: "vetor", "aula 11", "média")',
        matchOnDetail: true,
    });
    if (escolhido?.id) {
        await abrirExercicio(escolhido.id);
    }
}

/** Liga o exercício ao arquivo .c aberto, ou cria um arquivo novo para ele. */
async function abrirExercicio(id: string) {
    const e = catalogo.exercicios.find(x => x.id === id);
    if (!e) {
        return;
    }
    const atual = documentoCAberto();
    const nomeSugerido = `aula${String(e.aula).padStart(2, '0')}_ex${e.numero}.c`;
    if (atual && atual.uri.scheme === 'file' && path.basename(atual.fileName) !== nomeSugerido) {
        const usarAtual = `Usar o arquivo aberto (${path.basename(atual.fileName)})`;
        const resposta = await vscode.window.showQuickPick([usarAtual, `Criar um arquivo novo (${nomeSugerido})`], {
            title: `Aula ${e.aula}, exercício ${e.numero}: onde você vai resolver?`,
        });
        if (!resposta) {
            return;
        }
        if (resposta === usarAtual) {
            await exercicios.vincular(atual.uri, e.id, e.enunciado, e.casosOficiais);
            await vscode.window.showTextDocument(atual);
            await vscode.commands.executeCommand(`${ID_PAINEL}.focus`);
            return;
        }
    }

    const pasta = await pastaDosExercicios();
    if (!pasta) {
        return;
    }
    const arquivo = vscode.Uri.joinPath(pasta, nomeSugerido);
    try {
        await vscode.workspace.fs.stat(arquivo);
    } catch {
        const modelo = [
            '/*',
            ` * Aula ${String(e.aula).padStart(2, '0')} - ${e.tituloAula} - Exercício ${e.numero}`,
            ' *',
            ...quebrarTexto(e.enunciado, 74).map(linha => ` * ${linha}`),
            ' */',
            '#include <stdio.h>',
            '',
            'int main()',
            '{',
            '    ',
            '    return 0;',
            '}',
            '',
        ].join('\n');
        await vscode.workspace.fs.writeFile(arquivo, Buffer.from(modelo, 'utf8'));
    }
    await exercicios.vincular(arquivo, e.id, e.enunciado, e.casosOficiais);
    const editor = await vscode.window.showTextDocument(arquivo);
    const linhaDoCodigo = editor.document.getText().split('\n').findIndex(l => l === '    ');
    if (linhaDoCodigo >= 0) {
        editor.selection = new vscode.Selection(linhaDoCodigo, 4, linhaDoCodigo, 4);
    }
    await vscode.commands.executeCommand(`${ID_PAINEL}.focus`);
}

function quebrarTexto(texto: string, largura: number): string[] {
    const linhas: string[] = [];
    for (const paragrafo of texto.split('\n')) {
        let linha = '';
        for (const palavra of paragrafo.split(/\s+/)) {
            if (linha && (linha + ' ' + palavra).length > largura) {
                linhas.push(linha);
                linha = palavra;
            } else {
                linha = linha ? `${linha} ${palavra}` : palavra;
            }
        }
        linhas.push(linha);
    }
    return linhas;
}

let contextoGlobal: vscode.Memento | undefined;

async function pastaDosExercicios(): Promise<vscode.Uri | undefined> {
    const pastaAberta = vscode.workspace.workspaceFolders?.[0]?.uri;
    if (pastaAberta) {
        return pastaAberta;
    }
    const salva = contextoGlobal?.get<string>('tutorSocratico.pastaExercicios');
    if (salva) {
        return vscode.Uri.parse(salva);
    }
    const escolha = await vscode.window.showOpenDialog({
        canSelectFolders: true, canSelectFiles: false, canSelectMany: false,
        title: 'Escolha a pasta onde salvar seus exercícios', openLabel: 'Usar esta pasta',
    });
    if (escolha?.[0]) {
        await contextoGlobal?.update('tutorSocratico.pastaExercicios', escolha[0].toString());
    }
    return escolha?.[0];
}

async function alternarConcluido(item?: { tipo?: string; exercicio?: { id: string } }) {
    let id = item?.exercicio?.id;
    if (!id) {
        const documento = documentoCAberto();
        id = documento ? exercicios.exercicioId(documento.uri) : undefined;
    }
    if (!id) {
        vscode.window.showInformationMessage('Este arquivo não está ligado a um exercício da lista. Use "Escolher exercício da lista" no painel do Tutor Socrático.');
        return;
    }
    await progresso.marcarConcluido(id, !progresso.de(id).concluido);
}

async function quizDaAula() {
    const documento = documentoCAberto();
    let aula = documento ? aulaDoExercicio(exercicios.exercicioId(documento.uri)) : undefined;
    if (!aula) {
        const escolha = await vscode.window.showQuickPick(
            material.aulas.map(a => ({ label: a.titulo, aula: a.numero })),
            { title: 'Quiz rápido: sobre qual aula?' },
        );
        aula = escolha?.aula;
    }
    if (aula) {
        await abrirChat(`@tutor /quiz aula ${aula}`, false);
    }
}

const todosPassaram = new Map<string, boolean>();

async function comemorarSeConcluiu(uri: vscode.Uri, resultado: ResultadoDosTestes) {
    const passou = resultado.compilou && resultado.casos.length > 0 && resultado.casos.every(c => c.situacao === 'passou');
    const antes = todosPassaram.get(uri.toString());
    todosPassaram.set(uri.toString(), passou);
    if (!passou || antes) {
        return;
    }
    const id = exercicios.exercicioId(uri);
    if (id && !progresso.de(id).concluido) {
        await progresso.marcarConcluido(id, true);
    }
    const explicar = 'Explicar meu código ao tutor';
    const quiz = 'Fazer o quiz da aula';
    const resposta = await vscode.window.showInformationMessage(
        id ? '🎉 Todos os testes passaram! Exercício marcado como concluído no seu progresso.' : '🎉 Todos os testes passaram!',
        explicar, ...(id ? [quiz] : []),
    );
    if (resposta === explicar) {
        await vscode.commands.executeCommand('tutorSocratico.explicarCodigo');
    } else if (resposta === quiz) {
        await quizDaAula();
    }
}

function modoAprendizadoLigado(): boolean {
    return vscode.workspace.getConfiguration('editor', { languageId: 'c' }).get<boolean>('inlineSuggest.enabled', true) === false;
}

async function alternarModoAprendizado() {
    const ligar = !modoAprendizadoLigado();
    // Grava só para a linguagem C, nas configurações do usuário.
    await vscode.workspace
        .getConfiguration('editor', { languageId: 'c' })
        .update('inlineSuggest.enabled', !ligar, vscode.ConfigurationTarget.Global, true);
    vscode.window.showInformationMessage(ligar
        ? 'Modo aprendizado ligado: sem sugestões automáticas de código nos arquivos C. Use o botão 🎓 quando quiser ajuda.'
        : 'Modo aprendizado desligado: o Copilot volta a sugerir código enquanto você digita.');
}

function atualizarBarraModo(editor: vscode.TextEditor | undefined) {
    if (!editor || editor.document.languageId !== 'c') {
        barraModo.hide();
        return;
    }
    const ligado = modoAprendizadoLigado();
    barraModo.text = ligado ? '$(mortar-board) Modo aprendizado' : '$(sparkle) Sugestões ligadas';
    barraModo.tooltip = ligado
        ? 'Modo aprendizado ligado: sem sugestões automáticas de código. Clique para desligar.'
        : 'O Copilot está sugerindo código enquanto você digita. Clique para ligar o modo aprendizado.';
    barraModo.show();
}

// ---------------------------------------------------------------------------
// Verificação com o GCC ao salvar
// ---------------------------------------------------------------------------

let avisouGccAusente = false;

async function verificarDocumento(documento: vscode.TextDocument, manual: boolean) {
    if (documento.uri.scheme !== 'file') {
        return;
    }
    const caminhoGcc = vscode.workspace.getConfiguration('tutorSocratico').get<string>('caminhoGcc', 'gcc');
    try {
        const problemas = await verificarComGcc(caminhoGcc, documento.fileName);
        diagnosticosGcc.set(documento.uri, problemas
            .filter(p => p.gravidade !== 'note')
            .map(p => {
                const linha = Math.max(0, Math.min(p.linha - 1, documento.lineCount - 1));
                const coluna = Math.max(0, p.coluna - 1);
                const fimDaLinha = documento.lineAt(linha).range.end.character;
                const traducao = traduzirMensagemGcc(p.mensagem);
                const diagnostico = new vscode.Diagnostic(
                    new vscode.Range(linha, Math.min(coluna, fimDaLinha), linha, fimDaLinha),
                    traducao ? `${p.mensagem}\n💬 ${traducao.texto}` : p.mensagem,
                    p.gravidade === 'error' ? vscode.DiagnosticSeverity.Error : vscode.DiagnosticSeverity.Warning,
                );
                diagnostico.source = 'gcc';
                if (traducao) {
                    diagnostico.code = codigoDaAula(traducao.aula);
                }
                return diagnostico;
            }));
        if (manual) {
            const total = problemas.filter(p => p.gravidade !== 'note').length;
            vscode.window.showInformationMessage(total === 0
                ? 'Nenhum erro ou aviso encontrado pelo GCC.'
                : `O GCC encontrou ${total} erro(s)/aviso(s). Clique na lâmpada 💡 ao lado da linha para pedir uma pista.`);
        }
    } catch (erro) {
        if (manual || !avisouGccAusente) {
            avisouGccAusente = true;
            vscode.window.showWarningMessage(erro instanceof Error ? erro.message : String(erro));
        }
    }
}
