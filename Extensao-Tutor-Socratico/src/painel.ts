// Painel "Exercício" na barra lateral do Tutor Socrático. Na tela principal
// ficam só o enunciado e o botão de verificar; os casos de teste, as outras
// ajudas e as opções ficam em seções que o aluno abre quando quiser.
import * as vscode from 'vscode';
import { Exercicios } from './exercicios';
import { CasoDeTeste, ResultadoDosTestes } from './testes';

export const ID_PAINEL = 'tutorSocratico.exercicio';

type MensagemDoPainel =
    | { tipo: 'pronto' }
    | { tipo: 'salvar'; texto: string; uri?: string }
    | { tipo: 'salvarCasos'; casos: CasoDeTeste[]; uri?: string }
    | { tipo: 'rodarTestes' }
    | { tipo: 'pistaTeste'; indice: number }
    | { tipo: 'verificar' }
    | { tipo: 'modoAprendizado' }
    | { tipo: 'comando'; comando: string };

// Botões do painel que só disparam um comando da extensão.
const COMANDOS_DO_PAINEL = new Set([
    'tutorSocratico.perguntar', 'tutorSocratico.pedirPista', 'tutorSocratico.depurar',
    'tutorSocratico.explicarCodigo', 'tutorSocratico.quiz',
    'tutorSocratico.irParaPonto', 'tutorSocratico.proximoPonto', 'tutorSocratico.pistaDoPonto',
]);

export interface InfoDoPainel {
    // Exercício da aula reconhecido no enunciado (ex.: "Aula 11 – Vetores, exercício 4").
    rotulo?: string;
    // De onde vem o enunciado: colado no painel, comentário do arquivo ou nenhum.
    origem: 'aluno' | 'comentario' | 'codigo';
    casosDoProfessor: boolean;
    ajudas: number;
    // Ponto que o tutor marcou no editor e o aluno está resolvendo agora.
    ponto?: { numero: number; total: number; linha: number; pergunta: string };
}

export class PainelExercicio implements vscode.WebviewViewProvider {
    private visao?: vscode.WebviewView;
    private arquivoAtual?: vscode.Uri;
    private focarAoAbrir = false;
    private atraso?: NodeJS.Timeout;

    constructor(
        private readonly exercicios: Exercicios,
        private readonly salvarEnunciado: (uri: vscode.Uri, texto: string) => Promise<void>,
        private readonly modoAprendizadoLigado: () => boolean,
        private readonly ultimosResultados: (uri: vscode.Uri) => ResultadoDosTestes | undefined,
        private readonly info: (uri: vscode.Uri) => InfoDoPainel,
    ) {}

    resolveWebviewView(visao: vscode.WebviewView) {
        this.visao = visao;
        visao.webview.options = { enableScripts: true };
        visao.webview.html = htmlDoPainel(gerarNonce());
        visao.webview.onDidReceiveMessage((mensagem: MensagemDoPainel) => this.receber(mensagem));
        visao.onDidChangeVisibility(() => visao.visible && this.atualizar());
    }

    get arquivo(): vscode.Uri | undefined {
        return this.arquivoAtual;
    }

    /** Chamado quando o editor ativo, o exercício ou o modo aprendizado mudam. */
    atualizar(editor = vscode.window.activeTextEditor) {
        if (editor && editor.document.languageId === 'c' && editor.document.uri.scheme === 'file') {
            this.arquivoAtual = editor.document.uri;
        } else if (editor) {
            // Outro tipo de arquivo em foco: mantém o último .c, se ainda estiver aberto.
            const aberto = this.arquivoAtual && vscode.workspace.textDocuments.some(d => d.uri.toString() === this.arquivoAtual!.toString());
            if (!aberto) {
                this.arquivoAtual = undefined;
            }
        }
        const uri = this.arquivoAtual;
        this.visao?.webview.postMessage({
            tipo: 'estado',
            uri: uri?.toString(),
            arquivo: uri ? vscode.workspace.asRelativePath(uri) : undefined,
            enunciado: uri ? this.exercicios.enunciado(uri) ?? '' : '',
            casos: uri ? this.exercicios.casos(uri) : [],
            resultados: uri ? this.ultimosResultados(uri) : undefined,
            info: uri ? this.info(uri) : undefined,
            modoAprendizado: this.modoAprendizadoLigado(),
        });
    }

