---
titulo: "Aula 21 - Arquivos (Parte 1)"
numero_aula: 21
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [arquivos, arquivo texto, arquivo binário, FILE, fopen, fclose, modos de abertura, caminho absoluto, caminho relativo, buffer, fputc, fgetc, EOF, fputs, fgets, stdin, stdout, stderr, exit]
pre_requisitos: ["Aula 13 - Strings", "Aula 19 - Ponteiros"]
fonte_original: "Material-Ensino-Não-Verificado/Aula 21 - Arquivos.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_21_Arquivos_Modo_Texto.md"
revisado_em: 2026-10-21
status: verificado (com correção técnica em fgets e reconstrução de slide corrompido)
---

# Aula 21 - Arquivos (Parte 1)

## Objetivo
Introduzir a manipulação de arquivos em C: tipos de arquivo (texto e binário), abertura e fechamento (`fopen`/`fclose`), modos de abertura, o papel do buffer e a leitura/escrita de caracteres (`fgetc`/`fputc`) e de strings (`fgets`/`fputs`).

## Conceitos-chave

- **Arquivo**: coleção de dados em armazenamento **secundário** (fora da RAM): disco rígido/SSD, pen-drive. Vantagens: guardar grande quantidade de dados, **persistência** (os dados continuam depois que o programa termina), acesso não sequencial e compartilhamento dos dados entre programas.

- **Arquivo texto x binário**:
  | | Texto | Binário |
  |---|---|---|
  | Conteúdo | Caracteres legíveis (abre no Bloco de Notas) | Bytes como estão na memória (ilegível em editor de texto) |
  | Exemplo: `int` com 8 dígitos | 8 caracteres = 8 bytes (64 bits) | 4 bytes (32 bits) |
  | Exemplos | `.txt`, `.csv`, código-fonte | executáveis, arquivos compactados, arquivos de registros |

  Ex.: gravar `"Rosinosberta"`, `32` e `1.75` em modo texto produz `Rosinosberta 32 1.750000`; em modo binário, o nome aparece legível, mas o `int` e o `float` aparecem como símbolos estranhos.

- **Biblioteca**: as funções de arquivo estão em `<stdio.h>`. Elas apenas abrem/fecham e leem/escrevem caracteres ou bytes — cabe ao programador decidir **como** interpretar o conteúdo.

- **Ponteiro de arquivo**: todas as funções trabalham com um `FILE*`:
  ```c
  FILE *fp;
  ```

- **Abrir (`fopen`)**:
  ```c
  FILE *fopen(const char *nome_arquivo, const char *modo);
  ```
  Retorna `NULL` se a abertura falhar (arquivo inexistente no modo `"r"`, sem permissão, caminho inválido...).

- **Caminhos**:
  - **Absoluto** (a partir da raiz): Windows `"C:\\Projetos\\dados.txt"` (barra invertida precisa ser escapada `\\` dentro de string C; `"C:/Projetos/dados.txt"` também funciona no Windows); Linux `"/home/usuario/dados.txt"`.
  - **Relativo** (a partir do diretório corrente): `"arq.txt"`, `"diretorio/dados.txt"`, `"../dados.txt"`.
  - Atenção: o diretório corrente **nem sempre** é a pasta onde está o executável (depende de onde/como o programa foi executado, ex.: pela IDE).

- **Modos de abertura**:
  | Modo | Tipo | Função |
  |---|---|---|
  | `"r"` | Texto | Leitura. O arquivo deve existir. |
  | `"w"` | Texto | Escrita. Cria o arquivo se não existir; **apaga** o conteúdo anterior se existir. |
  | `"a"` | Texto | Escrita no **fim** do arquivo (*append*). Cria o arquivo se não existir. |
  | `"rb"`, `"wb"`, `"ab"` | Binário | Iguais aos anteriores, em modo binário. |
  | `"r+"` | Texto | Leitura e escrita. O arquivo deve existir. |
  | `"w+"` | Texto | Leitura e escrita. Cria se não existir; apaga o anterior se existir. |
  | `"a+"` | Texto | Leitura e escrita; toda escrita vai para o fim do arquivo. Cria se não existir. |
  | `"r+b"`, `"w+b"`, `"a+b"` | Binário | Iguais aos anteriores, em modo binário. |

