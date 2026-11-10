import * as vscode from 'vscode';
import * as path from 'path';
import { carregarMaterial, ehProjetoRaylib, INCLUI_RAYLIB, Material, selecionarAulas } from './material';
import { bibliotecasPadraoDaRaylib, compilarJogo, verificarComGcc } from './gcc';
import { execFile, spawn, ChildProcess } from 'child_process';
import * as fs from 'fs';
import { ATUALIZAR_DIARIO, instrucaoDoComando, montarContexto, PROXIMO_NA_QUALIDADE, REGRAS_DO_TUTOR } from './prompt';
import { Exercicios } from './exercicios';
import { ID_PAINEL, InfoDoPainel, PainelExercicio } from './painel';
import { CasoDeTeste, resumirResultados, ResultadoDosTestes, rodarCasos } from './testes';
import { aulaDoExercicio, Catalogo, montarCatalogo } from './catalogo';
import { analisarCodigo, limparCodigo, traduzirMensagemGcc } from './didatico';
import { comentariosDoInicio, montarCabecalho, montarComentarioDoEnunciado, temCabecalhoDoxygen, temEnunciadoNoComentario, verificarQualidade, BRIEF_A_PREENCHER } from './cabecalho';
import { IdDaPendencia, JUSTIFICATIVA, Prontidao } from './prontidao';
import { comentarioInicial, reconhecerExercicio } from './reconhecer';
import { verificarMakefile } from './makefile';
import { ProjetosDeJogo } from './projeto';
import { atualizacaoVazia, lerBlocoDiario, NOME_DO_DIARIO } from './diario';
import { BlocoDePontos, cartaoDaNota, Etapa, FiltroDoBloco, pontosDoArquivo, somarNota } from './pontos';
import { Marcacoes } from './marcacoes';

const ID_PARTICIPANTE = 'tutor-socratico.tutor';
// Comandos do chat que contam como "ajuda pedida" no exercício.
const COMANDOS_DE_AJUDA = new Set([undefined, 'pista', 'erro', 'teste', 'verificar', 'depurar', 'passo']);

let material: Material;
let catalogo: Catalogo;
let diagnosticosGcc: vscode.DiagnosticCollection;
let diagnosticosDicas: vscode.DiagnosticCollection;
let exercicios: Exercicios;
let painel: PainelExercicio;
let barraModo: vscode.StatusBarItem;
let marcacoes: Marcacoes;
let projetos: ProjetosDeJogo;
let prontidao: Prontidao;
let acessoAosModelos: vscode.LanguageModelAccessInformation;
let contextoGlobal: vscode.ExtensionContext;
// Último resultado dos testes por arquivo (só vale enquanto os casos não mudarem).
const ultimosTestes = new Map<string, { casos: string; resultado: ResultadoDosTestes }>();

