---
titulo: "Raylib 7 - Compilação manual e Makefile"
numero_aula: 107
disciplina: "Fundamentos de Programação 2 (Engenharia de Computação) - Projeto final"
topicos: [compilar no terminal, compilacao manual, gcc, makefile, make, mingw32-make, arquivo objeto, ligacao, linker, missing separator, no rule to make target, make clean, make run, CFLAGS, LDLIBS, varios arquivos]
pre_requisitos: ["Raylib 1 - Primeiros passos", "Raylib 6 - Organizando o jogo"]
fonte_original: "Manual do GNU Make 4.4 e do GCC; comandos e Makefile testados com GCC 15, GNU Make 4.4.1 (mingw32-make) e raylib 6.2 no Windows (PowerShell e bash)"
revisado_em: 2026-11-03
status: verificado (comandos e Makefile modelo testados no PowerShell e no bash, com projeto em dois arquivos)
---

# Raylib 7 - Compilação manual e Makefile

## Objetivo
Compilar o jogo no terminal, sem botões, entendendo cada etapa, e escrever o **Makefile** do projeto (requisito do projeto final): um arquivo com as regras para compilar tudo com um comando só, `make`.

## Conceitos-chave

- **As etapas da compilação**:
  1. **Compilar** cada `.c` em um **arquivo objeto** (`.o`): o GCC confere a sintaxe e gera o código de máquina daquele arquivo. Opção `-c`.
  2. **Ligar** (*linkar*) os `.o` com as bibliotecas (raylib e as do Windows) num **executável** (`.exe`).

  ```
  gcc -std=c11 -Wall -Wextra -c main.c -o main.o
  gcc -std=c11 -Wall -Wextra -c jogador.c -o jogador.o
  gcc main.o jogador.o -o jogo.exe -lraylib -lopengl32 -lgdi32 -lwinmm
  ```
  Também dá para fazer tudo num comando só: `gcc main.c jogador.c -o jogo.exe -lraylib -lopengl32 -lgdi32 -lwinmm`. Separar em `.o` permite recompilar **só o arquivo que mudou**.

- **Opções do GCC**:

  | Opção | Para que serve |
  |---|---|
  | `-c` | só compila (gera o `.o`), sem ligar |
  | `-o nome` | nome do arquivo gerado |
  | `-std=c11` | usa o padrão C11 da linguagem |
  | `-Wall -Wextra` | mostra os avisos (*warnings*): muitos erros de lógica aparecem aqui |
  | `-g` | inclui informações para o depurador (gdb, F5 no VS Code) |
  | `-I pasta` | outra pasta onde procurar os `.h` (ex.: raylib fora do MSYS2) |
  | `-L pasta` | outra pasta onde procurar as bibliotecas |
  | `-lraylib` | liga a biblioteca raylib (`-l` + nome) |

  As bibliotecas (`-l...`) vêm **depois** dos arquivos `.c`/`.o` no comando.