- **Padrão de abertura com verificação**:
  ```c
  FILE *arq;
  arq = fopen("dados.txt", "w");
  if (arq == NULL) {
      printf("Erro ao abrir o arquivo!\n");
      exit(1); // 1 indica erro; exit() está em <stdlib.h> e encerra o programa de qualquer ponto
  }
  /* ... usa o arquivo ... */
  fclose(arq);
  ```

- **Fechar (`fclose`)**: `int fclose(FILE *arq);` — retorna 0 em caso de sucesso (e `EOF` em caso de erro). Ao fechar, os dados que ainda estavam no **buffer** são gravados no arquivo. Sempre feche os arquivos que abriu.

- **Buffer**: região de memória que guarda dados temporariamente enquanto são transferidos (ex.: RAM → disco). Acessar o disco a cada caractere seria muito lento; por isso os dados se acumulam no buffer e são gravados em blocos — quando o buffer enche ou quando o arquivo é fechado. Consequência: se o programa terminar de forma anormal sem `fclose`, dados podem não ser gravados.

- **Caracteres — `fputc` / `fgetc`**:
  ```c
  int fputc(int ch, FILE *arq);   // escreve um caractere
  int fgetc(FILE *arq);           // lê um caractere e avança a posição de leitura; retorna EOF no fim
  ```
  `fgetc` retorna `int` (e não `char`) justamente para conseguir representar `EOF`, que é diferente de qualquer caractere válido.
  ```c
  // Escrita caractere a caractere
  FILE *arq = fopen("arquivo.txt", "w");
  if (arq == NULL) { printf("Erro na abertura do arquivo"); exit(1); }
  char texto[100] = "Texto que sera escrito no arquivo";
  for (int i = 0; texto[i] != '\0'; i++) {
      fputc(texto[i], arq);
  }
  fclose(arq);

  // Leitura caractere a caractere até o fim do arquivo
  arq = fopen("arquivo.txt", "r");
  if (arq == NULL) { printf("Erro na abertura do arquivo"); exit(1); }
  int c;
  while ((c = fgetc(arq)) != EOF) {
      printf("%c", c);
  }
  fclose(arq);
  ```

- **Arquivos pré-definidos**: `stdin` (entrada padrão, geralmente o teclado), `stdout` (saída padrão, geralmente a tela), `stderr` (saída de erros, geralmente a tela). Podem ser usados com as mesmas funções: `fputc(c, stdout);`, `c = fgetc(stdin);`.

- **Strings — `fputs` / `fgets`**:
  ```c
  int   fputs(const char *str, FILE *arq);           // retorna EOF em caso de erro
  char *fgets(char *str, int tamanho, FILE *arq);
  ```
  `fgets` lê **no máximo `tamanho - 1` caracteres** (reserva 1 posição para o `'\0'`), parando antes se encontrar uma quebra de linha — que é **mantida** na string — ou o fim do arquivo. Retorna `str` em caso de sucesso, ou `NULL` se nada pôde ser lido (fim do arquivo ou erro).
  ```c
  // Escrita
  FILE *arq = fopen("arquivo.txt", "w");
  if (arq == NULL) { printf("Erro na abertura do arquivo\n"); exit(1); }
  if (fputs("Texto que sera escrito via fputs", arq) == EOF) {
      printf("Erro na gravação\n");
  }
  fclose(arq);

  // Leitura
  char texto[100];
  arq = fopen("arquivo.txt", "r");
  if (arq == NULL) { printf("Erro na abertura do arquivo\n"); exit(1); }
  if (fgets(texto, 100, arq) == NULL) {
      printf("Erro na leitura\n");
  } else {
      printf("%s\n", texto);
  }
  fclose(arq);
  ```
  Com `stdout`/`stdin`: `fputs(string, stdout);` e `fgets(nome, 30, stdin);` (a mesma leitura segura de strings vista na Aula 13).

- **Ler um arquivo linha a linha** (útil para os exercícios):
  ```c
  char linha[256];
  while (fgets(linha, sizeof(linha), arq) != NULL) {
      /* processa a linha */
  }
  ```

