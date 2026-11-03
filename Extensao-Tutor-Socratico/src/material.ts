// Carrega o material verificado (Markdown) embutido na extensão e escolhe
// quais aulas enviar ao modelo para cada pergunta. Não depende da API do
// VS Code, para poder ser testado com Node puro.
import * as fs from 'fs';
import * as path from 'path';

export interface Aula {
    arquivo: string;
    numero: number;
    // 'aula': as 21 aulas de Fundamentos 1; 'raylib': material do projeto final (Fundamentos 2).
    modulo: 'aula' | 'raylib';
    titulo: string;
    topicos: string[];
    conteudo: string;
}

export interface Material {
    aulas: Aula[];
    indiceAulas: string;
    indiceVideos: string;
    // Índice do material da raylib (vazio se a pasta não existir).
    indiceRaylib: string;
}

/** O código usa a raylib (projeto final de Fundamentos 2). */
export const INCLUI_RAYLIB = /#\s*include\s*[<"](raylib|raymath)\.h[>"]/;
// Funções da raylib citadas na pergunta, mesmo sem a palavra "raylib".
const FUNCOES_DA_RAYLIB = /\b(InitWindow|WindowShouldClose|BeginDrawing|EndDrawing|ClearBackground|DrawRectangle\w*|DrawCircle\w*|DrawText\w*|DrawTexture\w*|LoadTexture|IsKey(Down|Pressed|Released|Up)|IsMouseButton\w*|GetMousePosition|GetFrameTime|CheckCollision\w*|GetRandomValue|LoadSound|PlaySound|LoadMusicStream|UpdateMusicStream|InitAudioDevice|BeginMode2D|Camera2D|Texture2D|Vector2|TextFormat)\b/;

// Compilação manual e Makefile, também do projeto final.
const SOBRE_MAKEFILE = /makefile|mingw32-make|\bmake\s+(run|clean|all)\b|missing separator|no rule to make target/i;

/** A pergunta ou o código são do projeto com raylib (incluindo a compilação e o Makefile). */
export function ehProjetoRaylib(pergunta: string, codigo = ''): boolean {
    return /raylib/i.test(pergunta) || FUNCOES_DA_RAYLIB.test(pergunta) || SOBRE_MAKEFILE.test(pergunta) || INCLUI_RAYLIB.test(codigo);
}

export function carregarMaterial(pastaMaterial: string): Material {
    const pastaAulas = path.join(pastaMaterial, 'aulas');
    const aulas: Aula[] = [];
    let indiceAulas = '';

    for (const arquivo of fs.readdirSync(pastaAulas).sort()) {
        if (!arquivo.endsWith('.md')) {
            continue;
        }
        const conteudo = fs.readFileSync(path.join(pastaAulas, arquivo), 'utf8');
        if (arquivo === '_INDICE.md') {
            indiceAulas = conteudo;
            continue;
        }
        const cabecalho = lerCabecalho(conteudo);
        aulas.push({
            arquivo,
            modulo: 'aula',
            numero: Number(cabecalho['numero_aula'] ?? 0),
            titulo: limparAspas(cabecalho['titulo'] ?? arquivo),
            topicos: lerLista(cabecalho['topicos'] ?? ''),
            conteudo,
        });
    }

    // Material da raylib (projeto final de Fundamentos 2), numerado a partir de 101.
    let indiceRaylib = '';
    const pastaRaylib = path.join(pastaMaterial, 'raylib');
    if (fs.existsSync(pastaRaylib)) {
        for (const arquivo of fs.readdirSync(pastaRaylib).sort()) {
            if (!arquivo.endsWith('.md')) {
                continue;
            }
            const conteudo = fs.readFileSync(path.join(pastaRaylib, arquivo), 'utf8');
            if (arquivo === '_INDICE_RAYLIB.md') {
                indiceRaylib = conteudo;
                continue;
            }
            const cabecalho = lerCabecalho(conteudo);
            aulas.push({
                arquivo,
                modulo: 'raylib',
                numero: Number(cabecalho['numero_aula'] ?? 0),
                titulo: limparAspas(cabecalho['titulo'] ?? arquivo),
                topicos: lerLista(cabecalho['topicos'] ?? ''),
                conteudo,
            });
        }
    }

    const indiceVideos = fs.readFileSync(path.join(pastaMaterial, '_INDICE_VIDEOAULAS.md'), 'utf8');
    return { aulas, indiceAulas, indiceVideos, indiceRaylib };
}

/** Lê o frontmatter YAML simples (chave: valor, uma por linha). */
function lerCabecalho(conteudo: string): Record<string, string> {
    const resultado: Record<string, string> = {};
    const match = conteudo.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) {
        return resultado;
    }
    for (const linha of match[1].split(/\r?\n/)) {
        const separador = linha.indexOf(':');
        if (separador > 0) {
            resultado[linha.slice(0, separador).trim()] = linha.slice(separador + 1).trim();
        }
    }
    return resultado;
}

