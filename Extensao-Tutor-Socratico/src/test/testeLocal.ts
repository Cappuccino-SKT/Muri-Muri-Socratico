// Testes das partes que não dependem do VS Code: escolha das aulas,
// leitura da saída do GCC e montagem do contexto. Rodar com: npm test
import * as assert from 'assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { normalizarSaida, resumirResultados, rodarCasos, saidaConfere } from '../testes';
import { aulaDoExercicio, montarCatalogo } from '../catalogo';
import { comentarioInicial, reconhecerExercicio } from '../reconhecer';
import { analisarCodigo, traduzirMensagemGcc } from '../didatico';
import { carregarMaterial, selecionarAulas } from '../material';
import { interpretarSaidaGcc, verificarComGcc } from '../gcc';
import { instrucaoDoComando, montarContexto, numerarLinhas, REGRAS_DO_TUTOR } from '../prompt';
import { FiltroDoBloco, lerBloco, moverLinha } from '../pontos';

const raiz = path.join(__dirname, '..', '..');
const material = carregarMaterial(path.join(raiz, 'material'));
let falhas = 0;

function teste(nome: string, corpo: () => void | Promise<void>) {
    return Promise.resolve()
        .then(corpo)
        .then(() => console.log(`ok   ${nome}`))
        .catch(erro => {
            falhas++;
            console.log(`FALHA ${nome}\n     ${erro instanceof Error ? erro.message : erro}`);
        });
}

const numeros = (pergunta: string, codigo = '') => selecionarAulas(material, pergunta, codigo).map(a => a.numero);

