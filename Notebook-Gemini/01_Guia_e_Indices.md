# Guia e Índices – Fundamentos de Programação em C

Este arquivo reúne o índice do material de ensino e o índice das videoaulas. Use-o para descobrir qual aula do material consultar e qual videoaula (com link) indicar ao aluno. Os arquivos 02 a 04 deste notebook contêm o material completo e as transcrições.

## Índice do Material de Ensino Verificado

Este índice resume o conteúdo das 21 aulas convertidas a partir dos slides originais (PDF) da pasta `Material-Ensino-Não-Verificado`. Cada aula foi revisada tecnicamente, estruturada em Markdown (mais eficiente para busca/recuperação por IA do que PDF de slides) e enriquecida com seções pensadas especificamente para um tutor socrático: **erros comuns**, **perguntas socráticas sugeridas** e **notas de revisão** (correções aplicadas em relação ao material original).

### Como usar este material (para a IA)
- Cada arquivo `Aula_NN_*.md` cobre um tópico. Use o campo `topicos` do cabeçalho (frontmatter) de cada arquivo para decidir qual(is) arquivo(s) consultar a partir da pergunta do aluno.
- A seção **"Erros comuns e pontos de atenção"** de cada aula lista os enganos mais frequentes de alunos nesse tópico — útil para formular perguntas socráticas em vez de dar a resposta direta.
- A seção **"Perguntas socráticas sugeridas"** traz exemplos de perguntas que levam o aluno a pensar, sem entregar a solução.
- A seção **"Notas de revisão"** indica onde o conteúdo original (slide) foi corrigido ou complementado — relevante caso o aluno cite algo que pareça contradizer o material revisado.
- Para indicar ao aluno **qual videoaula assistir** sobre um tópico (com link), use `Transcrição-Verificadas/_INDICE_VIDEOAULAS.md`.

### Sumário das aulas

| # | Arquivo | Tópico | Pré-requisitos | Transcrição verificada? |
|---|---|---|---|---|
| 01 | `Aula_01_Introducao.md` | Conceitos básicos: computador, hardware/software, bits/bytes, algoritmo | — | Sim |
| 02 | `Aula_02_Linguagem_C.md` | Origem e características do C, estrutura de um programa, `printf`, comentários | Aula 01 | Sim |
| 03 | `Aula_03_Variaveis.md` | Variáveis, escopo, tipos de dados, especificadores de formato, constantes | Aula 02 | Sim |
| 04 | `Aula_04_Operadores_Aritmeticos.md` | Operadores aritméticos, precedência, divisão inteira, casting | Aula 03 | Sim |
| 05 | `Aula_05_Entrada_de_Dados.md` | `scanf`, operador `&`, problema do buffer do teclado | Aula 03, 04 | Sim |
| 06 | `Aula_06_Selecao_If_Else.md` | `if`/`else`, operadores relacionais e lógicos, ternário | Aula 04, 05 | Sim |
| 07 | `Aula_07_Switch.md` | `switch`/`case`/`break`/`default` | Aula 06 | Sim |
| 08 | `Aula_08_Repeticao_While.md` | `while`, contador, acumulador | Aula 06 | Sim |
| 09 | `Aula_09_Repeticao_Do_While.md` | `do...while`, `break`, `continue`, `goto` | Aula 08 | Sim |
| 10 | `Aula_10_Repeticao_For.md` | `for`, `for` aninhado, C99 | Aula 08, 09 | Sim |
| 11 | `Aula_11_Vetores.md` | Vetores (arrays), índices, inicialização | Aula 10 | Sim |
| 12 | `Aula_12_Matrizes.md` | Matrizes, vetores bidimensionais, operações matriciais | Aula 10, 11 | Sim |
| 13 | `Aula_13_Strings.md` | Strings, `fgets`, `string.h` (`strlen`, `strcpy`, `strcat`, `strcmp`) | Aula 11 | Sim |
| 14 | `Aula_14_Structs.md` | `struct`, operador `.`, inicialização, vetor de structs, aninhamento, `typedef` | Aula 03, 11, 13 | Sim |
| 15 | `Aula_15_Union_e_Enum.md` | `union`, `enum`, discriminador (enum + union + struct) | Aula 07, 14 | Sim |
| 16 | `Aula_16_Funcoes.md` | Funções, parâmetros, retorno, `void`, escopo, `argc`/`argv`, Doxygen | Aula 03, 13 | Sim |
| 17 | `Aula_17_Passagem_de_Parametros.md` | Passagem por cópia/referência, `&`/`*`, vetores e structs como parâmetro, `->` | Aula 05, 11, 14, 16 | Sim |
| 18 | `Aula_18_Recursividade.md` | Recursão, caso base, pilha de chamadas, recursão com retorno, recursão de cauda | Aula 10, 16 | Sim |
| 19 | `Aula_19_Ponteiros.md` | Ponteiros, `&`/`*`, `NULL`, aritmética, `void*`, ponteiros e vetores, `**` | Aula 11, 17 | Sim |
| 20 | `Aula_20_Alocacao_Dinamica.md` | Stack x heap, `malloc`, `calloc`, `realloc`, `free`, matriz e struct dinâmicas | Aula 14, 18, 19 | Sim |
| 21 | `Aula_21_Arquivos.md` | Arquivos texto/binário, `fopen`/`fclose`, modos, buffer, `fgetc`/`fputc`, `fgets`/`fputs` | Aula 13, 19 | Sim |

