---
titulo: "Aula 16 - Funções"
numero_aula: 16
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [funções, modularização, chamada de função, parâmetros, retorno, void, protótipo, escopo, variáveis locais, variáveis globais, argc, argv, doxygen]
pre_requisitos: ["Aula 03 - Variáveis", "Aula 13 - Strings"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 16 - Funções.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_16_Funcoes_Parte_1.md e Aula_16_Funcoes_Parte_2.md"
revisado_em: 2026-10-21
status: verificado (com correção técnica sobre void)
---

# Aula 16 - Funções

## Objetivo
Apresentar funções como forma de dividir um programa em tarefas menores, sua sintaxe (tipo de retorno, nome, parâmetros), escopo de variáveis, a passagem de argumentos para a `main` via linha de comando e a documentação com Doxygen.

## Conceitos-chave

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

## Erros comuns e pontos de atenção
- Chamar a função **antes** de declará-la (sem protótipo) — gera erro ou aviso de "declaração implícita" (erro a partir do C99 / GCC 14+).
- Esquecer de **usar** o valor retornado (`soma(3, 5);` sozinho calcula e descarta o resultado).
- Esquecer o `return` em uma função com tipo não-`void` — o valor recebido pela chamadora fica indefinido.
- Achar que uma variável local de uma função é visível em outra só porque tem o mesmo nome — são variáveis distintas.
- Esquecer que `argv[i]` é string: `argv[1] + 1` não soma 1 ao número digitado.
- Confundir *parâmetro* (variável na definição da função) com *argumento* (valor passado na chamada).

## Perguntas socráticas sugeridas
- "Se você precisa calcular a média de notas em três pontos diferentes do programa, o que acontece se encontrar um erro na fórmula e ela estiver copiada três vezes?"
- "Quando a `main` chama `mensagem()`, o que acontece com a execução da `main` enquanto `mensagem` roda?"
- "Uma variável `x` declarada dentro de `soma` pode ser usada dentro da `main`? Por quê?"
- "Se você executar `./main 10 20`, quanto vale `argc`? E o que tem em `argv[0]`?"

## Exercícios da aula
O PDF original desta aula não contém lista de exercícios.

## Notas de revisão
- **Correção técnica aplicada**: o slide afirma que "`void` não é um tipo, apenas indica ausência de um valor". Pelo padrão C, `void` **é** um tipo (um tipo incompleto, que não pode ter valores). O material revisado descreve `void` como o tipo usado para indicar ausência de retorno/parâmetros, sem afirmar que não é um tipo — a diferença importa, por exemplo, ao estudar `void*` na Aula 19.
- **Esclarecimento**: o slide diz que uma função "pode modificar variáveis globais, mas limitando-se aos dados fornecidos pela chamada" — a frase é ambígua (funções podem modificar qualquer global). Reescrito como "trabalha principalmente com os dados que recebe por parâmetro e com suas variáveis locais", com um alerta sobre globais.
- **Complementos adicionados**: protótipo de função, conversão de `argv` com `atoi`, e a seção de erros comuns.
