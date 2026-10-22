# Material de Ensino Verificado – Aulas 01 a 21

Conteúdo técnico revisado de cada aula: conceitos-chave, erros comuns, perguntas socráticas, exercícios e notas de revisão (correções em relação aos slides originais). Esta é a fonte de referência para o conteúdo técnico.

<!-- Material: Aula_01_Introducao.md -->
## Aula 01 - Introdução

- **Tópicos:** [computador, hardware, software, bits, bytes, unidades de armazenamento, linguagem de programação, algoritmo]
- **Pré-requisitos:** []
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_01_Introducao.md
- **Status:** verificado

### Objetivo
Apresentar os conceitos básicos de computação (hardware, software, unidades de dados) e o conceito de algoritmo, como base para a introdução à programação em C.

### Conceitos-chave

- **Computador**: equipamento eletrônico que executa quatro tarefas básicas: Entrada de Dados → Armazenamento → Processamento → Saída de Resultados.
- **Hardware**: componentes físicos (processador, placa-mãe, memória, periféricos).
- **Software**: conjunto de instruções (em bytes) que o processador executa. Divide-se em:
  - *Software básico*: necessário para o funcionamento do sistema (ex.: sistema operacional, drivers).
  - *Software aplicativo*: uso direto do usuário (ex.: navegador, editor de texto, jogos) — é o tipo de programa desenvolvido na disciplina.
- **Bit**: menor unidade de dado, valor 0 ou 1 (desligado/ligado).
- **Byte**: conjunto de 8 bits; representa 1 caractere; permite 2^8 = 256 combinações.
- **Unidades de medida (base 2)**: 1 KB = 2^10 bytes, 1 MB = 2^20 bytes, 1 GB = 2^30 bytes, 1 TB = 2^40 bytes.
  - Atenção: fabricantes de disco costumam anunciar capacidade em base 10 (ex.: 1 TB = 10^12 bytes), o que gera a diferença entre a capacidade "anunciada" e a capacidade real mostrada pelo sistema operacional (que usa base 2). Isso explica por que um "HD de 1 TB" aparece com menos espaço no computador.
- **Linguagem de máquina**: sequência de bits que o processador entende diretamente; difícil de escrever e ler.
- **Linguagem de programação**: conjunto de regras mais próximas da linguagem humana, convertido para linguagem de máquina (compilação). Exemplo: linguagem C.
- **Algoritmo**: sequência finita e bem definida de passos para resolver um problema. Não é um conceito restrito à computação (ex.: receita de bolo, troca de pneu).

### Exemplo de algoritmo (pseudocódigo)

```
Algoritmo: Somar dois números
Início
  Definir Valor1, Valor2, Soma
  Ler Valor1
  Ler Valor2
  Soma = Valor1 + Valor2
  Mostrar Soma
Fim
```

### Etapas para construir um algoritmo
1. Entender claramente o problema a ser resolvido (objetivo do programa).
2. Levantar todas as informações relevantes (dados de entrada e operações necessárias).
3. Descrever os passos da solução em sequência lógica.
4. Chegar à especificação final do algoritmo.

### Erros comuns e pontos de atenção
- Confundir **hardware** com **software** (hardware é físico; software é o conjunto de instruções).
- Achar que "capacidade do disco" na caixa é igual à capacidade mostrada pelo sistema operacional — a diferença vem da base 10 (fabricante) vs. base 2 (sistema).
- Pular a etapa de entender o problema e já tentar "escrever código" — a maior dificuldade em algoritmos costuma ser compreender exatamente o que está sendo pedido, não a sintaxe.

### Perguntas socráticas sugeridas
- "Se um processador só entende 0 e 1, como um comando como `printf` chega a virar algo que ele executa?"
- "Por que você acha que um HD de '1 TB' aparece com menos de 1000 GB no seu computador?"
- "Antes de escrever qualquer linha de código, que perguntas você faria sobre o problema para garantir que entendeu o que precisa ser feito?"

### Notas de revisão
- Conteúdo das slides conferido e consistente com a bibliografia da disciplina; nenhuma correção técnica foi necessária nesta aula.

---

<!-- Material: Aula_02_Linguagem_C.md -->
## Aula 02 - Linguagem C

