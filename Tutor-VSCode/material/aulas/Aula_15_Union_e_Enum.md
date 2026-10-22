---
titulo: "Aula 15 - União (Union) e Enumeração (Enum)"
numero_aula: 15
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [union, união, memória compartilhada, enum, enumeração, constantes nomeadas, discriminador, typedef]
pre_requisitos: ["Aula 07 - Switch", "Aula 14 - Structs"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 15 - Union e Enum.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_15_Uniao_e_Enumeracao.md"
revisado_em: 2026-10-21
status: verificado
---

# Aula 15 - União (Union) e Enumeração (Enum)

## Objetivo
Apresentar `union` (membros de tipos diferentes compartilhando a mesma memória) e `enum` (conjunto de constantes inteiras nomeadas), e mostrar como combiná-los com `struct` e `typedef`.

## Conceitos-chave

- **Struct x Union**:
  | | `struct` | `union` |
  |---|---|---|
  | Armazenamento | Todos os membros **ao mesmo tempo**, cada um em sua própria região | **Um membro por vez**; todos compartilham a **mesma região** de memória |
  | Tamanho | Pelo menos a soma dos membros (pode haver *padding*) | Grande o suficiente para o **maior** membro (pode haver *padding*) |

- **Sintaxe da union**:
  ```c
  union Uniao {
      char letra;
      int numero;
  };                   // apenas define o tipo

  union Uniao nome;    // declara uma variável
  ```
  Aqui `sizeof(union Uniao)` é o tamanho do `int` (o maior membro), tipicamente 4 bytes — e não 4 + 1.

- **Sobrescrita entre membros**: como os membros ocupam a mesma posição, escrever em um **sobrescreve** o outro.
  ```c
  union Numero {
      int inteiro;
      float real;
  };

  union Numero numero;
  numero.real = 3.14;
  printf("%f\n", numero.real);     // 3.140000
  numero.inteiro = 15;
  printf("%d\n", numero.inteiro);  // 15 — mas agora numero.real NÃO vale mais 3.14
  ```
  Regra prática: leia sempre o **último membro escrito**.

- **Quando usar union**: quando uma variável pode guardar valores de tipos diferentes, mas só um é necessário por vez; quando é preciso economizar memória.

- **Enumeração (`enum`)**: tipo definido pelo usuário que nomeia um conjunto de **constantes inteiras**.
  ```c
  enum nomeEnum { VALOR1, VALOR2, VALOR3, VALOR4 };
  // por padrão: VALOR1 = 0, VALOR2 = 1, VALOR3 = 2, VALOR4 = 3
  ```
  Valores podem ser definidos explicitamente; os seguintes continuam contando +1 a partir do último definido:
  ```c
  enum E1 { A=30, B, C, D, E };          // 30, 31, 32, 33, 34
  enum E2 { V1=15, V2, V3=45, V4, V5=70 }; // 15, 16, 45, 46, 70
  ```

- **Uso com `if` e `switch`**: como os enumeradores são inteiros, podem ser usados onde se espera inteiro — inclusive como rótulos de `case`, deixando o código mais legível que números "mágicos".
  ```c
  enum FormaPagamento { DINHEIRO, CARTAO, VALE_REFEICAO };

  enum FormaPagamento op = DINHEIRO;
  switch (op) {
      case DINHEIRO:      /* ... */ break;   // equivale a case 0
      case CARTAO:        /* ... */ break;   // equivale a case 1
      case VALE_REFEICAO: /* ... */ break;   // equivale a case 2
      default:            /* ... */ break;
  }
  ```

- **Juntando tudo** (enum + union + struct + typedef): um `enum` como **discriminador** indica qual membro da `union` está válido.
  ```c
  typedef enum { PESO, VOLUME } TipoQuantidade;

  typedef struct {
      char descricao[30];
      TipoQuantidade tipo;        // discriminador
      union {
          double volume;          // litros
          unsigned int peso;      // gramas
      } quantidade;
  } Produto;

  Produto p;
  p.tipo = VOLUME;
  p.quantidade.volume = 1.5;

  if (p.tipo == VOLUME) printf("%.2f L\n", p.quantidade.volume);
  else                  printf("%u g\n", p.quantidade.peso);
  ```

## Erros comuns e pontos de atenção
- Achar que a union guarda todos os membros simultaneamente (como a struct) e ler um membro diferente do último escrito — o valor lido será a reinterpretação dos mesmos bytes, não o valor "antigo".
- Supor que o tamanho da union é a soma dos membros (é o do **maior**, mais eventual *padding*).
- Esquecer o `break` em cada `case` ao usar `enum` no `switch` (o slide original omite os `break` com `...` — vale lembrar o aluno da Aula 07).
- Achar que os valores de um `enum` começam em 1 — começam em **0**, salvo definição explícita.
- Ao usar `%d` para imprimir um enumerador, ver um número em vez do nome — o nome da constante não existe em tempo de execução.

## Perguntas socráticas sugeridas
- "Se uma union tem um `char` e um `double`, quantos bytes você espera que ela ocupe? E uma struct com os mesmos membros?"
- "Depois de `numero.inteiro = 15;`, o que você espera encontrar em `numero.real`? Por quê?"
- "No `enum E2 { V1=15, V2, V3=45, V4, V5=70 }`, qual é o valor de `V4`? Como você chegou nisso?"
- "No `Produto`, como o programa sabe se deve ler `volume` ou `peso`? O que aconteceria sem o campo `tipo`?"

## Exercícios da aula
O PDF original desta aula não contém lista de exercícios.

## Notas de revisão
- Conteúdo dos slides tecnicamente correto. Nenhuma correção de conteúdo foi necessária.
- **Complementos adicionados**: menção a *padding* no tamanho de struct/union; `break` explícito no exemplo de `switch` (o slide usa `...`); exemplo de uso do `Produto` com o discriminador (o slide só mostra a definição).
- Valores do enum `{ V1=15, V2, V3=45, V4, V5=70 }` conferidos por compilação (GCC 15): `15 16 45 46 70`.
