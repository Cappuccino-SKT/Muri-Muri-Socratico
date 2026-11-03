// Pontos que o tutor manda revisar no código, um de cada vez, do mais fácil
// para o mais difícil. O modelo os devolve num bloco escondido no fim da
// resposta (<!--PONTOS ... -->); a extensão tira o bloco do texto mostrado
// ao aluno e marca a linha no editor. Não depende da API do VS Code.

export interface Ponto {
    // Linhas contadas a partir de 1, como no código numerado enviado ao modelo.
    linha: number;
    ate?: number;
    pergunta: string;
}

export interface BlocoDePontos {
    // true/false quando o aluno pediu para conferir o ponto atual (/proximo).
    resolvido?: boolean;
    pontos: Ponto[];
    // Só na verificação de qualidade: a nota de cada critério da rubrica.
    criterios?: Criterio[];
}

export interface Criterio {
    nome: string;
    pontos: number;
    maximo: number;
}

/**
 * Nota de 0 a 1000: soma dos critérios, cada um limitado ao seu máximo. A
 * soma é feita aqui, e não pelo modelo, para a conta sempre fechar.
 */
export function somarNota(criterios: Criterio[]): number | undefined {
    const maximo = criterios.reduce((total, c) => total + c.maximo, 0);
    if (maximo <= 0) {
        return undefined;
    }
    const obtido = criterios.reduce((total, c) => total + Math.min(Math.max(c.pontos, 0), c.maximo), 0);
    return Math.round(obtido * 1000 / maximo);
}

export function faixaDaNota(nota: number): string {
    return nota >= 900 ? 'excelente' : nota >= 750 ? 'muito bom' : nota >= 500 ? 'bom, mas dá para melhorar' : nota >= 250 ? 'precisa de atenção' : 'vamos organizar';
}

/** Nota, comparação com a verificação anterior e a tabela dos critérios, em Markdown. */
export function cartaoDaNota(criterios: Criterio[], anterior?: number): string {
    const nota = somarNota(criterios) ?? 0;
    let evolucao = '';
    if (anterior !== undefined) {
        const diferenca = nota - anterior;
        evolucao = diferenca > 0 ? ` · ⬆️ +${diferenca} desde a última verificação`
            : diferenca < 0 ? ` · ⬇️ ${diferenca} desde a última verificação`
            : ' · igual à última verificação';
    }
    return [
        `🏅 **Qualidade do código: ${nota} / 1000** (${faixaDaNota(nota)})${evolucao}`,
        '',
        '| Critério | Pontos |',
        '|---|---|',
        ...criterios.map(c => `| ${c.nome} | ${Math.min(Math.max(c.pontos, 0), c.maximo)} / ${c.maximo} |`),
    ].join('\n');
}

// Dois blocos escondidos: PONTOS (linhas para marcar no editor) e ETAPAS
// (etapas de desenvolvimento do projeto do jogo).
const INICIO_DO_BLOCO = /<!--\s*(PONTOS|ETAPAS)/i;
const PREFIXOS_DO_BLOCO = ['<!--pontos', '<!--etapas'];
const MAX_PONTOS = 8;
const MAX_ETAPAS = 12;

export interface Etapa {
    texto: string;
    feita: boolean;
}

/** Separa o bloco escondido do texto que vai aparecendo no chat. */
export class FiltroDoBloco {
    private pendente = '';
    private bloco?: string;
    private tipo?: 'pontos' | 'etapas';

    /** Recebe um trecho da resposta e devolve o que pode ser mostrado ao aluno. */
    empurrar(trecho: string): string {
        if (this.bloco !== undefined) {
            this.bloco += trecho;
            return '';
        }
        const texto = this.pendente + trecho;
        const achado = INICIO_DO_BLOCO.exec(texto);
        if (achado) {
            this.pendente = '';
            this.tipo = achado[1].toLowerCase() === 'etapas' ? 'etapas' : 'pontos';
            this.bloco = texto.slice(achado.index + achado[0].length);
            return texto.slice(0, achado.index);
        }
        // O marcador pode chegar partido entre dois trechos: segura o fim
        // do texto enquanto ele puder ser o começo do marcador.
        const ultimo = texto.lastIndexOf('<');
        if (ultimo >= 0 && texto.length - ultimo < 16) {
            const fim = texto.slice(ultimo).toLowerCase().replace(/\s+/g, '');
            if (PREFIXOS_DO_BLOCO.some(prefixo => prefixo.startsWith(fim))) {
                this.pendente = texto.slice(ultimo);
                return texto.slice(0, ultimo);
            }
        }
        this.pendente = '';
        return texto;
    }

