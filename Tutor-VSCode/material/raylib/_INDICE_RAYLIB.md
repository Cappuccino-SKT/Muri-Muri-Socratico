# Índice do material da raylib (projeto final de Fundamentos de Programação 2)

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
