// Qualidade do código pedida na disciplina: cabeçalho Doxygen no início do
// arquivo (no estilo do material da Aula 16, com \file, \brief...) e, logo
// abaixo dele, o enunciado do exercício em um comentário. Também confere a
// indentação dos blocos. Não depende da API do VS Code.

export const BRIEF_A_PREENCHER = '(descreva em uma frase o que o programa faz)';
export const AUTOR_A_PREENCHER = '(seu nome)';
export const ENUNCIADO_A_PREENCHER = '(cole aqui o enunciado do exercício)';
const PREENCHER = [BRIEF_A_PREENCHER, AUTOR_A_PREENCHER, ENUNCIADO_A_PREENCHER];

// Tags que marcam o comentário como cabeçalho Doxygen do arquivo.
const TAG_DO_CABECALHO = /[\\@](file|brief|author|date)\b/;

export interface ComentarioDoInicio {
    // Texto do comentário, sem /* */, // e os asteriscos do começo das linhas.
    texto: string;
    doxygen: boolean;
    // Posição logo depois do comentário no código.
    fim: number;
}

/** Comentários que vêm antes de qualquer código (inclusive antes dos #include). */
export function comentariosDoInicio(codigo: string): ComentarioDoInicio[] {
    const comentarios: ComentarioDoInicio[] = [];
    const inicio = codigo.charCodeAt(0) === 0xFEFF ? 1 : 0;
    let posicao = inicio;
    for (;;) {
        const espacos = /^\s*/.exec(codigo.slice(posicao))![0].length;
        posicao += espacos;
        const resto = codigo.slice(posicao);
        const bloco = /^\/\*([\s\S]*?)\*\//.exec(resto);
        const linhas = /^(\/\/.*(?:\r?\n[ \t]*\/\/.*)*)/.exec(resto);
        if (bloco) {
            const texto = bloco[1].split(/\r?\n/).map(l => l.replace(/^\s*\*+ ?/, '').trimEnd()).join('\n').trim();
            comentarios.push({ texto, doxygen: TAG_DO_CABECALHO.test(texto), fim: posicao + bloco[0].length });
            posicao += bloco[0].length;
        } else if (linhas) {
            const texto = linhas[1].split(/\r?\n/).map(l => l.replace(/^\s*\/\/+ ?/, '').trimEnd()).join('\n').trim();
            comentarios.push({ texto, doxygen: TAG_DO_CABECALHO.test(texto), fim: posicao + linhas[1].length });
            posicao += linhas[1].length;
        } else {
            return comentarios;
        }
    }
}

export function temCabecalhoDoxygen(codigo: string): boolean {
    return comentariosDoInicio(codigo).some(c => c.doxygen);
}

