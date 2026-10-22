// Teste de integração: roda DENTRO de uma janela do VS Code (perfil isolado,
// sem Copilot). Verifica ativação, comandos, painel, GCC e modo aprendizado.
import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';

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
        'tutorSocratico.rodarTestes', 'tutorSocratico.pistaSobreTeste', 'tutorSocratico.escolherExercicio',
        'tutorSocratico.abrirExercicio', 'tutorSocratico.alternarConcluido', 'tutorSocratico.explicarCodigo', 'tutorSocratico.quiz', 'tutorSocratico.depurar']) {
        assert.ok(comandos.includes(id), `comando ausente: ${id}`);
    }
    ok('todos os comandos registrados');

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

    // Dica aparece enquanto digita (sem salvar).
    const editor = vscode.window.activeTextEditor!;
    await editor.edit(e => e.insert(new vscode.Position(14, 0), '    if (soma = 0) {}\n'));
    await aguardar(() => vscode.languages.getDiagnostics(documento.uri).some(d => d.source === 'Tutor Socrático' && d.range.start.line === 14) || undefined);
    ok('dica offline aparece enquanto o aluno digita');
    await vscode.commands.executeCommand('undo');

    await vscode.commands.executeCommand('tutorSocratico.progresso.focus');
    ok('árvore Progresso abre sem erro');

    // Abrir um exercício da lista sem nenhum .c aberto cria o arquivo modelo na pasta.
    await vscode.commands.executeCommand('workbench.action.revertAndCloseActiveEditor');
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    await vscode.commands.executeCommand('tutorSocratico.abrirExercicio', 'aula11-ex4');
    const novo = await aguardar(() => vscode.window.activeTextEditor?.document.fileName.endsWith('aula11_ex4.c') ? vscode.window.activeTextEditor : undefined);
    const textoNovo = novo.document.getText();
    assert.ok(textoNovo.includes('Aula 11 - Vetores - Exercício 4') && textoNovo.includes('int main()') && textoNovo.includes('8 inteiros'), textoNovo);
    ok('abrir exercício da lista cria aula11_ex4.c com o enunciado e o esqueleto');

    // Exercício com casos oficiais: os casos entram sozinhos e rodam.
    await vscode.commands.executeCommand('workbench.action.closeAllEditors');
    await vscode.commands.executeCommand('tutorSocratico.abrirExercicio', 'aula05-ex4');
    await aguardar(() => vscode.window.activeTextEditor?.document.fileName.endsWith('aula05_ex4.c') || undefined);
    const resultado = await vscode.commands.executeCommand<{ compilou: boolean; casos: { situacao: string }[] }>('tutorSocratico.rodarTestes');
    assert.ok(resultado && resultado.compilou, JSON.stringify(resultado));
    assert.deepStrictEqual(resultado.casos.map(c => c.situacao), ['falhou', 'falhou'], 'o esqueleto vazio deve falhar nos 2 casos oficiais');
    ok('casos oficiais carregados ao escolher o exercício (aula05-ex4: 2 casos, esqueleto vazio falha)');

    console.log('\n' + resultados.join('\n') + '\n\nIntegração: todos os testes passaram.');
}
