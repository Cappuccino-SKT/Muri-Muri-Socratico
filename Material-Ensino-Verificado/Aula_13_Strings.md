---
titulo: "Aula 13 - Strings"
numero_aula: 13
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [strings, vetor de caracteres, fgets, scanf, strlen, strcpy, strcat, strcmp, string.h]
pre_requisitos: ["Aula 11 - Vetores"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 13 - Strings.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_13_Strings_Parte_1.md e Aula_13_Strings_Parte_2.md"
revisado_em: 2026-10-11
status: verificado (com correção técnica importante em strcmp)
---

# Aula 13 - Strings

## Objetivo
Apresentar strings como vetores de caracteres terminados em `'\0'`, as formas de ler uma string do teclado (e seus riscos), vetores bidimensionais de caracteres, e as principais funções da biblioteca `string.h`.

## Conceitos-chave

- **String em C**: um vetor de `char` terminado pelo **caractere nulo `'\0'`**. A declaração do vetor precisa reservar **uma posição extra** para o `'\0'`.
  ```c
  char str[11] = "teste"; // vetor de 11 posições, mas só 10 úteis (+1 para '\0')
  // posições:  t  e  s  t  e \0
  //            0  1  2  3  4  5
  ```

- **Formas de ler uma string do teclado e seus riscos**:
  | Função | Problema | Observação |
  |---|---|---|
  | `gets(nome);` | **Insegura**: não limita o tamanho, pode escrever além do vetor (buffer overflow). | Função **descontinuada/removida** do padrão C (não deve ser usada). |
  | `scanf("%s", nome);` | Não lê espaços (para no primeiro espaço/`\n`) e não garante limite de tamanho por si só. | `scanf("%20[^\n]", nome);` lê até 20 caracteres, parando antes de `\n` (não limpa o buffer). |
  | `fgets(nome, 20, stdin);` | Garante o tamanho máximo (seguro), mas **mantém o `\n`** no final da string lida, se houver espaço. | Correção comum: localizar e remover o `\n` com `strcspn`. |

  Padrão recomendado para ler uma string com segurança:
  ```c
  char nome[21];
  printf("Digite seu nome: ");
  fgets(nome, 21, stdin);
  nome[strcspn(nome, "\n")] = '\0'; // remove o '\n' final, se presente
  printf("Nome informado: %s \n", nome);
  printf("Primeira letra do nome: %c \n", nome[0]);
  ```
  > Nota: o slide original inclui `setbuf(stdin, NULL);` logo após o ajuste com `strcspn`. Como já discutido na Aula 05, esse uso de `setbuf` sobre `stdin` não é garantido pelo padrão C (ainda que funcione na prática em compiladores comuns da disciplina); com `fgets`, normalmente não é necessário limpar o buffer, pois o `fgets` já consome a linha inteira (incluindo o `\n`) até o limite informado.

- **Vetor bidimensional de strings**: uma matriz de `char` onde cada **linha** representa uma string, e o número de colunas é o tamanho máximo de cada string (incluindo o `'\0'`).
  ```c
  char nomes[3][5]; // até 3 strings, cada uma com até 4 caracteres úteis + '\0'

  for (int l = 0; l < 3; l++) {
      printf("Nome[%i]:", l);
      fgets(nomes[l], 5, stdin);
      nomes[l][strcspn(nomes[l], "\n")] = '\0';
  }
  for (int l = 0; l < 3; l++) {
      printf("Nome[%i]: %s\n", l, nomes[l]);
  }
  ```
  É possível acessar uma linha inteira (`nomes[l]`, que se comporta como uma string) ou um caractere específico (`nomes[l][coluna]`).

- **Biblioteca `string.h`**: funções utilitárias para manipular strings (`#include <string.h>`).
  - `strlen(string)`: retorna a quantidade de caracteres **antes** do `'\0'`.
    ```c
    int tamanho = strlen(nome);
    ```
    Atenção: caracteres especiais (acentos, em certas codificações) podem ocupar mais de um byte, o que pode afetar o valor retornado.
  - `strcpy(destino, origem)`: copia o conteúdo de `origem` para `destino`.
  - `strcat(destino, origem)`: concatena (junta) `origem` ao **final** de `destino`.
    ```c
    char nome[21] = "João";
    char sobrenome[21] = " da Silva";
    strcat(nome, sobrenome);
    printf("Nome concatenado: %s \n", nome); // "João da Silva"
    ```
  - `strcmp(string1, string2)`: compara duas strings **caractere a caractere**, de forma *case-sensitive* (maiúsculas e minúsculas são diferentes). Retorna:
    - **`0`** se as strings forem iguais;
    - um valor **negativo** se `string1` for "menor" que `string2` (vem antes, em ordem lexicográfica/alfabética);
    - um valor **positivo** se `string1` for "maior" que `string2` (vem depois).
    ```c
    char nome1[21] = "Joao";
    char nome2[21] = "Joao";
    if (strcmp(nome1, nome2) == 0) {
        printf("Os nomes são iguais");
    } else {
        printf("Os nomes NÃO são iguais");
    }
    ```
    Dica: `strcasecmp` compara ignorando diferenças entre maiúsculas e minúsculas (função de extensão POSIX, não faz parte do padrão C — pode não estar disponível em todo compilador).

## Erros comuns e pontos de atenção
- **Correção importante**: o material original (slide) descrevia o retorno de `strcmp` de forma **invertida** ("retorna valor positivo se string1 < string2; retorna valor negativo se string1 > string2"). O comportamento real e padronizado da função (confirmado também na bibliografia da disciplina) é o **oposto**: retorno **negativo** quando `string1 < string2`, e retorno **positivo** quando `string1 > string2`. Essa correção já está refletida na descrição acima — é importante que a IA não repasse a versão invertida ao aluno.
- Usar `gets()` — função insegura e removida do padrão C; a IA deve sempre recomendar `fgets` no lugar.
- Esquecer de remover o `'\n'` deixado pelo `fgets` (com `strcspn` + atribuição de `'\0'`), o que pode causar resultados inesperados em comparações (`strcmp`) ou concatenações (`strcat`).
- Não reservar espaço extra no vetor de `char` para o `'\0'` (ex.: declarar `char nome[5];` para guardar uma string de exatamente 5 caracteres úteis, sem espaço para o terminador).
- Tentar comparar strings com `==` em vez de `strcmp` — em C, `==` entre vetores de `char` compara **endereços de memória**, não o conteúdo das strings, e quase nunca faz o que o aluno espera.

## Perguntas socráticas sugeridas
- "Se `strcmp("abacaxi", "banana")` retorna um valor negativo, o que isso te diz sobre a ordem alfabética entre essas duas palavras?"
- "Por que `char nome[5];` pode não ser suficiente para guardar a palavra 'Carlos'?"
- "O que você acha que aconteceria se comparássemos duas strings usando `if (nome1 == nome2)` em vez de `strcmp`?"

## Exercícios da aula
1. Armazenar 10 nomes em um vetor de strings e imprimir uma lista numerada.
2. Armazenar nome e salário de 5 funcionários; calcular um aumento de 8% e exibir a nova folha de pagamento.
3. Armazenar nome e telefone de 5 pessoas; exibir os dados de uma posição escolhida; finalizar ao receber `-1`.
4. Receber um nome, repetindo a pergunta enquanto o nome tiver menos de 5 caracteres (usar `strlen`).
5. Receber uma frase e contar quantas vezes cada vogal aparece.
6. Receber nome e sobrenome; construir a string no formato "Sobrenome, Nome" (usar `strcat`/`strcpy`).
7. Receber a sigla de um estado da região Sul/Sudeste e exibir o nome completo correspondente (usar `strcmp` para comparar com as siglas conhecidas).

## Notas de revisão
- **Correção técnica relevante aplicada**: a definição de `strcmp` no material original estava com os sinais de retorno invertidos (positivo/negativo trocados). Foi corrigido com base no comportamento padrão da função (confirmado também na bibliografia de referência da disciplina). Esta é a correção mais importante feita durante esta revisão — recomenda-se destacar esse ponto caso o aluno pergunte sobre `strcmp`.
- Demais conteúdos (declaração/representação de strings, `fgets`, `strlen`, `strcpy`, `strcat`) estavam corretos.
