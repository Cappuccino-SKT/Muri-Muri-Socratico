---
titulo: "Aula 06 - Estrutura de Seleção if / else"
numero_aula: 6
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [if, else, operadores relacionais, operadores logicos, if aninhado, operador ternario]
pre_requisitos: ["Aula 04 - Operadores Aritméticos", "Aula 05 - Entrada de Dados"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 06 - Selecao if else.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_06_Estrutura_de_Selecao_if_else.md"
revisado_em: 2026-10-11
status: verificado
---

# Aula 06 - Estrutura de Seleção if / else

## Objetivo
Apresentar a estrutura condicional `if`/`else`, os operadores relacionais e lógicos usados nas condições, estruturas aninhadas e o operador ternário.

## Conceitos-chave

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

## Exemplo de código
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

## Erros comuns e pontos de atenção
- **Usar `=` em vez de `==`** dentro de uma condição (ex.: `if (nota = 6)`). Isso é um erro clássico em C: `nota = 6` é uma **atribuição válida** que faz `nota` valer 6, e o `if` avalia o resultado da atribuição (6, que é "verdadeiro" por ser diferente de zero) — o programa compila, mas o comportamento é totalmente diferente do pretendido.
- Esquecer que **todos os caminhos possíveis** devem ser tratados — uma solução que só cobre alguns casos pode compilar e "parecer certa" nos testes simples, mas falhar em casos de borda.
- Em condições compostas, esquecer parênteses ao combinar `&&` e `||`, o que pode alterar a ordem de avaliação pretendida.
- Comparar números de ponto flutuante (`float`/`double`) com `==` — devido a imprecisões de representação binária, comparações de igualdade exata com `float`/`double` podem falhar mesmo quando os valores "deveriam" ser iguais matematicamente.

## Perguntas socráticas sugeridas
- "O que aconteceria se, por engano, você escrever `if (nota = 6)` em vez de `if (nota == 6)`? O código compila? O que ele faz?"
- "Quando você precisa verificar três ou mais caminhos diferentes (não apenas dois), como você estruturaria os `if`/`else`?"
- "Nesta condição, `idade >= 12 && idade < 18`, o que acontece se só uma das duas partes for verdadeira?"

## Exercícios da aula
1. Receber a nota de um aluno e exibir "aprovado" (nota ≥ 6) ou "reprovado" (nota < 6).
2. Receber um número e determinar se é par ou ímpar (usar o operador `%`).
3. Receber os coeficientes `a`, `b`, `c` de uma equação de 2º grau e calcular as raízes (fórmula de Bhaskara).
4. Calcular o imposto de renda de um salário, usando uma tabela de alíquotas progressivas e parcela de dedução.

## Notas de revisão
- Conteúdo técnico correto e consistente com a linguagem C padrão.
- Adicionado como ponto de atenção o erro clássico `=` vs `==`, que não estava mencionado explicitamente no slide original, mas é um dos erros mais comuns e didaticamente relevante para um tutor socrático apontar através de perguntas (sem entregar a resposta direta).
