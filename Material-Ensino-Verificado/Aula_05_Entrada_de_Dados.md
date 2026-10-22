---
titulo: "Aula 05 - Entrada de Dados"
numero_aula: 5
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [scanf, entrada de dados, operador endereco, buffer de teclado, setbuf]
pre_requisitos: ["Aula 03 - Variáveis", "Aula 04 - Operadores Aritméticos"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 05 - Entrada de Dados.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_05_Entrada_de_Dados.md"
revisado_em: 2026-10-11
status: verificado (com observação de boas práticas)
---

# Aula 05 - Entrada de Dados

## Objetivo
Apresentar a função `scanf` para ler dados digitados pelo usuário, o papel do operador `&` (endereço de memória), leitura de múltiplos valores, e o problema clássico do "buffer do teclado" ao misturar leitura de números e caracteres.

## Conceitos-chave

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

## Observação importante sobre `setbuf(stdin, NULL)`
O slide original resolve o problema do buffer com `setbuf(stdin, NULL);` após o `scanf` do número. Isso funciona na prática em compiladores comuns no Windows (ex.: MinGW), mas **não é um comportamento garantido pelo padrão C** — `setbuf`/`fflush` em um stream de entrada (`stdin`) é oficialmente *comportamento indefinido* pelo padrão da linguagem, mesmo que funcione na prática em alguns ambientes.

Alternativas mais portáveis para "limpar" o `\n` deixado no buffer antes de ler um caractere:
- Usar `scanf(" %c", &letra);` — o **espaço antes do `%c`** instrui o `scanf` a pular quaisquer espaços em branco (incluindo `\n`) antes de ler o caractere.
- Ler e descartar manualmente os caracteres restantes com um laço usando `getchar()` até encontrar `\n` ou EOF.

Para fins da disciplina, ambas as abordagens (a do slide e a alternativa com espaço antes de `%c`) podem ser apresentadas ao aluno; o importante é que ele entenda **por que** o problema ocorre (o `\n` fica no buffer).

## Exemplo de código
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

## Erros comuns e pontos de atenção
- Esquecer o `&` antes da variável no `scanf` (ex.: `scanf("%i", idade);` em vez de `scanf("%i", &idade);`) — erro muito comum e que costuma causar comportamento imprevisível ou travamento.
- Usar `%f` para ler uma variável `double` no `scanf` — o especificador correto para `double` em `scanf` é `%lf` (diferente do `printf`, onde `%f` funciona tanto para `float` quanto para `double` por promoção automática de argumento).
- Não considerar o problema do buffer ao misturar `scanf("%d", ...)` com `scanf("%c", ...)` em sequência.

## Perguntas socráticas sugeridas
- "O que o `scanf` precisa saber para colocar o valor digitado dentro da variável certa? Por que passamos `&idade` e não só `idade`?"
- "Se você ler um número com `scanf(\"%d\", &numero)` e, na linha seguinte, ler um caractere com `scanf(\"%c\", &letra)`, o que pode ter ficado 'esperando' no buffer depois do número?"
- "Qual a diferença entre `%f` e `%lf` quando usados no `scanf` para ler uma variável `double`?"

## Exercícios da aula
1. Receber a altura de uma pessoa e calcular o peso ideal (`peso_ideal = 72.7 * altura - 58`).
2. Calcular a idade de uma pessoa a partir do ano de nascimento e do ano atual (ambos digitados pelo usuário).
3. Calcular comissão (10% sobre vendas) e salário bruto (salário base R$1.200,00 + comissão) a partir do total vendido por um funcionário.
4. Calcular a média aritmética de 4 números reais digitados, exibindo com 2 casas decimais.
5. Calcular a raiz quadrada de um número digitado, usando `sqrt` (biblioteca `math.h`) — usar `double` para os valores.

## Notas de revisão
- Correção/complemento: o slide original apresenta `setbuf(stdin, NULL)` como solução definitiva para o problema do buffer. Foi adicionada a observação de que esse uso é comportamento indefinido pelo padrão C (ainda que funcione na prática em compiladores comuns usados na disciplina), junto com uma alternativa mais portável (`scanf(" %c", ...)`), para que a IA possa explicar a limitação caso o aluno pergunte ou tenha problemas em outro ambiente (ex.: Linux/gcc).
