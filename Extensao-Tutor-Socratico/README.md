# Muri-Muri Socratico

Tutor socrático para a disciplina **Fundamentos de Programação em C**. Ele ajuda você a resolver os exercícios **fazendo perguntas e dando pistas, sem entregar a resposta**, explica os erros do compilador em português, testa seu programa e indica **qual videoaula assistir** para cada dúvida.

## Requisitos
- **GCC** instalado (no Windows, MinGW-w64), para verificar e testar os programas.
- **GitHub Copilot** ativo no VS Code para as funções com IA (chat `@tutor`). O plano gratuito serve; estudantes podem ter o Copilot completo pelo GitHub Student Developer Pack. **As dicas offline e os casos de teste funcionam sem Copilot.**

## Primeiros passos (e computadores da universidade)
Nunca usou o GitHub? O **guia de primeiros passos** ensina do zero: criar a conta, ativar o Copilot Free, dar a permissão para o tutor usar a IA, escolher o modelo, confiar na pasta e conferir o GCC. Ele abre dentro do VS Code (painel do tutor → **📘 Guia passo a passo**) e também pode ser lido [aqui](guia/README.md).

No painel, a seção **🩺 Tudo pronto?** mostra o que falta neste computador, com o botão que resolve cada item. Se algo impede o tutor de usar a IA, aparece um **aviso vermelho** no topo do painel. Os casos mais comuns:
- **Permissão recusada:** quando o VS Code pergunta se o *Muri-Muri Socratico* pode usar a IA, é preciso clicar em **Permitir**. Se alguém clicou em "Não permitir", o botão **Liberar a IA** abre a lista onde ela é liberada (marque *Muri-Muri Socratico* e confirme). Essa permissão é uma proteção do VS Code: o tutor não consegue pulá-la, só levar você até ela.
- **Copilot sem conta:** botão **Entrar com o GitHub**. No laboratório, saia da conta ao terminar.
- **Pasta em modo restrito:** o tutor conversa e dá dicas, mas só compila e testa depois de você confiar na pasta dos seus exercícios.

## Como usar

Clique no ícone 🎓 **Tutor Socrático** na barra lateral. Na tela principal ficam só:
- a caixa **Exercício**, onde você cola o enunciado;
- o botão **🎓 Verificar meu código**;
- o botão **✨ Verificar a qualidade do código**, com a última nota.

O resto fica em seções que você abre quando precisar: **🧪 Testar meu programa**, **💬 Mais ajuda do tutor** e **⚙️ Opções**.

### 1. Informe o exercício (opcional)
- Cole o enunciado na caixa **Exercício**. Se for um exercício das aulas, a extensão o reconhece (🔎 *Reconhecido: Aula 11 – Vetores, exercício 4*) e já coloca os casos de teste do professor, quando houver.
- **Sem enunciado**, o tutor descobre o exercício sozinho: usa o comentário do início do arquivo, se você colou o enunciado ali, ou deduz pelo seu código (textos dos `printf`, o que é lido com `scanf`, vetores, structs...). Na primeira resposta ele diz o que entendeu e pergunta se é isso mesmo.
- Ao abrir um `.c` pela primeira vez, a extensão sugere colar o enunciado. Você pode responder **Agora não** ou **Não perguntar mais**.

### 2. Coloque o cabeçalho e o enunciado no arquivo
Na disciplina, todo arquivo começa com um **cabeçalho Doxygen**, no estilo da Aula 16, e logo abaixo dele um comentário com o **enunciado**:
```c
/**
 * \file media.c
 * \brief Lê as notas de um aluno e mostra a média.
 * \author Maria Silva
 * \date 30/10/2026
 */

/*
 * Enunciado:
 * Faça um programa que leia 5 notas e mostre a média.
 */
```
Clique em **📝 Colocar o cabeçalho Doxygen e o enunciado no arquivo**, no painel, ou aperte **Ctrl+Alt+H**. A extensão pergunta seu nome uma vez, usa o enunciado do painel e seleciona o `\brief` para você escrever o que o programa faz.

Atalhos para deixar o código organizado:

