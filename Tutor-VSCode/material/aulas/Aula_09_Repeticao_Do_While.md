---
titulo: "Aula 09 - Estrutura de Repetição Do While e Modificadores de Fluxo"
numero_aula: 9
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [do while, break, continue, goto, modificadores de fluxo]
pre_requisitos: ["Aula 08 - Estrutura de Repetição While"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 09 - Repetição Do While.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_09_Estrutura_de_Repeticao_Do_While.md"
revisado_em: 2026-10-11
status: verificado (com correção de exemplo)
---

# Aula 09 - Estrutura de Repetição Do While e Modificadores de Fluxo

## Objetivo
Apresentar o laço `do...while` (que garante ao menos uma execução do bloco) e os comandos `break`, `continue` e `goto` para alterar o fluxo de um laço.

## Conceitos-chave

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

## Erros comuns e pontos de atenção
- Esquecer o `;` depois de `while (condicao)` no `do...while` — erro de sintaxe comum, já que o `while` solto (sem `do`) não usa `;` no final.
- Confundir `break` com `continue`: `break` **sai** do laço; `continue` **pula para a próxima iteração**, sem sair do laço.
- Usar `goto` para resolver um problema que um `break`/`continue` resolveria de forma mais legível.
- No `continue`, esquecer de atualizar a variável de controle **antes** do `continue` (como no exemplo acima, `i++;` antes do `continue;`) — se a atualização ficar só no final do laço e for pulada pelo `continue`, o laço pode nunca terminar.

## Perguntas socráticas sugeridas
- "Em que situação você usaria `do...while` em vez de `while`? Pense em um caso onde o bloco *precisa* rodar ao menos uma vez."
- "Qual a diferença entre o que acontece quando o programa executa `break` e quando executa `continue`, dentro do mesmo laço?"
- "Por que, na maioria dos casos, é preferível evitar `goto` e usar estruturas como `while`, `break` e `continue`?"

## Exercícios da aula
1. Calcular a média de 2 notas (reais) para 5 alunos, validando que cada nota esteja no intervalo [0, 10] (solicitando novamente se estiver fora).
2. Receber valores enquanto estiverem no intervalo de 500 a 1000; ao receber um valor fora da faixa, parar, exibir quantos valores válidos foram digitados e finalizar.

## Notas de revisão
- **Correção**: os exemplos de saída de `break` e `continue` no slide original mostravam a sequência sem o número `0` inicial ("1 2 3 4 Saiu do laço" e "1 2 3 4 6 7 8 9 Saiu do laço"). Ao simular o código passo a passo, a saída correta começa em `0` (já que `i` começa em 0 e é impresso antes do teste `i == 5`): "0 1 2 3 4 Saiu do laço" e "0 1 2 3 4 6 7 8 9 Saiu do laço". Essa correção foi aplicada acima.
