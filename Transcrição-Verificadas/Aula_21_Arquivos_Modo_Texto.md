# Aula 21 – Arquivos (Modo Texto)

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Prochor Morial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O texto foi reconstruído com apoio dos slides da Aula 21 (`Material-Ensino-Verificado/Aula_21_Arquivos.md`). Os códigos foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

## Tópicos abordados

- O que são arquivos e por que usá-los
- Arquivo texto × arquivo binário (exemplo do nome, inteiro e float)
- Biblioteca `stdio.h` e o ponteiro de arquivo `FILE *`
- `fopen`: nome do arquivo, caminho absoluto e relativo
- Modos de abertura (`r`, `w`, `a`, `rb`, `wb`, `ab` e variações com `+`)
- Verificar a abertura (`NULL`) e `exit`
- `fclose` e o buffer
- Ler e escrever caracteres: `fputc`, `fgetc` e `EOF` (com demonstração)
- Arquivos pré-definidos: `stdin`, `stdout`, `stderr` (e `stdaux`, `stdprn`)
- Ler e escrever strings: `fputs` e `fgets` (com demonstração)

## Glossário

- **Arquivo:** coleção de dados armazenada em memória secundária (HD, SSD, pen-drive), fora da RAM.
- **Arquivo texto:** guarda os dados como caracteres legíveis em um editor de texto.
- **Arquivo binário:** guarda os dados exatamente como estão na memória RAM; não é legível em editor de texto.
- **`FILE *`:** ponteiro de arquivo, usado por todas as funções de arquivo.
- **Buffer:** região de memória que guarda os dados temporariamente antes de gravá-los no disco.
- **`EOF`:** *End Of File*, constante (valor −1) que indica o fim do arquivo.

---

## O que são arquivos

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos conversar sobre **arquivos**.

Arquivos nada mais são do que **coleções de dados armazenadas em dispositivos de memória secundária**, ou seja, fora da memória RAM. Os exemplos mais clássicos são HD, SSD e pen-drives.

Por que usar arquivos?
- Permitem armazenar uma **grande quantidade de informação**.
- **Persistência dos dados:** quando desligo o computador ou acaba a energia, não perco a informação.
- O acesso pode ser **não sequencial**: posso ler uma informação no começo ou no fim do disco sem problema.
- **Acesso concorrente:** mais de um programa pode utilizar os dados ao mesmo tempo.

## Arquivo texto × binário

A linguagem C manipula arquivos de dois modos principais: **modo texto** e **modo binário**.

**Modo texto:** armazena todas as informações como **caracteres**. Por isso, posso abrir o arquivo em qualquer editor de texto, como o Bloco de Notas, e ler a informação. Os dados são gravados como caracteres de 8 bits. Por exemplo, um número inteiro, que na memória RAM ocupa 4 bytes (32 bits), no arquivo texto gasta **um byte para cada algarismo**: um número de 8 algarismos ocupa 8 bytes (64 bits).

No exemplo do slide, tenho uma string, um inteiro e um `float`. Salvando em modo texto e abrindo no Bloco de Notas, consigo ler tudo: o nome ("Rosinosberta"), o inteiro 32 (dois algarismos, dois bytes) e o `float`, que por padrão é escrito com 6 casas decimais (`1.750000`, 8 caracteres, 8 bytes).

**Modo binário:** armazena uma sequência de bits que segue as convenções do programa que a criou. É comum em arquivos executáveis e compactados. Os dados são gravados **do mesmo modo que estavam na memória RAM**: o inteiro que ocupa 4 bytes na RAM ocupa 4 bytes no arquivo. Se eu abrir esse arquivo em um editor de texto, vejo o nome normalmente, mas o editor tenta interpretar os bytes do inteiro e do `float` como caracteres e mostra **lixo**, porque ali não há caracteres, há valores binários.

## Arquivos em C: `stdio.h` e `FILE *`

Todas as funções de que vamos precisar estão na biblioteca **`stdio.h`** (*standard input/output*, entrada e saída padrão). Essa biblioteca **não tem funções automáticas** do tipo "leia tudo" ou "escreva tudo": as funções se limitam a abrir o arquivo, ler isto, escrever aquilo. **A tarefa do programador** é organizar como a informação será escrita e como será lida depois.

Todas as funções trabalham com o conceito de **ponteiro para arquivo**:

```c
FILE *fp;   // fp = "file pointer"; pode ter o nome que você quiser
```