### Correções técnicas aplicadas durante a revisão
Estas são as correções de conteúdo (não apenas reformatação) feitas em relação ao material original não verificado — relevantes para a IA saber que o material revisado diverge intencionalmente do slide original nesses pontos específicos:

1. **Aula 09 (Do While)**: os exemplos de saída de `break` e `continue` no slide estavam incompletos (faltava o `0` inicial da sequência impressa). Corrigido para a saída real: `0 1 2 3 4` (break) e `0 1 2 3 4 6 7 8 9` (continue).
2. **Aula 13 (Strings)**: a definição de `strcmp()` no slide original tinha os sinais de retorno **invertidos** (dizia que retorna positivo quando string1 < string2, e negativo quando string1 > string2). O correto — confirmado com a bibliografia da disciplina e o comportamento padrão da função — é o **oposto**: negativo quando string1 < string2, positivo quando string1 > string2.
3. **Aula 16 (Funções)**: o slide afirma que "`void` não é um tipo". Pelo padrão C, `void` **é** um tipo (incompleto, sem valores). Corrigido.
4. **Aula 17 (Passagem de Parâmetros)**: o slide sobre structs dizia que alterações na função "não são realizadas no **vetor/matriz** original" — erro de cópia; o correto é "na **struct** original".
5. **Aula 18 (Recursividade)**: a nota sobre **recursão de cauda** aparece logo abaixo de `somaNumeros`, sugerindo que ela é de cauda — **não é** (após a chamada ainda há `valor + ...`). Esclarecido, com exemplo de versão de cauda com acumulador.
6. **Aula 19 (Ponteiros)**: (a) o exemplo de `void*` (`void *ptr = 0x5DC; ptr++;`) **não compila no GCC 15** (inteiro atribuído a ponteiro sem cast), e aritmética em `void*` é **extensão do GCC**, não padrão C; (b) os diagramas de memória somam endereços hexadecimais como decimais (`0xF068 → 0xF072`; o correto é `0xF06C`); (c) imprimir ponteiro com `%d` é comportamento indefinido. Todos corrigidos.
7. **Aula 20 (Alocação Dinâmica)**: (a) o slide diz que `calloc` "faz o mesmo que `malloc`" — omite que **`calloc` zera a memória**; (b) o exemplo de `realloc` imprime posições novas **não inicializadas**, usa `p = realloc(p, ...)` sem ponteiro temporário (vazamento se falhar) e não libera a memória; (c) protótipos usam `unsigned int` em vez de `size_t`; (d) `sizeof` impresso com `%ld` em vez de `%zu`. Todos corrigidos.
8. **Aula 21 (Arquivos)**: o slide diz que `fgets` lê até `tamanho` caracteres — o correto é **até `tamanho - 1`** (a última posição é do `'\0'`). Além disso, um slide do PDF tem código **sobreposto/ilegível** (`FIFLIEL*E *faorpqe=n...`), reconstruído como `FILE *arq; arq = fopen("dados.txt", "w");`.

