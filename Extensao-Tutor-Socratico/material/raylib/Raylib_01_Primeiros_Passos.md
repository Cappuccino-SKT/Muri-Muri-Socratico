---
titulo: "Raylib 1 - Primeiros passos"
numero_aula: 101
disciplina: "Fundamentos de Programação 2 (Engenharia de Computação) - Projeto final"
topicos: [raylib, instalar raylib, compilar raylib, janela, laco do jogo, game loop, InitWindow, WindowShouldClose, BeginDrawing, EndDrawing, ClearBackground, SetTargetFPS, CloseWindow, lraylib, undefined reference]
pre_requisitos: ["Aula 02 - Linguagem C", "Aula 08 - Estrutura de Repetição while", "Aula 16 - Funções"]
fonte_original: "raylib.h da raylib 6.2 (github.com/raysan5/raylib) e cheatsheet oficial (raylib.com/cheatsheet)"
revisado_em: 2026-11-03
status: verificado (funções e assinaturas conferidas no raylib.h da versão 6.2)
---

# Raylib 1 - Primeiros passos

## Objetivo
Instalar a raylib, compilar o primeiro programa com janela e entender a estrutura de todo jogo feito com ela: abrir a janela, repetir o **laço do jogo** (ler a entrada, atualizar, desenhar) e fechar a janela.

## Conceitos-chave

- **O que é a raylib**: uma biblioteca em C para fazer jogos e programas com gráficos, sons e entrada (teclado, mouse, controle). Tudo é chamado com funções simples, como `DrawCircle` ou `IsKeyDown`. A versão atual é a **6.2**. Licença zlib: pode ser usada livremente, inclusive em trabalhos da disciplina.

- **Instalar no Windows (recomendado: MSYS2, o mesmo usado para o GCC)**: no terminal **MSYS2 UCRT64**:
  ```
  pacman -S mingw-w64-ucrt-x86_64-raylib
  ```
  O pacote instala a raylib 6.2 junto do GCC do MSYS2 (`C:\msys64\ucrt64`). Com isso, `#include <raylib.h>` passa a funcionar sem nenhuma configuração extra. Nos computadores da universidade, a raylib pode já estar instalada: confirme com o professor.
  - Alternativa: o **instalador oficial da raylib para Windows** (no site raylib.com), que traz um GCC próprio. Nesse caso, o caminho do GCC e as pastas da raylib precisam ser informados nas configurações da extensão.

- **Compilar**: o programa precisa ser **ligado** (*linkado*) à raylib e a bibliotecas do Windows:
  ```
  gcc jogo.c -o jogo.exe -lraylib -lopengl32 -lgdi32 -lwinmm
  ```
  - `-lraylib` liga a raylib; `-lopengl32 -lgdi32 -lwinmm` são bibliotecas do Windows que a raylib usa (gráficos, janela e som).
  - No Linux, normalmente basta `gcc jogo.c -o jogo -lraylib -lm`.
  - No VS Code, o botão **▶ Compilar e rodar o jogo** do painel do tutor faz isso sozinho.

- **Estrutura de todo programa com raylib**:
  ```c
  #include "raylib.h"

  int main(void)
  {
      InitWindow(800, 450, "Meu primeiro jogo");   /* abre a janela: largura, altura, título */
      SetTargetFPS(60);                            /* no máximo 60 quadros por segundo */

      while (!WindowShouldClose())                 /* repete até fechar a janela ou apertar ESC */
      {
          /* 1. Atualizar: ler teclado/mouse, mover as coisas, testar colisões */

          /* 2. Desenhar */
          BeginDrawing();
              ClearBackground(RAYWHITE);           /* apaga o quadro anterior */
              DrawText("Ola, raylib!", 190, 200, 20, DARKGRAY);   /* a fonte padrão não tem acentos */
          EndDrawing();
      }

      CloseWindow();                               /* fecha a janela e libera os recursos */
      return 0;
  }
  ```
  - `InitWindow(largura, altura, titulo)` vem **antes** de qualquer outra função da raylib (principalmente antes de carregar imagens e fontes).
  - Cada volta do `while` é **um quadro** (*frame*). Com `SetTargetFPS(60)`, o laço roda até 60 vezes por segundo.
  - `WindowShouldClose()` devolve verdadeiro quando o jogador fecha a janela ou aperta **ESC** (dá para trocar a tecla com `SetExitKey(KEY_NULL)` ou outra tecla).
  - Todo desenho fica entre `BeginDrawing()` e `EndDrawing()`. O `EndDrawing()` mostra o quadro pronto na tela.
  - `ClearBackground(cor)` pinta a tela inteira. Sem ele, os desenhos dos quadros anteriores continuam aparecendo.

