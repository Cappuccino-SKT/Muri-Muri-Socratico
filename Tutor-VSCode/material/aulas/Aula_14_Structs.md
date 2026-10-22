---
titulo: "Aula 14 - Estruturas (Struct) e Definição de Tipos"
numero_aula: 14
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [struct, estrutura heterogênea, registro, membros, operador ponto, inicialização, inicializadores designados, vetor de structs, estruturas aninhadas, typedef]
pre_requisitos: ["Aula 03 - Variáveis", "Aula 11 - Vetores", "Aula 13 - Strings"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 14 - Structs.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_14_Estruturas_e_Definicao_de_Tipo.md"
revisado_em: 2026-10-21
status: verificado
---

# Aula 14 - Estruturas (Struct) e Definição de Tipos

## Objetivo
Apresentar estruturas heterogêneas (`struct`) para agrupar variáveis de tipos diferentes sob um único nome, as formas de inicializar, atribuir e aninhar estruturas, e o uso de `typedef` para criar nomes (apelidos) de tipos.

## Conceitos-chave

- **Estrutura heterogênea (struct / registro)**: conjunto de variáveis de **tipos diferentes** relacionadas entre si. Diferente de vetores e matrizes, que agrupam apenas variáveis **do mesmo tipo** (homogêneas). As variáveis internas são chamadas de **membros** ou **campos**. Permite ao programador "definir" seus próprios tipos a partir dos tipos primitivos (`int`, `float`, `char`, ...).

- **Definição e declaração**:
  ```c
  struct Aluno {
      char nome[50];
      int idade;
      float peso;
      float altura;
  }; // atenção ao ponto e vírgula: a definição da struct é um comando

  struct Aluno aluno_1, aluno_2, aluno_3; // 3 variáveis do tipo struct Aluno
  ```
  A definição da struct apenas descreve o "molde" — nenhuma memória é reservada até que uma variável seja declarada.

- **Acesso aos membros**: operador `.` (ponto) — à esquerda o nome da variável, à direita o nome do membro.
  ```c
  aluno_1.idade = 20;
  printf("%d\n", aluno_1.idade);
  ```

- **Inicialização**:
  ```c
  struct Aluno aluno = {"Rosinosberto", 53, 72.5, 1.64}; // na ordem dos membros

  struct Aluno aluno = {};   // zera todos os membros (padrão C23; o GCC já aceitava como extensão)
  struct Aluno aluno = {0};  // forma equivalente válida em qualquer versão do C

  struct Aluno aluno = {     // inicializadores designados (C99)
      .nome = "João",
      .idade = 20,
      .altura = 1.75         // membros não citados (peso) recebem 0
  };
  ```

- **Atribuição**: uma struct pode ser atribuída a outra **do mesmo tipo** com `=`, copiando **todos** os membros — inclusive vetores internos (ex.: `nome`), o que não é possível fazer diretamente com vetores "soltos".
  ```c
  struct Aluno meu_aluno = {"Rosinosberto", 53, 72.5, 1.64};
  struct Aluno seu_aluno;
  seu_aluno = meu_aluno;
  ```

- **Vetor de structs**:
  ```c
  struct Cliente {
      char nome[21];
      char endereco[31];
      int idade;
  };

  struct Cliente cadastros[3] = {
      {"Paulo Teste", "Rua do Torto, 1234", 56},     // índice 0
      {"Ze Roberto", "Rua dos Robertos, 4321", 65},  // índice 1
      {"Maria Carla", "Av. Sem Fundo, 778", 28}      // índice 2
  };

  cadastros[0] = cadastros[1];         // copia todos os membros
  printf("%s\n", cadastros[2].nome);   // índice primeiro, depois o membro
  ```

- **Estruturas aninhadas**: um membro pode ser outra struct; o acesso encadeia pontos.
  ```c
  struct Endereco { char rua[31]; int numero; };
  struct Cadastro { char nome[21]; int idade; struct Endereco end; };

  struct Cadastro cad;
  cad.end.numero = 1234;
  ```

- **`typedef`**: cria um novo **nome** (apelido) para um tipo existente: `typedef tipo_existente tipo_novo;`. Com structs, elimina a necessidade de repetir a palavra `struct` a cada declaração.
  ```c
  // Sem typedef                    // Com typedef
  struct MeuCadastro {              typedef struct {
      char nome[21];                    char nome[21];
      char endereco[31];                char endereco[31];
      int idade;                        int idade;
  };                                } MeuCadastro;

  struct MeuCadastro X[10];         MeuCadastro X[10];
  ```

## Erros comuns e pontos de atenção
- Esquecer o `;` após o `}` da definição da struct (gera erros de compilação confusos na linha seguinte).
- Tentar comparar structs com `==` (`if (aluno1 == aluno2)`) — **não compila** em C; é preciso comparar membro a membro (e strings com `strcmp`).
- Tentar atribuir string a um membro vetor com `=` fora da inicialização (`aluno.nome = "Ana";`) — não funciona; usar `strcpy(aluno.nome, "Ana");`. (Note que na **inicialização** `= {"Ana", ...}` é permitido.)
- Confundir a ordem de acesso em vetor de structs: o correto é `cadastros[i].nome`, não `cadastros.nome[i]`.
- Achar que a definição `struct Aluno {...};` já cria uma variável — ela só define o tipo.
- Com `typedef struct {...} Aluno;`, escrever `struct Aluno x;` — com struct anônima isso não funciona; use apenas `Aluno x;`.

## Perguntas socráticas sugeridas
- "Se você precisa guardar nome, idade e altura de 30 alunos, quantos vetores separados precisaria sem struct? E com struct?"
- "Ao fazer `seu_aluno = meu_aluno;` e depois alterar `seu_aluno.idade`, o que acontece com `meu_aluno.idade`? Por quê?"
- "Como você acessaria o número da casa do terceiro cliente, se cada cliente tem um `struct Endereco` dentro?"
- "Que vantagem o `typedef` traz? Ele cria um tipo realmente novo ou só um novo nome?"

## Exercícios da aula
O PDF original desta aula não contém lista de exercícios.

## Notas de revisão
- Conteúdo dos slides tecnicamente correto. Nenhuma correção de conteúdo foi necessária.
- **Complementos adicionados**: a forma `= {0}` (portável para qualquer versão do C, ao lado do `= {}` do C23); o fato de membros não citados em inicializadores designados receberem 0; a observação de que a atribuição de struct copia vetores internos; e a seção de erros comuns (comparação com `==`, atribuição de string a membro).
- Testado com GCC 15 (MinGW): `struct Aluno aluno = {};` compila e zera os membros.