- **Tópicos:** [linguagem de maquina, assembly, historia da linguagem C, compilador gcc, estrutura de um programa C, printf, comentarios, caracteres de escape]
- **Pré-requisitos:** ["Aula 01 - Introdução"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_02_Linguagem_C.md
- **Status:** verificado

### Objetivo
Explicar por que linguagens de alto nível como C existem, apresentar a origem e características da linguagem C, e mostrar a estrutura básica de um programa C (compilação, função `main`, `printf`, comentários).

### Conceitos-chave

- **Código de máquina**: sequência de bytes específica de cada família de processador; difícil de programar diretamente.
- **Assembly**: linguagem de baixo nível mais legível que código de máquina, mas ainda dependente de hardware, difícil de manter e propensa a erros.
- **Linguagem C**: criada por Dennis Ritchie na década de 1970, derivada da linguagem B (Ken Thompson), que por sua vez vem do BCPL (Martin Richards).
  - Chamada de linguagem de **"médio nível"**: combina abstração de alto nível com capacidade de manipular bits, bytes e endereços de memória (como assembly).
  - **Altamente portável**: o mesmo código-fonte pode ser compilado para diferentes arquiteturas, desde que siga um padrão (K&R, ANSI C/C89/C90, C99, C11, C18).
- **Arquivo-fonte (.c)**: contém o algoritmo escrito em C; é processado pelo **compilador** (ex.: GCC) e transformado em um executável (código de máquina).
- **Estrutura básica de um programa C**:
  ```c
  tipo_retorno nome_funcao(parametros) {
      declaracao_variaveis
      instrucoes
      retorno;
  } // fim do bloco da função
  ```
- **Programa mínimo ("Hello World")**:
  ```c
  #include <stdio.h>
  #include <stdlib.h>

  int main() {
      printf("Hello World\n");
      return 0;
  } // main
  ```
  Compilação típica (GCC): `gcc -Wall -o hello hello.c`
- **Elementos da estrutura**:
  - `#include <biblioteca>`: inclui funções que serão usadas (ex.: `stdio.h` para `printf`/`scanf`).
  - `int main()`: função principal, primeira a ser executada; pode ter outros nomes de função, exceto `main`.
  - `{` e `}`: delimitam início e fim de um bloco/função.
  - `;`: termina cada instrução.
  - `return 0;`: valor de retorno da função (0 geralmente indica execução sem erros).
- **`printf`**: imprime texto na tela; a mensagem fica entre aspas duplas; `\n` insere quebra de linha.
- **Caracteres de escape**: `\a` (bip), `\n` (nova linha), `\t` (tabulação), `\\` (barra invertida), `\'` (aspas simples), `\"` (aspas duplas), `\?` (interrogação).
- **Comentários**:
  - `/* comentário */` — para um trecho (pode ocupar várias linhas).
  - `// comentário` — para uma única linha, geralmente no início dela.

### Erros comuns e pontos de atenção
- **Aspas "curvas" (smart quotes)**: ao copiar código de slides em PowerPoint/PDF, aspas retas (`"`) às vezes aparecem como aspas curvas (`“` `”`). Código C **não compila** com aspas curvas — é preciso reescrever com aspas retas no editor de texto/IDE.
- Esquecer o `;` no final de uma instrução é um dos erros de sintaxe mais comuns para quem está começando.
- Esquecer o `#include` da biblioteca correspondente à função usada (ex.: usar `printf` sem `#include <stdio.h>` pode gerar aviso/erro dependendo do compilador).
- Confundir `main()` (função especial, ponto de entrada do programa) com uma função qualquer — só pode haver uma função `main` por programa.

### Perguntas socráticas sugeridas
- "Por que não escrevemos programas direto em código de máquina ou assembly?"
- "O que você acha que acontece se você remover o `return 0;` do final do `main`? E se remover as chaves `{ }`?"
- "Se o compilador reclamar de um caractere 'inesperado' logo depois de aspas que parecem normais, o que pode ter acontecido?"

### Notas de revisão
- Conteúdo técnico e histórico (origem do C, padrões, estrutura do programa) está correto e consistente com a bibliografia.
- Adicionado como ponto de atenção o problema de aspas curvas ao copiar código de slides/PDF — não estava explícito no material original, mas é um erro muito comum e vale a pena a IA alertar o aluno sobre isso proativamente.

---

<!-- Material: Aula_03_Variaveis.md -->
## Aula 03 - Variáveis

- **Tópicos:** [variaveis, escopo, tipos de dados, printf, especificadores de formato, bases numericas, sufixos, sizeof, constantes, define, const]
- **Pré-requisitos:** ["Aula 02 - Linguagem C"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_03_Variaveis.md
- **Status:** verificado

### Objetivo
Explicar o que são variáveis, como declará-las e usá-las, os principais tipos de dados em C, como exibi-las com `printf`, e o conceito de constantes.

### Conceitos-chave

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

### Erros comuns e pontos de atenção
- Usar uma variável **sem inicializar** e esperar que ela comece em zero — em C ela começa com "lixo de memória" (valor indeterminado).
- Número de especificadores de formato no `printf` diferente do número de variáveis passadas — comportamento indefinido (pode imprimir valores incorretos ou travar).
- Confundir `%d`/`%i` (inteiro) com `%f` (ponto flutuante) ao imprimir — tipo do especificador deve casar com o tipo da variável.
- Esquecer que nomes de variáveis são *case-sensitive*: `Nota` e `nota` são variáveis diferentes.
- Tentar usar uma palavra reservada (`int`, `float`, `return`, etc.) como nome de variável.

### Perguntas socráticas sugeridas
- "O que você acha que vai aparecer na tela se você usar `printf` com `%f` para imprimir uma variável `int`?"
- "Se uma variável local e uma global têm o mesmo nome, qual valor é usado dentro da função? Por quê?"
- "Qual a diferença prática entre `#define PI 3.1416` e `const double PI = 3.1416;`? Em qual dos dois o compilador sabe o *tipo* da constante?"

### Exercícios da aula
1. Programa que exibe nome e e-mail do usuário, espera o usuário pressionar uma tecla (dica: `getchar`), depois exibe nome e e-mail de um amigo.
2. Declarar duas variáveis inteiras `A` e `B`, atribuir valores diferentes, e trocar os valores entre elas (A passa a ter o valor de B e vice-versa). Mostrar valores antes e depois.

### Notas de revisão
- Conteúdo verificado e correto. Os tamanhos de tipo mostrados no slide (`char`=1, `int`=4, `float`=4, `double`=8, `short int`=2, `long int`=8, `long double`=16 bytes) foram mantidos, mas com a ressalva adicionada de que são valores típicos do GCC/compilador usado na disciplina, não garantias do padrão da linguagem C.
- A transcrição verificada desta aula foi adicionada depois desta revisão (`Transcrição-Verificadas/Aula_03_Variaveis.md`) e pode trazer exemplos complementares.

---

<!-- Material: Aula_04_Operadores_Aritmeticos.md -->
## Aula 04 - Operadores Aritméticos

- **Tópicos:** [operadores aritmeticos, precedencia de operadores, divisao inteira, casting, incremento, decremento]
- **Pré-requisitos:** ["Aula 03 - Variáveis"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_04_Operadores_Aritmeticos.md
- **Status:** verificado

### Objetivo
Apresentar os operadores aritméticos da linguagem C, a regra de precedência entre eles, e o comportamento da divisão entre inteiros e ponto flutuante (conversão implícita e *casting*).

### Conceitos-chave

- **Operadores aritméticos básicos**:
  | Operador | Operação |
  |---|---|
  | `+` | Soma |
  | `-` | Subtração |
  | `*` | Multiplicação |
  | `/` | Divisão |
  | `%` | Resto da divisão (módulo) — só funciona com inteiros |
  | `++` | Incremento (pré ou pós) |
  | `--` | Decremento (pré ou pós) |
- **Regra geral**: operações aritméticas ocorrem entre operandos do mesmo tipo. Se os tipos forem diferentes (ex.: `int` e `float`), o compilador converte implicitamente o operando de tipo "menos abrangente" para o tipo "mais abrangente" (ex.: `int` → `float`). O resultado tem o tipo mais abrangente entre os operandos.
- **Divisão entre inteiros**: `int / int` resulta em divisão inteira (a parte decimal é truncada), mesmo que o resultado seja atribuído a uma variável `float`/`double`.
  - Exemplo: `int a = 10, b = 3; float n = a / b;` → `a/b` é calculado como divisão inteira (`3`), e só depois o `3` é convertido para `3.0` ao ser atribuído a `n`.
  - Para obter divisão com decimais, pelo menos um dos operandos precisa ser `float`/`double`, ou usar **casting** explícito: `n = (float) a / b;` força `a` a ser tratado como `float` antes da divisão.
- **Casting**: permite forçar o tipo do resultado de uma operação, escrevendo `(tipo)` antes do valor/variável. Sem casting explícito, prevalece a regra de conversão implícita (tipo mais abrangente).
- **Precedência de operadores aritméticos** (do maior para o menor):
  1. Expressões entre parênteses `()`
  2. Multiplicação `*` e divisão `/` (esquerda para direita)
  3. Soma `+` e subtração `-` (esquerda para direita)
- **Incremento/decremento, pré e pós**:
  - `m = c++;` → **pós-incremento**: atribui o valor atual de `c` a `m`, e só depois incrementa `c`.
  - `m = ++c;` → **pré-incremento**: incrementa `c` primeiro, depois atribui o novo valor a `m`.
  - O mesmo vale para `--` (pós-decremento `c--` e pré-decremento `--c`).

### Exemplo resolvido de precedência
```c
v1 = (a * (c + d)) / (b * (e + f));
// com a = 1.5, b = 4, c = 2, d = 3, e = 1.2, f = 4.3
```
| Ordem | Operação | Resultado |
|---|---|---|
| 1ª | `(c + d)` | 2 + 3 = 5 |
| 2ª | `(e + f)` | 1.2 + 4.3 = 5.5 |
| 3ª | `a * (1ª)` | 1.5 * 5 = 7.5 |
| 4ª | `b * (2ª)` | 4 * 5.5 = 22.0 |
| 5ª | `(3ª) / (4ª)` | 7.5 / 22.0 ≈ 0.341 |
| 6ª | `v1 = (5ª)` | v1 = 0.341 |

### Exemplo de código
```c
#include <stdio.h>
#include <stdlib.h>

float valor1 = 0;
float valor2 = 0;
float soma = 0;

int main() {
    valor1 = 5;
    valor2 = 6;
    soma = valor1 + valor2;
    printf("A soma é: %.2f\n", soma);
    return 0;
} // main
```

### Erros comuns e pontos de atenção
- **Divisão inteira inesperada**: calcular `media = soma / quantidade;` quando `soma` e `quantidade` são `int` dá um resultado truncado mesmo que `media` seja `float`. É um dos erros mais comuns em listas de exercícios com médias/percentuais.
- Confundir pré-incremento (`++c`) com pós-incremento (`c++`) ao usá-los dentro de uma expressão maior (ex.: `m = c++;` vs `m = ++c;` dão resultados diferentes para `m`).
- Usar `%` (módulo) com `float`/`double` — o operador `%` em C só é definido para operandos inteiros.
- Esquecer o `#include <math.h>` ao usar funções como `pow` ou `sqrt`.

### Perguntas socráticas sugeridas
- "Se `a` e `b` são `int` e você calcula `a / b`, o resultado pode ter casas decimais? Por quê?"
- "Qual a diferença entre `m = c++;` e `m = ++c;` se `c` vale 5 antes da linha?"
- "Como você forçaria uma divisão `a / b` a considerar as casas decimais, mesmo com `a` e `b` sendo `int`?"

### Exercícios da aula
1. Calcular litros de combustível gastos em uma viagem (consumo de 12 km/litro, tempo 35 min, velocidade média 80 km/h).
2. Calcular o valor de uma caderneta de poupança (depósito inicial R$500,00, juros de 1% ao mês) após 3 meses.
3. Com `A = 40` e `B = -1`, calcular e imprimir `A+B`, `A-B`, `A*B`, `A/B`; depois incrementar `B` em 1 e repetir as 4 operações.
4. Calcular peso ideal a partir de uma altura constante, usando a fórmula `peso_ideal = 72.7 * altura - 58`.

### Notas de revisão
- Conteúdo técnico verificado e correto, incluindo a tabela de precedência e o exemplo numérico (7.5 / 22.0 ≈ 0.341 confere).
- Reforçada explicitamente a armadilha da divisão inteira, citada apenas de forma indireta no slide original ("Para pensar"), pois é um dos erros mais frequentes de alunos iniciantes.

---

<!-- Material: Aula_05_Entrada_de_Dados.md -->
## Aula 05 - Entrada de Dados

- **Tópicos:** [scanf, entrada de dados, operador endereco, buffer de teclado, setbuf]
- **Pré-requisitos:** ["Aula 03 - Variáveis", "Aula 04 - Operadores Aritméticos"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_05_Entrada_de_Dados.md
- **Status:** verificado (com observação de boas práticas)

### Objetivo
Apresentar a função `scanf` para ler dados digitados pelo usuário, o papel do operador `&` (endereço de memória), leitura de múltiplos valores, e o problema clássico do "buffer do teclado" ao misturar leitura de números e caracteres.

### Conceitos-chave

- **`scanf`** (biblioteca `stdio.h`): lê dados digitados pelo usuário.
  ```c
  scanf("%especificador", &variavel);
  ```
  - Especificadores comuns: `%i`/`%d` (inteiro), `%f` (float), `%lf` (double), `%c` (caractere).
  - O destino deve ser o **endereço** da variável (por isso o `&`).
- **O símbolo `&`**: toda variável está associada a um endereço de memória. `&variavel` obtém esse endereço (pode ser exibido com o especificador `%p`). O `scanf` precisa do endereço para saber **onde** escrever o valor lido — usar a variável sem o `&` é um erro comum e grave.
- **Lendo vários valores em um único `scanf`**: basta colocar vários especificadores na string de formato e listar os destinos na mesma ordem.
  ```c
  int dia, mes, ano;
  scanf("%d/%d/%d", &dia, &mes, &ano);
  ```
- **Problema do buffer com `%c`**: quando se mistura leitura de números (`%i`/`%d`) com leitura de caractere (`%c`), o `Enter` (`\n`) digitado após o número fica no buffer do teclado e é lido pelo `scanf("%c", ...)` seguinte **como se fosse o caractere digitado**, fazendo parecer que o programa "pulou" a pergunta.

### Observação importante sobre `setbuf(stdin, NULL)`
O slide original resolve o problema do buffer com `setbuf(stdin, NULL);` após o `scanf` do número. Isso funciona na prática em compiladores comuns no Windows (ex.: MinGW), mas **não é um comportamento garantido pelo padrão C** — `setbuf`/`fflush` em um stream de entrada (`stdin`) é oficialmente *comportamento indefinido* pelo padrão da linguagem, mesmo que funcione na prática em alguns ambientes.

Alternativas mais portáveis para "limpar" o `\n` deixado no buffer antes de ler um caractere:
- Usar `scanf(" %c", &letra);` — o **espaço antes do `%c`** instrui o `scanf` a pular quaisquer espaços em branco (incluindo `\n`) antes de ler o caractere.
- Ler e descartar manualmente os caracteres restantes com um laço usando `getchar()` até encontrar `\n` ou EOF.

Para fins da disciplina, ambas as abordagens (a do slide e a alternativa com espaço antes de `%c`) podem ser apresentadas ao aluno; o importante é que ele entenda **por que** o problema ocorre (o `\n` fica no buffer).

### Exemplo de código
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int idade;
    printf("Digite sua idade:");
    scanf("%i", &idade);
    printf("Você possui %i anos\n", idade);
    return 0;
} // main
```

### Erros comuns e pontos de atenção
- Esquecer o `&` antes da variável no `scanf` (ex.: `scanf("%i", idade);` em vez de `scanf("%i", &idade);`) — erro muito comum e que costuma causar comportamento imprevisível ou travamento.
- Usar `%f` para ler uma variável `double` no `scanf` — o especificador correto para `double` em `scanf` é `%lf` (diferente do `printf`, onde `%f` funciona tanto para `float` quanto para `double` por promoção automática de argumento).
- Não considerar o problema do buffer ao misturar `scanf("%d", ...)` com `scanf("%c", ...)` em sequência.

### Perguntas socráticas sugeridas
- "O que o `scanf` precisa saber para colocar o valor digitado dentro da variável certa? Por que passamos `&idade` e não só `idade`?"
- "Se você ler um número com `scanf(\"%d\", &numero)` e, na linha seguinte, ler um caractere com `scanf(\"%c\", &letra)`, o que pode ter ficado 'esperando' no buffer depois do número?"
- "Qual a diferença entre `%f` e `%lf` quando usados no `scanf` para ler uma variável `double`?"

### Exercícios da aula
1. Receber a altura de uma pessoa e calcular o peso ideal (`peso_ideal = 72.7 * altura - 58`).
2. Calcular a idade de uma pessoa a partir do ano de nascimento e do ano atual (ambos digitados pelo usuário).
3. Calcular comissão (10% sobre vendas) e salário bruto (salário base R$1.200,00 + comissão) a partir do total vendido por um funcionário.
4. Calcular a média aritmética de 4 números reais digitados, exibindo com 2 casas decimais.
5. Calcular a raiz quadrada de um número digitado, usando `sqrt` (biblioteca `math.h`) — usar `double` para os valores.

### Notas de revisão
- Correção/complemento: o slide original apresenta `setbuf(stdin, NULL)` como solução definitiva para o problema do buffer. Foi adicionada a observação de que esse uso é comportamento indefinido pelo padrão C (ainda que funcione na prática em compiladores comuns usados na disciplina), junto com uma alternativa mais portável (`scanf(" %c", ...)`), para que a IA possa explicar a limitação caso o aluno pergunte ou tenha problemas em outro ambiente (ex.: Linux/gcc).

---

<!-- Material: Aula_06_Selecao_If_Else.md -->
## Aula 06 - Estrutura de Seleção if / else

- **Tópicos:** [if, else, operadores relacionais, operadores logicos, if aninhado, operador ternario]
- **Pré-requisitos:** ["Aula 04 - Operadores Aritméticos", "Aula 05 - Entrada de Dados"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_06_Estrutura_de_Selecao_if_else.md
- **Status:** verificado

### Objetivo
Apresentar a estrutura condicional `if`/`else`, os operadores relacionais e lógicos usados nas condições, estruturas aninhadas e o operador ternário.

### Conceitos-chave

- **Estrutura `if`/`else`**:
  ```c
  if (condicao) {
      // executado se a condição for Verdadeira
  } else {
      // executado se a condição for Falsa (bloco opcional)
  }
  ```
  - `condicao` deve ser uma expressão que resulte em um valor lógico (Verdadeiro/Falso). Em C, qualquer valor diferente de zero é considerado "verdadeiro", e zero é "falso".
  - O `else` é **opcional**.
- **Operadores relacionais**: `==` (igual), `!=` (diferente), `>` (maior), `<` (menor), `>=` (maior ou igual), `<=` (menor ou igual).
- **Operadores lógicos** (para combinar condições): `&&` (E — verdadeiro só se ambas forem verdadeiras), `||` (OU — verdadeiro se pelo menos uma for verdadeira), `!` (NEGAÇÃO — inverte o valor lógico).
  - Tabela-verdade de `&&`: V&&V=V; V&&F=F; F&&V=F; F&&F=F.
  - Tabela-verdade de `||`: V||V=V; V||F=V; F||V=V; F||F=F.
- **`if`/`else` aninhado**: usado quando há mais de dois caminhos possíveis — coloca-se um `if`/`else` dentro de outro.
  ```c
  if (idade >= 18) {
      printf("Você é adulto\n");
  } else {
      if (idade >= 12) {
          printf("Você é adolescente\n");
      } else {
          printf("Você é criança\n");
      }
  }
  ```
- **Operador ternário `?:`**: forma compacta de uma decisão simples.
  ```c
  <condicao> ? <expressao_se_verdadeiro> : <expressao_se_falso>;
  ```
  Exemplo — as duas formas abaixo são equivalentes:
  ```c
  meta = producao < 200 ? 0 : 1;
  // equivalente a:
  if (producao < 200) { meta = 0; } else { meta = 1; }
  ```

### Exemplo de código
```c
#include <stdio.h>

int main() {
    int idade;
    printf("Digite sua idade:");
    scanf("%i", &idade);
    if (idade >= 12 && idade < 18) {
        printf("Você é adolescente\n");
    } else {
        printf("Você é criança ou adulto\n");
    }
    return 0;
}
```

### Erros comuns e pontos de atenção
- **Usar `=` em vez de `==`** dentro de uma condição (ex.: `if (nota = 6)`). Isso é um erro clássico em C: `nota = 6` é uma **atribuição válida** que faz `nota` valer 6, e o `if` avalia o resultado da atribuição (6, que é "verdadeiro" por ser diferente de zero) — o programa compila, mas o comportamento é totalmente diferente do pretendido.
- Esquecer que **todos os caminhos possíveis** devem ser tratados — uma solução que só cobre alguns casos pode compilar e "parecer certa" nos testes simples, mas falhar em casos de borda.
- Em condições compostas, esquecer parênteses ao combinar `&&` e `||`, o que pode alterar a ordem de avaliação pretendida.
- Comparar números de ponto flutuante (`float`/`double`) com `==` — devido a imprecisões de representação binária, comparações de igualdade exata com `float`/`double` podem falhar mesmo quando os valores "deveriam" ser iguais matematicamente.

### Perguntas socráticas sugeridas
- "O que aconteceria se, por engano, você escrever `if (nota = 6)` em vez de `if (nota == 6)`? O código compila? O que ele faz?"
- "Quando você precisa verificar três ou mais caminhos diferentes (não apenas dois), como você estruturaria os `if`/`else`?"
- "Nesta condição, `idade >= 12 && idade < 18`, o que acontece se só uma das duas partes for verdadeira?"

### Exercícios da aula
1. Receber a nota de um aluno e exibir "aprovado" (nota ≥ 6) ou "reprovado" (nota < 6).
2. Receber um número e determinar se é par ou ímpar (usar o operador `%`).
3. Receber os coeficientes `a`, `b`, `c` de uma equação de 2º grau e calcular as raízes (fórmula de Bhaskara).
4. Calcular o imposto de renda de um salário, usando uma tabela de alíquotas progressivas e parcela de dedução.

### Notas de revisão
- Conteúdo técnico correto e consistente com a linguagem C padrão.
- Adicionado como ponto de atenção o erro clássico `=` vs `==`, que não estava mencionado explicitamente no slide original, mas é um dos erros mais comuns e didaticamente relevante para um tutor socrático apontar através de perguntas (sem entregar a resposta direta).

---

<!-- Material: Aula_07_Switch.md -->
## Aula 07 - Estrutura de Seleção - Switch

- **Tópicos:** [switch, case, break, default, selecao multipla]
- **Pré-requisitos:** ["Aula 06 - Estrutura de Seleção if / else"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_07_Estrutura_de_Selecao_Switch.md
- **Status:** verificado

### Objetivo
Apresentar o `switch` como alternativa ao encadeamento de vários `if`/`else` quando é preciso escolher entre várias alternativas baseadas no valor de uma única variável.

### Conceitos-chave

- **Motivação**: encadear muitos `if`/`else` para testar vários valores possíveis de uma mesma variável torna o código complexo e difícil de ler. O `switch` resolve esse caso específico (comparação de igualdade de uma variável contra valores constantes).
- **Restrição importante**: `switch` só funciona com variáveis do tipo **`int` ou `char`** (incluindo tipos compatíveis, como `short`, `long`, enums). **`float`/`double` não podem ser usados** no `switch`.
- **Sintaxe**:
  ```c
  switch (variavel) {
      case valor1:
          // instruções
          break;
      case valor2:
          // instruções
          break;
      default:
          // executado se nenhum case corresponder
          break;
  } // switch
  ```
  - `break`: termina a execução do `case` atual, saindo do `switch`. **Sem o `break`, a execução continua para o próximo `case` ("fall-through")**, mesmo que o valor dele não corresponda.
  - `default`: bloco opcional, executado quando nenhum `case` corresponde ao valor da variável.

### Exemplo de código
```c
#include <stdio.h>

int main() {
    char opcao;
    printf("Digite uma opção (a, b ou c):");
    scanf("%c", &opcao);

    switch (opcao) {
        case 'a':
            printf("Escolheu a opção: a");
            break;
        case 'b':
            printf("Escolheu a opção: b");
            break;
        case 'c':
            printf("Escolheu a opção: c");
            break;
        default:
            printf("Opção diferente de a, b ou c...\n");
            break;
    } // switch
    return 0;
}
```

### Erros comuns e pontos de atenção
- **Esquecer o `break`** em um `case`: a execução "cai" (fall-through) para o próximo `case`, executando instruções que não deveriam rodar para aquele valor. Esse é o erro mais comum e característico do `switch` em C.
- Tentar usar `switch` com uma variável `float`/`double` — não compila.
- Tentar usar uma expressão/intervalo em um `case` (ex.: `case nota >= 6:`) — o `case` em C só aceita **valores constantes exatos**, não condições ou intervalos (para intervalos, usar `if`/`else`).
- Esquecer o `default` quando é importante tratar valores inesperados digitados pelo usuário.

### Perguntas socráticas sugeridas
- "O que aconteceria se você removesse o `break` do `case 'a'`? O programa pararia de compilar, ou o comportamento mudaria em tempo de execução?"
- "Por que você não pode escrever `case idade >= 18:` dentro de um `switch(idade)`?"
- "Em que situação um `switch` deixa o código mais claro do que vários `if`/`else` encadeados?"

### Exercícios da aula
1. Menu com 2 opções: verificar par/ímpar de um número, ou verificar maioridade a partir de uma idade.
2. Calculadora simples usando `switch` para escolher entre `+`, `-`, `*`, `/`.
3. Mesma calculadora, mas lendo os 2 números e o operador em um único `scanf` (ex.: entrada `5+8`).

### Notas de revisão
- Conteúdo técnico correto; nenhuma correção necessária. O ponto do "fall-through" ao esquecer o `break` já estava bem explicado no slide original e foi mantido/reforçado na seção de erros comuns.

---

<!-- Material: Aula_08_Repeticao_While.md -->
## Aula 08 - Estrutura de Repetição While

- **Tópicos:** [while, laco de repeticao, variavel contadora, variavel acumuladora, loop infinito]
- **Pré-requisitos:** ["Aula 06 - Estrutura de Seleção if / else"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_08_Estrutura_de_Repeticao_While.md
- **Status:** verificado

### Objetivo
Apresentar o laço `while`, que repete um bloco de instruções enquanto uma condição for verdadeira, e os padrões de variável contadora e variável acumuladora.

### Conceitos-chave

- **Motivação**: evitar repetir manualmente o mesmo trecho de código quando uma ação precisa ocorrer várias vezes (ex.: somar os números de 1 a 1000 — inviável escrever manualmente 1000 somas).
- **`while`**: testa a condição **antes** de cada execução do bloco. Enquanto a condição for verdadeira, o bloco é executado; quando for falsa, o laço termina.
  ```c
  while (condicao) {
      // instruções repetidas
  } // while
  ```
  Usa os mesmos operadores relacionais (`==`, `!=`, `>`, `<`, `>=`, `<=`) e lógicos (`&&`, `||`, `!`) do `if`.
- **Importante**: é responsabilidade de quem programa garantir que a condição eventualmente se torne falsa — caso contrário, ocorre um **loop infinito**.
  ```c
  int i = 0;
  while (i <= 5) {
      printf("Valor i = %i", i);
      i++; // sem isso, o laço nunca terminaria
  }
  ```
- **Laços com número indeterminado de repetições**: quando não se sabe de antemão quantas vezes o laço vai repetir (ex.: ler teclas digitadas até o usuário digitar `'z'`).
- **Variável contadora**: incrementada a cada passo que uma condição é atendida, para contar ocorrências. Deve ser inicializada (geralmente em 0) e não deve interferir na lógica do laço.
  ```c
  int i = 0, contapar = 0;
  while (i <= 20) {
      if (i % 2 == 0) {
          contapar++;
      }
      i++;
  }
  printf("Números pares = %i\n", contapar);
  ```
- **Variável acumuladora**: soma (acumula) um resultado parcial a cada passo. Também deve ser inicializada antes do laço.
  ```c
  int somapar = 0, i = 0;
  while (i <= 20) {
      if (i % 2 == 0) {
          somapar = somapar + i;
      }
      i++;
  }
  printf("A soma dos pares é %i", somapar);
  ```

### Erros comuns e pontos de atenção
- **Esquecer de atualizar a variável de controle** dentro do laço (ex.: esquecer o `i++;`) — causa loop infinito.
- **Não inicializar** a variável contadora/acumuladora antes do laço — o valor inicial "indefinido" (lixo de memória) invalida o resultado.
- Ao ler caracteres repetidamente dentro de um `while` com `scanf("%c", ...)`, o mesmo problema de **buffer do teclado** descrito na Aula 05 pode ocorrer — o slide original usa `setbuf(stdin, NULL);` dentro do laço para tentar contornar isso; vale a mesma observação de que esse uso de `setbuf` é comportamento não garantido pelo padrão C (ver Aula 05 para a explicação completa e alternativas).
- Confundir a condição de **parada** com a condição de **continuação** — `while (i <= 5)` continua enquanto a condição for verdadeira; é fácil inverter a lógica por engano (ex.: usar `>=` quando o certo seria `<=`).

### Perguntas socráticas sugeridas
- "O que precisa ser verdadeiro para esse `while` nunca terminar? Isso pode acontecer no seu código?"
- "Se a variável `contapar` não for inicializada em 0 antes do laço, o resultado final pode estar certo por acaso? Por quê não dá para confiar nisso?"
- "No exemplo que soma os números pares, o que aconteceria se você colocasse `i++;` *antes* do `if`, em vez de depois?"

### Exercícios da aula
1. Exibir todos os números de 1 a 100 (e depois de 100 a 1).
2. Exibir os múltiplos de 3 entre 1 e 322.
3. Exibir os números pares entre 240 e 730 (inclusive).
4. Receber e calcular o quadrado de 10 números, um de cada vez.
5. Receber números e calcular seus quadrados até que o usuário digite um número negativo ou zero.
6. Calcular o fatorial de um número digitado.
7. Menu com 3 opções (dois testes e sair), repetindo o menu até a opção "sair" ser escolhida; tratar opção inválida com mensagem de erro.
8. Jogo de adivinhação: o computador escolhe um número de 1 a 100 (dica: `rand()` da biblioteca `stdlib.h`), e o usuário tem até 6 tentativas, recebendo dicas de "muito alto"/"muito baixo".

### Notas de revisão
- Conteúdo técnico correto. Foi referenciada (sem repetir todo o conteúdo) a observação já registrada na Aula 05 sobre `setbuf(stdin, NULL)` não ser comportamento garantido pelo padrão C, já que o mesmo padrão de código aparece aqui dentro de um laço.

---

<!-- Material: Aula_09_Repeticao_Do_While.md -->
## Aula 09 - Estrutura de Repetição Do While e Modificadores de Fluxo

- **Tópicos:** [do while, break, continue, goto, modificadores de fluxo]
- **Pré-requisitos:** ["Aula 08 - Estrutura de Repetição While"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_09_Estrutura_de_Repeticao_Do_While.md
- **Status:** verificado (com correção de exemplo)

### Objetivo
Apresentar o laço `do...while` (que garante ao menos uma execução do bloco) e os comandos `break`, `continue` e `goto` para alterar o fluxo de um laço.

### Conceitos-chave

- **Problema do `while`**: ao entrar em um laço `while`, o teste é feito **antes** de qualquer execução — se a condição já começar falsa, o bloco nunca é executado nem uma vez.
- **`do...while`**: garante que o bloco seja executado **pelo menos uma vez**, pois o teste da condição é feito **depois** do bloco.
  ```c
  do {
      // instruções que devem ser repetidas
  } while (condicao);
  ```
  Note o `;` obrigatório depois do `while (condicao)` no `do...while` (diferente do `while` sozinho).
  ```c
  int valor;
  do {
      printf("Digite um valor positivo:");
      scanf("%i", &valor);
  } while (valor <= 0);
  ```
  Útil para validar entradas do usuário: pede o valor pelo menos uma vez e repete enquanto o valor digitado não for aceitável.

- **`break;`**: interrompe incondicionalmente o laço (ou `switch`) em que está, e a execução continua imediatamente após o bloco do laço.
  ```c
  int i = 0;
  while (i < 10) {
      if (i == 5)
          break;
      printf("%i ", i);
      i++;
  }
  printf("Saiu do laço");
  // Saída: 0 1 2 3 4 Saiu do laço
  ```

- **`continue;`**: pula o restante das instruções da iteração atual e volta direto para o teste da condição do laço (sem executar o que vem depois do `continue` naquela iteração).
  ```c
  int i = 0;
  while (i < 10) {
      if (i == 5) {
          i++;
          continue;
      }
      printf("%i ", i);
      i++;
  }
  printf("Saiu do laço");
  // Saída: 0 1 2 3 4 6 7 8 9 Saiu do laço (o 5 é pulado)
  ```

- **`goto label;`**: desvia incondicionalmente a execução para um ponto marcado por um rótulo (`label:`), dentro ou fora de laços.
  ```c
  i = 0;
  inicio: // label "inicio"
      if (i > 5)
          goto final;
      printf("%i ", i);
      i++;
      goto inicio;
  final: // label "final"
      printf("Saiu do laço");
  ```
  **Recomendação forte: evitar `goto`.** Ele dificulta a leitura e a manutenção do código, pois quebra o fluxo linear/estruturado do programa. Praticamente qualquer uso de `goto` pode ser substituído por `while`/`for`/`break`/`continue` de forma mais clara. É apresentado aqui apenas por completude — não é uma prática recomendada em código C moderno.

### Erros comuns e pontos de atenção
- Esquecer o `;` depois de `while (condicao)` no `do...while` — erro de sintaxe comum, já que o `while` solto (sem `do`) não usa `;` no final.
- Confundir `break` com `continue`: `break` **sai** do laço; `continue` **pula para a próxima iteração**, sem sair do laço.
- Usar `goto` para resolver um problema que um `break`/`continue` resolveria de forma mais legível.
- No `continue`, esquecer de atualizar a variável de controle **antes** do `continue` (como no exemplo acima, `i++;` antes do `continue;`) — se a atualização ficar só no final do laço e for pulada pelo `continue`, o laço pode nunca terminar.

### Perguntas socráticas sugeridas
- "Em que situação você usaria `do...while` em vez de `while`? Pense em um caso onde o bloco *precisa* rodar ao menos uma vez."
- "Qual a diferença entre o que acontece quando o programa executa `break` e quando executa `continue`, dentro do mesmo laço?"
- "Por que, na maioria dos casos, é preferível evitar `goto` e usar estruturas como `while`, `break` e `continue`?"

### Exercícios da aula
1. Calcular a média de 2 notas (reais) para 5 alunos, validando que cada nota esteja no intervalo [0, 10] (solicitando novamente se estiver fora).
2. Receber valores enquanto estiverem no intervalo de 500 a 1000; ao receber um valor fora da faixa, parar, exibir quantos valores válidos foram digitados e finalizar.

### Notas de revisão
- **Correção**: os exemplos de saída de `break` e `continue` no slide original mostravam a sequência sem o número `0` inicial ("1 2 3 4 Saiu do laço" e "1 2 3 4 6 7 8 9 Saiu do laço"). Ao simular o código passo a passo, a saída correta começa em `0` (já que `i` começa em 0 e é impresso antes do teste `i == 5`): "0 1 2 3 4 Saiu do laço" e "0 1 2 3 4 6 7 8 9 Saiu do laço". Essa correção foi aplicada acima.

---

<!-- Material: Aula_10_Repeticao_For.md -->
## Aula 10 - Estrutura de Repetição For

- **Tópicos:** [for, laco de repeticao, for aninhado, declaracao de variavel no for, c99]
- **Pré-requisitos:** ["Aula 08 - Estrutura de Repetição While", "Aula 09 - Estrutura de Repetição Do While"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_10_Estrutura_de_Repeticao_For.md
- **Status:** verificado

### Objetivo
Apresentar o laço `for`, mais indicado quando o número de repetições é conhecido ou controlado por um contador, incluindo variações com múltiplas variáveis e laços aninhados.

### Conceitos-chave

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

### Erros comuns e pontos de atenção
- Trocar a vírgula pelo ponto e vírgula (ou vice-versa) ao usar múltiplas variáveis no `for` — a sintaxe exige `;` entre as três partes do `for` e `,` entre múltiplas inicializações/incrementos dentro da mesma parte.
- Modificar a variável de controle do laço dentro do corpo do `for` de forma que a condição nunca se torne falsa (loop infinito).
- Em laços `for` aninhados, confundir qual variável (`x` ou `y`, ou `l`/`c` em matrizes) controla as linhas e qual controla as colunas.
- Esquecer que, se a variável for declarada dentro do `for` (ex.: `for (int c = 0; ...)`), ela **não existe fora do laço** — tentar usá-la depois do `for` resulta em erro de compilação.

### Perguntas socráticas sugeridas
- "Nas três partes do `for (inicialização; condição; incremento)`, qual delas executa apenas uma vez e qual executa repetidamente?"
- "Se você precisasse imprimir uma tabela com linhas e colunas, por que dois laços `for` aninhados seriam úteis?"
- "O que aconteceria se você trocasse a vírgula por ponto e vírgula dentro de `for (int c=0, d=5; ...)`?"

### Exercícios da aula
1. Exibir todos os números de 1 a 100 (e de 100 a 1).
2. Exibir os múltiplos de 5 entre 1 e 500.
3. Exibir os números pares entre 240 e 730 (inclusive).
4. Calcular o fatorial de um número digitado.
5. Receber 10 números e calcular o quadrado de cada um.
6. Exibir `n` elementos da sequência de Fibonacci (t0=0, t1=1, tn = tn-1 + tn-2).
7. Usando `for` aninhado, exibir a tabuada de 1 a 10.
8. Receber um `tamanho` e exibir um quadrado de lado `tamanho` usando o caractere `#` (usando apenas `printf("#")` e `printf("\n")`).

### Notas de revisão
- Conteúdo técnico correto, incluindo a observação sobre a necessidade do padrão C99 para declarar a variável de controle dentro do `for`.

---

<!-- Material: Aula_11_Vetores.md -->
## Aula 11 - Vetores

- **Tópicos:** [vetores, arrays, indice, inicializacao de vetores, leitura e escrita de vetores]
- **Pré-requisitos:** ["Aula 10 - Estrutura de Repetição For"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_11_Vetores.md
- **Status:** verificado

### Objetivo
Apresentar vetores (arrays unidimensionais) como forma de armazenar coleções de dados do mesmo tipo, substituindo a criação de muitas variáveis individuais.

### Conceitos-chave

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

### Erros comuns e pontos de atenção
- **Índice fora dos limites ("off-by-one")**: tentar acessar `notas[5]` em um vetor `int notas[5]` (índices válidos são 0 a 4). Em C, isso **não gera erro de compilação nem é verificado em tempo de execução** — o programa acessa uma posição de memória fora do vetor, o que pode causar comportamento imprevisível ("undefined behavior"), e não necessariamente um erro visível imediatamente. Esse é um dos erros mais traiçoeiros para quem está aprendendo.
- Confundir o **índice** (posição, de 0 a tamanho-1) com o **tamanho** do vetor (quantidade total de elementos).
- Esquecer de usar um laço para percorrer o vetor inteiro, e tentar acessar/imprimir posição por posição manualmente (funciona, mas não escala e é propenso a erros de digitação de índice).
- Ao inicializar parcialmente um vetor (ex.: `int v[5] = {1, 2};`), as posições não inicializadas explicitamente são preenchidas com `0` — isso é diferente de um vetor declarado sem nenhuma inicialização, cujos valores são indefinidos ("lixo de memória").

### Perguntas socráticas sugeridas
- "Se um vetor tem tamanho 5, qual é o primeiro índice válido? E qual é o último?"
- "O que você acha que acontece se o seu código tentar acessar `vetor[5]` em um vetor declarado como `int vetor[5];`? O compilador vai avisar?"
- "Por que usar um laço `for` para ler/imprimir um vetor é melhor do que escrever `scanf`/`printf` uma vez para cada posição?"

### Exercícios da aula
1. Ler dois vetores de tamanho 5 e calcular/exibir o vetor soma.
2. Receber 10 números em um vetor A; gerar um vetor B onde cada elemento é o quadrado do elemento correspondente em A.
3. Ler um vetor A com 10 idades; contar e exibir quantas pessoas têm idade superior a 35 anos.
4. Criar e inicializar um vetor de 8 inteiros; somar seus elementos e exibir o resultado.
5. Dados dois vetores A (4 elementos) e B (5 elementos), imprimir os elementos comuns a ambos.
6. Receber 20 números em um vetor; exibir quantos são iguais a 30, quantos são maiores que a média, e quantos são iguais à média.

### Notas de revisão
- Conteúdo técnico correto. Foi destacado com mais ênfase o risco do acesso fora dos limites do vetor (não verificado em tempo de compilação/execução em C), por ser um dos erros mais comuns e mais difíceis de depurar para iniciantes — ponto importante para o tutor socrático explorar com perguntas antes de apontar diretamente o erro.

---

<!-- Material: Aula_12_Matrizes.md -->
## Aula 12 - Matrizes

- **Tópicos:** [matrizes, vetores bidimensionais, vetores multidimensionais, operacoes com matrizes]
- **Pré-requisitos:** ["Aula 10 - Estrutura de Repetição For", "Aula 11 - Vetores"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_12_Matrizes.md
- **Status:** verificado

### Objetivo
Estender o conceito de vetor para duas dimensões (linha e coluna), mostrando declaração, inicialização, preenchimento, exibição e operações básicas (soma, subtração, multiplicação por escalar e multiplicação de matrizes).

### Conceitos-chave

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

### Operações com matrizes

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

### Erros comuns e pontos de atenção
- Trocar a ordem de linha e coluna ao acessar (`matriz[coluna][linha]` em vez de `matriz[linha][coluna]`) — não gera erro de compilação se as dimensões "combinarem" por coincidência, mas produz resultado errado.
- Tentar somar/multiplicar matrizes com dimensões incompatíveis (ex.: somar uma matriz 2×3 com uma 3×2).
- Nos laços aninhados, confundir qual variável controla linhas e qual controla colunas, especialmente em matrizes não quadradas (número de linhas ≠ número de colunas).
- Acessar um índice de linha ou coluna fora dos limites da matriz (mesmo risco do vetor — ver Aula 11 —, mas em duas dimensões).

### Perguntas socráticas sugeridas
- "Se uma matriz tem 3 linhas e 4 colunas, qual par de laços `for` você usaria para percorrer todos os elementos, e qual deveria ser o laço externo?"
- "Por que não é possível multiplicar uma matriz 2×3 por outra matriz 2×3 diretamente (sem transpor nenhuma delas)?"
- "No preenchimento com `contador++`, por que os valores ficam em ordem crescente linha por linha?"

### Exercícios da aula
1. Criar uma matriz identidade 5×5.
2. Ler uma matriz 3×3 e calcular a soma das diagonais principal e secundária.
3. Ler uma matriz 5×5 e encontrar o maior valor e sua posição (linha, coluna).
4. Multiplicar uma matriz A (lida do teclado) por um escalar 5, gerando a matriz C.
5. Somar duas matrizes A e B, gerando C.
6. Multiplicar duas matrizes A e D, gerando AD.

### Notas de revisão
- Todo o conteúdo numérico (soma, multiplicação por escalar e multiplicação de matrizes) foi recalculado e confirmado correto — nenhuma correção necessária.
- A transcrição verificada desta aula foi adicionada depois desta revisão (`Transcrição-Verificadas/Aula_12_Matrizes.md`) e pode trazer exemplos complementares.

---

<!-- Material: Aula_13_Strings.md -->
## Aula 13 - Strings

- **Tópicos:** [strings, vetor de caracteres, fgets, scanf, strlen, strcpy, strcat, strcmp, string.h]
- **Pré-requisitos:** ["Aula 11 - Vetores"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_13_Strings_Parte_1.md e Aula_13_Strings_Parte_2.md
- **Status:** verificado (com correção técnica importante em strcmp)

### Objetivo
Apresentar strings como vetores de caracteres terminados em `'\0'`, as formas de ler uma string do teclado (e seus riscos), vetores bidimensionais de caracteres, e as principais funções da biblioteca `string.h`.

### Conceitos-chave

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

### Erros comuns e pontos de atenção
- **Correção importante**: o material original (slide) descrevia o retorno de `strcmp` de forma **invertida** ("retorna valor positivo se string1 < string2; retorna valor negativo se string1 > string2"). O comportamento real e padronizado da função (confirmado também na bibliografia da disciplina) é o **oposto**: retorno **negativo** quando `string1 < string2`, e retorno **positivo** quando `string1 > string2`. Essa correção já está refletida na descrição acima — é importante que a IA não repasse a versão invertida ao aluno.
- Usar `gets()` — função insegura e removida do padrão C; a IA deve sempre recomendar `fgets` no lugar.
- Esquecer de remover o `'\n'` deixado pelo `fgets` (com `strcspn` + atribuição de `'\0'`), o que pode causar resultados inesperados em comparações (`strcmp`) ou concatenações (`strcat`).
- Não reservar espaço extra no vetor de `char` para o `'\0'` (ex.: declarar `char nome[5];` para guardar uma string de exatamente 5 caracteres úteis, sem espaço para o terminador).
- Tentar comparar strings com `==` em vez de `strcmp` — em C, `==` entre vetores de `char` compara **endereços de memória**, não o conteúdo das strings, e quase nunca faz o que o aluno espera.

### Perguntas socráticas sugeridas
- "Se `strcmp("abacaxi", "banana")` retorna um valor negativo, o que isso te diz sobre a ordem alfabética entre essas duas palavras?"
- "Por que `char nome[5];` pode não ser suficiente para guardar a palavra 'Carlos'?"
- "O que você acha que aconteceria se comparássemos duas strings usando `if (nome1 == nome2)` em vez de `strcmp`?"

### Exercícios da aula
1. Armazenar 10 nomes em um vetor de strings e imprimir uma lista numerada.
2. Armazenar nome e salário de 5 funcionários; calcular um aumento de 8% e exibir a nova folha de pagamento.
3. Armazenar nome e telefone de 5 pessoas; exibir os dados de uma posição escolhida; finalizar ao receber `-1`.
4. Receber um nome, repetindo a pergunta enquanto o nome tiver menos de 5 caracteres (usar `strlen`).
5. Receber uma frase e contar quantas vezes cada vogal aparece.
6. Receber nome e sobrenome; construir a string no formato "Sobrenome, Nome" (usar `strcat`/`strcpy`).
7. Receber a sigla de um estado da região Sul/Sudeste e exibir o nome completo correspondente (usar `strcmp` para comparar com as siglas conhecidas).

### Notas de revisão
- **Correção técnica relevante aplicada**: a definição de `strcmp` no material original estava com os sinais de retorno invertidos (positivo/negativo trocados). Foi corrigido com base no comportamento padrão da função (confirmado também na bibliografia de referência da disciplina). Esta é a correção mais importante feita durante esta revisão — recomenda-se destacar esse ponto caso o aluno pergunte sobre `strcmp`.
- Demais conteúdos (declaração/representação de strings, `fgets`, `strlen`, `strcpy`, `strcat`) estavam corretos.

---

<!-- Material: Aula_14_Structs.md -->
## Aula 14 - Estruturas (Struct) e Definição de Tipos

- **Tópicos:** [struct, estrutura heterogênea, registro, membros, operador ponto, inicialização, inicializadores designados, vetor de structs, estruturas aninhadas, typedef]
- **Pré-requisitos:** ["Aula 03 - Variáveis", "Aula 11 - Vetores", "Aula 13 - Strings"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_14_Estruturas_e_Definicao_de_Tipo.md
- **Status:** verificado

### Objetivo
Apresentar estruturas heterogêneas (`struct`) para agrupar variáveis de tipos diferentes sob um único nome, as formas de inicializar, atribuir e aninhar estruturas, e o uso de `typedef` para criar nomes (apelidos) de tipos.

### Conceitos-chave

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

### Erros comuns e pontos de atenção
- Esquecer o `;` após o `}` da definição da struct (gera erros de compilação confusos na linha seguinte).
- Tentar comparar structs com `==` (`if (aluno1 == aluno2)`) — **não compila** em C; é preciso comparar membro a membro (e strings com `strcmp`).
- Tentar atribuir string a um membro vetor com `=` fora da inicialização (`aluno.nome = "Ana";`) — não funciona; usar `strcpy(aluno.nome, "Ana");`. (Note que na **inicialização** `= {"Ana", ...}` é permitido.)
- Confundir a ordem de acesso em vetor de structs: o correto é `cadastros[i].nome`, não `cadastros.nome[i]`.
- Achar que a definição `struct Aluno {...};` já cria uma variável — ela só define o tipo.
- Com `typedef struct {...} Aluno;`, escrever `struct Aluno x;` — com struct anônima isso não funciona; use apenas `Aluno x;`.

### Perguntas socráticas sugeridas
- "Se você precisa guardar nome, idade e altura de 30 alunos, quantos vetores separados precisaria sem struct? E com struct?"
- "Ao fazer `seu_aluno = meu_aluno;` e depois alterar `seu_aluno.idade`, o que acontece com `meu_aluno.idade`? Por quê?"
- "Como você acessaria o número da casa do terceiro cliente, se cada cliente tem um `struct Endereco` dentro?"
- "Que vantagem o `typedef` traz? Ele cria um tipo realmente novo ou só um novo nome?"

### Exercícios da aula
O PDF original desta aula não contém lista de exercícios.

### Notas de revisão
- Conteúdo dos slides tecnicamente correto. Nenhuma correção de conteúdo foi necessária.
- **Complementos adicionados**: a forma `= {0}` (portável para qualquer versão do C, ao lado do `= {}` do C23); o fato de membros não citados em inicializadores designados receberem 0; a observação de que a atribuição de struct copia vetores internos; e a seção de erros comuns (comparação com `==`, atribuição de string a membro).
- Testado com GCC 15 (MinGW): `struct Aluno aluno = {};` compila e zera os membros.

---

<!-- Material: Aula_15_Union_e_Enum.md -->
## Aula 15 - União (Union) e Enumeração (Enum)

- **Tópicos:** [union, união, memória compartilhada, enum, enumeração, constantes nomeadas, discriminador, typedef]
- **Pré-requisitos:** ["Aula 07 - Switch", "Aula 14 - Structs"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_15_Uniao_e_Enumeracao.md
- **Status:** verificado

### Objetivo
Apresentar `union` (membros de tipos diferentes compartilhando a mesma memória) e `enum` (conjunto de constantes inteiras nomeadas), e mostrar como combiná-los com `struct` e `typedef`.

### Conceitos-chave

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

### Erros comuns e pontos de atenção
- Achar que a union guarda todos os membros simultaneamente (como a struct) e ler um membro diferente do último escrito — o valor lido será a reinterpretação dos mesmos bytes, não o valor "antigo".
- Supor que o tamanho da union é a soma dos membros (é o do **maior**, mais eventual *padding*).
- Esquecer o `break` em cada `case` ao usar `enum` no `switch` (o slide original omite os `break` com `...` — vale lembrar o aluno da Aula 07).
- Achar que os valores de um `enum` começam em 1 — começam em **0**, salvo definição explícita.
- Ao usar `%d` para imprimir um enumerador, ver um número em vez do nome — o nome da constante não existe em tempo de execução.

### Perguntas socráticas sugeridas
- "Se uma union tem um `char` e um `double`, quantos bytes você espera que ela ocupe? E uma struct com os mesmos membros?"
- "Depois de `numero.inteiro = 15;`, o que você espera encontrar em `numero.real`? Por quê?"
- "No `enum E2 { V1=15, V2, V3=45, V4, V5=70 }`, qual é o valor de `V4`? Como você chegou nisso?"
- "No `Produto`, como o programa sabe se deve ler `volume` ou `peso`? O que aconteceria sem o campo `tipo`?"

### Exercícios da aula
O PDF original desta aula não contém lista de exercícios.

### Notas de revisão
- Conteúdo dos slides tecnicamente correto. Nenhuma correção de conteúdo foi necessária.
- **Complementos adicionados**: menção a *padding* no tamanho de struct/union; `break` explícito no exemplo de `switch` (o slide usa `...`); exemplo de uso do `Produto` com o discriminador (o slide só mostra a definição).
- Valores do enum `{ V1=15, V2, V3=45, V4, V5=70 }` conferidos por compilação (GCC 15): `15 16 45 46 70`.

---

<!-- Material: Aula_16_Funcoes.md -->
## Aula 16 - Funções

- **Tópicos:** [funções, modularização, chamada de função, parâmetros, retorno, void, protótipo, escopo, variáveis locais, variáveis globais, argc, argv, doxygen]
- **Pré-requisitos:** ["Aula 03 - Variáveis", "Aula 13 - Strings"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_16_Funcoes_Parte_1.md e Aula_16_Funcoes_Parte_2.md
- **Status:** verificado (com correção técnica sobre void)

### Objetivo
Apresentar funções como forma de dividir um programa em tarefas menores, sua sintaxe (tipo de retorno, nome, parâmetros), escopo de variáveis, a passagem de argumentos para a `main` via linha de comando e a documentação com Doxygen.

### Conceitos-chave

- **Função**: trecho de código, dentro de um programa maior, que realiza uma tarefa com certa independência. Divide uma tarefa grande (uma `main` enorme) em várias tarefas menores.

- **Por que usar**:
  - **Clareza**: cada função tem um propósito identificável.
  - **Reutilização**: o código é escrito uma vez e chamado várias vezes; correções ficam em um só lugar.
  - **Independência**: a função trabalha principalmente com os dados que recebe por parâmetro e com suas variáveis locais.

- **Sintaxe**:
  ```c
  tipo_retornado nomeFuncao(parametros) {
      /* corpo da função */
      return valor; // ou apenas return; em funções void
  }
  ```
  Toda função deve ser **declarada antes de ser usada**: ou definida acima de quem a chama, ou com um **protótipo** (ex.: `float soma(float n1, float n2);`) antes da `main` e a definição depois.

- **Chamada**: `nomeFuncao();` (sem parâmetro/retorno) ou `resultado = nomeFuncao(arg);`. Durante a chamada, a função chamadora (ex.: `main`) fica **suspensa** até a função chamada terminar; então continua de onde parou.
  ```c
  #include <stdio.h>

  void mensagem(void) {
      printf("exemplo de uma função simples!\n");
      return;
  }

  int main() {
      printf("Exemplo de chamada de função!\n");
      mensagem();
      return 0;
  }
  ```

- **Escopo**:
  - **Variáveis locais**: declaradas dentro de uma função (inclusive os **parâmetros**); só existem enquanto a função executa e só são visíveis nela.
  - **Variáveis globais**: declaradas fora de todas as funções; visíveis e modificáveis por qualquer função; existem durante toda a execução. Devem ser usadas com moderação, pois qualquer função pode alterá-las e isso dificulta encontrar erros.

- **Parâmetros e retorno**:
  ```c
  float soma(float n1, float n2) {
      return n1 + n2;
  }

  int main() {
      float valor = soma(3, 5);
      printf("A soma é %f\n", valor); // 8.000000
      return 0;
  }
  ```
  **Cabeçalho/assinatura**: tipo de retorno + nome + lista de parâmetros com seus tipos. Quando não há retorno, usa-se `void`; `void` na lista de parâmetros (`f(void)`) indica que a função não recebe argumentos.

- **Parâmetros para a `main` (linha de comando)**:
  ```c
  int main(int argc, char *argv[]) {   // equivalente: char **argv
      printf("Foram passados %d argumentos\n", argc);
      for (int i = 0; i < argc; i++) {
          printf("O argumento %d é %s\n", i, argv[i]);
      }
      return 0;
  }
  ```
  Executando `./main valor1 valor2 valor3`: `argc` vale **4**, pois `argv[0]` é sempre o nome do executável (`./main`), seguido de `valor1`, `valor2`, `valor3`. Todos os argumentos chegam como **strings** — para usar como número é preciso converter (ex.: `atoi(argv[1])`, de `stdlib.h`).

- **Documentação com Doxygen**: comentário especial antes da função.
  ```c
  /**
   * Soma dois números reais
   * \param n1 primeiro valor a ser somado
   * \param n2 segundo valor a ser somado
   * \return a soma dos dois valores reais
   */
  float soma(float n1, float n2) {
      return n1 + n2;
  }
  ```

### Erros comuns e pontos de atenção
- Chamar a função **antes** de declará-la (sem protótipo) — gera erro ou aviso de "declaração implícita" (erro a partir do C99 / GCC 14+).
- Esquecer de **usar** o valor retornado (`soma(3, 5);` sozinho calcula e descarta o resultado).
- Esquecer o `return` em uma função com tipo não-`void` — o valor recebido pela chamadora fica indefinido.
- Achar que uma variável local de uma função é visível em outra só porque tem o mesmo nome — são variáveis distintas.
- Esquecer que `argv[i]` é string: `argv[1] + 1` não soma 1 ao número digitado.
- Confundir *parâmetro* (variável na definição da função) com *argumento* (valor passado na chamada).

### Perguntas socráticas sugeridas
- "Se você precisa calcular a média de notas em três pontos diferentes do programa, o que acontece se encontrar um erro na fórmula e ela estiver copiada três vezes?"
- "Quando a `main` chama `mensagem()`, o que acontece com a execução da `main` enquanto `mensagem` roda?"
- "Uma variável `x` declarada dentro de `soma` pode ser usada dentro da `main`? Por quê?"
- "Se você executar `./main 10 20`, quanto vale `argc`? E o que tem em `argv[0]`?"

### Exercícios da aula
O PDF original desta aula não contém lista de exercícios.

### Notas de revisão
- **Correção técnica aplicada**: o slide afirma que "`void` não é um tipo, apenas indica ausência de um valor". Pelo padrão C, `void` **é** um tipo (um tipo incompleto, que não pode ter valores). O material revisado descreve `void` como o tipo usado para indicar ausência de retorno/parâmetros, sem afirmar que não é um tipo — a diferença importa, por exemplo, ao estudar `void*` na Aula 19.
- **Esclarecimento**: o slide diz que uma função "pode modificar variáveis globais, mas limitando-se aos dados fornecidos pela chamada" — a frase é ambígua (funções podem modificar qualquer global). Reescrito como "trabalha principalmente com os dados que recebe por parâmetro e com suas variáveis locais", com um alerta sobre globais.
- **Complementos adicionados**: protótipo de função, conversão de `argv` com `atoi`, e a seção de erros comuns.

---

<!-- Material: Aula_17_Passagem_de_Parametros.md -->
## Aula 17 - Funções: Passagem de Parâmetros

- **Tópicos:** [passagem por cópia, passagem por valor, passagem por referência, endereço, ponteiro, operador &, operador *, retorno de múltiplos valores, vetores como parâmetro, structs como parâmetro, operador seta]
- **Pré-requisitos:** ["Aula 05 - Entrada de Dados", "Aula 11 - Vetores", "Aula 14 - Structs", "Aula 16 - Funções"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_17_Passagem_de_Parametros.md
- **Status:** verificado (com correção de texto no slide de structs)

### Objetivo
Diferenciar passagem de parâmetros por cópia (valor) e por referência (endereço), mostrar como uma função pode alterar variáveis da chamadora e "devolver" vários resultados, e como vetores e structs são passados para funções.

### Conceitos-chave

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

### Erros comuns e pontos de atenção
- Escrever `*valor++` em vez de `(*valor)++` — pela precedência, `*valor++` incrementa o **ponteiro** (não o conteúdo).
- Esquecer o `&` na chamada (`incrementa(valor)` quando a função espera `int*`) — o compilador avisa/erra por tipo incompatível.
- Usar `.` em um ponteiro para struct (`p.x` com `Ponto *p`) ou `->` em uma struct comum.
- Achar que uma struct passada por parâmetro será alterada na `main` sem usar ponteiro.
- Usar `sizeof(vetor)` dentro da função para descobrir o tamanho do vetor — lá dentro ele é um ponteiro, e o resultado é o tamanho do ponteiro.

### Perguntas socráticas sugeridas
- "Na versão por cópia, a variável `valor` da `main` e a da função `incrementa` ocupam o mesmo lugar na memória?"
- "Por que você acha que o `scanf` precisa do `&` e o `printf` não?"
- "Se `return` devolve só um valor, como uma função poderia 'devolver' o dobro e o triplo de um número ao mesmo tempo?"
- "Se um vetor é passado sem `&`, por que as alterações feitas na função aparecem na `main`?"
- "Qual a diferença entre `p->x` e `(*p).x`? E entre `(*p).x` e `*p.x`?"

### Exercícios da aula
O PDF original desta aula não contém lista de exercícios.

### Notas de revisão
- **Correção de texto aplicada**: no slide "Passagem de Estruturas (structs)", a frase "qualquer alteração realizada dentro da função não é realizada no **vetor/matriz** original" foi corrigida para "na **struct** original" (erro de cópia do slide anterior, sobre vetores).
- **Nota conceitual**: tecnicamente, a linguagem C só possui passagem **por valor**; a "passagem por referência" é feita passando **por valor** um endereço (ponteiro). O material mantém a terminologia "por referência" usada em aula, mas a IA pode esclarecer essa nuance se o aluno comparar com linguagens como C++ (que têm referências `&` de verdade).
- **Correção de digitação**: "Por ser passado" → "Pode ser passado" (slide de vetor de estruturas).
- **Complementos adicionados**: saída `(2, 3)` do exemplo do `Ponto` (conferida por compilação), alerta sobre `*valor++` e sobre `sizeof` de vetor recebido por parâmetro.

---

<!-- Material: Aula_18_Recursividade.md -->
## Aula 18 - Recursividade

- **Tópicos:** [recursividade, recursão, caso base, chamada recursiva, pilha de chamadas, empilhamento, desempilhamento, recursão com retorno, recursão de cauda, iterativo x recursivo]
- **Pré-requisitos:** ["Aula 10 - Repetição For", "Aula 16 - Funções"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_18_Recursividade.md
- **Status:** verificado (com correção técnica sobre recursão de cauda)

### Objetivo
Apresentar funções recursivas (funções que chamam a si mesmas), suas duas partes obrigatórias (caso base e chamada recursiva), como a pilha de chamadas funciona na ida e na volta, e as vantagens e desvantagens em relação a soluções iterativas.

### Conceitos-chave

- **Recursividade**: processo definido a partir de si próprio. Analogia do slide — *como esvaziar um vaso com N flores?* Retirar uma flor e esvaziar um vaso com N−1 flores. Um vaso com 0 flores já está vazio: esse é o **caso base**.
  ```
  Para esvaziar um vaso com N flores:
      SE o vaso está vazio: nada a fazer            (caso base)
      SENÃO: retirar uma flor e
             esvaziar um vaso com N-1 flores        (chamada recursiva)
  ```

- **Função recursiva**: dentro do seu corpo existe uma chamada para ela mesma. Toda função recursiva precisa de:
  - **Caso base**: condição em que a função **para** (não faz nova chamada) — garante o término.
  - **Chamada recursiva**: a função chama a si mesma com parâmetros que se **aproximam** do caso base.

- **Iterativo x recursivo** — exibir números de N até 1:
  ```c
  // Iterativo
  void exibeNumeros(int valor) {
      for (int i = valor; i >= 1; i--) {
          printf("Valor de i: %d\n", i);
      }
  }

  // Recursivo: "exibir o 5 e depois exibir de 4 até 1", e assim por diante
  void exibeNumeros(int valor) {
      if (valor <= 1) {                 // caso base
          printf("Valor: %d\n", valor);
      } else {                          // caso recursivo
          printf("Valor: %d\n", valor);
          exibeNumeros(valor - 1);      // chamada recursiva
      }
  }
  ```

- **Pilha de chamadas (empilhamento e desempilhamento)**: cada chamada fica "pendente" na pilha até a chamada seguinte terminar. O código **antes** da chamada recursiva executa na **ida**; o código **depois** executa na **volta**, em ordem inversa.
  ```c
  void recursao(int a) {
      if (a > 0) {
          printf("%i ", a);   // executa na ida:  4 3 2 1
          recursao(a - 1);
          printf("%i ", a);   // executa na volta: 1 2 3 4
      } else {                // caso base
          printf("\n");
      }
  }

  int main() {
      recursao(4);
      return 0;
  }
  ```
  Saída:
  ```
  4 3 2 1
  1 2 3 4
  ```

- **Recursão com retorno**: na ida as chamadas são empilhadas; na volta cada uma recebe o valor da chamada seguinte e o usa para compor o resultado.
  ```c
  int somaNumeros(int valor) {
      if (valor == 1) {          // caso base
          return 1;
      } else {                   // caso recursivo
          return valor + somaNumeros(valor - 1);
      }
  }
  ```
  Rastreamento de `somaNumeros(6)`:
  ```
  ida (empilha):    6 + soma(5) → 5 + soma(4) → 4 + soma(3) → 3 + soma(2) → 2 + soma(1)
  caso base:        soma(1) = 1
  volta (desempilha): soma(2)=2+1=3 → soma(3)=3+3=6 → soma(4)=4+6=10
                      → soma(5)=5+10=15 → soma(6)=6+15=21
  ```

- **Recursão de cauda**: quando a chamada recursiva é a **última operação** da função (nada mais é feito com o resultado), o compilador pode otimizá-la para reutilizar o mesmo espaço na pilha. Observe que `somaNumeros` **não** é de cauda: depois que a chamada retorna, ainda é preciso somar `valor + ...`. Uma versão de cauda usa um acumulador:
  ```c
  int somaCauda(int valor, int acumulado) {
      if (valor == 0) return acumulado;
      return somaCauda(valor - 1, acumulado + valor); // última operação
  }
  // uso: somaCauda(6, 0) → 21
  ```

- **Vantagens**: solução pode ser mais elegante e curta; expõe com clareza a estrutura do problema; elimina o controle manual de variáveis de laço; especialmente útil quando o problema se divide naturalmente em subproblemas menores do mesmo tipo.
- **Desvantagens**: tende a usar mais memória (cada chamada ocupa espaço na pilha); pode ser mais lenta; pode ser mais difícil de depurar; recursão muito profunda pode estourar a pilha (*stack overflow*).

### Erros comuns e pontos de atenção
- **Esquecer o caso base** ou escrever um caso base que nunca é atingido — a função chama a si mesma indefinidamente até estourar a pilha (o programa trava/encerra com erro).
- Chamada recursiva que **não se aproxima** do caso base (ex.: `recursao(a)` em vez de `recursao(a - 1)`).
- Casos base frágeis: `somaNumeros(0)` ou `somaNumeros(-3)` nunca atingem `valor == 1` e entram em recursão infinita. Um caso base mais robusto seria `if (valor <= 1)` (ou `valor <= 0` retornando 0).
- Esquecer o `return` antes da chamada recursiva em funções com retorno (`valor + somaNumeros(valor - 1);` sem `return`).
- Esperar que o código depois da chamada recursiva execute antes das chamadas mais internas.

### Perguntas socráticas sugeridas
- "Em `recursao(4)`, por que os números aparecem primeiro em ordem decrescente e depois em ordem crescente?"
- "O que aconteceria se você chamasse `somaNumeros(0)`? Qual chamada atingiria o caso base?"
- "Quantas chamadas de `somaNumeros` estão 'abertas' na pilha no momento em que `soma(1)` é executada?"
- "Depois que `somaNumeros(valor - 1)` retorna, ainda resta alguma coisa a fazer? O que isso diz sobre ela ser de cauda ou não?"
- "Para este problema, a versão com `for` ou a recursiva usa mais memória? Por quê?"

### Exercícios da aula
O PDF original desta aula não contém lista de exercícios.

### Notas de revisão
- **Correção técnica aplicada**: o slide de "Recursão com retorno" traz, logo abaixo da função `somaNumeros`, a nota sobre **recursão de cauda**, o que pode levar o aluno a achar que `somaNumeros` é de cauda. Ela **não é** (após a chamada ainda há a soma `valor + ...`). O material revisado deixa isso explícito e inclui um exemplo de versão de cauda com acumulador. Também corrigida a frase truncada "ela usa pode ser otimizada".
- **Ponto de atenção adicionado**: o caso base `valor == 1` de `somaNumeros` não trata entradas `<= 0` (recursão infinita).
- Saídas conferidas por compilação (GCC 15): `recursao(4)` imprime `4 3 2 1` / `1 2 3 4`; `somaNumeros(6)` retorna `21`.
- Pequena diferença do slide: no caso base o slide imprime `"\n "` (com espaço) em um dos diagramas e `"\n"` no código; o material usa `"\n"`.

---

<!-- Material: Aula_19_Ponteiros.md -->
## Aula 19 - Ponteiros

- **Tópicos:** [ponteiros, endereço de memória, NULL, referenciação, operador &, dereferenciação, operador *, %p, aritmética de ponteiros, comparação de ponteiros, ponteiro genérico, void*, ponteiros e vetores, ponteiro para ponteiro]
- **Pré-requisitos:** ["Aula 11 - Vetores", "Aula 17 - Passagem de Parâmetros"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_19_Ponteiros.md
- **Status:** verificado (com correções técnicas importantes em void* e endereços hexadecimais)

### Objetivo
Apresentar ponteiros (variáveis que armazenam endereços de memória), os operadores `&` e `*`, as operações permitidas (atribuição, aritmética, comparação), o ponteiro genérico `void*`, a relação entre ponteiros e vetores e ponteiros para ponteiros.

### Conceitos-chave

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

### Erros comuns e pontos de atenção
- **Usar ponteiro não inicializado** (`int *p; *p = 5;`) — escreve em endereço aleatório: travamento ou corrupção de memória.
- **Dereferenciar `NULL`** — encerra o programa (falha de segmentação).
- Confundir o `*` da **declaração** (`int *p;` — "p é ponteiro") com o `*` da **expressão** (`*p` — "conteúdo apontado por p").
- Confundir `p = &x;` (p passa a apontar para x) com `*p = x;` (copia o valor de x para onde p aponta).
- Achar que `ptr + 1` avança 1 byte em um `int*` (avança `sizeof(int)` bytes).
- Achar que vetor **é** um ponteiro: ele é **convertido** em ponteiro na maioria das expressões, mas `sizeof(vetor)` dá o tamanho do vetor inteiro e não se pode fazer `vetor = outroPonteiro;`.
- Fazer aritmética em `void*` esperando que funcione em qualquer compilador.
- Comparar com `<`/`>` ponteiros de variáveis **não relacionadas** (o padrão só define essa comparação dentro de um mesmo vetor/objeto; na prática compiladores comuns comparam os endereços numericamente — relevante para o Exercício 1).

### Perguntas socráticas sugeridas
- "Se `p` aponta para `x`, o que muda em `x` quando você faz `*p = 20`? E quando faz `p = &y`?"
- "Se um `int*` guarda o endereço 1500, que endereço ele guardará depois de `p++`? E se fosse um `char*`?"
- "Por que `vetor[i]` e `*(vetor + i)` dão o mesmo resultado?"
- "Duas variáveis com o mesmo valor 10 têm o mesmo endereço? O que `ptr1 == ptr2` está comparando?"
- "Por que você acha que o compilador precisa saber o tipo apontado para fazer `ptr + 1`? O que isso diz sobre `void*`?"

### Exercícios da aula
1. Criar duas variáveis inteiras; comparar os endereços e exibir o endereço e o conteúdo da que tem o **maior** endereço.
2. Criar um vetor `float` de 10 posições e imprimir o endereço de cada posição.
3. Criar uma matriz 3x3 de `float` e imprimir o endereço de cada posição.
4. Criar um vetor de 5 inteiros; usando **aritmética de ponteiros**, ler os valores do teclado e exibi-los multiplicados por 2; em seguida, exibir o endereço das posições que contêm valores pares.
5. Elaborar uma função que receba duas strings e verifique se a segunda está contida na primeira, usando **apenas aritmética de ponteiros**.
6. Dada a declaração `int a, *b, **c, ***d;`, ler o valor de `a` e exibir: o dobro de `a` usando `b`; o triplo usando `c`; o quádruplo usando `d`.

### Notas de revisão
- **Correção técnica aplicada (ponteiro genérico)**: o exemplo do slide `void *ptr = 0x5DC; ptr++;` tem dois problemas: (1) atribuir um inteiro a ponteiro **sem cast** — no **GCC 15 (compilador usado pela turma) isso é erro de compilação** (`-Wint-conversion`), conferido nesta revisão; (2) aritmética em `void*` é **extensão do GCC**, não padrão C. O material revisado explica o conceito sem reproduzir o exemplo que não compila e indica `char*` como alternativa portável.
- **Correção técnica aplicada (aritmética com endereços literais)**: o slide usa `int *ptr = (int*) 0x5DC;` e imprime o ponteiro com `%d`. Atribuir endereço arbitrário e imprimir ponteiro com `%d` não são práticas válidas (o `%d` com ponteiro é comportamento indefinido). O material revisado mostra a mesma ideia com um vetor real e "supondo" o endereço inicial 1500. Os valores 1504 / 1564 / 1556 do slide estão corretos (conferidos por compilação).
- **Correção nos diagramas de memória**: os slides de vetor e de ponteiro para ponteiro numeram os endereços como `0xF060, 0xF064, 0xF068, 0xF072, 0xF076`. Em **hexadecimal**, 0xF068 + 4 = **0xF06C** (e depois 0xF070, 0xF074) — a sequência do slide soma como se fosse decimal. Caso o aluno pergunte sobre isso, a IA deve confirmar que a sequência correta é `0xF060, 0xF064, 0xF068, 0xF06C, 0xF070`.
- **Precisão conceitual**: o slide diz que "vetor é um ponteiro para a primeira posição"; o material revisado diz que o nome do vetor é **convertido** em ponteiro para o primeiro elemento (diferença visível em `sizeof` e na impossibilidade de atribuir ao vetor).
- **Precisão conceitual**: "NULL é uma constante que aponta para um endereço inexistente" — reescrito como "ponteiro nulo: não aponta para nenhum objeto válido".
- Erros de digitação do slide corrigidos: "conerter" → "converter"; "Elabora" → "Elaborar".

---

<!-- Material: Aula_20_Alocacao_Dinamica.md -->
## Aula 20 - Alocação Dinâmica

- **Tópicos:** [alocação dinâmica, stack, pilha, heap, malloc, calloc, realloc, free, sizeof, NULL, size_t, vazamento de memória, matriz dinâmica, struct dinâmica, stdlib.h]
- **Pré-requisitos:** ["Aula 14 - Structs", "Aula 18 - Recursividade", "Aula 19 - Ponteiros"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_20_Alocacao_Dinamica.md
- **Status:** verificado (com correções técnicas importantes em calloc e realloc)

### Objetivo
Explicar como o programa usa a memória (pilha e heap), e como alocar, redimensionar e liberar memória em tempo de execução com `malloc`, `calloc`, `realloc` e `free` — incluindo vetores, matrizes e structs.

### Conceitos-chave

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

### Erros comuns e pontos de atenção
- **Não verificar `NULL`** após `malloc`/`calloc`/`realloc`.
- **Esquecer o `sizeof`**: `malloc(50)` aloca 50 **bytes**, não 50 inteiros.
- **Vazamento de memória**: esquecer o `free`, ou perder o único ponteiro para um bloco (ex.: `p = malloc(...)` duas vezes seguidas sem liberar o primeiro).
- **`p = realloc(p, ...)`**: se o `realloc` falhar, `p` vira `NULL` e o bloco original fica inacessível (vazamento). Use um ponteiro temporário, como no exemplo acima.
- **Ler posições novas após `realloc` aumentar** (ou memória de `malloc`) sem inicializar — os valores são lixo.
- **Usar memória após `free`** (*use after free*) ou chamar `free` duas vezes no mesmo ponteiro (*double free*).
- **Liberar a matriz na ordem errada** (`free(matriz)` antes das linhas) — perde-se o acesso às linhas, que vazam.
- Chamar `free` em ponteiro que **não** veio de `malloc`/`calloc`/`realloc` (ex.: endereço de variável local).
- Imprimir `sizeof` com `%d`/`%ld` em vez de `%zu` (pode gerar aviso ou valor errado em algumas plataformas).

### Perguntas socráticas sugeridas
- "Se você não sabe, ao escrever o programa, quantos alunos o usuário vai cadastrar, por que um vetor `int notas[100]` pode ser um problema?"
- "Quantos bytes `malloc(10 * sizeof(int))` reserva? E `malloc(10)`?"
- "Que diferença você espera ver ao imprimir um vetor recém-criado com `malloc` e outro com `calloc`?"
- "Se o `realloc` falhar e você tiver escrito `p = realloc(p, ...)`, o que acontece com os dados antigos?"
- "Por que, na matriz dinâmica, as linhas precisam ser liberadas antes do vetor de ponteiros?"
- "Uma variável local da função some quando a função termina. O que acontece com a memória alocada com `malloc` dentro dessa função?"

### Exercícios da aula
1. Ler do usuário o tamanho de um vetor, alocá-lo dinamicamente, ler seus valores e imprimi-lo.
2. Função que recebe um inteiro positivo N e retorna o ponteiro para um vetor de N posições alocado dinamicamente; se N ≤ 0, retornar `NULL`.
3. Função que recebe dois vetores (A e B) por referência e o tamanho N, e retorna o ponteiro para um vetor C alocado dinamicamente com `C[i] = A[i] * B[i]`.
4. Função que recebe L e C e retorna o ponteiro para uma matriz L×C alocada dinamicamente, inicializada com 0 em todas as posições (dica: `calloc` já zera a memória).

Obs. do professor: ao final de cada programa, liberar toda a memória alocada dinamicamente.

### Notas de revisão
- **Correção técnica aplicada (`calloc`)**: o slide diz que `calloc` "faz o mesmo que a função `malloc()`", mudando apenas a forma de passar os parâmetros. Falta a diferença mais importante: **`calloc` inicializa a memória com zeros**; `malloc` não inicializa. Isso é relevante, por exemplo, no Exercício 4.
- **Correção técnica aplicada (`realloc`)**: o exemplo do slide aumenta o vetor de 3 para 10 posições e imprime as 10 — as posições 3 a 9 **não foram inicializadas** e conteriam lixo (comportamento indefinido ao ler). Além disso, o padrão `p = realloc(p, ...)` sem ponteiro temporário causa vazamento se o `realloc` falhar, e o exemplo não chama `free(p)` ao final. O material revisado corrige os três pontos.
- **Correção dos protótipos**: o slide usa `unsigned int` nos protótipos de `malloc`, `calloc` e `realloc`; o tipo real é `size_t`.
- **Correção do formato de `sizeof`**: o slide imprime `sizeof` com `%ld`; o especificador correto é `%zu` (o `%ld` gera aviso no GCC/MinGW, onde `long` tem 4 bytes e `size_t` tem 8). Valores conferidos por compilação: `int` = 4, `Ponto` = 8.
- **Precisão**: a "tabela de alocação interna" citada no slide é um detalhe de implementação da biblioteca; o material diz apenas que o sistema de alocação guarda o tamanho de cada bloco. A afirmação de que memória não liberada é "automaticamente liberada ao final da execução" vale para sistemas operacionais comuns; o material acrescenta o conceito de vazamento de memória.
- **Complementos adicionados**: `p = NULL` após `free`, lista de erros comuns (use after free, double free, ordem de liberação) e acesso `matriz[l][c]`.

---

<!-- Material: Aula_21_Arquivos.md -->
## Aula 21 - Arquivos (Parte 1)

- **Tópicos:** [arquivos, arquivo texto, arquivo binário, FILE, fopen, fclose, modos de abertura, caminho absoluto, caminho relativo, buffer, fputc, fgetc, EOF, fputs, fgets, stdin, stdout, stderr, exit]
- **Pré-requisitos:** ["Aula 13 - Strings", "Aula 19 - Ponteiros"]
- **Transcrição relacionada:** Transcrição-Verificadas/Aula_21_Arquivos_Modo_Texto.md
- **Status:** verificado (com correção técnica em fgets e reconstrução de slide corrompido)

### Objetivo
Introduzir a manipulação de arquivos em C: tipos de arquivo (texto e binário), abertura e fechamento (`fopen`/`fclose`), modos de abertura, o papel do buffer e a leitura/escrita de caracteres (`fgetc`/`fputc`) e de strings (`fgets`/`fputs`).

### Conceitos-chave

- **Arquivo**: coleção de dados em armazenamento **secundário** (fora da RAM): disco rígido/SSD, pen-drive. Vantagens: guardar grande quantidade de dados, **persistência** (os dados continuam depois que o programa termina), acesso não sequencial e compartilhamento dos dados entre programas.

- **Arquivo texto x binário**:
  | | Texto | Binário |
  |---|---|---|
  | Conteúdo | Caracteres legíveis (abre no Bloco de Notas) | Bytes como estão na memória (ilegível em editor de texto) |
  | Exemplo: `int` com 8 dígitos | 8 caracteres = 8 bytes (64 bits) | 4 bytes (32 bits) |
  | Exemplos | `.txt`, `.csv`, código-fonte | executáveis, arquivos compactados, arquivos de registros |

  Ex.: gravar `"Rosinosberta"`, `32` e `1.75` em modo texto produz `Rosinosberta 32 1.750000`; em modo binário, o nome aparece legível, mas o `int` e o `float` aparecem como símbolos estranhos.

- **Biblioteca**: as funções de arquivo estão em `<stdio.h>`. Elas apenas abrem/fecham e leem/escrevem caracteres ou bytes — cabe ao programador decidir **como** interpretar o conteúdo.

- **Ponteiro de arquivo**: todas as funções trabalham com um `FILE*`:
  ```c
  FILE *fp;
  ```

- **Abrir (`fopen`)**:
  ```c
  FILE *fopen(const char *nome_arquivo, const char *modo);
  ```
  Retorna `NULL` se a abertura falhar (arquivo inexistente no modo `"r"`, sem permissão, caminho inválido...).

- **Caminhos**:
  - **Absoluto** (a partir da raiz): Windows `"C:\\Projetos\\dados.txt"` (barra invertida precisa ser escapada `\\` dentro de string C; `"C:/Projetos/dados.txt"` também funciona no Windows); Linux `"/home/usuario/dados.txt"`.
  - **Relativo** (a partir do diretório corrente): `"arq.txt"`, `"diretorio/dados.txt"`, `"../dados.txt"`.
  - Atenção: o diretório corrente **nem sempre** é a pasta onde está o executável (depende de onde/como o programa foi executado, ex.: pela IDE).

- **Modos de abertura**:
  | Modo | Tipo | Função |
  |---|---|---|
  | `"r"` | Texto | Leitura. O arquivo deve existir. |
  | `"w"` | Texto | Escrita. Cria o arquivo se não existir; **apaga** o conteúdo anterior se existir. |
  | `"a"` | Texto | Escrita no **fim** do arquivo (*append*). Cria o arquivo se não existir. |
  | `"rb"`, `"wb"`, `"ab"` | Binário | Iguais aos anteriores, em modo binário. |
  | `"r+"` | Texto | Leitura e escrita. O arquivo deve existir. |
  | `"w+"` | Texto | Leitura e escrita. Cria se não existir; apaga o anterior se existir. |
  | `"a+"` | Texto | Leitura e escrita; toda escrita vai para o fim do arquivo. Cria se não existir. |
  | `"r+b"`, `"w+b"`, `"a+b"` | Binário | Iguais aos anteriores, em modo binário. |

- **Padrão de abertura com verificação**:
  ```c
  FILE *arq;
  arq = fopen("dados.txt", "w");
  if (arq == NULL) {
      printf("Erro ao abrir o arquivo!\n");
      exit(1); // 1 indica erro; exit() está em <stdlib.h> e encerra o programa de qualquer ponto
  }
  /* ... usa o arquivo ... */
  fclose(arq);
  ```

- **Fechar (`fclose`)**: `int fclose(FILE *arq);` — retorna 0 em caso de sucesso (e `EOF` em caso de erro). Ao fechar, os dados que ainda estavam no **buffer** são gravados no arquivo. Sempre feche os arquivos que abriu.

- **Buffer**: região de memória que guarda dados temporariamente enquanto são transferidos (ex.: RAM → disco). Acessar o disco a cada caractere seria muito lento; por isso os dados se acumulam no buffer e são gravados em blocos — quando o buffer enche ou quando o arquivo é fechado. Consequência: se o programa terminar de forma anormal sem `fclose`, dados podem não ser gravados.

- **Caracteres — `fputc` / `fgetc`**:
  ```c
  int fputc(int ch, FILE *arq);   // escreve um caractere
  int fgetc(FILE *arq);           // lê um caractere e avança a posição de leitura; retorna EOF no fim
  ```
  `fgetc` retorna `int` (e não `char`) justamente para conseguir representar `EOF`, que é diferente de qualquer caractere válido.
  ```c
  // Escrita caractere a caractere
  FILE *arq = fopen("arquivo.txt", "w");
  if (arq == NULL) { printf("Erro na abertura do arquivo"); exit(1); }
  char texto[100] = "Texto que sera escrito no arquivo";
  for (int i = 0; texto[i] != '\0'; i++) {
      fputc(texto[i], arq);
  }
  fclose(arq);

  // Leitura caractere a caractere até o fim do arquivo
  arq = fopen("arquivo.txt", "r");
  if (arq == NULL) { printf("Erro na abertura do arquivo"); exit(1); }
  int c;
  while ((c = fgetc(arq)) != EOF) {
      printf("%c", c);
  }
  fclose(arq);
  ```

- **Arquivos pré-definidos**: `stdin` (entrada padrão, geralmente o teclado), `stdout` (saída padrão, geralmente a tela), `stderr` (saída de erros, geralmente a tela). Podem ser usados com as mesmas funções: `fputc(c, stdout);`, `c = fgetc(stdin);`.

- **Strings — `fputs` / `fgets`**:
  ```c
  int   fputs(const char *str, FILE *arq);           // retorna EOF em caso de erro
  char *fgets(char *str, int tamanho, FILE *arq);
  ```
  `fgets` lê **no máximo `tamanho - 1` caracteres** (reserva 1 posição para o `'\0'`), parando antes se encontrar uma quebra de linha — que é **mantida** na string — ou o fim do arquivo. Retorna `str` em caso de sucesso, ou `NULL` se nada pôde ser lido (fim do arquivo ou erro).
  ```c
  // Escrita
  FILE *arq = fopen("arquivo.txt", "w");
  if (arq == NULL) { printf("Erro na abertura do arquivo\n"); exit(1); }
  if (fputs("Texto que sera escrito via fputs", arq) == EOF) {
      printf("Erro na gravação\n");
  }
  fclose(arq);

  // Leitura
  char texto[100];
  arq = fopen("arquivo.txt", "r");
  if (arq == NULL) { printf("Erro na abertura do arquivo\n"); exit(1); }
  if (fgets(texto, 100, arq) == NULL) {
      printf("Erro na leitura\n");
  } else {
      printf("%s\n", texto);
  }
  fclose(arq);
  ```
  Com `stdout`/`stdin`: `fputs(string, stdout);` e `fgets(nome, 30, stdin);` (a mesma leitura segura de strings vista na Aula 13).

- **Ler um arquivo linha a linha** (útil para os exercícios):
  ```c
  char linha[256];
  while (fgets(linha, sizeof(linha), arq) != NULL) {
      /* processa a linha */
  }
  ```

### Erros comuns e pontos de atenção
- **Não verificar se `fopen` retornou `NULL`** — usar o ponteiro nulo em `fgetc`/`fputs` derruba o programa.
- Abrir com `"w"` um arquivo que se queria apenas acrescentar — **todo o conteúdo anterior é apagado**; para acrescentar, use `"a"`.
- Esquecer `fclose` — dados podem ficar no buffer e não ser gravados; além disso há um limite de arquivos abertos simultaneamente.
- Guardar o retorno de `fgetc` em `char` em vez de `int` — a comparação com `EOF` pode falhar (laço infinito ou fim prematuro).
- Escrever caminhos do Windows com uma barra invertida só (`"C:\dados.txt"`) — `\d` é interpretado como sequência de escape.
- Esperar que `fgets` remova o `'\n'` — ele é mantido (remova com `linha[strcspn(linha, "\n")] = '\0';`, como na Aula 13).
- Procurar o arquivo na pasta errada: com caminho relativo, o arquivo é buscado no diretório **corrente**, que pode não ser a pasta do código-fonte.

### Perguntas socráticas sugeridas
- "Se você abrir um arquivo com `\"w\"` e ele já tiver dados, o que acontece com eles? Que modo você usaria para não perdê-los?"
- "Por que você acha que `fgetc` retorna `int` e não `char`?"
- "Seu programa gravou dados mas o arquivo ficou vazio. Que linha pode estar faltando?"
- "O número 12345678 ocupa quantos bytes em um arquivo texto? E em binário?"
- "Para contar quantas linhas um arquivo tem (Exercício 1), que caractere você procuraria ao ler com `fgetc`?"

### Exercícios da aula
1. Ler o nome de um arquivo texto e mostrar quantas linhas ele possui.
2. Ler os nomes de dois arquivos texto e criar um terceiro com o conteúdo do primeiro seguido do conteúdo do segundo.
3. Converter o conteúdo de um arquivo texto para maiúsculas; ler o nome do arquivo de origem e do arquivo de destino.
4. Calcular e exibir o número de palavras de um arquivo texto informado pelo usuário.
5. Calcular e exibir quantas vezes cada letra ocorre em um arquivo texto (ignorando letras acentuadas).
6. Ler o nome de um arquivo texto e uma palavra; informar quantas vezes a palavra aparece no arquivo.

### Notas de revisão
- **Correção técnica aplicada (`fgets`)**: o slide descreve o parâmetro `tamanho` como "número máximo de caracteres a serem lidos". O correto é que `fgets` lê **no máximo `tamanho - 1`** caracteres, usando a última posição para o `'\0'`, e para ao encontrar `'\n'` (que é mantido na string). O material revisado também acrescenta que `fgets` retorna `NULL` tanto no fim do arquivo quanto em erro.
- **Slide corrompido reconstruído**: no PDF, o slide "Abrindo um arquivo" (exemplo de abertura para escrita) tem duas linhas de código sobrepostas e ilegíveis (`FIFLIEL*E *faorpqe=n(...)`). Pelo contexto, o código pretendido é `FILE *arq; arq = fopen("dados.txt", "w");` — reconstruído assim no material revisado.
- **Complemento na tabela de modos**: o slide não diz que os modos `"a"`/`"ab"` **criam** o arquivo se ele não existir — acrescentado.
- **Pequenos ajustes nos exemplos**: comentários `}//for` que fechavam `while`/`if` no slide foram removidos; o laço `for (i < strlen(texto))` foi trocado por `texto[i] != '\0'` (evita recalcular `strlen` a cada volta e dispensa `string.h`); protótipos com `const`, como no padrão.
- Esta é a **Parte 1** do assunto; o slide lista também leitura/escrita de **blocos de bytes** e de **strings formatadas** (`fread`/`fwrite`, `fprintf`/`fscanf`), que não são cobertas neste PDF — presumivelmente ficam para a Parte 2.
- Videoaula desta aula: "Arquivos - Modo Texto" (https://www.youtube.com/watch?v=3SJ6MWo1NDc); transcrição verificada em `Transcrição-Verificadas/Aula_21_Arquivos_Modo_Texto.md`.