- **Coordenadas da tela**: o ponto `(0, 0)` é o **canto superior esquerdo**. O `x` cresce para a **direita** e o `y` cresce para **baixo** (ao contrário da matemática). Numa janela de 800 × 450, o canto inferior direito é `(799, 449)`.

- **Funções úteis da janela**:

  | Função | O que faz |
  |---|---|
  | `GetScreenWidth()`, `GetScreenHeight()` | Largura e altura atuais da janela |
  | `SetWindowTitle("...")` | Troca o título da janela |
  | `ToggleFullscreen()` | Alterna entre tela cheia e janela |
  | `SetConfigFlags(FLAG_WINDOW_RESIZABLE)` | Antes do `InitWindow`: permite redimensionar a janela |
  | `DrawFPS(10, 10)` | Mostra os quadros por segundo (bom para testar) |

## Erros comuns e pontos de atenção
- `fatal error: raylib.h: No such file or directory`: o GCC não encontrou a raylib. Ela não está instalada para esse GCC (confira se o GCC usado é o do MSYS2 UCRT64) ou a pasta não foi informada.
- `undefined reference to 'InitWindow'` (ou outra função da raylib): o código compilou, mas faltou **ligar** a raylib. Falta `-lraylib` (e as bibliotecas do Windows) no comando.
- A janela abre e fecha na hora: falta o laço `while (!WindowShouldClose())`, ou a condição dele está invertida.
- A tela fica "borrada", com rastros: faltou `ClearBackground` no começo do desenho.
- Desenhar fora do `BeginDrawing()`/`EndDrawing()`: o desenho não aparece.
- Colocar `InitWindow` dentro do laço: abre uma janela nova a cada quadro.
- Esquecer o `CloseWindow()` no fim.
- Achar que o `y` cresce para cima: um objeto com `y` aumentando **desce** na tela.
- `raylib.h` com aspas (`"raylib.h"`) ou sinais de menor/maior (`<raylib.h>`): os dois funcionam com a instalação pelo MSYS2.

## Perguntas socráticas sugeridas
- "Quantas vezes por segundo o código dentro do `while` executa? O que muda se você trocar `SetTargetFPS(60)` por `SetTargetFPS(10)`?"
- "Se você apagar o `ClearBackground`, o que acha que vai acontecer com um círculo que se move?"
- "O `y` de um objeto está aumentando a cada quadro. Ele sobe ou desce na tela?"
- "A mensagem é `undefined reference`. O erro aconteceu ao compilar o seu código ou ao juntá-lo com a biblioteca?"
- "Em que ordem acontecem as três partes de cada quadro: ler a entrada, atualizar e desenhar? Por que essa ordem?"

## Referências oficiais
- Lista de todas as funções (cheatsheet): https://www.raylib.com/cheatsheet/cheatsheet.html
- Exemplos com código (começar por "core basic window" e "shapes basic shapes"): https://www.raylib.com/examples.html

## Notas de revisão
- Material escrito para o projeto final de Fundamentos de Programação 2. Funções, assinaturas, constantes e cores conferidas no `raylib.h` da versão 6.2 (15/10/2026).
- Pacote `mingw-w64-ucrt-x86_64-raylib` conferido no MSYS2 (versão 6.2-1).
