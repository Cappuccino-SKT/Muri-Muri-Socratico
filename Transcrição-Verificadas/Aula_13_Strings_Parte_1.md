# Aula 13 – Strings (Parte 1)

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Morial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

**Atenção:** perto do final da aula, a transcrição automática ficou **corrompida** (repetições e texto sem sentido) e esse trecho não pôde ser recuperado. Ele está sinalizado na seção "Teste com nomes longos".

## Tópicos abordados

- O que é uma string (vetor de caracteres) e o terminador `\0`
- Declarar e inicializar uma string; aspas duplas
- Ler texto do teclado: `gets` (não usar), `scanf("%s")`, `scanf` com limite e `fgets`
- Remover o `\n` salvo pelo `fgets` (função `strcspn`)
- Exibir strings (`%s`) e caracteres (`%c`)
- Matriz de caracteres para guardar vários nomes
- Limpar o buffer (`setbuf`, `__fpurge`)
- Alinhar colunas com `%10s` e `%-10s`

## Glossário

- **String:** vetor de caracteres usado para salvar um texto.
- **`\0` (barra zero, terminador):** caractere que marca o fim do texto; a partir dele é lixo.
- **Aspas duplas (`"texto"`):** para o computador, toda sequência de caracteres entre aspas duplas é um texto (string).
- **`gets`:** lê string do teclado; **não é segura** (não limita o tamanho); não deve ser usada.
- **`scanf("%s", nome)`:** lê uma palavra; não lê espaços e não garante o tamanho; **sem `&`** na frente do vetor.
- **`fgets(nome, tamanho, stdin)`:** lê texto do teclado respeitando o tamanho máximo; salva também o `\n` do *enter*.
- **`stdin`:** *standard input*, entrada padrão (teclado).
- **`strcspn`:** função de `string.h` [verificar] que retorna a posição de um caractere dentro da string.
- **Buffer:** memória temporária de entrada; precisa ser limpo para não atrapalhar as próximas leituras.
- **Matriz de caracteres:** vetor bidimensional em que cada linha é uma string.
- **`%s` × `%c`:** `%s` exibe uma string inteira (até o `\0`); `%c` exibe um único caractere.
- **`%10s` / `%-10s`:** reserva 10 espaços para a string; sem sinal, alinha à direita; com `-`, alinha à esquerda.

---

## Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e na aula de hoje vamos falar sobre as **strings**.

Na aula passada falamos sobre vetores, mas os exemplos, na grande maioria, foram de números inteiros e reais. Hoje vamos aprender o que eu consigo fazer com um **vetor de caracteres**. Um caractere é apenas uma letra; se eu juntar um vetor de caracteres, juntando várias letras, consigo salvar um texto. E essa sequência de caracteres tem o nome de **string**. Então, a string nada mais é do que **um vetor de caracteres que eu uso para salvar um texto**.

## O terminador `\0`

Como a gente vai saber onde esse texto termina? Sempre que eu utilizo um vetor de caracteres como uma string, eu tenho que **reservar uma última posição** no meu vetor para colocar um terminador, que, na linguagem C, é o caractere **`\0`** (barra zero). Ou seja, se eu quero salvar um texto de até 10 caracteres, eu tenho que criar um vetor de **tamanho 11**, porque a última posição vai ser usada como terminador.

## Declarando e inicializando

Como eu faço na linguagem? Crio um vetor `char` e, entre colchetes, o seu tamanho: 11. Então eu tenho um vetor de 11 caracteres, mas apenas 10 são úteis, porque o último elemento fica reservado.

Eu já posso inicializar o vetor: coloco o igual e o texto entre **aspas duplas**. Para o computador, toda sequência de caracteres entre aspas duplas é um texto.

```c
char texto[11] = "teste";   // [verificar: o nome da variável no original é confuso]
```

Reparem que, no fundo, nós utilizamos strings **desde o primeiro dia de aula**, no nosso "Hello World": o texto que você passa lá, "Hello World", está entre aspas duplas; então você está passando, na verdade, uma string como parâmetro para a função `printf`.

