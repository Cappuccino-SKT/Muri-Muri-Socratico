---
titulo: "Aula 11 - Vetores"
numero_aula: 11
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [vetores, arrays, indice, inicializacao de vetores, leitura e escrita de vetores]
pre_requisitos: ["Aula 10 - Estrutura de Repetição For"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 11 - Vetores.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_11_Vetores.md"
revisado_em: 2026-10-11
status: verificado
---

# Aula 11 - Vetores

## Objetivo
Apresentar vetores (arrays unidimensionais) como forma de armazenar coleções de dados do mesmo tipo, substituindo a criação de muitas variáveis individuais.

## Conceitos-chave

- **Motivação**: seria inviável criar manualmente 40, 50 ou 100 variáveis individuais para guardar, por exemplo, as notas de 40 alunos. Um **vetor** resolve isso guardando vários valores do mesmo tipo sob um único nome.
- **Vetor**: lista de variáveis do mesmo tipo, acessadas por índice; pode ser entendido como uma "matriz de uma linha" (unidimensional).
- **Declaração**: `tipo nome[tamanho];`
  ```c
  int notas[5]; // vetor de 5 inteiros
  ```
  - `int`: tipo dos elementos.
  - `notas`: nome do vetor.
  - `[5]`: quantidade de elementos (tamanho).
- **Índice**: posição de um elemento dentro do vetor. **Começa em 0** e vai até `tamanho - 1`.
  ```c
  notas[0], notas[1], notas[2], notas[3], notas[4] // vetor de 5 posições
  ```
- **Armazenamento**: os elementos de um vetor ficam guardados **sequencialmente e sem espaços** na memória.
- **Inicialização**:
  ```c
  int idades[3] = {2, 12, 1};       // tamanho explícito
  int idades[] = {2, 12, 1};        // tamanho inferido pela lista de valores (também 3)
  ```
  Equivalente a declarar e depois atribuir cada posição manualmente:
  ```c
  int idades[3];
  idades[0] = 2;
  idades[1] = 12;
  idades[2] = 1;
  ```
- **Lendo/escrevendo vetores maiores**: usar um laço de repetição (`for`) para não repetir manualmente o código para cada posição.
  ```c
  int notas[5];
  for (int i = 0; i < 5; i++) {
      printf("Informe a %d nota:", i);
      scanf("%d", &notas[i]);
  }
  printf("\nAs notas informadas foram:\n");
  for (int i = 0; i < 5; i++) {
      printf("Nota[%d]: %d \n", i, notas[i]);
  }
  ```

## Erros comuns e pontos de atenção
- **Índice fora dos limites ("off-by-one")**: tentar acessar `notas[5]` em um vetor `int notas[5]` (índices válidos são 0 a 4). Em C, isso **não gera erro de compilação nem é verificado em tempo de execução** — o programa acessa uma posição de memória fora do vetor, o que pode causar comportamento imprevisível ("undefined behavior"), e não necessariamente um erro visível imediatamente. Esse é um dos erros mais traiçoeiros para quem está aprendendo.
- Confundir o **índice** (posição, de 0 a tamanho-1) com o **tamanho** do vetor (quantidade total de elementos).
- Esquecer de usar um laço para percorrer o vetor inteiro, e tentar acessar/imprimir posição por posição manualmente (funciona, mas não escala e é propenso a erros de digitação de índice).
- Ao inicializar parcialmente um vetor (ex.: `int v[5] = {1, 2};`), as posições não inicializadas explicitamente são preenchidas com `0` — isso é diferente de um vetor declarado sem nenhuma inicialização, cujos valores são indefinidos ("lixo de memória").

## Perguntas socráticas sugeridas
- "Se um vetor tem tamanho 5, qual é o primeiro índice válido? E qual é o último?"
- "O que você acha que acontece se o seu código tentar acessar `vetor[5]` em um vetor declarado como `int vetor[5];`? O compilador vai avisar?"
- "Por que usar um laço `for` para ler/imprimir um vetor é melhor do que escrever `scanf`/`printf` uma vez para cada posição?"

## Exercícios da aula
1. Ler dois vetores de tamanho 5 e calcular/exibir o vetor soma.
2. Receber 10 números em um vetor A; gerar um vetor B onde cada elemento é o quadrado do elemento correspondente em A.
3. Ler um vetor A com 10 idades; contar e exibir quantas pessoas têm idade superior a 35 anos.
4. Criar e inicializar um vetor de 8 inteiros; somar seus elementos e exibir o resultado.
5. Dados dois vetores A (4 elementos) e B (5 elementos), imprimir os elementos comuns a ambos.
6. Receber 20 números em um vetor; exibir quantos são iguais a 30, quantos são maiores que a média, e quantos são iguais à média.

## Notas de revisão
- Conteúdo técnico correto. Foi destacado com mais ênfase o risco do acesso fora dos limites do vetor (não verificado em tempo de compilação/execução em C), por ser um dos erros mais comuns e mais difíceis de depurar para iniciantes — ponto importante para o tutor socrático explorar com perguntas antes de apontar diretamente o erro.
