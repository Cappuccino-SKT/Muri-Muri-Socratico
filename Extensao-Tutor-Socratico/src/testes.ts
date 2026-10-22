// Casos de teste do exercício: compila o programa do aluno, executa cada caso
// com a entrada informada e compara a saída. Não depende da API do VS Code.
import { execFile, spawn } from 'child_process';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { interpretarSaidaGcc } from './gcc';

export interface CasoDeTeste {
    entrada: string;
    saidaEsperada: string;
    /** O que o aluno acha que o programa vai mostrar (teste de mesa). Opcional. */
    previsao?: string;
}

export type SituacaoDoCaso = 'passou' | 'falhou' | 'tempoEsgotado' | 'erroDeExecucao';

export interface ResultadoDoCaso {
    situacao: SituacaoDoCaso;
    saidaObtida: string;
    codigoDeSaida: number | null;
    detalhe?: string;
    /** Só existe quando o aluno escreveu uma previsão para o caso. */
    previsaoCerta?: boolean;
}

export interface ResultadoDosTestes {
    compilou: boolean;
    errosDeCompilacao: string[];
    casos: ResultadoDoCaso[];
}

const LIMITE_DE_SAIDA = 64 * 1024;
const TEMPO_POR_CASO_MS = 3000;

/**
 * Normaliza para comparar: ignora \r, espaços no fim das linhas, espaços
 * repetidos e linhas em branco no começo e no fim.
 */
export function normalizarSaida(texto: string): string {
    return texto
        .replace(/\r/g, '')
        .split('\n')
        .map(linha => linha.replace(/[ \t]+/g, ' ').trim())
        .join('\n')
        .replace(/^\n+|\n+$/g, '');
}

/**
 * O caso passa se cada linha da saída esperada aparece na saída do programa,
 * na mesma ordem (pode haver outros textos entre elas, como "Digite a nota:").
 * Maiúsculas e acentos são ignorados, e uma linha que é só um número confere
 * pelo valor: "8.5" aceita "8.50" e "8.500000".
 */
export function saidaConfere(obtida: string, esperada: string): boolean {
    const linhas = normalizarSaida(esperada).split('\n').filter(linha => linha.length > 0);
    if (linhas.length === 0) {
        return true;
    }
    const saida = simplificar(normalizarSaida(obtida));
    let posicao = 0;
    for (const linha of linhas) {
        const fim = procurar(saida, simplificar(linha), posicao);
        if (fim < 0) {
            return false;
        }
        posicao = fim;
    }
    return true;
}

/** Sem acentos e em minúsculas, para "Ímpar" conferir com "impar". */
function simplificar(texto: string): string {
    return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

const ehLetraOuNumero = (c: string | undefined) => !!c && /[\p{L}\p{N}_]/u.test(c);
const NUMERO = /^[-+]?\d+(?:[.,]\d+)?$/;

/** Procura `alvo` a partir de `desde`; devolve onde a ocorrência termina, ou -1. */
function procurar(texto: string, alvo: string, desde: number): number {
    return NUMERO.test(alvo) ? procurarNumero(texto, alvo, desde) : procurarTexto(texto, alvo, desde);
}

/**
 * Procura `alvo` sem cortar números ou palavras no meio:
 * "Soma: 4" não confere com "Soma: 40", nem "Media: 7" com "Media: 7.50".
 */
function procurarTexto(texto: string, alvo: string, desde: number): number {
    for (let i = texto.indexOf(alvo, desde); i >= 0; i = texto.indexOf(alvo, i + 1)) {
        const depois = texto[i + alvo.length];
        const cortaAntes = ehLetraOuNumero(texto[i - 1]) && ehLetraOuNumero(alvo[0]);
        const cortaDepois = ehLetraOuNumero(alvo[alvo.length - 1])
            && (ehLetraOuNumero(depois) || ((depois === '.' || depois === ',') && /\d/.test(texto[i + alvo.length + 1] ?? '')));
        if (!cortaAntes && !cortaDepois) {
            return i + alvo.length;
        }
    }
    return -1;
}

/** Procura um número de mesmo valor, respeitando as casas decimais do esperado. */
function procurarNumero(texto: string, alvo: string, desde: number): number {
    const valor = Number(alvo.replace(',', '.'));
    const casas = (alvo.split(/[.,]/)[1] ?? '').length;
    const tolerancia = casas > 0 ? 0.5 * 10 ** -casas + 1e-9 : 1e-9;
    const numeros = /[-+]?\d+(?:[.,]\d+)?/g;
    numeros.lastIndex = desde;
    for (let m = numeros.exec(texto); m; m = numeros.exec(texto)) {
        let encontrado = m[0];
        let inicio = m.index;
        // "9-12" são dois números (9 e 12), não 9 e -12; "x2" não é o número 2.
        if (/^[-+]/.test(encontrado) && /[\p{L}\p{N}_)\]]/u.test(texto[inicio - 1] ?? '')) {
            encontrado = encontrado.slice(1);
            inicio++;
        }
        if (ehLetraOuNumero(texto[inicio - 1]) && !/^[-+]/.test(encontrado)) {
            continue;
        }
        if (Math.abs(Number(encontrado.replace(',', '.')) - valor) <= tolerancia) {
            return m.index + m[0].length;
        }
    }
    return -1;
}