### Observações de boas práticas (não são "erros", mas merecem nota)
- **Aulas 05, 08 e 13** usam `setbuf(stdin, NULL);` para limpar o buffer do teclado após misturar leitura de números e caracteres. Essa prática funciona nos compiladores usados na disciplina (Windows/MinGW), mas **não é comportamento garantido pelo padrão C**. O material revisado mantém o uso do slide original (para não contradizer o que o aluno vê em aula) mas documenta a ressalva e uma alternativa mais portável (`scanf(" %c", ...)`), para a IA poder explicar isso caso o aluno tenha dúvidas ou use outro ambiente (ex.: Linux/gcc puro).
- **Aula 17**: a linguagem C tecnicamente só tem passagem **por valor**; "por referência" é passar um endereço por valor. O material mantém a terminologia da aula e documenta a nuance.
- **Aula 20**: o *cast* no retorno do `malloc` (`(int*) malloc(...)`) é opcional em C; o material mantém o estilo do slide.

### Lacunas conhecidas
- Todas as aulas de 01 a 21 têm transcrição verificada em `Transcrição-Verificadas/`. As transcrições das Aulas 14, 15, 18, 19 e 20 foram verificadas em 2026-10-21 e trazem exemplos extras de código (ex.: union `Quantidade` e enum de cores na Aula 15; comparação de conteúdo `*ptr1 == *ptr2` na Aula 19). Na **Aula 18**, o professor afirma em vídeo que `somaNumeros` é recursão de cauda — a transcrição verificada sinaliza isso com uma nota de correção, coerente com este material.
- A Aula 21 (Arquivos) tem videoaula ("Arquivos - Modo Texto") e transcrição verificada (`Transcrição-Verificadas/Aula_21_Arquivos_Modo_Texto.md`, verificada em 2026-10-21). É a **Parte 1** do assunto: leitura/escrita de blocos de bytes e de texto formatado (`fread`/`fwrite`, `fprintf`/`fscanf`) não estão neste PDF.
- As Aulas 14, 15, 16, 17 e 18 não trazem lista de exercícios no PDF original.
- Este material cobre os slides de aula (teoria + exercícios propostos); não inclui as transcrições completas das videoaulas, que ficam em pastas separadas (`Transcrição-Verificadas` / `Transcrição-Não-Verificadas`) e cobrem um projeto de verificação distinto.

---

## Índice das Videoaulas

### Como usar este índice (para a IA)
- **Objetivo:** quando o aluno tiver uma dúvida, indicar **qual videoaula** (e, se possível, **qual parte** dela) ele deve assistir. O conteúdo técnico de referência para responder é o `Material-Ensino-Verificado/`; este índice serve só para localizar o vídeo.
- Procure o assunto na **Parte 2 (Tópico → vídeo)**. Se precisar de mais detalhe, a **Parte 1** lista as seções de cada vídeo na ordem em que aparecem (as transcrições não têm marcação de tempo, então indique a parte do vídeo — "começo", "meio", "final" — pela ordem da seção).
- Ao indicar um vídeo, cite o nome da aula e o link. Se o link estiver **pendente**, indique só o nome da aula.
- Alguns tópicos aparecem em mais de um vídeo; a coluna "Vídeo principal" indica onde o assunto é explicado em detalhe.

### Parte 1 – Vídeos e o que cada um cobre