    /** Atualiza depois de uma pausa na digitação (o comentário do arquivo pode ter mudado). */
    atualizarComAtraso() {
        clearTimeout(this.atraso);
        this.atraso = setTimeout(() => this.atualizar(), 800);
    }

    /** Mostra que os testes estão rodando ou os resultados deles. */
    mostrarTestes(uri: vscode.Uri, resultados: ResultadoDosTestes | 'rodando' | { erro: string }) {
        if (this.arquivoAtual?.toString() === uri.toString()) {
            this.visao?.webview.postMessage({ tipo: 'resultados', resultados });
        }
    }

    /** Coloca o cursor na caixa do enunciado (assim que o painel estiver pronto). */
    focarEnunciado() {
        if (this.visao?.visible) {
            this.atualizar();
            this.visao.webview.postMessage({ tipo: 'focar' });
        } else {
            this.focarAoAbrir = true;
        }
    }

    private async receber(mensagem: MensagemDoPainel) {
        // Mensagens de edição dizem a qual arquivo pertencem: um salvamento que
        // chega depois de o aluno trocar de arquivo não pode cair no arquivo novo.
        const uri = 'uri' in mensagem && mensagem.uri ? vscode.Uri.parse(mensagem.uri) : this.arquivoAtual;
        switch (mensagem.tipo) {
            case 'pronto':
                this.atualizar();
                if (this.focarAoAbrir) {
                    this.focarAoAbrir = false;
                    this.visao?.webview.postMessage({ tipo: 'focar' });
                }
                return;
            case 'salvar':
                if (uri) {
                    await this.salvarEnunciado(uri, mensagem.texto);
                }
                return;
            case 'salvarCasos':
                if (uri) {
                    await this.exercicios.salvarCasos(uri, mensagem.casos);
                }
                return;
            case 'rodarTestes':
                await vscode.commands.executeCommand('tutorSocratico.rodarTestes', uri);
                return;
            case 'pistaTeste':
                await vscode.commands.executeCommand('tutorSocratico.pistaSobreTeste', mensagem.indice);
                return;
            case 'verificar':
                await vscode.commands.executeCommand('tutorSocratico.verificarCodigo', uri);
                return;
            case 'modoAprendizado':
                await vscode.commands.executeCommand('tutorSocratico.alternarModoAprendizado');
                return;
            case 'comando':
                if (COMANDOS_DO_PAINEL.has(mensagem.comando)) {
                    // Os botões do ponto marcado valem para o arquivo mostrado no painel.
                    const doPonto = mensagem.comando.endsWith('Ponto');
                    await vscode.commands.executeCommand(mensagem.comando, ...(doPonto && uri ? [uri] : []));
                }
                return;
        }
    }
}

function gerarNonce(): string {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 32 }, () => letras[Math.floor(Math.random() * letras.length)]).join('');
}

