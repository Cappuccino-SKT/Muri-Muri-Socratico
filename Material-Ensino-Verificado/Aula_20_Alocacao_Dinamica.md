---
titulo: "Aula 20 - Alocação Dinâmica"
numero_aula: 20
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [alocação dinâmica, stack, pilha, heap, malloc, calloc, realloc, free, sizeof, NULL, size_t, vazamento de memória, matriz dinâmica, struct dinâmica, stdlib.h]
pre_requisitos: ["Aula 14 - Structs", "Aula 18 - Recursividade", "Aula 19 - Ponteiros"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 20 - Alocação Dinâmica.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_20_Alocacao_Dinamica.md"
revisado_em: 2026-10-21
status: verificado (com correções técnicas importantes em calloc e realloc)
---

# Aula 20 - Alocação Dinâmica

## Objetivo
Explicar como o programa usa a memória (pilha e heap), e como alocar, redimensionar e liberar memória em tempo de execução com `malloc`, `calloc`, `realloc` e `free` — incluindo vetores, matrizes e structs.

## Conceitos-chave

- **Pilha (stack)**: região onde ficam as variáveis **locais**. Funciona como LIFO (*Last In, First Out*): quando uma função é chamada (inclusive `main`), suas variáveis são empilhadas; quando termina, são desempilhadas automaticamente. É o mesmo mecanismo visto na recursão (ex.: `Fatorial(3)` → `Fatorial(2)` → `Fatorial(1)` empilhados sobre `main`).

- **Heap**: outra região de memória, geralmente maior que a pilha.
  - **Não é gerenciada automaticamente** — o programador aloca e libera explicitamente (alocação dinâmica).
  - O tamanho é limitado apenas pela memória disponível.
  - Permite estruturas que crescem/diminuem conforme a necessidade.
  - Acesso costuma ser um pouco "mais lento" que a pilha.
  - O que está na heap pode ser acessado por qualquer função que tenha o **ponteiro** para aquela região.

- **Stack ou heap?**
  - **Stack**: variáveis relativamente pequenas que só precisam existir enquanto a função está ativa.
  - **Heap**: dados muito grandes; dados que devem durar além da função que os criou; dados cujo tamanho só é conhecido em execução ou precisa mudar (ex.: vetores e matrizes de tamanho variável).

- **Alocação dinâmica**: reservar memória na heap **em tempo de execução**, sob demanda. A memória fica reservada até ser liberada explicitamente com `free`; depois de liberada, não pode mais ser acessada. Memória não liberada é devolvida ao sistema operacional quando o programa termina — mas em programas que rodam por muito tempo isso causa **vazamento de memória** (*memory leak*).

- **As 4 funções** (todas em `<stdlib.h>`). Os protótipos reais usam `size_t` (tipo inteiro sem sinal usado para tamanhos):
  ```c
  void *malloc(size_t num_bytes);
  void *calloc(size_t quantidade, size_t tamanho);
  void *realloc(void *ptr, size_t novo_num_bytes);
  void  free(void *ptr);
  ```

- **`malloc`**: aloca `num_bytes` bytes e devolve um `void*` para o primeiro byte. A memória **não é inicializada** (contém lixo).
  ```c
  char *texto = (char*) malloc(1000);              // 1000 bytes
  int  *vet   = (int*)  malloc(50 * sizeof(int));  // espaço para 50 ints
  ```
  O *cast* `(int*)` é opcional em C (o `void*` é convertido automaticamente), mas é comum e não está errado.

- **`sizeof`**: operador que devolve o tamanho, em bytes, de um tipo ou variável. Valores típicos (dependem da plataforma): `char` = 1, `int` = 4, `float` = 4, `struct {int x, y;}` = 8. Assim, `50 * sizeof(int)` = 200 bytes = 50 inteiros. O formato correto para imprimir `sizeof` é `%zu`:
  ```c
  printf("Inteiro: %zu\n", sizeof(int)); // 4
  ```

- **Verificar `NULL`**: se não houver memória suficiente, as funções de alocação retornam `NULL`. Sempre verifique:
  ```c
  int *ptr = (int*) malloc(5 * sizeof(int));
  if (ptr == NULL) {
      printf("Erro: Memória Insuficiente!\n");
      exit(1);
  }
  ```

- **`calloc`**: recebe a **quantidade** de elementos e o **tamanho** de cada um separadamente — e, diferentemente do `malloc`, **zera** toda a memória alocada.
  ```c
  int *ptr = (int*) calloc(5, sizeof(int)); // 5 ints, todos valendo 0
  ```

- **`realloc`**: altera o tamanho de um bloco previamente alocado (para mais ou para menos). Pode precisar **mover** o bloco para outro lugar; nesse caso o conteúdo antigo é copiado (até o menor dos dois tamanhos) e o novo endereço é devolvido. Se falhar, devolve `NULL` e o bloco original **continua válido e inalterado**. Ao **aumentar**, as posições novas **não são inicializadas**.
  ```c
  int *p = malloc(5 * sizeof(int));
  for (int i = 0; i < 5; i++) p[i] = i + 1;          // 1 2 3 4 5

  int *tmp = realloc(p, 3 * sizeof(int));            // diminui para 3
  if (tmp == NULL) { free(p); exit(1); }
  p = tmp;                                           // p: 1 2 3

  tmp = realloc(p, 10 * sizeof(int));                // aumenta para 10
  if (tmp == NULL) { free(p); exit(1); }
  p = tmp;
  for (int i = 3; i < 10; i++) p[i] = 0;             // novas posições precisam ser inicializadas
  // p: 1 2 3 0 0 0 0 0 0 0

  free(p);
  ```

- **`free`**: libera um bloco alocado dinamicamente. O sistema de alocação guarda internamente o tamanho de cada bloco, por isso `free` só precisa do ponteiro.
  ```c
  int *p = malloc(50 * sizeof(int));
  /* ... usa p ... */
  free(p);
  p = NULL; // boa prática: evita usar o ponteiro liberado por engano
  ```

- **Matriz dinâmica** (ponteiro para ponteiro): primeiro um vetor de ponteiros (as linhas), depois um vetor para cada linha.
  ```c
  int **matriz = (int**) malloc(4 * sizeof(int*));   // 1º: vetor de ponteiros (linhas)
  for (int l = 0; l < 4; l++) {
      matriz[l] = (int*) malloc(4 * sizeof(int));    // 2º: cada linha
  }
  matriz[2][3] = 7; // acesso normal com dois índices
  ```
  **Liberação na ordem inversa**: primeiro cada linha, depois o vetor de ponteiros.
  ```c
  for (int l = 0; l < 4; l++) {
      free(matriz[l]);
  }
  free(matriz);
  ```

- **Struct dinâmica**: o ponteiro recebe o `malloc` e os membros são acessados com `->`.
  ```c
  typedef struct { char nome[50]; int idade; } Pessoa;

  Pessoa *cadastro = (Pessoa*) malloc(sizeof(Pessoa));
  strcpy(cadastro->nome, "Rosinosvalda");
  cadastro->idade = 22;
  free(cadastro);
  ```
- **Vetor de structs dinâmico**: acesso com colchetes e ponto.
  ```c
  Pessoa *vetCadastro = (Pessoa*) malloc(3 * sizeof(Pessoa));
  strcpy(vetCadastro[0].nome, "Rosinosvalda");
  vetCadastro[0].idade = 22;
  /* ... */
  free(vetCadastro);
  ```

## Erros comuns e pontos de atenção
- **Não verificar `NULL`** após `malloc`/`calloc`/`realloc`.
- **Esquecer o `sizeof`**: `malloc(50)` aloca 50 **bytes**, não 50 inteiros.
- **Vazamento de memória**: esquecer o `free`, ou perder o único ponteiro para um bloco (ex.: `p = malloc(...)` duas vezes seguidas sem liberar o primeiro).
- **`p = realloc(p, ...)`**: se o `realloc` falhar, `p` vira `NULL` e o bloco original fica inacessível (vazamento). Use um ponteiro temporário, como no exemplo acima.
- **Ler posições novas após `realloc` aumentar** (ou memória de `malloc`) sem inicializar — os valores são lixo.
- **Usar memória após `free`** (*use after free*) ou chamar `free` duas vezes no mesmo ponteiro (*double free*).
- **Liberar a matriz na ordem errada** (`free(matriz)` antes das linhas) — perde-se o acesso às linhas, que vazam.
- Chamar `free` em ponteiro que **não** veio de `malloc`/`calloc`/`realloc` (ex.: endereço de variável local).
- Imprimir `sizeof` com `%d`/`%ld` em vez de `%zu` (pode gerar aviso ou valor errado em algumas plataformas).

## Perguntas socráticas sugeridas
- "Se você não sabe, ao escrever o programa, quantos alunos o usuário vai cadastrar, por que um vetor `int notas[100]` pode ser um problema?"
- "Quantos bytes `malloc(10 * sizeof(int))` reserva? E `malloc(10)`?"
- "Que diferença você espera ver ao imprimir um vetor recém-criado com `malloc` e outro com `calloc`?"
- "Se o `realloc` falhar e você tiver escrito `p = realloc(p, ...)`, o que acontece com os dados antigos?"
- "Por que, na matriz dinâmica, as linhas precisam ser liberadas antes do vetor de ponteiros?"
- "Uma variável local da função some quando a função termina. O que acontece com a memória alocada com `malloc` dentro dessa função?"

## Exercícios da aula
1. Ler do usuário o tamanho de um vetor, alocá-lo dinamicamente, ler seus valores e imprimi-lo.
2. Função que recebe um inteiro positivo N e retorna o ponteiro para um vetor de N posições alocado dinamicamente; se N ≤ 0, retornar `NULL`.
3. Função que recebe dois vetores (A e B) por referência e o tamanho N, e retorna o ponteiro para um vetor C alocado dinamicamente com `C[i] = A[i] * B[i]`.
4. Função que recebe L e C e retorna o ponteiro para uma matriz L×C alocada dinamicamente, inicializada com 0 em todas as posições (dica: `calloc` já zera a memória).

Obs. do professor: ao final de cada programa, liberar toda a memória alocada dinamicamente.

## Notas de revisão
- **Correção técnica aplicada (`calloc`)**: o slide diz que `calloc` "faz o mesmo que a função `malloc()`", mudando apenas a forma de passar os parâmetros. Falta a diferença mais importante: **`calloc` inicializa a memória com zeros**; `malloc` não inicializa. Isso é relevante, por exemplo, no Exercício 4.
- **Correção técnica aplicada (`realloc`)**: o exemplo do slide aumenta o vetor de 3 para 10 posições e imprime as 10 — as posições 3 a 9 **não foram inicializadas** e conteriam lixo (comportamento indefinido ao ler). Além disso, o padrão `p = realloc(p, ...)` sem ponteiro temporário causa vazamento se o `realloc` falhar, e o exemplo não chama `free(p)` ao final. O material revisado corrige os três pontos.
- **Correção dos protótipos**: o slide usa `unsigned int` nos protótipos de `malloc`, `calloc` e `realloc`; o tipo real é `size_t`.
- **Correção do formato de `sizeof`**: o slide imprime `sizeof` com `%ld`; o especificador correto é `%zu` (o `%ld` gera aviso no GCC/MinGW, onde `long` tem 4 bytes e `size_t` tem 8). Valores conferidos por compilação: `int` = 4, `Ponto` = 8.
- **Precisão**: a "tabela de alocação interna" citada no slide é um detalhe de implementação da biblioteca; o material diz apenas que o sistema de alocação guarda o tamanho de cada bloco. A afirmação de que memória não liberada é "automaticamente liberada ao final da execução" vale para sistemas operacionais comuns; o material acrescenta o conceito de vazamento de memória.
- **Complementos adicionados**: `p = NULL` após `free`, lista de erros comuns (use after free, double free, ordem de liberação) e acesso `matriz[l][c]`.