export function executavelTemporario(arquivoFonte: string): string {
    const pasta = path.join(os.tmpdir(), 'tutor-socratico');
    fs.mkdirSync(pasta, { recursive: true });
    const hash = crypto.createHash('sha1').update(path.resolve(arquivoFonte).toLowerCase()).digest('hex').slice(0, 12);
    const nome = `${path.basename(arquivoFonte, path.extname(arquivoFonte))}-${hash}`;
    return path.join(pasta, process.platform === 'win32' ? `${nome}.exe` : nome);
}

export function compilarPrograma(caminhoGcc: string, arquivoFonte: string, executavel: string): Promise<{ ok: boolean; erros: string[] }> {
    const args = ['-std=c11', '-fdiagnostics-color=never', arquivoFonte, '-o', executavel, '-lm'];
    return new Promise((resolve, reject) => {
        execFile(caminhoGcc, args, { cwd: path.dirname(arquivoFonte), timeout: 30000, windowsHide: true }, (erro, _stdout, stderr) => {
            if (erro && (erro as NodeJS.ErrnoException).code === 'ENOENT') {
                reject(new Error(`GCC não encontrado ("${caminhoGcc}"). Instale o GCC ou ajuste a configuração tutorSocratico.caminhoGcc.`));
                return;
            }
            const erros = interpretarSaidaGcc(stderr)
                .filter(p => p.gravidade === 'error')
                .map(p => `Linha ${p.linha}: ${p.mensagem}`);
            resolve({ ok: !erro, erros: erros.length > 0 || !erro ? erros : [stderr.trim() || 'Falha ao compilar.'] });
        });
    });
}

// Intervalo entre as linhas da entrada, para imitar alguém digitando.
const ATRASO_ENTRE_LINHAS_MS = 40;

export function executarCaso(executavel: string, entrada: string, cwd: string, tempoMs = TEMPO_POR_CASO_MS): Promise<Omit<ResultadoDoCaso, 'situacao'> & { esgotou: boolean }> {
    const texto = entrada.replace(/\r/g, '');
    const linhas = texto === '' ? [] : (texto.endsWith('\n') ? texto.slice(0, -1) : texto).split('\n');
    return new Promise(resolve => {
        const processo = spawn(executavel, [], { cwd, windowsHide: true });
        let saida = '';
        let esgotou = false;
        let terminou = false;

        const finalizar = (codigo: number | null, detalhe?: string) => {
            if (terminou) {
                return;
            }
            terminou = true;
            clearTimeout(relogio);
            resolve({ saidaObtida: saida, codigoDeSaida: codigo, esgotou, detalhe });
        };

        const relogio = setTimeout(() => {
            esgotou = true;
            processo.kill();
            finalizar(null);
        }, tempoMs + linhas.length * ATRASO_ENTRE_LINHAS_MS);

        const coletar = (dados: Buffer) => {
            if (saida.length < LIMITE_DE_SAIDA) {
                saida += dados.toString('utf8');
                if (saida.length >= LIMITE_DE_SAIDA) {
                    saida = saida.slice(0, LIMITE_DE_SAIDA) + '\n... (saída cortada)';
                }
            }
        };
        processo.stdout.on('data', coletar);
        processo.stderr.on('data', coletar);
        processo.on('error', erro => finalizar(null, erro.message));
        processo.on('close', codigo => finalizar(codigo));

        processo.stdin.on('error', () => { /* o programa terminou antes de ler toda a entrada */ });
        // Envia uma linha por vez, como se fosse digitada. Se tudo chegasse de uma
        // vez, um setbuf(stdin, NULL) (usado na disciplina para limpar o buffer)
        // descartaria também as linhas seguintes da entrada.
        const enviarLinha = (i: number) => {
            if (terminou || processo.stdin.destroyed) {
                return;
            }
            if (i >= linhas.length) {
                processo.stdin.end();
                return;
            }
            processo.stdin.write(linhas[i] + '\n');
            setTimeout(() => enviarLinha(i + 1), ATRASO_ENTRE_LINHAS_MS);
        };
        enviarLinha(0);
    });
}

