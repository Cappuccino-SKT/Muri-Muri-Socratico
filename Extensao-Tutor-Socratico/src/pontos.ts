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
}

const INICIO_DO_BLOCO = /<!--\s*PONTOS/i;
const PREFIXO_DO_BLOCO = '<!--pontos';
const MAX_PONTOS = 8;

/** Separa o bloco escondido do texto que vai aparecendo no chat. */
export class FiltroDoBloco {
    private pendente = '';
    private bloco?: string;

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
            this.bloco = texto.slice(achado.index + achado[0].length);
            return texto.slice(0, achado.index);
        }
        // O marcador pode chegar partido entre dois trechos: segura o fim
        // do texto enquanto ele puder ser o começo do marcador.
        const ultimo = texto.lastIndexOf('<');
        if (ultimo >= 0 && texto.length - ultimo < 16) {
            const fim = texto.slice(ultimo).toLowerCase().replace(/\s+/g, '');
            if (PREFIXO_DO_BLOCO.startsWith(fim)) {
                this.pendente = texto.slice(ultimo);
                return texto.slice(0, ultimo);
            }
        }
        this.pendente = '';
        return texto;
    }

    /** Fim da resposta: devolve o que sobrou para mostrar e o bloco, se veio. */
    terminar(): { resto: string; bloco?: BlocoDePontos } {
        const resto = this.pendente;
        this.pendente = '';
        return { resto, bloco: this.bloco === undefined ? undefined : lerBloco(this.bloco) };
    }
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