export function activate(context: vscode.ExtensionContext) {
    const pastaMaterial = path.join(context.extensionPath, 'material');
    material = carregarMaterial(pastaMaterial);
    catalogo = montarCatalogo(material, pastaMaterial);
    diagnosticosGcc = vscode.languages.createDiagnosticCollection('Tutor Socrático (GCC)');
    diagnosticosDicas = vscode.languages.createDiagnosticCollection('Tutor Socrático (dicas)');
    exercicios = new Exercicios(context.globalState);
    marcacoes = new Marcacoes(context.extensionUri);
    prontidao = new Prontidao(context, () => {
        // O arquivo do painel; antes de o painel abrir, o do editor ativo.
        const ativo = vscode.window.activeTextEditor?.document;
        const arquivo = painel?.arquivo ?? (ativo && ativo.languageId === 'c' ? ativo.uri : undefined);
        return !!arquivo && emProjetoDeJogo(arquivo);
    });
    acessoAosModelos = context.languageModelAccessInformation;
    contextoGlobal = context;
    projetos = new ProjetosDeJogo(context.globalState);
    painel = new PainelExercicio(exercicios, salvarEnunciado, modoAprendizadoLigado, ultimoResultado, infoDoExercicio, projetos, emProjetoDeJogo);

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
        vscode.commands.registerCommand('tutorSocratico.explicarCodigo', () => abrirChat('@tutor /explicar Meu programa funciona. Quero explicar meu código.', false)),
        vscode.commands.registerCommand('tutorSocratico.quiz', quizDaAula),
        vscode.commands.registerCommand('tutorSocratico.depurar', () => abrirChat('@tutor /depurar Quero encontrar o erro sozinho. Por onde começo a depurar?', false)),
        vscode.commands.registerCommand('tutorSocratico.abrirVideo', (url: string) => vscode.env.openExternal(vscode.Uri.parse(url))),
        vscode.workspace.onDidOpenTextDocument(documento => analisarDocumento(documento)),
        marcacoes,
        prontidao,
        prontidao.onDidChange(itens => painel.mostrarProntidao(itens)),
        vscode.commands.registerCommand('tutorSocratico.liberarIa', () => prontidao.liberarIa()),
        vscode.commands.registerCommand('tutorSocratico.abrirGuia', (passo?: string) => prontidao.abrirGuia(typeof passo === 'string' ? passo : undefined)),
        vscode.commands.registerCommand('tutorSocratico.conferirProntidao', () => prontidao.conferir()),
        vscode.commands.registerCommand('tutorSocratico.resolverPendencia', (id: IdDaPendencia) => prontidao.resolver(id)),
        vscode.commands.registerCommand('tutorSocratico.inserirCabecalho', inserirCabecalho),
        vscode.workspace.onDidGrantWorkspaceTrust(() => {
            // Pasta liberada: agora dá para compilar os arquivos abertos.
            vscode.workspace.textDocuments.filter(d => d.languageId === 'c').forEach(d => verificarDocumento(d, false));
        }),
        vscode.languages.registerCodeLensProvider({ language: 'c' }, marcacoes),
        vscode.window.onDidChangeVisibleTextEditors(() => marcacoes.redesenhar()),
        marcacoes.onDidChange(() => painel.atualizar()),
        vscode.commands.registerCommand('tutorSocratico.proximoPonto', proximoPonto),
        vscode.commands.registerCommand('tutorSocratico.pistaDoPonto', pistaDoPonto),
        vscode.commands.registerCommand('tutorSocratico.irParaPonto', (uri?: vscode.Uri) => {
            const alvo = arquivoDoPonto(uri);
            return alvo && marcacoes.irPara(alvo);
        }),
        vscode.commands.registerCommand('tutorSocratico.limparPontos', (uri?: vscode.Uri) => {
            const alvo = arquivoDoPonto(uri);
            if (alvo) {
                marcacoes.limpar(alvo);
            }
        }),
        vscode.workspace.onDidChangeTextDocument(evento => {
            marcacoes.aoEditar(evento);
            analisarComAtraso(evento.document);
            if (evento.document.uri.toString() === painel.arquivo?.toString() && !exercicios.enunciado(evento.document.uri)) {
                // Sem enunciado, o painel mostra o que foi deduzido do comentário do arquivo.
                painel.atualizarComAtraso();
            }
        }),
        vscode.workspace.onDidCloseTextDocument(documento => diagnosticosDicas.delete(documento.uri)),
        vscode.commands.registerCommand('tutorSocratico.verificarCodigo', verificarCodigo),
        vscode.commands.registerCommand('tutorSocratico.verificarQualidade', verificarQualidadeDoCodigo),
        vscode.commands.registerCommand('tutorSocratico.rodarJogo', rodarJogo),
        projetos.onDidChange(() => painel.atualizar()),
        vscode.commands.registerCommand('tutorSocratico.comecarJogo', comecarJogo),
        vscode.commands.registerCommand('tutorSocratico.encerrarJogo', async (uri?: vscode.Uri) => {
            const alvo = uri instanceof vscode.Uri ? uri : documentoCAberto()?.uri;
            const projeto = alvo && projetos.doArquivo(alvo);
            if (!alvo || !projeto) {
                return;
            }
            // O arquivo guarda o plano e o diário: só apaga com a confirmação do aluno.
            const temConteudo = projeto.plano || projeto.etapas.length || projeto.ondeParei || projeto.historico.length;
            if (temConteudo) {
                const escolha = await vscode.window.showWarningMessage(
                    `Voltar ao modo exercício apaga o ${NOME_DO_DIARIO} desta pasta, com o plano, as etapas e o diário do jogo. Continuar?`,
                    { modal: true }, 'Apagar e voltar');
                if (escolha !== 'Apagar e voltar') {
                    return;
                }
            }
            await projetos.encerrar(alvo);
        }),
        vscode.commands.registerCommand('tutorSocratico.planejarJogo', () => abrirChat('@tutor /plano Este é o plano do meu jogo. Me ajude a dividir o desenvolvimento em etapas.', false)),
        vscode.commands.registerCommand('tutorSocratico.proximaEtapa', () => abrirChat('@tutor /passo Me ajude com a próxima etapa do meu jogo.', false)),
        vscode.commands.registerCommand('tutorSocratico.salvarDiario', () => abrirChat('@tutor /salvar Vou parar por agora. Salve onde eu parei e qual é o próximo passo.', false)),
        vscode.commands.registerCommand('tutorSocratico.abrirDiario', abrirDiario),
        projetos,
        vscode.workspace.onDidSaveTextDocument(documento => {
            // Salvou um .c ou .h do jogo: o mapa do código no projeto-do-jogo.md é refeito (sem IA).
            if (/\.(c|h)$/i.test(documento.fileName) && documento.uri.scheme === 'file' && projetos.doArquivo(documento.uri)) {
                void projetos.atualizarMapa(documento.uri);
            }
        }),
        vscode.commands.registerCommand('tutorSocratico.compilarComMake', compilarComMake),
        vscode.commands.registerCommand('tutorSocratico.ajudaMakefile', () => abrirChat('@tutor Como faço o Makefile do meu projeto? Quero entender cada parte para montar o meu.', false)),
        vscode.commands.registerCommand('tutorSocratico.perguntar', () => abrirChat('@tutor ', true)),
        vscode.commands.registerCommand('tutorSocratico.rodarTestes', rodarTestes),
        vscode.commands.registerCommand('tutorSocratico.pistaSobreTeste', pistaSobreTeste),
        vscode.commands.registerCommand('tutorSocratico.informarExercicio', informarExercicio),
        vscode.commands.registerCommand('tutorSocratico.alternarModoAprendizado', alternarModoAprendizado),
        vscode.window.onDidChangeActiveTextEditor(editor => {
            painel.atualizar(editor);
            if (editor && editor.document.languageId === 'c') {
                // Trocou entre jogo e exercício: o item da raylib aparece ou some.
                prontidao.conferirComAtraso();
            }
            atualizarBarraModo(editor);
            perguntarSeEhExercicio(editor);
        }),
        exercicios.onDidChange(() => painel.atualizar()),
        vscode.workspace.onDidChangeConfiguration(evento => {
            if (evento.affectsConfiguration('tutorSocratico.dicasOffline') || evento.affectsConfiguration('tutorSocratico.dicasDeQualidade')) {
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
        vscode.languages.registerCodeActionsProvider({ language: 'makefile' }, { provideCodeActions: trocarEspacosPorTab }, {
            providedCodeActionKinds: [vscode.CodeActionKind.QuickFix],
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
    avisarPendenciasAoIniciar();
    // Usado pelos testes de integração.
    return { marcacoes, prontidao, projetos };
}

export function deactivate() {
    if (jogoRodando && jogoRodando.exitCode === null) {
        jogoRodando.kill();
    }
}

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
    if (documento && request.command === 'qualidade') {
        // Os avisos offline de qualidade (cabeçalho, indentação) ajudam o modelo a não esquecer nada.
        problemas.push(...(diagnosticosDicas.get(documento.uri) ?? [])
            .filter(d => d.source === FONTE_QUALIDADE)
            .map(d => `Linha ${d.range.start.line + 1} (aviso automático de qualidade): ${d.message.replace(/^🎓 /, '')}`));
    }
    const pergunta = request.prompt.trim();

    if (!pergunta && !request.command) {
        stream.markdown('Olá! Me conte sua dúvida sobre o exercício, ou use `/verificar`, `/pista`, `/erro`, `/teste`, `/depurar`, `/explicar`, `/quiz`, `/video` ou `/conceito`.');
        return {};
    }

    const doArquivo = documento ? exercicioDoArquivo(documento) : undefined;
    const exercicio = doArquivo?.texto;
    const aulaDoArquivo = aulaDoExercicio(doArquivo?.id);
    // Com um Makefile aberto (ou no projeto com raylib), o tutor lê o Makefile da pasta.
    const makefileAberto = vscode.window.activeTextEditor?.document.languageId === 'makefile';
    const projetoDoJogo = documento && emProjetoDeJogo(documento.uri) ? projetos.doArquivo(documento.uri) : undefined;
    const projetoRaylib = makefileAberto || !!projetoDoJogo || ehProjetoRaylib(pergunta, codigo ?? '') || (!!documento && emProjetoDeJogo(documento.uri));
    const makefile = projetoRaylib ? makefileDoProjeto(documento) : undefined;
    let aulas = selecionarAulas(material, `${request.command ?? ''} ${pergunta} ${exercicio ?? ''} ${problemas.join(' ')} ${makefileAberto ? 'makefile' : ''}`, codigo);
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
            origemDoExercicio: doArquivo?.origem,
            testes: documento ? resumoDosTestes(documento.uri) : undefined,
            projetoRaylib,
            makefile,
            jogo: documento && emProjetoDeJogo(documento.uri) ? {
                plano: projetoDoJogo?.plano ?? '',
                etapas: projetoDoJogo?.etapas ?? [],
                ondeParei: projetoDoJogo?.ondeParei,
                decisoes: projetoDoJogo?.decisoes,
                problemas: projetoDoJogo?.problemas,
                historico: projetoDoJogo?.historico,
                mapa: projetos.mapaDoCodigo(documento.uri),
            } : undefined,
            pontos: documento ? marcacoes.doArquivo(documento.uri) : undefined,
        })),
        vscode.LanguageModelChatMessage.Assistant('Entendido. Vou ajudar o aluno com perguntas e pistas, seguindo o material, sem entregar a solução.'),
        ...historicoDaConversa(chatContext),
    ];

    // Conferindo um ponto da verificação de qualidade: segue com a rubrica e a nota.
    const naQualidade = request.command === 'qualidade'
        || (request.command === 'proximo' && !!documento && marcacoes.doArquivo(documento.uri)?.tipo === 'qualidade');
    const instrucaoDoPedido = request.command === 'proximo' && naQualidade
        ? `${instrucaoDoComando('proximo')}\n${PROXIMO_NA_QUALIDADE}`
        : instrucaoDoComando(request.command);
    const noJogo = !!documento && emProjetoDeJogo(documento.uri);
    const instrucao = noJogo ? [instrucaoDoPedido, ATUALIZAR_DIARIO].filter(Boolean).join('\n\n') : instrucaoDoPedido;
    const textoDoAluno = pergunta || '(o aluno não escreveu nada além do comando)';
    mensagens.push(vscode.LanguageModelChatMessage.User(instrucao ? `[${instrucao}]\n\nAluno: ${textoDoAluno}` : `Aluno: ${textoDoAluno}`));

    // O /verificar e o /proximo terminam com um bloco escondido que diz quais
    // linhas marcar no editor; ele é tirado do texto mostrado ao aluno.
    if (acessoAosModelos.canSendRequest(request.model) === false) {
        explicarPermissao(stream);
        return { metadata: { comando: request.command, falhou: true } };
    }
    const filtro = new FiltroDoBloco();
    let bloco: BlocoDePontos | undefined;
    let etapas: Etapa[] | undefined;
    let textoDoDiario: string | undefined;
    try {
        const resposta = await request.model.sendRequest(mensagens, { justification: JUSTIFICATIVA }, token);
        for await (const trecho of resposta.text) {
            const visivel = filtro.empurrar(trecho);
            if (visivel) {
                stream.markdown(visivel);
            }
        }
        const fim = filtro.terminar();
        if (fim.resto) {
            stream.markdown(fim.resto);
        }
        bloco = fim.bloco;
        registrarDepuracao(request.command, fim.bruto);
        etapas = fim.etapas;
        textoDoDiario = fim.diario;
    } catch (erro) {
        if (erro instanceof vscode.LanguageModelError && erro.code === vscode.LanguageModelError.NoPermissions().code) {
            explicarPermissao(stream);
        } else {
            stream.markdown(mensagemDeErro(erro));
            stream.button({ command: 'tutorSocratico.abrirGuia', title: '📘 Abrir o guia de primeiros passos' });
        }
        prontidao.conferirComAtraso();
        return { metadata: { comando: request.command, falhou: true } };
    }
    if (documento && noJogo && textoDoDiario !== undefined) {
        const atualizacao = lerBlocoDiario(textoDoDiario);
        if (!atualizacaoVazia(atualizacao)) {
            await projetos.comecar(documento.uri);
            await projetos.atualizarDiario(documento.uri, atualizacao);
            stream.markdown(`\n\n---\n💾 Anotei onde você parou no \`${NOME_DO_DIARIO}\`.`);
            if (request.command === 'salvar') {
                stream.button({ command: 'tutorSocratico.abrirDiario', title: '📄 Abrir o diário do projeto', arguments: [documento.uri] });
            }
        }
    } else if (documento && noJogo && request.command === 'salvar') {
        stream.markdown('\n\n---\n⚠️ Não consegui salvar desta vez. Tente de novo, ou escreva você mesmo em "Onde parei" no arquivo do projeto.');
        stream.button({ command: 'tutorSocratico.abrirDiario', title: '📄 Abrir o diário do projeto', arguments: [documento.uri] });
    }
    if (documento && etapas && etapas.length > 0 && request.command === 'plano') {
        await projetos.comecar(documento.uri);
        await projetos.definirEtapas(documento.uri, etapas);
        stream.markdown(`\n\n---\n📋 Coloquei as ${etapas.length} etapas no painel do tutor (🎮 Meu jogo). Marque cada uma quando terminar.`);
        stream.button({ command: 'tutorSocratico.exercicio.focus', title: '📋 Ver as etapas no painel' });
        stream.button({ command: 'tutorSocratico.proximaEtapa', title: '➡️ Me ajude com a primeira etapa' });
    }
    if (documento && bloco && (request.command === 'verificar' || request.command === 'qualidade' || request.command === 'proximo')) {
        const doArquivoAberto = { ...bloco, pontos: pontosDoArquivo(bloco.pontos, path.basename(documento.fileName)) };
        marcacoes.definir(documento.uri, doArquivoAberto, request.command === 'proximo', naQualidade ? 'qualidade' : 'codigo');
        const nota = naQualidade && bloco.criterios ? somarNota(bloco.criterios) : undefined;
        if (nota !== undefined) {
            const anterior = exercicios.notasDeQualidade(documento.uri).at(-1);
            stream.markdown('\n\n---\n' + cartaoDaNota(bloco.criterios!, anterior));
            await exercicios.salvarNotaDeQualidade(documento.uri, nota);
        }
        const atual = marcacoes.atual(documento.uri);
        if (atual) {
            if (atual.tipo === 'qualidade') {
                stream.markdown(`\n\n---\n📍 Marquei a **linha ${atual.ponto.linha}** no editor (ponto de qualidade ${atual.numero} de ${atual.total}). Faça um ponto e clique em **✅ Feito, próximo** para ir ao seguinte. Depois do último, eu confiro tudo de uma vez e dou a nota nova.`);
                stream.button({ command: 'tutorSocratico.irParaPonto', title: '📍 Ir para a linha', arguments: [documento.uri] });
                stream.button({ command: 'tutorSocratico.proximoPonto', title: '✅ Feito, próximo', arguments: [documento.uri] });
            } else {
                stream.markdown(`\n\n---\n📍 Marquei a **linha ${atual.ponto.linha}** no editor (ponto ${atual.numero} de ${atual.total}). Quando achar que corrigiu, clique em **✅ Já corrigi** em cima da linha.`);
                stream.button({ command: 'tutorSocratico.irParaPonto', title: '📍 Ir para a linha', arguments: [documento.uri] });
                stream.button({ command: 'tutorSocratico.proximoPonto', title: '✅ Já corrigi, conferir', arguments: [documento.uri] });
            }
        }
    }
    return { metadata: { comando: request.command, jogo: noJogo } };
}