/** Texto dos comentários do início que não são o cabeçalho Doxygen (onde fica o enunciado). */
export function textoDoEnunciadoNoComentario(codigo: string): string {
    return comentariosDoInicio(codigo)
        .filter(c => !c.doxygen)
        .map(c => c.texto)
        .join('\n\n')
        .split('\n')
        .filter(l => !PREENCHER.includes(l.trim()))
        .join('\n')
        .replace(/^\s*enunciado\s*:?\s*/i, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

/** Há um enunciado de verdade no comentário (um nome ou uma palavra solta não conta). */
export function temEnunciadoNoComentario(codigo: string): boolean {
    return textoDoEnunciadoNoComentario(codigo).split(/\s+/).filter(p => p.length >= 3).length >= 5;
}

export interface DadosDoCabecalho {
    arquivo: string;
    autor?: string;
    data: Date;
}

/** Cabeçalho Doxygen no estilo do material (Aula 16). */
export function montarCabecalho(dados: DadosDoCabecalho): string {
    const data = [dados.data.getDate(), dados.data.getMonth() + 1].map(n => String(n).padStart(2, '0')).join('/') + '/' + dados.data.getFullYear();
    return [
        '/**',
        ` * \\file ${dados.arquivo}`,
        ` * \\brief ${BRIEF_A_PREENCHER}`,
        ` * \\author ${dados.autor?.trim() || AUTOR_A_PREENCHER}`,
        ` * \\date ${data}`,
        ' */',
        '',
    ].join('\n');
}

/** Comentário com o enunciado, para ficar logo abaixo do cabeçalho. */
export function montarComentarioDoEnunciado(enunciado?: string): string {
    const linhas = enunciado?.trim()
        ? enunciado.trim().replace(/\*\//g, '* /').split(/\r?\n/)
        : [ENUNCIADO_A_PREENCHER];
    return ['/*', ' * Enunciado:', ...linhas.map(l => (' * ' + l).trimEnd()), ' */', ''].join('\n');
}

export interface ProblemaDeQualidade {
    linha: number;    // começa em 1
    coluna: number;   // começa em 1
    comprimento: number;
    regra: 'cabecalho-doxygen' | 'cabecalho-incompleto' | 'enunciado-no-comentario' | 'indentacao';
    mensagem: string;
}

/** Cabeçalho, enunciado no comentário e indentação. */
export function verificarQualidade(codigo: string, codigoLimpo: string): ProblemaDeQualidade[] {
    const problemas: ProblemaDeQualidade[] = [];
    // Só cobra o cabeçalho quando já existe um programa (evita avisos no arquivo vazio).
    if (/\bmain\s*\(/.test(codigoLimpo)) {
        const primeira = codigo.split(/\r?\n/)[0] ?? '';
        const noInicio = { linha: 1, coluna: 1, comprimento: Math.max(1, primeira.length) };
        const comentarios = comentariosDoInicio(codigo);
        const cabecalho = comentarios.find(c => c.doxygen);
        if (!cabecalho) {
            problemas.push({ ...noInicio, regra: 'cabecalho-doxygen',
                mensagem: 'Falta o cabeçalho Doxygen no início do arquivo (\\file, \\brief, \\author, \\date), com o enunciado em um comentário logo abaixo. Atalho: Ctrl+Alt+H (ou digite doxy e aperte Tab).' });
        } else if (PREENCHER.some(p => cabecalho.texto.includes(p))) {
            problemas.push({ ...noInicio, regra: 'cabecalho-incompleto',
                mensagem: 'O cabeçalho ainda tem campos para preencher. O que o seu programa faz, em uma frase (\\brief)? E o seu nome (\\author)?' });
        } else if (!temEnunciadoNoComentario(codigo)) {
            problemas.push({ ...noInicio, regra: 'enunciado-no-comentario',
                mensagem: 'Coloque o enunciado do exercício em um comentário logo abaixo do cabeçalho. Atalho: Ctrl+Alt+H.' });
        }
    }
    problemas.push(...verificarIndentacao(codigoLimpo));
    return problemas;
}

const MAX_AVISOS_DE_INDENTACAO = 3;

/** Linhas dentro de um bloco { } que não foram deslocadas para dentro dele. */
export function verificarIndentacao(codigoLimpo: string): ProblemaDeQualidade[] {
    const problemas: ProblemaDeQualidade[] = [];
    // Para cada { aberto: a indentação e o número da linha onde ele abriu.
    const blocos: { recuo: number; linha: number }[] = [];
    // Um aviso por bloco basta: o aluno arruma o bloco inteiro de uma vez.
    const blocosAvisados = new Set<number>();
    const linhas = codigoLimpo.split(/\r?\n/);
    linhas.forEach((linha, i) => {
        const conteudo = linha.trim();
        if (!conteudo || conteudo.startsWith('#')) {
            return;
        }
        const recuo = larguraDoRecuo(linha);
        const fechaPrimeiro = conteudo.startsWith('}');
        const ehRotulo = /^(case\b|default\s*:)/.test(conteudo);
        const dono = blocos[blocos.length - 1];
        if (dono && !fechaPrimeiro && !ehRotulo && recuo <= dono.recuo && problemas.length < MAX_AVISOS_DE_INDENTACAO
            && !blocosAvisados.has(dono.linha)) {
            blocosAvisados.add(dono.linha);
            problemas.push({
                linha: i + 1, coluna: 1, comprimento: Math.max(1, linha.length),
                regra: 'indentacao',
                mensagem: `Indentação: esta linha está dentro do bloco { } aberto na linha ${dono.linha}, mas não foi deslocada para dentro. Recuar as linhas de cada bloco (Tab) mostra o que pertence a ele. Dica: Shift+Alt+F arruma o arquivo todo, se a extensão C/C++ estiver instalada.`,
            });
        }
        for (const caractere of conteudo) {
            if (caractere === '{') {
                blocos.push({ recuo, linha: i + 1 });
            } else if (caractere === '}') {
                blocos.pop();
            }
        }
    });
    return problemas;
}

function larguraDoRecuo(linha: string): number {
    let largura = 0;
    for (const caractere of linha) {
        if (caractere === ' ') {
            largura++;
        } else if (caractere === '\t') {
            largura += 4;
        } else {
            break;
        }
    }
    return largura;
}