function limparAspas(texto: string): string {
    return texto.replace(/^["']|["']$/g, '');
}

function lerLista(texto: string): string[] {
    return texto
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map(item => limparAspas(item.trim()).toLowerCase())
        .filter(item => item.length > 0);
}

/** Remove acentos e deixa minúsculo, para comparar "funções" com "funcoes". */
export function normalizar(texto: string): string {
    return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

// Palavras de C que indicam fortemente uma aula, mesmo que o aluno não cite o tópico.
const PISTAS_DE_CODIGO: Array<[RegExp, number]> = [
    [/\bscanf\b|&\w+/, 5],
    [/\bif\b|\belse\b|&&|\|\|/, 6],
    [/\bswitch\b|\bcase\b/, 7],
    [/\bwhile\b/, 8],
    [/\bdo\s*\{/, 9],
    [/\bfor\s*\(/, 10],
    [/\w+\s*\[\s*\w*\s*\]/, 11],
    [/\w+\s*\[[^\]]*\]\s*\[[^\]]*\]/, 12],
    [/\bstr(len|cpy|cat|cmp|cspn)\b|\bfgets\b|\bchar\s+\w+\s*\[/, 13],
    [/\bstruct\b|\btypedef\b/, 14],
    [/\bunion\b|\benum\b/, 15],
    [/->|\w+\s*\*\s*\w+\s*[,)=;]/, 17],
    [/\bmalloc\b|\bcalloc\b|\brealloc\b|\bfree\b/, 20],
    [/\bFILE\b|\bfopen\b|\bfclose\b|\bfgetc\b|\bfputc\b|\bfputs\b/, 21],
    // Material da raylib (só conta em projeto com raylib; ver ehProjetoRaylib).
    [/\bInitWindow\b|\bWindowShouldClose\b|-lraylib|undefined reference|raylib\.h/, 101],
    [/\bDraw(Rectangle|Circle|Line|Triangle|Poly|Text)\w*|\bTextFormat\b|\bMeasureText\b|\bLoadFont\w*|\bColor\b/, 102],
    [/\bIsKey(Down|Pressed|Released|Up|PressedRepeat)\b|\bIsMouseButton\w*|\bGetMousePosition\b|\bIsGamepad\w*|\bGetCharPressed\b/, 103],
    [/\bGetFrameTime\b|\bGetTime\b|\bCheckCollision\w*|\bGetRandomValue\b|\bVector2(Add|Subtract|Scale|Normalize|Length|Distance)\b|\bClamp\b/, 104],
    [/\bLoadTexture\b|\bDrawTexture\w*|\bTexture2D\b|\bInitAudioDevice\b|\bLoadSound\b|\bPlaySound\b|\bLoadMusicStream\b|\bUpdateMusicStream\b/, 105],
    [/\bCamera2D\b|\bBeginMode2D\b|\bSaveFileText\b|\bLoadFileText\b|\btypedef\s+enum\b/, 106],
    [/makefile|mingw32-make|\bmake\b|missing separator|no rule to make target|gcc\s+-c\b|\.o\b|multiple definition/i, 107],
];

/**
 * Escolhe as aulas mais relevantes para a pergunta (e, opcionalmente, para o
 * código aberto). A pergunta pesa mais que o código.
 */
export function selecionarAulas(material: Material, pergunta: string, codigo = '', maximo = 3): Aula[] {
    const textoPergunta = normalizar(pergunta);
    const pontos = new Map<number, number>();
    // O material da raylib só entra em perguntas e códigos do projeto com raylib.
    const comRaylib = ehProjetoRaylib(pergunta, codigo);
    const permitida = (numero: number) => comRaylib || material.aulas.find(a => a.numero === numero)?.modulo !== 'raylib';
    const somar = (numero: number, valor: number) => pontos.set(numero, (pontos.get(numero) ?? 0) + valor);

    if (comRaylib && material.aulas.some(a => a.numero === 101)) {
        // Primeiros passos (instalar, compilar, laço do jogo) é a base de qualquer dúvida de raylib.
        somar(101, 1);
    }
    for (const aula of material.aulas) {
        if (!permitida(aula.numero)) {
            continue;
        }
        // "aula 19" citada explicitamente
        if (new RegExp(`\\baula\\s*0?${aula.numero}\\b`).test(textoPergunta)) {
            somar(aula.numero, 20);
        }
        for (const topico of aula.topicos) {
            const termo = normalizar(topico);
            if (termo.length >= 3 && textoPergunta.includes(termo)) {
                somar(aula.numero, termo.length >= 6 ? 4 : 2);
            }
        }
        if (textoPergunta.includes(normalizar(aula.titulo.replace(/^Aula \d+ - /, '')))) {
            somar(aula.numero, 6);
        }
    }

    for (const [padrao, numero] of PISTAS_DE_CODIGO) {
        if (!permitida(numero)) {
            continue;
        }
        if (padrao.test(pergunta)) {
            somar(numero, 3);
        }
        if (codigo && padrao.test(codigo)) {
            somar(numero, 1);
        }
    }

    return [...pontos.entries()]
        .filter(([, valor]) => valor > 0)
        .sort((a, b) => b[1] - a[1] || b[0] - a[0])
        .slice(0, maximo)
        .map(([numero]) => material.aulas.find(aula => aula.numero === numero))
        .filter((aula): aula is Aula => aula !== undefined);
}
