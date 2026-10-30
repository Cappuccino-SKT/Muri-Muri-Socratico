// Teste de integração: roda DENTRO de uma janela do VS Code (perfil isolado,
// sem Copilot). Verifica ativação, comandos, painel, GCC e modo aprendizado.
import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';
import { montarCatalogo } from '../../catalogo';
import { carregarMaterial } from '../../material';

const esperar = (ms: number) => new Promise(r => setTimeout(r, ms));

async function aguardar<T>(condicao: () => T | undefined, ms = 15000): Promise<T> {
    const fim = Date.now() + ms;
    while (Date.now() < fim) {
        const valor = condicao();
        if (valor) {
            return valor;
        }
        await esperar(200);
    }
    throw new Error('tempo esgotado esperando a condição');
}

export async function run(): Promise<void> {
    const resultados: string[] = [];
    const ok = (nome: string) => resultados.push(`ok   ${nome}`);

    const exemplo = path.resolve(__dirname, '..', '..', '..', 'exemplos', 'exemplo_media_vetor.c');
    const documento = await vscode.workspace.openTextDocument(exemplo);
    await vscode.window.showTextDocument(documento);

    const extensao = vscode.extensions.all.find(e => e.packageJSON.name === 'tutor-socratico-c');
    assert.ok(extensao, 'extensão não encontrada');
    await aguardar(() => extensao!.isActive);
    ok('extensão ativa ao abrir um arquivo .c');

    const comandos = await vscode.commands.getCommands(true);
    for (const id of ['tutorSocratico.verificarCodigo', 'tutorSocratico.perguntar', 'tutorSocratico.informarExercicio',
        'tutorSocratico.alternarModoAprendizado', 'tutorSocratico.pedirPista', 'tutorSocratico.verificarArquivo',
        'tutorSocratico.rodarTestes', 'tutorSocratico.pistaSobreTeste', 'tutorSocratico.explicarCodigo',
        'tutorSocratico.quiz', 'tutorSocratico.depurar', 'tutorSocratico.liberarIa', 'tutorSocratico.abrirGuia',
        'tutorSocratico.conferirProntidao', 'tutorSocratico.resolverPendencia', 'tutorSocratico.inserirCabecalho',
        'tutorSocratico.verificarQualidade']) {
        assert.ok(comandos.includes(id), `comando ausente: ${id}`);
    }
    ok('todos os comandos registrados');
    for (const id of ['tutorSocratico.escolherExercicio', 'tutorSocratico.abrirExercicio', 'tutorSocratico.alternarConcluido']) {
        assert.ok(!comandos.includes(id), `comando removido ainda existe: ${id}`);
    }
    ok('a lista de exercícios prontos foi removida');

    const sugestoes = () => vscode.workspace.getConfiguration('editor', { languageId: 'c' }).get<boolean>('inlineSuggest.enabled');
    assert.strictEqual(sugestoes(), false, 'o padrão para C deveria ser sem sugestões automáticas');
    ok('modo aprendizado ligado por padrão (sem sugestões automáticas em C)');

    await vscode.commands.executeCommand('tutorSocratico.alternarModoAprendizado');
    await aguardar(() => sugestoes() === true);
    await vscode.commands.executeCommand('tutorSocratico.alternarModoAprendizado');
    await aguardar(() => sugestoes() === false);
    ok('alternar modo aprendizado liga e desliga as sugestões só para C');
    assert.notStrictEqual(vscode.workspace.getConfiguration('editor', { languageId: 'python' }).get('inlineSuggest.enabled'), false);
    ok('outras linguagens não são afetadas');

    await vscode.commands.executeCommand('tutorSocratico.exercicio.focus');
    ok('painel Exercício abre sem erro');

    await vscode.commands.executeCommand('tutorSocratico.verificarArquivo');
    const diagnosticos = await aguardar(() => {
        const lista = vscode.languages.getDiagnostics(documento.uri).filter(d => d.source === 'gcc');
        return lista.length > 0 ? lista : undefined;
    });
    assert.ok(diagnosticos.some(d => d.range.start.line === 19 && d.message.includes("int *")), JSON.stringify(diagnosticos.map(d => d.message)));
    ok('GCC marca o & faltando na linha 20');

    const acoes = await vscode.commands.executeCommand<vscode.CodeAction[]>(
        'vscode.executeCodeActionProvider', documento.uri, diagnosticos[0].range);
    assert.ok(acoes.some(a => a.title.includes('Pedir uma pista ao Tutor Socrático')), 'lâmpada do tutor não encontrada');
    ok('lâmpada "Pedir uma pista ao Tutor Socrático" aparece no erro');

    const traduzido = diagnosticos.find(d => d.range.start.line === 19);
    assert.ok(traduzido && traduzido.message.includes('💬') && traduzido.message.includes('&'), traduzido?.message);
    assert.ok(typeof traduzido!.code === 'object' && String(traduzido!.code.target).includes('youtube.com'), 'sem link da videoaula');
    ok('mensagem do GCC traduzida, com link da videoaula');

    const dicas = await aguardar(() => {
        const lista = vscode.languages.getDiagnostics(documento.uri).filter(d => d.source === 'Tutor Socrático');
        return lista.length >= 2 ? lista : undefined;
    });
    assert.deepStrictEqual(dicas.map(d => d.range.start.line + 1).sort((a, b) => a - b), [18, 27]);
    ok('dicas offline marcam o laço "<= 5" (linha 18) e a divisão inteira (linha 27)');

    const acoesDica = await vscode.commands.executeCommand<vscode.CodeAction[]>(
        'vscode.executeCodeActionProvider', documento.uri, dicas[0].range);
    assert.ok(acoesDica.some(a => a.title.startsWith('📺 Assistir à videoaula')), acoesDica.map(a => a.title).join(' | '));
    ok('lâmpada oferece "Assistir à videoaula" nas dicas');

    const qualidade = await aguardar(() => {
        const lista = vscode.languages.getDiagnostics(documento.uri).filter(d => d.source === 'Tutor Socrático · qualidade');
        return lista.length > 0 ? lista : undefined;
    });
    assert.ok(qualidade.some(d => d.range.start.line === 0 && d.message.includes('cabeçalho Doxygen')), qualidade.map(d => d.message).join(' | '));
    const acoesCabecalho = await vscode.commands.executeCommand<vscode.CodeAction[]>(
        'vscode.executeCodeActionProvider', documento.uri, new vscode.Range(0, 0, 0, 1));
    assert.ok(acoesCabecalho.some(a => a.title.startsWith('📝 Inserir cabeçalho Doxygen')), acoesCabecalho.map(a => a.title).join(' | '));
    ok('aviso de cabeçalho Doxygen na linha 1, com a lâmpada "Inserir cabeçalho"');

    // Computadores da universidade: modo restrito, guia e "Tudo pronto?".
    const manifesto = extensao!.packageJSON;
    assert.strictEqual(manifesto.capabilities?.untrustedWorkspaces?.supported, 'limited');
    assert.deepStrictEqual(manifesto.contributes.walkthroughs[0].steps.map((p: { id: string }) => p.id),
        ['conta', 'copilot', 'permissao', 'modelo', 'pasta', 'gcc', 'usar']);
    ok('extensão funciona em modo restrito e tem o guia de primeiros passos');

    const { prontidao } = extensao!.exports as { prontidao: import('../../prontidao').Prontidao };
    const itens = await prontidao.conferir();
    const situacao = (id: string) => itens.find(i => i.id === id)?.situacao;
    assert.deepStrictEqual(itens.map(i => i.id), ['ia', 'conta', 'permissao', 'pasta', 'gcc']);
    assert.strictEqual(situacao('pasta'), 'ok');
    assert.strictEqual(situacao('gcc'), 'ok');
    // O VS Code de teste não tem Copilot: o tutor precisa dizer o que falta.
    assert.ok(prontidao.bloqueioDaIa()?.botao, JSON.stringify(itens));
    ok(`"Tudo pronto?" confere pasta e GCC e aponta o que falta para a IA (${prontidao.bloqueioDaIa()!.titulo})`);

    // Dica aparece enquanto digita (sem salvar).
    const editor = vscode.window.activeTextEditor!;
    await editor.edit(e => e.insert(new vscode.Position(14, 0), '    if (soma = 0) {}\n'));
    await aguardar(() => vscode.languages.getDiagnostics(documento.uri).some(d => d.source === 'Tutor Socrático' && d.range.start.line === 14) || undefined);
    ok('dica offline aparece enquanto o aluno digita');
    await vscode.commands.executeCommand('undo');

    // Enunciado colado pelo aluno: se for um exercício da aula com casos do
    // professor, os casos entram sozinhos e rodam.
    await vscode.commands.executeCommand('workbench.action.revertAndCloseActiveEditor');
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    const pasta = vscode.workspace.workspaceFolders?.[0]?.uri ?? vscode.Uri.file(path.dirname(exemplo));
    const vazio = vscode.Uri.joinPath(pasta, 'teste_colado.c');
    await vscode.workspace.fs.writeFile(vazio, Buffer.from('#include <stdio.h>\n\nint main()\n{\n    return 0;\n}\n', 'utf8'));
    await vscode.window.showTextDocument(vazio);
    const pastaMaterial = path.join(extensao!.extensionPath, 'material');
    const ex4 = montarCatalogo(carregarMaterial(pastaMaterial), pastaMaterial).exercicios.find(e => e.id === 'aula05-ex4')!;
    await vscode.commands.executeCommand('tutorSocratico.informarExercicio', ex4.enunciado);
    const resultado = await vscode.commands.executeCommand<{ compilou: boolean; casos: { situacao: string }[] }>('tutorSocratico.rodarTestes');
    assert.ok(resultado && resultado.compilou, JSON.stringify(resultado));
    assert.deepStrictEqual(resultado.casos.map(c => c.situacao), ['falhou', 'falhou'], 'o programa vazio deve falhar nos 2 casos do professor');
    ok('enunciado colado é reconhecido (aula05-ex4) e os 2 casos do professor entram sozinhos');

    // Pontos que o tutor manda revisar: marcados um por vez no editor.
    const { marcacoes } = extensao!.exports as { marcacoes: import('../../marcacoes').Marcacoes };
    marcacoes.definir(vazio, { pontos: [{ linha: 5, pergunta: 'O que o programa mostra?' }, { linha: 3, pergunta: 'Outra?' }] }, false);
    const lentes = async () => (await vscode.commands.executeCommand<vscode.CodeLens[]>('vscode.executeCodeLensProvider', vazio))
        .filter(l => l.command?.command.startsWith('tutorSocratico.'));
    let botoes = await lentes();
    assert.deepStrictEqual(botoes.map(l => l.command!.title), ['🎓 Ponto 1 de 2', '✅ Já corrigi, conferir', '💡 Pista', '✖ Esconder']);
    assert.strictEqual(botoes[0].range.start.line, 4);
    ok('ponto atual marcado no editor com os botões em cima da linha');

    const editorColado = vscode.window.activeTextEditor!;
    await editorColado.edit(e => e.insert(new vscode.Position(0, 0), '// comentario\n'));
    assert.strictEqual(marcacoes.atual(vazio)!.ponto.linha, 6);
    ok('a marcação acompanha a linha quando o aluno escreve acima dela');

    marcacoes.definir(vazio, { resolvido: true, pontos: [{ linha: 4, pergunta: 'Outra?' }] }, true);
    botoes = await lentes();
    assert.strictEqual(botoes[0].command!.title, '🎓 Ponto 2 de 2');
    await vscode.commands.executeCommand('tutorSocratico.limparPontos', vazio);
    assert.strictEqual((await lentes()).length, 0);
    // Verificação de qualidade: "Feito, próximo" avança sem a IA; o tutor confere tudo no fim.
    marcacoes.definir(vazio, { pontos: [{ linha: 3, pergunta: 'Renomeie x para soma' }, { linha: 4, pergunta: 'Comente o laço' }] }, false, 'qualidade');
    assert.deepStrictEqual((await lentes()).map(l => l.command!.title),
        ['✨ Qualidade 1 de 2', '✅ Feito, próximo', '💡 Como fazer?', '✨ Conferir tudo agora', '✖ Esconder']);
    await vscode.commands.executeCommand('tutorSocratico.proximoPonto', vazio);
    assert.strictEqual((await lentes())[0].command!.title, '✨ Qualidade 2 de 2');
    assert.strictEqual(marcacoes.marcarFeito(vazio), 0);
    assert.strictEqual((await lentes()).length, 0, 'sem marcação enquanto espera a conferência');
    assert.deepStrictEqual(marcacoes.esperandoConferencia(vazio)!.map(p => p.pergunta), ['Renomeie x para soma', 'Comente o laço']);
    assert.strictEqual(marcacoes.doArquivo(vazio)!.feitos.length, 2, 'os feitos vão para o tutor conferir');
    await vscode.commands.executeCommand('tutorSocratico.limparPontos', vazio);
    ok('ponto resolvido passa para o próximo, e "Esconder" tira a marcação');
    ok('na qualidade, "Feito, próximo" avança sem a IA e guarda os pontos para uma conferência só no fim');

    await vscode.commands.executeCommand('tutorSocratico.inserirCabecalho', vazio, 'Aluno Teste');
    const comCabecalho = editorColado.document.getText();
    assert.ok(comCabecalho.startsWith('/**\n * \\file teste_colado.c\n'), comCabecalho.slice(0, 120));
    assert.ok(comCabecalho.includes(' * \\author Aluno Teste\n'));
    assert.ok(comCabecalho.includes(' * Enunciado:\n * ' + ex4.enunciado.split('\n')[0].trim().slice(0, 20)), 'o enunciado do painel vai para o comentário');
    assert.strictEqual(editorColado.document.getText(editorColado.selection), '(descreva em uma frase o que o programa faz)', 'o \\brief fica selecionado para o aluno escrever');
    ok('"Inserir cabeçalho" coloca o Doxygen e, abaixo, o enunciado do painel');

    assert.ok(manifesto.contributes.keybindings.some((k: { key: string; command: string }) =>
        k.key === 'ctrl+alt+h' && k.command === 'tutorSocratico.inserirCabecalho'));
    const fimDoArquivo = editorColado.document.lineAt(editorColado.document.lineCount - 1).range.end;
    editorColado.selection = new vscode.Selection(fimDoArquivo, fimDoArquivo);
    await vscode.commands.executeCommand('editor.action.insertSnippet', { langId: 'c', name: 'Comentário Doxygen de uma função' });
    const comSnippet = editorColado.document.getText();
    assert.ok(comSnippet.includes(' * \\param ') && comSnippet.includes(' * \\return '), comSnippet.slice(-200));
    ok('atalho Ctrl+Alt+H e snippet "doxyf" (comentário de função com \\param e \\return)');
    await vscode.commands.executeCommand('workbench.action.revertAndCloseActiveEditor');
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    await vscode.workspace.fs.delete(vazio);

    console.log('\n' + resultados.join('\n') + '\n\nIntegração: todos os testes passaram.');
}
