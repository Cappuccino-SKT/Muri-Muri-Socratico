# Projeto Final de Fundamentos 2 – Jogo com a raylib

Material de apoio para o projeto final: fazer um jogo em C com a biblioteca raylib (versão 6.2). Funções e assinaturas conferidas no raylib.h oficial. Não há videoaulas deste material: indique o cheatsheet e os exemplos oficiais citados em cada parte.

## Índice do material da raylib (projeto final de Fundamentos de Programação 2)

Material de apoio para o projeto final: um jogo em C com a **raylib 6.2**. Não há videoaulas deste material; as referências são o cheatsheet oficial (https://www.raylib.com/cheatsheet/cheatsheet.html) e os exemplos (https://www.raylib.com/examples.html).

| Material | Assuntos | Para dúvidas sobre... |
|---|---|---|
| Raylib 1 - Primeiros passos | instalar (MSYS2), compilar (`-lraylib`), janela, laço do jogo, coordenadas | "raylib.h not found", "undefined reference", janela que fecha, estrutura do programa |
| Raylib 2 - Desenho, cores e texto | `Color`, `Vector2`, `Rectangle`, formas, `DrawText`, `TextFormat`, fontes | desenhar, mostrar pontuação, centralizar texto, cores |
| Raylib 3 - Teclado, mouse e controle | `IsKeyDown`/`IsKeyPressed`, mouse, botões de menu, gamepad, digitar nome | mover com as setas, pular, clicar em botão |
| Raylib 4 - Movimento, tempo e colisões | `GetFrameTime`, gravidade, temporizadores, `GetRandomValue`, `CheckCollision*`, raymath | velocidade, pulo, sorteio, colisão, limites da tela |
| Raylib 5 - Imagens, sprites e sons | texturas, sprite sheet, animação, sons, música, caminho dos arquivos | imagem que não aparece, animação, som, música que para |
| Raylib 6 - Organizando o jogo | estados com `enum`, structs, vetores de entidades, funções, vários arquivos, recorde, câmera 2D | menu e game over, muitos inimigos, organizar o código, salvar recorde |
| Raylib 7 - Compilação manual e Makefile | `gcc -c`, arquivos `.o`, ligação, opções do GCC, `make`/`mingw32-make`, Makefile modelo (`all`, `run`, `clean`) | compilar no terminal, escrever o Makefile do projeto, "missing separator", "No rule to make target" |

Ligação com Fundamentos 1: structs (Aula 14), enum (Aula 15), vetores (Aula 11), laços (Aulas 08 a 10), funções (Aula 16), ponteiros (Aulas 17 e 19) e arquivos (Aula 21).

---

<!-- Material: Raylib_01_Primeiros_Passos.md -->
## Raylib 1 - Primeiros passos

- **Tópicos:** [raylib, instalar raylib, compilar raylib, janela, laco do jogo, game loop, InitWindow, WindowShouldClose, BeginDrawing, EndDrawing, ClearBackground, SetTargetFPS, CloseWindow, lraylib, undefined reference]
- **Pré-requisitos:** ["Aula 02 - Linguagem C", "Aula 08 - Estrutura de Repetição while", "Aula 16 - Funções"]
- **Status:** verificado (funções e assinaturas conferidas no raylib.h da versão 6.2)

### Objetivo
Instalar a raylib, compilar o primeiro programa com janela e entender a estrutura de todo jogo feito com ela: abrir a janela, repetir o **laço do jogo** (ler a entrada, atualizar, desenhar) e fechar a janela.

### Conceitos-chave

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

### Erros comuns e pontos de atenção
- `fatal error: raylib.h: No such file or directory`: o GCC não encontrou a raylib. Ela não está instalada para esse GCC (confira se o GCC usado é o do MSYS2 UCRT64) ou a pasta não foi informada.
- `undefined reference to 'InitWindow'` (ou outra função da raylib): o código compilou, mas faltou **ligar** a raylib. Falta `-lraylib` (e as bibliotecas do Windows) no comando.
- A janela abre e fecha na hora: falta o laço `while (!WindowShouldClose())`, ou a condição dele está invertida.
- A tela fica "borrada", com rastros: faltou `ClearBackground` no começo do desenho.
- Desenhar fora do `BeginDrawing()`/`EndDrawing()`: o desenho não aparece.
- Colocar `InitWindow` dentro do laço: abre uma janela nova a cada quadro.
- Esquecer o `CloseWindow()` no fim.
- Achar que o `y` cresce para cima: um objeto com `y` aumentando **desce** na tela.
- `raylib.h` com aspas (`"raylib.h"`) ou sinais de menor/maior (`<raylib.h>`): os dois funcionam com a instalação pelo MSYS2.

### Perguntas socráticas sugeridas
- "Quantas vezes por segundo o código dentro do `while` executa? O que muda se você trocar `SetTargetFPS(60)` por `SetTargetFPS(10)`?"
- "Se você apagar o `ClearBackground`, o que acha que vai acontecer com um círculo que se move?"
- "O `y` de um objeto está aumentando a cada quadro. Ele sobe ou desce na tela?"
- "A mensagem é `undefined reference`. O erro aconteceu ao compilar o seu código ou ao juntá-lo com a biblioteca?"
- "Em que ordem acontecem as três partes de cada quadro: ler a entrada, atualizar e desenhar? Por que essa ordem?"

### Referências oficiais
- Lista de todas as funções (cheatsheet): https://www.raylib.com/cheatsheet/cheatsheet.html
- Exemplos com código (começar por "core basic window" e "shapes basic shapes"): https://www.raylib.com/examples.html

### Notas de revisão
- Material escrito para o projeto final de Fundamentos de Programação 2. Funções, assinaturas, constantes e cores conferidas no `raylib.h` da versão 6.2 (15/10/2026).
- Pacote `mingw-w64-ucrt-x86_64-raylib` conferido no MSYS2 (versão 6.2-1).

---

<!-- Material: Raylib_02_Desenho_e_Texto.md -->
## Raylib 2 - Desenho, cores e texto

- **Tópicos:** [desenhar, texto, pontuacao, placar, mostrar na tela, forma, DrawRectangle, DrawCircle, DrawLine, DrawTriangle, Color, cores, Vector2, Rectangle, DrawText, TextFormat, MeasureText, fonte, LoadFont, DrawTextEx, transparencia, Fade]
- **Pré-requisitos:** ["Raylib 1 - Primeiros passos", "Aula 14 - Registros (struct)"]
- **Status:** verificado (funções e assinaturas conferidas no raylib.h da versão 6.2)

### Objetivo
Desenhar formas, usar cores e escrever textos na tela, inclusive com o valor de variáveis (pontuação, vidas, tempo). Conhecer as structs básicas da raylib: `Color`, `Vector2` e `Rectangle`.

### Conceitos-chave

- **Structs da raylib** (lembre da Aula 14: são registros comuns):

  | Tipo | Campos | Para que serve |
  |---|---|---|
  | `Vector2` | `float x, y` | Posição, velocidade, direção |
  | `Rectangle` | `float x, y, width, height` | Área retangular: jogador, parede, botão (`x, y` = canto superior esquerdo) |
  | `Color` | `unsigned char r, g, b, a` | Cor com transparência (`a`: 0 = invisível, 255 = opaco) |

  ```c
  Vector2 posicao = { 100.0f, 200.0f };
  Rectangle parede = { 300, 50, 40, 300 };    /* x, y, largura, altura */
  Color laranjaClaro = { 255, 180, 80, 255 };  /* r, g, b, a */
  ```

- **Cores prontas**: `RAYWHITE`, `WHITE`, `BLACK`, `BLANK` (transparente), `LIGHTGRAY`, `GRAY`, `DARKGRAY`, `YELLOW`, `GOLD`, `ORANGE`, `PINK`, `RED`, `MAROON`, `GREEN`, `LIME`, `DARKGREEN`, `SKYBLUE`, `BLUE`, `DARKBLUE`, `PURPLE`, `VIOLET`, `DARKPURPLE`, `BEIGE`, `BROWN`, `DARKBROWN`, `MAGENTA`.
  - `Fade(RED, 0.5f)` devolve o vermelho com 50% de transparência (de 0.0 a 1.0). `ColorAlpha` faz o mesmo.

- **Formas** (sempre entre `BeginDrawing()` e `EndDrawing()`):

  | Função | Desenha |
  |---|---|
  | `DrawRectangle(x, y, largura, altura, cor)` | Retângulo cheio (valores `int`) |
  | `DrawRectangleRec(retangulo, cor)` | Retângulo cheio a partir de um `Rectangle` |
  | `DrawRectangleV(posicao, tamanho, cor)` | Retângulo com dois `Vector2` |
  | `DrawRectangleLines(x, y, largura, altura, cor)` | Só o contorno |
  | `DrawRectangleLinesEx(retangulo, espessura, cor)` | Contorno com espessura |
  | `DrawRectangleRounded(retangulo, arredondamento, segmentos, cor)` | Cantos arredondados (`arredondamento` de 0.0 a 1.0) |
  | `DrawCircle(centroX, centroY, raio, cor)` | Círculo cheio |
  | `DrawCircleV(centro, raio, cor)` | Círculo com centro em `Vector2` |
  | `DrawCircleLines(centroX, centroY, raio, cor)` | Contorno do círculo |
  | `DrawLine(x1, y1, x2, y2, cor)` | Linha fina |
  | `DrawLineEx(inicio, fim, espessura, cor)` | Linha com espessura (`Vector2`) |
  | `DrawTriangle(v1, v2, v3, cor)` | Triângulo (`Vector2`), vértices em ordem **anti-horária** |
  | `DrawPoly(centro, lados, raio, rotacao, cor)` | Polígono regular |

  A ordem importa: o que é desenhado **depois** fica **por cima**. Desenhe o fundo primeiro e o texto da pontuação por último.

- **Texto**:
  - `DrawText(texto, x, y, tamanho, cor)`: escreve com a fonte padrão.
  - `TextFormat(formato, ...)`: monta um texto com variáveis, como o `printf` (`%d`, `%.1f`, `%s`). Ex.: `DrawText(TextFormat("Pontos: %d", pontos), 10, 10, 20, BLACK);`
    - O texto devolvido fica guardado num espaço temporário da raylib: use na hora, sem guardar o ponteiro para depois.
  - `MeasureText(texto, tamanho)`: largura do texto em pixels. Serve para **centralizar**: `x = (GetScreenWidth() - MeasureText(texto, 40)) / 2`.
  - Fontes de arquivo: `Font fonte = LoadFont("recursos/fonte.ttf");` (depois do `InitWindow`), `DrawTextEx(fonte, texto, posicao, tamanho, espacamento, cor)` e, no fim, `UnloadFont(fonte);`.
  - Acentos e "ç": a fonte padrão só tem os caracteres básicos (ASCII). Para acentuar, carregue uma fonte `.ttf` com `LoadFontEx` informando os caracteres, ou escreva sem acento nos textos do jogo.

### Erros comuns e pontos de atenção
- Passar `float` onde a função espera `int` (ou o contrário). `DrawRectangle` usa `int`; `DrawRectangleRec` e `DrawRectangleV` usam `float` dentro das structs. Para posições que se movem suavemente, guarde em `float` (`Vector2`) e use as versões `V`/`Rec`.
- Confundir o `x, y` do `Rectangle` (canto superior esquerdo) com o centro do objeto. No círculo, o `x, y` é o **centro**.
- Montar texto com `sprintf` num vetor pequeno demais. O `TextFormat` é mais simples para textos curtos.
- Desenhar o texto antes do fundo: o fundo cobre o texto.
- Esperar que `DrawText` mostre "ç" e acentos com a fonte padrão.
- Desenhar o triângulo com os vértices em ordem horária: ele não aparece.

### Perguntas socráticas sugeridas
- "Você quer que a pontuação apareça por cima do cenário. Em que ordem as duas coisas precisam ser desenhadas?"
- "Para centralizar um texto na tela, o que você precisa saber além da largura da janela?"
- "O `x, y` do seu retângulo é o centro ou o canto? Como isso muda o teste se ele saiu da tela?"
- "Que tipo de variável guarda melhor uma posição que anda 2,5 pixels por quadro: `int` ou `float`?"

### Referências oficiais
- Cheatsheet (seções *module: rshapes* e *module: rtext*): https://www.raylib.com/cheatsheet/cheatsheet.html
- Exemplos "shapes basic shapes", "shapes colors palette" e "text format text": https://www.raylib.com/examples.html

### Notas de revisão
- Na raylib 6.0, `DrawCircleGradient` passou a receber o centro como `Vector2` (`DrawCircleGradient(Vector2 center, float radius, Color inner, Color outer)`). Exemplos antigos na internet usam a versão com `int` e não compilam.
- Assinaturas conferidas no `raylib.h` da versão 6.2.

---

<!-- Material: Raylib_03_Teclado_Mouse_Controle.md -->
## Raylib 3 - Teclado, mouse e controle

- **Tópicos:** [teclado, IsKeyDown, IsKeyPressed, IsKeyReleased, KEY_SPACE, KEY_RIGHT, setas, wasd, mouse, GetMousePosition, IsMouseButtonPressed, MOUSE_BUTTON_LEFT, clique, botao, controle, gamepad, GetCharPressed, digitar nome]
- **Pré-requisitos:** ["Raylib 1 - Primeiros passos", "Aula 06 - Estrutura de Seleção if/else"]
- **Status:** verificado (funções e assinaturas conferidas no raylib.h da versão 6.2)

### Objetivo
Ler a entrada do jogador a cada quadro: teclas seguradas ou apertadas uma vez, posição e clique do mouse e controle (gamepad). Na raylib, **não se usa `scanf`** para jogar: a entrada é consultada dentro do laço do jogo.

### Conceitos-chave

- **Teclado**:

  | Função | Verdadeira quando... | Uso típico |
  |---|---|---|
  | `IsKeyDown(tecla)` | a tecla **está** pressionada (em todo quadro em que estiver segurada) | andar enquanto segura a seta |
  | `IsKeyPressed(tecla)` | a tecla **acabou** de ser apertada (só no primeiro quadro) | pular, atirar, pausar, escolher no menu |
  | `IsKeyReleased(tecla)` | a tecla acabou de ser solta | soltar o arco, parar de carregar |
  | `IsKeyUp(tecla)` | a tecla **não** está pressionada | |
  | `IsKeyPressedRepeat(tecla)` | a tecla continua apertada e o sistema repetiu (como ao segurar uma letra no editor) | andar num menu segurando a seta |

  - Nomes das teclas: `KEY_RIGHT`, `KEY_LEFT`, `KEY_UP`, `KEY_DOWN`, `KEY_SPACE`, `KEY_ENTER`, `KEY_ESCAPE`, `KEY_BACKSPACE`, `KEY_LEFT_SHIFT`, letras `KEY_A` ... `KEY_Z`, números `KEY_ZERO` ... `KEY_NINE`, `KEY_F1` ... `KEY_F12`.
  - Andar com as setas ou com W/A/S/D:
    ```c
    if (IsKeyDown(KEY_RIGHT) || IsKeyDown(KEY_D)) posicao.x += velocidade * GetFrameTime();
    if (IsKeyDown(KEY_LEFT)  || IsKeyDown(KEY_A)) posicao.x -= velocidade * GetFrameTime();
    ```
  - **Digitar texto** (nome do jogador no recorde): `GetCharPressed()` devolve o próximo caractere digitado (ou 0 se não houver). Chame num `while` até devolver 0, e trate `KEY_BACKSPACE` com `IsKeyPressed` para apagar.

- **Mouse**:

  | Função | O que devolve |
  |---|---|
  | `GetMousePosition()` | posição do mouse (`Vector2`) |
  | `GetMouseX()`, `GetMouseY()` | só o `x` ou só o `y` (`int`) |
  | `IsMouseButtonPressed(botao)` | clique acabou de acontecer |
  | `IsMouseButtonDown(botao)` | botão está sendo segurado (arrastar) |
  | `IsMouseButtonReleased(botao)` | botão acabou de ser solto |
  | `GetMouseWheelMove()` | quanto a rodinha girou (positivo ou negativo) |

  - Botões: `MOUSE_BUTTON_LEFT`, `MOUSE_BUTTON_RIGHT`, `MOUSE_BUTTON_MIDDLE`.
  - **Botão clicável** (menu): o clique está dentro do retângulo do botão?
    ```c
    Rectangle botaoJogar = { 300, 200, 200, 50 };
    bool emCima = CheckCollisionPointRec(GetMousePosition(), botaoJogar);
    if (emCima && IsMouseButtonPressed(MOUSE_BUTTON_LEFT)) { /* começar o jogo */ }
    DrawRectangleRec(botaoJogar, emCima ? SKYBLUE : LIGHTGRAY);
    ```

- **Controle (gamepad)**: os controles são numerados a partir de 0.
  - `IsGamepadAvailable(0)`: há um controle conectado?
  - `IsGamepadButtonPressed(0, GAMEPAD_BUTTON_RIGHT_FACE_DOWN)`: botão de baixo à direita (A no Xbox, X no PlayStation).
  - `GetGamepadAxisMovement(0, GAMEPAD_AXIS_LEFT_X)`: alavanca esquerda, de -1.0 (esquerda) a 1.0 (direita).
  - Sempre deixe o jogo funcionar também pelo teclado: nem todo computador do laboratório tem controle.

### Erros comuns e pontos de atenção
- Usar `IsKeyDown` para pular ou atirar: a ação se repete em todos os quadros enquanto a tecla está segurada (60 tiros por segundo). Para ações de "uma vez", use `IsKeyPressed`.
- Usar `IsKeyPressed` para andar: o personagem anda só um passo por toque.
- Ler a entrada com `scanf` ou `getchar` dentro do laço: o jogo trava esperando o terminal.
- Usar `if ... else if` entre as setas: o jogador não consegue andar na diagonal (seta para cima e para a direita ao mesmo tempo). Use `if` separados.
- Testar o clique com o `x, y` do mouse contra o centro do botão, em vez de usar `CheckCollisionPointRec` com o retângulo inteiro.
- Esquecer que **ESC** fecha o jogo por padrão (`WindowShouldClose`). Se ESC deve pausar, use `SetExitKey(KEY_NULL)` depois do `InitWindow`.
- Mover o personagem por um valor fixo por quadro sem `GetFrameTime()`: num computador mais lento, ele anda mais devagar (veja Raylib 4).

### Perguntas socráticas sugeridas
- "Quantas vezes por segundo o `if (IsKeyDown(KEY_SPACE))` é verdadeiro se o jogador segurar a tecla por 1 segundo, com o jogo a 60 FPS?"
- "Qual a diferença, para o jogador, entre `IsKeyDown` e `IsKeyPressed` na hora de pular?"
- "Com `else if` entre a seta para cima e a seta para a direita, o que acontece quando as duas estão apertadas?"
- "Como saber se o clique foi dentro do botão? Que informação do botão você precisa ter guardada?"

### Referências oficiais
- Cheatsheet (seção *module: rcore*, "Input-related functions"): https://www.raylib.com/cheatsheet/cheatsheet.html
- Exemplos "core input keys", "core input mouse", "core input gamepad" e "text input box": https://www.raylib.com/examples.html

### Notas de revisão
- Funções, nomes das teclas e dos botões conferidos no `raylib.h` da versão 6.2.

---

<!-- Material: Raylib_04_Movimento_Tempo_Colisao.md -->
## Raylib 4 - Movimento, tempo e colisões

- **Tópicos:** [movimento, mover, pular, quicar, sortear, velocidade, GetFrameTime, delta time, gravidade, pulo, GetTime, cronometro, temporizador, colisao, CheckCollisionRecs, CheckCollisionCircles, CheckCollisionCircleRec, CheckCollisionPointRec, limites da tela, GetRandomValue, aleatorio, raymath, Vector2Add, Clamp]
- **Pré-requisitos:** ["Raylib 3 - Teclado, mouse e controle", "Aula 04 - Operadores Aritméticos", "Aula 06 - Estrutura de Seleção if/else"]
- **Status:** verificado (funções e assinaturas conferidas no raylib.h e no raymath.h da versão 6.2)

### Objetivo
Fazer as coisas se moverem na mesma velocidade em qualquer computador, medir o tempo (cronômetros e intervalos), sortear valores e descobrir quando dois objetos se encostam.

### Conceitos-chave

- **Movimento com o tempo do quadro (delta time)**: `GetFrameTime()` devolve quantos **segundos** o último quadro levou (cerca de 0,0167 s a 60 FPS). Guardando a velocidade em **pixels por segundo**:
  ```c
  posicao.x += velocidade.x * GetFrameTime();   /* velocidade em pixels por segundo */
  ```
  Assim o objeto anda a mesma distância por segundo, seja o jogo a 30 ou a 144 FPS.

- **Gravidade e pulo** (física simples): a gravidade muda a **velocidade**, e a velocidade muda a **posição**.
  ```c
  velocidadeY += GRAVIDADE * GetFrameTime();    /* ex.: GRAVIDADE = 900.0f (pixels/s²) */
  posicaoY    += velocidadeY * GetFrameTime();
  ```
  Para pular, dá-se uma velocidade negativa (para cima, já que o `y` cresce para baixo), só se o personagem estiver no chão.

- **Limites da tela**: depois de mover, confira se saiu e traga de volta (ou faça quicar, invertendo o sinal da velocidade).
  - Com a raymath (`#include "raymath.h"`, vem junto da raylib): `posicao.x = Clamp(posicao.x, 0, GetScreenWidth() - largura);`

- **Tempo**:
  - `GetTime()`: segundos (`double`) desde o `InitWindow`. Bom para cronômetros: guarde o instante de início e subtraia.
  - **Temporizador** (ex.: um inimigo novo a cada 2 segundos): some `GetFrameTime()` numa variável e, quando passar do intervalo, faça a ação e zere (ou subtraia o intervalo).

- **Sorteio**: `GetRandomValue(minimo, maximo)` devolve um `int` entre os dois, **incluindo** os dois. Não precisa de `srand`/`rand`. Para repetir a mesma sequência (testes), use `SetRandomSeed(semente)`.

- **Colisões** (devolvem `bool`):

  | Função | Testa se... |
  |---|---|
  | `CheckCollisionRecs(ret1, ret2)` | dois retângulos se encostam |
  | `CheckCollisionCircles(centro1, raio1, centro2, raio2)` | dois círculos se encostam |
  | `CheckCollisionCircleRec(centro, raio, ret)` | um círculo encosta num retângulo |
  | `CheckCollisionPointRec(ponto, ret)` | um ponto (ex.: o mouse) está dentro do retângulo |
  | `CheckCollisionPointCircle(ponto, centro, raio)` | um ponto está dentro do círculo |
  | `GetCollisionRec(ret1, ret2)` | devolve o retângulo da área em comum (para empurrar o objeto para fora) |

  A colisão é testada na **atualização**, depois de mover, e antes de desenhar.

- **Vetores com a raymath** (`#include "raymath.h"`): `Vector2Add(a, b)`, `Vector2Subtract(a, b)`, `Vector2Scale(v, fator)`, `Vector2Length(v)`, `Vector2Normalize(v)` (mesma direção, tamanho 1), `Vector2Distance(a, b)`, `Clamp(valor, minimo, maximo)`, `Lerp(inicio, fim, quanto)`. Ex.: para um inimigo seguir o jogador, normalize o vetor `jogador - inimigo` e multiplique pela velocidade.

### Erros comuns e pontos de atenção
- Somar uma velocidade fixa por quadro (`x += 5;`) e depois estranhar que o jogo fica mais rápido ou mais lento em outro computador.
- Guardar posições em `int` e multiplicar por `GetFrameTime()`: `5 * 0.016` vira 0 ao guardar em `int`, e o objeto não anda (lembre da Aula 04: conversão de tipos).
- Testar a colisão **antes** de mover: o objeto entra na parede por um quadro.
- Usar o `x, y` do retângulo como se fosse o centro ao comparar com um círculo.
- `GetRandomValue(0, 10)` pode devolver o próprio 10 (os dois limites entram). Para escolher uma posição num vetor de 10 elementos, use `GetRandomValue(0, 9)`.
- Usar `GetTime()` (que só cresce) como se fosse "tempo desde o último evento", sem guardar o instante de início.
- Esquecer o `#include "raymath.h"` ao usar `Vector2Add` ou `Clamp`.
- Pular no ar várias vezes: falta testar se o personagem está no chão antes de aplicar o pulo.

### Perguntas socráticas sugeridas
- "Se o jogo cair de 60 para 30 FPS, quantas vezes por segundo o `x += 5;` executa? E a distância percorrida em 1 segundo?"
- "Qual é a unidade da sua velocidade: pixels por quadro ou pixels por segundo? Como o `GetFrameTime()` converte uma na outra?"
- "Em que momento do quadro você testa a colisão: antes ou depois de mover? O que muda?"
- "Como você sabe que o personagem está no chão? Que condição precisa ser verdadeira para ele poder pular?"
- "`GetRandomValue(1, 6)` simula um dado? Quais valores ele pode devolver?"

### Referências oficiais
- Cheatsheet (seções *module: rshapes*, "Basic shapes collision detection functions", e *module: rcore*, "Timing-related functions"): https://www.raylib.com/cheatsheet/cheatsheet.html
- Exemplos "shapes collision area", "core 2d camera platformer" e "shapes bouncing ball": https://www.raylib.com/examples.html

### Notas de revisão
- Assinaturas conferidas no `raylib.h` e no `raymath.h` da versão 6.2.
- Na raylib 6.0, o `GetRandomValue` foi corrigido para sortear todos os valores com a mesma chance (antes havia um pequeno viés).

---

<!-- Material: Raylib_05_Imagens_e_Sons.md -->
## Raylib 5 - Imagens, sprites e sons

- **Tópicos:** [textura, sons, efeito sonoro, Texture2D, LoadTexture, DrawTexture, DrawTextureEx, DrawTextureRec, DrawTexturePro, sprite, sprite sheet, animacao, imagem, png, UnloadTexture, audio, InitAudioDevice, LoadSound, PlaySound, musica, LoadMusicStream, UpdateMusicStream, recursos, assets, caminho do arquivo]
- **Pré-requisitos:** ["Raylib 2 - Desenho, cores e texto", "Aula 21 - Arquivos"]
- **Status:** verificado (funções e assinaturas conferidas no raylib.h da versão 6.2)

### Objetivo
Carregar imagens (texturas) e sons de arquivos, desenhar sprites e animações, tocar efeitos sonoros e música, e liberar tudo no fim.

### Conceitos-chave

- **Regra de ouro dos recursos**: **carregar uma vez** (depois do `InitWindow`, antes do laço), **usar no laço** e **descarregar no fim** (antes do `CloseWindow`).
  ```c
  InitWindow(800, 450, "Jogo");
  Texture2D nave = LoadTexture("recursos/nave.png");   /* uma vez, fora do laço */

  while (!WindowShouldClose())
  {
      BeginDrawing();
          ClearBackground(BLACK);
          DrawTexture(nave, 100, 200, WHITE);           /* WHITE = sem mudar as cores */
      EndDrawing();
  }

  UnloadTexture(nave);
  CloseWindow();
  ```

- **Texturas** (`Texture2D`, com os campos `width` e `height`):

  | Função | Desenha |
  |---|---|
  | `DrawTexture(textura, x, y, tinta)` | a imagem inteira na posição |
  | `DrawTextureV(textura, posicao, tinta)` | idem, com `Vector2` |
  | `DrawTextureEx(textura, posicao, rotacao, escala, tinta)` | com rotação (graus) e escala (1.0 = tamanho original) |
  | `DrawTextureRec(textura, origem, posicao, tinta)` | só um **pedaço** da imagem (`Rectangle origem`) |
  | `DrawTexturePro(textura, origem, destino, pivo, rotacao, tinta)` | pedaço da imagem esticado para o retângulo `destino`, girando em volta do `pivo` |

  - A **tinta** multiplica as cores: `WHITE` mantém a imagem; `RED` deixa avermelhada; `Fade(WHITE, 0.5f)` deixa meio transparente.
  - Virar a imagem (personagem olhando para o outro lado): no `DrawTextureRec`/`DrawTexturePro`, use a **largura negativa** no retângulo de origem.
  - `IsTextureValid(textura)` diz se a imagem foi carregada.

- **Sprite sheet e animação**: uma imagem com vários quadros lado a lado. A cada intervalo de tempo, avança o quadro e desenha só o pedaço dele:
  ```c
  /* imagem com 6 quadros lado a lado */
  float larguraDoQuadro = (float)personagem.width / 6;
  Rectangle pedaco = { quadroAtual * larguraDoQuadro, 0, larguraDoQuadro, (float)personagem.height };
  DrawTextureRec(personagem, pedaco, posicao, WHITE);
  ```
  O `quadroAtual` avança com um temporizador (veja Raylib 4) e volta a 0 depois do último.

- **Formatos**: PNG é o mais seguro para imagens (aceita transparência). Para sons, WAV, OGG e MP3 funcionam.

- **Sons**: o áudio precisa ser iniciado antes de carregar qualquer som.
  ```c
  InitAudioDevice();                              /* depois do InitWindow */
  Sound pulo = LoadSound("recursos/pulo.wav");
  Music trilha = LoadMusicStream("recursos/trilha.ogg");
  PlayMusicStream(trilha);

  /* no laço: */
  UpdateMusicStream(trilha);                      /* todo quadro, senão a música para */
  if (IsKeyPressed(KEY_SPACE)) PlaySound(pulo);

  /* no fim: */
  UnloadSound(pulo);
  UnloadMusicStream(trilha);
  CloseAudioDevice();
  ```
  - `Sound` é para efeitos curtos (carregado inteiro na memória). `Music` é para trilhas longas (lida aos poucos do arquivo).
  - Outras funções: `StopSound`, `IsSoundPlaying`, `SetSoundVolume(som, 0.5f)`, `PauseMusicStream`, `ResumeMusicStream`, `StopMusicStream`, `SetMusicVolume`, `IsMusicStreamPlaying`.

- **Onde ficam os arquivos (caminho)**: um caminho como `"recursos/nave.png"` é relativo à **pasta de onde o jogo foi executado**, não à pasta do `.c`.
  - Organize assim: `jogo.c`, `jogo.exe` e a pasta `recursos/` juntos.
  - O botão **▶ Compilar e rodar o jogo** do painel do tutor executa o jogo na pasta do arquivo `.c`.
  - Para o jogo achar os arquivos de qualquer lugar: `ChangeDirectory(GetApplicationDirectory());` logo depois do `InitWindow`.
  - Se um arquivo não for encontrado, a raylib escreve um aviso no terminal (`WARNING: FILEIO: [recursos/nave.png] Failed to open file`) e a imagem não aparece.

### Erros comuns e pontos de atenção
- Carregar a textura **dentro do laço**: a cada quadro uma cópia nova vai para a memória da placa de vídeo; o jogo fica lento e pode travar.
- Carregar a textura **antes** do `InitWindow`: ela não é carregada.
- Esquecer o `UpdateMusicStream` no laço: a música toca um pedacinho e para.
- Carregar sons antes do `InitAudioDevice()`.
- Imagem que não aparece: caminho errado (confira o aviso no terminal), maiúsculas e minúsculas no nome, ou o jogo foi executado de outra pasta.
- Usar `BLACK` como tinta e a imagem ficar toda preta. A tinta "normal" é `WHITE`.
- Calcular a largura do quadro do sprite com divisão inteira (`personagem.width / 6` em `int`) e o quadro sair cortado.
- Não descarregar (`Unload...`) o que foi carregado.

### Perguntas socráticas sugeridas
- "Quantas vezes o `LoadTexture` executa se ele estiver dentro do `while`? E quantas imagens vão parar na memória?"
- "O caminho `recursos/nave.png` é procurado a partir de qual pasta? De onde o seu jogo está sendo executado?"
- "Para mostrar o terceiro quadro do sprite sheet, qual é o `x` do pedaço que você recorta?"
- "Qual a diferença entre um `Sound` e uma `Music`? Qual você usaria para o som do pulo?"

### Referências oficiais
- Cheatsheet (seções *module: rtextures* e *module: raudio*): https://www.raylib.com/cheatsheet/cheatsheet.html
- Exemplos "textures logo raylib", "textures sprite anim", "audio sound loading" e "audio music stream": https://www.raylib.com/examples.html

### Notas de revisão
- Exemplos antigos na internet usam `IsTextureReady`; na raylib 6.2 o nome é `IsTextureValid`.
- Na raylib 6.0, `SetSoundPan` e `SetMusicPan` passaram a usar a faixa de -1.0 a 1.0.
- Assinaturas conferidas no `raylib.h` da versão 6.2.

---

<!-- Material: Raylib_06_Organizando_o_Jogo.md -->
## Raylib 6 - Organizando o jogo

- **Tópicos:** [estado do jogo, menu, game over, pausa, enum, switch, struct, entidades, inimigos, vetor de structs, ativo, funcoes atualizar desenhar, varios arquivos, header, recorde, salvar pontuacao, SaveFileText, LoadFileText, Camera2D, BeginMode2D, fases]
- **Pré-requisitos:** ["Raylib 1 - Primeiros passos", "Aula 11 - Vetores", "Aula 14 - Registros (struct)", "Aula 15 - Union e Enum", "Aula 16 - Funções", "Aula 21 - Arquivos"]
- **Status:** verificado (funções e assinaturas conferidas no raylib.h da versão 6.2)

### Objetivo
Organizar um jogo maior usando o que foi visto em Fundamentos 1: `enum` para as telas (menu, jogo, fim), `struct` para o jogador e os inimigos, vetores de structs, funções separadas para atualizar e desenhar, vários arquivos `.c`, recorde salvo em arquivo e câmera 2D.

### Conceitos-chave

- **Estados (telas) do jogo com `enum` e `switch`** (Aulas 07 e 15): o jogo está sempre em **uma** tela, e cada tela tem a sua atualização e o seu desenho.
  ```c
  typedef enum { TELA_MENU, TELA_JOGANDO, TELA_PAUSA, TELA_FIM } Tela;

  Tela telaAtual = TELA_MENU;
  /* no laço, na parte de atualizar: */
  switch (telaAtual)
  {
      case TELA_MENU:
          if (IsKeyPressed(KEY_ENTER)) telaAtual = TELA_JOGANDO;
          break;
      case TELA_JOGANDO:
          /* mover, colidir, pontuar */
          if (IsKeyPressed(KEY_P)) telaAtual = TELA_PAUSA;
          break;
      /* ... */
  }
  ```
  O desenho usa outro `switch (telaAtual)` dentro do `BeginDrawing`/`EndDrawing`.

- **Entidades com `struct`** (Aula 14): junte tudo o que descreve um objeto.
  ```c
  typedef struct {
      Vector2 posicao;
      Vector2 velocidade;
      float raio;
      bool ativo;        /* false = posição livre no vetor */
  } Inimigo;
  ```

- **Vários objetos com vetor de structs** (Aula 11): tamanho máximo fixo com `#define`, e o campo `ativo` diz quais posições estão em uso.
  - Criar (tiro, inimigo novo): procurar a primeira posição com `ativo == false`, preencher e marcar `ativo = true`.
  - Remover (inimigo destruído, tiro que saiu da tela): só marcar `ativo = false`.
  - Atualizar e desenhar: percorrer o vetor com `for` e pular os inativos.
  - Para colidir "todos os tiros com todos os inimigos", são dois `for` aninhados (Aula 10).

- **Funções para cada parte** (Aula 16): a `main` fica curta e fácil de ler.
  - Ex.: `void IniciarJogo(Jogo *jogo)`, `void AtualizarJogo(Jogo *jogo, float dt)`, `void DesenharJogo(const Jogo *jogo)`.
  - Passe a struct por **ponteiro** quando a função precisar alterar os dados (Aula 17/19). Juntar o estado todo numa `struct Jogo` evita variáveis globais.
  - Comente cada função com Doxygen (`\brief`, `\param`, `\return`), como pede a disciplina.

- **Vários arquivos** (projetos maiores): `jogador.h` com a struct e os protótipos, `jogador.c` com as funções, `main.c` com o laço.
  - No `.h`, proteja contra inclusão dupla: `#ifndef JOGADOR_H` / `#define JOGADOR_H` / ... / `#endif`.
  - Compile todos os `.c` juntos: `gcc main.c jogador.c inimigos.c -o jogo.exe -lraylib -lopengl32 -lgdi32 -lwinmm`. O botão **▶ Compilar e rodar o jogo** do painel junta os outros `.c` da pasta que não têm `main`.

- **Recorde em arquivo** (Aula 21): com `fopen`/`fprintf`/`fscanf`, como na Aula 21, ou com as funções da raylib:
  - `SaveFileText("recorde.txt", TextFormat("%d", recorde))` devolve `true` se salvou.
  - `char *texto = LoadFileText("recorde.txt");` devolve o conteúdo (ou `NULL` se o arquivo não existe); converta com `atoi` (Aula 16) e libere com `UnloadFileText(texto)`.
  - `FileExists("recorde.txt")` diz se o arquivo já existe.

- **Câmera 2D** (mundo maior que a tela, como num jogo de plataforma):
  ```c
  Camera2D camera = { 0 };
  camera.offset = (Vector2){ GetScreenWidth() / 2.0f, GetScreenHeight() / 2.0f };   /* ponto da tela */
  camera.target = jogador.posicao;                                                  /* ponto do mundo que fica nele */
  camera.zoom = 1.0f;                                                               /* nunca 0 */

  BeginDrawing();
      ClearBackground(SKYBLUE);
      BeginMode2D(camera);
          /* cenário e personagens, em coordenadas do mundo */
      EndMode2D();
      /* pontuação e menus, em coordenadas da tela (fora da câmera) */
  EndDrawing();
  ```
  Atualize `camera.target` a cada quadro para a câmera seguir o jogador.

- **Planejar antes de programar**: liste as telas, as entidades (e os campos de cada uma), as regras (o que acontece quando duas coisas colidem) e as teclas. Faça uma versão mínima jogável primeiro (um quadrado que anda e colide) e depois acrescente imagens, sons e fases.

### Erros comuns e pontos de atenção
- Uma `main` gigante com tudo dentro: difícil de achar erros. Separe em funções desde o começo.
- Esquecer o `break` no `switch` dos estados: o jogo "cai" na tela seguinte no mesmo quadro (Aula 07).
- Remover um elemento do vetor "deslocando" todos os outros dentro do mesmo `for` que o percorre: pula elementos. O campo `ativo` evita isso.
- Percorrer o vetor até `<= MAX_INIMIGOS`: acesso fora do vetor (Aula 11).
- Passar a struct por valor para uma função que deveria alterá-la: as mudanças se perdem (Aula 16/17).
- Variáveis globais para tudo: funcionam, mas deixam o código difícil de entender e de testar.
- Desenhar a pontuação dentro do `BeginMode2D`: ela anda junto com a câmera.
- `camera.zoom` igual a 0 (ao esquecer de preencher): nada aparece.
- Ler o recorde sem conferir se o arquivo existe (`NULL`).
- Colocar `#include` de um `.c` em outro, em vez de usar `.h` com protótipos e compilar os `.c` juntos.

### Perguntas socráticas sugeridas
- "Quais telas o seu jogo tem? O que o jogador pode fazer em cada uma e o que faz trocar de tela?"
- "Que informações descrevem um inimigo do seu jogo? Quais delas mudam a cada quadro?"
- "Se um inimigo é destruído no meio do vetor, como os outros continuam sendo percorridos certinho?"
- "Essa função precisa mudar o jogador ou só ler os dados dele? Como isso muda o jeito de passar a struct?"
- "A pontuação deve andar junto com a câmera? Então ela fica dentro ou fora do `BeginMode2D`?"
- "Qual é a menor versão do seu jogo que já dá para jogar? O que fica para depois?"

### Referências oficiais
- Cheatsheet: https://www.raylib.com/cheatsheet/cheatsheet.html
- Exemplos "core basic screen manager", "core 2d camera" e "core 2d camera platformer", e os jogos de exemplo em https://www.raylib.com/games.html
- Exemplos de jogos completos com código aberto para estudar (não para copiar no projeto): https://github.com/raysan5/raylib-games

### Notas de revisão
- Na raylib 6.2, as funções de arquivo (`SaveFileText` e outras) foram revisadas para devolver o resultado de forma padronizada: `SaveFileText` devolve `true` em caso de sucesso.
- Assinaturas conferidas no `raylib.h` da versão 6.2.

---

<!-- Material: Raylib_07_Compilacao_e_Makefile.md -->
## Raylib 7 - Compilação manual e Makefile

- **Tópicos:** [compilar no terminal, compilacao manual, gcc, makefile, make, mingw32-make, arquivo objeto, ligacao, linker, missing separator, no rule to make target, make clean, make run, CFLAGS, LDLIBS, varios arquivos]
- **Pré-requisitos:** ["Raylib 1 - Primeiros passos", "Raylib 6 - Organizando o jogo"]
- **Status:** verificado (comandos e Makefile modelo testados no PowerShell e no bash, com projeto em dois arquivos)

### Objetivo
Compilar o jogo no terminal, sem botões, entendendo cada etapa, e escrever o **Makefile** do projeto (requisito do projeto final): um arquivo com as regras para compilar tudo com um comando só, `make`.

### Conceitos-chave

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

### Erros comuns e pontos de atenção
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

### Perguntas socráticas sugeridas
- "O que o `-c` muda no comando? O arquivo gerado já pode ser executado?"
- "Se só o `jogador.c` mudou, quais comandos precisam rodar de novo? Como o `make` descobre isso?"
- "A mensagem é `missing separator`. Com que caractere a linha do comando deveria começar?"
- "Você criou o arquivo `inimigos.c`. O que precisa mudar no Makefile para ele entrar no jogo?"
- "O erro é `undefined reference`. Ele aconteceu ao compilar um `.c` ou ao ligar os `.o`? Em que regra do Makefile está esse comando?"
- "Por que o `clean` está no `.PHONY`? O que aconteceria se existisse um arquivo chamado `clean` na pasta?"

### Referências oficiais
- Manual do GNU Make (em inglês): https://www.gnu.org/software/make/manual/make.html
- Opções do GCC (em inglês): https://gcc.gnu.org/onlinedocs/gcc/Invoking-GCC.html
- Exemplo de Makefile do modelo de projeto oficial da raylib: https://github.com/raysan5/raylib-game-template

### Notas de revisão
- O Makefile modelo foi testado com GNU Make 4.4.1 (`mingw32-make`), GCC 15 e a raylib 6.2, num projeto com dois `.c` e um `.h`, no PowerShell e no bash. Verificado: compilação inicial, recompilação só do arquivo alterado, recompilação ao mudar o `.h`, `make run` e `make clean` nos dois terminais.
- O pacote `mingw-w64-ucrt-x86_64-make` do MSYS2 (versão 4.4.1) instala o comando `mingw32-make.exe`.
