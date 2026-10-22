// Ajuda offline (sem IA): traduz as mensagens do GCC para o português e
// procura erros clássicos de iniciantes que o compilador não explica bem.
// Não depende da API do VS Code.

export interface DicaDidatica {
    linha: number;        // começa em 1
    coluna: number;       // começa em 1
    comprimento: number;
    regra: string;
    mensagem: string;
    aula: number;
}

// ---------------------------------------------------------------------------
// Tradução das mensagens do GCC
// ---------------------------------------------------------------------------

interface Traducao {
    padrao: RegExp;
    texto: (m: RegExpMatchArray) => string;
    aula: number;
}

const TRADUCOES: Traducao[] = [
    { padrao: /expected ';' before/, aula: 2, texto: () => 'Provavelmente faltou um ";" no fim da instrução anterior (muitas vezes, na linha de cima).' },
    { padrao: /'(\w+)' undeclared/, aula: 3, texto: m => `A variável "${m[1]}" não foi declarada. Confira se ela foi declarada antes de ser usada e se o nome está igual (o C diferencia maiúsculas de minúsculas).` },
    { padrao: /implicit declaration of function '(\w+)'/, aula: 16, texto: m => `A função "${m[1]}" foi usada sem ser declarada antes: falta o #include da biblioteca dela (ex.: stdio.h, string.h, math.h, stdlib.h) ou o protótipo da sua função antes da main. Confira também se o nome está escrito certo.` },
    { padrao: /format '%\w+' expects argument of type '\w+ \*', but argument \d+ has type '(?!.*\*)/, aula: 5, texto: () => 'O scanf precisa do ENDEREÇO da variável para guardar o valor. Confira se faltou o "&" antes do nome da variável.' },
    { padrao: /format '(%\w+)' expects argument of type '([^']+)', but argument \d+ has type '([^']+)'/, aula: 3, texto: m => `O especificador ${m[1]} espera um valor do tipo "${m[2]}", mas recebeu "${m[3]}". Lembre: %d para int, %f para float, %lf no scanf de double, %c para char e %s para string.` },
    { padrao: /suggest parentheses around assignment used as truth value/, aula: 6, texto: () => 'Você usou "=" (atribuição) dentro de uma condição. Para comparar dois valores, o C usa "==".' },
    { padrao: /expected declaration or statement at end of input/, aula: 2, texto: () => 'O arquivo terminou com algum bloco aberto: provavelmente falta fechar uma chave "}".' },
    { padrao: /expected expression before/, aula: 4, texto: () => 'Falta algo antes deste ponto: um valor, uma variável, um parêntese ou um operador.' },
    { padrao: /expected '\)' before/, aula: 6, texto: () => 'Algum parêntese "(" não foi fechado, ou falta um operador entre dois valores.' },
    { padrao: /control reaches end of non-void function/, aula: 16, texto: () => 'Esta função deveria devolver um valor, mas existe um caminho que chega ao fim sem "return".' },
    { padrao: /unused variable '(\w+)'/, aula: 3, texto: m => `A variável "${m[1]}" foi declarada mas nunca foi usada.` },
    { padrao: /'(\w+)' (?:is|may be) used uninitialized/, aula: 3, texto: m => `A variável "${m[1]}" está sendo usada antes de receber um valor, então pode conter "lixo" de memória.` },
    { padrao: /comparison with string literal|comparison between pointer and integer/, aula: 13, texto: () => 'Strings não se comparam com "==" em C (isso compara endereços). Para comparar o conteúdo, use strcmp (string.h).' },
    { padrao: /assignment to expression with array type/, aula: 13, texto: () => 'Não dá para atribuir com "=" a um vetor ou string depois da declaração. Para strings, use strcpy; para vetores, atribua posição por posição.' },
    { padrao: /makes (?:pointer from integer|integer from pointer) without a cast/, aula: 19, texto: () => 'Um endereço (ponteiro) e um valor inteiro foram misturados. Confira se faltou um "&" ou um "*", ou se o tipo do parâmetro está certo.' },
    { padrao: /incompatible (?:pointer )?type/, aula: 17, texto: () => 'O tipo do valor não combina com o esperado (por exemplo, o tipo do parâmetro da função ou do ponteiro).' },
    { padrao: /array subscript -?\d+ is (?:above|below) array bounds|array subscript .* is outside array bounds/, aula: 11, texto: () => 'Acesso fora do vetor: os índices válidos vão de 0 até tamanho − 1.' },
    { padrao: /stray '\\?\d+' in program|stray '.' in program/, aula: 2, texto: () => 'Há um caractere inválido no código. Isso costuma acontecer com aspas “curvas” ou outros símbolos copiados de PDF ou do Word: redigite as aspas.' },
    { padrao: /too few arguments to function '(\w+)'/, aula: 16, texto: m => `A função "${m[1]}" foi chamada com MENOS argumentos do que precisa.` },
    { padrao: /too many arguments to function '(\w+)'/, aula: 16, texto: m => `A função "${m[1]}" foi chamada com MAIS argumentos do que recebe.` },
    { padrao: /conflicting types for '(\w+)'/, aula: 16, texto: m => `A função "${m[1]}" aparece declarada de dois jeitos diferentes: o protótipo não combina com a definição (ou ela foi usada antes de ser declarada).` },
    { padrao: /'return' with a value, in function returning void/, aula: 16, texto: () => 'Uma função void não devolve valor: use apenas "return;" ou mude o tipo de retorno.' },
    { padrao: /'return' with no value, in function returning non-void/, aula: 16, texto: () => 'Esta função precisa devolver um valor: escreva "return valor;".' },
    { padrao: /missing terminating (?:"|') character/, aula: 2, texto: () => 'Faltou fechar as aspas.' },
    { padrao: /division by zero/, aula: 4, texto: () => 'Divisão por zero.' },
    { padrao: /statement with no effect/, aula: 4, texto: () => 'Esta linha não faz nada. Talvez você quisesse atribuir ("x = 5;") e escreveu uma comparação ("x == 5;").' },
    { padrao: /'else' without a previous 'if'/, aula: 6, texto: () => 'Este "else" não tem um "if" correspondente. Confira se há um ";" logo depois do "if (...)" ou se faltam chaves.' },
    { padrao: /break statement not within loop or switch/, aula: 9, texto: () => 'O "break" só pode ser usado dentro de um laço ou de um switch.' },
    { padrao: /continue statement not within a loop/, aula: 9, texto: () => 'O "continue" só pode ser usado dentro de um laço.' },
    { padrao: /this '(?:for|if|while|else)' clause does not guard/, aula: 10, texto: () => 'A indentação engana: sem chaves, só a PRIMEIRA instrução fica dentro do for/if/while. Use chaves { } para incluir as demais.' },
    { padrao: /(\w+)' redeclared|redefinition of '(\w+)'/, aula: 3, texto: m => `"${m[1] ?? m[2]}" foi declarada duas vezes no mesmo escopo.` },
    { padrao: /lvalue required as (?:left operand of assignment|increment operand)/, aula: 4, texto: () => 'O lado esquerdo do "=" (ou do ++) precisa ser uma variável. Talvez você quisesse comparar ("==").' },
];

export interface TraducaoDoGcc {
    texto: string;
    aula: number;
}

export function traduzirMensagemGcc(mensagem: string): TraducaoDoGcc | undefined {
    for (const t of TRADUCOES) {
        const m = mensagem.match(t.padrao);
        if (m) {
            return { texto: t.texto(m), aula: t.aula };
        }
    }
    return undefined;
}

// ---------------------------------------------------------------------------
// Erros clássicos procurados no código
// ---------------------------------------------------------------------------

/** Troca comentários e o conteúdo de strings/chars por espaços, mantendo as posições. */
export function limparCodigo(codigo: string): string {
    let saida = '';
    let i = 0;
    while (i < codigo.length) {
        const c = codigo[i];
        const prox = codigo[i + 1];
        if (c === '/' && prox === '/') {
            while (i < codigo.length && codigo[i] !== '\n') { saida += ' '; i++; }
        } else if (c === '/' && prox === '*') {
            saida += '  '; i += 2;
            while (i < codigo.length && !(codigo[i] === '*' && codigo[i + 1] === '/')) { saida += codigo[i] === '\n' ? '\n' : ' '; i++; }
            if (i < codigo.length) { saida += '  '; i += 2; }
        } else if (c === '"' || c === '\'') {
            saida += c; i++;
            while (i < codigo.length && codigo[i] !== c && codigo[i] !== '\n') {
                if (codigo[i] === '\\' && i + 1 < codigo.length) { saida += '  '; i += 2; continue; }
                saida += ' '; i++;
            }
            if (i < codigo.length && codigo[i] === c) { saida += c; i++; }
        } else {
            saida += c; i++;
        }
    }
    return saida;
}

/** Posição (índice) do parêntese que fecha o que abre em `inicio`. */
function fechaParentese(texto: string, inicio: number): number {
    let nivel = 0;
    for (let i = inicio; i < texto.length; i++) {
        if (texto[i] === '(') nivel++;
        else if (texto[i] === ')' && --nivel === 0) return i;
    }
    return -1;
}

function posicao(texto: string, indice: number): { linha: number; coluna: number } {
    const antes = texto.slice(0, indice);
    const linha = antes.split('\n').length;
    return { linha, coluna: indice - antes.lastIndexOf('\n') };
}

const TIPOS_INTEIROS = '(?:unsigned\\s+|signed\\s+|long\\s+|short\\s+)*(?:int|long|short|char)';

export function analisarCodigo(codigo: string): DicaDidatica[] {
    const texto = limparCodigo(codigo);
    const dicas: DicaDidatica[] = [];
    const adicionar = (indice: number, comprimento: number, regra: string, aula: number, mensagem: string) => {
        const { linha, coluna } = posicao(texto, indice);
        if (!dicas.some(d => d.linha === linha && d.regra === regra)) {
            dicas.push({ linha, coluna, comprimento: Math.max(1, comprimento), regra, aula, mensagem });
        }
    };

    // Condições de if/while/for: "=" em vez de "==", ";" logo após o if/for/while, "a < x < b".
    for (const m of texto.matchAll(/\b(if|while|for)\s*\(/g)) {
        const abre = m.index! + m[0].length - 1;
        const fecha = fechaParentese(texto, abre);
        if (fecha < 0) continue;
        const condicao = texto.slice(abre + 1, fecha);
        const palavra = m[1];

        const partesDaCondicao = palavra === 'for' ? [condicao.split(';')[1] ?? ''] : [condicao];
        for (const parte of partesDaCondicao) {
            const atribuicao = parte.match(/(?<![=!<>+\-*/%&|^])=(?!=)/);
            if (atribuicao && !/^\s*\(/.test(parte.slice(0, atribuicao.index))) {
                const deslocamento = palavra === 'for' ? condicao.indexOf(parte) : 0;
                adicionar(abre + 1 + deslocamento + atribuicao.index!, 1, 'atribuicao-na-condicao', 6,
                    'Na condição há um "=" (atribuição). Para comparar valores, o C usa "==". É isso mesmo que você queria?');
            }
            const encadeada = parte.match(/[\w)\]]+\s*(<=?|>=?)\s*[\w(]+\s*(<=?|>=?)\s*[\w(]+/);
            if (encadeada) {
                adicionar(abre + 1 + condicao.indexOf(parte) + encadeada.index!, encadeada[0].length, 'comparacao-encadeada', 6,
                    `"${encadeada[0].trim()}" não funciona como na matemática em C: a primeira comparação vira 0 ou 1 antes da segunda. Como juntar duas comparações com o operador lógico E (&&)?`);
            }
        }

        const depois = texto.slice(fecha + 1).match(/^\s*;/);
        if (depois) {
            const textoAntes = texto.slice(0, m.index!).trimEnd();
            const ehFimDeDoWhile = palavra === 'while' && textoAntes.endsWith('}');
            if (!ehFimDeDoWhile) {
                adicionar(fecha + 1 + depois[0].indexOf(';'), 1, 'ponto-e-virgula-apos-' + palavra, palavra === 'if' ? 6 : palavra === 'for' ? 10 : 8,
                    palavra === 'if'
                        ? 'Há um ";" logo depois do "if (...)". Ele termina o if ali mesmo, e o bloco de baixo sempre executa.'
                        : `Há um ";" logo depois do "${palavra} (...)". Ele vira o corpo do laço (um laço vazio), e o bloco de baixo executa só uma vez depois.`);
            }
        }
    }

    // Vetores: laço "i <= tamanho" usado como índice.
    const vetores = new Map<string, string>();
    for (const m of texto.matchAll(/\b\w+\s+(\w+)\s*\[\s*(\w+)\s*\]/g)) {
        if (!/^(return|else|case)$/.test(m[1])) vetores.set(m[1], m[2]);
    }
    for (const m of texto.matchAll(/\bfor\s*\(([^;]*);\s*(\w+)\s*<=\s*(\w+)\s*;/g)) {
        const [, , variavel, limite] = m;
        for (const [nome, tamanho] of vetores) {
            if (tamanho === limite && new RegExp(`\\b${nome}\\s*\\[\\s*${variavel}\\s*\\]`).test(texto)) {
                adicionar(m.index! + m[0].indexOf('<='), 2, 'indice-ate-tamanho', 11,
                    `O vetor "${nome}" tem ${tamanho} posições, com índices de 0 até ${tamanho} − 1. Com "${variavel} <= ${limite}", qual será o último índice acessado?`);
                break;
            }
        }
    }

    // Strings comparadas com "==".
    const strings = new Set([...texto.matchAll(/\bchar\s+(\w+)\s*\[/g)].map(m => m[1]));
    for (const m of texto.matchAll(/(\w+)\s*(==|!=)\s*(\w+|")/g)) {
        if (strings.has(m[1]) || strings.has(m[3]) || m[3] === '"') {
            adicionar(m.index!, m[0].length, 'string-com-igual', 13,
                'Strings não se comparam com "==" em C: isso compara os endereços, não o texto. Qual função da string.h compara o conteúdo?');
        }
    }
    for (const m of texto.matchAll(/"\s*(==|!=)/g)) {
        adicionar(m.index!, m[0].length, 'string-com-igual', 13,
            'Strings não se comparam com "==" em C: isso compara os endereços, não o texto. Qual função da string.h compara o conteúdo?');
    }

    // Divisão inteira guardada em float/double.
    const reais = new Set([...texto.matchAll(/\b(?:float|double)\s+([^;]+);/g)].flatMap(m => nomesDeclarados(m[1])));
    const inteiros = new Set([...texto.matchAll(new RegExp(`\\b${TIPOS_INTEIROS}\\s+([^;(]+);`, 'g'))].flatMap(m => nomesDeclarados(m[1])));
    for (const m of texto.matchAll(/(?:\b(?:float|double)\s+)?\b(\w+)\s*=\s*([^;=]+\/[^;]+);/g)) {
        const [, destino, expressao] = m;
        if (!reais.has(destino) || /\(\s*(?:float|double)\s*\)|\d\.\d*|\.\d|\d[eE]/.test(expressao)) continue;
        const identificadores = expressao.match(/[A-Za-z_]\w*/g) ?? [];
        if (identificadores.every(id => inteiros.has(id))) {
            adicionar(m.index! + m[0].indexOf('/'), 1, 'divisao-inteira', 4,
                `"${expressao.trim()}" usa só valores inteiros, então a divisão é INTEIRA (a parte decimal se perde) antes de ir para "${destino}". Como fazer a divisão com casas decimais?`);
        }
    }

    // gets
    for (const m of texto.matchAll(/\bgets\s*\(/g)) {
        adicionar(m.index!, 4, 'gets', 13, 'A função gets é insegura e foi removida do C. Use fgets(variavel, tamanho, stdin).');
    }

    return dicas.sort((a, b) => a.linha - b.linha || a.coluna - b.coluna);
}

function nomesDeclarados(lista: string): string[] {
    return lista.split(',').map(parte => parte.replace(/=.*$/, '').replace(/[*\s]/g, '').replace(/\[.*$/, '')).filter(n => /^[A-Za-z_]\w*$/.test(n));
}