(async () => {
    await teste('carrega as 21 aulas e os índices', () => {
        assert.strictEqual(material.aulas.length, 21);
        assert.ok(material.indiceAulas.includes('Sumário das aulas'));
        assert.ok(material.indiceVideos.includes('youtube.com'));
        assert.ok(material.aulas.every(a => a.numero > 0 && a.topicos.length > 0));
    });

    await teste('pergunta sobre strcmp escolhe a Aula 13 primeiro', () => {
        assert.strictEqual(numeros('como funciona o strcmp?')[0], 13);
    });

    await teste('pergunta sobre ponteiros escolhe a Aula 19', () => {
        assert.ok(numeros('não entendi ponteiro para ponteiro').includes(19));
    });

    await teste('pergunta sem acento sobre alocação acha a Aula 20', () => {
        assert.strictEqual(numeros('duvida em alocacao dinamica com malloc')[0], 20);
    });

    await teste('"aula 7" citada explicitamente vem primeiro', () => {
        assert.strictEqual(numeros('o que caiu na aula 7?')[0], 7);
    });

    await teste('código com scanf e vetor puxa Aulas 05 e 11', () => {
        const codigo = 'int notas[5];\nfor (int i = 0; i < 5; i++) scanf("%d", notas[i]);';
        const escolhidas = numeros('minha média está errada', codigo);
        assert.ok(escolhidas.includes(11) || escolhidas.includes(5), `escolhidas: ${escolhidas}`);
    });

    await teste('interpreta erro e aviso do GCC', () => {
        const saida = [
            "C:\\ex\\a.c: In function 'main':",
            "C:\\ex\\a.c:20:17: warning: format '%d' expects argument of type 'int *', but argument 2 has type 'int' [-Wformat=]",
            "C:\\ex\\a.c:7:5: error: expected ';' before 'return'",
            "C:\\ex\\a.c:14:9: note: 'notas' declared here",
        ].join('\r\n');
        const problemas = interpretarSaidaGcc(saida);
        assert.strictEqual(problemas.length, 3);
        assert.deepStrictEqual([problemas[0].linha, problemas[0].coluna, problemas[0].gravidade], [20, 17, 'warning']);
        assert.strictEqual(problemas[1].gravidade, 'error');
        assert.strictEqual(problemas[2].gravidade, 'note');
    });

    await teste('GCC real encontra o & faltando no exemplo', async () => {
        const problemas = await verificarComGcc('gcc', path.join(raiz, 'exemplos', 'exemplo_media_vetor.c'));
        assert.ok(problemas.some(p => p.linha === 20 && p.mensagem.includes("expects argument of type 'int *'")),
            JSON.stringify(problemas));
    });

    await teste('GCC ausente gera mensagem clara', async () => {
        await assert.rejects(verificarComGcc('gcc-que-nao-existe', path.join(raiz, 'exemplos', 'exemplo_media_vetor.c')), /GCC não encontrado/);
    });

    await teste('contexto inclui código numerado, erros e vídeos', () => {
        const contexto = montarContexto(material, selecionarAulas(material, 'scanf'), {
            nomeArquivo: 'ex.c',
            codigo: 'int main()\n{\n    return 0;\n}',
            problemas: ['Linha 3 (aviso): teste'],
        });
        assert.ok(contexto.includes('  3|     return 0;'));
        assert.ok(contexto.includes('Linha 3 (aviso): teste'));
        assert.ok(contexto.includes('ÍNDICE DAS VIDEOAULAS'));
        assert.ok(contexto.length < 120000, `contexto grande demais: ${contexto.length}`);
    });

    await teste('contexto inclui o enunciado do exercício e /verificar tem instrução', () => {
        const contexto = montarContexto(material, [], { exercicio: 'Leia 5 notas e mostre a média.' });
        assert.ok(contexto.includes('ENUNCIADO DO EXERCÍCIO'));
        assert.ok(contexto.includes('Leia 5 notas e mostre a média.'));
        assert.ok(instrucaoDoComando('verificar')?.includes('NÃO corrija'));
    });

    await teste('comparação de saída ignora mensagens e espaços', () => {
        assert.ok(saidaConfere('Digite a nota 1: Digite a nota 2: Soma: 15\r\nMedia: 7.50  \n', 'Soma: 15\nMedia: 7.50'));
        assert.ok(saidaConfere('Digite: Media:   7.50', 'Media: 7.50'));
        assert.ok(!saidaConfere('Media: 7.00', 'Media: 7.50'));
        assert.ok(saidaConfere('qualquer coisa', '   '));
        assert.ok(!saidaConfere('Soma: 40', 'Soma: 4'), 'não pode cortar número no meio');
        assert.ok(!saidaConfere('Media: 7.50', 'Media: 7'), 'não pode cortar a parte decimal');
        assert.ok(saidaConfere('Resultado: 12.', 'Resultado: 12'), 'ponto final de frase é aceito');
        assert.ok(saidaConfere('Digite:Soma: 4', 'Soma: 4'));
        assert.ok(saidaConfere('C[0] = 11\nC[1] = 22\nfim', '11\n22'), 'linhas em ordem, com texto entre elas');
        assert.ok(!saidaConfere('22\n11', '11\n22'), 'a ordem importa');
        assert.ok(saidaConfere('O numero e ÍMPAR', 'impar') && !saidaConfere('impar', 'par'), 'sem acento/maiúscula e sem cortar palavra');
        assert.ok(saidaConfere('Media: 8.500000', '8.5') && saidaConfere('Media = 8.50', '8.5') && !saidaConfere('Media: 8.56', '8.5'));
        assert.ok(saidaConfere('Raiz: 1.414214', '1.41') && saidaConfere('Total: 36.00', '36') && !saidaConfere('x2 = 3', '2'));
        assert.ok(saidaConfere('9-12 = -3', '-3') && !saidaConfere('9-12 = 3', '-12'));
        assert.strictEqual(normalizarSaida('\n\n a  b \r\n\n'), 'a b');
    });

    const pasta = fs.mkdtempSync(path.join(os.tmpdir(), 'tutor-testes-'));
    const programa = (nome: string, codigo: string) => {
        const arquivo = path.join(pasta, nome);
        fs.writeFileSync(arquivo, codigo);
        return arquivo;
    };
    const media = programa('media.c', `#include <stdio.h>
int main() {
    int a, b;
    printf("Digite dois numeros: ");
    scanf("%d %d", &a, &b);
    printf("Media: %.2f\\n", (a + b) / 2.0);
    return 0;
}`);

    await teste('roda casos: passa, falha e entrada vazia não trava', async () => {
        const r = await rodarCasos('gcc', media, [
            { entrada: '7 8', saidaEsperada: 'Media: 7.50' },
            { entrada: '7 8', saidaEsperada: 'Media: 8.00' },
            { entrada: '', saidaEsperada: 'Media' },
        ]);
        assert.ok(r.compilou, r.errosDeCompilacao.join('\n'));
        assert.deepStrictEqual(r.casos.map(c => c.situacao), ['passou', 'falhou', 'passou']);
        assert.ok(r.casos[1].saidaObtida.includes('Media: 7.50'));
    });

    await teste('programa com setbuf(stdin, NULL) recebe todas as linhas da entrada', async () => {
        const comSetbuf = programa('setbuf.c', `#include <stdio.h>
#include <string.h>
int main() {
    char nome[31]; int idade;
    for (int i = 0; i < 2; i++) {
        printf("Nome: "); fgets(nome, 31, stdin); nome[strcspn(nome, "\\n")] = 0;
        printf("Idade: "); scanf("%d", &idade); setbuf(stdin, NULL);
        printf("[%s tem %d]\\n", nome, idade);
    }
    return 0;
}`);
        const r = await rodarCasos('gcc', comSetbuf, [{ entrada: 'Ana\n20\nBruno\n30', saidaEsperada: '[Ana tem 20]\n[Bruno tem 30]' }]);
        assert.strictEqual(r.casos[0].situacao, 'passou', r.casos[0].saidaObtida);
    });

    await teste('laço infinito vira "tempo esgotado"', async () => {
        const laco = programa('laco.c', 'int main() { while (1) {} return 0; }');
        const inicio = Date.now();
        const r = await rodarCasos('gcc', laco, [{ entrada: '', saidaEsperada: 'x' }]);
        assert.strictEqual(r.casos[0].situacao, 'tempoEsgotado');
        assert.ok(Date.now() - inicio < 15000);
    });

    await teste('programa que trava vira "erro ao executar"', async () => {
        const trava = programa('trava.c', '#include <stdio.h>\nint main() { int *p = 0; *p = 5; printf("ok"); return 0; }');
        const r = await rodarCasos('gcc', trava, [{ entrada: '', saidaEsperada: 'ok' }]);
        assert.strictEqual(r.casos[0].situacao, 'erroDeExecucao', JSON.stringify(r.casos[0]));
    });

    await teste('erro de compilação é informado sem rodar os casos', async () => {
        const quebrado = programa('quebrado.c', 'int main() { int x = 1 return x; }');
        const r = await rodarCasos('gcc', quebrado, [{ entrada: '', saidaEsperada: '' }]);
        assert.strictEqual(r.compilou, false);
        assert.ok(r.errosDeCompilacao.some(e => e.includes('Linha 1')), r.errosDeCompilacao.join('\n'));
        assert.ok(resumirResultados([], r)[0].includes('não compilou'));
    });

    await teste('resumo para o tutor mostra entrada, esperado e obtido dos casos que falharam', async () => {
        const casos = [{ entrada: '7 8', saidaEsperada: 'Media: 8.00' }];
        const r = await rodarCasos('gcc', media, casos);
        const resumo = resumirResultados(casos, r).join('\n');
        assert.ok(resumo.includes('FALHOU') && resumo.includes('Media: 8.00') && resumo.includes('Media: 7.50'), resumo);
        assert.ok(montarContexto(material, [], { testes: resumirResultados(casos, r) }).includes('RESULTADO DOS CASOS DE TESTE'));
        assert.ok(instrucaoDoComando('teste'));
    });

    await teste('catálogo tem os exercícios das aulas e os links das videoaulas', () => {
        const cat = montarCatalogo(material, path.join(raiz, 'material'));
        assert.ok(cat.exercicios.length >= 60, `só ${cat.exercicios.length} exercícios`);
        const ex = cat.exercicios.find(e => e.id === 'aula11-ex4');
        assert.ok(ex && ex.tituloAula === 'Vetores' && ex.enunciado.includes('8 inteiros'), JSON.stringify(ex));
        assert.ok(!cat.exercicios.some(e => /`|\*\*\w+\*\*/.test(e.enunciado)), 'enunciado com marcação Markdown');
        assert.ok(cat.exercicios.find(e => e.id === 'aula19-ex6')?.enunciado.includes('int a, *b, **c, ***d;'), 'código do enunciado foi alterado');
        assert.ok(cat.exercicios.find(e => e.id === 'aula19-ex1')?.enunciado.includes('o maior endereço'), 'negrito não foi removido');
        assert.ok(cat.videos.get(11)?.startsWith('https://www.youtube.com/'));
        assert.strictEqual(aulaDoExercicio('aula11-ex4'), 11);
        const comCasos = cat.exercicios.filter(e => e.casosOficiais.length > 0);
        assert.strictEqual(comCasos.length, 41, 'exercícios com casos oficiais');
        assert.strictEqual(comCasos.reduce((n, e) => n + e.casosOficiais.length, 0), 64, 'total de casos oficiais');
        assert.deepStrictEqual(cat.exercicios.find(e => e.id === 'aula05-ex4')?.casosOficiais[0], { entrada: '7.5\n8\n9\n6.5', saidaEsperada: '7.75' });
    });

    await teste('enunciado colado é reconhecido entre os exercícios das aulas', () => {
        const cat = montarCatalogo(material, path.join(raiz, 'material'));
        // Só pode ficar sem reconhecer quem tem um gêmeo quase igual em outra
        // aula (as Aulas 08 e 10 repetem exercícios com for e com while).
        const temGemeo = (e: typeof cat.exercicios[0]) => cat.exercicios.some(o => o !== e && reconhecerExercicio(e.enunciado, [e, o]) === undefined);
        const naoReconhecidos = cat.exercicios.filter(e => reconhecerExercicio(e.enunciado, cat.exercicios)?.id !== e.id);
        assert.ok(naoReconhecidos.every(temGemeo), 'não reconhecidos: ' + naoReconhecidos.filter(e => !temGemeo(e)).map(e => e.id).join(', '));
        assert.ok(naoReconhecidos.length <= 8, `${naoReconhecidos.length} não reconhecidos`);
        // Com outra formatação, um prefixo e sem a última frase.
        const ex = cat.exercicios.find(e => e.id === 'aula11-ex4')!;
        const frases = ex.enunciado.split(/(?<=\.)\s+/);
        const colado = 'Exercício 4)\n' + (frases.length > 1 ? frases.slice(0, -1) : frases).join(' ').toUpperCase();
        assert.strictEqual(reconhecerExercicio(colado, cat.exercicios)?.id, 'aula11-ex4', colado);
        assert.strictEqual(reconhecerExercicio('Faça um programa que leia o nome do usuário e mostre uma saudação na tela.', cat.exercicios), undefined);
        assert.strictEqual(reconhecerExercicio('', cat.exercicios), undefined);
        assert.strictEqual(reconhecerExercicio(cat.exercicios.slice(0, 12).map(e => e.enunciado).join('\n'), cat.exercicios), undefined, 'vários enunciados juntos');
    });

    await teste('comentário do início do arquivo vira enunciado', () => {
        const bloco = '/*\n * Leia 5 notas, guarde em um vetor\n * e mostre a soma e a média.\n */\n#include <stdio.h>\nint main() { return 0; }';
        assert.strictEqual(comentarioInicial(bloco), 'Leia 5 notas, guarde em um vetor\ne mostre a soma e a média.');
        const barras = '// Exercício: leia um número inteiro e diga se ele é par ou ímpar\n#include <stdio.h>';
        assert.ok(comentarioInicial(barras)?.startsWith('Exercício: leia'));
        assert.strictEqual(comentarioInicial('// Felipe\n#include <stdio.h>'), undefined, 'comentário curto não é enunciado');
        assert.strictEqual(comentarioInicial('#include <stdio.h>\n/* leia 5 notas e mostre a soma e a média */'), undefined, 'só vale o comentário do começo');
    });

    await teste('sem enunciado, o tutor deduz o exercício pelo código', () => {
        const semEnunciado = montarContexto(material, [], { codigo: 'int main(){}', origemDoExercicio: 'codigo' });
        assert.ok(semEnunciado.includes('EXERCÍCIO NÃO INFORMADO') && semEnunciado.includes('Pelo seu código, parece'));
        const doComentario = montarContexto(material, [], { codigo: '/* x */', exercicio: 'Leia 5 notas', origemDoExercicio: 'comentario' });
        assert.ok(doComentario.includes('comentário no início do arquivo') && !doComentario.includes('NÃO INFORMADO'));
        const doAluno = montarContexto(material, [], { codigo: 'x', exercicio: 'Leia 5 notas', origemDoExercicio: 'aluno' });
        assert.ok(doAluno.includes('(informado pelo aluno)'));
    });

    await teste('dicas offline acham os erros clássicos sem falso positivo', () => {
        const codigo = [
            'int main() {',
            '  int x = 5, a = 1, b = 2; char nome[10]; float m; int v[5];',
            '  if (x = 3) {}',
            '  if (x > 3); { }',
            '  for (int i = 0; i < 5; i++); { }',
            '  do { x--; } while (x > 0);',
            '  if (0 < x < 10) {}',
            '  if (nome == "Ana") {}',
            '  m = a / b;',
            '  float k = (float)a / b;',
            '  m = x / 2.0;',
            '  for (int i = 0; i <= 5; i++) v[i] = 0;',
            '  if (a == b) {}',
            '  printf("if (x = 1)"); // if (y = 2)',
            '  return 0; }',
        ].join('\n');
        const achadas = analisarCodigo(codigo).map(d => `${d.linha}:${d.regra}`);
        assert.deepStrictEqual(achadas, [
            '3:atribuicao-na-condicao', '4:ponto-e-virgula-apos-if', '5:ponto-e-virgula-apos-for',
            '7:comparacao-encadeada', '8:string-com-igual', '9:divisao-inteira', '12:indice-ate-tamanho',
        ]);
    });

    await teste('dicas offline no exemplo apontam o laço e a divisão inteira', () => {
        const exemplo = fs.readFileSync(path.join(raiz, 'exemplos', 'exemplo_media_vetor.c'), 'utf8');
        assert.deepStrictEqual(analisarCodigo(exemplo).map(d => d.regra), ['indice-ate-tamanho', 'divisao-inteira']);
    });

    await teste('mensagens do GCC são traduzidas', () => {
        assert.strictEqual(traduzirMensagemGcc("format '%d' expects argument of type 'int *', but argument 2 has type 'int' [-Wformat=]")?.aula, 5);
        assert.ok(traduzirMensagemGcc("expected ';' before 'return'")?.texto.includes(';'));
        assert.ok(traduzirMensagemGcc("'soma' undeclared (first use in this function)")?.texto.includes('soma'));
        assert.ok(traduzirMensagemGcc("implicit declaration of function 'strlen'")?.texto.includes('#include'));
        assert.strictEqual(traduzirMensagemGcc('mensagem que ninguém conhece'), undefined);
    });

    await teste('previsão do aluno é comparada com a saída real', async () => {
        const casos = [
            { entrada: '7 8', saidaEsperada: 'Media: 7.50', previsao: 'Media: 7.50' },
            { entrada: '7 8', saidaEsperada: 'Media: 7.50', previsao: 'Media: 7' },
            { entrada: '7 8', saidaEsperada: 'Media: 7.50' },
        ];
        const r = await rodarCasos('gcc', media, casos);
        assert.deepStrictEqual(r.casos.map(c => c.previsaoCerta), [true, false, undefined]);
        assert.ok(resumirResultados(casos, r).join('\n').includes('Previsão do aluno (ERRADA)'));
    });

    await teste('comandos /explicar, /quiz e /depurar têm instruções', () => {
        for (const comando of ['explicar', 'quiz', 'depurar']) {
            assert.ok(instrucaoDoComando(comando), comando);
        }
    });

    await teste('código muito longo é cortado', () => {
        const longo = Array.from({ length: 500 }, (_, i) => `// linha ${i}`).join('\n');
        assert.ok(numerarLinhas(longo).includes('mostrando 400 de 500 linhas'));
    });

    // Pontos marcados no editor: bloco escondido no fim da resposta do tutor.
    const respostaComBloco = 'Encontrei **2 pontos**.\n\n🤔 O que o `scanf` precisa?\n<!--PONTOS\nresolvido: -\n20 | O que o scanf precisa antes da variável?\n17-18 | Quantas vezes esse laço repete?\n-->\n';

    await teste('o bloco PONTOS é tirado do texto mesmo chegando em pedaços', () => {
        for (let tamanho = 1; tamanho <= 12; tamanho++) {
            const filtro = new FiltroDoBloco();
            let visivel = '';
            for (let i = 0; i < respostaComBloco.length; i += tamanho) {
                visivel += filtro.empurrar(respostaComBloco.slice(i, i + tamanho));
            }
            const fim = filtro.terminar();
            visivel += fim.resto;
            assert.strictEqual(visivel, 'Encontrei **2 pontos**.\n\n🤔 O que o `scanf` precisa?\n', `pedaços de ${tamanho}`);
            assert.deepStrictEqual(fim.bloco, {
                resolvido: undefined,
                pontos: [
                    { linha: 20, ate: undefined, pergunta: 'O que o scanf precisa antes da variável?' },
                    { linha: 17, ate: 18, pergunta: 'Quantas vezes esse laço repete?' },
                ],
            }, `pedaços de ${tamanho}`);
        }
    });

    await teste('resposta sem bloco passa inteira, inclusive com "<" no texto', () => {
        const filtro = new FiltroDoBloco();
        const texto = 'Compare `i < 5` com `i <= 5`. E o <';
        const visivel = filtro.empurrar(texto) + filtro.terminar().resto;
        assert.strictEqual(visivel, texto);
        assert.strictEqual(new FiltroDoBloco().terminar().bloco, undefined);
    });

    await teste('bloco lê "resolvido" e aceita variações de escrita', () => {
        assert.strictEqual(lerBloco('\nresolvido: sim\n-->').resolvido, true);
        assert.strictEqual(lerBloco('\nresolvido: não\n-->').resolvido, false);
        assert.deepStrictEqual(lerBloco('\n- Linha 12 | Pergunta?\n0 | inválida\nsem número\n-->').pontos, [{ linha: 12, ate: undefined, pergunta: 'Pergunta?' }]);
        assert.deepStrictEqual(lerBloco('\nresolvido: -\n-->'), { resolvido: undefined, pontos: [] });
    });

    await teste('linha marcada acompanha as edições acima dela', () => {
        const editar = (inicio: number, fim: number, linhasNovas: number, noComecoDaLinha = false) => ({ inicio, fim, linhasNovas, noComecoDaLinha });
        assert.strictEqual(moverLinha(20, editar(5, 5, 2)), 22, 'Enter acima');
        assert.strictEqual(moverLinha(20, editar(5, 7, 0)), 18, 'linhas apagadas acima');
        assert.strictEqual(moverLinha(20, editar(20, 20, 0)), 20, 'edição na própria linha');
        assert.strictEqual(moverLinha(20, editar(20, 20, 1, true)), 21, 'Enter no começo da linha');
        assert.strictEqual(moverLinha(20, editar(25, 25, 3)), 20, 'edição abaixo');
        assert.strictEqual(moverLinha(20, editar(18, 22, 1)), 19, 'trecho em volta substituído');
    });

    await teste('/verificar pede os pontos do mais fácil ao mais difícil, e há o /proximo', () => {
        const verificar = instrucaoDoComando('verificar')!;
        assert.ok(verificar.includes('MAIS FÁCIL') && verificar.includes('<!--PONTOS'));
        assert.ok(verificar.includes('SÓ o primeiro ponto'));
        const proximo = instrucaoDoComando('proximo')!;
        assert.ok(proximo.includes('PONTOS EM ANDAMENTO') && proximo.includes('<!--PONTOS'));
        assert.ok(!instrucaoDoComando('pista')!.includes('<!--PONTOS'), 'a pista não mexe nas marcações');
    });

    await teste('regras pedem resposta formatada em Markdown', () => {
        assert.ok(REGRAS_DO_TUTOR.includes('FORMATO DA RESPOSTA'));
        assert.ok(REGRAS_DO_TUTOR.includes('`scanf`'), 'crases do template literal');
    });

    await teste('contexto mostra o ponto atual e os próximos', () => {
        const texto = montarContexto(material, [], {
            codigo: 'int main(){}',
            pontos: { resolvidos: 1, pontos: [{ linha: 18, pergunta: 'Até onde vai o laço?' }, { linha: 27, ate: 28, pergunta: 'Que tipo tem a divisão?' }] },
        });
        assert.ok(texto.includes('## PONTOS EM ANDAMENTO'));
        assert.ok(texto.includes('Ponto atual (2 de 3): linha 18: Até onde vai o laço?'));
        assert.ok(texto.includes('Depois: linha 27-28: Que tipo tem a divisão?'));
        assert.ok(!montarContexto(material, [], { codigo: 'x' }).includes('PONTOS EM ANDAMENTO'));
    });

    console.log(falhas === 0 ? '\nTodos os testes passaram.' : `\n${falhas} teste(s) falharam.`);
    process.exitCode = falhas === 0 ? 0 : 1;
})();