O que vai acontecer quando eu inicializo com "teste"? O `t` vai para a posição 0, o `e` para a posição 1, o `s` para a posição 2, e assim por diante. Quando ele termina, automaticamente a linguagem C coloca um **`\0` na primeira posição livre**. Por quê? Nesse caso eu tenho um vetor de 11 posições, mas o texto "teste" usa apenas 5. Como ele vai saber até onde são caracteres úteis e a partir de onde é lixo? Quem faz isso é o `\0`: ele marca até onde tem informação útil; a partir dele é lixo.

## Lendo texto do teclado

Como fazer para receber um texto pelo teclado? Existem algumas opções diferentes, que vocês podem procurar em livros e na internet; não tem uma única maneira de fazer isso.

### 1) `gets` (não use)

A primeira é a função `gets` ("*get string*"): ela pega a string do teclado. Era uma função muito utilizada antigamente, **mas não é segura**, porque ela pode passar do tamanho máximo da sua string. Por exemplo: a sua string tem tamanho 10, mas o usuário digita 20 caracteres. Todos os caracteres que passarem do tamanho do vetor serão escritos **fora da região permitida**, podendo sobrescrever outras variáveis e causar erros no seu programa, inclusive finalizar a execução; o comportamento é inesperado. Então a ideia é **não utilizar essa função**. Ela foi descontinuada: nas novas versões da linguagem [verificar], mantém-se por compatibilidade, mas não se recomenda o uso.

### 2) `scanf` com `%s`

Você pode utilizar o `scanf`, que a gente usava para `int`, `float` e `char`. Nesse caso seria `%s`:

```c
scanf("%s", nome);
```

Reparem: **não tem `&` antes de `nome`**. Por quê? Porque `nome` já é um vetor, e todo vetor é passado como o **endereço de memória da primeira posição do vetor**; logo, não preciso colocar o `&`.

Mas tem problemas: o `%s` **não lê espaços**. Se eu digitar "UTFPR Apucarana" [verificar: exemplo], ele vai pegar só "UTFPR" e não vai pegar "Apucarana". Além disso, tem o mesmo problema do `gets`: ele não garante o tamanho.

Existem técnicas que permitem garantir o tamanho máximo. Olha lá: no `scanf`, eu digo para pegar uma string de **no máximo 20 caracteres** e que pegue qualquer caractere, **exceto o `\n`**. Funciona? Sim: recebe no máximo 20 caracteres, exceto o `\n`. Só que o que passar disso ele não vai limpar do buffer; você é que vai ter que fazer isso [verificar: trecho confuso no original].

```c
scanf("%20[^\n]", nome);   // reconstruído; verificar
```

### 3) `fgets` (recomendada na disciplina)

É uma função mais moderna, e **vamos recomendar o uso dela aqui na disciplina**: a **`fgets`**. O que essa função recebe? **Três parâmetros**:

1. o nome da string onde vão ser salvos os dados;
2. a quantidade máxima de caracteres;
3. de onde os dados estão vindo: **`stdin`**, *standard input*, a entrada padrão, que nesse caso é o teclado.

Ele vai pegar do fluxo de informação do teclado, no máximo aquela quantidade de caracteres, e salvar no vetor `nome`. Assim ele garante o tamanho máximo correto, não vai ultrapassar nem escrever fora do vetor.

Só que ele tem um **pequeno inconveniente**: o *enter* que você digita para finalizar a entrada (`\n`) **também fica salvo dentro do vetor**, e isso pode gerar erro ao armazenar ou exibir esse texto depois.

**Tem como corrigir? Tem.** Naquela posição onde está o `\n`, eu vou sobrescrever com `\0`. Para isso, uso uma função que retorna o índice do vetor onde está o `\n`, e naquela posição escrevo `\0`. E, por boa prática, também limpo o buffer (com `setbuf`) [verificar].

## Na prática: lendo um nome com `fgets`

Vamos ver como fica esse código. Crio um vetor de 21 posições, ou seja, salvo até 20 caracteres úteis, peço ao usuário o nome e uso o `fgets`: onde eu vou salvar (`nome`), até quantos caracteres (21) [verificar: o original diz que esse total "inclui o `\n`"] e de onde vêm os dados (`stdin`, a minha entrada padrão).