| Vídeo | Link | Transcrição | Seções do vídeo (na ordem) |
|---|---|---|---|
| Aula 01 – Introdução | https://www.youtube.com/watch?v=klvMCgajux8 | `Aula_01_Introducao.md` | O que é um computador · hardware e software · software básico × aplicativo · bits, bytes e unidades · megabits × megabytes · linguagem de programação e compilação · algoritmos · entender o problema · os quatro passos para resolver um problema |
| Aula 02 – Linguagem C | https://www.youtube.com/watch?v=zFbgefry9E8 | `Aula_02_Linguagem_C.md` | Linguagem de máquina e Assembly · história e características do C · arquivo `.c`, compilador e GCC · estrutura de uma função · Hello World · compilar e executar · bibliotecas e `#include` · `printf` e `return 0` · caracteres de escape · comentários |
| Aula 03 – Variáveis | https://www.youtube.com/watch?v=H8Aa8g15i_o | `Aula_03_Variaveis.md` | O que são variáveis · escopo global × local · valor "lixo" · atribuição · tipos (`char`, `int`, `float`, `double`) · regras e convenções · notação científica · `printf` com `%d`, `%f`, `%c`, `%.2f` · bases numéricas, sufixos e `sizeof` · constantes (`#define`, `const`) |
| Aula 04 – Operadores Aritméticos | https://www.youtube.com/watch?v=Mv9EzCDKD0A | `Aula_04_Operadores_Aritmeticos.md` | Soma de dois valores · execução passo a passo na memória · subtração, multiplicação e divisão inteira · resto `%` · divisão com `float` e *cast* · `++`/`--` · pré × pós-incremento · precedência de operadores |
| Aula 05 – Entrada de Dados | https://www.youtube.com/watch?v=Wr1IwXKhhHI | `Aula_05_Entrada_de_Dados.md` | Sintaxe do `scanf` · ler a idade · memória RAM e o `&` · exibir endereço com `%p` · vários valores em um `scanf` (data) · problema do buffer do teclado |
| Aula 06 – Seleção `if`/`else` | https://www.youtube.com/watch?v=dtNkeh3EDwU | `Aula_06_Estrutura_de_Selecao_if_else.md` | Sintaxe do `if`/`else` · operadores relacionais · maior ou menor de idade · operadores lógicos `&&`, `\|\|`, `!` · exemplo do adolescente · `if` aninhado · indentação · omitir chaves e `else if` · operador ternário |
| Aula 07 – Seleção `switch` | https://www.youtube.com/watch?v=343Xh7aGps0 | `Aula_07_Estrutura_de_Selecao_Switch.md` | Quando usar `switch` · sintaxe (`case`, `break`, `default`) · menu de cores com `int` · versão com `char` (aspas simples, maiúsculas × minúsculas) · vários `case` para um `break` |
| Aula 08 – Repetição `while` | https://www.youtube.com/watch?v=7nM5H3VzZ5c | `Aula_08_Estrutura_de_Repeticao_While.md` | Como o `while` funciona · sintaxe · contar de 0 até 5 · velocidade do computador · laço infinito · repetições conhecidas × desconhecidas · variável contador · variável acumulador |
| Aula 09 – Repetição `do-while` | https://www.youtube.com/watch?v=JIprFnixsZA | `Aula_09_Estrutura_de_Repeticao_Do_While.md` | Diferença `while` × `do-while` · sintaxe (ponto e vírgula final) · validar idade · `break`, `continue`, `goto` · por que não usar `goto` |
| Aula 10 – Repetição `for` | https://www.youtube.com/watch?v=YOM0w0sih8s | `Aula_10_Estrutura_de_Repeticao_For.md` | Sintaxe e fluxo do `for` · valores de 0 a 4 · contagem decrescente · de 2 em 2 e `+=` · variável declarada no `for` (C99) e escopo · `for` com duas variáveis · `for` aninhado e `usleep` |
| Aula 11 – Vetores | https://www.youtube.com/watch?v=YkJuhHWlymE | `Aula_11_Vetores.md` | O que é um vetor · declaração · índice de 0 a tamanho−1 · inicialização · percorrer com `for` · ler e exibir 5 idades · cuidado com índices fora do vetor |
| Aula 12 – Matrizes | https://www.youtube.com/watch?v=09rbob1I8J0 | `Aula_12_Matrizes.md` | Matriz como vetor de vetores · declaração (linhas e colunas) · índices · atribuir e ler · inicialização com chaves · `for` aninhado · exibir como tabela · matriz 3×3 · mais de duas dimensões |
| Aula 13 – Strings (Parte 1) | *pendente* | `Aula_13_Strings_Parte_1.md` | String e o terminador `\0` · declarar e inicializar · ler texto (`gets`, `scanf("%s")`, `fgets`) · remover `\n` com `strcspn` · matriz de caracteres (vários nomes) · limpar buffer (`setbuf`, `__fpurge`) · alinhar com `%10s`/`%-10s` |
| Aula 13 – Strings (Parte 2) | *pendente* | `Aula_13_Strings_Parte_2.md` | Biblioteca `string.h` · `strlen` (e acentos) · `strcpy` · `strcat` · `strcmp` · `strcasecmp` |
| Aula 14 – Estruturas (Struct) | https://www.youtube.com/watch?v=axWQRZNDtxI | `Aula_14_Estruturas_e_Definicao_de_Tipo.md` | Estruturas homogêneas × heterogêneas · definir `struct` · declarar variáveis · operador ponto · inicializar e atribuir · `strcpy` em membro string · vetor de structs · structs aninhadas · ler vetor de alunos com `for` · `typedef` |
| Aula 15 – União e Enumeração | https://www.youtube.com/watch?v=QOBkqIdfCcA | `Aula_15_Uniao_e_Enumeracao.md` | `union` × `struct` · sintaxe da `union` · tamanho (maior membro) · sobrescrita entre membros · quando usar · exemplo `Quantidade` (unidade/peso) · `enum` (dias da semana) · `enum` no `switch` · definindo valores do `enum` · menu de cores com `enum` · `typedef enum` · enum + union + struct juntos |
| Aula 16 – Funções (Parte 1) | https://www.youtube.com/watch?v=-Lx8YiDreSM | `Aula_16_Funcoes_Parte_1.md` | O que é uma função · vantagens · coesão e acoplamento · definir e chamar · `main` suspensa durante a chamada · função `mensagem` (`void`) · função chamando outra · definição antes do uso e cabeçalho |
| Aula 16 – Funções (Parte 2) | https://www.youtube.com/watch?v=wJmN3KgLGs0 | `Aula_16_Funcoes_Parte_2.md` | Escopo local × global · parâmetros e retorno · função `soma` · argumentos da `main` (`argc`, `argv`) · `atof` · executar com argumentos · documentação Doxygen |
| Aula 17 – Passagem de Parâmetros | https://www.youtube.com/watch?v=3lBAoi8l9ck | `Aula_17_Passagem_de_Parametros.md` | Passagem por cópia · passagem por referência · ponteiros, `&` e `*` · incrementar por referência e `(*p)++` · quando usar referência · vetores sempre por referência · structs por cópia × por ponteiro · operador seta `->` |
| Aula 18 – Recursividade | https://www.youtube.com/watch?v=nimqy3FH5c0 | `Aula_18_Recursividade.md` | Vaso de flores e caso base · função recursiva · iterativo × recursivo (exibir N até 1) · caso base e chamada recursiva · vantagens e desvantagens · ida e volta na pilha (`recursao(4)`) · recursão com retorno (`somaNumeros`) · simulação da soma até 6 |
| Aula 19 – Ponteiros | https://www.youtube.com/watch?v=96EdBQbsdH8 | `Aula_19_Ponteiros.md` | Variáveis e endereços · o que é ponteiro e `NULL` · `&` e `*` · exibir com `%p` · atribuição entre ponteiros · aritmética de ponteiros · comparar ponteiros × conteúdos · `void*` · ponteiros e vetores (`*(p + i)`) · ponteiro para ponteiro |
| Aula 20 – Alocação Dinâmica | https://www.youtube.com/watch?v=Xflkc4A1bSs | `Aula_20_Alocacao_Dinamica.md` | Pilha (*stack*) · *heap* · organização da memória e estouro de pilha · *stack* × *heap* · o que é alocação dinâmica · `malloc` e `sizeof` · verificar `NULL` · `calloc` · `realloc` · `free` · alocar vetor na prática · alocar e liberar matriz · alocar struct e vetor de structs |
| Aula 21 – Arquivos (Modo Texto) | https://www.youtube.com/watch?v=3SJ6MWo1NDc | `Aula_21_Arquivos_Modo_Texto.md` | O que são arquivos e por que usá-los · arquivo texto × binário · `stdio.h` e `FILE *` · `fopen`, caminhos absoluto e relativo · modos de abertura (`r`, `w`, `a`, binários e `+`) · verificar `NULL` e `exit` · `fclose` e buffer · `fputc`/`fgetc` e `EOF` (demonstração) · `stdin`/`stdout`/`stderr` · `fputs`/`fgets` (demonstração) |

