---
titulo: "Aula 18 - Recursividade"
numero_aula: 18
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [recursividade, recursão, caso base, chamada recursiva, pilha de chamadas, empilhamento, desempilhamento, recursão com retorno, recursão de cauda, iterativo x recursivo]
pre_requisitos: ["Aula 10 - Repetição For", "Aula 16 - Funções"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 18 - Recursividade.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_18_Recursividade.md"
revisado_em: 2026-10-21
status: verificado (com correção técnica sobre recursão de cauda)
---

# Aula 18 - Recursividade

## Objetivo
Apresentar funções recursivas (funções que chamam a si mesmas), suas duas partes obrigatórias (caso base e chamada recursiva), como a pilha de chamadas funciona na ida e na volta, e as vantagens e desvantagens em relação a soluções iterativas.

## Conceitos-chave

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

## Erros comuns e pontos de atenção
- **Esquecer o caso base** ou escrever um caso base que nunca é atingido — a função chama a si mesma indefinidamente até estourar a pilha (o programa trava/encerra com erro).
- Chamada recursiva que **não se aproxima** do caso base (ex.: `recursao(a)` em vez de `recursao(a - 1)`).
- Casos base frágeis: `somaNumeros(0)` ou `somaNumeros(-3)` nunca atingem `valor == 1` e entram em recursão infinita. Um caso base mais robusto seria `if (valor <= 1)` (ou `valor <= 0` retornando 0).
- Esquecer o `return` antes da chamada recursiva em funções com retorno (`valor + somaNumeros(valor - 1);` sem `return`).
- Esperar que o código depois da chamada recursiva execute antes das chamadas mais internas.

## Perguntas socráticas sugeridas
- "Em `recursao(4)`, por que os números aparecem primeiro em ordem decrescente e depois em ordem crescente?"
- "O que aconteceria se você chamasse `somaNumeros(0)`? Qual chamada atingiria o caso base?"
- "Quantas chamadas de `somaNumeros` estão 'abertas' na pilha no momento em que `soma(1)` é executada?"
- "Depois que `somaNumeros(valor - 1)` retorna, ainda resta alguma coisa a fazer? O que isso diz sobre ela ser de cauda ou não?"
- "Para este problema, a versão com `for` ou a recursiva usa mais memória? Por quê?"

## Exercícios da aula
O PDF original desta aula não contém lista de exercícios.

## Notas de revisão
- **Correção técnica aplicada**: o slide de "Recursão com retorno" traz, logo abaixo da função `somaNumeros`, a nota sobre **recursão de cauda**, o que pode levar o aluno a achar que `somaNumeros` é de cauda. Ela **não é** (após a chamada ainda há a soma `valor + ...`). O material revisado deixa isso explícito e inclui um exemplo de versão de cauda com acumulador. Também corrigida a frase truncada "ela usa pode ser otimizada".
- **Ponto de atenção adicionado**: o caso base `valor == 1` de `somaNumeros` não trata entradas `<= 0` (recursão infinita).
- Saídas conferidas por compilação (GCC 15): `recursao(4)` imprime `4 3 2 1` / `1 2 3 4`; `somaNumeros(6)` retorna `21`.
- Pequena diferença do slide: no caso base o slide imprime `"\n "` (com espaço) em um dos diagramas e `"\n"` no código; o material usa `"\n"`.
