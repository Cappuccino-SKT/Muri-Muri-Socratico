# Histórico de versões

## 1.0.0
- **O "save" do projeto do jogo, `projeto-do-jogo.md`**: o plano e as etapas saíram da memória do VS Code e foram para um arquivo Markdown na pasta do jogo. Assim eles vão junto com o código para outro computador e não se perdem quando o perfil do laboratório é apagado. Projetos da versão 0.9 migram sozinhos.
- O arquivo também guarda **onde o aluno parou**, as **decisões** dele, os **problemas em aberto** e o **histórico**. O tutor lê tudo em cada pergunta do projeto e atualiza o arquivo no fim das respostas, com um bloco escondido.
- **Mapa do código** no arquivo, gerado sem IA a partir dos `.c` e `.h` da pasta: os arquivos, os `#include` entre eles (com um gráfico Mermaid), structs, enums e funções. É refeito ao salvar um arquivo.
- No painel: **📌 Onde você parou**, **💾 Salvar onde parei** (novo `/salvar`) e **📄 Abrir o diário**. O aluno pode editar o arquivo à mão; o painel acompanha.
- Uma resposta do tutor agora pode trazer mais de um bloco escondido (por exemplo, pontos para marcar e o diário).
- Correções do teste com o Copilot: na verificação do jogo, os pontos voltaram a ser marcados no código (o tutor escrevia o nome do arquivo antes da linha) e problemas de outros arquivos, como o Makefile, aparecem à parte, sem desencontrar a numeração; a raylib não instalada é tratada como instalação, e não como erro do código; erros no que já está escrito contam mesmo que sejam de etapas futuras; a marcação não sai da linha quando o arquivo todo é trocado (formatador, recarregar do disco); o título do painel mostra "Meu jogo" ou "Exercício"; no jogo, a sugestão "Qual vídeo assistir?" virou "Salvar onde parei"; o item da raylib no "Tudo pronto?" só aparece nos arquivos do jogo.
- Saída "Tutor Socrático: depuração" com os blocos escondidos de cada resposta.

## 0.9.0
- **Projeto final de Fundamentos 2 (jogo com a raylib 6.2):** material novo em 6 partes (instalar e compilar, desenho e texto, teclado e mouse, movimento e colisões, imagens e sons, organização do jogo), com as funções conferidas no `raylib.h` oficial. O material só entra quando o arquivo usa a raylib ou a pergunta fala dela.
- O tutor pode mostrar como usar a biblioteca; a lógica do jogo continua com perguntas e pistas.
- **▶ Compilar e rodar o jogo** (painel, menu do editor e paleta de comandos): compila ligando a raylib, junta os outros `.c` da pasta sem `main`, roda o jogo na pasta do arquivo e explica os erros mais comuns.
- Arquivos com raylib: o GCC explica "raylib.h não encontrado", os casos de teste ficam escondidos e o **🩺 Tudo pronto?** confere se a raylib está instalada.
- Novas configurações `tutorSocratico.argumentosGcc` e `tutorSocratico.bibliotecasRaylib` (bloqueadas em pasta não confiável).
- Guia: passo 8, **Instalar e usar a raylib**.
- **🎮 Meu jogo**: nos arquivos do jogo, o painel troca a caixa do exercício pelo **plano do jogo**, escrito pelo aluno e guardado por pasta. O tutor usa o plano como base de toda ajuda. **🧭 Montar as etapas** (`/plano`) divide o plano em etapas, que viram uma lista para marcar no painel; **➡️ Me ajude com a próxima etapa** (`/passo`) guia a etapa atual. Para começar antes de usar a raylib: **🎮 Começar o projeto do jogo nesta pasta**.
- Todos os botões do painel agora têm cor de fundo, como o **Verificar meu código**: antes, os secundários e os de link se confundiam com o texto em vários temas.
- **Compilação manual e Makefile** (requisito do projeto): parte 7 do material, com as etapas da compilação, as opções do GCC e um Makefile modelo testado no PowerShell e no bash. O tutor explica e revisa o Makefile da pasta; adaptá-lo ao projeto fica com o aluno.
- Aviso no Makefile para linha de comando com espaços em vez de TAB ("missing separator"), com a lâmpada que troca por TAB. **🛠 Compilar com o Makefile** roda o `make` (`mingw32-make` no Windows) num terminal na pasta do projeto. Nova configuração `tutorSocratico.comandoMake`.

