// Painel "Exercício" na barra lateral do Tutor Socrático: o aluno escreve o
// enunciado do exercício do arquivo .c aberto, cadastra casos de teste e tem
// os botões de ajuda.
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
    | { tipo: 'naoEhExercicio'; uri?: string }
    | { tipo: 'verificar' }
    | { tipo: 'perguntar' }
    | { tipo: 'modoAprendizado' }
    | { tipo: 'comando'; comando: string };

// Botões do painel que só disparam um comando da extensão.
const COMANDOS_DO_PAINEL = new Set([
    'tutorSocratico.escolherExercicio', 'tutorSocratico.alternarConcluido', 'tutorSocratico.explicarCodigo',
    'tutorSocratico.quiz', 'tutorSocratico.depurar',
]);

export interface InfoDoPainel {
    rotulo?: string;
    concluido: boolean;
    ajudas: number;
}

export class PainelExercicio implements vscode.WebviewViewProvider {
    private visao?: vscode.WebviewView;
    private arquivoAtual?: vscode.Uri;
    private focarAoAbrir = false;

    constructor(
        private readonly exercicios: Exercicios,
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
            naoEhExercicio: uri ? this.exercicios.naoEhExercicio(uri) : false,
            info: uri ? this.info(uri) : undefined,
            modoAprendizado: this.modoAprendizadoLigado(),
        });
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
                    await this.exercicios.salvarEnunciado(uri, mensagem.texto);
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
            case 'naoEhExercicio':
                if (uri) {
                    await this.exercicios.marcarNaoEhExercicio(uri);
                }
                return;
            case 'verificar':
                await vscode.commands.executeCommand('tutorSocratico.verificarCodigo', uri);
                return;
            case 'perguntar':
                await vscode.commands.executeCommand('tutorSocratico.perguntar');
                return;
            case 'modoAprendizado':
                await vscode.commands.executeCommand('tutorSocratico.alternarModoAprendizado');
                return;
            case 'comando':
                if (COMANDOS_DO_PAINEL.has(mensagem.comando)) {
                    await vscode.commands.executeCommand(mensagem.comando);
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
  body { font-family: var(--vscode-font-family); font-size: var(--vscode-font-size); color: var(--vscode-foreground); padding: 0 12px 12px; }
  h3 { font-size: 11px; text-transform: uppercase; letter-spacing: .04em; color: var(--vscode-descriptionForeground); margin: 16px 0 6px; }
  .arquivo { font-weight: 600; word-break: break-all; }
  .dica { color: var(--vscode-descriptionForeground); margin: 4px 0 8px; }
  textarea { width: 100%; box-sizing: border-box; resize: vertical; font-family: var(--vscode-editor-font-family, monospace); font-size: var(--vscode-font-size);
             color: var(--vscode-input-foreground); background: var(--vscode-input-background); border: 1px solid var(--vscode-input-border, transparent); padding: 6px; }
  #enunciado { min-height: 120px; font-family: var(--vscode-font-family); }
  textarea:focus { outline: 1px solid var(--vscode-focusBorder); }
  button { width: 100%; margin-top: 6px; padding: 6px; border: none; cursor: pointer; font-family: inherit; font-size: inherit;
           color: var(--vscode-button-foreground); background: var(--vscode-button-background); }
  button:hover { background: var(--vscode-button-hoverBackground); }
  button:disabled { opacity: .6; cursor: default; }
  button.secundario { color: var(--vscode-button-secondaryForeground); background: var(--vscode-button-secondaryBackground); }
  button.secundario:hover { background: var(--vscode-button-secondaryHoverBackground); }
  .link { background: none; color: var(--vscode-textLink-foreground); padding: 2px 0; text-align: left; width: auto; margin-top: 2px; }
  .link:hover { background: none; text-decoration: underline; }
  .status { min-height: 1.2em; color: var(--vscode-descriptionForeground); font-size: 12px; }
  .oculto { display: none; }
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
  .vinculo { margin: 4px 0; padding: 4px 6px; border-left: 3px solid var(--vscode-textLink-foreground); background: var(--vscode-textCodeBlock-background); }
  .linha-botoes { display: flex; gap: 6px; }
  .linha-botoes button { flex: 1; }
  .previsao-certa { color: var(--vscode-testing-iconPassed, #3fb950); }
  .previsao-errada { color: var(--vscode-editorWarning-foreground, #cca700); }
</style>
</head>
<body>
  <div id="semArquivo">
    <p class="dica">Abra um arquivo <b>.c</b> para informar o exercício e pedir ajuda ao tutor.</p>
  </div>

  <div id="comArquivo" class="oculto">
    <h3>Arquivo</h3>
    <div class="arquivo" id="arquivo"></div>

    <div id="blocoExercicio">
      <h3>Exercício</h3>
      <div id="vinculo" class="vinculo oculto"></div>
      <button class="secundario" id="escolherExercicio">📚 Escolher exercício da lista da aula</button>
      <p class="dica">Ou cole aqui o enunciado do exercício. O tutor usa o enunciado para verificar se o seu programa faz o que foi pedido.</p>
      <textarea id="enunciado" placeholder="Ex.: Leia 5 notas, guarde em um vetor e mostre a soma e a média..."></textarea>
      <div class="status" id="status"></div>

      <h3>Casos de teste</h3>
      <p class="dica">Escreva o que você digitaria no programa (<b>Entrada</b>) e o que ele deveria mostrar (<b>Saída esperada</b>). O caso passa se a saída esperada aparecer na saída do programa; mensagens como "Digite a nota:" são ignoradas.</p>
      <p class="dica">🔮 Antes de rodar, tente <b>prever</b> o que o seu programa vai mostrar: é o "teste de mesa".</p>
      <div id="casos"></div>
      <button class="secundario" id="adicionarCaso">+ Adicionar caso de teste</button>
      <button id="rodarTestes">▶ Rodar testes</button>
      <div id="resumoTestes"></div>

      <button class="link" id="naoEhExercicio">Este arquivo não é um exercício</button>
    </div>
    <div id="blocoNaoEhExercicio" class="oculto">
      <p class="dica">Este arquivo foi marcado como <b>não é um exercício</b>.</p>
      <button class="link" id="ehExercicio">Na verdade é um exercício: informar o enunciado</button>
    </div>

    <h3>Ajuda do tutor</h3>
    <button id="verificar">🎓 Verificar meu código</button>
    <button class="secundario" id="perguntar">💬 Perguntar ao tutor</button>
    <div class="linha-botoes">
      <button class="secundario" id="depurar" title="Aprender a achar o erro com o depurador ou printf">🐞 Depurar</button>
      <button class="secundario" id="explicar" title="Explicar seu código com suas palavras">🗣️ Explicar</button>
      <button class="secundario" id="quiz" title="Quiz rápido de revisão da aula">❓ Quiz</button>
    </div>
    <p class="dica">O tutor aponta onde olhar e faz perguntas, mas não entrega a resposta.</p>
    <p class="dica" id="ajudas"></p>
    <button class="link oculto" id="concluido"></button>
  </div>

  <h3>Modo aprendizado</h3>
  <p class="dica" id="textoModo"></p>
  <button class="secundario" id="modo"></button>

<script nonce="${nonce}">
  const vscode = acquireVsCodeApi();
  const $ = id => document.getElementById(id);
  let temporizador, temporizadorCasos, envioDeCasosPendente;
  let casos = [];
  let uriAtual;
  let resultados;

  function mostrarExercicio(ehExercicio) {
    $('blocoExercicio').classList.toggle('oculto', !ehExercicio);
    $('blocoNaoEhExercicio').classList.toggle('oculto', ehExercicio);
  }

  function salvar() {
    clearTimeout(temporizador);
    temporizador = undefined;
    if (!uriAtual) return;
    vscode.postMessage({ tipo: 'salvar', texto: $('enunciado').value, uri: uriAtual });
    $('status').textContent = $('enunciado').value.trim() ? 'Exercício salvo ✓' : '';
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
        elemento('label', { textContent: '🔮 Sua previsão (teste de mesa)' }), previsao,
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
    $('rodarTestes').textContent = estado === 'rodando' ? 'Rodando testes...' : '▶ Rodar testes';
    if (estado && estado.erro) {
      alvo.append(elemento('div', { className: 'resumo falhou', textContent: estado.erro }));
      return;
    }
    if (!resultados) return;
    if (!resultados.compilou) {
      alvo.append(elemento('div', { className: 'resumo falhou', textContent: '❌ O programa não compilou:' }));
      alvo.append(elemento('pre', { textContent: resultados.errosDeCompilacao.join('\\n') }));
      return;
    }
    const passaram = resultados.casos.filter(r => r.situacao === 'passou').length;
    const total = resultados.casos.length;
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
  $('enunciado').addEventListener('blur', salvar);
  $('adicionarCaso').addEventListener('click', () => {
    casos.push({ entrada: '', saidaEsperada: '', previsao: '' });
    salvarCasos(true);
    desenharCasos();
    const caixas = $('casos').querySelectorAll('textarea');
    if (caixas.length) caixas[caixas.length - 2].focus();
  });
  $('rodarTestes').addEventListener('click', () => {
    salvar();
    salvarCasos(true);
    vscode.postMessage({ tipo: 'rodarTestes' });
  });
  $('naoEhExercicio').addEventListener('click', () => { vscode.postMessage({ tipo: 'naoEhExercicio', uri: uriAtual }); mostrarExercicio(false); });
  $('ehExercicio').addEventListener('click', () => { mostrarExercicio(true); $('enunciado').focus(); });
  $('verificar').addEventListener('click', () => { salvar(); vscode.postMessage({ tipo: 'verificar' }); });
  $('perguntar').addEventListener('click', () => vscode.postMessage({ tipo: 'perguntar' }));
  $('modo').addEventListener('click', () => vscode.postMessage({ tipo: 'modoAprendizado' }));
  const comando = c => () => vscode.postMessage({ tipo: 'comando', comando: c });
  $('escolherExercicio').addEventListener('click', comando('tutorSocratico.escolherExercicio'));
  $('depurar').addEventListener('click', comando('tutorSocratico.depurar'));
  $('explicar').addEventListener('click', comando('tutorSocratico.explicarCodigo'));
  $('quiz').addEventListener('click', comando('tutorSocratico.quiz'));
  $('concluido').addEventListener('click', comando('tutorSocratico.alternarConcluido'));

  window.addEventListener('message', evento => {
    const msg = evento.data;
    if (msg.tipo === 'focar') { mostrarExercicio(true); $('enunciado').focus(); return; }
    if (msg.tipo === 'resultados') {
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
      $('arquivo').textContent = msg.arquivo;
      if (mudouArquivo || document.activeElement !== $('enunciado')) {
        $('enunciado').value = msg.enunciado;
        $('status').textContent = msg.enunciado ? 'Exercício salvo ✓' : '';
      }
      // Não redesenha os casos enquanto o aluno digita neles.
      if (mudouArquivo || !$('casos').contains(document.activeElement)) {
        casos = msg.casos.map(c => ({ entrada: c.entrada, saidaEsperada: c.saidaEsperada, previsao: c.previsao || '' }));
        resultados = msg.resultados;
        desenharCasos();
        desenharResumo();
      }
      mostrarExercicio(!msg.naoEhExercicio);
      const info = msg.info || { ajudas: 0, concluido: false };
      $('vinculo').classList.toggle('oculto', !info.rotulo);
      $('vinculo').textContent = info.rotulo ? (info.concluido ? '✅ ' : '📌 ') + info.rotulo + (info.concluido ? ' (concluído)' : '') : '';
      $('escolherExercicio').textContent = info.rotulo ? '📚 Trocar exercício da lista' : '📚 Escolher exercício da lista da aula';
      $('ajudas').textContent = info.ajudas ? 'Ajudas pedidas ao tutor neste arquivo: ' + info.ajudas + '. Tente sozinho um pouco antes de pedir a próxima.' : '';
      $('concluido').classList.toggle('oculto', !info.rotulo);
      $('concluido').textContent = info.concluido ? 'Desmarcar como concluído' : 'Marcar exercício como concluído';
    }
    $('textoModo').textContent = msg.modoAprendizado
      ? 'Ligado: as sugestões automáticas de código (texto cinza) estão desativadas nos arquivos C. Peça ajuda quando quiser.'
      : 'Desligado: o Copilot pode sugerir código automaticamente enquanto você digita.';
    $('modo').textContent = msg.modoAprendizado ? 'Desligar modo aprendizado' : 'Ligar modo aprendizado';
  });

  vscode.postMessage({ tipo: 'pronto' });
</script>
</body>
</html>`;
}