### Parte 2 – Tópico → vídeo

Para dúvidas sobre um tópico, indique o **vídeo principal**; os "veja também" trazem o mesmo assunto com outra abordagem ou aplicação.

#### Fundamentos
| Tópico | Vídeo principal | Veja também |
|---|---|---|
| Computador, hardware, software | Aula 01 | — |
| Bits, bytes, KB/MB/GB, ASCII | Aula 01 | — |
| Algoritmo, como resolver um problema | Aula 01 | — |
| Compilador, GCC, compilar e executar | Aula 02 | — |
| Estrutura de um programa C, `main`, `return 0` | Aula 02 | Aula 16 (Parte 1) |
| `printf`, caracteres de escape (`\n`, `\t`) | Aula 02 | Aula 03 |
| `#include`, bibliotecas | Aula 02 | — |
| Comentários | Aula 02 | Aula 16 (Parte 2) – Doxygen |

#### Variáveis, operadores e entrada/saída
| Tópico | Vídeo principal | Veja também |
|---|---|---|
| Declaração de variáveis, tipos (`int`, `float`, `char`, `double`) | Aula 03 | — |
| Especificadores `%d`, `%f`, `%c`, `%.2f` | Aula 03 | Aula 04 |
| Lixo de memória (variável sem valor inicial) | Aula 03 | — |
| Escopo local × global | Aula 03 | Aula 16 (Parte 2), Aula 10 (escopo no `for`) |
| Constantes (`#define`, `const`) | Aula 03 | — |
| `sizeof` | Aula 03 | Aula 20 |
| Hexadecimal, octal, binário | Aula 03 | Aula 19 (endereços em hexadecimal) |
| Operadores aritméticos, precedência | Aula 04 | — |
| Divisão inteira e resto `%` | Aula 04 | — |
| Conversão de tipo (*cast*) | Aula 04 | Aula 19 (`void*`), Aula 20 (`malloc`) |
| `++` / `--`, pré × pós-incremento | Aula 04 | Aula 17 (`(*p)++`) |
| `scanf` e o operador `&` | Aula 05 | Aula 17 (por que o `scanf` usa `&`) |
| Endereço de memória, `%p` | Aula 05 | Aula 19 |
| Problema do buffer do teclado, `setbuf` | Aula 05 | Aula 13 (Parte 1), Aula 14 |

