// Executa o GCC só para verificar o arquivo (-fsyntax-only) e converte a saída
// em uma lista de problemas. A conversão é separada para poder ser testada.
import { execFile } from 'child_process';
import * as path from 'path';

export interface ProblemaGcc {
    arquivo: string;
    linha: number;   // começa em 1
    coluna: number;  // começa em 1
    gravidade: 'error' | 'warning' | 'note';
    mensagem: string;
}

// Ex.: C:\pasta\ex.c:20:17: warning: format '%d' expects argument ... [-Wformat=]
const LINHA_GCC = /^(.*?):(\d+):(\d+): (fatal error|error|warning|note): (.*)$/;

export function interpretarSaidaGcc(saida: string): ProblemaGcc[] {
    const problemas: ProblemaGcc[] = [];
    for (const linha of saida.split(/\r?\n/)) {
        const m = linha.match(LINHA_GCC);
        if (!m) {
            continue;
        }
        problemas.push({
            arquivo: m[1],
            linha: Number(m[2]),
            coluna: Number(m[3]),
            gravidade: m[4] === 'note' ? 'note' : m[4] === 'warning' ? 'warning' : 'error',
            mensagem: m[5],
        });
    }
    return problemas;
}

export function verificarComGcc(caminhoGcc: string, arquivo: string): Promise<ProblemaGcc[]> {
    const args = ['-fsyntax-only', '-std=c11', '-Wall', '-Wextra', '-fdiagnostics-color=never', arquivo];
    return new Promise((resolve, reject) => {
        execFile(caminhoGcc, args, { cwd: path.dirname(arquivo), timeout: 15000, windowsHide: true }, (erro, _stdout, stderr) => {
            // O GCC sai com código 1 quando há erros de compilação: isso não é falha da verificação.
            if (erro && (erro as NodeJS.ErrnoException).code === 'ENOENT') {
                reject(new Error(`GCC não encontrado ("${caminhoGcc}"). Instale o GCC ou ajuste a configuração tutorSocratico.caminhoGcc.`));
                return;
            }
            const problemas = interpretarSaidaGcc(stderr);
            const mesmoArquivo = path.resolve(arquivo).toLowerCase();
            resolve(problemas.filter(p => path.resolve(path.dirname(arquivo), p.arquivo).toLowerCase() === mesmoArquivo));
        });
    });
}
