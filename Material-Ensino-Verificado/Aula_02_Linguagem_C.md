---
titulo: "Aula 02 - Linguagem C"
numero_aula: 2
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [linguagem de maquina, assembly, historia da linguagem C, compilador gcc, estrutura de um programa C, printf, comentarios, caracteres de escape]
pre_requisitos: ["Aula 01 - Introdução"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 02 - Linugagem C.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_02_Linguagem_C.md"
revisado_em: 2026-10-11
status: verificado
---

# Aula 02 - Linguagem C

## Objetivo
Explicar por que linguagens de alto nível como C existem, apresentar a origem e características da linguagem C, e mostrar a estrutura básica de um programa C (compilação, função `main`, `printf`, comentários).

## Conceitos-chave

- **Código de máquina**: sequência de bytes específica de cada família de processador; difícil de programar diretamente.
- **Assembly**: linguagem de baixo nível mais legível que código de máquina, mas ainda dependente de hardware, difícil de manter e propensa a erros.
- **Linguagem C**: criada por Dennis Ritchie na década de 1970, derivada da linguagem B (Ken Thompson), que por sua vez vem do BCPL (Martin Richards).
  - Chamada de linguagem de **"médio nível"**: combina abstração de alto nível com capacidade de manipular bits, bytes e endereços de memória (como assembly).
  - **Altamente portável**: o mesmo código-fonte pode ser compilado para diferentes arquiteturas, desde que siga um padrão (K&R, ANSI C/C89/C90, C99, C11, C18).
- **Arquivo-fonte (.c)**: contém o algoritmo escrito em C; é processado pelo **compilador** (ex.: GCC) e transformado em um executável (código de máquina).
- **Estrutura básica de um programa C**:
  ```c
  tipo_retorno nome_funcao(parametros) {
      declaracao_variaveis
      instrucoes
      retorno;
  } // fim do bloco da função
  ```
- **Programa mínimo ("Hello World")**:
  ```c
  #include <stdio.h>
  #include <stdlib.h>

  int main() {
      printf("Hello World\n");
      return 0;
  } // main
  ```
  Compilação típica (GCC): `gcc -Wall -o hello hello.c`
- **Elementos da estrutura**:
  - `#include <biblioteca>`: inclui funções que serão usadas (ex.: `stdio.h` para `printf`/`scanf`).
  - `int main()`: função principal, primeira a ser executada; pode ter outros nomes de função, exceto `main`.
  - `{` e `}`: delimitam início e fim de um bloco/função.
  - `;`: termina cada instrução.
  - `return 0;`: valor de retorno da função (0 geralmente indica execução sem erros).
- **`printf`**: imprime texto na tela; a mensagem fica entre aspas duplas; `\n` insere quebra de linha.
- **Caracteres de escape**: `\a` (bip), `\n` (nova linha), `\t` (tabulação), `\\` (barra invertida), `\'` (aspas simples), `\"` (aspas duplas), `\?` (interrogação).
- **Comentários**:
  - `/* comentário */` — para um trecho (pode ocupar várias linhas).
  - `// comentário` — para uma única linha, geralmente no início dela.

## Erros comuns e pontos de atenção
- **Aspas "curvas" (smart quotes)**: ao copiar código de slides em PowerPoint/PDF, aspas retas (`"`) às vezes aparecem como aspas curvas (`“` `”`). Código C **não compila** com aspas curvas — é preciso reescrever com aspas retas no editor de texto/IDE.
- Esquecer o `;` no final de uma instrução é um dos erros de sintaxe mais comuns para quem está começando.
- Esquecer o `#include` da biblioteca correspondente à função usada (ex.: usar `printf` sem `#include <stdio.h>` pode gerar aviso/erro dependendo do compilador).
- Confundir `main()` (função especial, ponto de entrada do programa) com uma função qualquer — só pode haver uma função `main` por programa.

## Perguntas socráticas sugeridas
- "Por que não escrevemos programas direto em código de máquina ou assembly?"
- "O que você acha que acontece se você remover o `return 0;` do final do `main`? E se remover as chaves `{ }`?"
- "Se o compilador reclamar de um caractere 'inesperado' logo depois de aspas que parecem normais, o que pode ter acontecido?"

## Notas de revisão
- Conteúdo técnico e histórico (origem do C, padrões, estrutura do programa) está correto e consistente com a bibliografia.
- Adicionado como ponto de atenção o problema de aspas curvas ao copiar código de slides/PDF — não estava explícito no material original, mas é um erro muito comum e vale a pena a IA alertar o aluno sobre isso proativamente.
