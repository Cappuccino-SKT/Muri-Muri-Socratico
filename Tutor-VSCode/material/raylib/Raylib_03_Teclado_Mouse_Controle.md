---
titulo: "Raylib 3 - Teclado, mouse e controle"
numero_aula: 103
disciplina: "Fundamentos de Programação 2 (Engenharia de Computação) - Projeto final"
topicos: [teclado, IsKeyDown, IsKeyPressed, IsKeyReleased, KEY_SPACE, KEY_RIGHT, setas, wasd, mouse, GetMousePosition, IsMouseButtonPressed, MOUSE_BUTTON_LEFT, clique, botao, controle, gamepad, GetCharPressed, digitar nome]
pre_requisitos: ["Raylib 1 - Primeiros passos", "Aula 06 - Estrutura de Seleção if/else"]
fonte_original: "raylib.h da raylib 6.2 (github.com/raysan5/raylib) e cheatsheet oficial (raylib.com/cheatsheet)"
revisado_em: 2026-11-03
status: verificado (funções e assinaturas conferidas no raylib.h da versão 6.2)
---

# Raylib 3 - Teclado, mouse e controle

## Objetivo
Ler a entrada do jogador a cada quadro: teclas seguradas ou apertadas uma vez, posição e clique do mouse e controle (gamepad). Na raylib, **não se usa `scanf`** para jogar: a entrada é consultada dentro do laço do jogo.

## Conceitos-chave

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

## Erros comuns e pontos de atenção
- Usar `IsKeyDown` para pular ou atirar: a ação se repete em todos os quadros enquanto a tecla está segurada (60 tiros por segundo). Para ações de "uma vez", use `IsKeyPressed`.
- Usar `IsKeyPressed` para andar: o personagem anda só um passo por toque.
- Ler a entrada com `scanf` ou `getchar` dentro do laço: o jogo trava esperando o terminal.
- Usar `if ... else if` entre as setas: o jogador não consegue andar na diagonal (seta para cima e para a direita ao mesmo tempo). Use `if` separados.
- Testar o clique com o `x, y` do mouse contra o centro do botão, em vez de usar `CheckCollisionPointRec` com o retângulo inteiro.
- Esquecer que **ESC** fecha o jogo por padrão (`WindowShouldClose`). Se ESC deve pausar, use `SetExitKey(KEY_NULL)` depois do `InitWindow`.
- Mover o personagem por um valor fixo por quadro sem `GetFrameTime()`: num computador mais lento, ele anda mais devagar (veja Raylib 4).

## Perguntas socráticas sugeridas
- "Quantas vezes por segundo o `if (IsKeyDown(KEY_SPACE))` é verdadeiro se o jogador segurar a tecla por 1 segundo, com o jogo a 60 FPS?"
- "Qual a diferença, para o jogador, entre `IsKeyDown` e `IsKeyPressed` na hora de pular?"
- "Com `else if` entre a seta para cima e a seta para a direita, o que acontece quando as duas estão apertadas?"
- "Como saber se o clique foi dentro do botão? Que informação do botão você precisa ter guardada?"

## Referências oficiais
- Cheatsheet (seção *module: rcore*, "Input-related functions"): https://www.raylib.com/cheatsheet/cheatsheet.html
- Exemplos "core input keys", "core input mouse", "core input gamepad" e "text input box": https://www.raylib.com/examples.html

## Notas de revisão
- Funções, nomes das teclas e dos botões conferidos no `raylib.h` da versão 6.2.
