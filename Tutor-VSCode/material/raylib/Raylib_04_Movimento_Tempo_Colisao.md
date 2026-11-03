---
titulo: "Raylib 4 - Movimento, tempo e colisões"
numero_aula: 104
disciplina: "Fundamentos de Programação 2 (Engenharia de Computação) - Projeto final"
topicos: [movimento, mover, pular, quicar, sortear, velocidade, GetFrameTime, delta time, gravidade, pulo, GetTime, cronometro, temporizador, colisao, CheckCollisionRecs, CheckCollisionCircles, CheckCollisionCircleRec, CheckCollisionPointRec, limites da tela, GetRandomValue, aleatorio, raymath, Vector2Add, Clamp]
pre_requisitos: ["Raylib 3 - Teclado, mouse e controle", "Aula 04 - Operadores Aritméticos", "Aula 06 - Estrutura de Seleção if/else"]
fonte_original: "raylib.h e raymath.h da raylib 6.2 (github.com/raysan5/raylib) e cheatsheet oficial (raylib.com/cheatsheet)"
revisado_em: 2026-11-03
status: verificado (funções e assinaturas conferidas no raylib.h e no raymath.h da versão 6.2)
---

# Raylib 4 - Movimento, tempo e colisões

## Objetivo
Fazer as coisas se moverem na mesma velocidade em qualquer computador, medir o tempo (cronômetros e intervalos), sortear valores e descobrir quando dois objetos se encostam.

## Conceitos-chave

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

## Erros comuns e pontos de atenção
- Somar uma velocidade fixa por quadro (`x += 5;`) e depois estranhar que o jogo fica mais rápido ou mais lento em outro computador.
- Guardar posições em `int` e multiplicar por `GetFrameTime()`: `5 * 0.016` vira 0 ao guardar em `int`, e o objeto não anda (lembre da Aula 04: conversão de tipos).
- Testar a colisão **antes** de mover: o objeto entra na parede por um quadro.
- Usar o `x, y` do retângulo como se fosse o centro ao comparar com um círculo.
- `GetRandomValue(0, 10)` pode devolver o próprio 10 (os dois limites entram). Para escolher uma posição num vetor de 10 elementos, use `GetRandomValue(0, 9)`.
- Usar `GetTime()` (que só cresce) como se fosse "tempo desde o último evento", sem guardar o instante de início.
- Esquecer o `#include "raymath.h"` ao usar `Vector2Add` ou `Clamp`.
- Pular no ar várias vezes: falta testar se o personagem está no chão antes de aplicar o pulo.

## Perguntas socráticas sugeridas
- "Se o jogo cair de 60 para 30 FPS, quantas vezes por segundo o `x += 5;` executa? E a distância percorrida em 1 segundo?"
- "Qual é a unidade da sua velocidade: pixels por quadro ou pixels por segundo? Como o `GetFrameTime()` converte uma na outra?"
- "Em que momento do quadro você testa a colisão: antes ou depois de mover? O que muda?"
- "Como você sabe que o personagem está no chão? Que condição precisa ser verdadeira para ele poder pular?"
- "`GetRandomValue(1, 6)` simula um dado? Quais valores ele pode devolver?"

## Referências oficiais
- Cheatsheet (seções *module: rshapes*, "Basic shapes collision detection functions", e *module: rcore*, "Timing-related functions"): https://www.raylib.com/cheatsheet/cheatsheet.html
- Exemplos "shapes collision area", "core 2d camera platformer" e "shapes bouncing ball": https://www.raylib.com/examples.html

## Notas de revisão
- Assinaturas conferidas no `raylib.h` e no `raymath.h` da versão 6.2.
- Na raylib 6.0, o `GetRandomValue` foi corrigido para sortear todos os valores com a mesma chance (antes havia um pequeno viés).