    /** Fim da resposta: devolve o que sobrou para mostrar e o bloco, se veio. */
    terminar(): { resto: string; bloco?: BlocoDePontos; etapas?: Etapa[] } {
        const resto = this.pendente;
        this.pendente = '';
        if (this.bloco === undefined) {
            return { resto };
        }
        return this.tipo === 'etapas' ? { resto, etapas: lerEtapas(this.bloco) } : { resto, bloco: lerBloco(this.bloco) };
    }
}

/** Lê as etapas do bloco ETAPAS: uma por linha ("- [ ] texto", "1. texto" ou só o texto). */
export function lerEtapas(texto: string): Etapa[] {
    const fim = texto.indexOf('-->');
    const corpo = fim >= 0 ? texto.slice(0, fim) : texto;
    return corpo.split(/\r?\n/)
        .map(linha => linha.trim().replace(/^(?:[-*]\s*)?(?:\[[ xX]?\]\s*)?(?:\d+[.)]\s*)?/, '').trim())
        .filter(linha => linha.length > 0)
        .slice(0, MAX_ETAPAS)
        .map(texto => ({ texto, feita: false }));
}

/** Etapas novas mantêm "feita" das que já existiam com o mesmo texto. */
export function juntarEtapas(antigas: Etapa[], novas: Etapa[]): Etapa[] {
    const feitas = new Set(antigas.filter(e => e.feita).map(e => e.texto.toLowerCase()));
    return novas.map(e => ({ texto: e.texto, feita: e.feita || feitas.has(e.texto.toLowerCase()) }));
}

/** Lê o conteúdo do bloco: a linha "resolvido: ..." e as linhas "LINHA | PERGUNTA". */
export function lerBloco(texto: string): BlocoDePontos {
    const fim = texto.indexOf('-->');
    const corpo = fim >= 0 ? texto.slice(0, fim) : texto;
    const bloco: BlocoDePontos = { pontos: [] };
    for (const bruta of corpo.split(/\r?\n/)) {
        const linha = bruta.trim().replace(/^[-*]\s*/, '');
        const resolvido = /^resolvido\s*:\s*(\S+)/i.exec(linha);
        if (resolvido) {
            const valor = resolvido[1].toLowerCase();
            bloco.resolvido = valor === 'sim' ? true : /^n[aã]o$/.test(valor) ? false : undefined;
            continue;
        }
        // "nota: Nomes | 180 | 250" = critério, pontos obtidos e máximo.
        const nota = /^nota\s*:\s*([^|]+?)\s*\|\s*(\d+)\s*(?:\/|\|)\s*(\d+)\s*$/i.exec(linha);
        if (nota) {
            (bloco.criterios ??= []).push({ nome: nota[1], pontos: Number(nota[2]), maximo: Number(nota[3]) });
            continue;
        }
        const ponto = /^(?:linhas?\s*)?(\d+)(?:\s*(?:-|–|a)\s*(\d+))?\s*\|\s*(.+)$/i.exec(linha);
        if (ponto && bloco.pontos.length < MAX_PONTOS) {
            const inicio = Number(ponto[1]);
            const ate = ponto[2] ? Number(ponto[2]) : undefined;
            if (inicio > 0) {
                bloco.pontos.push({ linha: inicio, ate: ate && ate > inicio ? ate : undefined, pergunta: ponto[3].trim() });
            }
        }
    }
    return bloco;
}

export interface Mudanca {
    // Linhas (a partir de 1) do trecho substituído, antes da edição.
    inicio: number;
    fim: number;
    // Quantas quebras de linha o texto novo tem.
    linhasNovas: number;
    // A edição é uma inserção no começo da linha "inicio" (ex.: Enter na coluna 0).
    noComecoDaLinha: boolean;
}

/** Acompanha uma linha marcada depois de uma edição no arquivo. */
export function moverLinha(linha: number, mudanca: Mudanca): number {
    const { inicio, fim, linhasNovas, noComecoDaLinha } = mudanca;
    if (fim < linha || (noComecoDaLinha && inicio === linha && fim === linha)) {
        return linha + linhasNovas - (fim - inicio);
    }
    if (inicio >= linha) {
        return linha;
    }
    // A linha estava dentro do trecho editado: fica no ponto equivalente do texto novo.
    return inicio + Math.min(linha - inicio, linhasNovas);
}