export function situacaoDoCaso(execucao: { esgotou: boolean; codigoDeSaida: number | null; saidaObtida: string; detalhe?: string }, esperada: string): { situacao: SituacaoDoCaso; detalhe?: string } {
    if (execucao.esgotou) {
        return {
            situacao: 'tempoEsgotado',
            detalhe: 'O programa não terminou a tempo (3 segundos): ele pode estar preso em um laço infinito, por exemplo um laço que repete a leitura quando a entrada acaba ou é inválida. Confira também se a entrada do caso tem todos os valores que o programa lê.',
        };
    }
    if (execucao.detalhe) {
        return { situacao: 'erroDeExecucao', detalhe: execucao.detalhe };
    }
    if (execucao.codigoDeSaida !== 0) {
        return {
            situacao: 'erroDeExecucao',
            detalhe: `O programa terminou com código ${execucao.codigoDeSaida}${execucao.codigoDeSaida !== null && execucao.codigoDeSaida > 255 ? ' (ele travou: possível acesso fora de um vetor ou ponteiro inválido)' : ''}.`,
        };
    }
    return { situacao: saidaConfere(execucao.saidaObtida, esperada) ? 'passou' : 'falhou' };
}

export async function rodarCasos(caminhoGcc: string, arquivoFonte: string, casos: CasoDeTeste[]): Promise<ResultadoDosTestes> {
    const executavel = executavelTemporario(arquivoFonte);
    const compilacao = await compilarPrograma(caminhoGcc, arquivoFonte, executavel);
    if (!compilacao.ok) {
        return { compilou: false, errosDeCompilacao: compilacao.erros, casos: [] };
    }
    const resultados: ResultadoDoCaso[] = [];
    for (const caso of casos) {
        const execucao = await executarCaso(executavel, caso.entrada, path.dirname(arquivoFonte));
        const { situacao, detalhe } = situacaoDoCaso(execucao, caso.saidaEsperada);
        const previsao = caso.previsao?.trim();
        resultados.push({
            situacao,
            saidaObtida: execucao.saidaObtida,
            codigoDeSaida: execucao.codigoDeSaida,
            detalhe,
            ...(previsao ? { previsaoCerta: !execucao.esgotou && saidaConfere(execucao.saidaObtida, previsao) } : {}),
        });
    }
    return { compilou: true, errosDeCompilacao: [], casos: resultados };
}

/** Resumo em texto para o tutor (vai no contexto do chat). */
export function resumirResultados(casos: CasoDeTeste[], resultado: ResultadoDosTestes): string[] {
    if (!resultado.compilou) {
        return ['O programa não compilou ao rodar os testes:', ...resultado.errosDeCompilacao];
    }
    return resultado.casos.map((r, i) => {
        const caso = casos[i];
        const titulo = `Caso ${i + 1}: ${r.situacao === 'passou' ? 'PASSOU' : r.situacao === 'falhou' ? 'FALHOU' : r.situacao === 'tempoEsgotado' ? 'TEMPO ESGOTADO' : 'ERRO DE EXECUÇÃO'}`;
        const previsao = caso?.previsao?.trim()
            ? `  Previsão do aluno (${r.previsaoCerta ? 'CERTA' : 'ERRADA'}): ${JSON.stringify(caso.previsao)}`
            : '';
        if (r.situacao === 'passou') {
            return [titulo, previsao].filter(Boolean).join('\n');
        }
        return [
            titulo,
            previsao,
            `  Entrada: ${JSON.stringify(caso?.entrada ?? '')}`,
            `  Saída esperada (deve aparecer na saída): ${JSON.stringify(caso?.saidaEsperada ?? '')}`,
            `  Saída obtida: ${JSON.stringify(r.saidaObtida.slice(0, 2000))}`,
            r.detalhe ? `  Observação: ${r.detalhe}` : '',
        ].filter(Boolean).join('\n');
    });
}
