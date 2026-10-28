# Muri-Muri Socratico

Tutor socrático para a disciplina **Fundamentos de Programação em C**. Ele ajuda você a resolver os exercícios **fazendo perguntas e dando pistas, sem entregar a resposta**, explica os erros do compilador em português, testa seu programa e indica **qual videoaula assistir** para cada dúvida.

## Requisitos
- **GCC** instalado (no Windows, MinGW-w64), para verificar e testar os programas.
- **GitHub Copilot** ativo no VS Code para as funções com IA (chat `@tutor`). O plano gratuito serve; estudantes podem ter o Copilot completo pelo GitHub Student Developer Pack. **As dicas offline e os casos de teste funcionam sem Copilot.**

## Como usar

Clique no ícone 🎓 **Tutor Socrático** na barra lateral. Na tela principal ficam só duas coisas:
- a caixa **Exercício**, onde você cola o enunciado;
- o botão **🎓 Verificar meu código**.

O resto fica em seções que você abre quando precisar: **🧪 Testar meu programa**, **💬 Mais ajuda do tutor** e **⚙️ Opções**.

### 1. Informe o exercício (opcional)
- Cole o enunciado na caixa **Exercício**. Se for um exercício das aulas, a extensão o reconhece (🔎 *Reconhecido: Aula 11 – Vetores, exercício 4*) e já coloca os casos de teste do professor, quando houver.
- **Sem enunciado**, o tutor descobre o exercício sozinho: usa o comentário do início do arquivo, se você colou o enunciado ali, ou deduz pelo seu código (textos dos `printf`, o que é lido com `scanf`, vetores, structs...). Na primeira resposta ele diz o que entendeu e pergunta se é isso mesmo.
- Ao abrir um `.c` pela primeira vez, a extensão sugere colar o enunciado. Você pode responder **Agora não** ou **Não perguntar mais**.

### 2. Programe com dicas em tempo real (sem IA)
Enquanto você digita, aparecem dicas 🎓 (sublinhado azul) sobre erros clássicos de iniciantes:
- `=` em vez de `==` em uma condição;
- `;` logo depois do `if (...)` ou do `for (...)`;
- `0 < x < 10` (não funciona como na matemática);
- laço `i <= tamanho` percorrendo um vetor;
- strings comparadas com `==`;
- divisão inteira guardada em `float`;
- uso de `gets`.

As dicas fazem uma pergunta em vez de dar a correção. Ao salvar, os erros do GCC ganham uma **explicação em português** (💬). Na lâmpada 💡, há **Pedir uma pista ao Tutor Socrático** e **📺 Assistir à videoaula** da aula sobre o assunto.

Por padrão, nos arquivos C, **o Copilot não sugere código automaticamente** (modo aprendizado). Para mudar, clique em **🎓 Modo aprendizado** na barra de status.

### 3. Teste seu programa
Abra **🧪 Testar meu programa**, clique em **+ Caso de teste** e preencha:
- **Entrada**: o que você digitaria (ex.: `7 8 9 10 6`);
- **Saída esperada**: o que deveria aparecer (ex.: `Media: 8.00`);
- **🔮 Sua previsão** (opcional): o que você acha que o seu programa vai mostrar. É o "teste de mesa", e a extensão diz se você acertou.

Clique em **▶ Rodar testes**: ✅ passou, ❌ saída diferente, ⏱️ não terminou em 3 segundos (laço infinito) ou 💥 travou. O caso passa se a saída esperada aparecer na saída do programa (mensagens como "Digite a nota:" não atrapalham, e números não são cortados: "Soma: 4" não confere com "Soma: 40"). O resultado também aparece no título da seção (ex.: ✅ 2 de 2).

### 4. Peça ajuda quando precisar
- **🎓 Verificar meu código** (no painel ou no topo do editor, ao lado do executar): revisa seu código em relação ao exercício e encontra os pontos para revisar. Vocês resolvem **um de cada vez, do mais fácil para o mais difícil**:
  - o ponto atual fica **marcado no código**: seta amarela na margem, linha destacada e a pergunta do tutor no fim da linha;
  - em cima da linha aparecem os botões **✅ Já corrigi, conferir** (o tutor confere e, se estiver certo, marca o próximo ponto), **💡 Pista** e **✖ Esconder**;
  - o painel também mostra o ponto atual (ex.: 📍 Ponto 1 de 3 · linha 20), com **Ir para a linha** e **Já corrigi**;
  - a marcação acompanha a linha se você escrever ou apagar código acima dela.
- Em **💬 Mais ajuda do tutor**:
  - **💬 Perguntar ao tutor**;
  - **💡 Pedir uma pista**;
  - **🐞 Depurar**: o tutor ensina a achar o erro sozinho, com ponto de parada (F5/F10) ou `printf`;
  - **🗣️ Explicar meu código**: depois que funcionar, explique com suas palavras e o tutor comenta;
  - **❓ Quiz da aula**: 3 perguntas rápidas de revisão.
- **Chat**: `@tutor` seguido da dúvida. Comandos: `/verificar`, `/proximo` (conferir o ponto marcado), `/pista`, `/erro`, `/teste`, `/depurar`, `/explicar`, `/quiz aula 11`, `/video ponteiros`, `/conceito strcmp`.

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