let saidaDeDepuracao: vscode.OutputChannel | undefined;

/**
 * Guarda na saída "Tutor Socrático: depuração" os blocos escondidos de cada
 * resposta, para conferir quando uma marcação ou o diário não funcionarem.
 */
function registrarDepuracao(comando: string | undefined, bruto: string | undefined) {
    saidaDeDepuracao ??= vscode.window.createOutputChannel('Tutor Socrático: depuração');
    saidaDeDepuracao.appendLine(`[${new Date().toLocaleTimeString()}] /${comando ?? '(pergunta)'}: ${bruto ? 'blocos escondidos:' : 'sem blocos escondidos'}`);
    if (bruto) {
        saidaDeDepuracao.appendLine(bruto.trim());
    }
}

/** A permissão para usar a IA foi recusada: explica e mostra o botão que libera. */
function explicarPermissao(stream: vscode.ChatResponseStream) {
    stream.markdown([
        '🔒 **O tutor ainda não tem permissão para usar a IA.**',
        '',
        'Quando o VS Code perguntou se o *Muri-Muri Socratico* podia usar os modelos de linguagem, a resposta foi "Não permitir". Sem essa permissão, eu não consigo responder.',
        '',
        'Clique no botão abaixo, **marque "Muri-Muri Socratico"** na lista e confirme com **OK**. Depois, é só perguntar de novo.',
    ].join('\n'));
    stream.button({ command: 'tutorSocratico.liberarIa', title: '🔓 Liberar a IA para o tutor' });
    stream.button({ command: 'tutorSocratico.abrirGuia', title: '📘 Ver o passo a passo' });
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
    if (resultado.metadata?.jogo) {
        return [
            { prompt: 'Ainda não entendi, pode me dar outra pista?', label: 'Outra pista', command: 'pista' },
            { prompt: 'Vou parar por agora. Salve onde eu parei e qual é o próximo passo.', label: '💾 Salvar onde parei', command: 'salvar' },
        ];
    }
    return [
        { prompt: 'Ainda não entendi, pode me dar outra pista?', label: 'Outra pista', command: 'pista' },
        { prompt: 'Qual videoaula explica esse assunto?', label: 'Qual vídeo assistir?', command: 'video' },
    ];
}

