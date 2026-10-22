---
titulo: "Aula 03 - Variáveis"
numero_aula: 3
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [variaveis, escopo, tipos de dados, printf, especificadores de formato, bases numericas, sufixos, sizeof, constantes, define, const]
pre_requisitos: ["Aula 02 - Linguagem C"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 03 - Variáveis.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_03_Variaveis.md"
revisado_em: 2026-10-11
status: verificado
---

# Aula 03 - Variáveis

## Objetivo
Explicar o que são variáveis, como declará-las e usá-las, os principais tipos de dados em C, como exibi-las com `printf`, e o conceito de constantes.

## Conceitos-chave

- **Variável**: posição específica de memória usada para armazenar um valor que pode ser modificado. Deve ser **declarada antes de usar**: `tipo nome_variavel;`
- **Escopo**:
  - *Global*: variável declarada fora de qualquer função; visível no arquivo todo.
  - *Local*: variável declarada dentro de uma função (ou como parâmetro); só existe enquanto a função está em execução.
  - Quando há uma variável local com o mesmo nome de uma global, a **local tem preferência** dentro daquela função.
- **Atribuição** (`=`): dá um valor a uma variável. À esquerda do `=` fica a variável (chamada **lvalue**); à direita fica um valor ou expressão.
  - Boa prática: inicializar a variável já na declaração (ex.: `int idade = 0;`) para evitar "lixo de memória" (valor indefinido).
- **Tipos de dados mais usados na disciplina**:
  | Tipo | Exemplo | Tamanho típico (gcc) |
  |---|---|---|
  | `char` | `char letra = 'a';` | 1 byte |
  | `int` | `int idade = 22;` | 4 bytes |
  | `short int` | `short int idade = 22;` | 2 bytes |
  | `long int` | — | 8 bytes |
  | `float` | `float salario = 1.2345;` | 4 bytes |
  | `double` | `double preco = 315.59;` | 8 bytes |
  | `long double` | — | 16 bytes |

  Esses tamanhos (obtidos com `sizeof`) são os valores típicos no GCC usado na disciplina; o padrão C não garante tamanhos fixos — eles podem variar entre compilador/arquitetura.
- **Regras de nomenclatura**: C é *case-sensitive* (`preco`, `Preco` e `PRECO` são variáveis diferentes). Nomes não podem começar com número nem usar palavras reservadas da linguagem (ex.: `int auto;` ou `int 5n;` são erros).
- **Números literais**: sem ponto decimal → interpretado como `int`; com ponto decimal → interpretado como `double` por padrão.
- **Notação científica**: `double planck = 6.62607E-34;` (equivale a 6,62607 × 10⁻³⁴).
- **Bases numéricas em literais**:
  - Hexadecimal: prefixo `0x` ou `0X` (ex.: `0x2A` = 42 decimal).
  - Octal: prefixo `0` (ex.: `076` = 62 decimal).
  - Binário: prefixo `0b` ou `0B` (ex.: `0b100101` = 37 decimal) — extensão de compilador (GCC), não é parte do padrão C clássico.
- **Sufixos de literais**:
  - Inteiros: `U`/`u` (unsigned), `L`/`l` (long), `UL`/`ul` (unsigned long), `LL`/`ll` (long long), `ULL`/`ull` (unsigned long long).
  - Decimais: `f`/`F` (float), `l`/`L` (long double).
  - Exemplo: `0x15FUL` representa 351 em `unsigned long int` (valor hexadecimal 0x15F = 351 em decimal).
- **`printf` e especificadores de formato**: `%i`/`%d` (inteiro), `%f` (ponto flutuante), `%c` (caractere), `%s` (string — ver Aula 13).
  - O número de especificadores no formato deve **corresponder exatamente** ao número de variáveis passadas depois da string, na mesma ordem.
- **Formatação de saída do `printf`** (exemplos):
  ```c
  printf("%10iFIM\n", -1234);     // alinhado à direita em 10 espaços
  printf("%+10iFIM\n", 1234);     // "+" força mostrar o sinal
  printf("%+010iFIM\n", 1234);    // preenche com zeros à esquerda
  printf("%+-10iFIM\n", 1234);    // "-" alinha à esquerda
  printf("%.2fFIM\n", 1234.112);  // 2 casas decimais
  printf("%xFIM\n", 60);          // hexadecimal: 3c
  printf("%#xFIM\n", 60);         // hexadecimal com prefixo: 0x3c
  ```
- **`sizeof(tipo_ou_variavel)`**: retorna o número de bytes ocupado. Útil para verificar o tamanho real de um tipo no compilador usado.
- **Constantes**:
  - Macro de pré-processador: `#define NOME valor` (ex.: `#define PI 3.1416`). O pré-processador faz substituição textual antes da compilação.
  - Variável constante: `const tipo nome_var = valor;` (ex.: `const double PI = 3.1415;`) — tem tipo e é verificada pelo compilador, diferente da macro.

## Erros comuns e pontos de atenção
- Usar uma variável **sem inicializar** e esperar que ela comece em zero — em C ela começa com "lixo de memória" (valor indeterminado).
- Número de especificadores de formato no `printf` diferente do número de variáveis passadas — comportamento indefinido (pode imprimir valores incorretos ou travar).
- Confundir `%d`/`%i` (inteiro) com `%f` (ponto flutuante) ao imprimir — tipo do especificador deve casar com o tipo da variável.
- Esquecer que nomes de variáveis são *case-sensitive*: `Nota` e `nota` são variáveis diferentes.
- Tentar usar uma palavra reservada (`int`, `float`, `return`, etc.) como nome de variável.

## Perguntas socráticas sugeridas
- "O que você acha que vai aparecer na tela se você usar `printf` com `%f` para imprimir uma variável `int`?"
- "Se uma variável local e uma global têm o mesmo nome, qual valor é usado dentro da função? Por quê?"
- "Qual a diferença prática entre `#define PI 3.1416` e `const double PI = 3.1416;`? Em qual dos dois o compilador sabe o *tipo* da constante?"

## Exercícios da aula
1. Programa que exibe nome e e-mail do usuário, espera o usuário pressionar uma tecla (dica: `getchar`), depois exibe nome e e-mail de um amigo.
2. Declarar duas variáveis inteiras `A` e `B`, atribuir valores diferentes, e trocar os valores entre elas (A passa a ter o valor de B e vice-versa). Mostrar valores antes e depois.

## Notas de revisão
- Conteúdo verificado e correto. Os tamanhos de tipo mostrados no slide (`char`=1, `int`=4, `float`=4, `double`=8, `short int`=2, `long int`=8, `long double`=16 bytes) foram mantidos, mas com a ressalva adicionada de que são valores típicos do GCC/compilador usado na disciplina, não garantias do padrão da linguagem C.
- A transcrição verificada desta aula foi adicionada depois desta revisão (`Transcrição-Verificadas/Aula_03_Variaveis.md`) e pode trazer exemplos complementares.