## Abrindo um arquivo: `fopen`

Para abrir, uso a função **`fopen`** (*file open*). Ela recebe dois argumentos: o **nome do arquivo** e o **modo de abertura**. Se funcionar, retorna um ponteiro para o arquivo; se der algum erro, retorna **`NULL`**.

**Caminhos.** O nome do arquivo pode ser:
- **Absoluto:** a descrição completa desde a pasta raiz, que depende do sistema operacional. No Windows, algo como `"C:\\Projetos\\dados.txt"`: como a contrabarra é um caractere especial (usado no `\n`), para escrever uma contrabarra é preciso usar **duas** (`\\`). No Linux, algo como `"/home/usuario/dados.txt"`.
- **Relativo:** a partir do **diretório corrente** (o diretório do executável [verificar]). Se o arquivo está na mesma pasta, uso só o nome, `"arq.txt"`; em uma subpasta, `"diretorio/dados.txt"`; na pasta acima, `"../dados.txt"`. A barra também depende do sistema operacional.

**Modos de abertura.** Os três principais:
- **`"r"`** (*read*): leitura. O arquivo **deve existir**; caso contrário, retorna erro.
- **`"w"`** (*write*): escrita. Cria o arquivo se não existir. **Cuidado:** se já existir, ele **apaga** e começa o arquivo do zero.
- **`"a"`** (*append*): escrita, mas tudo o que escrever é **adicionado ao final** do arquivo existente.

Depois vêm **`"rb"`, `"wb"` e `"ab"`**, exatamente iguais aos três anteriores, mas em **modo binário**. Há ainda variações com o símbolo **`+`**: mantêm as características dos modos anteriores, mas permitem **ler e escrever** no arquivo.

## Verificando a abertura e `exit`

```c
FILE *arq;
arq = fopen("dados.txt", "w");   // arquivo na mesma pasta do executável, aberto para escrita

if (arq == NULL) {
    printf("Erro ao abrir o arquivo!\n");
    exit(1);
}
/* ... usa o arquivo ... */
fclose(arq);
```

Testo se o ponteiro é `NULL`; se for, mostro um erro e finalizo o programa. A função **`exit`**, da biblioteca **`stdlib.h`**, finaliza a execução do programa em **qualquer ponto** do código. Passo **1** porque estou finalizando por causa de um erro.

## Fechando: `fclose` e o buffer

Terminei de usar o arquivo: tenho que **fechá-lo** com a função **`fclose`**, passando o arquivo como argumento. Ela retorna **zero** em caso de sucesso. Ao fechar, **tudo o que estava no buffer é gravado** no disco.

O que é um **buffer**? Uma região de memória onde os dados ficam **temporariamente armazenados** antes de serem transferidos, por exemplo da RAM para o HD. Por quê? Se a cada letrinha o programa acessasse o HD, que é muito mais lento que a RAM, o programa ficaria muito lento. Então ele vai acumulando no buffer e, quando junta um bloco bom de caracteres, grava de uma vez só no HD, deixando o programa mais eficiente.

## Lendo e escrevendo

Há quatro maneiras de ler e escrever, que veremos nesta aula e na próxima: **caractere**, **string**, **sequência de bytes** e **string formatada**. Nesta aula: caracteres e strings.

## Caracteres: `fputc`, `fgetc` e `EOF`

- **`fputc`** (*file put char*): escreve um caractere no arquivo. Recebe **o caractere** e **o arquivo** onde será escrito.
- **`fgetc`** (*file get char*): lê um caractere do arquivo. Recebe só o arquivo e **retorna o caractere lido**. A cada leitura, **avança para a próxima posição**. Ao chegar ao **final do arquivo**, retorna **−1**, uma constante conhecida como **`EOF`** (*End Of File*). Por isso ela retorna um `int`, e não um `char`.

**Demonstração com `fputc`.** Tenho uma string, abro o arquivo no modo `"w"`, testo se abriu e, com um `for` da posição 0 até o comprimento do texto, escrevo cada caractere no arquivo. Depois fecho.

```c
FILE *arq;
char texto[100] = "Texto que sera escrito no arquivo";

arq = fopen("arquivo.txt", "w");
if (arq == NULL) {
    printf("Erro na abertura do arquivo");
    exit(1);
}
for (int i = 0; i < strlen(texto); i++) {
    fputc(texto[i], arq);
}
fclose(arq);
```

