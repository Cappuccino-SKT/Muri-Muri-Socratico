---
titulo: "Aula 19 - Ponteiros"
numero_aula: 19
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [ponteiros, endereço de memória, NULL, referenciação, operador &, dereferenciação, operador *, %p, aritmética de ponteiros, comparação de ponteiros, ponteiro genérico, void*, ponteiros e vetores, ponteiro para ponteiro]
pre_requisitos: ["Aula 11 - Vetores", "Aula 17 - Passagem de Parâmetros"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 19 - Ponteiros.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_19_Ponteiros.md"
revisado_em: 2026-10-21
status: verificado (com correções técnicas importantes em void* e endereços hexadecimais)
---

# Aula 19 - Ponteiros

## Objetivo
Apresentar ponteiros (variáveis que armazenam endereços de memória), os operadores `&` e `*`, as operações permitidas (atribuição, aritmética, comparação), o ponteiro genérico `void*`, a relação entre ponteiros e vetores e ponteiros para ponteiros.

## Conceitos-chave

- **Ponteiro**: tipo de variável que armazena um **endereço de memória**.
  ```c
  int *ptr;          // ptr guarda o endereço de um int (valor inicial indefinido — "lixo")
  int *ptr = NULL;   // inicializado como ponteiro nulo: não aponta para nenhum objeto válido
  ```
  Ponteiros não inicializados apontam para um endereço **indefinido** — usá-los é um erro grave. Boa prática: inicializar com `NULL` quando ainda não há endereço a atribuir.

- **Referenciação (`&`)** e **dereferenciação (`*`)**:
  - `ptr = &var;` — `&` devolve o **endereço** onde `var` está armazenada.
  - `*ptr` — devolve (ou altera) o **conteúdo** do endereço apontado por `ptr`.
  ```c
  int variavel = 15;
  int *ptr;
  ptr = &variavel;
  printf("Valor da variavel: %d\n", variavel);               // 15
  printf("Endereco da variavel: %p\n", (void*)&variavel);    // ex.: 0x7ffe5280651c
  printf("Valor do ponteiro: %p\n", (void*)ptr);             // o mesmo endereço
  printf("Dereferenciando o ponteiro: %d\n", *ptr);          // 15
  ```
  `%p` imprime endereços; o padrão C pede que o argumento seja `void*` (daí o *cast*), embora na prática funcione sem ele nos compiladores comuns.

- **Atribuição**: um ponteiro só deve receber o endereço de uma variável **do mesmo tipo** apontado.
  ```c
  int *ptr1, *ptr2, x = 10;
  float y = 20;
  ptr1 = &x;     // OK: int* recebe endereço de int
  ptr2 = ptr1;   // OK: ambos int*
  ptr1 = &y;     // ERRO: int* recebendo float* (GCC 14+ trata como erro de compilação)
  ```

- **Aritmética de ponteiros**: só é permitido **somar ou subtrair inteiros**. O deslocamento é em **unidades do tipo apontado**: somar 1 a um `int*` avança `sizeof(int)` bytes (tipicamente 4).
  ```c
  int vetor[20];
  int *ptr = vetor;   // suponha que vetor comece no endereço 1500
  ptr++;              // 1504  (avança 1 int = 4 bytes)
  ptr = ptr + 15;     // 1564  (avança 15 ints = 60 bytes)
  ptr = ptr - 2;      // 1556  (recua 2 ints = 8 bytes)
  ```
  A aritmética só faz sentido dentro de um mesmo vetor (ou uma posição após o fim dele).

- **Comparação**: é possível comparar ponteiros com `==`/`!=` (apontam para o mesmo lugar?). Dois ponteiros para variáveis diferentes são diferentes, mesmo que os **valores** sejam iguais:
  ```c
  int valor1 = 10, valor2 = 10;
  int *ptr1 = &valor1, *ptr2 = &valor2;
  if (ptr1 == ptr2) printf("Ponteiros iguais!\n");
  else              printf("Ponteiros diferentes!\n");   // esta é a saída
  ```

- **Ponteiro genérico (`void*`)**: pode apontar para qualquer tipo de dado. Antes de **dereferenciar** é necessário convertê-lo (*cast*) para o tipo desejado:
  ```c
  int n = 42;
  void *ptrGenerico = &n;
  printf("Exibindo o valor: %d\n", *(int*)ptrGenerico);
  ```
  **Aritmética com `void*` não faz parte do padrão C** (o tipo `void` não tem tamanho). O GCC aceita como **extensão**, tratando como se cada elemento ocupasse 1 byte (`ptr++` avança 1 byte), mas o comportamento portável é converter para `char*` antes de fazer aritmética byte a byte.

- **Ponteiros e vetores**: o nome do vetor, quando usado em uma expressão, é convertido em um **ponteiro para o seu primeiro elemento**. Por isso, pode ser atribuído a um ponteiro e acessado com índices ou com aritmética:
  ```c
  int vetor[5] = {10, 20, 30, 40, 50};
  int *ptrVet = vetor;              // equivale a &vetor[0]
  for (int i = 0; i < 5; i++) {
      printf("%d %d\n", ptrVet[i], *(ptrVet + i)); // formas equivalentes
  }
  ```
  `ptrVet[i]` ⇔ `*(ptrVet + i)`.

- **Ponteiro para ponteiro**: guarda o endereço de outro ponteiro; cada `*` adicional é mais um nível de indireção.
  ```c
  int x = 10;
  int *ptr = &x;
  int **ptrPtr = &ptr;
  printf("%d %d %d\n", x, *ptr, **ptrPtr); // 10 10 10
  ```
  O C permite mais níveis (`***`, `****`...). Ponteiros para ponteiros serão usados na alocação dinâmica de matrizes (Aula 20).

## Erros comuns e pontos de atenção
- **Usar ponteiro não inicializado** (`int *p; *p = 5;`) — escreve em endereço aleatório: travamento ou corrupção de memória.
- **Dereferenciar `NULL`** — encerra o programa (falha de segmentação).
- Confundir o `*` da **declaração** (`int *p;` — "p é ponteiro") com o `*` da **expressão** (`*p` — "conteúdo apontado por p").
- Confundir `p = &x;` (p passa a apontar para x) com `*p = x;` (copia o valor de x para onde p aponta).
- Achar que `ptr + 1` avança 1 byte em um `int*` (avança `sizeof(int)` bytes).
- Achar que vetor **é** um ponteiro: ele é **convertido** em ponteiro na maioria das expressões, mas `sizeof(vetor)` dá o tamanho do vetor inteiro e não se pode fazer `vetor = outroPonteiro;`.
- Fazer aritmética em `void*` esperando que funcione em qualquer compilador.
- Comparar com `<`/`>` ponteiros de variáveis **não relacionadas** (o padrão só define essa comparação dentro de um mesmo vetor/objeto; na prática compiladores comuns comparam os endereços numericamente — relevante para o Exercício 1).

## Perguntas socráticas sugeridas
- "Se `p` aponta para `x`, o que muda em `x` quando você faz `*p = 20`? E quando faz `p = &y`?"
- "Se um `int*` guarda o endereço 1500, que endereço ele guardará depois de `p++`? E se fosse um `char*`?"
- "Por que `vetor[i]` e `*(vetor + i)` dão o mesmo resultado?"
- "Duas variáveis com o mesmo valor 10 têm o mesmo endereço? O que `ptr1 == ptr2` está comparando?"
- "Por que você acha que o compilador precisa saber o tipo apontado para fazer `ptr + 1`? O que isso diz sobre `void*`?"

## Exercícios da aula
1. Criar duas variáveis inteiras; comparar os endereços e exibir o endereço e o conteúdo da que tem o **maior** endereço.
2. Criar um vetor `float` de 10 posições e imprimir o endereço de cada posição.
3. Criar uma matriz 3x3 de `float` e imprimir o endereço de cada posição.
4. Criar um vetor de 5 inteiros; usando **aritmética de ponteiros**, ler os valores do teclado e exibi-los multiplicados por 2; em seguida, exibir o endereço das posições que contêm valores pares.
5. Elaborar uma função que receba duas strings e verifique se a segunda está contida na primeira, usando **apenas aritmética de ponteiros**.
6. Dada a declaração `int a, *b, **c, ***d;`, ler o valor de `a` e exibir: o dobro de `a` usando `b`; o triplo usando `c`; o quádruplo usando `d`.

## Notas de revisão
- **Correção técnica aplicada (ponteiro genérico)**: o exemplo do slide `void *ptr = 0x5DC; ptr++;` tem dois problemas: (1) atribuir um inteiro a ponteiro **sem cast** — no **GCC 15 (compilador usado pela turma) isso é erro de compilação** (`-Wint-conversion`), conferido nesta revisão; (2) aritmética em `void*` é **extensão do GCC**, não padrão C. O material revisado explica o conceito sem reproduzir o exemplo que não compila e indica `char*` como alternativa portável.
- **Correção técnica aplicada (aritmética com endereços literais)**: o slide usa `int *ptr = (int*) 0x5DC;` e imprime o ponteiro com `%d`. Atribuir endereço arbitrário e imprimir ponteiro com `%d` não são práticas válidas (o `%d` com ponteiro é comportamento indefinido). O material revisado mostra a mesma ideia com um vetor real e "supondo" o endereço inicial 1500. Os valores 1504 / 1564 / 1556 do slide estão corretos (conferidos por compilação).
- **Correção nos diagramas de memória**: os slides de vetor e de ponteiro para ponteiro numeram os endereços como `0xF060, 0xF064, 0xF068, 0xF072, 0xF076`. Em **hexadecimal**, 0xF068 + 4 = **0xF06C** (e depois 0xF070, 0xF074) — a sequência do slide soma como se fosse decimal. Caso o aluno pergunte sobre isso, a IA deve confirmar que a sequência correta é `0xF060, 0xF064, 0xF068, 0xF06C, 0xF070`.
- **Precisão conceitual**: o slide diz que "vetor é um ponteiro para a primeira posição"; o material revisado diz que o nome do vetor é **convertido** em ponteiro para o primeiro elemento (diferença visível em `sizeof` e na impossibilidade de atribuir ao vetor).
- **Precisão conceitual**: "NULL é uma constante que aponta para um endereço inexistente" — reescrito como "ponteiro nulo: não aponta para nenhum objeto válido".
- Erros de digitação do slide corrigidos: "conerter" → "converter"; "Elabora" → "Elaborar".
