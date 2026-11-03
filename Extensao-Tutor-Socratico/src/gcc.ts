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

export function verificarComGcc(caminhoGcc: string, arquivo: string, argumentosExtras: string[] = []): Promise<ProblemaGcc[]> {
    const args = ['-fsyntax-only', '-std=c11', '-Wall', '-Wextra', '-fdiagnostics-color=never', ...argumentosExtras, arquivo];
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

// ---------------------------------------------------------------------------
// Jogos com a raylib: compilar ligando a biblioteca
// ---------------------------------------------------------------------------

/** Bibliotecas ligadas ao jogo quando o aluno não configurou outras. */
export function bibliotecasPadraoDaRaylib(plataforma: NodeJS.Platform = process.platform): string[] {
    if (plataforma === 'win32') {
        return ['-lraylib', '-lopengl32', '-lgdi32', '-lwinmm'];
    }
    if (plataforma === 'darwin') {
        return ['-lraylib', '-framework', 'OpenGL', '-framework', 'Cocoa', '-framework', 'IOKit', '-framework', 'CoreVideo'];
    }
    return ['-lraylib', '-lm'];
}

export interface ResultadoDaCompilacao {
    compilou: boolean;
    // Tudo o que o GCC escreveu (erros, avisos e erros de ligação).
    saida: string;
    // Explicação em português do problema mais comum, se houver.
    explicacao?: string;
}

/** Explica os erros que mais aparecem ao compilar um jogo com a raylib. */
export function explicarErroDeCompilacaoDoJogo(saida: string): string | undefined {
    if (/(raylib|raymath)\.h: No such file or directory/.test(saida)) {
        return 'O GCC não encontrou a raylib. Instale-a pelo MSYS2 (pacman -S mingw-w64-ucrt-x86_64-raylib) ou informe a pasta dela na configuração tutorSocratico.argumentosGcc.';
    }
    if (/cannot find -lraylib|library not found for -lraylib/.test(saida)) {
        return 'O GCC não achou o arquivo da biblioteca raylib para ligar ao jogo. Ela está instalada para este GCC? Se estiver em outra pasta, informe-a com -L em tutorSocratico.argumentosGcc.';
    }
    if (/undefined reference to [`'"]?(Init|Close|Begin|End|Draw|Load|Unload|Is|Get|Set|Play|Update|Check|Clear|Window|Text|Measure|Toggle)\w*/.test(saida)) {
        return 'O código compilou, mas faltou ligar a raylib ao programa (-lraylib -lopengl32 -lgdi32 -lwinmm). Confira a configuração tutorSocratico.bibliotecasRaylib.';
    }
    if (/undefined reference to [`'"]?\w+/.test(saida)) {
        return 'Uma função foi usada, mas não foi encontrada ao juntar o programa: confira o nome dela e se o arquivo .c onde ela está foi compilado junto.';
    }
    if (/cannot open output file .*(Permission denied|Invalid argument)/i.test(saida)) {
        return 'Não deu para gravar o .exe: o jogo provavelmente ainda está aberto. Feche a janela do jogo e tente de novo.';
    }
    return undefined;
}

/** Compila os arquivos do jogo num executável, ligando a raylib. */
export function compilarJogo(caminhoGcc: string, arquivos: string[], executavel: string,
    argumentosExtras: string[], bibliotecas: string[]): Promise<ResultadoDaCompilacao> {
    const args = ['-std=c11', '-Wall', '-fdiagnostics-color=never', ...argumentosExtras, ...arquivos, '-o', executavel, ...bibliotecas];
    return new Promise((resolve, reject) => {
        execFile(caminhoGcc, args, { cwd: path.dirname(arquivos[0]), timeout: 60000, windowsHide: true }, (erro, _stdout, stderr) => {
            if (erro && (erro as NodeJS.ErrnoException).code === 'ENOENT') {
                reject(new Error(`GCC não encontrado ("${caminhoGcc}"). Instale o GCC ou ajuste a configuração tutorSocratico.caminhoGcc.`));
                return;
            }
            const compilou = !erro;
            resolve({ compilou, saida: stderr, explicacao: compilou ? undefined : explicarErroDeCompilacaoDoJogo(stderr) });
        });
    });
}
