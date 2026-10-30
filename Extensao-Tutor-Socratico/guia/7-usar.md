# 7. Usar o tutor

1. Clique no ícone 🎓 **Tutor Socrático** na barra lateral.
2. Crie ou abra o arquivo `.c` do exercício.
3. Cole o **enunciado** na caixa **Exercício** do painel.
4. Clique em **📝 Colocar o cabeçalho Doxygen e o enunciado no arquivo**. O início do arquivo fica assim:
   ```c
   /**
    * \file media.c
    * \brief Lê as notas de um aluno e mostra a média.
    * \author Maria Silva
    * \date 30/10/2026
    */

   /*
    * Enunciado:
    * Faça um programa que leia 5 notas e mostre a média.
    */
   ```
   Escreva no `\brief`, em uma frase, o que o seu programa faz.
   Atalho: **Ctrl+Alt+H** faz o mesmo que o botão.
5. Escreva o programa. As dicas 🎓 (sublinhado azul) aparecem enquanto você digita.
6. Clique em **🎓 Verificar meu código**. O tutor aponta **um ponto de cada vez** e marca a linha no código. Quando corrigir, clique em **✅ Já corrigi** em cima da linha.
7. Quando o programa funcionar, clique em **✨ Verificar a qualidade do código**. Você recebe uma **nota de 0 a 1000** e as sugestões para deixar o código mais organizado, também uma de cada vez. Faça cada uma e clique em **✅ Feito, próximo**. Depois da última, clique em **✨ Conferir e ver a nota nova**: o tutor confere tudo de uma vez. Tente chegar perto de 1000!

O tutor faz perguntas e dá pistas, mas **não entrega a resposta**. O objetivo é você aprender a resolver.

## Atalhos para deixar o código organizado

| O que fazer | Atalho |
|---|---|
| Cabeçalho Doxygen com o enunciado do painel | **Ctrl+Alt+H** |
| Cabeçalho Doxygen (modelo para preencher) | digite `doxy` e aperte **Tab** |
| Comentário Doxygen de uma função | na linha acima da função, digite `doxyf` e aperte **Tab** |
| Arrumar a indentação do arquivo todo | **Shift+Alt+F** (precisa da extensão C/C++) |
| Recuar ou desfazer o recuo das linhas selecionadas | **Tab** / **Shift+Tab** |
| Renomear uma variável em todos os lugares | clique no nome e aperte **F2** |
| Comentar ou descomentar as linhas selecionadas | **Ctrl+;** (ou **Ctrl+/**, dependendo do teclado) |

Em qualidade do código (comentários, cabeçalho, indentação e nomes), o tutor dá a resposta direta e ensina o atalho. Na lógica do programa, ele continua só com perguntas e pistas.

Se algo não funcionar, abra **🩺 Tudo pronto?** no painel: ali aparece o que falta e o botão que resolve.
