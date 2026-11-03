---
titulo: "Raylib 5 - Imagens, sprites e sons"
numero_aula: 105
disciplina: "Fundamentos de Programação 2 (Engenharia de Computação) - Projeto final"
topicos: [textura, sons, efeito sonoro, Texture2D, LoadTexture, DrawTexture, DrawTextureEx, DrawTextureRec, DrawTexturePro, sprite, sprite sheet, animacao, imagem, png, UnloadTexture, audio, InitAudioDevice, LoadSound, PlaySound, musica, LoadMusicStream, UpdateMusicStream, recursos, assets, caminho do arquivo]
pre_requisitos: ["Raylib 2 - Desenho, cores e texto", "Aula 21 - Arquivos"]
fonte_original: "raylib.h da raylib 6.2 (github.com/raysan5/raylib) e cheatsheet oficial (raylib.com/cheatsheet)"
revisado_em: 2026-11-03
status: verificado (funções e assinaturas conferidas no raylib.h da versão 6.2)
---

# Raylib 5 - Imagens, sprites e sons

## Objetivo
Carregar imagens (texturas) e sons de arquivos, desenhar sprites e animações, tocar efeitos sonoros e música, e liberar tudo no fim.

## Conceitos-chave

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

## Erros comuns e pontos de atenção
- Carregar a textura **dentro do laço**: a cada quadro uma cópia nova vai para a memória da placa de vídeo; o jogo fica lento e pode travar.
- Carregar a textura **antes** do `InitWindow`: ela não é carregada.
- Esquecer o `UpdateMusicStream` no laço: a música toca um pedacinho e para.
- Carregar sons antes do `InitAudioDevice()`.
- Imagem que não aparece: caminho errado (confira o aviso no terminal), maiúsculas e minúsculas no nome, ou o jogo foi executado de outra pasta.
- Usar `BLACK` como tinta e a imagem ficar toda preta. A tinta "normal" é `WHITE`.
- Calcular a largura do quadro do sprite com divisão inteira (`personagem.width / 6` em `int`) e o quadro sair cortado.
- Não descarregar (`Unload...`) o que foi carregado.

## Perguntas socráticas sugeridas
- "Quantas vezes o `LoadTexture` executa se ele estiver dentro do `while`? E quantas imagens vão parar na memória?"
- "O caminho `recursos/nave.png` é procurado a partir de qual pasta? De onde o seu jogo está sendo executado?"
- "Para mostrar o terceiro quadro do sprite sheet, qual é o `x` do pedaço que você recorta?"
- "Qual a diferença entre um `Sound` e uma `Music`? Qual você usaria para o som do pulo?"

## Referências oficiais
- Cheatsheet (seções *module: rtextures* e *module: raudio*): https://www.raylib.com/cheatsheet/cheatsheet.html
- Exemplos "textures logo raylib", "textures sprite anim", "audio sound loading" e "audio music stream": https://www.raylib.com/examples.html

## Notas de revisão
- Exemplos antigos na internet usam `IsTextureReady`; na raylib 6.2 o nome é `IsTextureValid`.
- Na raylib 6.0, `SetSoundPan` e `SetMusicPan` passaram a usar a faixa de -1.0 a 1.0.
- Assinaturas conferidas no `raylib.h` da versão 6.2.
