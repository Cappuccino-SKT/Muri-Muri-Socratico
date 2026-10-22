// Lista de exercícios de cada aula (extraída da seção "Exercícios da aula" do
// material) e links das videoaulas. Não depende da API do VS Code.
import * as fs from 'fs';
import * as path from 'path';
import { Material } from './material';
import { CasoDeTeste } from './testes';

export interface ExercicioDoCatalogo {
    id: string;            // ex.: "aula11-ex3"
    aula: number;
    tituloAula: string;    // ex.: "Vetores"
    numero: number;
    enunciado: string;
    casosOficiais: CasoDeTeste[];
}

export interface Catalogo {
    exercicios: ExercicioDoCatalogo[];
    videos: Map<number, string>;
}

export function idDoExercicio(aula: number, numero: number): string {
    return `aula${String(aula).padStart(2, '0')}-ex${numero}`;
}

export function nomeCurtoDaAula(titulo: string): string {
    return titulo.replace(/^Aula\s+\d+\s*[-–]\s*/, '');
}

/** Remove a marcação Markdown simples (negrito e crases) do enunciado. */
function textoSimples(markdown: string): string {
    // Trechos de código (`int **c;`) são preservados antes de tirar o negrito.
    const codigos: string[] = [];
    const semCodigo = markdown.replace(/`([^`]+)`/g, (_, codigo: string) => `\u0000${codigos.push(codigo) - 1}\u0000`);
    return semCodigo
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\u0000(\d+)\u0000/g, (_, i: string) => codigos[Number(i)])
        .trim();
}

export function extrairExercicios(conteudoDaAula: string): string[] {
    const secao = conteudoDaAula.match(/^## Exercícios da aula\s*\n([\s\S]*?)(?=^## |\s*$(?![\s\S]))/m);
    if (!secao) {
        return [];
    }
    const exercicios: string[] = [];
    for (const linha of secao[1].split(/\r?\n/)) {
        const item = linha.match(/^\d+\.\s+(.*)$/);
        if (item) {
            exercicios.push(item[1]);
        } else if (exercicios.length > 0 && /^\s+\S/.test(linha)) {
            // Continuação do item anterior (linha recuada).
            exercicios[exercicios.length - 1] += '\n' + linha.trim();
        }
    }
    return exercicios.map(textoSimples);
}

/** Lê "| Aula 06 – ... | https://... |" do índice das videoaulas. */
export function extrairVideos(indiceVideos: string): Map<number, string> {
    const videos = new Map<number, string>();
    for (const m of indiceVideos.matchAll(/^\| Aula (\d+) [^|]*\| (https:\/\/\S+) \|/gm)) {
        const aula = Number(m[1]);
        if (!videos.has(aula)) {
            videos.set(aula, m[2]);
        }
    }
    return videos;
}

/**
 * Casos de teste oficiais opcionais, em material/casos-oficiais.json:
 * { "aula11-ex4": [ { "entrada": "", "saidaEsperada": "Soma: 36" } ] }
 */
function lerCasosOficiais(pastaMaterial: string): Record<string, CasoDeTeste[]> {
    const arquivo = path.join(pastaMaterial, 'casos-oficiais.json');
    if (!fs.existsSync(arquivo)) {
        return {};
    }
    try {
        return JSON.parse(fs.readFileSync(arquivo, 'utf8'));
    } catch {
        return {};
    }
}

export function montarCatalogo(material: Material, pastaMaterial: string): Catalogo {
    const oficiais = lerCasosOficiais(pastaMaterial);
    const exercicios: ExercicioDoCatalogo[] = [];
    for (const aula of material.aulas) {
        extrairExercicios(aula.conteudo).forEach((enunciado, i) => {
            const id = idDoExercicio(aula.numero, i + 1);
            exercicios.push({
                id,
                aula: aula.numero,
                tituloAula: nomeCurtoDaAula(aula.titulo),
                numero: i + 1,
                enunciado,
                casosOficiais: (oficiais[id] ?? []).map(c => ({ entrada: String(c.entrada ?? ''), saidaEsperada: String(c.saidaEsperada ?? '') })),
            });
        });
    }
    return { exercicios, videos: extrairVideos(material.indiceVideos) };
}

export function aulaDoExercicio(id: string | undefined): number | undefined {
    const m = id?.match(/^aula(\d+)-ex\d+$/);
    return m ? Number(m[1]) : undefined;
}
