---
titulo: "Aula 12 - Matrizes"
numero_aula: 12
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [matrizes, vetores bidimensionais, vetores multidimensionais, operacoes com matrizes]
pre_requisitos: ["Aula 10 - Estrutura de Repetição For", "Aula 11 - Vetores"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 12 - Matrizes.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_12_Matrizes.md"
revisado_em: 2026-10-11
status: verificado
---

# Aula 12 - Matrizes

## Objetivo
Estender o conceito de vetor para duas dimensões (linha e coluna), mostrando declaração, inicialização, preenchimento, exibição e operações básicas (soma, subtração, multiplicação por escalar e multiplicação de matrizes).

## Conceitos-chave

- **Matriz**: pode ser entendida como "um vetor de vetores" — um vetor bidimensional, visualizado como uma tabela de linhas e colunas. Também chamada de vetor multidimensional.
- **Declaração**: `tipo nome[linhas][colunas];`
  ```c
  int matriz[3][4]; // 3 linhas, 4 colunas
  ```
- **Acesso a uma posição**: `matriz[linha][coluna]`, onde tanto `linha` quanto `coluna` começam em índice **0**.
  ```c
  matriz[0][2] = 10;
  matriz[1][1] = 5;
  matriz[2][0] = 3;
  matriz[1][3] = 7;
  ```
- **Inicialização direta** (lista de listas, uma por linha):
  ```c
  int matriz[3][4] = {
      {10, 2, 45, 34},   // linha 0
      {-8, 3, 22, 58},   // linha 1
      {1,  2,  3,  4}    // linha 2
  };
  ```
- **Preenchimento com laços `for` aninhados** (laço externo = linha, laço interno = coluna, por convenção):
  ```c
  int l, c;
  int matriz[3][4];
  int contador = 1;
  for (l = 0; l < 3; l++) {
      for (c = 0; c < 4; c++) {
          matriz[l][c] = contador++;
      }
  }
  ```
- **Exibição** (mesma lógica de laços aninhados):
  ```c
  for (l = 0; l < 3; l++) {
      for (c = 0; c < 4; c++) {
          printf(" %4i", matriz[l][c]);
      }
      printf("\n");
  }
  ```

## Operações com matrizes

- **Soma/subtração**: só é possível entre matrizes de **mesma ordem** (mesmo número de linhas e colunas). O resultado é obtido somando/subtraindo elemento a elemento, na mesma posição: `C[x][y] = A[x][y] ± B[x][y]`.
- **Multiplicação por escalar**: multiplica-se cada elemento da matriz por um número: `C[x][y] = A[x][y] * escalar`.
- **Multiplicação de matrizes**: só é possível se o **número de colunas da matriz da esquerda for igual ao número de linhas da matriz da direita**. Se `A` é `m × n` e `D` é `n × p`, o produto `AD` é `m × p`. Cada elemento é uma soma de produtos:
  `AD[x][y] = A[x][0]*D[0][y] + A[x][1]*D[1][y] + A[x][2]*D[2][y] + ...`

  Exemplo verificado — `A` (2×3) multiplicada por `D` (3×2) resulta em `AD` (2×2):
  ```
  A = [ 3  7 10 ]      D = [ 1 2 ]      AD = [ 58  78 ]
      [ 1  5  0 ]          [ 5 6 ]           [ 26  32 ]
                           [ 2 3 ]
  ```
  Conferindo: `AD[0][0] = 3*1 + 7*5 + 10*2 = 3+35+20 = 58`; `AD[0][1] = 3*2 + 7*6 + 10*3 = 6+42+30 = 78`; `AD[1][0] = 1*1 + 5*5 + 0*2 = 26`; `AD[1][1] = 1*2 + 5*6 + 0*3 = 32`.

## Erros comuns e pontos de atenção
- Trocar a ordem de linha e coluna ao acessar (`matriz[coluna][linha]` em vez de `matriz[linha][coluna]`) — não gera erro de compilação se as dimensões "combinarem" por coincidência, mas produz resultado errado.
- Tentar somar/multiplicar matrizes com dimensões incompatíveis (ex.: somar uma matriz 2×3 com uma 3×2).
- Nos laços aninhados, confundir qual variável controla linhas e qual controla colunas, especialmente em matrizes não quadradas (número de linhas ≠ número de colunas).
- Acessar um índice de linha ou coluna fora dos limites da matriz (mesmo risco do vetor — ver Aula 11 —, mas em duas dimensões).

## Perguntas socráticas sugeridas
- "Se uma matriz tem 3 linhas e 4 colunas, qual par de laços `for` você usaria para percorrer todos os elementos, e qual deveria ser o laço externo?"
- "Por que não é possível multiplicar uma matriz 2×3 por outra matriz 2×3 diretamente (sem transpor nenhuma delas)?"
- "No preenchimento com `contador++`, por que os valores ficam em ordem crescente linha por linha?"

## Exercícios da aula
1. Criar uma matriz identidade 5×5.
2. Ler uma matriz 3×3 e calcular a soma das diagonais principal e secundária.
3. Ler uma matriz 5×5 e encontrar o maior valor e sua posição (linha, coluna).
4. Multiplicar uma matriz A (lida do teclado) por um escalar 5, gerando a matriz C.
5. Somar duas matrizes A e B, gerando C.
6. Multiplicar duas matrizes A e D, gerando AD.

## Notas de revisão
- Todo o conteúdo numérico (soma, multiplicação por escalar e multiplicação de matrizes) foi recalculado e confirmado correto — nenhuma correção necessária.
- A transcrição verificada desta aula foi adicionada depois desta revisão (`Transcrição-Verificadas/Aula_12_Matrizes.md`) e pode trazer exemplos complementares.