function htmlDoPainel(nonce: string): string {
    return /* html */ `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: var(--vscode-font-family); font-size: var(--vscode-font-size); color: var(--vscode-foreground); padding: 4px 12px 12px; }
  .titulo { display: block; font-weight: 600; margin: 10px 0 6px; }
  .arquivo { font-size: 12px; color: var(--vscode-descriptionForeground); word-break: break-all; margin-top: 8px; }
  .dica { color: var(--vscode-descriptionForeground); font-size: 12px; margin: 4px 0 8px; }
  textarea { width: 100%; box-sizing: border-box; resize: vertical; font-family: var(--vscode-editor-font-family, monospace); font-size: var(--vscode-font-size);
             color: var(--vscode-input-foreground); background: var(--vscode-input-background); border: 1px solid var(--vscode-input-border, transparent); padding: 6px; }
  #enunciado { min-height: 110px; font-family: var(--vscode-font-family); }
  textarea:focus { outline: 1px solid var(--vscode-focusBorder); }
  button { width: 100%; margin-top: 6px; padding: 6px; border: none; cursor: pointer; font-family: inherit; font-size: inherit;
           color: var(--vscode-button-foreground); background: var(--vscode-button-background); }
  button:hover { background: var(--vscode-button-hoverBackground); }
  button:disabled { opacity: .6; cursor: default; }
  button.secundario { color: var(--vscode-button-secondaryForeground); background: var(--vscode-button-secondaryBackground); }
  button.secundario:hover { background: var(--vscode-button-secondaryHoverBackground); }
  #verificar { margin-top: 10px; padding: 9px 6px; font-weight: 600; }
  .link { background: none; color: var(--vscode-textLink-foreground); padding: 2px 0; text-align: left; width: auto; margin-top: 2px; }
  .link:hover { background: none; text-decoration: underline; }
  .status { min-height: 1.2em; color: var(--vscode-descriptionForeground); font-size: 12px; margin-top: 2px; }
  .origem { font-size: 12px; margin: 4px 0 0; padding: 4px 6px; border-left: 3px solid var(--vscode-textLink-foreground); background: var(--vscode-textCodeBlock-background); }
  .origem:empty { display: none; }
  .oculto { display: none; }
  .ponto { margin-top: 10px; padding: 8px; border-left: 3px solid #f0b400; background: var(--vscode-textCodeBlock-background); }
  .ponto-titulo { font-weight: 600; }
  .ponto-pergunta { margin: 4px 0 2px; }
  .ponto button { margin-top: 6px; }

  /* Seções que o aluno abre quando precisa */
  details { border-top: 1px solid var(--vscode-panel-border, #8884); margin-top: 14px; }
  details:first-of-type { margin-top: 18px; }
  summary { list-style: none; cursor: pointer; padding: 8px 0; font-weight: 600; display: flex; align-items: center; gap: 6px; user-select: none; }
  summary::-webkit-details-marker { display: none; }
  summary::before { content: '›'; display: inline-block; width: 10px; transition: transform .1s; color: var(--vscode-descriptionForeground); }
  details[open] > summary::before { transform: rotate(90deg); }
  summary:focus-visible { outline: 1px solid var(--vscode-focusBorder); }
  .selo { margin-left: auto; font-weight: normal; font-size: 12px; color: var(--vscode-descriptionForeground); }
  .conteudo { padding: 0 0 6px 16px; }

  /* Botões das ajudas: título e uma linha explicando */
  .opcao { display: block; text-align: left; padding: 6px 8px; color: var(--vscode-foreground); background: none; border: 1px solid var(--vscode-panel-border, #8884); }
  .opcao:hover { background: var(--vscode-list-hoverBackground); }
  .opcao small { display: block; color: var(--vscode-descriptionForeground); font-size: 11px; margin-top: 2px; }

  .caso { border: 1px solid var(--vscode-panel-border, var(--vscode-input-border, #8884)); padding: 6px 8px 8px; margin-bottom: 8px; }
  .caso-topo { display: flex; justify-content: space-between; align-items: center; font-weight: 600; }
  .caso label { display: block; font-size: 12px; color: var(--vscode-descriptionForeground); margin: 6px 0 2px; }
  .caso textarea { min-height: 44px; }
  .remover { width: auto; margin: 0; padding: 0 4px; background: none; color: var(--vscode-descriptionForeground); }
  .remover:hover { background: none; color: var(--vscode-errorForeground); }
  .resultado { margin-top: 6px; font-size: 12px; }
  .passou { color: var(--vscode-testing-iconPassed, #3fb950); }
  .falhou { color: var(--vscode-testing-iconFailed, #f85149); }
  pre { white-space: pre-wrap; word-break: break-word; background: var(--vscode-textCodeBlock-background); padding: 4px 6px; margin: 4px 0; max-height: 160px; overflow: auto; }
  .resumo { font-weight: 600; margin-top: 8px; }
  .linha-botoes { display: flex; gap: 6px; }
  .linha-botoes button { flex: 1; }
  .previsao-certa { color: var(--vscode-testing-iconPassed, #3fb950); }
  .previsao-errada { color: var(--vscode-editorWarning-foreground, #cca700); }
</style>
</head>
<body>
  <div id="semArquivo">
    <p class="dica">Abra ou crie um arquivo <b>.c</b> para usar o tutor.</p>
  </div>

  <div id="comArquivo" class="oculto">
    <div class="arquivo" id="arquivo"></div>

    <label class="titulo" for="enunciado">Exercício</label>
    <textarea id="enunciado" placeholder="Cole aqui o enunciado do exercício (opcional)."></textarea>
    <div class="status" id="status"></div>
    <div class="origem" id="origem"></div>

    <button id="verificar">🎓 Verificar meu código</button>
    <p class="dica">O tutor aponta onde olhar e faz perguntas, sem entregar a resposta.</p>

    <div class="ponto oculto" id="ponto">
      <div class="ponto-titulo" id="pontoTitulo"></div>
      <div class="ponto-pergunta" id="pontoPergunta"></div>
      <div class="linha-botoes">
        <button class="secundario" data-comando="tutorSocratico.irParaPonto">📍 Ir para a linha</button>
        <button data-comando="tutorSocratico.proximoPonto">✅ Já corrigi</button>
      </div>
      <button class="link" data-comando="tutorSocratico.pistaDoPonto">💡 Pedir uma pista sobre este ponto</button>
    </div>

    <details id="secTestes">
      <summary>🧪 Testar meu programa <span class="selo" id="seloTestes"></span></summary>
      <div class="conteudo">
        <p class="dica">Escreva o que você digitaria no programa (<b>Entrada</b>) e o que ele deveria mostrar (<b>Saída esperada</b>). Mensagens como "Digite a nota:" são ignoradas.</p>
        <p class="dica" id="dicaProfessor"></p>
        <div id="casos"></div>
        <div class="linha-botoes">
          <button class="secundario" id="adicionarCaso">+ Caso de teste</button>
          <button id="rodarTestes">▶ Rodar testes</button>
        </div>
        <div id="resumoTestes"></div>
      </div>
    </details>

    <details id="secAjuda">
      <summary>💬 Mais ajuda do tutor <span class="selo" id="seloAjuda"></span></summary>
      <div class="conteudo">
        <button class="opcao" data-comando="tutorSocratico.perguntar">💬 Perguntar ao tutor<small>Escreva sua dúvida no chat.</small></button>
        <button class="opcao" data-comando="tutorSocratico.pedirPista">💡 Pedir uma pista<small>Uma dica pequena para destravar.</small></button>
        <button class="opcao" data-comando="tutorSocratico.depurar">🐞 Depurar<small>Aprenda a achar o erro com o depurador ou printf.</small></button>
        <button class="opcao" data-comando="tutorSocratico.explicarCodigo">🗣️ Explicar meu código<small>Depois que funcionar: explique com suas palavras.</small></button>
        <button class="opcao" data-comando="tutorSocratico.quiz">❓ Quiz da aula<small>3 perguntas rápidas de revisão.</small></button>
        <p class="dica" id="ajudas"></p>
      </div>
    </details>
  </div>

  <details id="secOpcoes">
    <summary>⚙️ Opções</summary>
    <div class="conteudo">
      <p class="dica" id="textoModo"></p>
      <button class="secundario" id="modo"></button>
    </div>
  </details>

<script nonce="${nonce}">
  const vscode = acquireVsCodeApi();
  const $ = id => document.getElementById(id);
  const QUEBRA = String.fromCharCode(10);
  let temporizador, temporizadorCasos, envioDeCasosPendente;
  let casos = [];
  let uriAtual;
  let resultados;

  // Lembra quais seções o aluno deixou abertas.
  const SECOES = ['secTestes', 'secAjuda', 'secOpcoes'];
  const salvo = vscode.getState() || {};
  SECOES.forEach(id => {
    $(id).open = (salvo.abertas || []).includes(id);
    $(id).addEventListener('toggle', () => vscode.setState({ abertas: SECOES.filter(s => $(s).open) }));
  });

  function salvar() {
    clearTimeout(temporizador);
    temporizador = undefined;
    if (!uriAtual) return;
    vscode.postMessage({ tipo: 'salvar', texto: $('enunciado').value, uri: uriAtual });
    $('status').textContent = $('enunciado').value.trim() ? 'Salvo ✓' : '';
  }

  function salvarCasos(imediato) {
    clearTimeout(temporizadorCasos);
    if (!uriAtual) return;
    const alvo = uriAtual, lista = casos;
    const enviar = () => { envioDeCasosPendente = undefined; vscode.postMessage({ tipo: 'salvarCasos', casos: lista, uri: alvo }); };
    if (imediato) enviar(); else { envioDeCasosPendente = enviar; temporizadorCasos = setTimeout(enviar, 500); }
  }

  /** Antes de mostrar outro arquivo, grava o que ainda estava esperando para salvar. */
  function gravarPendencias() {
    if (temporizador) salvar();
    if (envioDeCasosPendente) { clearTimeout(temporizadorCasos); envioDeCasosPendente(); }
  }

  function elemento(tag, propriedades, filhos) {
    const el = document.createElement(tag);
    Object.assign(el, propriedades || {});
    (filhos || []).forEach(f => el.append(f));
    return el;
  }

  /** Explica de onde o tutor tira o exercício. */
  function desenharOrigem(info) {
    let texto = '';
    if (info.origem === 'aluno' && info.rotulo) {
      texto = '🔎 Reconhecido: ' + info.rotulo + '.';
    } else if (info.origem === 'comentario') {
      texto = '📝 Sem enunciado aqui: o tutor vai usar o comentário do início do arquivo' + (info.rotulo ? ' (' + info.rotulo + ').' : '.');
    } else if (info.origem === 'codigo') {
      texto = '💡 Sem enunciado, o tutor tenta descobrir o exercício pelo seu código.';
    }
    $('origem').textContent = texto;
    $('dicaProfessor').textContent = info.casosDoProfessor ? '👩‍🏫 Os casos abaixo são do professor para este exercício.' : '🔮 Antes de rodar, tente prever o que o programa vai mostrar: é o "teste de mesa".';
    $('ajudas').textContent = info.ajudas ? 'Ajudas pedidas neste arquivo: ' + info.ajudas + '. Tente sozinho um pouco antes da próxima.' : '';
    $('seloAjuda').textContent = info.ajudas ? info.ajudas + (info.ajudas === 1 ? ' ajuda' : ' ajudas') : '';
    $('ponto').classList.toggle('oculto', !info.ponto);
    if (info.ponto) {
      $('pontoTitulo').textContent = '📍 Ponto ' + info.ponto.numero + ' de ' + info.ponto.total + ' · linha ' + info.ponto.linha;
      $('pontoPergunta').textContent = info.ponto.pergunta;
    }
  }

  function desenharCasos() {
    const lista = $('casos');
    lista.textContent = '';
    if (casos.length === 0) {
      lista.append(elemento('p', { className: 'dica', textContent: 'Nenhum caso de teste ainda.' }));
    }
    casos.forEach((caso, i) => {
      const entrada = elemento('textarea', { value: caso.entrada, placeholder: 'Ex.: 7 8 9 10 6' });
      entrada.addEventListener('input', () => { caso.entrada = entrada.value; salvarCasos(); });
      const saida = elemento('textarea', { value: caso.saidaEsperada, placeholder: 'Ex.: Media: 8.00' });
      saida.addEventListener('input', () => { caso.saidaEsperada = saida.value; salvarCasos(); });
      const previsao = elemento('textarea', { value: caso.previsao || '', placeholder: 'Opcional: o que você acha que vai aparecer?' });
      previsao.addEventListener('input', () => { caso.previsao = previsao.value; salvarCasos(); });
      const remover = elemento('button', { className: 'remover', title: 'Remover caso', textContent: '✕' });
      remover.addEventListener('click', () => { casos.splice(i, 1); resultados = undefined; salvarCasos(true); desenharCasos(); desenharResumo(); });

      const bloco = elemento('div', { className: 'caso' }, [
        elemento('div', { className: 'caso-topo' }, [elemento('span', { textContent: 'Caso ' + (i + 1) }), remover]),
        elemento('label', { textContent: 'Entrada (o que você digitaria)' }), entrada,
        elemento('label', { textContent: 'Saída esperada' }), saida,
        elemento('label', { textContent: '🔮 Sua previsão (opcional)' }), previsao,
        elemento('div', { className: 'resultado', id: 'resultado' + i }),
      ]);
      lista.append(bloco);
    });
    desenharResultados();
  }

  const NOMES = { passou: '✅ Passou', falhou: '❌ Saída diferente da esperada', tempoEsgotado: '⏱️ Tempo esgotado', erroDeExecucao: '💥 Erro ao executar' };

  function desenharResultados() {
    casos.forEach((_, i) => {
      const alvo = $('resultado' + i);
      if (!alvo) return;
      alvo.textContent = '';
      const r = resultados && resultados.compilou && resultados.casos[i];
      if (!r) return;
      alvo.append(elemento('div', { className: r.situacao === 'passou' ? 'passou' : 'falhou', textContent: NOMES[r.situacao] }));
      if (r.previsaoCerta !== undefined) {
        alvo.append(elemento('div', {
          className: r.previsaoCerta ? 'previsao-certa' : 'previsao-errada',
          textContent: r.previsaoCerta ? '🔮 Sua previsão estava certa!' : '🔮 Sua previsão foi diferente do que o programa mostrou. Onde o seu raciocínio e o programa se separaram?',
        }));
        if (!r.previsaoCerta && r.situacao === 'passou') {
          alvo.append(elemento('div', { className: 'dica', textContent: 'Saída do seu programa:' }));
          alvo.append(elemento('pre', { textContent: r.saidaObtida || '(nada foi mostrado)' }));
        }
      }
      if (r.situacao !== 'passou') {
        if (r.detalhe) alvo.append(elemento('div', { className: 'dica', textContent: r.detalhe }));
        alvo.append(elemento('div', { className: 'dica', textContent: 'Saída do seu programa:' }));
        alvo.append(elemento('pre', { textContent: r.saidaObtida || '(nada foi mostrado)' }));
        const pista = elemento('button', { className: 'link', textContent: '🎓 Pedir uma pista sobre este caso' });
        pista.addEventListener('click', () => vscode.postMessage({ tipo: 'pistaTeste', indice: i }));
        alvo.append(pista);
      }
    });
  }

  function desenharResumo(estado) {
    const alvo = $('resumoTestes');
    alvo.textContent = '';
    $('rodarTestes').disabled = estado === 'rodando';
    $('rodarTestes').textContent = estado === 'rodando' ? 'Rodando...' : '▶ Rodar testes';
    $('seloTestes').textContent = casos.length ? casos.length + (casos.length === 1 ? ' caso' : ' casos') : '';
    if (estado === 'rodando') { $('seloTestes').textContent = 'rodando...'; return; }
    if (estado && estado.erro) {
      alvo.append(elemento('div', { className: 'resumo falhou', textContent: estado.erro }));
      return;
    }
    if (!resultados) return;
    if (!resultados.compilou) {
      $('seloTestes').textContent = '❌ não compilou';
      alvo.append(elemento('div', { className: 'resumo falhou', textContent: '❌ O programa não compilou:' }));
      alvo.append(elemento('pre', { textContent: resultados.errosDeCompilacao.join(QUEBRA) }));
      return;
    }
    const passaram = resultados.casos.filter(r => r.situacao === 'passou').length;
    const total = resultados.casos.length;
    $('seloTestes').textContent = (passaram === total ? '✅ ' : '❌ ') + passaram + ' de ' + total;
    alvo.append(elemento('div', {
      className: 'resumo ' + (passaram === total ? 'passou' : 'falhou'),
      textContent: passaram === total ? '🎉 Todos os ' + total + ' casos passaram!' : passaram + ' de ' + total + ' casos passaram.',
    }));
  }

  $('enunciado').addEventListener('input', () => {
    $('status').textContent = 'Salvando...';
    clearTimeout(temporizador);
    temporizador = setTimeout(salvar, 600);
  });
  $('enunciado').addEventListener('blur', () => { if (temporizador) salvar(); });
  $('adicionarCaso').addEventListener('click', () => {
    casos.push({ entrada: '', saidaEsperada: '', previsao: '' });
    salvarCasos(true);
    desenharCasos();
    desenharResumo();
    const caixas = $('casos').querySelectorAll('textarea');
    if (caixas.length) caixas[caixas.length - 3].focus();
  });
  $('rodarTestes').addEventListener('click', () => {
    if (temporizador) salvar();
    salvarCasos(true);
    vscode.postMessage({ tipo: 'rodarTestes' });
  });
  $('verificar').addEventListener('click', () => { if (temporizador) salvar(); vscode.postMessage({ tipo: 'verificar' }); });
  $('modo').addEventListener('click', () => vscode.postMessage({ tipo: 'modoAprendizado' }));
  document.querySelectorAll('[data-comando]').forEach(botao =>
    botao.addEventListener('click', () => vscode.postMessage({ tipo: 'comando', comando: botao.dataset.comando })));

  window.addEventListener('message', evento => {
    const msg = evento.data;
    if (msg.tipo === 'focar') { $('enunciado').focus(); return; }
    if (msg.tipo === 'resultados') {
      $('secTestes').open = true;
      if (msg.resultados === 'rodando' || msg.resultados.erro) { desenharResumo(msg.resultados); return; }
      resultados = msg.resultados;
      desenharResumo();
      desenharResultados();
      return;
    }
    if (msg.tipo !== 'estado') return;
    if (!msg.arquivo) { gravarPendencias(); uriAtual = undefined; }
    $('semArquivo').classList.toggle('oculto', !!msg.arquivo);
    $('comArquivo').classList.toggle('oculto', !msg.arquivo);
    if (msg.arquivo) {
      const mudouArquivo = uriAtual !== msg.uri;
      if (mudouArquivo) {
        gravarPendencias();
        uriAtual = msg.uri;
      }
      $('arquivo').textContent = '📄 ' + msg.arquivo;
      if (mudouArquivo || document.activeElement !== $('enunciado')) {
        $('enunciado').value = msg.enunciado;
        $('status').textContent = msg.enunciado ? 'Salvo ✓' : '';
      }
      // Não redesenha os casos enquanto o aluno digita neles.
      if (mudouArquivo || !$('casos').contains(document.activeElement)) {
        casos = msg.casos.map(c => ({ entrada: c.entrada, saidaEsperada: c.saidaEsperada, previsao: c.previsao || '' }));
        resultados = msg.resultados;
        desenharCasos();
        desenharResumo();
      }
      desenharOrigem(msg.info || { origem: 'codigo', ajudas: 0, casosDoProfessor: false });
    }
    $('textoModo').textContent = msg.modoAprendizado
      ? 'Modo aprendizado ligado: o Copilot não sugere código sozinho (texto cinza) nos arquivos C. Peça ajuda quando quiser.'
      : 'Modo aprendizado desligado: o Copilot pode sugerir código automaticamente enquanto você digita.';
    $('modo').textContent = msg.modoAprendizado ? 'Desligar modo aprendizado' : 'Ligar modo aprendizado';
  });

  vscode.postMessage({ tipo: 'pronto' });
</script>
</body>
</html>`;
}
