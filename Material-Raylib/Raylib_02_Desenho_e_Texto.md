---
titulo: "Raylib 2 - Desenho, cores e texto"
numero_aula: 102
disciplina: "Fundamentos de Programação 2 (Engenharia de Computação) - Projeto final"
topicos: [desenhar, texto, pontuacao, placar, mostrar na tela, forma, DrawRectangle, DrawCircle, DrawLine, DrawTriangle, Color, cores, Vector2, Rectangle, DrawText, TextFormat, MeasureText, fonte, LoadFont, DrawTextEx, transparencia, Fade]
pre_requisitos: ["Raylib 1 - Primeiros passos", "Aula 14 - Registros (struct)"]
fonte_original: "raylib.h da raylib 6.2 (github.com/raysan5/raylib) e cheatsheet oficial (raylib.com/cheatsheet)"
revisado_em: 2026-11-03
status: verificado (funções e assinaturas conferidas no raylib.h da versão 6.2)
---

# Raylib 2 - Desenho, cores e texto

## Objetivo
Desenhar formas, usar cores e escrever textos na tela, inclusive com o valor de variáveis (pontuação, vidas, tempo). Conhecer as structs básicas da raylib: `Color`, `Vector2` e `Rectangle`.

## Conceitos-chave

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

## Erros comuns e pontos de atenção
- Passar `float` onde a função espera `int` (ou o contrário). `DrawRectangle` usa `int`; `DrawRectangleRec` e `DrawRectangleV` usam `float` dentro das structs. Para posições que se movem suavemente, guarde em `float` (`Vector2`) e use as versões `V`/`Rec`.
- Confundir o `x, y` do `Rectangle` (canto superior esquerdo) com o centro do objeto. No círculo, o `x, y` é o **centro**.
- Montar texto com `sprintf` num vetor pequeno demais. O `TextFormat` é mais simples para textos curtos.
- Desenhar o texto antes do fundo: o fundo cobre o texto.
- Esperar que `DrawText` mostre "ç" e acentos com a fonte padrão.
- Desenhar o triângulo com os vértices em ordem horária: ele não aparece.

## Perguntas socráticas sugeridas
- "Você quer que a pontuação apareça por cima do cenário. Em que ordem as duas coisas precisam ser desenhadas?"
- "Para centralizar um texto na tela, o que você precisa saber além da largura da janela?"
- "O `x, y` do seu retângulo é o centro ou o canto? Como isso muda o teste se ele saiu da tela?"
- "Que tipo de variável guarda melhor uma posição que anda 2,5 pixels por quadro: `int` ou `float`?"

## Referências oficiais
- Cheatsheet (seções *module: rshapes* e *module: rtext*): https://www.raylib.com/cheatsheet/cheatsheet.html
- Exemplos "shapes basic shapes", "shapes colors palette" e "text format text": https://www.raylib.com/examples.html

## Notas de revisão
- Na raylib 6.0, `DrawCircleGradient` passou a receber o centro como `Vector2` (`DrawCircleGradient(Vector2 center, float radius, Color inner, Color outer)`). Exemplos antigos na internet usam a versão com `int` e não compilam.
- Assinaturas conferidas no `raylib.h` da versão 6.2.
