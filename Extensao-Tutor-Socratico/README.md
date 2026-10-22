# Tutor Socrático – Programação em C

Tutor para a disciplina **Fundamentos de Programação em C**. Ele ajuda você a resolver os exercícios **fazendo perguntas e dando pistas, sem entregar a resposta**, explica os erros do compilador em português, testa seu programa e indica **qual videoaula assistir** para cada dúvida.

## Requisitos
- **GCC** instalado (no Windows, MinGW-w64), para verificar e testar os programas.
- **GitHub Copilot** ativo no VS Code para as funções com IA (chat `@tutor`). O plano gratuito serve; estudantes podem ter o Copilot completo pelo GitHub Student Developer Pack. **As dicas offline, os casos de teste e o progresso funcionam sem Copilot.**

## Como usar

Clique no ícone 🎓 **Tutor Socrático** na barra lateral. Ele tem dois painéis: **Exercício** e **Progresso**.

### 1. Escolha o exercício
- **📚 Escolher exercício da lista da aula**: lista com os exercícios das aulas (Vetores, Matrizes, Strings, Ponteiros...). Ao escolher, a extensão cria um arquivo como `aula11_ex4.c` com o enunciado e o esqueleto do programa, ou usa o arquivo que já está aberto.
- No painel **Progresso**, clique em um exercício para abri-lo.
- Ou cole o enunciado de qualquer exercício na caixa do painel.
- Ao abrir um `.c` pela primeira vez, a extensão pergunta se ele é um exercício. Você pode responder **Não é exercício** ou **Não perguntar mais**.

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
Em **Casos de teste**, clique em **+ Adicionar caso de teste** e preencha:
- **Entrada**: o que você digitaria (ex.: `7 8 9 10 6`);
- **Saída esperada**: o que deveria aparecer (ex.: `Media: 8.00`);
- **🔮 Sua previsão** (opcional): o que você acha que o seu programa vai mostrar. É o "teste de mesa", e a extensão diz se você acertou.

Clique em **▶ Rodar testes**: ✅ passou, ❌ saída diferente, ⏱️ não terminou em 3 segundos (laço infinito) ou 💥 travou. O caso passa se a saída esperada aparecer na saída do programa (mensagens como "Digite a nota:" não atrapalham, e números não são cortados: "Soma: 4" não confere com "Soma: 40"). Quando todos passam, um exercício da lista fica **concluído** no seu progresso.

### 4. Peça ajuda quando precisar
- **Botão 🎓 no topo do editor** (ao lado do executar): revisa seu código em relação ao exercício e aponta até 3 pontos para olhar, com perguntas.
- **🐞 Depurar**: o tutor ensina a achar o erro sozinho, com ponto de parada (F5/F10) ou `printf`.
- **🗣️ Explicar**: depois que funcionar, explique seu código com suas palavras e o tutor comenta.
- **❓ Quiz**: 3 perguntas rápidas de revisão da aula.
- **Chat**: `@tutor` seguido da dúvida. Comandos: `/verificar`, `/pista`, `/erro`, `/teste`, `/depurar`, `/explicar`, `/quiz aula 11`, `/video ponteiros`, `/conceito strcmp`.

O painel mostra quantas ajudas você pediu em cada exercício: tente sozinho um pouco antes de pedir a próxima!

## Para o professor: casos de teste oficiais
O arquivo `material/casos-oficiais.json` pode trazer casos de teste para os exercícios da lista. Eles são carregados quando o aluno escolhe o exercício:
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
Só as funções do chat `@tutor` usam IA: elas enviam sua pergunta, o enunciado, o código do arquivo `.c` aberto, os erros e o resultado dos testes ao modelo do GitHub Copilot, sob os termos da sua conta. Dicas offline, testes e progresso rodam só no seu computador.
