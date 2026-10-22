---
titulo: "Aula 04 - Operadores Aritméticos"
numero_aula: 4
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [operadores aritmeticos, precedencia de operadores, divisao inteira, casting, incremento, decremento]
pre_requisitos: ["Aula 03 - Variáveis"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 04 - Operadores Aritméticos.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_04_Operadores_Aritmeticos.md"
revisado_em: 2026-10-11
status: verificado
---

# Aula 04 - Operadores Aritméticos

## Objetivo
Apresentar os operadores aritméticos da linguagem C, a regra de precedência entre eles, e o comportamento da divisão entre inteiros e ponto flutuante (conversão implícita e *casting*).

## Conceitos-chave

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

## Exemplo resolvido de precedência
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

## Exemplo de código
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

## Erros comuns e pontos de atenção
- **Divisão inteira inesperada**: calcular `media = soma / quantidade;` quando `soma` e `quantidade` são `int` dá um resultado truncado mesmo que `media` seja `float`. É um dos erros mais comuns em listas de exercícios com médias/percentuais.
- Confundir pré-incremento (`++c`) com pós-incremento (`c++`) ao usá-los dentro de uma expressão maior (ex.: `m = c++;` vs `m = ++c;` dão resultados diferentes para `m`).
- Usar `%` (módulo) com `float`/`double` — o operador `%` em C só é definido para operandos inteiros.
- Esquecer o `#include <math.h>` ao usar funções como `pow` ou `sqrt`.

## Perguntas socráticas sugeridas
- "Se `a` e `b` são `int` e você calcula `a / b`, o resultado pode ter casas decimais? Por quê?"
- "Qual a diferença entre `m = c++;` e `m = ++c;` se `c` vale 5 antes da linha?"
- "Como você forçaria uma divisão `a / b` a considerar as casas decimais, mesmo com `a` e `b` sendo `int`?"

## Exercícios da aula
1. Calcular litros de combustível gastos em uma viagem (consumo de 12 km/litro, tempo 35 min, velocidade média 80 km/h).
2. Calcular o valor de uma caderneta de poupança (depósito inicial R$500,00, juros de 1% ao mês) após 3 meses.
3. Com `A = 40` e `B = -1`, calcular e imprimir `A+B`, `A-B`, `A*B`, `A/B`; depois incrementar `B` em 1 e repetir as 4 operações.
4. Calcular peso ideal a partir de uma altura constante, usando a fórmula `peso_ideal = 72.7 * altura - 58`.

## Notas de revisão
- Conteúdo técnico verificado e correto, incluindo a tabela de precedência e o exemplo numérico (7.5 / 22.0 ≈ 0.341 confere).
- Reforçada explicitamente a armadilha da divisão inteira, citada apenas de forma indireta no slide original ("Para pensar"), pois é um dos erros mais frequentes de alunos iniciantes.