function mensagemDeErro(erro: unknown): string {
    if (erro instanceof vscode.LanguageModelError) {
        if (erro.code === vscode.LanguageModelError.NoPermissions().code) {
            return '⚠️ O tutor precisa da sua permissão para usar a IA do Copilot.';
        }
        if (erro.code === vscode.LanguageModelError.NotFound().code) {
            return '⚠️ O modelo de IA escolhido não está disponível. No chat, clique no nome do modelo (embaixo da caixa de mensagem) e escolha outro, como **Auto**. Se não aparecer nenhum, entre na sua conta do GitHub para ativar o Copilot.';
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
        // Aviso de cabeçalho/enunciado na linha 1: oferece inserir o que falta.
        if (contexto.diagnostics.some(d => d.source === FONTE_QUALIDADE && d.range.start.line === 0 && !d.message.includes('Indentação'))) {
            const codigo = documento.getText();
            const titulo = temCabecalhoDoxygen(codigo) ? '📝 Inserir o enunciado abaixo do cabeçalho' : '📝 Inserir cabeçalho Doxygen (e o enunciado)';
            if (!temCabecalhoDoxygen(codigo) || !temEnunciadoNoComentario(codigo)) {
                const inserir = new vscode.CodeAction(titulo, vscode.CodeActionKind.QuickFix);
                inserir.command = { command: 'tutorSocratico.inserirCabecalho', title: titulo, arguments: [documento.uri] };
                inserir.isPreferred = true;
                acoes.push(inserir);
            }
        }
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
    if (aula > 100) {
        // Material da raylib: não tem videoaula.
        return `Raylib ${aula - 100}`;
    }
    const rotulo = `Aula ${String(aula).padStart(2, '0')}`;
    const video = catalogo.videos.get(aula);
    return video ? { value: rotulo, target: vscode.Uri.parse(video) } : rotulo;
}

function analisarDocumento(documento: vscode.TextDocument) {
    const ativo = vscode.workspace.getConfiguration('tutorSocratico').get<boolean>('dicasOffline', true);
    if (documento.languageId === 'makefile' && ativo) {
        diagnosticosDicas.set(documento.uri, verificarMakefile(documento.getText()).map(p => {
            const diagnostico = new vscode.Diagnostic(new vscode.Range(p.linha - 1, 0, p.linha - 1, p.espacos), '🎓 ' + p.mensagem, vscode.DiagnosticSeverity.Warning);
            diagnostico.source = 'Tutor Socrático';
            diagnostico.code = codigoDaAula(107);
            return diagnostico;
        }));
        return;
    }
    if (documento.languageId !== 'c' || !ativo) {
        diagnosticosDicas.delete(documento.uri);
        return;
    }
    const codigo = documento.getText();
    const dicas = analisarCodigo(codigo).map(dica => ({ ...dica, fonte: 'Tutor Socrático' }));
    if (vscode.workspace.getConfiguration('tutorSocratico').get<boolean>('dicasDeQualidade', true)) {
        // Cabeçalho Doxygen (Aula 16) e indentação (Aula 06), pedidos na disciplina.
        dicas.push(...verificarQualidade(codigo, limparCodigo(codigo))
            .map(p => ({ ...p, aula: p.regra === 'indentacao' ? 6 : 16, fonte: FONTE_QUALIDADE })));
    }
    diagnosticosDicas.set(documento.uri, dicas.map(dica => {
        const linha = Math.min(dica.linha - 1, documento.lineCount - 1);
        const inicio = Math.max(0, dica.coluna - 1);
        const diagnostico = new vscode.Diagnostic(
            new vscode.Range(linha, inicio, linha, Math.min(inicio + dica.comprimento, documento.lineAt(linha).range.end.character)),
            '🎓 ' + dica.mensagem,
            vscode.DiagnosticSeverity.Information,
        );
        diagnostico.source = dica.fonte;
        diagnostico.code = codigoDaAula(dica.aula);
        return diagnostico;
    }));
}

const FONTE_QUALIDADE = 'Tutor Socrático · qualidade';

const atrasos = new Map<string, NodeJS.Timeout>();

function analisarComAtraso(documento: vscode.TextDocument) {
    if (documento.languageId !== 'c' && documento.languageId !== 'makefile') {
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
    if (!perguntar || exercicios.jaPerguntado(uri) || perguntasAbertas.has(uri.toString()) || emProjetoDeJogo(uri)) {
        return;
    }
    perguntasAbertas.add(uri.toString());
    await exercicios.marcarPerguntado(uri);

    const resposta = await vscode.window.showInformationMessage(
        `Vai resolver um exercício em "${path.basename(uri.fsPath)}"? Cole o enunciado no painel 🎓 e o tutor confere se o programa faz o que foi pedido. Sem enunciado, ele tenta descobrir pelo seu código.`,
        'Colar o enunciado',
        'Agora não',
        'Não perguntar mais',
    );
    perguntasAbertas.delete(uri.toString());

    if (resposta === 'Colar o enunciado') {
        await informarExercicio(undefined);
    } else if (resposta === 'Não perguntar mais') {
        await vscode.workspace.getConfiguration('tutorSocratico').update('perguntarExercicio', false, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage('Tudo bem. Você ainda pode colar o enunciado quando quiser no painel 🎓 Tutor Socrático, na barra lateral.');
    }
}

/**
 * Exercício do arquivo: o enunciado colado pelo aluno ou, sem ele, o
 * comentário do início do arquivo. Sem nenhum dos dois, o tutor deduz pelo código.
 */
function exercicioDoArquivo(documento: vscode.TextDocument): { texto?: string; id?: string; origem: 'aluno' | 'comentario' | 'codigo' } {
    const enunciado = exercicios.enunciado(documento.uri);
    if (enunciado) {
        return { texto: enunciado, id: exercicios.exercicioId(documento.uri), origem: 'aluno' };
    }
    const comentario = comentarioInicial(documento.getText());
    if (comentario) {
        return { texto: comentario, id: reconhecerExercicio(comentario, catalogo.exercicios)?.id, origem: 'comentario' };
    }
    return { origem: 'codigo' };
}

/** Chamado pelo painel: grava o enunciado e reconhece o exercício da aula. */
async function salvarEnunciado(uri: vscode.Uri, texto: string) {
    const e = reconhecerExercicio(texto, catalogo.exercicios);
    await exercicios.salvarEnunciado(uri, texto, e && { id: e.id, casos: e.casosOficiais });
}

/** Abre o painel no enunciado; com um texto, grava-o direto como enunciado do arquivo aberto. */
async function informarExercicio(texto?: string) {
    const documento = documentoCAberto();
    if (typeof texto === 'string' && documento) {
        await salvarEnunciado(documento.uri, texto);
        return;
    }
    await vscode.commands.executeCommand(`${ID_PAINEL}.focus`);
    painel.focarEnunciado();
}

/** Botão ao lado do "Executar": salva, verifica com o GCC e pede a revisão ao tutor. */
/** Verificação só da qualidade (nomes, comentários, Doxygen, indentação), com nota de 0 a 1000. */
async function verificarQualidadeDoCodigo(uri?: vscode.Uri) {
    const documento = uri instanceof vscode.Uri
        ? vscode.workspace.textDocuments.find(d => d.uri.toString() === uri.toString())
        : documentoCAberto();
    if (!documento || documento.languageId !== 'c') {
        vscode.window.showInformationMessage('Abra um arquivo .c para o tutor avaliar a qualidade.');
        return;
    }
    if (documento.isDirty) {
        await documento.save();
    }
    analisarDocumento(documento);
    const feitos = marcacoes.doArquivo(documento.uri)?.feitos.length ?? 0;
    await abrirChat(feitos > 0
        ? `@tutor /qualidade Fiz ${feitos === 1 ? 'o ponto' : `os ${feitos} pontos`} de qualidade. Confira se ficou certo e me dê a nota nova.`
        : '@tutor /qualidade Avalie a qualidade do meu código e me diga o que melhorar.', false);
}

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

    const temExercicio = exercicioDoArquivo(documento).origem !== 'codigo';
    const pedido = temExercicio
        ? 'Terminei (ou travei). Verifique meu código em relação ao exercício.'
        : 'Terminei (ou travei). Verifique meu código.';
    await abrirChat(`@tutor /verificar ${pedido}`, false);
}

// ---------------------------------------------------------------------------
// Projeto final com a raylib: compilar e rodar o jogo
// ---------------------------------------------------------------------------

/** Argumentos extras do GCC (ex.: -I e -L da raylib instalada em outra pasta). */
function argumentosGcc(): string[] {
    return vscode.workspace.getConfiguration('tutorSocratico').get<string[]>('argumentosGcc', []).filter(a => typeof a === 'string' && a.trim());
}

let saidaDoJogo: vscode.OutputChannel | undefined;
let jogoRodando: ChildProcess | undefined;

/**
 * Compila o jogo ligando a raylib e o executa na pasta do arquivo (onde ficam
 * as imagens e os sons). Junta os outros .c da pasta que não têm main, para
 * projetos divididos em vários arquivos.
 */
async function rodarJogo(uri?: vscode.Uri) {
    const documento = uri instanceof vscode.Uri
        ? vscode.workspace.textDocuments.find(d => d.uri.toString() === uri.toString())
        : documentoCAberto();
    if (!documento || documento.languageId !== 'c' || documento.uri.scheme !== 'file') {
        vscode.window.showInformationMessage('Abra o arquivo .c do jogo para compilar e rodar.');
        return;
    }
    if (!vscode.workspace.isTrusted) {
        avisarModoRestrito();
        return;
    }
    await vscode.workspace.saveAll(false);
    const pasta = path.dirname(documento.fileName);
    const outros = fs.readdirSync(pasta)
        .filter(nome => nome.toLowerCase().endsWith('.c') && path.join(pasta, nome).toLowerCase() !== documento.fileName.toLowerCase())
        .map(nome => path.join(pasta, nome))
        .filter(caminho => !/\bmain\s*\(/.test(limparCodigo(fs.readFileSync(caminho, 'utf8'))));
    const nome = path.basename(documento.fileName, '.c');
    const executavel = path.join(pasta, process.platform === 'win32' ? nome + '.exe' : nome);

    saidaDoJogo ??= vscode.window.createOutputChannel('Tutor Socrático: jogo');
    saidaDoJogo.clear();
    // Um jogo ainda aberto impede de gravar o .exe novo.
    if (jogoRodando && jogoRodando.exitCode === null) {
        jogoRodando.kill();
    }
    const configuracao = vscode.workspace.getConfiguration('tutorSocratico');
    const caminhoGcc = configuracao.get<string>('caminhoGcc', 'gcc');
    const configuradas = configuracao.get<string[]>('bibliotecasRaylib', []).filter(b => typeof b === 'string' && b.trim());
    const bibliotecas = configuradas.length > 0 ? configuradas : bibliotecasPadraoDaRaylib();
    const arquivos = [documento.fileName, ...outros];
    saidaDoJogo.appendLine(`🎮 Compilando: ${arquivos.map(a => path.basename(a)).join(', ')}`);
    saidaDoJogo.appendLine(`   gcc ... -o ${path.basename(executavel)} ${bibliotecas.join(' ')}`);

    let resultado;
    try {
        resultado = await vscode.window.withProgress(
            { location: vscode.ProgressLocation.Window, title: '🎮 Compilando o jogo...' },
            () => compilarJogo(caminhoGcc, arquivos, executavel, argumentosGcc(), bibliotecas));
    } catch (erro) {
        vscode.window.showWarningMessage(erro instanceof Error ? erro.message : String(erro));
        return;
    }
    if (resultado.saida.trim()) {
        saidaDoJogo.appendLine(resultado.saida.trimEnd());
    }
    if (!resultado.compilou) {
        saidaDoJogo.show(true);
        const escolha = await vscode.window.showErrorMessage(
            `O jogo não compilou. ${resultado.explicacao ?? 'Veja os erros na aba Problemas e na saída "Tutor Socrático: jogo".'}`,
            'Pedir uma pista', 'Instalar a raylib');
        if (escolha === 'Pedir uma pista') {
            await abrirChat(`@tutor /erro Meu jogo com a raylib não compilou: ${primeiraLinhaDeErro(resultado.saida)}`, false);
        } else if (escolha === 'Instalar a raylib') {
            await prontidao.abrirGuia('raylib');
        }
        await verificarDocumento(documento, false);
        return;
    }
    saidaDoJogo.appendLine('▶ Rodando o jogo. O que ele escrever com printf aparece aqui.');
    const processo = spawn(executavel, [], { cwd: pasta });
    jogoRodando = processo;
    processo.stdout?.on('data', dados => saidaDoJogo?.append(String(dados)));
    processo.stderr?.on('data', dados => saidaDoJogo?.append(String(dados)));
    processo.on('error', erro => saidaDoJogo?.appendLine(`Não consegui executar o jogo: ${erro.message}`));
    processo.on('exit', codigo => saidaDoJogo?.appendLine(`■ O jogo terminou (código ${codigo ?? '?'}).`));
}

/** O arquivo é do projeto do jogo: usa a raylib ou a pasta já tem um projeto começado. */
function emProjetoDeJogo(uri: vscode.Uri): boolean {
    if (projetos.doArquivo(uri)) {
        return true;
    }
    const documento = vscode.workspace.textDocuments.find(d => d.uri.toString() === uri.toString());
    return !!documento && INCLUI_RAYLIB.test(documento.getText());
}

/** Abre o projeto-do-jogo.md da pasta (criando, se ainda não existir). */
async function abrirDiario(uri?: vscode.Uri) {
    const alvo = uri instanceof vscode.Uri ? uri : documentoCAberto()?.uri;
    if (!alvo) {
        vscode.window.showInformationMessage('Abra um arquivo .c na pasta do seu jogo.');
        return;
    }
    await projetos.comecar(alvo);
    await vscode.window.showTextDocument(vscode.Uri.file(projetos.caminhoDoDiario(alvo)), { preview: false, viewColumn: vscode.ViewColumn.Beside });
}

/** Começa o projeto do jogo na pasta do arquivo: o painel passa a mostrar "Meu jogo". */
async function comecarJogo(uri?: vscode.Uri) {
    const alvo = uri instanceof vscode.Uri ? uri : documentoCAberto()?.uri;
    if (!alvo) {
        vscode.window.showInformationMessage('Abra um arquivo .c na pasta do seu jogo para começar o projeto.');
        return;
    }
    await projetos.comecar(alvo);
    await vscode.commands.executeCommand(`${ID_PAINEL}.focus`);
}

const NOMES_DO_MAKEFILE = ['Makefile', 'makefile', 'GNUmakefile'];

function acharMakefile(pasta: string): string | undefined {
    return NOMES_DO_MAKEFILE.map(nome => path.join(pasta, nome)).find(caminho => fs.existsSync(caminho));
}

/** O Makefile aberto no editor ou, se não houver, o da pasta do arquivo .c. */
function makefileDoProjeto(documento?: vscode.TextDocument): { nome: string; texto: string } | undefined {
    const ativo = vscode.window.activeTextEditor?.document;
    if (ativo && ativo.languageId === 'makefile') {
        return { nome: path.basename(ativo.fileName), texto: ativo.getText() };
    }
    const caminho = documento && documento.uri.scheme === 'file' ? acharMakefile(path.dirname(documento.fileName)) : undefined;
    if (!caminho) {
        return undefined;
    }
    const aberto = vscode.workspace.textDocuments.find(d => d.fileName.toLowerCase() === caminho.toLowerCase());
    try {
        return { nome: path.basename(caminho), texto: aberto ? aberto.getText() : fs.readFileSync(caminho, 'utf8') };
    } catch {
        return undefined;
    }
}

/** Lâmpada no Makefile: troca os espaços do começo da linha por um TAB. */
function trocarEspacosPorTab(documento: vscode.TextDocument, _intervalo: vscode.Range, contexto: vscode.CodeActionContext): vscode.CodeAction[] {
    return contexto.diagnostics
        .filter(d => d.source === 'Tutor Socrático' && d.message.includes('TAB'))
        .map(d => {
            const acao = new vscode.CodeAction('↹ Trocar os espaços do começo da linha por TAB', vscode.CodeActionKind.QuickFix);
            acao.diagnostics = [d];
            acao.isPreferred = true;
            acao.edit = new vscode.WorkspaceEdit();
            acao.edit.replace(documento.uri, new vscode.Range(d.range.start.line, 0, d.range.start.line, d.range.end.character), '\t');
            return acao;
        });
}

let comandoMakeAutomatico: string | undefined;

/** No Windows, o make do MSYS2/MinGW se chama mingw32-make. */
async function comandoMake(): Promise<string> {
    const configurado = vscode.workspace.getConfiguration('tutorSocratico').get<string>('comandoMake', '').trim();
    if (configurado) {
        return configurado;
    }
    if (comandoMakeAutomatico === undefined) {
        const existe = (comando: string) => new Promise<boolean>(resolve =>
            execFile(comando, ['--version'], { timeout: 8000, windowsHide: true }, erro => resolve(!erro)));
        comandoMakeAutomatico = process.platform === 'win32' && await existe('mingw32-make') ? 'mingw32-make' : 'make';
    }
    return comandoMakeAutomatico;
}

let terminalDoMake: vscode.Terminal | undefined;
let pastaDoTerminal: string | undefined;

/**
 * Compila pelo Makefile do projeto num terminal do VS Code, como o aluno faria
 * à mão: assim ele vê os comandos que o make executa.
 */
async function compilarComMake(uri?: vscode.Uri) {
    const documento = uri instanceof vscode.Uri
        ? vscode.workspace.textDocuments.find(d => d.uri.toString() === uri.toString())
        : vscode.window.activeTextEditor?.document;
    const pasta = documento && documento.uri.scheme === 'file' ? path.dirname(documento.fileName) : undefined;
    if (!pasta || !acharMakefile(pasta)) {
        const escolha = await vscode.window.showInformationMessage(
            'Não há um Makefile na pasta deste arquivo. Quer ajuda do tutor para montar o seu?', 'Como fazer o Makefile');
        if (escolha) {
            await vscode.commands.executeCommand('tutorSocratico.ajudaMakefile');
        }
        return;
    }
    if (!vscode.workspace.isTrusted) {
        avisarModoRestrito();
        return;
    }
    await vscode.workspace.saveAll(false);
    const comando = await comandoMake();
    if (!terminalDoMake || terminalDoMake.exitStatus !== undefined || pastaDoTerminal !== pasta) {
        terminalDoMake?.dispose();
        terminalDoMake = vscode.window.createTerminal({ name: 'Tutor Socrático: make', cwd: pasta });
        pastaDoTerminal = pasta;
    }
    terminalDoMake.show();
    terminalDoMake.sendText(comando);
}

function primeiraLinhaDeErro(saida: string): string {
    return saida.split(/\r?\n/).find(l => /error|undefined reference|cannot find/i.test(l))?.trim().slice(0, 300) ?? 'erro ao compilar';
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
    if (!vscode.workspace.isTrusted) {
        painel.mostrarTestes(documento.uri, { erro: '🔒 Esta pasta está em modo restrito, então o tutor não compila nem executa programas. Clique em "Confiar nesta pasta" no aviso do topo do painel.' });
        avisarModoRestrito();
        return undefined;
    }
    if (INCLUI_RAYLIB.test(documento.getText())) {
        painel.mostrarTestes(documento.uri, { erro: '🎮 Este arquivo usa a raylib: os casos de teste não servem para jogos. Use "▶ Compilar e rodar o jogo" e teste jogando.' });
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

// ---------------------------------------------------------------------------
// Computadores da universidade: pendências, modo restrito e guia
// ---------------------------------------------------------------------------

async function avisarModoRestrito() {
    const escolha = await vscode.window.showWarningMessage(
        '🔒 Esta pasta está em modo restrito: o tutor conversa, mas não compila nem testa o programa. Se a pasta é dos seus exercícios, confie nela.',
        'Confiar nesta pasta');
    if (escolha) {
        await vscode.commands.executeCommand('workbench.trust.manage');
    }
}

/** Ao abrir o VS Code, avisa (uma vez) se algo impede o tutor de usar a IA. */
function avisarPendenciasAoIniciar() {
    // Espera o Copilot carregar os modelos antes de concluir que falta algo.
    setTimeout(async () => {
        await prontidao.conferir();
        const bloqueio = prontidao.bloqueioDaIa();
        if (!bloqueio) {
            return;
        }
        const escolha = await vscode.window.showWarningMessage(
            `🎓 O tutor ainda não consegue usar a IA: ${bloqueio.titulo.toLowerCase()}.`,
            bloqueio.botao ?? 'Resolver', 'Abrir o guia');
        if (escolha === 'Abrir o guia') {
            await prontidao.abrirGuia();
        } else if (escolha) {
            await prontidao.resolver(bloqueio.id);
        }
    }, 8000);
}

// ---------------------------------------------------------------------------
// Cabeçalho Doxygen e enunciado no comentário (qualidade do código)
// ---------------------------------------------------------------------------

/**
 * Coloca no início do arquivo o que falta: o cabeçalho Doxygen e, logo
 * abaixo, o enunciado (o do painel, se houver). Depois seleciona o \brief.
 */
async function inserirCabecalho(uri?: vscode.Uri, autorInformado?: string) {
    const alvo = uri instanceof vscode.Uri ? uri : documentoCAberto()?.uri;
    if (!alvo) {
        vscode.window.showInformationMessage('Abra um arquivo .c para inserir o cabeçalho.');
        return;
    }
    const editor = await vscode.window.showTextDocument(alvo);
    const documento = editor.document;
    const codigo = documento.getText();
    const temCabecalho = temCabecalhoDoxygen(codigo);
    const temEnunciado = temEnunciadoNoComentario(codigo);
    if (temCabecalho && temEnunciado) {
        vscode.window.showInformationMessage('Este arquivo já tem o cabeçalho Doxygen e o enunciado.');
        return;
    }
    let texto = '';
    let onde = new vscode.Position(0, 0);
    if (!temCabecalho) {
        let autor = autorInformado ?? contextoGlobal.globalState.get<string>('autor');
        if (autor === undefined) {
            autor = await vscode.window.showInputBox({ title: 'Cabeçalho Doxygen', prompt: 'Seu nome, para o campo \\author', placeHolder: 'Ex.: Maria Silva' });
            if (autor === undefined) {
                return;
            }
            await contextoGlobal.globalState.update('autor', autor);
        }
        texto = montarCabecalho({ arquivo: path.basename(documento.fileName), autor, data: new Date() }) + '\n';
    } else {
        // Já tem cabeçalho: o enunciado entra logo abaixo dele.
        const cabecalho = comentariosDoInicio(codigo).find(c => c.doxygen)!;
        onde = documento.positionAt(cabecalho.fim);
        texto = '\n\n';
    }
    if (!temEnunciado) {
        texto += montarComentarioDoEnunciado(exercicios.enunciado(alvo)) + '\n';
    }
    const fimDeLinha = documento.eol === vscode.EndOfLine.CRLF ? '\r\n' : '\n';
    if (temCabecalho) {
        texto = texto.replace(/\n$/, '');
    }
    await editor.edit(e => e.insert(onde, texto.replace(/\n/g, fimDeLinha)));
    const brief = editor.document.getText().indexOf(BRIEF_A_PREENCHER);
    if (brief >= 0) {
        const inicio = editor.document.positionAt(brief);
        editor.selection = new vscode.Selection(inicio, inicio.translate(0, BRIEF_A_PREENCHER.length));
        editor.revealRange(editor.selection);
    }
}

// ---------------------------------------------------------------------------
// Pontos marcados no editor (um por vez, do mais fácil ao mais difícil)
// ---------------------------------------------------------------------------

/** Arquivo do ponto: o que veio no botão ou o .c aberto. */
function arquivoDoPonto(uri?: vscode.Uri): vscode.Uri | undefined {
    return uri instanceof vscode.Uri ? uri : documentoCAberto()?.uri;
}

async function proximoPonto(uri?: vscode.Uri) {
    const alvo = arquivoDoPonto(uri);
    const atual = alvo && marcacoes.atual(alvo);
    if (!alvo || !atual) {
        vscode.window.showInformationMessage('Nenhum ponto marcado. Clique em "Verificar meu código" para o tutor revisar.');
        return;
    }
    if (atual.tipo === 'qualidade') {
        // Qualidade: passa para o próximo sem gastar a IA; o tutor confere tudo no fim.
        const faltam = marcacoes.marcarFeito(alvo);
        if (faltam > 0) {
            await marcacoes.irPara(alvo);
            return;
        }
        const escolha = await vscode.window.showInformationMessage(
            `✅ Você fez os ${atual.total} pontos de qualidade! Quer que o tutor confira tudo e dê a nota nova?`,
            'Conferir e ver a nota');
        if (escolha) {
            await verificarQualidadeDoCodigo(alvo);
        }
        return;
    }
    const documento = vscode.workspace.textDocuments.find(d => d.uri.toString() === alvo.toString());
    if (documento) {
        if (documento.isDirty) {
            await documento.save();
        }
        await verificarDocumento(documento, false);
    }
    await abrirChat(`@tutor /proximo Mexi no ponto da linha ${atual.ponto.linha}. Pode conferir se agora está certo?`, false);
}

async function pistaDoPonto(uri?: vscode.Uri) {
    const alvo = arquivoDoPonto(uri);
    const atual = alvo && marcacoes.atual(alvo);
    if (!atual) {
        await pedirPista();
        return;
    }
    await abrirChat(`@tutor /pista Não sei como resolver o ponto da linha ${atual.ponto.linha}. Pode me dar uma pista?`, false);
}

async function pistaSobreTeste(indice: number) {
    const numero = Number(indice) + 1;
    await abrirChat(`@tutor /teste O caso de teste ${numero} não passou. Não entendi por quê, pode me ajudar?`, false);
}

// ---------------------------------------------------------------------------
// Exercício reconhecido, quiz e comemoração
// ---------------------------------------------------------------------------

function infoDoExercicio(uri: vscode.Uri): InfoDoPainel {
    const documento = vscode.workspace.textDocuments.find(d => d.uri.toString() === uri.toString());
    const doArquivo = documento
        ? exercicioDoArquivo(documento)
        : { origem: exercicios.enunciado(uri) ? 'aluno' as const : 'codigo' as const, id: exercicios.exercicioId(uri) };
    const e = doArquivo.id ? catalogo.exercicios.find(x => x.id === doArquivo.id) : undefined;
    return {
        rotulo: e ? `Aula ${String(e.aula).padStart(2, '0')} – ${e.tituloAula}, exercício ${e.numero}` : undefined,
        origem: doArquivo.origem,
        casosDoProfessor: exercicios.casosDoProfessor(uri),
        ajudas: exercicios.ajudas(uri),
        ponto: pontoDoPainel(uri),
        nota: notaDoPainel(uri),
        raylib: documento ? INCLUI_RAYLIB.test(documento.getText()) : false,
        makefile: !!acharMakefile(path.dirname(uri.fsPath)),
        qualidadeParaConferir: marcacoes.esperandoConferencia(uri)?.length,
        semCabecalho: documento ? !temCabecalhoDoxygen(documento.getText()) || !temEnunciadoNoComentario(documento.getText()) : false,
    };
}

function pontoDoPainel(uri: vscode.Uri): InfoDoPainel['ponto'] {
    const atual = marcacoes.atual(uri);
    return atual && { numero: atual.numero, total: atual.total, linha: atual.ponto.linha, pergunta: atual.ponto.pergunta, tipo: atual.tipo };
}

function notaDoPainel(uri: vscode.Uri): InfoDoPainel['nota'] {
    const notas = exercicios.notasDeQualidade(uri);
    return notas.length > 0 ? { atual: notas[notas.length - 1], anterior: notas.length > 1 ? notas[notas.length - 2] : undefined } : undefined;
}

async function quizDaAula() {
    const documento = documentoCAberto();
    let aula = documento ? aulaDoExercicio(exercicioDoArquivo(documento).id) : undefined;
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
    const explicar = 'Explicar meu código ao tutor';
    const quiz = 'Fazer o quiz da aula';
    const resposta = await vscode.window.showInformationMessage('🎉 Todos os testes passaram!', explicar, quiz);
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
    if (!vscode.workspace.isTrusted) {
        // Modo restrito: o VS Code pede para não executar programas da pasta.
        if (manual) {
            avisarModoRestrito();
        }
        return;
    }
    const caminhoGcc = vscode.workspace.getConfiguration('tutorSocratico').get<string>('caminhoGcc', 'gcc');
    try {
        const problemas = await verificarComGcc(caminhoGcc, documento.fileName, argumentosGcc());
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
