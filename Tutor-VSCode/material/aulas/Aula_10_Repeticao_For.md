---
titulo: "Aula 10 - Estrutura de Repetição For"
numero_aula: 10
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [for, laco de repeticao, for aninhado, declaracao de variavel no for, c99]
pre_requisitos: ["Aula 08 - Estrutura de Repetição While", "Aula 09 - Estrutura de Repetição Do While"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 10 - Repetição For.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_10_Estrutura_de_Repeticao_For.md"
revisado_em: 2026-10-11
status: verificado
---

# Aula 10 - Estrutura de Repetição For

## Objetivo
Apresentar o laço `for`, mais indicado quando o número de repetições é conhecido ou controlado por um contador, incluindo variações com múltiplas variáveis e laços aninhados.

## Conceitos-chave

- **Quando usar `for`**: o `while` é suficiente para qualquer tipo de repetição, mas o `for` costuma deixar o código mais compacto quando já se sabe quantas vezes o laço deve repetir (controle por contador).
- **Sintaxe**:
  ```c
  for (<inicializacao>; <condicao>; <incremento>) {
      // instruções repetidas
  } // for
  ```
  As três partes são executadas assim: a inicialização ocorre **uma única vez**, antes do laço; a condição é testada **antes de cada iteração**; o incremento ocorre **depois de cada iteração** (antes do próximo teste da condição).
  ```c
  for (contador = 0; contador < 5; contador++) {
      printf("Valor de c: %d", contador);
  }
  // decrescente:
  for (contador = 5; contador > 0; contador--) {
      printf("Valor de c: %d", contador);
  }
  ```
- **Declarando a variável de controle no próprio `for`**: a variável existe apenas durante o laço (escopo local ao `for`).
  ```c
  soma = 0;
  for (int c = 0; c < 5; c++) {
      soma = soma + c;
  }
  printf("Soma=%i", soma);
  ```
  Esse recurso (declarar a variável dentro do `for`) foi incorporado ao C na versão **C99** — para compilar, pode ser necessário indicar o padrão explicitamente (ex.: `gcc -std=c99` ou mais novo).
- **Múltiplas variáveis no `for`**: é possível inicializar/incrementar mais de uma variável, separando com vírgula (a condição continua sendo uma única expressão lógica).
  ```c
  soma = 0;
  for (int c = 0, d = 5; c < 5 && soma < 6; c++, d = d - 2) {
      soma = soma + c;
      printf("%i e %i\n", c, d);
  }
  printf("Soma=%i", soma);
  ```
  Atenção à diferença de uso entre vírgula (`,`, separa variáveis/expressões) e ponto e vírgula (`;`, separa as três partes do `for`).
- **`for` aninhado**: um laço `for` dentro de outro. Muito usado para percorrer estruturas bidimensionais (matrizes — ver Aula 12) ou gerar padrões/combinações.
  ```c
  for (int x = 0; x < 10; x++) {
      for (int y = 0; y < 10; y++) {
          printf("(%i,%i)", x, y);
      } // for interno
  } // for externo
  ```

## Erros comuns e pontos de atenção
- Trocar a vírgula pelo ponto e vírgula (ou vice-versa) ao usar múltiplas variáveis no `for` — a sintaxe exige `;` entre as três partes do `for` e `,` entre múltiplas inicializações/incrementos dentro da mesma parte.
- Modificar a variável de controle do laço dentro do corpo do `for` de forma que a condição nunca se torne falsa (loop infinito).
- Em laços `for` aninhados, confundir qual variável (`x` ou `y`, ou `l`/`c` em matrizes) controla as linhas e qual controla as colunas.
- Esquecer que, se a variável for declarada dentro do `for` (ex.: `for (int c = 0; ...)`), ela **não existe fora do laço** — tentar usá-la depois do `for` resulta em erro de compilação.

## Perguntas socráticas sugeridas
- "Nas três partes do `for (inicialização; condição; incremento)`, qual delas executa apenas uma vez e qual executa repetidamente?"
- "Se você precisasse imprimir uma tabela com linhas e colunas, por que dois laços `for` aninhados seriam úteis?"
- "O que aconteceria se você trocasse a vírgula por ponto e vírgula dentro de `for (int c=0, d=5; ...)`?"

## Exercícios da aula
1. Exibir todos os números de 1 a 100 (e de 100 a 1).
2. Exibir os múltiplos de 5 entre 1 e 500.
3. Exibir os números pares entre 240 e 730 (inclusive).
4. Calcular o fatorial de um número digitado.
5. Receber 10 números e calcular o quadrado de cada um.
6. Exibir `n` elementos da sequência de Fibonacci (t0=0, t1=1, tn = tn-1 + tn-2).
7. Usando `for` aninhado, exibir a tabuada de 1 a 10.
8. Receber um `tamanho` e exibir um quadrado de lado `tamanho` usando o caractere `#` (usando apenas `printf("#")` e `printf("\n")`).

## Notas de revisão
- Conteúdo técnico correto, incluindo a observação sobre a necessidade do padrão C99 para declarar a variável de controle dentro do `for`.
