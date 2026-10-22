# Tutor Socrático – Fundamentos de Programação em C

Material e ferramentas para um tutor de IA da disciplina **Fundamentos de Programação** (Engenharia de Computação, Prof. Muriel de Souza Godoi). O tutor ajuda o aluno **com perguntas e pistas, sem entregar a resposta**, e indica qual videoaula assistir para cada dúvida.

## O que tem aqui

| Pasta / arquivo | Conteúdo |
|---|---|
| `Material-Ensino-Verificado/` | As 21 aulas convertidas dos slides para Markdown, revisadas tecnicamente, com erros comuns, perguntas socráticas e notas de revisão. `_INDICE.md` resume tudo. |
| `Transcrição-Verificadas/` | Transcrições revisadas das videoaulas e `_INDICE_VIDEOAULAS.md` (tópico → vídeo → link). |
| `Notebook-Gemini/` | O material juntado em 4 arquivos para o Gemini Notebook (NotebookLM) e as instruções do chat. |
| `Extensao-Tutor-Socratico/` | Extensão do VS Code: chat `@tutor` (via GitHub Copilot), dicas offline, casos de teste, lista de exercícios e progresso. Veja o README dela. |
| `Tutor-VSCode/` | Protótipo anterior, sem extensão: uma pasta modelo com um agente do Copilot. |
| `casos-oficiais-proposta.json` | Casos de teste dos exercícios da lista, com as suposições de cada um. |
| `Revisao-Casos-Oficiais.html` | Página de revisão desses casos. |
| `gerar_pacotes.py` | Gera os arquivos do notebook, atualiza as cópias do material e copia os casos de teste para a extensão. |
| `Links-Aulas.txt` | Links das videoaulas. |

Os slides originais (PDF), as transcrições brutas e os livros de referência não fazem parte do repositório.

## Atualizar depois de mudar o material

```bash
python gerar_pacotes.py
```

## Gerar e testar a extensão

```bash
cd Extensao-Tutor-Socratico
npm install
npm test
npm run package
```

O `npm run package` gera o arquivo `.vsix`, que pode ser instalado no VS Code por *Extensões → ⋯ → Instalar do VSIX*. Para compilar e testar é preciso ter o Node.js e o GCC (MinGW no Windows).
