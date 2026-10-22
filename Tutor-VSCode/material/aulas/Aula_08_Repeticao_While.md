---
titulo: "Aula 08 - Estrutura de Repetição While"
numero_aula: 8
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [while, laco de repeticao, variavel contadora, variavel acumuladora, loop infinito]
pre_requisitos: ["Aula 06 - Estrutura de Seleção if / else"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 08 - Repetição While.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_08_Estrutura_de_Repeticao_While.md"
revisado_em: 2026-10-11
status: verificado
---

# Aula 08 - Estrutura de Repetição While

## Objetivo
Apresentar o laço `while`, que repete um bloco de instruções enquanto uma condição for verdadeira, e os padrões de variável contadora e variável acumuladora.

## Conceitos-chave

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

## Erros comuns e pontos de atenção
- **Esquecer de atualizar a variável de controle** dentro do laço (ex.: esquecer o `i++;`) — causa loop infinito.
- **Não inicializar** a variável contadora/acumuladora antes do laço — o valor inicial "indefinido" (lixo de memória) invalida o resultado.
- Ao ler caracteres repetidamente dentro de um `while` com `scanf("%c", ...)`, o mesmo problema de **buffer do teclado** descrito na Aula 05 pode ocorrer — o slide original usa `setbuf(stdin, NULL);` dentro do laço para tentar contornar isso; vale a mesma observação de que esse uso de `setbuf` é comportamento não garantido pelo padrão C (ver Aula 05 para a explicação completa e alternativas).
- Confundir a condição de **parada** com a condição de **continuação** — `while (i <= 5)` continua enquanto a condição for verdadeira; é fácil inverter a lógica por engano (ex.: usar `>=` quando o certo seria `<=`).

## Perguntas socráticas sugeridas
- "O que precisa ser verdadeiro para esse `while` nunca terminar? Isso pode acontecer no seu código?"
- "Se a variável `contapar` não for inicializada em 0 antes do laço, o resultado final pode estar certo por acaso? Por quê não dá para confiar nisso?"
- "No exemplo que soma os números pares, o que aconteceria se você colocasse `i++;` *antes* do `if`, em vez de depois?"

## Exercícios da aula
1. Exibir todos os números de 1 a 100 (e depois de 100 a 1).
2. Exibir os múltiplos de 3 entre 1 e 322.
3. Exibir os números pares entre 240 e 730 (inclusive).
4. Receber e calcular o quadrado de 10 números, um de cada vez.
5. Receber números e calcular seus quadrados até que o usuário digite um número negativo ou zero.
6. Calcular o fatorial de um número digitado.
7. Menu com 3 opções (dois testes e sair), repetindo o menu até a opção "sair" ser escolhida; tratar opção inválida com mensagem de erro.
8. Jogo de adivinhação: o computador escolhe um número de 1 a 100 (dica: `rand()` da biblioteca `stdlib.h`), e o usuário tem até 6 tentativas, recebendo dicas de "muito alto"/"muito baixo".

## Notas de revisão
- Conteúdo técnico correto. Foi referenciada (sem repetir todo o conteúdo) a observação já registrada na Aula 05 sobre `setbuf(stdin, NULL)` não ser comportamento garantido pelo padrão C, já que o mesmo padrão de código aparece aqui dentro de um laço.
