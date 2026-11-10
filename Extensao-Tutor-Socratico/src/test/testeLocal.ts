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
import { carregarMaterial, ehProjetoRaylib, selecionarAulas } from '../material';
import { bibliotecasPadraoDaRaylib, explicarErroDeCompilacaoDoJogo, interpretarSaidaGcc, verificarComGcc } from '../gcc';
import { ATUALIZAR_DIARIO, CRITERIOS_DE_QUALIDADE, instrucaoDoComando, montarContexto, numerarLinhas, PROXIMO_NA_QUALIDADE, REGRAS_DO_TUTOR } from '../prompt';
import { cartaoDaNota, FiltroDoBloco, juntarEtapas, lerBloco, lerEtapas, moverLinha, pontosDoArquivo, semelhancaDeLinhas, somarNota } from '../pontos';
import { BRIEF_A_PREENCHER, ENUNCIADO_A_PREENCHER, montarCabecalho, montarComentarioDoEnunciado, temCabecalhoDoxygen, verificarIndentacao, verificarQualidade } from '../cabecalho';
import { limparCodigo } from '../didatico';
import { verificarMakefile } from '../makefile';
import { aplicarAtualizacao, atualizacaoVazia, diarioVazio, escreverDiario, gerarMapa, lerBlocoDiario, lerDiario, mapearArquivo } from '../diario';

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
    await teste('carrega as 21 aulas, o material da raylib e os índices', () => {
        assert.strictEqual(material.aulas.filter(a => a.modulo === 'aula').length, 21);
        assert.deepStrictEqual(material.aulas.filter(a => a.modulo === 'raylib').map(a => a.numero), [101, 102, 103, 104, 105, 106, 107]);
        assert.ok(material.indiceRaylib.includes('raylib 6.2'));
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

    // Qualidade do código: cabeçalho Doxygen, enunciado em comentário e indentação.
    const programaSimples = '#include <stdio.h>\n\nint main()\n{\n    int soma = 0;\n    return 0;\n}\n';
    const cabecalho = montarCabecalho({ arquivo: 'media.c', autor: 'Maria Silva', data: new Date(2026, 9, 30) });
    const enunciadoMedia = 'Faça um programaSimples que leia cinco notas de um aluno e mostre a média final.';
    const regras = (codigo: string) => verificarQualidade(codigo, limparCodigo(codigo)).map(p => p.regra);

    await teste('cabeçalho Doxygen no estilo do material (\\file, \\brief, \\author, \\date)', () => {
        assert.strictEqual(cabecalho, '/**\n * \\file media.c\n * \\brief ' + BRIEF_A_PREENCHER + '\n * \\author Maria Silva\n * \\date 30/10/2026\n */\n');
        assert.ok(montarComentarioDoEnunciado('linha 1\nfim */ aqui').includes(' * fim * / aqui'), 'o enunciado não pode fechar o comentário');
        assert.ok(montarComentarioDoEnunciado().includes(ENUNCIADO_A_PREENCHER));
    });

    await teste('o enunciado é lido do comentário abaixo do cabeçalho Doxygen', () => {
        const codigo = cabecalho + '\n' + montarComentarioDoEnunciado(enunciadoMedia) + '\n' + programaSimples;
        assert.ok(temCabecalhoDoxygen(codigo));
        assert.strictEqual(comentarioInicial(codigo), enunciadoMedia);
        assert.strictEqual(comentarioInicial(cabecalho + '\n' + programaSimples), undefined, 'só o cabeçalho não é enunciado');
        assert.strictEqual(comentarioInicial(cabecalho + '\n' + montarComentarioDoEnunciado() + programaSimples), undefined, 'o texto "cole aqui" não é enunciado');
        assert.strictEqual(comentarioInicial('// ' + enunciadoMedia + '\n' + programaSimples), enunciadoMedia, 'comentário de linha continua valendo');
    });

    await teste('avisos de cabeçalho: falta, incompleto, sem enunciado e completo', () => {
        assert.deepStrictEqual(regras(programaSimples), ['cabecalho-doxygen']);
        assert.deepStrictEqual(regras(cabecalho + programaSimples), ['cabecalho-incompleto']);
        const preenchido = cabecalho.replace(BRIEF_A_PREENCHER, 'Calcula a média de cinco notas.');
        assert.deepStrictEqual(regras(preenchido + programaSimples), ['enunciado-no-comentario']);
        assert.deepStrictEqual(regras(preenchido + montarComentarioDoEnunciado(enunciadoMedia) + programaSimples), []);
        assert.deepStrictEqual(regras('#include <stdio.h>\n'), [], 'arquivo sem main ainda não é cobrado');
        assert.deepStrictEqual(regras(preenchido + '// Maria Silva\n' + programaSimples), ['enunciado-no-comentario'], 'um nome solto não é o enunciado');
    });

    await teste('indentação: aponta a linha que não entrou no bloco, uma vez por bloco', () => {
        const torto = 'int main()\n{\nint x = 0;\nint y = 1;\n    if (x) {\n    y = 2;\n    }\n    switch (y) {\n    case 1:\n        break;\n    }\n}\n';
        const problemas = verificarIndentacao(limparCodigo(torto));
        assert.deepStrictEqual(problemas.map(p => p.linha), [3, 6]);
        assert.ok(problemas[0].mensagem.includes('aberto na linha 2'));
        const certo = 'int main() {\n\tint x = 0;\n\tif (x)\n\t{\n\t\tx++;\n\t}\n\treturn 0;\n}\n';
        assert.deepStrictEqual(verificarIndentacao(limparCodigo(certo)), []);
        const comentarioComChave = 'int main() {\n    /* { */\n    return 0;\n}\n';
        assert.deepStrictEqual(verificarIndentacao(limparCodigo(comentarioComChave)), [], 'chave em comentário não conta');
    });

    await teste('regras pedem qualidade do código, depois de o programaSimples funcionar', () => {
        assert.ok(REGRAS_DO_TUTOR.includes('QUALIDADE DO CÓDIGO'));
        assert.ok(REGRAS_DO_TUTOR.includes(' * \\file media.c'), 'modelo do cabeçalho com \\file');
        assert.ok(REGRAS_DO_TUTOR.includes('```c\n/**'), 'modelo em bloco de código');
        assert.ok(instrucaoDoComando('verificar')!.includes('por ÚLTIMO, os pontos de QUALIDADE'));
    });

    await teste('em qualidade o tutor responde direto e ensina os atalhos, sem mexer na lógica', () => {
        assert.ok(REGRAS_DO_TUTOR.includes('A única exceção é a QUALIDADE DO CÓDIGO'));
        assert.ok(REGRAS_DO_TUTOR.includes('você PODE e DEVE dar a resposta direta'));
        assert.ok(REGRAS_DO_TUTOR.includes('não mexa na lógica'));
        for (const atalho of ['Ctrl+Alt+H', 'doxy e apertar Tab', 'doxyf', 'Shift+Alt+F', 'F2']) {
            assert.ok(REGRAS_DO_TUTOR.includes(atalho), atalho);
        }
    });

    // Verificação de qualidade: nota de 0 a 1000 pela rubrica.
    const blocoDeQualidade = '\nresolvido: -\nnota: Cabeçalho e enunciado | 150 | 150\nnota: Indentação e espaçamento | 120 | 200\nnota: Nomes | 100 | 250\nnota: Comentários | 80 | 200\nnota: Organização | 150 | 200\n7 | Renomeie x para soma\n-->';

    await teste('bloco da qualidade traz a nota de cada critério da rubrica', () => {
        const bloco = lerBloco(blocoDeQualidade);
        assert.deepStrictEqual(bloco.criterios!.map(c => [c.nome, c.pontos, c.maximo]), [
            ['Cabeçalho e enunciado', 150, 150], ['Indentação e espaçamento', 120, 200], ['Nomes', 100, 250], ['Comentários', 80, 200], ['Organização', 150, 200]]);
        assert.deepStrictEqual(bloco.pontos, [{ linha: 7, ate: undefined, pergunta: 'Renomeie x para soma' }]);
        assert.deepStrictEqual(CRITERIOS_DE_QUALIDADE.map(c => c.nome), bloco.criterios!.map(c => c.nome), 'nomes iguais aos da rubrica');
        assert.strictEqual(CRITERIOS_DE_QUALIDADE.reduce((t, c) => t + c.maximo, 0), 1000);
        assert.strictEqual(lerBloco('\nnota: Nomes | 180/250\n-->').criterios![0].pontos, 180, 'aceita "180/250"');
    });

    await teste('a extensão soma a nota (e corrige pontos fora da faixa)', () => {
        assert.strictEqual(somarNota(lerBloco(blocoDeQualidade).criterios!), 600);
        assert.strictEqual(somarNota([{ nome: 'A', pontos: 999, maximo: 200 }, { nome: 'B', pontos: 0, maximo: 800 }]), 200, 'pontos acima do máximo');
        assert.strictEqual(somarNota([{ nome: 'A', pontos: 50, maximo: 100 }]), 500, 'rubrica incompleta vira escala de 1000');
        assert.strictEqual(somarNota([]), undefined);
    });

    await teste('cartão da nota mostra a faixa, a evolução e a tabela', () => {
        const criterios = lerBloco(blocoDeQualidade).criterios!;
        const cartao = cartaoDaNota(criterios, 450);
        assert.ok(cartao.startsWith('🏅 **Qualidade do código: 600 / 1000** (bom, mas dá para melhorar) · ⬆️ +150 desde a última verificação'), cartao);
        assert.ok(cartao.includes('| Nomes | 100 / 250 |'));
        assert.ok(cartaoDaNota(criterios, 700).includes('⬇️ -100'));
        assert.ok(!cartaoDaNota(criterios).includes('última verificação'), 'primeira nota não compara');
    });

    await teste('/qualidade avalia só a qualidade, com rubrica, nota e resposta direta', () => {
        const qualidade = instrucaoDoComando('qualidade')!;
        assert.ok(qualidade.includes('Avalie SÓ a qualidade') && qualidade.includes('NÃO a lógica'));
        assert.ok(qualidade.includes('RUBRICA DA NOTA DE QUALIDADE (total 1000)'));
        assert.ok(qualidade.includes('nota: NOME DO CRITÉRIO | PONTOS | MÁXIMO') && qualidade.includes('<!--PONTOS'));
        assert.ok(qualidade.includes('dê a resposta direta'));
        assert.ok(PROXIMO_NA_QUALIDADE.includes('nota: NOME DO CRITÉRIO') && !instrucaoDoComando('proximo')!.includes('RUBRICA'));
        const contexto = montarContexto(material, [], { codigo: 'x', pontos: { resolvidos: 0, tipo: 'qualidade', pontos: [{ linha: 3, pergunta: 'Renomeie x' }] } });
        assert.ok(contexto.includes('## PONTOS EM ANDAMENTO (da verificação de qualidade do código;'));
    });

    await teste('conferência no fim: o tutor recebe os pontos que o aluno diz ter feito', () => {
        assert.ok(instrucaoDoComando('qualidade')!.includes('comece com **Conferência:**'));
        const contexto = montarContexto(material, [], { codigo: 'x', pontos: { resolvidos: 2, tipo: 'qualidade', pontos: [], feitos: [{ linha: 3, pergunta: 'Renomeie x para soma' }, { linha: 9, ate: 12, pergunta: 'Indente o laço' }] } });
        assert.ok(contexto.includes('## PONTOS DE QUALIDADE QUE O ALUNO DIZ TER FEITO'));
        assert.ok(contexto.includes('- linha 3 (na época): Renomeie x para soma') && contexto.includes('- linha 9-12 (na época): Indente o laço'));
        assert.ok(!contexto.includes('## PONTOS EM ANDAMENTO'), 'nenhum ponto pendente');
    });

    await teste('snippets doxy e doxyf no estilo da Aula 16', () => {
        const snippets = JSON.parse(fs.readFileSync(path.join(raiz, 'snippets', 'c.json'), 'utf8'));
        const porPrefixo = (prefixo: string) => (Object.values(snippets) as { prefix: string; body: string[] }[]).find(s => s.prefix === prefixo)!;
        // No snippet, "\\\\" vira uma barra só ao inserir.
        assert.ok(porPrefixo('doxy').body.includes(' * \\\\file $TM_FILENAME'));
        assert.ok(porPrefixo('doxy').body.some(l => l.includes('Enunciado:')));
        assert.ok(porPrefixo('doxyf').body.some(l => l.startsWith(' * \\\\param')));
        assert.ok(porPrefixo('doxyf').body.some(l => l.startsWith(' * \\\\return')));
    });

    // Projeto final de Fundamentos 2: jogo com a raylib.
    const jogo = '#include "raylib.h"\nint main(void) {\n    InitWindow(800, 450, "Jogo");\n    while (!WindowShouldClose()) {\n        if (IsKeyDown(KEY_RIGHT)) x++;\n    }\n}\n';

    await teste('material da raylib tem as seções das aulas e cita a versão 6.2', () => {
        for (const parte of material.aulas.filter(a => a.modulo === 'raylib')) {
            for (const secao of ['## Objetivo', '## Conceitos-chave', '## Erros comuns e pontos de atenção', '## Perguntas socráticas sugeridas', '## Referências oficiais']) {
                assert.ok(parte.conteudo.includes(secao), `${parte.arquivo}: ${secao}`);
            }
            assert.ok(parte.conteudo.includes('6.2'), parte.arquivo);
            assert.ok(parte.titulo.startsWith('Raylib '), parte.titulo);
        }
    });

    await teste('o material da raylib só entra no projeto com raylib', () => {
        const numerosRaylib = (pergunta: string, codigo = '') => selecionarAulas(material, pergunta, codigo).map(a => a.numero).filter(n => n > 100);
        assert.deepStrictEqual(numerosRaylib('como faço a soma de dois números?'), [], 'soma não puxa o material de som');
        assert.deepStrictEqual(numerosRaylib('como fazer o jogo da velha com matriz?', 'int tabuleiro[3][3];'), []);
        assert.deepStrictEqual(numerosRaylib('meu laço for não para', 'for (i = 0; i < 10; i++) {}'), []);
        assert.ok(ehProjetoRaylib('', jogo) && ehProjetoRaylib('como uso a raylib?') && ehProjetoRaylib('o DrawTexture não mostra nada'));
        assert.ok(!ehProjetoRaylib('como uso o scanf?', 'int main() {}'));
    });

    await teste('dúvidas de raylib escolhem a parte certa do material', () => {
        const primeira = (pergunta: string, codigo = '') => selecionarAulas(material, pergunta, codigo)[0]?.numero;
        assert.strictEqual(primeira('o personagem anda só um passo quando aperto a seta, IsKeyPressed', jogo), 103);
        assert.strictEqual(primeira('deu undefined reference to InitWindow', jogo), 101);
        assert.strictEqual(primeira('como carregar uma textura png e fazer animacao do sprite?', jogo), 105);
        assert.strictEqual(primeira('como testar colisao entre o jogador e o inimigo com CheckCollisionRecs?', jogo), 104);
        assert.strictEqual(primeira('como faço o menu e o game over com enum?', jogo), 106);
        assert.ok(selecionarAulas(material, 'como mostrar o texto da pontuação na tela?', jogo).some(a => a.numero === 102));
        assert.ok(selecionarAulas(material, 'o que é isso?', jogo).some(a => a.numero === 101), 'qualquer dúvida no jogo traz os primeiros passos');
    });

    await teste('contexto do projeto com raylib: regras e índice só quando for o caso', () => {
        const comRaylib = montarContexto(material, [], { codigo: jogo, projetoRaylib: true });
        assert.ok(comRaylib.includes('## PROJETO FINAL COM A RAYLIB'));
        assert.ok(comRaylib.includes('LÓGICA DO JOGO') && comRaylib.includes('raylib 6.2'));
        assert.ok(comRaylib.includes('Índice do material da raylib'));
        assert.ok(!montarContexto(material, [], { codigo: 'int main() {}' }).includes('RAYLIB'));
    });

    await teste('erros ao compilar o jogo são explicados', () => {
        assert.ok(explicarErroDeCompilacaoDoJogo('jogo.c:1:10: fatal error: raylib.h: No such file or directory')!.includes('não encontrou a raylib'));
        assert.ok(explicarErroDeCompilacaoDoJogo("ld.exe: jogo.o: in function main: jogo.c:(.text+0x1a): undefined reference to `InitWindow'")!.includes('faltou ligar a raylib'));
        assert.ok(explicarErroDeCompilacaoDoJogo("undefined reference to `moverJogador'")!.includes('compilado junto'));
        assert.ok(explicarErroDeCompilacaoDoJogo('ld.exe: cannot find -lraylib')!.includes('arquivo da biblioteca'));
        assert.ok(explicarErroDeCompilacaoDoJogo('ld.exe: cannot open output file jogo.exe: Permission denied')!.includes('Feche a janela do jogo'));
        assert.strictEqual(explicarErroDeCompilacaoDoJogo('jogo.c:5:3: error: expected \';\' before \'}\' token'), undefined);
        assert.deepStrictEqual(bibliotecasPadraoDaRaylib('win32'), ['-lraylib', '-lopengl32', '-lgdi32', '-lwinmm']);
        assert.deepStrictEqual(bibliotecasPadraoDaRaylib('linux'), ['-lraylib', '-lm']);
        assert.ok(traduzirMensagemGcc('raylib.h: No such file or directory')!.texto.includes('MSYS2'));
    });

    // Compilação manual e Makefile (requisito do projeto final).
    await teste('Makefile: aponta só as linhas de comando que começam com espaços', () => {
        const makefile = [
            'CC = gcc',
            'CFLAGS = -IC:/raylib/src',
            'jogo.exe: main.o',
            '    gcc main.o -o jogo.exe',
            '\t$(CC) ok',
            '%.o: %.c',
            '\t$(CC) -c $< \\',
            '    -o $@',
            'ifeq ($(shell echo %OS%),Windows_NT)',
            '    RM = del /Q',
            'endif',
            'clean:',
            '  rm -f x',
            'X := a:b',
            '    continua sem regra',
        ].join('\n');
        assert.deepStrictEqual(verificarMakefile(makefile).map(p => [p.linha, p.espacos]), [[4, 4], [13, 2]]);
        assert.ok(verificarMakefile(makefile)[0].mensagem.includes('missing separator'));
        const modelo = fs.readFileSync(path.join(raiz, 'material', 'raylib', 'Raylib_07_Compilacao_e_Makefile.md'), 'utf8')
            .match(/```makefile\r?\n([\s\S]*?)```/)![1].replace(/^  /gm, '');
        assert.deepStrictEqual(verificarMakefile(modelo), [], 'o Makefile modelo do material não tem problemas');
        assert.strictEqual(modelo.split('\n').filter(l => l.startsWith('\t')).length, 4, 'as 4 linhas de comando do modelo começam com TAB');
    });

    await teste('dúvidas de compilação e Makefile escolhem o material Raylib 7', () => {
        const primeira = (pergunta: string, codigo = '') => selecionarAulas(material, pergunta, codigo)[0]?.numero;
        assert.strictEqual(primeira('como faço o makefile do meu projeto?'), 107);
        assert.strictEqual(primeira('deu missing separator no make'), 107);
        assert.strictEqual(primeira('o que faz o gcc -c no terminal?', jogo), 107);
        assert.ok(ehProjetoRaylib('No rule to make target jogador.c') && ehProjetoRaylib('uso mingw32-make?'));
        assert.ok(!ehProjetoRaylib('como faço para o programa somar?'));
    });

    await teste('o tutor recebe o Makefile do projeto, com os TABs visíveis, e a regra de ajuda', () => {
        const contexto = montarContexto(material, [], { codigo: jogo, projetoRaylib: true, makefile: { nome: 'Makefile', texto: 'all: jogo.exe\n\tgcc main.c -o jogo.exe\n    gcc errado' } });
        assert.ok(contexto.includes('## MAKEFILE DO PROJETO (Makefile;'));
        assert.ok(contexto.includes('  2| →   gcc main.c') && contexto.includes('  3|     gcc errado'), 'TAB aparece como seta, espaços continuam espaços');
        assert.ok(contexto.includes('MODELO GENÉRICO') && contexto.includes('tarefa do aluno'));
    });

    // Projeto do jogo: plano escrito pelo aluno e etapas de desenvolvimento.
    const respostaComEtapas = 'Ótimo plano! Vamos por etapas:\n1. Janela...\n<!--ETAPAS\n- [ ] Abrir a janela e o laço do jogo\n2. Mover a nave com as setas\nTiros com a barra de espaço\n\n-->\n';

    await teste('bloco ETAPAS é tirado do texto e vira a lista de etapas', () => {
        for (let tamanho = 1; tamanho <= 9; tamanho++) {
            const filtro = new FiltroDoBloco();
            let visivel = '';
            for (let i = 0; i < respostaComEtapas.length; i += tamanho) {
                visivel += filtro.empurrar(respostaComEtapas.slice(i, i + tamanho));
            }
            const fim = filtro.terminar();
            assert.strictEqual(visivel + fim.resto, 'Ótimo plano! Vamos por etapas:\n1. Janela...\n', `pedaços de ${tamanho}`);
            assert.strictEqual(fim.bloco, undefined, 'ETAPAS não é bloco de PONTOS');
            assert.deepStrictEqual(fim.etapas!.map(e => e.texto), ['Abrir a janela e o laço do jogo', 'Mover a nave com as setas', 'Tiros com a barra de espaço']);
        }
        assert.strictEqual(lerEtapas(Array.from({ length: 20 }, (_, i) => `etapa ${i}`).join('\n')).length, 12, 'no máximo 12 etapas');
    });

    await teste('refazer as etapas mantém marcadas as que já estavam feitas', () => {
        const antigas = [{ texto: 'Abrir a janela', feita: true }, { texto: 'Mover o jogador', feita: false }];
        const novas = lerEtapas('abrir a janela\nMover o jogador com WASD\nColisões');
        assert.deepStrictEqual(juntarEtapas(antigas, novas).map(e => e.feita), [true, false, false]);
    });

    await teste('/plano e /passo: etapas pequenas, sem escrever o código do jogo', () => {
        const plano = instrucaoDoComando('plano')!;
        assert.ok(plano.includes('<!--ETAPAS') && plano.includes('versão mínima jogável') && plano.includes('Não escreva o código do jogo'));
        const passo = instrucaoDoComando('passo')!;
        assert.ok(passo.includes('ETAPA ATUAL') && passo.includes('Não escreva o código da etapa'));
    });

    await teste('contexto do jogo: o plano faz o papel do enunciado e a etapa atual fica marcada', () => {
        const contexto = montarContexto(material, [], {
            codigo: jogo, projetoRaylib: true,
            jogo: { plano: 'Nave que desvia de asteroides', etapas: [{ texto: 'Janela', feita: true }, { texto: 'Mover a nave', feita: false }, { texto: 'Asteroides', feita: false }] },
        });
        assert.ok(contexto.includes('## PLANO DO JOGO') && contexto.includes('Nave que desvia de asteroides'));
        assert.ok(contexto.includes('✅ 1. Janela') && contexto.includes('⬜ 2. Mover a nave  ← ETAPA ATUAL') && !contexto.includes('3. Asteroides  ←'));
        assert.ok(!contexto.includes('EXERCÍCIO NÃO INFORMADO'), 'no jogo não se deduz exercício');
        assert.ok(contexto.includes('PLANO DO JOGO: se houver'));
        const semPlano = montarContexto(material, [], { codigo: jogo, projetoRaylib: true, jogo: { plano: '', etapas: [] } });
        assert.ok(semPlano.includes('ainda não escreveu o plano') && !semPlano.includes('## ETAPAS DO DESENVOLVIMENTO'));
    });

    // Save do projeto do jogo: projeto-do-jogo.md.
    await teste('projeto-do-jogo.md: escreve e lê de volta igual, e guarda seções do aluno', () => {
        const diario = { ...diarioVazio(), plano: 'Nave que desvia.\nTeclas: setas.', etapas: [{ texto: 'Janela', feita: true }, { texto: 'Mover', feita: false }],
            ondeParei: 'Nave anda.', decisoes: ['struct Nave em nave.h'], problemas: ['sai da tela'], historico: ['2026-11-03: janela'],
            outras: [{ titulo: 'Ideias para depois', texto: '- chefão no fim' }] };
        const md = escreverDiario(diario, '- `main.c`: funções `main`');
        assert.deepStrictEqual(lerDiario(md), diario);
        assert.ok(md.includes('## Mapa do código') && md.indexOf('## Ideias para depois') < md.indexOf('## Mapa do código'));
        const editadoAMao = md.replace('- [ ] Mover', '- [X] Mover').replace('## Decisões', '## decisoes');
        assert.deepStrictEqual(lerDiario(editadoAMao).etapas.map(e => e.feita), [true, true], '[X] maiúsculo também marca');
        assert.deepStrictEqual(lerDiario(editadoAMao).decisoes, ['struct Nave em nave.h'], 'título sem acento também vale');
        assert.deepStrictEqual(lerDiario(escreverDiario(diarioVazio())), diarioVazio(), 'as dicas (comentários) não viram conteúdo');
    });

    await teste('bloco DIARIO: troca "onde parei", acrescenta sem repetir e tira o problema resolvido', () => {
        const bloco = lerBlocoDiario('\nonde parei: Nave anda; falta a borda.\ndecisão: struct Nave em nave.h\nproblema: A nave sai da tela pela direita\nhistórico: movimento com as setas\n-->');
        assert.ok(!atualizacaoVazia(bloco) && atualizacaoVazia(lerBlocoDiario('\n-->')));
        let diario = aplicarAtualizacao({ ...diarioVazio(), decisoes: ['Struct Nave em nave.h'] }, bloco, new Date(2026, 10, 3));
        assert.strictEqual(diario.ondeParei, 'Nave anda; falta a borda.');
        assert.deepStrictEqual(diario.decisoes, ['Struct Nave em nave.h'], 'decisão repetida não entra de novo');
        assert.deepStrictEqual(diario.historico, ['2026-11-03: movimento com as setas']);
        diario = aplicarAtualizacao(diario, lerBlocoDiario('resolvido: a nave sai da tela\n-->'), new Date(2026, 10, 4));
        assert.deepStrictEqual(diario.problemas, [], 'resolvido tira o problema parecido');
        assert.strictEqual(diario.ondeParei, 'Nave anda; falta a borda.', 'sem "onde parei" novo, fica o antigo');
    });

    await teste('mapa do código: arquivos, includes do projeto, tipos, enums e funções (sem as chamadas)', () => {
        const arquivos = [
            { nome: 'main.c', texto: '#include "raylib.h"\n#include "nave.h"\n/* void Falsa(void) { } */\nint main(void)\n{\n    int x = Somar(2, 3);\n    if (x) { MoverNave(&nave); }\n    return 0;\n}\nstatic float Somar(int a, int b) { return a + b; }\n' },
            { nome: 'nave.h', texto: '#ifndef NAVE_H\n#define NAVE_H\ntypedef struct { float x, y; int vidas; } Nave;\ntypedef enum { TELA_MENU, TELA_JOGO = 1, TELA_FIM } Tela;\nvoid MoverNave(Nave *nave);\n#endif\n' },
        ];
        const main = mapearArquivo(arquivos[0]);
        assert.deepStrictEqual(main.funcoes, ['main', 'Somar'], 'comentário e chamadas não contam');
        const nave = mapearArquivo(arquivos[1]);
        assert.deepStrictEqual([nave.tipos, nave.prototipos, nave.enums], [['Nave', 'Tela'].slice(0, 1), ['MoverNave'], [{ nome: 'Tela', valores: ['TELA_MENU', 'TELA_JOGO', 'TELA_FIM'] }]]);
        const mapa = gerarMapa(arquivos);
        assert.ok(mapa.startsWith('- `nave.h`'), '.h primeiro');
        assert.ok(mapa.includes('- `main.c`: inclui `nave.h`; funções `main`, `Somar`'), mapa);
        assert.ok(!mapa.includes('raylib_h'), 'raylib.h não é arquivo do projeto');
        assert.ok(mapa.includes('```mermaid\ngraph LR\n    main_c["main.c"] --> nave_h["nave.h"]'));
        assert.strictEqual(gerarMapa([]), '');
    });

    await teste('vários blocos na mesma resposta (PONTOS + DIARIO), mesmo em pedaços', () => {
        const resposta = 'Veja a linha 5.\n<!--PONTOS\nresolvido: -\n5 | Onde a nave para?\n-->\n<!--DIARIO\nonde parei: falta a borda\n-->';
        for (let tamanho = 1; tamanho <= 7; tamanho++) {
            const filtro = new FiltroDoBloco();
            let visivel = '';
            for (let i = 0; i < resposta.length; i += tamanho) {
                visivel += filtro.empurrar(resposta.slice(i, i + tamanho));
            }
            const fim = filtro.terminar();
            assert.strictEqual(visivel + fim.resto, 'Veja a linha 5.\n', `pedaços de ${tamanho}`);
            assert.strictEqual(fim.bloco!.pontos[0].linha, 5);
            assert.strictEqual(lerBlocoDiario(fim.diario!).ondeParei, 'falta a borda');
        }
    });

    await teste('tutor recebe o diário e o mapa, e /salvar exige o bloco DIARIO', () => {
        const contexto = montarContexto(material, [], { codigo: jogo, projetoRaylib: true, jogo: {
            plano: 'Nave', etapas: [], ondeParei: 'Nave anda; falta a borda.', decisoes: ['struct Nave em nave.h'], problemas: ['sai da tela'],
            historico: Array.from({ length: 12 }, (_, i) => `dia ${i}`), mapa: '- `main.c`: funções `main`' } });
        assert.ok(contexto.includes('## DIÁRIO DO PROJETO') && contexto.includes('### Onde o aluno parou\nNave anda; falta a borda.'));
        assert.ok(contexto.includes('não as contradiga') && contexto.includes('- sai da tela'));
        assert.ok(contexto.includes('- dia 11') && !contexto.includes('- dia 3\n'), 'só os últimos registros do histórico');
        assert.ok(contexto.includes('## MAPA DO CÓDIGO'));
        assert.ok(ATUALIZAR_DIARIO.includes('<!--DIARIO') && ATUALIZAR_DIARIO.includes('retome a partir dali'));
        assert.ok(instrucaoDoComando('salvar')!.includes('OBRIGATÓRIO'));
    });

    // Bugs achados no teste com o Copilot (03/11/2026).
    await teste('pontos com o nome do arquivo são lidos, e os de outros arquivos não são marcados', () => {
        const bloco = lerBloco('\nresolvido: -\nMakefile:2 | A linha começa com TAB?\nmain.c:16 | IsKeyPressed anda só um passo?\n`main.c` linha 19 | Carregar a textura no laço?\n22 | Sem arquivo\n-->');
        assert.deepStrictEqual(bloco.pontos.map(p => [p.arquivo, p.linha]), [['Makefile', 2], ['main.c', 16], ['main.c', 19], [undefined, 22]]);
        assert.deepStrictEqual(pontosDoArquivo(bloco.pontos, 'main.c').map(p => p.linha), [16, 19, 22], 'o ponto do Makefile não marca o main.c');
        assert.deepStrictEqual(pontosDoArquivo(bloco.pontos, 'MAIN.C').map(p => p.linha), [16, 19, 22], 'sem diferenciar maiúsculas');
        assert.strictEqual(lerBloco(Array.from({ length: 12 }, (_, i) => `${i + 1} | p${i}`).join('\n')).pontos.length, 8, 'no máximo 8');
    });

    await teste('semelhança de linhas para reencontrar a marcação depois de edições grandes', () => {
        assert.strictEqual(semelhancaDeLinhas('  scanf("%d", x);', 'scanf("%d", x);'), 1, 'recuo não conta');
        assert.ok(semelhancaDeLinhas('scanf("%d", notas[i]);', 'scanf("%d", &notas[i]);') > 0.9);
        assert.ok(semelhancaDeLinhas('scanf("%d", notas[i]);', 'soma = soma + notas[i];') < 0.6);
        assert.strictEqual(semelhancaDeLinhas('', 'x'), 0);
    });

    await teste('instruções: marcar só o código aberto e raylib ausente não é erro do código', () => {
        const verificar = instrucaoDoComando('verificar')!;
        assert.ok(verificar.includes('NÃO entram no bloco') && verificar.includes('no máximo 8') && verificar.includes('sem o nome do arquivo'));
        const contexto = montarContexto(material, [], { codigo: jogo, projetoRaylib: true });
        assert.ok(contexto.includes('problema de INSTALAÇÃO neste computador'));
    });

    console.log(falhas === 0 ? '\nTodos os testes passaram.' : `\n${falhas} teste(s) falharam.`);
    process.exitCode = falhas === 0 ? 0 : 1;
})();