Qual é o problema do `fgets`? Ele também salva o `\n` que eu dei quando finalizei a entrada. Então eu quero escrever `\0` nessa posição. Para achar onde está o `\n`, vou usar uma função da biblioteca `string.h`, a **`strcspn`** [verificar: o original diz "STR, STR, STR, N"]: ela retorna a **distância do começo da string até um caractere específico** que eu quero. Onde eu vou procurar? Na string `nome`. O que eu quero procurar lá dentro? O `\n`. Ela me retorna o índice onde está o `\n`; nesse índice eu quero escrever `\0`. E depois limpo o buffer, para descartar o que passar de 20 caracteres. Por fim, exibo o nome.

```c
#include <stdio.h>
#include <string.h>

int main()
{
    char nome[21];

    printf("Digite o nome: ");
    fgets(nome, 21, stdin);
    nome[strcspn(nome, "\n")] = '\0';   // troca o \n por \0
    setbuf(stdin, NULL);                // limpa o buffer

    printf("Nome: %s\n", nome);
    printf("Primeira letra: %c\n", nome[0]);

    return 0;
}
```

**Exibindo.** Como eu faço para exibir um texto? Com **`%s`**, e não `%c`, que é só 1 caractere. O `%s` recebe um vetor de caracteres. Ele não vai exibir os 20 caracteres: **exibe até achar um `\0`**. Então, se eu digitar três letras, ele mostra só as 3 letras; se for maior, exibe todas as letras até achar o `\0`.

Posso tratar o vetor também como um vetor de caracteres normal? Posso. Por exemplo, a primeira letra do nome: uso `%c` e `nome[0]`, a posição zero. No `%s` eu uso o nome do vetor inteiro; já aqui embaixo, como é apenas uma letra, preciso indicar qual posição do vetor será exibida.

Vamos executar (F6): digite o nome, "Maria". Nome: Maria; primeira letra: M.

## Matriz de caracteres: vários nomes

E se eu quiser que ele salve **vários nomes**? Se para um nome eu uso um vetor, para vários nomes vou precisar de uma **matriz**, um vetor bidimensional. Cada **linha** da matriz é um índice que representa uma string: é como se cada linha da minha tabela fosse um nome.

Olha lá: tenho aqui 3 linhas (índices de 0 até 2) e 5 colunas (índices de 0 até 4):

```c
char nomes[3][5];
```

Eu salvo 3 nomes, e com até quantos caracteres úteis? 4, porque preciso do `\0`. Então `nomes[0]` é a primeira linha, `nomes[1]` e `nomes[2]`: cada linha da matriz é uma string. Se eu quiser me referir a **um caractere**, uma letra, tenho que especificar **tanto a linha quanto a coluna**. Por exemplo, para a letra que está na linha 2, coluna 1: `nomes[2][1]`. Nesse caso estou trabalhando com ele como um caractere comum.

**Preenchendo todos os nomes.** Faço um `for`: são 3 linhas, que vão de 0 até 2. A cada repetição peço o valor com `fgets`, salvando em `nomes[0]` na primeira vez, depois `nomes[1]`, depois `nomes[2]`. A atenção é que o meu código que tira o `\n` e coloca o `\0` muda, porque agora os índices envolvem linhas e colunas: na linha atual, na coluna onde está o `\n`, escrevo `\0`. Também adapto onde vou procurar o `\n`: na linha atual. Depois limpo o buffer. Para exibir, uso `%s` com `nomes[i]`, linha por linha.

```c
for (i = 0; i < 3; i++) {
    fgets(nomes[i], 5, stdin);
    nomes[i][strcspn(nomes[i], "\n")] = '\0';
}
setbuf(stdin, NULL);

for (i = 0; i < 3; i++) {
    printf("%s\n", nomes[i]);
}
```

[O professor usa uma variável de linha; aqui chamada `i`. Código reconstruído; verificar.]

