---
titulo: "Índice das Videoaulas (Fundamentos de Programação em C)"
descricao: "Mapa tópico → videoaula → link, montado a partir das transcrições verificadas, para o Tutor Socrático indicar ao aluno qual vídeo assistir para tirar uma dúvida."
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
total_videos: 20
revisado_em: 2026-10-21
---

# Índice das Videoaulas

## Como usar este índice (para a IA)
- **Objetivo:** quando o aluno tiver uma dúvida, indicar **qual videoaula** (e, se possível, **qual parte** dela) ele deve assistir. O conteúdo técnico de referência para responder é o `Material-Ensino-Verificado/`; este índice serve só para localizar o vídeo.
- Procure o assunto na **Parte 2 (Tópico → vídeo)**. Se precisar de mais detalhe, a **Parte 1** lista as seções de cada vídeo na ordem em que aparecem (as transcrições não têm marcação de tempo, então indique a parte do vídeo — "começo", "meio", "final" — pela ordem da seção).
- Ao indicar um vídeo, cite o nome da aula e o link. Se o link estiver **pendente**, indique só o nome da aula.
- Alguns tópicos aparecem em mais de um vídeo; a coluna "Vídeo principal" indica onde o assunto é explicado em detalhe.

## Parte 1 – Vídeos e o que cada um cobre

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

## Parte 2 – Tópico → vídeo

Para dúvidas sobre um tópico, indique o **vídeo principal**; os "veja também" trazem o mesmo assunto com outra abordagem ou aplicação.

### Fundamentos
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

### Variáveis, operadores e entrada/saída
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

### Controle de fluxo
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

### Vetores, matrizes e strings
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

### Tipos definidos pelo usuário
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

### Funções, recursão, ponteiros e memória
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

## Avisos ao indicar vídeos
- **Aula 18 (Recursividade):** no vídeo, o professor diz que `somaNumeros` é recursão de cauda, o que **não é correto**. Se o aluno vier com essa ideia do vídeo, use o material verificado para esclarecer.
- **Aula 20 (Alocação Dinâmica):** o vídeo não menciona que o `calloc` **zera a memória**; complemente com o material verificado.
- **Aula 19 (Ponteiros):** a aritmética com `void*` mostrada no vídeo é uma extensão do GCC, não é C padrão.

## Lacunas
- **Links pendentes:** Aula 13 – Strings (Partes 1 e 2). Quando forem adicionados em `Links-Aulas.txt`, basta preencher a coluna "Link" da Parte 1. Enquanto isso, indique o vídeo só pelo nome da aula.
- **Aula 21 (Arquivos – Modo Texto):** é a Parte 1 do assunto; leitura/escrita de sequências de bytes e de strings formatadas (`fread`/`fwrite`, `fprintf`/`fscanf`) ficam para uma próxima aula, ainda sem vídeo nem material.