## 0.8.0
- **Computadores da universidade:** a extensão agora funciona em pasta em modo restrito (antes, o VS Code a desligava inteira). Nesse modo, o chat, o painel e as dicas funcionam; para compilar e testar, o painel mostra o botão **Confiar nesta pasta**.
- Nova seção **🩺 Tudo pronto?** no painel: confere recursos de IA, conta do Copilot, permissão para o tutor usar a IA, pasta e GCC, com o botão que resolve cada pendência. Um aviso vermelho no topo do painel aparece quando algo impede o tutor de usar a IA, e um aviso aparece ao abrir o VS Code.
- Permissão de uso da IA: o pedido do VS Code agora explica por que o tutor precisa dela. Se ela foi recusada, o chat explica e mostra o botão **Liberar a IA**, que abre a lista onde ela é liberada.
- **Guia de primeiros passos** dentro do VS Code: criar a conta no GitHub, ativar o Copilot Free, dar a permissão, escolher o modelo, confiar na pasta, conferir o GCC e usar o tutor.
- **Qualidade do código:** o tutor também revisa indentação, nomes das variáveis, comentários, o cabeçalho Doxygen (`\file`, `\brief`, `\author`, `\date`, como na Aula 16) e o enunciado em comentário logo abaixo dele. Esses pontos vêm depois dos que impedem o programa de funcionar.
- Dicas offline de qualidade (cabeçalho, enunciado em comentário e indentação) e o comando **Inserir cabeçalho Doxygen e o enunciado**, também na lâmpada 💡 e no painel.
- Em qualidade do código, o tutor dá a resposta direta (não socrática) e ensina os atalhos. Na lógica do programa, continua só com perguntas e pistas.
- Nova **✨ Verificar a qualidade do código** (botão no painel, menu do editor e `/qualidade` no chat): avalia só a qualidade e dá uma nota de 0 a 1000, por uma rubrica de 5 critérios (cabeçalho e enunciado, indentação, nomes, comentários e organização). Os pontos de melhoria ficam marcados no editor, um de cada vez. O **✅ Feito, próximo** só avança, sem usar a IA; no fim, uma conferência só diz o que ficou certo e o que falta e atualiza a nota. A resposta mostra a nota, a tabela por critério e a evolução; o painel mostra a última nota.
- Atalhos: **Ctrl+Alt+H** insere o cabeçalho com o enunciado do painel; os snippets `doxy` e `doxyf` (+ Tab) inserem o cabeçalho e o comentário Doxygen de função no estilo da Aula 16.
- O enunciado no comentário abaixo do cabeçalho é reconhecido; o cabeçalho e um comentário curto, como o nome, não contam como enunciado.

## 0.7.0
- Os pontos que o tutor encontra ao verificar o código ficam marcados no editor, um de cada vez, do mais fácil para o mais difícil. Na linha aparecem uma seta, um destaque e a pergunta do tutor; em cima dela, os botões **✅ Já corrigi, conferir**, **💡 Pista** e **✖ Esconder**. Ao conferir, o tutor confirma o que foi resolvido e marca o próximo ponto. Novo comando `/proximo` no chat.
- O painel mostra o ponto atual, com os botões **Ir para a linha** e **Já corrigi**.
- Respostas do tutor mais fáceis de ler: parágrafos curtos, linha e conceito em negrito, código entre crases e a pergunta final em uma linha separada.

## 0.6.0
- Painel mais limpo. Na tela principal ficam só o enunciado e o botão **🎓 Verificar meu código**. Os testes, as outras ajudas e as opções ficam em seções que o aluno abre, e o painel lembra quais seções estavam abertas.
- O aluno informa o exercício colando o enunciado. Saíram a lista de exercícios prontos, o painel Progresso e a opção "Não é exercício".
- O enunciado colado é reconhecido entre os exercícios das aulas, e os casos de teste do professor entram sozinhos.
- Sem enunciado, o tutor descobre o exercício pelo comentário do início do arquivo ou pelo próprio código, e confirma com o aluno.

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