**Segundo exemplo (4 nomes, 10 colunas).** Aqui eu criei uma matriz de caracteres de **4 linhas e 10 colunas**: só consigo guardar 4 nomes, com até 9 caracteres úteis cada. Faço um `for` que vai de 0 até 3. A cada vez, o `fgets` preenche uma linha inteira da matriz. Depois eu troco os `\n` por `\0` referenciando a linha, e depois limpo o buffer. Para exibir, faço a mesma coisa: a variável de linha varia de 0 até 3, mostra o nome, e aqui exemplifico como mostrar a **primeira letra de cada um**: o caractere na linha atual e na coluna 0 (a primeira letra sempre está na coluna 0).

## Limpando o buffer com `__fpurge`

Rodando esse código (digitando "João", "Maria"...), a princípio o seu código está ok. Porém, às vezes você pode encontrar algum erro no seu computador. Um nome muito grande, como "José da Silva...", às vezes dá erro, porque o `setbuf` não conseguiu limpar o buffer. Então vou mostrar um recurso que vocês podem utilizar nesse caso: a função **`__fpurge`** [verificar: o original diz "app purge", "F purge"]. Ela **não é a função recomendada** para limpar o buffer, mas pode ser útil.

Há uma diferença dependendo do sistema que você usa (Windows ou Linux) [verificar: trecho confuso no original]: no caso do Linux, ela é escrita com **dois underlines** no começo. Para utilizá-la também é preciso incluir a biblioteca `stdio_ext.h` [verificar: o original diz "STDEOXT"]. Ela apaga tudo que tiver no fluxo da entrada padrão.

```c
#include <stdio_ext.h>

__fpurge(stdin);   // descarta o que sobrou na entrada padrão
```

## Teste com nomes longos

Vamos executar para ver, digitando valores: "Maria", "Eduardo", "Joaquim da Silva", e assim por diante. Olha lá: **ficou salvo só o que eu permiti que fosse salvo**. Eu tinha 10 colunas, então devia salvar até 9 caracteres. "Joaquim da Silva" pegou só os 9 primeiros caracteres, e o que passou foi descartado junto com o buffer. É ruim perder, mas seria muito pior se ele sobrescrevesse uma região de memória que não estava permitida. Então ele mostrou certinho.

**[Trecho corrompido: a transcrição automática entra em repetição ("se fossem se fossem...") e depois em texto sem sentido, com caracteres de outros idiomas. O conteúdo desse trecho não pôde ser recuperado e nada foi inventado. Recomenda-se refazer a transcrição do final deste vídeo.]**

## Alinhando colunas com `%10s` e `%-10s`

[O trecho a seguir foi retomado após o trecho corrompido; o início da frase está perdido.] ... meus dados em colunas, porque cada nome tem um tamanho diferente e a minha coluna não fica alinhada. Por exemplo, aqui: cada coluna tem um tamanho diferente, e fica torta. **Como eu faço para alinhar?** Em vez de só `%s`, eu falo para o `printf`: reserve pelo menos **10 espaços** para essa string, para poder exibir o meu nome. Isso é `%10s`. Agora as colunas ficam alinhadas, só que o texto fica alinhado **à direita**, e eu quero alinhar à esquerda. Então coloco o sinal de menos: **`%-10s`**. Ele reserva 10 espaços para a string e alinha à esquerda. Olha lá: está reservando 10 espaços e alinhando à esquerda. Isso é muito útil quando você tem que exibir dados tabulares, em colunas alinhadas.

```c
printf("%10s\n", nome);    // 10 espaços, alinhado à direita
printf("%-10s\n", nome);   // 10 espaços, alinhado à esquerda
```

## Encerramento

Para esse conteúdo não ficar muito extenso, dividimos essa aula em **duas partes**. Na segunda parte, aprenderemos a utilizar algumas funções da biblioteca `string.h`. É isso, pessoal. Um grande abraço, bons estudos e até a próxima!

## Avisos da aula

Esta é a primeira de duas partes sobre strings (a segunda trata das funções de `string.h`). Nenhum prazo ou prova foi mencionado.
