---
titulo: "Raylib 6 - Organizando o jogo"
numero_aula: 106
disciplina: "Fundamentos de Programação 2 (Engenharia de Computação) - Projeto final"
topicos: [estado do jogo, menu, game over, pausa, enum, switch, struct, entidades, inimigos, vetor de structs, ativo, funcoes atualizar desenhar, varios arquivos, header, recorde, salvar pontuacao, SaveFileText, LoadFileText, Camera2D, BeginMode2D, fases]
pre_requisitos: ["Raylib 1 - Primeiros passos", "Aula 11 - Vetores", "Aula 14 - Registros (struct)", "Aula 15 - Union e Enum", "Aula 16 - Funções", "Aula 21 - Arquivos"]
fonte_original: "raylib.h da raylib 6.2 (github.com/raysan5/raylib), cheatsheet oficial (raylib.com/cheatsheet) e material das Aulas 11, 14, 15, 16 e 21"
revisado_em: 2026-11-03
status: verificado (funções e assinaturas conferidas no raylib.h da versão 6.2)
---

# Raylib 6 - Organizando o jogo

## Objetivo
Organizar um jogo maior usando o que foi visto em Fundamentos 1: `enum` para as telas (menu, jogo, fim), `struct` para o jogador e os inimigos, vetores de structs, funções separadas para atualizar e desenhar, vários arquivos `.c`, recorde salvo em arquivo e câmera 2D.

## Conceitos-chave

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

## Erros comuns e pontos de atenção
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

## Perguntas socráticas sugeridas
- "Quais telas o seu jogo tem? O que o jogador pode fazer em cada uma e o que faz trocar de tela?"
- "Que informações descrevem um inimigo do seu jogo? Quais delas mudam a cada quadro?"
- "Se um inimigo é destruído no meio do vetor, como os outros continuam sendo percorridos certinho?"
- "Essa função precisa mudar o jogador ou só ler os dados dele? Como isso muda o jeito de passar a struct?"
- "A pontuação deve andar junto com a câmera? Então ela fica dentro ou fora do `BeginMode2D`?"
- "Qual é a menor versão do seu jogo que já dá para jogar? O que fica para depois?"

## Referências oficiais
- Cheatsheet: https://www.raylib.com/cheatsheet/cheatsheet.html
- Exemplos "core basic screen manager", "core 2d camera" e "core 2d camera platformer", e os jogos de exemplo em https://www.raylib.com/games.html
- Exemplos de jogos completos com código aberto para estudar (não para copiar no projeto): https://github.com/raysan5/raylib-games

## Notas de revisão
- Na raylib 6.2, as funções de arquivo (`SaveFileText` e outras) foram revisadas para devolver o resultado de forma padronizada: `SaveFileText` devolve `true` em caso de sucesso.
- Assinaturas conferidas no `raylib.h` da versão 6.2.