Na pasta havia só os códigos-fonte da aula, nenhum `.txt`. Executando, nada aparece na tela, mas foi criado o **`arquivo.txt`** com o mesmo conteúdo da string.

**Demonstração com `fgetc`.** Abro o arquivo para leitura (`"r"`), leio um caractere e, **enquanto ele for diferente de `EOF`**, mostro na tela e leio o próximo. Depois fecho.

```c
int c;
arq = fopen("arquivo.txt", "r");
if (arq == NULL) {
    printf("Erro na abertura do arquivo");
    exit(1);
}
while ((c = fgetc(arq)) != EOF) {
    printf("%c", c);
}
fclose(arq);
```

Executando, ele leu o `.txt` e exibiu o texto na tela.

## Arquivos pré-definidos

A linguagem C já tem vários arquivos pré-definidos, alguns dos quais já usamos no curso:
- **`stdin`**: entrada padrão (o teclado).
- **`stdout`**: saída padrão (o monitor).
- **`stderr`**: saída de erro padrão (por padrão a tela, mas pode ser um arquivo só de erros).
- O professor cita também **`stdaux`** (portas seriais, em sistemas antigos) e **`stdprn`** (portas paralelas, usadas antigamente por impressoras).

> **[Nota de verificação]** `stdaux` e `stdprn` existem apenas em compiladores antigos do DOS/Windows; não fazem parte do padrão C. Os três padronizados são `stdin`, `stdout` e `stderr`.

Exemplo: `fputc(caractere, stdout);` escreve o caractere **na tela**, equivalente ao `printf`. E `caractere = fgetc(stdin);` lê um caractere **do teclado**, como um `scanf` de um caractere.

## Strings: `fputs` e `fgets`

Letrinha por letrinha não rende. Para ler e escrever strings inteiras de uma vez:
- **`fputs`**: escreve uma string no arquivo. Recebe a string e o arquivo.
- **`fgets`**: lê uma string do arquivo. Recebe onde guardar a string, a **quantidade de caracteres** a ler e o arquivo. Se não conseguir ler, retorna **`NULL`**; caso contrário, retorna o ponteiro para a string lida.

> **[Nota de verificação]** O `fgets` lê no máximo **`tamanho − 1`** caracteres (a última posição fica para o `'\0'`) e para ao encontrar uma quebra de linha. Ver material verificado da Aula 21.

**Demonstração com `fputs`.** Muito parecido com o anterior, mas agora um **único comando** escreve a string inteira. Guardo o retorno em `resultado`: se for **−1** (`EOF`), houve erro na gravação.

```c
char texto[100] = "Texto que sera escrito via fputs";
int resultado;

arq = fopen("arquivo.txt", "w");
if (arq == NULL) {
    printf("Erro na abertura do arquivo\n");
    exit(1);
}
resultado = fputs(texto, arq);
if (resultado == EOF) {
    printf("Erro na gravacao\n");
}
fclose(arq);
```

Apaguei o `arquivo.txt` anterior, executei, e o arquivo foi criado de novo com o texto escrito via `fputs`.

**Demonstração com `fgets`.** Abro para leitura, testo a abertura e, com um único comando, peço para ler até 100 caracteres do arquivo e salvar em `texto` (por isso declarei a string com 100 posições). Se o retorno for `NULL` [verificar: a transcrição diz "igual a 1"], mostro erro; caso contrário, exibo o texto.

```c
char texto[100];
char *resultado;

arq = fopen("arquivo.txt", "r");
if (arq == NULL) {
    printf("Erro na abertura do arquivo\n");
    exit(1);
}
resultado = fgets(texto, 100, arq);
if (resultado == NULL) {
    printf("Erro na leitura\n");
} else {
    printf("%s\n", texto);
}
fclose(arq);
```

Executando, li o arquivo inteiro com um único comando.

Para finalizar, também posso usar esses comandos com `stdin` e `stdout`: escrever uma string na tela com `fputs(string, stdout);` ou ler uma string do teclado com `fgets(nome, 30, stdin);`.

## Encerramento

E é isso, pessoal. Com isso finalizamos esta primeira parte de arquivos [verificar: a transcrição diz "estrens"]. Bons estudos, um grande abraço e até a próxima!

## Avisos da aula

O professor menciona que leitura/escrita de **sequências de bytes** e de **strings formatadas** ficam para a **próxima aula** (Parte 2). Há exercícios nos slides (6 exercícios sobre arquivos texto). Nenhum prazo ou prova foi mencionado.
