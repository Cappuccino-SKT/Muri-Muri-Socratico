---
titulo: "Índice - Material de Ensino Verificado (Fundamentos de Programação em C)"
descricao: "Mapa de navegação do material de ensino convertido a partir dos slides das Aulas 01-21, revisado e estruturado para consulta por um Tutor Socrático de IA."
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
total_aulas: 21
revisado_em: 2026-10-21
---

# Índice do Material de Ensino Verificado

Este índice resume o conteúdo das 21 aulas convertidas a partir dos slides originais (PDF) da pasta `Material-Ensino-Não-Verificado`. Cada aula foi revisada tecnicamente, estruturada em Markdown (mais eficiente para busca/recuperação por IA do que PDF de slides) e enriquecida com seções pensadas especificamente para um tutor socrático: **erros comuns**, **perguntas socráticas sugeridas** e **notas de revisão** (correções aplicadas em relação ao material original).

## Como usar este material (para a IA)
- Cada arquivo `Aula_NN_*.md` cobre um tópico. Use o campo `topicos` do cabeçalho (frontmatter) de cada arquivo para decidir qual(is) arquivo(s) consultar a partir da pergunta do aluno.
- A seção **"Erros comuns e pontos de atenção"** de cada aula lista os enganos mais frequentes de alunos nesse tópico — útil para formular perguntas socráticas em vez de dar a resposta direta.
- A seção **"Perguntas socráticas sugeridas"** traz exemplos de perguntas que levam o aluno a pensar, sem entregar a solução.
- A seção **"Notas de revisão"** indica onde o conteúdo original (slide) foi corrigido ou complementado — relevante caso o aluno cite algo que pareça contradizer o material revisado.
- Para indicar ao aluno **qual videoaula assistir** sobre um tópico (com link), use `Transcrição-Verificadas/_INDICE_VIDEOAULAS.md`.

## Sumário das aulas

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

## Correções técnicas aplicadas durante a revisão
Estas são as correções de conteúdo (não apenas reformatação) feitas em relação ao material original não verificado — relevantes para a IA saber que o material revisado diverge intencionalmente do slide original nesses pontos específicos:

1. **Aula 09 (Do While)**: os exemplos de saída de `break` e `continue` no slide estavam incompletos (faltava o `0` inicial da sequência impressa). Corrigido para a saída real: `0 1 2 3 4` (break) e `0 1 2 3 4 6 7 8 9` (continue).
2. **Aula 13 (Strings)**: a definição de `strcmp()` no slide original tinha os sinais de retorno **invertidos** (dizia que retorna positivo quando string1 < string2, e negativo quando string1 > string2). O correto — confirmado com a bibliografia da disciplina e o comportamento padrão da função — é o **oposto**: negativo quando string1 < string2, positivo quando string1 > string2.
3. **Aula 16 (Funções)**: o slide afirma que "`void` não é um tipo". Pelo padrão C, `void` **é** um tipo (incompleto, sem valores). Corrigido.
4. **Aula 17 (Passagem de Parâmetros)**: o slide sobre structs dizia que alterações na função "não são realizadas no **vetor/matriz** original" — erro de cópia; o correto é "na **struct** original".
5. **Aula 18 (Recursividade)**: a nota sobre **recursão de cauda** aparece logo abaixo de `somaNumeros`, sugerindo que ela é de cauda — **não é** (após a chamada ainda há `valor + ...`). Esclarecido, com exemplo de versão de cauda com acumulador.
6. **Aula 19 (Ponteiros)**: (a) o exemplo de `void*` (`void *ptr = 0x5DC; ptr++;`) **não compila no GCC 15** (inteiro atribuído a ponteiro sem cast), e aritmética em `void*` é **extensão do GCC**, não padrão C; (b) os diagramas de memória somam endereços hexadecimais como decimais (`0xF068 → 0xF072`; o correto é `0xF06C`); (c) imprimir ponteiro com `%d` é comportamento indefinido. Todos corrigidos.
7. **Aula 20 (Alocação Dinâmica)**: (a) o slide diz que `calloc` "faz o mesmo que `malloc`" — omite que **`calloc` zera a memória**; (b) o exemplo de `realloc` imprime posições novas **não inicializadas**, usa `p = realloc(p, ...)` sem ponteiro temporário (vazamento se falhar) e não libera a memória; (c) protótipos usam `unsigned int` em vez de `size_t`; (d) `sizeof` impresso com `%ld` em vez de `%zu`. Todos corrigidos.
8. **Aula 21 (Arquivos)**: o slide diz que `fgets` lê até `tamanho` caracteres — o correto é **até `tamanho - 1`** (a última posição é do `'\0'`). Além disso, um slide do PDF tem código **sobreposto/ilegível** (`FIFLIEL*E *faorpqe=n...`), reconstruído como `FILE *arq; arq = fopen("dados.txt", "w");`.

## Observações de boas práticas (não são "erros", mas merecem nota)
- **Aulas 05, 08 e 13** usam `setbuf(stdin, NULL);` para limpar o buffer do teclado após misturar leitura de números e caracteres. Essa prática funciona nos compiladores usados na disciplina (Windows/MinGW), mas **não é comportamento garantido pelo padrão C**. O material revisado mantém o uso do slide original (para não contradizer o que o aluno vê em aula) mas documenta a ressalva e uma alternativa mais portável (`scanf(" %c", ...)`), para a IA poder explicar isso caso o aluno tenha dúvidas ou use outro ambiente (ex.: Linux/gcc puro).
- **Aula 17**: a linguagem C tecnicamente só tem passagem **por valor**; "por referência" é passar um endereço por valor. O material mantém a terminologia da aula e documenta a nuance.
- **Aula 20**: o *cast* no retorno do `malloc` (`(int*) malloc(...)`) é opcional em C; o material mantém o estilo do slide.

## Lacunas conhecidas
- Todas as aulas de 01 a 21 têm transcrição verificada em `Transcrição-Verificadas/`. As transcrições das Aulas 14, 15, 18, 19 e 20 foram verificadas em 2026-10-21 e trazem exemplos extras de código (ex.: union `Quantidade` e enum de cores na Aula 15; comparação de conteúdo `*ptr1 == *ptr2` na Aula 19). Na **Aula 18**, o professor afirma em vídeo que `somaNumeros` é recursão de cauda — a transcrição verificada sinaliza isso com uma nota de correção, coerente com este material.
- A Aula 21 (Arquivos) tem videoaula ("Arquivos - Modo Texto") e transcrição verificada (`Transcrição-Verificadas/Aula_21_Arquivos_Modo_Texto.md`, verificada em 2026-10-21). É a **Parte 1** do assunto: leitura/escrita de blocos de bytes e de texto formatado (`fread`/`fwrite`, `fprintf`/`fscanf`) não estão neste PDF.
- As Aulas 14, 15, 16, 17 e 18 não trazem lista de exercícios no PDF original.
- Este material cobre os slides de aula (teoria + exercícios propostos); não inclui as transcrições completas das videoaulas, que ficam em pastas separadas (`Transcrição-Verificadas` / `Transcrição-Não-Verificadas`) e cobrem um projeto de verificação distinto.
