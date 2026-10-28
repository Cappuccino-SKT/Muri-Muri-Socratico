// Descobre o exercício sem o aluno escolher de uma lista: reconhece o
// enunciado colado entre os exercícios das aulas e lê o comentário do início
// do arquivo quando não há enunciado. Não depende da API do VS Code.
import { ExercicioDoCatalogo } from './catalogo';

// Palavras que aparecem em quase todo enunciado e não ajudam a diferenciar.
const PALAVRAS_COMUNS = new Set([
    'que', 'uma', 'umas', 'uns', 'para', 'com', 'dos', 'das', 'nos', 'nas', 'por', 'pelo', 'pela', 'seu', 'sua', 'seus', 'suas',
    'ele', 'ela', 'eles', 'elas', 'cada', 'como', 'mais', 'entre', 'deve', 'devem', 'sera', 'sao', 'esta', 'este', 'essa', 'esse',
    'programa', 'faca', 'escreva', 'crie', 'elabore', 'desenvolva', 'implemente', 'usuario', 'depois', 'tambem', 'qual', 'quais',
]);

function palavras(texto: string): Set<string> {
    const simples = texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const lista = simples.match(/[a-z0-9_]+/g) ?? [];
    return new Set(lista.filter(p => (/^\d+$/.test(p) || p.length >= 3) && !PALAVRAS_COMUNS.has(p)));
}

function semelhanca(doAluno: Set<string>, doCatalogo: Set<string>): number {
    if (doAluno.size === 0 || doCatalogo.size === 0) {
        return 0;
    }
    let comuns = 0;
    for (const p of doCatalogo) {
        if (doAluno.has(p)) {
            comuns++;
        }
    }
    // Precisa cobrir o enunciado da lista e não pode ser um texto muito maior
    // (vários exercícios colados de uma vez, por exemplo).
    return Math.min(comuns / doCatalogo.size, (comuns / doAluno.size) * 1.5);
}

/**
 * Exercício da lista da aula cujo enunciado é o texto informado pelo aluno,
 * ou undefined se nenhum for claramente parecido.
 */
export function reconhecerExercicio(texto: string | undefined, exercicios: ExercicioDoCatalogo[]): ExercicioDoCatalogo | undefined {
    const doAluno = palavras(texto ?? '');
    if (doAluno.size < 4) {
        return undefined;
    }
    const notas = exercicios
        .map(e => ({ e, nota: semelhanca(doAluno, palavras(e.enunciado)) }))
        .sort((a, b) => b.nota - a.nota);
    const [melhor, segundo] = notas;
    if (!melhor || melhor.nota < 0.7) {
        return undefined;
    }
    // Dois exercícios quase iguais: melhor não chutar.
    if (segundo && melhor.nota - segundo.nota < 0.08) {
        return undefined;
    }
    return melhor.e;
}

/**
 * Comentário no começo do arquivo (antes do primeiro código), que muitos
 * alunos usam para colar o enunciado. Ignora comentários curtos, como o nome.
 */
export function comentarioInicial(codigo: string | undefined): string | undefined {
    if (!codigo) {
        return undefined;
    }
    const linhas: string[] = [];
    let resto = codigo.replace(/^\uFEFF/, '');
    for (;;) {
        resto = resto.replace(/^\s+/, '');
        const bloco = resto.match(/^\/\*([\s\S]*?)\*\//);
        const linha = resto.match(/^\/\/(.*)/);
        if (bloco) {
            linhas.push(...bloco[1].split(/\r?\n/).map(l => l.replace(/^\s*\*+ ?/, '').trimEnd()));
            resto = resto.slice(bloco[0].length);
        } else if (linha) {
            linhas.push(linha[1].trim());
            resto = resto.slice(linha[0].length);
        } else {
            break;
        }
    }
    const texto = linhas.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    return palavras(texto).size >= 5 ? texto : undefined;
}
