# Histórico de versões

## 0.5.0
- 64 casos de teste oficiais para 41 exercícios da lista, revisados com o professor. Eles entram sozinhos quando o aluno escolhe o exercício.
- Correção: ao trocar de arquivo, um salvamento pendente do painel podia apagar os casos de teste e o vínculo do exercício do arquivo novo.
- Correção: o registro dos exercícios e do progresso não se perde mais com gravações seguidas.
- Correção: o enunciado do exercício 6 da Aula 19 tinha perdido os asteriscos de `int a, *b, **c, ***d;`.

## 0.4.1
- Casos de teste conferem os valores, e não o texto exato: cada linha esperada precisa aparecer na ordem, maiúsculas e acentos são ignorados e números conferem pelo valor ("8.5" aceita "8.50").
- A entrada dos testes é enviada uma linha por vez, como se fosse digitada. Antes, um programa correto que usava `setbuf(stdin, NULL)` era reprovado.

## 0.4.0
- Lista com os 71 exercícios das aulas: o aluno escolhe e a extensão cria o arquivo com o enunciado e o esqueleto.
- Dicas offline (sem IA) enquanto o aluno digita: `=` em vez de `==`, `;` depois do `if`/`for`, `i <= tamanho` em vetor, strings comparadas com `==`, divisão inteira e outras.
- Mensagens do GCC traduzidas para o português, com link para a videoaula da aula certa.
- "Sua previsão" nos casos de teste (teste de mesa).
- Painel Progresso por aula e contador de ajudas pedidas.
- Comandos `/explicar`, `/quiz` e `/depurar` no chat.

## 0.3.0
- Casos de teste no painel: compila, executa e compara a saída; detecta laço infinito e programa que trava.
- Comando `/teste` para pedir uma pista sobre um caso que falhou.

## 0.2.0
- Painel Exercício na barra lateral para informar o enunciado.
- Botão "Verificar meu código" ao lado do botão de executar e comando `/verificar`.
- Modo aprendizado: sem sugestões automáticas de código nos arquivos C.

## 0.1.0
- Primeira versão: chat `@tutor` com regras socráticas, material das 21 aulas, índice das videoaulas e verificação com o GCC ao salvar.