## Erros comuns e pontos de atenção
- **Não verificar se `fopen` retornou `NULL`** — usar o ponteiro nulo em `fgetc`/`fputs` derruba o programa.
- Abrir com `"w"` um arquivo que se queria apenas acrescentar — **todo o conteúdo anterior é apagado**; para acrescentar, use `"a"`.
- Esquecer `fclose` — dados podem ficar no buffer e não ser gravados; além disso há um limite de arquivos abertos simultaneamente.
- Guardar o retorno de `fgetc` em `char` em vez de `int` — a comparação com `EOF` pode falhar (laço infinito ou fim prematuro).
- Escrever caminhos do Windows com uma barra invertida só (`"C:\dados.txt"`) — `\d` é interpretado como sequência de escape.
- Esperar que `fgets` remova o `'\n'` — ele é mantido (remova com `linha[strcspn(linha, "\n")] = '\0';`, como na Aula 13).
- Procurar o arquivo na pasta errada: com caminho relativo, o arquivo é buscado no diretório **corrente**, que pode não ser a pasta do código-fonte.

## Perguntas socráticas sugeridas
- "Se você abrir um arquivo com `\"w\"` e ele já tiver dados, o que acontece com eles? Que modo você usaria para não perdê-los?"
- "Por que você acha que `fgetc` retorna `int` e não `char`?"
- "Seu programa gravou dados mas o arquivo ficou vazio. Que linha pode estar faltando?"
- "O número 12345678 ocupa quantos bytes em um arquivo texto? E em binário?"
- "Para contar quantas linhas um arquivo tem (Exercício 1), que caractere você procuraria ao ler com `fgetc`?"

## Exercícios da aula
1. Ler o nome de um arquivo texto e mostrar quantas linhas ele possui.
2. Ler os nomes de dois arquivos texto e criar um terceiro com o conteúdo do primeiro seguido do conteúdo do segundo.
3. Converter o conteúdo de um arquivo texto para maiúsculas; ler o nome do arquivo de origem e do arquivo de destino.
4. Calcular e exibir o número de palavras de um arquivo texto informado pelo usuário.
5. Calcular e exibir quantas vezes cada letra ocorre em um arquivo texto (ignorando letras acentuadas).
6. Ler o nome de um arquivo texto e uma palavra; informar quantas vezes a palavra aparece no arquivo.

## Notas de revisão
- **Correção técnica aplicada (`fgets`)**: o slide descreve o parâmetro `tamanho` como "número máximo de caracteres a serem lidos". O correto é que `fgets` lê **no máximo `tamanho - 1`** caracteres, usando a última posição para o `'\0'`, e para ao encontrar `'\n'` (que é mantido na string). O material revisado também acrescenta que `fgets` retorna `NULL` tanto no fim do arquivo quanto em erro.
- **Slide corrompido reconstruído**: no PDF, o slide "Abrindo um arquivo" (exemplo de abertura para escrita) tem duas linhas de código sobrepostas e ilegíveis (`FIFLIEL*E *faorpqe=n(...)`). Pelo contexto, o código pretendido é `FILE *arq; arq = fopen("dados.txt", "w");` — reconstruído assim no material revisado.
- **Complemento na tabela de modos**: o slide não diz que os modos `"a"`/`"ab"` **criam** o arquivo se ele não existir — acrescentado.
- **Pequenos ajustes nos exemplos**: comentários `}//for` que fechavam `while`/`if` no slide foram removidos; o laço `for (i < strlen(texto))` foi trocado por `texto[i] != '\0'` (evita recalcular `strlen` a cada volta e dispensa `string.h`); protótipos com `const`, como no padrão.
- Esta é a **Parte 1** do assunto; o slide lista também leitura/escrita de **blocos de bytes** e de **strings formatadas** (`fread`/`fwrite`, `fprintf`/`fscanf`), que não são cobertas neste PDF — presumivelmente ficam para a Parte 2.
- Videoaula desta aula: "Arquivos - Modo Texto" (https://www.youtube.com/watch?v=3SJ6MWo1NDc); transcrição verificada em `Transcrição-Verificadas/Aula_21_Arquivos_Modo_Texto.md`.
