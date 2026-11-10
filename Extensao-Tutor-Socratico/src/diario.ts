// Arquivo projeto-do-jogo.md: o "save" do projeto do jogo, na pasta do aluno.
// Guarda o plano, as etapas, onde o aluno parou, as decisões, os problemas
// em aberto, o histórico e um mapa do código gerado a partir dos .c e .h.
// Fica junto com o código (pen drive, GitHub, outro computador) e o tutor o
// lê para continuar de onde parou. Não depende da API do VS Code.
import { limparCodigo } from './didatico';
import { Etapa } from './pontos';

export const NOME_DO_DIARIO = 'projeto-do-jogo.md';

export interface Diario {
    plano: string;
    etapas: Etapa[];
    ondeParei: string;
    decisoes: string[];
    problemas: string[];
    historico: string[];
    // Seções que o aluno criou no arquivo: são mantidas como estão.
    outras: { titulo: string; texto: string }[];
}

type Chave = 'plano' | 'etapas' | 'ondeParei' | 'decisoes' | 'problemas' | 'historico' | 'mapa';

const TITULOS: Record<Chave, string> = {
    plano: 'Plano do jogo',
    etapas: 'Etapas',
    ondeParei: 'Onde parei',
    decisoes: 'Decisões',
    problemas: 'Problemas em aberto',
    historico: 'Histórico',
    mapa: 'Mapa do código',
};

const DICAS: Record<Chave, string> = {
    plano: 'Ideia do jogo, teclas, como ganha e como perde, telas e o que tem no jogo.',
    etapas: 'Marque [x] quando terminar uma etapa (ou use o painel do tutor).',
    ondeParei: 'O tutor escreve aqui o resumo da última sessão e o próximo passo.',
    decisoes: 'Decisões do projeto: structs, telas, arquivos. O tutor anota as que você toma.',
    problemas: 'O que ficou travado. O tutor tira da lista quando for resolvido.',
    historico: 'O que avançou em cada dia.',
    mapa: 'Gerado pelo tutor a partir dos arquivos .c e .h desta pasta. Não precisa editar.',
};

export function diarioVazio(): Diario {
    return { plano: '', etapas: [], ondeParei: '', decisoes: [], problemas: [], historico: [], outras: [] };
}