| O que fazer | Atalho |
|---|---|
| Cabeçalho Doxygen com o enunciado do painel | **Ctrl+Alt+H** |
| Cabeçalho Doxygen (modelo para preencher) | digite `doxy` e aperte **Tab** |
| Comentário Doxygen de uma função | na linha acima da função, digite `doxyf` e aperte **Tab** |
| Arrumar a indentação do arquivo todo | **Shift+Alt+F** (precisa da extensão C/C++) |
| Recuar ou desfazer o recuo das linhas selecionadas | **Tab** / **Shift+Tab** |
| Renomear uma variável em todos os lugares | clique no nome e aperte **F2** |
| Comentar ou descomentar as linhas selecionadas | **Ctrl+;** (ou **Ctrl+/**, dependendo do teclado) |

Em **qualidade do código**, o tutor dá a resposta direta (mostra o cabeçalho pronto, sugere nomes melhores, mostra o trecho indentado) e ensina o atalho para você fazer sozinho da próxima vez. Na **lógica** do programa, ele continua só com perguntas e pistas.

### 3. Programe com dicas em tempo real (sem IA)
Enquanto você digita, aparecem dicas 🎓 (sublinhado azul) sobre erros clássicos de iniciantes:
- `=` em vez de `==` em uma condição;
- `;` logo depois do `if (...)` ou do `for (...)`;
- `0 < x < 10` (não funciona como na matemática);
- laço `i <= tamanho` percorrendo um vetor;
- strings comparadas com `==`;
- divisão inteira guardada em `float`;
- uso de `gets`.

Dicas de **qualidade do código** (fonte "Tutor Socrático · qualidade" na aba Problemas):
- falta o cabeçalho Doxygen, ele está com campos para preencher ou falta o enunciado em comentário;
- linha dentro de um bloco `{ }` que não foi indentada.

As dicas fazem uma pergunta em vez de dar a correção. Ao salvar, os erros do GCC ganham uma **explicação em português** (💬). Na lâmpada 💡, há **Pedir uma pista ao Tutor Socrático** e **📺 Assistir à videoaula** da aula sobre o assunto.

Por padrão, nos arquivos C, **o Copilot não sugere código automaticamente** (modo aprendizado). Para mudar, clique em **🎓 Modo aprendizado** na barra de status.

### 4. Teste seu programa
Abra **🧪 Testar meu programa**, clique em **+ Caso de teste** e preencha:
- **Entrada**: o que você digitaria (ex.: `7 8 9 10 6`);
- **Saída esperada**: o que deveria aparecer (ex.: `Media: 8.00`);
- **🔮 Sua previsão** (opcional): o que você acha que o seu programa vai mostrar. É o "teste de mesa", e a extensão diz se você acertou.

Clique em **▶ Rodar testes**: ✅ passou, ❌ saída diferente, ⏱️ não terminou em 3 segundos (laço infinito) ou 💥 travou. O caso passa se a saída esperada aparecer na saída do programa (mensagens como "Digite a nota:" não atrapalham, e números não são cortados: "Soma: 4" não confere com "Soma: 40"). O resultado também aparece no título da seção (ex.: ✅ 2 de 2).

### 5. Peça ajuda quando precisar
- **🎓 Verificar meu código** (no painel ou no topo do editor, ao lado do executar): revisa seu código em relação ao exercício e encontra os pontos para revisar: primeiro o que impede o programa de funcionar e, depois, a **qualidade do código** (cabeçalho, indentação, nomes das variáveis e comentários). Vocês resolvem **um de cada vez, do mais fácil para o mais difícil**:
  - o ponto atual fica **marcado no código**: seta amarela na margem, linha destacada e a pergunta do tutor no fim da linha;
  - em cima da linha aparecem os botões **✅ Já corrigi, conferir** (o tutor confere e, se estiver certo, marca o próximo ponto), **💡 Pista** e **✖ Esconder**;
  - o painel também mostra o ponto atual (ex.: 📍 Ponto 1 de 3 · linha 20), com **Ir para a linha** e **Já corrigi**;
  - a marcação acompanha a linha se você escrever ou apagar código acima dela.
- **✨ Verificar a qualidade do código** (no painel, no menu do botão direito do editor ou com `@tutor /qualidade`): avalia só a qualidade, sem olhar a lógica, e dá uma **nota de 0 a 1000**. Os pontos de melhoria ficam marcados no editor, um de cada vez (✨ Qualidade 1 de 3). Diferente da verificação do código, o **✅ Feito, próximo** só passa para o ponto seguinte, sem usar a IA. Depois do último, um único **✨ Conferir e ver a nota nova** faz o tutor conferir tudo de uma vez: ele diz o que ficou certo (✅) e o que ainda falta (⚠️), e recalcula a nota. Assim se gasta uma mensagem do Copilot no fim, e não uma por ponto. Dá para conferir antes, com **✨ Conferir tudo agora**. Aqui o tutor dá a resposta direta: o comentário Doxygen pronto, o nome melhor para a variável, o trecho indentado e o atalho que ajuda. A nota segue uma rubrica fixa:

  | Critério | Máximo |
  |---|---|
  | Cabeçalho Doxygen e enunciado | 150 |
  | Indentação e espaçamento | 200 |
  | Nomes de variáveis, constantes e funções | 250 |
  | Comentários (incluindo o Doxygen das funções) | 200 |
  | Organização (sem números "mágicos", sem código repetido, mensagens claras) | 200 |

  No fim da resposta aparecem a nota, a tabela por critério e quanto ela subiu ou desceu desde a última verificação. O painel mostra a última nota (ex.: 🏅 780 / 1000 ⬆ +130).
- Em **💬 Mais ajuda do tutor**:
  - **💬 Perguntar ao tutor**;
  - **💡 Pedir uma pista**;
  - **🐞 Depurar**: o tutor ensina a achar o erro sozinho, com ponto de parada (F5/F10) ou `printf`;
  - **🗣️ Explicar meu código**: depois que funcionar, explique com suas palavras e o tutor comenta;
  - **❓ Quiz da aula**: 3 perguntas rápidas de revisão.
- **Chat**: `@tutor` seguido da dúvida. Comandos: `/verificar`, `/qualidade`, `/proximo` (conferir o ponto marcado), `/pista`, `/erro`, `/teste`, `/depurar`, `/explicar`, `/quiz aula 11`, `/video ponteiros`, `/conceito strcmp`.

O painel mostra quantas ajudas você pediu em cada exercício: tente sozinho um pouco antes de pedir a próxima!

## Para o professor: casos de teste oficiais
O arquivo `material/casos-oficiais.json` pode trazer casos de teste para os exercícios da lista. Eles são carregados quando o enunciado colado pelo aluno é reconhecido como aquele exercício:
```json
{
  "aula11-ex4": [ { "entrada": "", "saidaEsperada": "Soma: 36" } ]
}
```
Os identificadores seguem o formato `aulaNN-exM` (ex.: `aula05-ex2`).

## Configurações
| Configuração | Padrão | Descrição |
|---|---|---|
| `tutorSocratico.dicasOffline` | `true` | Dicas de erros clássicos enquanto digita e tradução das mensagens do GCC. |
| `tutorSocratico.dicasDeQualidade` | `true` | Avisos de cabeçalho Doxygen, enunciado em comentário e indentação. |
| `tutorSocratico.perguntarExercicio` | `true` | Pergunta se o arquivo `.c` é um exercício ao abri-lo pela primeira vez. |
| `tutorSocratico.verificarAoSalvar` | `true` | Verifica o arquivo com o GCC ao salvar. |
| `tutorSocratico.caminhoGcc` | `gcc` | Caminho do executável do GCC. |
| `editor.inlineSuggest.enabled` (para C) | `false` | Sugestões automáticas de código nos arquivos C (modo aprendizado). |

## Versão de testes
Esta extensão está em **pré-visualização**: ela já funciona, mas ainda vai receber melhorias. Sugestões e problemas podem ser enviados em [Issues](https://github.com/FelipeSKT/Muri-Muri-Socratico/issues).

## Licença
O código da extensão está sob a licença MIT. O material de aula incluído (baseado nos slides e nas videoaulas do Prof. Muriel de Souza Godoi) pode ser usado com a extensão para estudar, mas não pode ser redistribuído separadamente sem autorização. Veja o arquivo [LICENSE](LICENSE).

## Privacidade
Só as funções do chat `@tutor` usam IA: elas enviam sua pergunta, o enunciado, o código do arquivo `.c` aberto, os erros e o resultado dos testes ao modelo do GitHub Copilot, sob os termos da sua conta. Dicas offline e testes rodam só no seu computador.
