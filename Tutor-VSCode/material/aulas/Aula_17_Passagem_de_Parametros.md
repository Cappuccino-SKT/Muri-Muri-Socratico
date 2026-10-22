---
titulo: "Aula 17 - Funções: Passagem de Parâmetros"
numero_aula: 17
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [passagem por cópia, passagem por valor, passagem por referência, endereço, ponteiro, operador &, operador *, retorno de múltiplos valores, vetores como parâmetro, structs como parâmetro, operador seta]
pre_requisitos: ["Aula 05 - Entrada de Dados", "Aula 11 - Vetores", "Aula 14 - Structs", "Aula 16 - Funções"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 17 - Passagem de Parametros.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_17_Passagem_de_Parametros.md"
revisado_em: 2026-10-21
status: verificado (com correção de texto no slide de structs)
---

# Aula 17 - Funções: Passagem de Parâmetros

## Objetivo
Diferenciar passagem de parâmetros por cópia (valor) e por referência (endereço), mostrar como uma função pode alterar variáveis da chamadora e "devolver" vários resultados, e como vetores e structs são passados para funções.

## Conceitos-chave

- **Passagem por cópia (valor)**: a função recebe uma **cópia** do valor. São variáveis distintas, em posições diferentes da memória e com escopos diferentes — alterar a cópia não altera a original.
  ```c
  void incrementa(int valor) {
      valor++;
  }

  int main() {
      int valor = 15;
      incrementa(valor);
      printf("Valor após a função: %d\n", valor); // 15
      return 0;
  }
  ```

- **Passagem por referência (endereço)**: a função recebe o **endereço** da variável e acessa diretamente a posição de memória original.
  - `int *endereco;` declara uma variável que guarda o endereço de um `int` (um **ponteiro**, aprofundado na Aula 19).
  - `endereco = &valor;` — `&` obtém o endereço de `valor`.
  - `*endereco` — acessa o conteúdo armazenado naquele endereço.
  ```c
  void incrementa(int *valor) {
      (*valor)++;          // parênteses necessários: incrementa o conteúdo, não o endereço
  }

  int main() {
      int valor = 15;
      incrementa(&valor);
      printf("Valor após a função: %d\n", valor); // 16
      return 0;
  }
  ```

- **Quando usar referência**: para passar grandes volumes de dados sem copiá-los (economiza tempo e memória) e para permitir que uma função "devolva" **mais de um valor** (o `return` devolve apenas um).
  ```c
  void calcular(int n, int *dobro, int *triplo) {
      *dobro = n * 2;
      *triplo = n * 3;
  }

  int main() {
      int valor = 15, dobro, triplo;
      calcular(valor, &dobro, &triplo);
      printf("Dobro: %d\nTriplo: %d\n", dobro, triplo); // 30 e 45
      return 0;
  }
  ```
  Ideia principal: passar o endereço onde você quer que a resposta seja salva — é exatamente o que o `scanf` faz com `&`.

- **Vetores e matrizes**: são sempre passados "por referência" — a função recebe o **endereço do primeiro elemento**. Alterações dentro da função afetam o vetor original. Não se usa `&` na chamada, e a função não sabe o tamanho do vetor, por isso ele deve ser passado como parâmetro.
  ```c
  void incrementaVetor(int tam, int vetor[]) {
      for (int i = 0; i < tam; i++) {
          vetor[i]++;
      }
  }
  ```

- **Structs**: por padrão são passadas **por cópia** — a função recebe uma cópia de toda a estrutura, e alterações **não** afetam a struct original. Se a struct for grande (ex.: contém vetores), a cópia custa desempenho; a solução é passar o endereço da struct.

- **Operador seta `->`**: acessa um membro por meio de um **ponteiro** para a struct. `p->x` é equivalente a `(*p).x`.
  ```c
  typedef struct { int x, y; } Ponto;

  void incrementa(Ponto *p) {
      p->x++;
      p->y++;
  }

  int main() {
      Ponto p1 = {1, 2};
      incrementa(&p1);
      printf("(%d, %d)\n", p1.x, p1.y); // (2, 3)
      return 0;
  }
  ```
  Regra: **ponto** quando se tem a struct; **seta** quando se tem um endereço (ponteiro) para a struct.

- **Vetor de structs**: passado como qualquer vetor (endereço do primeiro elemento, sem `&`); dentro da função, acessa-se `alunos[i].nome`.
  ```c
  typedef struct { char nome[50]; float nota; } Aluno;

  void exibirAlunos(Aluno alunos[], int tamanho) {
      for (int i = 0; i < tamanho; i++) {
          printf("Nome: %s\n", alunos[i].nome);
          printf("Nota: %.2f\n", alunos[i].nota);
      }
  }

  Aluno alunos[3];
  exibirAlunos(alunos, 3);
  ```

## Erros comuns e pontos de atenção
- Escrever `*valor++` em vez de `(*valor)++` — pela precedência, `*valor++` incrementa o **ponteiro** (não o conteúdo).
- Esquecer o `&` na chamada (`incrementa(valor)` quando a função espera `int*`) — o compilador avisa/erra por tipo incompatível.
- Usar `.` em um ponteiro para struct (`p.x` com `Ponto *p`) ou `->` em uma struct comum.
- Achar que uma struct passada por parâmetro será alterada na `main` sem usar ponteiro.
- Usar `sizeof(vetor)` dentro da função para descobrir o tamanho do vetor — lá dentro ele é um ponteiro, e o resultado é o tamanho do ponteiro.

## Perguntas socráticas sugeridas
- "Na versão por cópia, a variável `valor` da `main` e a da função `incrementa` ocupam o mesmo lugar na memória?"
- "Por que você acha que o `scanf` precisa do `&` e o `printf` não?"
- "Se `return` devolve só um valor, como uma função poderia 'devolver' o dobro e o triplo de um número ao mesmo tempo?"
- "Se um vetor é passado sem `&`, por que as alterações feitas na função aparecem na `main`?"
- "Qual a diferença entre `p->x` e `(*p).x`? E entre `(*p).x` e `*p.x`?"

## Exercícios da aula
O PDF original desta aula não contém lista de exercícios.

## Notas de revisão
- **Correção de texto aplicada**: no slide "Passagem de Estruturas (structs)", a frase "qualquer alteração realizada dentro da função não é realizada no **vetor/matriz** original" foi corrigida para "na **struct** original" (erro de cópia do slide anterior, sobre vetores).
- **Nota conceitual**: tecnicamente, a linguagem C só possui passagem **por valor**; a "passagem por referência" é feita passando **por valor** um endereço (ponteiro). O material mantém a terminologia "por referência" usada em aula, mas a IA pode esclarecer essa nuance se o aluno comparar com linguagens como C++ (que têm referências `&` de verdade).
- **Correção de digitação**: "Por ser passado" → "Pode ser passado" (slide de vetor de estruturas).
- **Complementos adicionados**: saída `(2, 3)` do exemplo do `Ponto` (conferida por compilação), alerta sobre `*valor++` e sobre `sizeof` de vetor recebido por parâmetro.