- **Onde rodar**: no terminal do VS Code (**Terminal → Novo Terminal**, ou `` Ctrl+` ``), na pasta do projeto. Para entrar na pasta: `cd caminho/da/pasta`. Para rodar o jogo: `./jogo.exe`.

- **Instalar o make** (Windows, MSYS2 UCRT64):
  ```
  pacman -S mingw-w64-ucrt-x86_64-make
  ```
  No Windows, esse pacote instala o comando **`mingw32-make`** (é o mesmo GNU Make). Nos exemplos abaixo, onde está `make`, use `mingw32-make` se o `make` não for reconhecido.

- **O que é o Makefile**: um arquivo chamado exatamente `Makefile` (sem extensão), na pasta do projeto, com **regras**:
  ```
  alvo: dependências
  <TAB>comando
  ```
  - O **alvo** é o que se quer gerar (ex.: `jogo.exe`) ou o nome de uma tarefa (ex.: `clean`).
  - As **dependências** são os arquivos de que ele precisa. O `make` só executa o comando se o alvo não existe ou se alguma dependência é **mais nova** que ele.
  - A linha do comando começa com **TAB**, nunca com espaços.

- **Makefile modelo** (para um projeto com `main.c`, `jogador.c` e `jogador.h`; troque pelos seus arquivos):
  ```makefile
  # Makefile do jogo: "make" compila, "make run" compila e roda, "make clean" apaga o que foi gerado.

  CC      = gcc
  CFLAGS  = -std=c11 -Wall -Wextra -g
  LDLIBS  = -lraylib -lopengl32 -lgdi32 -lwinmm

  EXEC    = jogo.exe
  SRCS    = main.c jogador.c
  OBJS    = $(SRCS:.c=.o)

  # O make no PowerShell/cmd do Windows usa o cmd; no MSYS2 e no Linux, o sh.
  ifeq ($(shell echo %OS%),Windows_NT)
      RM  = del /Q
      RUN = $(EXEC)
  else
      RM  = rm -f
      RUN = ./$(EXEC)
  endif

  all: $(EXEC)

  $(EXEC): $(OBJS)
  	$(CC) $(OBJS) -o $@ $(LDLIBS)

  %.o: %.c
  	$(CC) $(CFLAGS) -c $< -o $@

  main.o jogador.o: jogador.h

  run: $(EXEC)
  	$(RUN)

  clean:
  	-$(RM) $(OBJS) $(EXEC)

  .PHONY: all run clean
  ```

  | Parte | O que faz |
  |---|---|
  | `CC`, `CFLAGS`, `LDLIBS`, `EXEC`, `SRCS` | **variáveis**: escreve uma vez, usa com `$(NOME)`. Para acrescentar um arquivo ao projeto, basta colocá-lo em `SRCS` |
  | `OBJS = $(SRCS:.c=.o)` | troca `.c` por `.o` em cada nome (`main.o jogador.o`) |
  | `ifeq ... endif` | escolhe o comando de apagar e de rodar conforme o terminal (sem isso, o `make clean` falha no PowerShell) |
  | `all: $(EXEC)` | primeira regra: é a que roda quando se digita só `make` |
  | `$(EXEC): $(OBJS)` | o executável depende dos `.o`; o comando **liga** tudo com a raylib |
  | `%.o: %.c` | regra para **qualquer** `.o`: compila o `.c` de mesmo nome |
  | `$@`, `$<`, `$^` | o alvo, a primeira dependência e todas as dependências da regra |
  | `main.o jogador.o: jogador.h` | se o `.h` mudar, esses `.o` são recompilados |
  | `run`, `clean` | tarefas: `make run` compila e roda; `make clean` apaga os `.o` e o `.exe` (o `-` no começo ignora erro se já não existirem) |
  | `.PHONY` | diz que `all`, `run` e `clean` são tarefas, e não arquivos |

  Se a raylib não foi instalada pelo MSYS2, acrescente as pastas: `CFLAGS += -IC:/raylib/raylib/src` e, na linha de ligação, `-LC:/raylib/raylib/src` antes do `$(LDLIBS)`.

- **Usando**: na pasta do Makefile, `make` (compila só o que mudou), `make run` (compila e roda) e `make clean` (apaga o que foi gerado, para compilar tudo do zero).

## Erros comuns e pontos de atenção
- `*** missing separator. Stop.`: a linha de comando começa com **espaços** em vez de **TAB**. Comum ao copiar da internet. No VS Code, apague os espaços do começo da linha e aperte Tab. Ele já usa Tab nos arquivos `Makefile`, mas confira na barra de baixo se aparece "Tab Size" e não "Spaces".
- `No rule to make target 'jogdor.c', needed by 'jogdor.o'`: um nome em `SRCS` está errado ou o arquivo não está na pasta.
- `Nothing to be done for 'all'` ou `'jogo.exe' is up to date`: não é erro. Nada mudou desde a última compilação. Para forçar, `make clean` e depois `make`.
- `make : O termo 'make' não é reconhecido...`: o make não está instalado, ou no Windows o nome é `mingw32-make`.
- O arquivo foi salvo como `Makefile.txt`: o Windows esconde a extensão. O nome precisa ser exatamente `Makefile`.
- `undefined reference to 'MoverJogador'`: um `.c` ficou fora de `SRCS`, então a função dele não foi ligada. Se a função não encontrada for da raylib (`InitWindow`...), falta `LDLIBS` no comando de ligação, ou ele está **antes** dos `.o`.
- `multiple definition of 'main'`: dois arquivos de `SRCS` têm `main`. Só um pode ter.
- `multiple definition of 'pontos'`: uma variável foi **definida** num `.h` incluído por vários `.c`. No `.h` vão só tipos, constantes e protótipos.
- Mudou o `.h` e o jogo não mudou: falta a linha de dependência (`main.o jogador.o: jogador.h`). Use `make clean` e `make` para recompilar tudo.
- `make clean` falhando com `CreateProcess(NULL, rm -f ...) failed`: `rm` não existe no PowerShell. O bloco `ifeq` do modelo resolve isso.
- Escrever `.\jogo.exe` dentro do Makefile: no bash a barra invertida não funciona. Use a variável `$(RUN)`.

## Perguntas socráticas sugeridas
- "O que o `-c` muda no comando? O arquivo gerado já pode ser executado?"
- "Se só o `jogador.c` mudou, quais comandos precisam rodar de novo? Como o `make` descobre isso?"
- "A mensagem é `missing separator`. Com que caractere a linha do comando deveria começar?"
- "Você criou o arquivo `inimigos.c`. O que precisa mudar no Makefile para ele entrar no jogo?"
- "O erro é `undefined reference`. Ele aconteceu ao compilar um `.c` ou ao ligar os `.o`? Em que regra do Makefile está esse comando?"
- "Por que o `clean` está no `.PHONY`? O que aconteceria se existisse um arquivo chamado `clean` na pasta?"

## Referências oficiais
- Manual do GNU Make (em inglês): https://www.gnu.org/software/make/manual/make.html
- Opções do GCC (em inglês): https://gcc.gnu.org/onlinedocs/gcc/Invoking-GCC.html
- Exemplo de Makefile do modelo de projeto oficial da raylib: https://github.com/raysan5/raylib-game-template

## Notas de revisão
- O Makefile modelo foi testado com GNU Make 4.4.1 (`mingw32-make`), GCC 15 e a raylib 6.2, num projeto com dois `.c` e um `.h`, no PowerShell e no bash. Verificado: compilação inicial, recompilação só do arquivo alterado, recompilação ao mudar o `.h`, `make run` e `make clean` nos dois terminais.
- O pacote `mingw-w64-ucrt-x86_64-make` do MSYS2 (versão 4.4.1) instala o comando `mingw32-make.exe`.
