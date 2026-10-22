---
titulo: "Aula 07 - Estrutura de Seleção - Switch"
numero_aula: 7
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [switch, case, break, default, selecao multipla]
pre_requisitos: ["Aula 06 - Estrutura de Seleção if / else"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 07 - Switch.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_07_Estrutura_de_Selecao_Switch.md"
revisado_em: 2026-10-11
status: verificado
---

# Aula 07 - Estrutura de Seleção - Switch

## Objetivo
Apresentar o `switch` como alternativa ao encadeamento de vários `if`/`else` quando é preciso escolher entre várias alternativas baseadas no valor de uma única variável.

## Conceitos-chave

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

## Exemplo de código
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

## Erros comuns e pontos de atenção
- **Esquecer o `break`** em um `case`: a execução "cai" (fall-through) para o próximo `case`, executando instruções que não deveriam rodar para aquele valor. Esse é o erro mais comum e característico do `switch` em C.
- Tentar usar `switch` com uma variável `float`/`double` — não compila.
- Tentar usar uma expressão/intervalo em um `case` (ex.: `case nota >= 6:`) — o `case` em C só aceita **valores constantes exatos**, não condições ou intervalos (para intervalos, usar `if`/`else`).
- Esquecer o `default` quando é importante tratar valores inesperados digitados pelo usuário.

## Perguntas socráticas sugeridas
- "O que aconteceria se você removesse o `break` do `case 'a'`? O programa pararia de compilar, ou o comportamento mudaria em tempo de execução?"
- "Por que você não pode escrever `case idade >= 18:` dentro de um `switch(idade)`?"
- "Em que situação um `switch` deixa o código mais claro do que vários `if`/`else` encadeados?"

## Exercícios da aula
1. Menu com 2 opções: verificar par/ímpar de um número, ou verificar maioridade a partir de uma idade.
2. Calculadora simples usando `switch` para escolher entre `+`, `-`, `*`, `/`.
3. Mesma calculadora, mas lendo os 2 números e o operador em um único `scanf` (ex.: entrada `5+8`).

## Notas de revisão
- Conteúdo técnico correto; nenhuma correção necessária. O ponto do "fall-through" ao esquecer o `break` já estava bem explicado no slide original e foi mantido/reforçado na seção de erros comuns.