#### Controle de fluxo
| Tópico | Vídeo principal | Veja também |
|---|---|---|
| `if` / `else`, `else if`, `if` aninhado | Aula 06 | — |
| Operadores relacionais (`==`, `!=`, `>`...) | Aula 06 | — |
| Operadores lógicos (`&&`, `\|\|`, `!`) | Aula 06 | — |
| Operador ternário | Aula 06 | — |
| `switch`, `case`, `break`, `default` | Aula 07 | Aula 15 (`switch` com `enum`) |
| `while`, laço infinito | Aula 08 | — |
| Contador e acumulador | Aula 08 | — |
| `do-while`, validação de entrada | Aula 09 | — |
| `break`, `continue`, `goto` | Aula 09 | Aula 07 (`break` no `switch`) |
| `for`, `for` aninhado | Aula 10 | Aula 12 (percorrer matriz) |

#### Vetores, matrizes e strings
| Tópico | Vídeo principal | Veja também |
|---|---|---|
| Vetores: declaração, índices, inicialização | Aula 11 | Aula 19 (vetor e ponteiro) |
| Acessar fora do vetor | Aula 11 | — |
| Matrizes, `for` aninhado, exibir como tabela | Aula 12 | — |
| Matriz alocada dinamicamente | Aula 20 | Aula 12 |
| Strings, terminador `\0` | Aula 13 (Parte 1) | — |
| Ler strings: `gets`, `scanf("%s")`, `fgets`, `strcspn` | Aula 13 (Parte 1) | Aula 14 (`fgets` em membro de struct) |
| Vetor/matriz de strings (vários nomes) | Aula 13 (Parte 1) | — |
| Alinhar colunas `%10s` / `%-10s` | Aula 13 (Parte 1) | — |
| `strlen`, `strcpy`, `strcat` | Aula 13 (Parte 2) | Aula 14 (`strcpy` em struct), Aula 20 |
| `strcmp`, `strcasecmp` (comparar strings) | Aula 13 (Parte 2) | — |

