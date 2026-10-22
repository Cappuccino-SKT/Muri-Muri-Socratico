# Tutor Socrático no VS Code – Fundamentos de Programação em C

Pasta modelo para os alunos fazerem os exercícios no VS Code com um **tutor de IA que ajuda com perguntas, sem entregar a solução**, baseado no material revisado da disciplina e nas videoaulas.

## O que tem aqui

| Caminho | Para que serve |
|---|---|
| `.github/agents/tutor-socratico.agent.md` | O agente **Tutor Socrático**: regras de comportamento, escada de pistas e onde está o material. |
| `.github/copilot-instructions.md` | Regras básicas que valem em qualquer modo do chat (não entregar solução, usar o material). |
| `material/aulas/` | Material verificado das Aulas 01 a 21 (conceitos, erros comuns, perguntas socráticas). |
| `material/_INDICE_VIDEOAULAS.md` | Tópico → videoaula → link, para o tutor indicar qual vídeo assistir. |
| `.vscode/tasks.json` | Tarefas para compilar e executar o arquivo `.c` aberto com o GCC. |
| `.vscode/extensions.json` | Recomenda as extensões C/C++ e GitHub Copilot Chat. |
| `exercicios/` | Onde o aluno coloca seus exercícios. Contém um exemplo com erros de propósito para testar o tutor. |

## Pré-requisitos (aluno)
1. **VS Code** instalado.
2. **GCC** instalado e no PATH (no Windows, MinGW-w64). Teste no terminal: `gcc --version`.
3. Extensão **GitHub Copilot Chat** com uma conta GitHub. Estudantes podem obter o Copilot gratuitamente pelo **GitHub Student Developer Pack** (o plano gratuito do Copilot também funciona, com limite de uso).

## Como usar (aluno)
1. Abra **esta pasta** no VS Code (*Arquivo → Abrir Pasta*). O agente só aparece quando a pasta inteira está aberta.
2. Abra o chat do Copilot e, no **seletor de agentes**, escolha **Tutor Socrático**.
3. Crie seus exercícios em `exercicios/`.
4. Para compilar o arquivo aberto: `Ctrl+Shift+B`. Para compilar e executar: *Terminal → Executar Tarefa → Compilar e executar (C)*. Os erros aparecem no painel **Problemas**.
5. Peça ajuda no chat, por exemplo:
   - "Meu programa compila mas a média sai errada, me ajuda?"
   - (colando o erro) "O que esse erro quer dizer?"
   - "Qual videoaula explica `strcmp`?"

O tutor **não vai escrever a resposta** do exercício: ele faz perguntas, aponta onde olhar, explica conceitos e indica o material e o vídeo.

## Como atualizar o material (professor/mantenedor)
O material desta pasta é uma **cópia** de `Material-Ensino-Verificado/` e de `Transcrição-Verificadas/_INDICE_VIDEOAULAS.md`. Depois de alterar os originais, copie de novo os arquivos para `material/aulas/` e `material/`.

## Limitações do protótipo
- As regras do agente são **instruções** para o modelo, não uma trava técnica. Um aluno determinado ainda pode usar outro modo do chat ou outra ferramenta para obter a resposta. O objetivo é que o caminho mais fácil dentro da pasta seja o caminho de aprender.
- O agente não tem permissão de editar arquivos (`tools: ['read', 'search']`), então não altera o código do aluno.
- Funciona com o GitHub Copilot no VS Code. Ainda não foi testado com outros assistentes.
