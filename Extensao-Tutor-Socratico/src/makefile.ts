// Ajuda offline (sem IA) no Makefile do projeto final: o erro mais comum é a
// linha de comando começar com espaços em vez de TAB ("missing separator").
// Não depende da API do VS Code.

export interface ProblemaNoMakefile {
    linha: number;      // começa em 1
    espacos: number;    // quantos espaços há no começo da linha
    mensagem: string;
}

// "alvo: dependências" (sem "=" antes do ":" e sem ":=", que é atribuição).
const LINHA_DE_REGRA = /^[^\s#=:][^=:]*::?(?!=)/;

/** Linhas de comando de uma regra que começam com espaços. */
export function verificarMakefile(texto: string): ProblemaNoMakefile[] {
    const problemas: ProblemaNoMakefile[] = [];
    let dentroDeRegra = false;
    let continuacao = false;
    texto.split(/\r?\n/).forEach((linha, i) => {
        const continuaDaAnterior = continuacao;
        // Linha terminada em "\" continua na de baixo.
        continuacao = linha.trimEnd().endsWith('\\');
        if (continuaDaAnterior) {
            return;
        }
        if (!linha.trim() || linha.trimStart().startsWith('#')) {
            return;
        }
        if (linha.startsWith('\t')) {
            return;
        }
        const espacos = /^ +/.exec(linha)?.[0].length ?? 0;
        if (espacos > 0) {
            if (dentroDeRegra) {
                problemas.push({
                    linha: i + 1,
                    espacos,
                    mensagem: 'Esta linha de comando começa com espaços. No Makefile, ela precisa começar com TAB; senão o make para com "missing separator". Apague os espaços e aperte Tab (ou use a lâmpada 💡).',
                });
            }
            return;
        }
        dentroDeRegra = LINHA_DE_REGRA.test(linha);
    });
    return problemas;
}
