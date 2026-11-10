# 8. (Fundamentos 2) Instalar e usar a raylib

No projeto final de Fundamentos 2, você faz um jogo em C com a **raylib**, uma biblioteca para gráficos, sons e teclado/mouse. O tutor conhece a raylib 6.2 e ajuda a usar a biblioteca, mas a lógica do jogo é com você.

## Instalar (Windows, pelo MSYS2)

Se você seguiu o passo 6 (GCC pelo MSYS2), falta só um comando. No terminal **MSYS2 UCRT64**:

```
pacman -S mingw-w64-ucrt-x86_64-raylib
```

Depois, no painel do tutor, abra **🩺 Tudo pronto?**: com um arquivo do jogo aberto, deve aparecer ✅ **raylib encontrada**.

**Nos computadores da universidade**, a raylib pode já estar instalada. Se aparecer "raylib não encontrada", avise o professor.

> Se a raylib foi instalada de outro jeito (por exemplo, pelo instalador oficial do site raylib.com), informe as pastas dela na configuração **Tutor Socrático: Argumentos Gcc** (`tutorSocratico.argumentosGcc`), por exemplo `-IC:/raylib/raylib/src` e `-LC:/raylib/raylib/src`, e o GCC que veio com ela em **Caminho Gcc**.

## Compilar e rodar

No painel do tutor, com o `.c` do jogo aberto, clique em **▶ Compilar e rodar o jogo**. Ele:
- compila ligando a raylib (`-lraylib -lopengl32 -lgdi32 -lwinmm`);
- junta os outros arquivos `.c` da pasta que não têm `main` (para projetos em vários arquivos);
- roda o jogo **na pasta do arquivo**, e mostra o que o jogo escreve com `printf` na saída **Tutor Socrático: jogo**.

Se não compilar, a extensão explica o erro mais comum. Por exemplo, `undefined reference to InitWindow` quer dizer que faltou ligar a raylib.

Pelo terminal, o comando equivalente é:

```
gcc jogo.c -o jogo.exe -lraylib -lopengl32 -lgdi32 -lwinmm
```

## Compilar à mão e o Makefile (requisito do projeto)

O projeto pede que você saiba compilar no terminal e entregue um **Makefile**. Para instalar o make no MSYS2 UCRT64:

```
pacman -S mingw-w64-ucrt-x86_64-make
```

No Windows, o comando se chama `mingw32-make`. Com o `Makefile` na pasta do projeto, rode no terminal do VS Code:
- `mingw32-make`: compila;
- `mingw32-make run`: compila e roda;
- `mingw32-make clean`: apaga o que foi gerado.

Com o Makefile na pasta, o painel mostra **🛠 Compilar com o Makefile**. Para montar o seu, clique em **📄 Como fazer o Makefile do projeto** ou pergunte ao **@tutor**: ele explica cada parte e revisa o seu Makefile. Lembre: as linhas de comando começam com **TAB**, senão aparece "missing separator".

## Imagens e sons

Coloque o `jogo.c` e uma pasta `recursos/` lado a lado, e carregue os arquivos com o caminho a partir dela:

```c
Texture2D nave = LoadTexture("recursos/nave.png");
```

Carregue **uma vez**, antes do laço do jogo (nunca dentro dele), e descarregue no fim (`UnloadTexture`).

## Planejar o jogo com o tutor

No painel, a área **🎮 Meu jogo** aparece nos arquivos que usam a raylib. Antes de escrever código, use **🎮 Começar o projeto do jogo nesta pasta**, no fim do painel.
1. Escreva o **plano**: a ideia, as teclas, como ganha e como perde, as telas e o que tem no jogo.
2. Clique em **🧭 Montar as etapas do desenvolvimento**: o tutor divide o plano em etapas pequenas, que aparecem no painel.
3. Clique em **➡️ Me ajude com a próxima etapa** e programe. Ao terminar uma etapa, marque-a no painel.
4. Antes de parar, clique em **💾 Salvar onde parei**. Na próxima vez, o painel mostra **📌 Onde você parou** e o tutor continua dali.

Tudo isso fica no arquivo **`projeto-do-jogo.md`**, na pasta do jogo. **Leve esse arquivo junto com o código** (pen drive, GitHub): em outro computador, o tutor continua de onde você parou. Você também pode abrir e editar o arquivo à vontade (**📄 Abrir o diário**).

## Pedir ajuda

- **@tutor** no chat, com o arquivo do jogo aberto: o tutor usa o material da raylib (janela, desenho, teclado e mouse, movimento e colisões, imagens e sons, organização do jogo).
- Ele pode mostrar como usar uma função da raylib. Para as regras do seu jogo, ele faz perguntas e dá pistas.
- Referências oficiais: [cheatsheet com todas as funções](https://www.raylib.com/cheatsheet/cheatsheet.html) e [exemplos](https://www.raylib.com/examples.html).