function normalizar(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function chaveDoTitulo(titulo: string): Chave | undefined {
    const procurado = normalizar(titulo);
    return (Object.keys(TITULOS) as Chave[]).find(chave => normalizar(TITULOS[chave]) === procurado);
}

/** Tira os comentários <!-- ... --> (as dicas de cada seção). */
function semComentarios(texto: string): string {
    return texto.replace(/<!--[\s\S]*?-->/g, '');
}

function itensDaLista(texto: string): string[] {
    return semComentarios(texto).split(/\r?\n/)
        .map(linha => /^\s*[-*]\s+(.*)$/.exec(linha)?.[1].trim())
        .filter((item): item is string => !!item);
}

/** Lê o arquivo do projeto. Seções que faltam ficam vazias. */
export function lerDiario(markdown: string): Diario {
    const diario = diarioVazio();
    const secoes: { titulo: string; linhas: string[] }[] = [];
    for (const linha of markdown.replace(/^\uFEFF/, '').split(/\r?\n/)) {
        const titulo = /^##\s+(.+?)\s*#*\s*$/.exec(linha);
        if (titulo) {
            secoes.push({ titulo: titulo[1], linhas: [] });
        } else if (secoes.length > 0) {
            secoes[secoes.length - 1].linhas.push(linha);
        }
    }
    for (const secao of secoes) {
        const texto = secao.linhas.join('\n');
        switch (chaveDoTitulo(secao.titulo)) {
            case 'plano':
                diario.plano = semComentarios(texto).trim();
                break;
            case 'ondeParei':
                diario.ondeParei = semComentarios(texto).trim();
                break;
            case 'etapas':
                diario.etapas = semComentarios(texto).split(/\r?\n/)
                    .map(linha => /^\s*[-*]\s+\[([ xX]?)\]\s+(.+)$/.exec(linha))
                    .filter((m): m is RegExpExecArray => !!m)
                    .map(m => ({ texto: m[2].trim(), feita: m[1].toLowerCase() === 'x' }));
                break;
            case 'decisoes':
                diario.decisoes = itensDaLista(texto);
                break;
            case 'problemas':
                diario.problemas = itensDaLista(texto);
                break;
            case 'historico':
                diario.historico = itensDaLista(texto);
                break;
            case 'mapa':
                // Gerado de novo a cada gravação.
                break;
            default:
                diario.outras.push({ titulo: secao.titulo, texto: texto.trim() });
        }
    }
    return diario;
}

/** Escreve o arquivo do projeto, com o mapa do código no fim. */
export function escreverDiario(diario: Diario, mapa = ''): string {
    const secao = (chave: Chave, corpo: string) => `## ${TITULOS[chave]}\n<!-- ${DICAS[chave]} -->\n${corpo ? corpo + '\n' : ''}`;
    const lista = (itens: string[]) => itens.map(item => `- ${item}`).join('\n');
    return [
        '# Projeto do jogo',
        '',
        '<!-- Arquivo do Tutor Socrático (Muri-Muri Socratico). O tutor lê este arquivo para saber onde você parou e como continuar. Pode editar à vontade: só mantenha os títulos "##". Leve-o junto com o código. -->',
        '',
        secao('plano', diario.plano.trim()),
        secao('etapas', diario.etapas.map(e => `- [${e.feita ? 'x' : ' '}] ${e.texto}`).join('\n')),
        secao('ondeParei', diario.ondeParei.trim()),
        secao('decisoes', lista(diario.decisoes)),
        secao('problemas', lista(diario.problemas)),
        secao('historico', lista(diario.historico)),
        ...diario.outras.map(o => `## ${o.titulo}\n${o.texto ? o.texto + '\n' : ''}`),
        secao('mapa', mapa.trim()),
    ].join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

// ---------------------------------------------------------------------------
// Atualização que o tutor manda no bloco escondido <!--DIARIO ... -->
// ---------------------------------------------------------------------------

export interface AtualizacaoDoDiario {
    ondeParei?: string;
    decisoes: string[];
    problemas: string[];
    resolvidos: string[];
    historico: string[];
}

/** Lê o conteúdo do bloco DIARIO ("onde parei: ...", "decisao: ...", ...). */
export function lerBlocoDiario(texto: string): AtualizacaoDoDiario {
    const fim = texto.indexOf('-->');
    const corpo = fim >= 0 ? texto.slice(0, fim) : texto;
    const atualizacao: AtualizacaoDoDiario = { decisoes: [], problemas: [], resolvidos: [], historico: [] };
    for (const bruta of corpo.split(/\r?\n/)) {
        const linha = /^\s*[-*]?\s*([^:]+?)\s*:\s*(.+)$/.exec(bruta);
        if (!linha) {
            continue;
        }
        const valor = linha[2].trim();
        switch (normalizar(linha[1])) {
            case 'onde parei':
                atualizacao.ondeParei = valor;
                break;
            case 'decisao':
            case 'decisoes':
                atualizacao.decisoes.push(valor);
                break;
            case 'problema':
            case 'problemas':
                atualizacao.problemas.push(valor);
                break;
            case 'resolvido':
            case 'resolvidos':
                atualizacao.resolvidos.push(valor);
                break;
            case 'historico':
                atualizacao.historico.push(valor);
                break;
        }
    }
    return atualizacao;
}

export function atualizacaoVazia(atualizacao: AtualizacaoDoDiario): boolean {
    return !atualizacao.ondeParei && !atualizacao.decisoes.length && !atualizacao.problemas.length
        && !atualizacao.resolvidos.length && !atualizacao.historico.length;
}

const MAX_HISTORICO = 40;

/** Aplica a atualização: troca "onde parei", acrescenta o que é novo e tira os problemas resolvidos. */
export function aplicarAtualizacao(diario: Diario, atualizacao: AtualizacaoDoDiario, data: Date): Diario {
    const novo: Diario = { ...diario, decisoes: [...diario.decisoes], problemas: [...diario.problemas], historico: [...diario.historico] };
    const jaTem = (lista: string[], item: string) => lista.some(x => normalizar(x) === normalizar(item));
    if (atualizacao.ondeParei) {
        novo.ondeParei = atualizacao.ondeParei;
    }
    for (const decisao of atualizacao.decisoes) {
        if (!jaTem(novo.decisoes, decisao)) {
            novo.decisoes.push(decisao);
        }
    }
    for (const resolvido of atualizacao.resolvidos) {
        const alvo = normalizar(resolvido);
        novo.problemas = novo.problemas.filter(p => {
            const problema = normalizar(p);
            return problema !== alvo && !problema.includes(alvo) && !alvo.includes(problema);
        });
    }
    for (const problema of atualizacao.problemas) {
        if (!jaTem(novo.problemas, problema)) {
            novo.problemas.push(problema);
        }
    }
    const dia = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
    for (const item of atualizacao.historico) {
        const entrada = `${dia}: ${item}`;
        if (!jaTem(novo.historico, entrada)) {
            novo.historico.push(entrada);
        }
    }
    novo.historico = novo.historico.slice(-MAX_HISTORICO);
    return novo;
}

// ---------------------------------------------------------------------------
// Mapa do código (o "grafo" do projeto), sem IA
// ---------------------------------------------------------------------------

export interface ArquivoDoProjeto {
    nome: string;
    texto: string;
}

export interface MapaDoArquivo {
    nome: string;
    inclui: string[];
    tipos: string[];
    enums: { nome: string; valores: string[] }[];
    funcoes: string[];
    prototipos: string[];
}

const PALAVRAS_QUE_NAO_SAO_FUNCAO = new Set(['if', 'for', 'while', 'switch', 'return', 'sizeof', 'do', 'else']);

/** Profundidade das chaves em cada posição do código limpo. */
function profundidades(codigo: string): number[] {
    const resultado = new Array<number>(codigo.length);
    let nivel = 0;
    for (let i = 0; i < codigo.length; i++) {
        if (codigo[i] === '}') {
            nivel = Math.max(0, nivel - 1);
        }
        resultado[i] = nivel;
        if (codigo[i] === '{') {
            nivel++;
        }
    }
    return resultado;
}

export function mapearArquivo(arquivo: ArquivoDoProjeto): MapaDoArquivo {
    const codigo = limparCodigo(arquivo.texto);
    const nivel = profundidades(codigo);
    const unicos = (lista: string[]) => [...new Set(lista)];
    // Os #include com aspas são do próprio projeto (os com < > são bibliotecas).
    const inclui = unicos([...arquivo.texto.matchAll(/^\s*#\s*include\s*"([^"]+)"/gm)].map(m => m[1]));
    const tipos = unicos([
        ...[...codigo.matchAll(/typedef\s+struct\s*\w*\s*\{[^]*?\}\s*(\w+)\s*;/g)].map(m => m[1]),
        ...[...codigo.matchAll(/(?<!typedef\s)struct\s+(\w+)\s*\{/g)].map(m => 'struct ' + m[1]),
    ]);
    const enums = [...codigo.matchAll(/(?:typedef\s+)?enum\s*(\w*)\s*\{([^}]*)\}\s*(\w*)\s*;/g)].map(m => ({
        nome: m[3] || m[1] || '(enum sem nome)',
        valores: m[2].split(',').map(v => v.split('=')[0].trim()).filter(Boolean),
    }));
    const funcoes: string[] = [];
    const prototipos: string[] = [];
    for (const m of codigo.matchAll(/\b([A-Za-z_]\w*)\s*\(([^;{}()]*)\)\s*(\{|;)/g)) {
        const nome = m[1];
        if (PALAVRAS_QUE_NAO_SAO_FUNCAO.has(nome) || nivel[m.index!] !== 0) {
            continue;
        }
        // Precisa de um tipo antes do nome (senão é uma chamada, como em "x = f(y);").
        const antes = codigo.slice(Math.max(0, m.index! - 60), m.index!);
        if (!/(?:^|[\s;}])(?:static\s+|const\s+|unsigned\s+|signed\s+)*[A-Za-z_]\w*[\s*]+$/.test(antes) || /[=,(]\s*$/.test(antes)) {
            continue;
        }
        (m[3] === '{' ? funcoes : prototipos).push(nome);
    }
    return { nome: arquivo.nome, inclui, tipos, enums, funcoes: unicos(funcoes), prototipos: unicos(prototipos) };
}

/** Mapa em Markdown: um item por arquivo e o grafo dos #include (Mermaid, que o GitHub desenha). */
export function gerarMapa(arquivos: ArquivoDoProjeto[]): string {
    if (arquivos.length === 0) {
        return '';
    }
    // .h primeiro: eles dizem o que existe; depois os .c.
    const ordenados = [...arquivos].sort((a, b) => Number(a.nome.endsWith('.c')) - Number(b.nome.endsWith('.c')) || a.nome.localeCompare(b.nome));
    // Só liga arquivos da pasta: "raylib.h" com aspas é biblioteca, não arquivo do projeto.
    const doProjeto = new Set(arquivos.map(a => a.nome.toLowerCase()));
    const mapas = ordenados.map(mapearArquivo).map(m => ({ ...m, inclui: m.inclui.filter(h => doProjeto.has(h.toLowerCase())) }));
    const codigo = (lista: string[]) => lista.map(x => '`' + x + '`').join(', ');
    const linhas = mapas.map(m => {
        const partes: string[] = [];
        if (m.inclui.length) partes.push(`inclui ${codigo(m.inclui)}`);
        if (m.tipos.length) partes.push(`tipos ${codigo(m.tipos)}`);
        for (const e of m.enums) partes.push(`enum \`${e.nome}\` (${e.valores.join(', ')})`);
        if (m.prototipos.length) partes.push(`declara ${codigo(m.prototipos)}`);
        if (m.funcoes.length) partes.push(`funções ${codigo(m.funcoes)}`);
        return `- \`${m.nome}\`${partes.length ? ': ' + partes.join('; ') : ''}`;
    });
    const arestas = mapas.flatMap(m => m.inclui.map(h => [m.nome, h] as const));
    if (arestas.length > 0) {
        const id = (nome: string) => nome.replace(/[^A-Za-z0-9]/g, '_');
        linhas.push('', '```mermaid', 'graph LR',
            ...arestas.map(([de, para]) => `    ${id(de)}["${de}"] --> ${id(para)}["${para}"]`), '```');
    }
    return linhas.join('\n');
}