#### Tipos definidos pelo usuário
| Tópico | Vídeo principal | Veja também |
|---|---|---|
| `struct`: definição, declaração, operador ponto | Aula 14 | — |
| Inicializar / atribuir (copiar) structs | Aula 14 | — |
| Vetor de structs | Aula 14 | Aula 17 (passar para função), Aula 20 (alocar) |
| Structs aninhadas | Aula 14 | — |
| `typedef` | Aula 14 | Aula 15 (`typedef union`/`enum`) |
| `union`, tamanho e sobrescrita de membros | Aula 15 | — |
| `enum`, valores padrão e definidos | Aula 15 | — |
| `enum` + `union` + `struct` (discriminador) | Aula 15 | — |

#### Funções, recursão, ponteiros e memória
| Tópico | Vídeo principal | Veja também |
|---|---|---|
| O que é função, vantagens, como chamar | Aula 16 (Parte 1) | — |
| Função `void`, função chamando função | Aula 16 (Parte 1) | — |
| Cabeçalho/protótipo, definir antes de usar | Aula 16 (Parte 1) | — |
| Parâmetros e retorno (`return`) | Aula 16 (Parte 2) | Aula 18 (recursão com retorno) |
| `argc` / `argv`, argumentos pela linha de comando, `atof` | Aula 16 (Parte 2) | — |
| Documentação Doxygen | Aula 16 (Parte 2) | — |
| Passagem por cópia × por referência | Aula 17 | — |
| Função que "retorna" mais de um valor | Aula 17 | — |
| Passar vetor para função | Aula 17 | — |
| Passar struct para função, operador seta `->` | Aula 17 | Aula 20 (`->` com struct alocada) |
| Recursão, caso base, chamada recursiva | Aula 18 | — |
| Pilha de chamadas (ida e volta) | Aula 18 | Aula 20 (pilha/*stack*) |
| Iterativo × recursivo | Aula 18 | — |
| Ponteiros: declaração, `NULL`, `&` e `*` | Aula 19 | Aula 17 (primeira apresentação) |
| Aritmética de ponteiros | Aula 19 | — |
| Comparar ponteiros × comparar conteúdo | Aula 19 | — |
| Ponteiro genérico `void*` | Aula 19 | Aula 20 (retorno do `malloc`) |
| Ponteiro e vetor (`*(p + i)` = `p[i]`) | Aula 19 | — |
| Ponteiro para ponteiro (`**`) | Aula 19 | Aula 20 (matriz dinâmica) |
| Stack × heap, estouro de pilha | Aula 20 | Aula 18 |
| `malloc`, `calloc`, `realloc`, `free` | Aula 20 | — |
| Verificar `NULL` após alocar | Aula 20 | — |
| Alocar struct / vetor de structs | Aula 20 | — |
| Arquivos texto × binário | Aula 21 | — |
| `fopen`, modos de abertura, caminhos, `fclose`, buffer | Aula 21 | — |
| `exit` (encerrar o programa em caso de erro) | Aula 21 | Aula 20 (após `malloc` falhar) |
| `stdin`, `stdout`, `stderr` | Aula 21 | Aula 13 (Parte 1) |
| `fgetc` / `fputc`, `EOF` | Aula 21 | — |
| `fgets` / `fputs` em arquivos | Aula 21 | Aula 13 (Parte 1) para `fgets` com `stdin` |

### Avisos ao indicar vídeos
- **Aula 18 (Recursividade):** no vídeo, o professor diz que `somaNumeros` é recursão de cauda, o que **não é correto**. Se o aluno vier com essa ideia do vídeo, use o material verificado para esclarecer.
- **Aula 20 (Alocação Dinâmica):** o vídeo não menciona que o `calloc` **zera a memória**; complemente com o material verificado.
- **Aula 19 (Ponteiros):** a aritmética com `void*` mostrada no vídeo é uma extensão do GCC, não é C padrão.

### Lacunas
- **Links pendentes:** Aula 13 – Strings (Partes 1 e 2). Quando forem adicionados em `Links-Aulas.txt`, basta preencher a coluna "Link" da Parte 1. Enquanto isso, indique o vídeo só pelo nome da aula.
- **Aula 21 (Arquivos – Modo Texto):** é a Parte 1 do assunto; leitura/escrita de sequências de bytes e de strings formatadas (`fread`/`fwrite`, `fprintf`/`fscanf`) ficam para uma próxima aula, ainda sem vídeo nem material.
