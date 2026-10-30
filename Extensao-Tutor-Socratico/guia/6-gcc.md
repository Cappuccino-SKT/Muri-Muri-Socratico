# 6. Conferir o GCC

O **GCC** é o compilador de C. O tutor usa o GCC para mostrar os erros de compilação em português e para rodar os seus casos de teste. O chat funciona sem ele.

Clique em **Conferir o GCC** ao lado. Se aparecer ✅ em **🩺 Tudo pronto?**, está tudo certo.

## Nos computadores da universidade

O GCC normalmente já vem instalado. Se aparecer "GCC não encontrado", avise o professor ou o técnico do laboratório.

## No seu computador (Windows)

1. Instale o **MSYS2** pelo site [msys2.org](https://www.msys2.org/) (siga as instruções da página).
2. No terminal **MSYS2 UCRT64** que abre no fim, rode:
   ```
   pacman -S mingw-w64-ucrt-x86_64-gcc
   ```
3. Coloque a pasta `C:\msys64\ucrt64\bin` no **PATH** do Windows: menu Iniciar → *Editar as variáveis de ambiente do sistema* → *Variáveis de Ambiente* → em *Path*, **Novo** → cole a pasta → OK.
4. Feche e abra o VS Code de novo e clique em **Conferir o GCC**.

Se o GCC estiver instalado em outro lugar, informe o caminho na configuração **Tutor Socrático: Caminho Gcc** (`tutorSocratico.caminhoGcc`).
