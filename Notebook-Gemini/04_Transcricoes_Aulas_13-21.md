# Transcrições Verificadas das Videoaulas – Aulas 13 a 21

O que o professor fala em cada videoaula, organizado por seções na ordem do vídeo. Serve para saber em qual vídeo (e em que parte dele) cada assunto aparece. Em caso de divergência técnica, vale o Material de Ensino Verificado.

<!-- Transcrição: Aula_13_Strings_Parte_1.md -->
## Aula 13 – Strings (Parte 1)

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Morial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

**Atenção:** perto do final da aula, a transcrição automática ficou **corrompida** (repetições e texto sem sentido) e esse trecho não pôde ser recuperado. Ele está sinalizado na seção "Teste com nomes longos".

### Tópicos abordados

- O que é uma string (vetor de caracteres) e o terminador `\0`
- Declarar e inicializar uma string; aspas duplas
- Ler texto do teclado: `gets` (não usar), `scanf("%s")`, `scanf` com limite e `fgets`
- Remover o `\n` salvo pelo `fgets` (função `strcspn`)
- Exibir strings (`%s`) e caracteres (`%c`)
- Matriz de caracteres para guardar vários nomes
- Limpar o buffer (`setbuf`, `__fpurge`)
- Alinhar colunas com `%10s` e `%-10s`

### Glossário

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

### Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e na aula de hoje vamos falar sobre as **strings**.

Na aula passada falamos sobre vetores, mas os exemplos, na grande maioria, foram de números inteiros e reais. Hoje vamos aprender o que eu consigo fazer com um **vetor de caracteres**. Um caractere é apenas uma letra; se eu juntar um vetor de caracteres, juntando várias letras, consigo salvar um texto. E essa sequência de caracteres tem o nome de **string**. Então, a string nada mais é do que **um vetor de caracteres que eu uso para salvar um texto**.

### O terminador `\0`

Como a gente vai saber onde esse texto termina? Sempre que eu utilizo um vetor de caracteres como uma string, eu tenho que **reservar uma última posição** no meu vetor para colocar um terminador, que, na linguagem C, é o caractere **`\0`** (barra zero). Ou seja, se eu quero salvar um texto de até 10 caracteres, eu tenho que criar um vetor de **tamanho 11**, porque a última posição vai ser usada como terminador.

### Declarando e inicializando

Como eu faço na linguagem? Crio um vetor `char` e, entre colchetes, o seu tamanho: 11. Então eu tenho um vetor de 11 caracteres, mas apenas 10 são úteis, porque o último elemento fica reservado.

Eu já posso inicializar o vetor: coloco o igual e o texto entre **aspas duplas**. Para o computador, toda sequência de caracteres entre aspas duplas é um texto.

```c
char texto[11] = "teste";   // [verificar: o nome da variável no original é confuso]
```

Reparem que, no fundo, nós utilizamos strings **desde o primeiro dia de aula**, no nosso "Hello World": o texto que você passa lá, "Hello World", está entre aspas duplas; então você está passando, na verdade, uma string como parâmetro para a função `printf`.

O que vai acontecer quando eu inicializo com "teste"? O `t` vai para a posição 0, o `e` para a posição 1, o `s` para a posição 2, e assim por diante. Quando ele termina, automaticamente a linguagem C coloca um **`\0` na primeira posição livre**. Por quê? Nesse caso eu tenho um vetor de 11 posições, mas o texto "teste" usa apenas 5. Como ele vai saber até onde são caracteres úteis e a partir de onde é lixo? Quem faz isso é o `\0`: ele marca até onde tem informação útil; a partir dele é lixo.

### Lendo texto do teclado

Como fazer para receber um texto pelo teclado? Existem algumas opções diferentes, que vocês podem procurar em livros e na internet; não tem uma única maneira de fazer isso.

#### 1) `gets` (não use)

A primeira é a função `gets` ("*get string*"): ela pega a string do teclado. Era uma função muito utilizada antigamente, **mas não é segura**, porque ela pode passar do tamanho máximo da sua string. Por exemplo: a sua string tem tamanho 10, mas o usuário digita 20 caracteres. Todos os caracteres que passarem do tamanho do vetor serão escritos **fora da região permitida**, podendo sobrescrever outras variáveis e causar erros no seu programa, inclusive finalizar a execução; o comportamento é inesperado. Então a ideia é **não utilizar essa função**. Ela foi descontinuada: nas novas versões da linguagem [verificar], mantém-se por compatibilidade, mas não se recomenda o uso.

#### 2) `scanf` com `%s`

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

#### 3) `fgets` (recomendada na disciplina)

É uma função mais moderna, e **vamos recomendar o uso dela aqui na disciplina**: a **`fgets`**. O que essa função recebe? **Três parâmetros**:

1. o nome da string onde vão ser salvos os dados;
2. a quantidade máxima de caracteres;
3. de onde os dados estão vindo: **`stdin`**, *standard input*, a entrada padrão, que nesse caso é o teclado.

Ele vai pegar do fluxo de informação do teclado, no máximo aquela quantidade de caracteres, e salvar no vetor `nome`. Assim ele garante o tamanho máximo correto, não vai ultrapassar nem escrever fora do vetor.

Só que ele tem um **pequeno inconveniente**: o *enter* que você digita para finalizar a entrada (`\n`) **também fica salvo dentro do vetor**, e isso pode gerar erro ao armazenar ou exibir esse texto depois.

**Tem como corrigir? Tem.** Naquela posição onde está o `\n`, eu vou sobrescrever com `\0`. Para isso, uso uma função que retorna o índice do vetor onde está o `\n`, e naquela posição escrevo `\0`. E, por boa prática, também limpo o buffer (com `setbuf`) [verificar].

### Na prática: lendo um nome com `fgets`

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

### Matriz de caracteres: vários nomes

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

### Limpando o buffer com `__fpurge`

Rodando esse código (digitando "João", "Maria"...), a princípio o seu código está ok. Porém, às vezes você pode encontrar algum erro no seu computador. Um nome muito grande, como "José da Silva...", às vezes dá erro, porque o `setbuf` não conseguiu limpar o buffer. Então vou mostrar um recurso que vocês podem utilizar nesse caso: a função **`__fpurge`** [verificar: o original diz "app purge", "F purge"]. Ela **não é a função recomendada** para limpar o buffer, mas pode ser útil.

Há uma diferença dependendo do sistema que você usa (Windows ou Linux) [verificar: trecho confuso no original]: no caso do Linux, ela é escrita com **dois underlines** no começo. Para utilizá-la também é preciso incluir a biblioteca `stdio_ext.h` [verificar: o original diz "STDEOXT"]. Ela apaga tudo que tiver no fluxo da entrada padrão.

```c
#include <stdio_ext.h>

__fpurge(stdin);   // descarta o que sobrou na entrada padrão
```

### Teste com nomes longos

Vamos executar para ver, digitando valores: "Maria", "Eduardo", "Joaquim da Silva", e assim por diante. Olha lá: **ficou salvo só o que eu permiti que fosse salvo**. Eu tinha 10 colunas, então devia salvar até 9 caracteres. "Joaquim da Silva" pegou só os 9 primeiros caracteres, e o que passou foi descartado junto com o buffer. É ruim perder, mas seria muito pior se ele sobrescrevesse uma região de memória que não estava permitida. Então ele mostrou certinho.

**[Trecho corrompido: a transcrição automática entra em repetição ("se fossem se fossem...") e depois em texto sem sentido, com caracteres de outros idiomas. O conteúdo desse trecho não pôde ser recuperado e nada foi inventado. Recomenda-se refazer a transcrição do final deste vídeo.]**

### Alinhando colunas com `%10s` e `%-10s`

[O trecho a seguir foi retomado após o trecho corrompido; o início da frase está perdido.] ... meus dados em colunas, porque cada nome tem um tamanho diferente e a minha coluna não fica alinhada. Por exemplo, aqui: cada coluna tem um tamanho diferente, e fica torta. **Como eu faço para alinhar?** Em vez de só `%s`, eu falo para o `printf`: reserve pelo menos **10 espaços** para essa string, para poder exibir o meu nome. Isso é `%10s`. Agora as colunas ficam alinhadas, só que o texto fica alinhado **à direita**, e eu quero alinhar à esquerda. Então coloco o sinal de menos: **`%-10s`**. Ele reserva 10 espaços para a string e alinha à esquerda. Olha lá: está reservando 10 espaços e alinhando à esquerda. Isso é muito útil quando você tem que exibir dados tabulares, em colunas alinhadas.

```c
printf("%10s\n", nome);    // 10 espaços, alinhado à direita
printf("%-10s\n", nome);   // 10 espaços, alinhado à esquerda
```

### Encerramento

Para esse conteúdo não ficar muito extenso, dividimos essa aula em **duas partes**. Na segunda parte, aprenderemos a utilizar algumas funções da biblioteca `string.h`. É isso, pessoal. Um grande abraço, bons estudos e até a próxima!

### Avisos da aula

Esta é a primeira de duas partes sobre strings (a segunda trata das funções de `string.h`). Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_13_Strings_Parte_2.md -->
## Aula 13 – Strings (Parte 2): funções da `string.h`

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

### Tópicos abordados

- Por que strings precisam de funções para copiar e comparar
- Biblioteca `string.h`
- `strlen`: comprimento da string (e o caso dos caracteres acentuados)
- `strcpy`: copiar uma string para outra
- `strcat`: concatenar (juntar) strings
- `strcmp`: comparar strings (e a diferença entre maiúsculas e minúsculas)
- `strcasecmp`: comparar ignorando maiúsculas/minúsculas

### Glossário

- **`string.h`:** biblioteca padrão da linguagem C com funções para manipular strings.
- **`strlen(s)`:** retorna quantos caracteres (bytes) existem na string **até o `\0`**.
- **`strcpy(destino, origem)`:** copia o conteúdo da origem para o destino; o que havia no destino é perdido.
- **`strcat(destino, origem)`:** concatena; copia o conteúdo da origem **no final** do destino, sem apagar o que já estava lá.
- **`strcmp(s1, s2)`:** compara duas strings e retorna um número; **zero significa que são iguais**.
- **`strcasecmp(s1, s2)`:** compara duas strings desconsiderando maiúsculas e minúsculas.
- **Destino × origem:** na `strcpy` e na `strcat`, o primeiro parâmetro recebe e o segundo fornece o conteúdo.
- **Concatenar:** juntar uma string ao final de outra.

---

### Introdução

Olá, eu sou o professor Muriel e esta é a segunda parte da nossa aula sobre strings.

Na primeira parte, nós aprendemos que strings são apenas um vetor de caracteres que utilizamos para salvar e manipular texto. Aprendemos como recuperar uma string a partir do teclado e exibi-la na tela. Aprendemos também a utilizar uma matriz para armazenar um conjunto de strings.

No entanto, é muito comum precisarmos manipular esses dados, como, por exemplo, **copiar** e **comparar**. Só que não é tão simples como numa variável comum, porque agora eu não estou falando apenas de uma variável: estou falando de **um vetor inteiro** que deve ser copiado, **um vetor inteiro** que deve ser comparado. Para isso, utilizaremos uma biblioteca padrão da linguagem C chamada **`string.h`**. Para facilitar a manipulação das strings, vamos usar as funções dela.

Você pode consultar a relação completa das funções que ela tem em um site, ou então no terminal do Linux, digitando `man string` [verificar: o original está confuso], que mostra uma lista de todas as funções. Vamos fazer uma passadinha rápida em 4 exemplos, que são funções bastante úteis.

### `strlen`: comprimento da string

A primeira é a **`strlen`** (*string length*), o comprimento da string. Por exemplo: eu tenho uma string com tamanho 20 e o usuário digitou um nome que tem só 3 letrinhas. Como eu faço para saber **quantas letras**, quantos caracteres foram digitados? A função `strlen` retorna **quantos caracteres foram digitados até o `\0`**.

Vamos ver no código como fica. Tenho aqui uma string salva em `nome`, com tamanho máximo de 20 caracteres. Eu quero saber quantos caracteres foram digitados, então crio uma variável do tipo inteiro para salvar esse valor, `tamanho`. Aqui vou chamar a minha função, que está na `string.h`: `strlen`, de *length* ("comprimento"). Qual string eu quero? A string `nome`. Passo o nome da string como parâmetro, salvo o retorno na variável `tamanho` e depois posso exibir.

```c
#include <stdio.h>
#include <string.h>

int main()
{
    char nome[21];
    int tamanho;

    printf("Digite o nome: ");
    fgets(nome, 21, stdin);
    nome[strcspn(nome, "\n")] = '\0';   // [verificar: não aparece na transcrição]

    tamanho = strlen(nome);
    printf("Tamanho: %d\n", tamanho);

    return 0;
}
```

Exibindo: um nome de 3 letras mostra 3 caracteres; "Joaquina" mostra 8 caracteres [verificar: exemplos do original confusos].

**Cuidado com os caracteres especiais.** Se você digitar, por exemplo, "João", os caracteres especiais, com til, acento e cedilha, ocupam **dois bytes** da memória [verificar: o original diz "para a string e bilhos", provavelmente se refere à codificação UTF-8]. Nesse caso, "João" gasta **5 posições** no seu vetor. Então a `strlen` **não retorna, necessariamente, a quantidade de letras**, mas sim a quantidade de posições ocupadas até chegar no `\0` dentro do seu vetor.

### `strcpy`: copiar uma string

Outra função é a **`strcpy`** (*string copy*): copia o conteúdo de uma string para outra. Se eu não tivesse essa função, eu teria que copiar letra por letra, fazendo um `for`: pega a letra 0 daqui, copia para a letra 0 de lá; a 1 daqui para a 1 de lá; a 2 daqui para a 2 de lá.

Vamos ver como ficaria no nosso código. Eu tenho duas strings: na primeira, já inicializei com o nome "Maria"; a segunda não tem nada. Eu quero copiar todo o conteúdo desse vetor para esse. Em vez de fazer um `for` copiando letra por letra, uso **`strcpy`**: o primeiro parâmetro é **quem vai receber** (o destino), a `saida`; o segundo é **de onde está vindo** (a origem), o `nome`. Ele copia as letrinhas do `nome` para a `saida`. Depois, um `printf` da saída.

```c
char nome[21] = "Maria";   // [verificar: tamanhos]
char saida[21];

strcpy(saida, nome);       // destino, origem
printf("%s\n", saida);
```

Executando: a saída é "Maria". Repare que o `printf` do meu vetor `saida`, que não tinha nada, agora mostra "Maria". **Se tivesse algo na `saida`, ele seria sobrescrito: perderia tudo o que tinha antes** [verificar: trecho confuso no original].

### `strcat`: concatenar (juntar) strings

E se eu **não quiser perder** o que já estava na string, e sim **juntar duas strings**? Nesse caso, vou utilizar a **`strcat`** (*string concatenate*), a função que concatena, que junta as strings. Ela vai juntar o conteúdo da segunda string **ao final da primeira**, sem perder o que tinha lá antes.

Como vai ficar? Eu tenho a string `nome` com um conteúdo (um nome, terminado em espaço) e a string `sobrenome` com outro conteúdo (por exemplo, "da Silva") [verificar: exemplo do slide confuso], e quero juntar para ficar com nome e sobrenome. Se eu usasse o `strcpy`, ele apagaria o conteúdo do `nome`; eu não quero isso. Então, uso o `strcat`: o primeiro parâmetro é onde vai ser salvo (`nome`) e o segundo é de onde está vindo (`sobrenome`). Ele pega todo o conteúdo da string `sobrenome` e copia no **final** da string `nome`. Agora, se eu exibir o `nome`, vai estar tudo lá: antes era só o nome e, depois do `strcat`, aparece o nome com o conteúdo do sobrenome.

```c
char nome[41] = "João ";        // [verificar: valores e tamanhos]
char sobrenome[21] = "da Silva";

strcat(nome, sobrenome);        // destino, origem
printf("%s\n", nome);           // João da Silva
```

Repare que o `strcat` **não adiciona espaço**: o espaço aparece entre eles só porque eu coloquei um espaço na hora de inicializar a string.

### `strcmp`: comparar strings

Finalizando, temos um último exemplo: a função para **comparar**. Se eu quero comparar dois números, é fácil: `a == b`. Mas, se eu for comparar dois textos, não estou comparando duas variáveis simples: são dois vetores. Eu teria que comparar a posição zero daqui com a posição zero de lá, a um daqui com a um de lá, e assim por diante; então teria que fazer um `for` para testar isso.

Existe uma função para isso: a **`strcmp`** (*string compare*), comparação de strings. Ela recebe as duas strings que eu quero comparar e retorna **um número**:

- **zero**: as duas strings são **iguais**;
- **negativo**: a string 1 é menor que a string 2 (vem antes);
- **positivo**: a string 1 é maior que a string 2 (vem depois).

[verificar: o original associa "positivo" a "menor" e "negativo" a "maior", o inverso do comportamento padrão do `strcmp`; no padrão da linguagem C, o retorno é negativo quando a string 1 vem antes da string 2 e positivo quando vem depois.]

Como assim, "maior" e "menor"? É pela ordem alfabética: para o computador, "Ana" é menor que "Bianca", porque "Ana" vem antes no alfabeto. Então a função retorna um número, e eu vou comparar esse número com zero. **Se o resultado dessa função for igual a zero, os nomes são iguais. Qualquer outro valor diferente de zero, os nomes não são iguais.**

Vamos ao código. Tenho aqui o meu exemplo: "João" e "João", `nome1` e `nome2`. Eu quero testar se são iguais ou não. Eu **não posso** fazer `nome1 == nome2`, porque são vetores. Então uso `strcmp(nome1, nome2)`: ele me retorna um número, e eu tenho que testar. Se o retorno dessa função for zero, os nomes são iguais.

```c
if (strcmp(nome1, nome2) == 0) {
    printf("Os nomes são iguais\n");
} else {
    printf("Os nomes não são iguais\n");
}
```

Executando: os nomes são iguais. Agora testei "Maria": os nomes não são iguais. Agora testei "João" com o "J" maiúsculo contra "joão" com o "j" minúsculo: os nomes não são iguais. Repare: aqui está com o "J" maiúsculo, aqui com o "j" minúsculo. **A função `strcmp` diferencia maiúsculas de minúsculas**: para ela, "João" com "J" maiúsculo é diferente de "joão" com "j" minúsculo.

### `strcasecmp`: ignorando maiúsculas e minúsculas

Tem como fazer a comparação **desconsiderando** a diferença entre maiúsculas e minúsculas? Tem uma função alternativa à `strcmp`: a **`strcasecmp`** [verificar: o original diz "S-T-R-K-S-M-P"]. Ela compara as duas strings desconsiderando se é maiúsculo ou minúsculo. Então, nesse caso, mesmo que seja maiúsculo ou minúsculo, ele vai dizer que os nomes são iguais [verificar: a biblioteca e a disponibilidade dessa função dependem do compilador].

```c
if (strcasecmp(nome1, nome2) == 0) {
    printf("Os nomes são iguais\n");   // "João" e "joão" são iguais
}
```

### Encerramento

Com isso finalizamos a aula de hoje. No material, tem para vocês alguns exercícios para praticarem os conceitos vistos na aula de hoje. Bons estudos, um grande abraço e até a próxima!

### Avisos da aula

Há exercícios no material da disciplina sobre as funções de `string.h`. Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_14_Estruturas_e_Definicao_de_Tipo.md -->
## Aula 14 – Estruturas (Structs) e Definição de Tipo

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Proceum Memorial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. A transcrição automática desta aula está **muito degradada**; o texto foi reconstruído com apoio dos slides da Aula 14 (`Material-Ensino-Verificado/Aula_14_Structs.md`). Os códigos foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

### Tópicos abordados

- Estruturas homogêneas (vetores/matrizes) × heterogêneas (structs)
- Definição de uma `struct` e declaração de variáveis
- Acesso aos membros com o operador ponto (`.`)
- Inicialização e atribuição de estruturas
- Vetor de estruturas
- Estruturas aninhadas
- `typedef`: criando novos nomes de tipo

### Glossário

- **Estrutura (struct) / registro:** conjunto de variáveis de **tipos diferentes** relacionadas entre si, agrupadas sob um nome.
- **Membro / campo:** cada variável declarada dentro da estrutura.
- **Operador ponto (`.`):** acessa um membro de uma variável do tipo estrutura (`aluno.idade`).
- **Definição × declaração:** a definição ensina ao computador como é a estrutura (não reserva memória); a declaração cria a variável (reserva memória).
- **`typedef`:** cria um novo nome (apelido) para um tipo existente.

---

### Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos falar sobre **estruturas e definições de tipos**.

Em um programa, nós sempre vamos encontrar um conjunto de variáveis que estão relacionadas à realização de uma determinada tarefa, e é conveniente para nós, programadores, ter como agrupar essas variáveis. Nas aulas anteriores aprendemos a fazer isso com **vetores e matrizes**, que são estruturas **homogêneas**: agrupam valores do mesmo tipo. No entanto, se eu quiser uma estrutura **heterogênea**, ou seja, com tipos diferentes, e que eu possa identificar por um nome específico, podemos utilizar as **estruturas** ou **registros**.

### O que é uma estrutura heterogênea

É um conjunto de variáveis de tipos diferentes, mas que têm uma relação em comum; também conhecido como estrutura ou registro. Por exemplo, uma estrutura baseada nos dados de um aluno pode ter várias variáveis: o **nome**, a **idade**, o **peso** e a **altura** desse aluno. Essas variáveis são denominadas **membros** ou **campos** da estrutura. Estou criando uma variável que tem dentro dela várias outras variáveis: um vetor de caracteres para o nome, um inteiro para a idade, um `float` para o peso e outro `float` para a altura.

Essa estrutura permite que o usuário **defina um novo tipo de dados** a partir dos tipos primitivos que já existem na linguagem, como `int`, `char` e `float`.

### Definindo uma estrutura em C

Na linguagem C usamos a palavra reservada **`struct`** (abreviação de *structure*, estrutura em inglês), seguida de um espaço, do nome da estrutura e de um bloco de código entre chaves com a lista de todas as variáveis que a compõem, ou seja, todos os membros. Depois de fechar a chave, **precisa de um ponto e vírgula**. Atenção a esse ponto e vírgula, porque essa definição de estrutura é um comando.

```c
struct Aluno {
    char nome[50];
    int idade;
    float peso;
    float altura;
};
```

Quando eu faço a **definição** da estrutura, **ainda não estou reservando nada na memória RAM**: só estou ensinando ao computador quais são os membros daquela estrutura. A memória é reservada quando faço a **declaração**:

```c
struct Aluno aluno_1, aluno_2, aluno_3;
```

Agora sim estou reservando espaço na memória RAM para três alunos. Cada aluno tem um nome, uma idade, um peso e uma altura.

Por convenção, vamos sempre colocar o nome da estrutura com a **inicial maiúscula** e o restante em minúsculo [verificar].

### Acessando os membros

Para acessar os campos ou membros, utilizo o **operador ponto**: à esquerda, o nome da variável que representa a estrutura; à direita, o nome do campo que estou acessando. Por exemplo, `aluno_1.idade`, `aluno_1.peso`.

Resumindo:

1. Defino a estrutura: `struct`, espaço, nome da estrutura e, entre chaves, os membros (só ensina ao computador; não reserva memória).
2. Declaro uma variável: `struct`, nome da estrutura, espaço, nome da variável (agora reserva espaço na memória RAM).
3. Para acessar: o ponto.

### Inicializando e atribuindo

Assim como eu fazia com vetores, posso inicializar uma estrutura: coloco `=` e, entre chaves e separados por vírgula, o valor de cada campo **na ordem em que fiz a definição**. O nome é uma string, então vai entre aspas duplas.

```c
struct Aluno aluno = {"Rosinosberto", 53, 72.5, 1.64};
```

[verificar: na transcrição os valores ditos estão ininteligíveis; os valores acima são os do slide.]

Posso também **atribuir** uma estrutura a outra, como faria normalmente com variáveis:

```c
struct Aluno meu_aluno = {"Rosinosberto", 53, 72.5, 1.64};
struct Aluno seu_aluno;

seu_aluno = meu_aluno;   // copia todos os campos: nome, idade, peso e altura
```

Quando faço uma atribuição, **ele copia todos os campos da estrutura**.

### No código: criando e usando uma estrutura

Tenho aqui um código comum, sem utilizar estrutura, tratando de um aluno com nome, idade, peso e altura como variáveis separadas. Vou criar a estrutura **fora da `main`, antes dela**: `struct`, o nome `Aluno`, e entre chaves coloco os campos, finalizando com ponto e vírgula. Agora essas variáveis, que têm uma relação comum mas são de tipos diferentes, fazem parte da minha estrutura.

Já reservei memória? Ainda não: só ensinei ao computador que um aluno é composto de nome, idade, peso e altura. Para criar a variável, dentro da `main`: `struct Aluno aluno;`. Posso inicializá-la entre chaves:

```c
struct Aluno aluno = {"Rosinosberto", 56, 72.5, 1.68};   // [verificar valores]

printf("Nome: %s\n", aluno.nome);
printf("Idade: %d\n", aluno.idade);
printf("Peso: %.2f\n", aluno.peso);
printf("Altura: %.2f\n", aluno.altura);
```

E se eu quiser inicializar campo por campo, separadamente? Posso fazer `aluno.nome = "Rosinosberto";`? **Não posso**, porque estou copiando uma string, um vetor de caracteres. Nesse caso uso o que aprendemos na aula passada, o **`strcpy`** (primeiro quem vai receber, depois de onde está vindo). Os demais campos posso atribuir direto:

```c
strcpy(aluno.nome, "Rosinosberto");
aluno.idade = 56;
aluno.peso = 72.5;
aluno.altura = 1.68;
```

### Vetor de estruturas

Posso fazer um vetor de estruturas? Pode, sem problema nenhum. Se eu não quero salvar os dados de um cliente só, mas de três clientes, faço um vetor da estrutura `Cliente` com 3 posições, muito parecido com o que fazíamos antes:

```c
struct Cliente cadastros[3] = {
    {"Paulo Teste", "Rua do Torto, 1234", 56},
    {"Ze Roberto", "Rua dos Robertos, 4321", 65},
    {"Maria Carla", "Av. Sem Fundo, 778", 28}
};

cadastros[0] = cadastros[1];   // copia o Zé Roberto para a posição 0
```

Da mesma maneira que faço com vetores, ao copiar o cadastro do índice 1 para o índice 0, o Zé Roberto **sobrescreve** o conteúdo que havia antes (o Paulo Teste).

### Estruturas aninhadas

Posso criar estruturas mais complexas, uma estrutura dentro de outra? Pode. Por exemplo, o `Cadastro` tem nome e idade, mas supondo que eu queira guardar também o endereço, e o endereço em si é uma estrutura composta do nome da rua e do número:

```c
struct Endereco {
    char rua[31];
    int numero;
};

struct Cadastro {
    char nome[21];
    int idade;
    struct Endereco end;
};
```

Para acessar o membro mais interno, uso o ponto **duas vezes**, porque é uma estrutura dentro de outra:

```c
struct Cadastro cad;
cad.end.numero = 1234;
```

### No código: lendo um vetor de alunos

Neste exemplo, agora quem digita o nome, a idade, o peso e a altura é o usuário. No `scanf`, em vez de passar `&idade`, passo `&aluno.idade`, `&aluno.peso`, `&aluno.altura`; e para o nome uso o `fgets` em `aluno.nome`, fazendo os tratamentos do buffer que vimos na aula passada.

E para um vetor de estruturas? Não quero salvar só um aluno, quero salvar a sala inteira. Chamo a variável de `alunos`, no plural, com 3 posições, e coloco todo o código de leitura dentro de um laço `for` de 0 até 2 [verificar: o professor menciona usar um índice "sem sinal", `unsigned int`]. Onde vai o colchete? Eu tenho um vetor de alunos, então é `alunos[i].nome`, `alunos[i].idade`, `alunos[i].peso`, `alunos[i].altura`.

Depois de digitar a altura e dar Enter, o Enter fica no buffer e, ao voltar para ler o próximo nome, daria problema de "lixo". Por isso coloco mais um `setbuf` para limpar o buffer.

```c
struct Aluno alunos[3];

for (unsigned int i = 0; i < 3; i++) {
    printf("Nome: ");
    fgets(alunos[i].nome, 50, stdin);
    alunos[i].nome[strcspn(alunos[i].nome, "\n")] = '\0';
    printf("Idade: ");
    scanf("%d", &alunos[i].idade);
    printf("Peso: ");
    scanf("%f", &alunos[i].peso);
    printf("Altura: ");
    scanf("%f", &alunos[i].altura);
    setbuf(stdin, NULL);   // absorve o Enter deixado pelo scanf
}
```

[Código reconstruído; verificar.] Executando, recebi os três alunos e eles foram exibidos [verificar: nomes citados na execução estão ininteligíveis, algo como "Ana" e "José"].

### `typedef`: definição de tipo

Um recurso que ajuda muito na hora de utilizar estruturas é transformá-las em um **novo tipo**. Para isso uso o comando **`typedef`** (*type definition*, definição de tipo). A sintaxe é: `typedef`, espaço, tipo existente, espaço, novo tipo.

No caso de estruturas, uso o `typedef` diretamente na estrutura que estou criando. Como o nome da estrutura deixa de ser relevante, **posso suprimi-lo**, e coloco o nome do novo tipo no final, depois da chave:

```c
typedef struct {
    char nome[50];
    int idade;
    float peso;
    float altura;
} Aluno;

Aluno meu_aluno;   // não preciso mais escrever "struct"
```

Comparando:

```c
// Sem typedef                      // Com typedef
struct MeuCadastro {                typedef struct {
    char nome[21];                      char nome[21];
    char endereco[31];                  char endereco[31];
    int idade;                          int idade;
};                                  } MeuCadastro;

struct MeuCadastro X[10];           MeuCadastro X[10];
```

Agora, assim como eu tenho os tipos `int`, `char` e `float`, eu tenho o tipo `Aluno`, composto por quatro campos: nome, idade, peso e altura.

### Encerramento

Com isso finalizamos a aula de hoje. Nos slides há exercícios para vocês praticarem. Um grande abraço, bons estudos e até a próxima!

### Avisos da aula

O professor menciona exercícios nos slides [verificar: o PDF da Aula 14 não contém lista de exercícios]. Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_15_Uniao_e_Enumeracao.md -->
## Aula 15 – União (Union) e Enumeração (Enum)

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Mariau"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O texto foi reconstruído com apoio dos slides da Aula 15 (`Material-Ensino-Verificado/Aula_15_Union_e_Enum.md`). Os códigos foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar]. Um trecho perto do fim está ininteligível na transcrição original.

### Tópicos abordados

- Diferença entre estrutura (`struct`) e união (`union`)
- Sintaxe e uso de `union`; tamanho ocupado na memória
- Sobrescrita entre membros da união
- Quando usar `union`
- Enumerações (`enum`): sintaxe, valores padrão e valores definidos
- `enum` no `switch` (exemplo do menu de cores)
- Juntando tudo: `enum` + `union` + `struct` + `typedef`

### Glossário

- **União (`union`):** agrupamento de membros de tipos distintos que **compartilham a mesma região de memória**; só um deles guarda valor válido por vez.
- **Enumeração (`enum`):** tipo definido pelo usuário que restringe a variável a um conjunto de **constantes inteiras nomeadas**.
- **Enumerador:** cada constante de um `enum` (ex.: `SEGUNDA`, `DINHEIRO`).
- **Discriminador:** membro (geralmente um `enum`) que indica qual membro de uma união está válido.

---

### Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos falar sobre os tipos **união** e **enumeração**.

Na aula passada falamos sobre as estruturas, que são agrupamentos de variáveis de tipos distintos, compostas por membros que **coexistem**. Nesta aula vamos falar sobre as uniões. As uniões também são agrupamentos de variáveis de tipos distintos, só que **os membros não podem coexistir**.

### União × estrutura

Qual a diferença de uma união para uma estrutura? A **estrutura** armazena **simultaneamente** todos os membros na memória. Já a **união** armazena **apenas um membro de cada vez**: todos os membros compartilham a **mesma região de memória**.

Na linguagem C, a união é feita com a palavra reservada **`union`**. A sintaxe é: `union`, espaço, o nome da união e, entre chaves, todos os membros, igual fazíamos nas estruturas.

```c
union Uniao {
    char letra;
    int numero;
};
```

Nesse exemplo, só posso ter **ou** a letra armazenada **ou** o número armazenado, nunca os dois ao mesmo tempo. Essa declaração apenas **define o tipo** da união, mas não reserva espaço na memória, assim como acontecia nas estruturas. Depois de definida, posso declarar uma variável desse tipo: `union Uniao nome;`. Eu poderia também usar `typedef`, igual fazia com as estruturas, sem problema nenhum.

### Quanto espaço a união ocupa?

É igual às estruturas? **Não.** A união ocupa apenas o espaço do **membro de maior tamanho**. Por exemplo, aqui o `int numero` ocupa 4 bytes e o `char letra` ocupa 1 byte. Qual é o espaço que essa união vai ocupar? O do tipo de maior tamanho, o `numero`: vou reservar **4 bytes** na memória RAM para essa variável do tipo união.

### Salvando e exibindo valores

É muito parecido com a estrutura: faço a definição fora da `main`, declaro a variável e acesso os membros com o **ponto**.

```c
union Numero {
    int inteiro;
    float real;
};

int main()
{
    union Numero numero;

    numero.real = 3.14;
    printf("%f\n", numero.real);

    numero.inteiro = 15;
    printf("%d\n", numero.inteiro);

    return 0;
}
```

Qual é o problema e a principal diferença para a estrutura? Como **apenas um desses valores existe ao mesmo tempo** na memória RAM, quando eu defino `numero.inteiro`, estou **sobrescrevendo**, destruindo a informação que estava em `numero.real`. Escrevi um dos membros, destruí o outro. Na hora de exibir, ele exibe corretamente apenas o **último valor** escrito; se eu tentar exibir o `real` como `float` depois de escrever o inteiro, vai mostrar **lixo**.

### Quando usar `union`?

- Quando **não sei exatamente qual tipo de dado** vou armazenar (por exemplo, não sei se vou salvar um `int` ou um `float`), mas só preciso de um de cada vez.
- Principalmente quando quero **economizar memória**. Em alguns tipos de dispositivo a memória é bem restrita [verificar], então, em vez de deixar duas variáveis criadas ocupando espaço, uso uma união.

### No código: quantidade de um produto

Suponha que eu vá salvar os dados de um produto, mas não sei se a quantidade dele é calculada em **unidades** ou em **peso** (vendido a granel). Crio uma união `Quantidade` com os dois tipos: `int unidade` (por pacote) e `float peso` (a granel). Posso usar o `typedef` que aprendemos na aula passada para não ter que escrever `union` toda vez.

```c
typedef union {
    int unidade;
    float peso;
} Quantidade;

int main()
{
    Quantidade minha_quantidade;

    minha_quantidade.unidade = 15;
    printf("Quantidade: %d\n", minha_quantidade.unidade);   // 15

    minha_quantidade.peso = 23.8;
    printf("Quantidade: %.1f\n", minha_quantidade.peso);    // 23.8

    printf("Unidade: %d\n", minha_quantidade.unidade);      // lixo!
    return 0;
}
```

[Código reconstruído; verificar.] Repare: depois que escrevi o peso, se eu tentar mostrar as unidades, ele vai interpretar os bytes do `float` como `int`, e o valor exibido é um **lixo**, porque quando escrevo o 23,8 eu destruo o valor 15 que estava em `unidade`.

### Enumerações (`enum`)

O próximo recurso são os **tipos enumerados**. A enumeração também é um tipo definido pelo usuário, só que ela **define quais valores aquela variável pode assumir**: é um conjunto restrito de **constantes**.

A sintaxe é: `enum`, o nome da enumeração e, entre chaves, os possíveis valores separados por vírgula, terminando com ponto e vírgula. Automaticamente o compilador atribui inteiros às constantes: `VALOR1` vale **0**, `VALOR2` vale 1, `VALOR3` vale 2, e assim por diante.

Exemplo: quero uma variável que armazene **dias da semana**; ela só pode ter sete valores.

```c
enum Semana { DOMINGO, SEGUNDA, TERCA, QUARTA, QUINTA, SEXTA, SABADO };

int main()
{
    enum Semana hoje;
    hoje = QUINTA;

    if (hoje == SEGUNDA) {
        /* ... */
    } else if (hoje == TERCA) {
        /* ... */
    }
    return 0;
}
```

`enum Semana` é o tipo da minha enumeração; `hoje` é o nome da variável. Posso atribuir (`hoje = QUINTA`) e comparar normalmente.

### `enum` no `switch`

Posso usar no `switch`? Pode. Por exemplo, formas de pagamento que só podem ser de três tipos: dinheiro, cartão ou vale-refeição.

```c
enum FormaPagamento { DINHEIRO, CARTAO, VALE_REFEICAO };

enum FormaPagamento opcao = DINHEIRO;

switch (opcao) {
    case DINHEIRO:      /* ... */ break;
    case CARTAO:        /* ... */ break;
    case VALE_REFEICAO: /* ... */ break;
}
```

Seria equivalente a usar `case 0`, `case 1`, `case 2` com números inteiros, mas fica muito mais legível.

### Definindo os valores

Por padrão, o primeiro valor é 0, o segundo é 1, o terceiro é 2, e assim por diante. Mas, caso precise, você pode definir o valor inicial. Se eu quero que comece no 30: `VALOR1 = 30`, e automaticamente os próximos serão 31, 32, 33, 34.

Tem que ser sequencial? **Não.** Por exemplo: `VALOR1 = 15`; o seguinte, sem nada, é 16; `VALOR3 = 45`, consequentemente o próximo é 46; e o último, 70.

```c
enum nomeEnum { VALOR1 = 15, VALOR2, VALOR3 = 45, VALOR4, VALOR5 = 70 };
// 15, 16, 45, 46, 70
```

Quando não tem nada, ele faz a continuação do valor anterior, sempre contando de 1 em 1.

### No código: menu de cores

Tenho aqui o exemplo que usamos na aula de `switch` para fazer o menu de cores. Não quero ter que lembrar qual cor corresponde a `case 1`, `case 2`, `case 3`. Os valores possíveis para a variável de opção são apenas quatro, então crio uma enumeração de cores. Deixo em **maiúsculo**, porque são constantes:

```c
enum Cor { VERDE = 1, AMARELO, PRETO, BRANCO };
```

Repare que, se eu não definisse nada, `VERDE` receberia 0, `AMARELO` 1, `PRETO` 2 e `BRANCO` 3, o que **não corresponde** ao nosso menu (que começa em 1). Por isso falo que `VERDE` começa com 1; assim `AMARELO` é 2, `PRETO` é 3 e `BRANCO` é 4, igual ao menu.

Agora, em vez de lembrar o número de cada caso, escrevo `case VERDE:`, `case AMARELO:`, `case PRETO:`, `case BRANCO:`. Muito mais legível e simples. Executando, escolho 1 e aparece o verde; escolho 4 e aparece o branco: o programa continua funcionando normalmente, mas agora mais organizado.

Também é possível usar `typedef` com a enumeração, criando o tipo diretamente [trecho ininteligível na transcrição original; verificar]:

```c
typedef enum { VERDE = 1, AMARELO, PRETO, BRANCO } Cor;

Cor opcao;
```

### Juntando tudo

Neste último exemplo do slide, uso um tipo enumerado (`PESO` e `VOLUME`) que diz qual é o tipo de quantidade salvo em uma **união**, que é membro de uma **estrutura** definida usando **`typedef`**. Repare que estou usando nessa estrutura todos os recursos que vimos nas duas últimas aulas.

```c
typedef enum { PESO, VOLUME } TipoQuantidade;

typedef struct {
    char descricao[30];
    TipoQuantidade tipo;
    union {
        double volume;        // litros
        unsigned int peso;    // gramas
    } quantidade;
} Produto;
```

Pode parecer um pouco confuso para quem está vendo esse assunto pela primeira vez, mas com a prática vocês vão ver que é bem tranquilo, e essa estrutura é muito usada no dia a dia.

### Encerramento

Então é isso, pessoal. Tem alguns exercícios para vocês praticarem. Bons estudos, um grande abraço e até a próxima!

### Avisos da aula

O professor menciona exercícios para praticar [verificar: o PDF da Aula 15 não contém lista de exercícios]. Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_16_Funcoes_Parte_1.md -->
## Aula 16 – Funções (Parte 1)

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Processor Memorial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

### Tópicos abordados

- Por que dividir o código em funções
- Conceito de função e vantagens (organização, reutilização, independência)
- Boa função: fortemente coesa e fracamente acoplada
- Como definir e como chamar uma função (sem parâmetros e com parâmetros)
- Fluxo de execução: a `main` é suspensa durante a chamada
- Exemplo prático: função `void` sem parâmetros
- Uma função chamando outra
- Definição antes do uso e o **cabeçalho** da função

### Glossário

- **Função:** pedaço de código que realiza uma tarefa específica, de forma independente do resto do programa.
- **`main`:** função principal; é sempre por onde a execução começa.
- **Tipo de retorno:** tipo do valor que a função devolve (`int`, `float`...); `void` quando ela não retorna nada.
- **Parâmetros:** valores que a função recebe, listados entre parênteses; podem não existir.
- **Chamada de função:** uso da função pelo nome, sempre com parênteses (mesmo sem parâmetros).
- **Definição da função:** o código completo da função (tipo de retorno, nome, parâmetros e corpo entre chaves).
- **Cabeçalho da função:** só a primeira linha da definição (sem o corpo), terminada com ponto e vírgula; avisa ao compilador que a função existe [termo também usado em outros materiais: protótipo].
- **Coesão (forte):** a função faz bem uma única tarefa.
- **Acoplamento (fraco):** a função depende pouco do restante do código.
- **Alerta (*warning*):** aviso do compilador; aparece, por exemplo, ao chamar uma função antes de defini-la.

---

### Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos conversar sobre as **funções**.

Até agora, todo o nosso código estava na função `main`. Desde o início do curso, quando nós fazíamos o "Hello World", até agora, o nosso código só foi crescendo. O código da função `main` agora é mais complexo, tem várias linhas e, consequentemente, está mais difícil de organizar. A nossa função `main` faz muitas coisas [trecho confuso no original]. Então, o que a gente pode fazer? A gente pode **organizar o nosso programa, o nosso código, em diversas funções**.

### O que é uma função

Qual é o conceito de função dentro de uma linguagem de programação? É **um pedaço do código que realiza uma determinada tarefa, de uma certa maneira, independentemente do resto do programa**.

Antes, a função `main` continha todos os itens, estava tudo misturado dentro dela. Agora não: agora a gente vai ter uma **sequência de funções**, cada uma com a sua tarefa específica e independente das demais, e depois a função `main` vai ter a função de **organizar e chamar essas tarefas menores**.

### Vantagens de utilizar funções

1. **Organização do código:** se eu separar o meu código em pedacinhos menores, fica muito mais fácil de entender e de dar manutenção nesse código depois.
2. **Reutilização:** às vezes eu tenho que repetir um comportamento diversas vezes, e posso utilizar o mesmo comportamento em diversos lugares. Posso, inclusive, levar esse mesmo código e reutilizá-lo em outro programa.
3. **Independência:** a função é relativamente independente do código que a chamou. [Trecho confuso no original.] As variáveis que ela se limita a alterar são as que foram passadas por parâmetros.

Nós costumamos dizer que **uma boa função é fortemente coesa**, ou seja, focada na sua tarefa, **e fracamente acoplada**, ou seja, não depende muito do restante do código.

### Como definir uma função

Para criar uma função, eu tenho que **defini-la antes da utilização**. Como se escreve? Coloco o **tipo do retorno** (por exemplo, `int`); depois o **nome da função** e, entre parênteses, quais são os **parâmetros**. Em seguida abro o corpo da função com uma chave; o `return` marca o fim da minha função; e aqui fecho a chave.

```c
tipo_do_retorno nome_da_funcao(parâmetros)
{
    // corpo da função
    return valor;
}
```

### Como chamar uma função

Uma vez definida, posso chamar a minha função. Como eu faço?

- **Função sem parâmetros e sem retorno:** só chamo o nome da função, com abre e fecha parênteses e ponto e vírgula. Repare que, apesar de a função não ter parâmetros, **eu preciso obrigatoriamente colocar os parênteses** ao chamá-la.
- **Função com parâmetro e com retorno:** escrevo o nome da função e, entre parênteses, passo o parâmetro. Para salvar o valor de retorno, eu o **atribuo a uma variável**.

```c
nome_da_funcao();                       // sem parâmetros, sem retorno

resultado = nome_da_funcao(parametro);  // com parâmetro e com retorno
```

Estou chamando o nome da função, passando o parâmetro, e o resultado da função eu salvo na variável.

### Exemplo: a função `mensagem`

Vamos ver um exemplo. Eu tenho a função `main` e, **antes** da minha função `main`, eu defini uma função `mensagem`. Ela não recebe nenhum parâmetro e não tem nenhum tipo de retorno (por isso usamos `void`: quando a função não tem retorno, a gente usa `void`). Essa função simplesmente exibe uma mensagem e depois termina. Dentro da `main`, eu vou chamar a função `mensagem`.

**Qual é o fluxo de execução?** Ele vai executar de cima para baixo, primeiro `mensagem` e depois `main`? Não. Ele **começa sempre a execução pela `main`**. Quando encontra a chamada da função, ele **suspende a execução da `main`**, vai lá para `mensagem` e executa tudo o que estiver dentro da função. Quando termina, **ele volta para o mesmo ponto onde parou na `main`**.

#### Na prática

Tenho aqui a `main`, com dois `printf` mostrando "antes de chamar a função" e "depois de chamar a função". Quero criar uma função: vou fazer aqui antes, `void mensagem()`. Ela não recebe parâmetro, porque o que essa função faz é só exibir a mensagem "dentro da função" e terminar. Retorna zero? Não, só `return;`, porque a minha função não retorna valor. Agora quero executar essa função, então ela está definida e aqui eu vou chamá-la: `mensagem();`.

```c
#include <stdio.h>

void mensagem()
{
    printf("Dentro da função\n");
    return;
}

int main()
{
    printf("Antes de chamar a função\n");
    mensagem();
    printf("Depois de chamar a função\n");
    return 0;
}
```

Qual vai ser a ordem de execução? Ele mostra "antes de chamar a função"; chama `mensagem`, vai para lá e mostra "dentro da função"; depois volta para a `main` e mostra "depois de chamar a função".

**Uma segunda função.** Posso criar outra função: duplico aqui, `mensagem2`, que mostra "dentro da função 2", e chamo `mensagem2()` na `main`. Execução: começa na `main`, mostra "antes de chamar a função", chama `mensagem`, mostra "dentro da função", termina, volta para cá e continua executando; chama `mensagem2`, vai para lá, executa tudo o que tiver lá, depois volta e mostra "depois de chamar a função".

### Uma função chamando outra

Posso fazer agora uma função chamar outra? Pode, sim. Vou criar uma função chamada `mensagem_interna` [verificar: nome]. Dentro da função `mensagem`, vou chamar agora a `mensagem_interna()` e, depois, dentro da função `mensagem`, mostro de novo "dentro da função".

Como vai ser a execução? Começo pela `main`: mostra "antes de chamar a função"; chama `mensagem`, vai para lá e mostra "dentro da função"; depois, ao chegar na chamada de `mensagem_interna`, **suspende a execução da função `mensagem`** e vai para a `mensagem_interna`; mostra "dentro da função interna"; terminou, volta para a `mensagem` e mostra de novo "dentro da função"; termina a `mensagem`, volta para a `main` e mostra "depois de chamar a função".

Saída:

1. antes de chamar a função
2. dentro da função
3. dentro da função interna
4. dentro da função
5. depois de chamar a função

### Definição antes do uso e o cabeçalho da função

Repare que apareceu um **alerta** (*warning*) do compilador, porque eu chamei a minha função interna **antes da definição**: ela está definida só depois. Por isso, **sempre coloque a definição das funções antes da utilização, antes de você chamá-las**. Isso resolve em um programa pequeno, onde consigo organizar dessa maneira. Mas, em um programa grande, como eu faço para organizar isso? Nem sempre é possível deixar sempre a definição antes da utilização.

Nesse caso, existe uma saída: ele vai dar alerta porque estou chamando uma função sem definir; então, antes de tudo, vou colocar o **cabeçalho das funções**. Pego o começo da definição, **sem o corpo**, e termino com ponto e vírgula; faço isso para a `mensagem_interna` e a mesma coisa para a `mensagem`. Isso é o que a gente chama de **cabeçalho das funções**: aqui eu mostro para o computador todas as funções que existem daqui para baixo. Depois posso colocar a `main` e colocar as funções **na ordem que eu quiser**, que não vai dar mais nenhum erro.

```c
#include <stdio.h>

// cabeçalhos das funções
void mensagem();
void mensagem_interna();

int main()
{
    printf("Antes de chamar a função\n");
    mensagem();
    printf("Depois de chamar a função\n");
    return 0;
}

void mensagem_interna()
{
    printf("Dentro da função interna\n");
}

void mensagem()
{
    printf("Dentro da função\n");
    mensagem_interna();
    printf("Dentro da função\n");
}
```

[Código reconstruído a partir da fala; verificar.]

### Encerramento

Para essa aula não ficar muito longa, nós vamos dividir em **duas partes**. Nesta primeira parte, vimos as funções **sem receber nenhum parâmetro e sem retornar nenhum valor**. Na próxima aula, vamos aprender a passar parâmetros e a retornar valores nas nossas funções. É isso, pessoal. Um grande abraço, bons estudos e até a próxima!

### Avisos da aula

Esta é a primeira de duas partes sobre funções. Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_16_Funcoes_Parte_2.md -->
## Aula 16 – Funções (Parte 2): parâmetros, retorno e argumentos da `main`

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "ProsoMudial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides, o editor e o terminal na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

### Tópicos abordados

- Revisão de escopo: variáveis locais × globais
- Funções com parâmetros e valor de retorno
- Exemplo: função `soma` com `float`
- Argumentos da `main` pela linha de comando (`argc` e `argv`)
- Converter texto em número com `atof`
- Executar com argumentos no terminal e no editor
- Documentar funções (padrão Doxygen: `@param` e `@return`)

### Glossário

- **Escopo:** região do programa onde uma variável pode ser acessada.
- **Variável local:** declarada dentro de uma função; só é acessível nela e só existe enquanto ela é executada.
- **Variável global:** declarada fora de todas as funções; acessível de qualquer função e existe durante toda a execução do programa.
- **Parâmetro:** valor recebido pela função, declarado entre parênteses (tipo e nome).
- **Valor de retorno:** valor devolvido com `return`; deve ter exatamente o tipo declarado antes do nome da função.
- **`argc` (*argument count*):** quantidade de argumentos passados à `main`; **inclui o nome do executável**.
- **`argv` (*argument vector*):** vetor de strings com os argumentos; `argv[0]` é o nome do executável.
- **Linha de comando:** o terminal, onde o programa é executado e os argumentos são passados separados por espaço.
- **`atof`:** função que converte um texto (string) em número `float`.
- **Doxygen:** padrão de comentários que permite gerar documentação automática do programa.

---

### Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e esta é a continuação da nossa aula sobre funções.

Na primeira parte, nós aprendemos a criar funções, mas ainda sem passar parâmetros e sem receber nenhum retorno. Nesta aula vamos aprender a trabalhar com **parâmetros** e com **valores de retorno**. Para isso, vamos precisar revisar alguns conceitos relacionados ao **escopo de variáveis**. Até agora, nós usamos a função `main` e todas as variáveis ficavam lá dentro. Agora nós temos diversas funções e, portanto, é conveniente que a gente revise esse conteúdo.

### Revisão: escopo de variáveis

- **Variáveis locais** são aquelas declaradas dentro de um bloco de função. Elas não podem ser usadas por outras funções: só são acessíveis naquela função e **só existem enquanto aquela função estiver sendo executada**.
- Uma **variável global** é declarada **fora de todos os blocos de funções**. Eu posso acessá-la de qualquer parte do meu programa, de qualquer função, e ela **existe durante todo o tempo de execução** do meu programa.

Como a gente já viu lá no começo do curso: tenho a função `main`; o que eu declaro aqui fora, depois dos `include` e antes das funções, são variáveis globais, que posso acessar por qualquer função. O que eu declaro dentro de uma função só pode ser acessado ali dentro: é uma variável local daquela função. E o que eu declaro dentro da `main` é uma variável local da `main`.

```c
#include <stdio.h>

int global;            // global: qualquer função pode acessar

void funcao()
{
    int local;         // local: só existe dentro de funcao
}

int main()
{
    int local_main;    // local da main
    return 0;
}
```

[Exemplo ilustrativo, reconstruído a partir da descrição.]

### Funções com parâmetros e retorno

Vamos ver como criar funções passando parâmetros e recebendo valor de retorno. É muito parecido com o que a gente fez antes, só que agora, **entre parênteses, eu coloco todos os parâmetros**: o tipo do parâmetro, espaço, o nome, vírgula; tipo, espaço, nome, vírgula; e assim por quantos parâmetros eu quiser.

E, na hora de retornar, eu faço `return` e coloco um valor. **Esse valor tem que ser exatamente do tipo definido antes do nome da função**: se antes do nome da função está `int`, o valor tem que ser `int`; se for `float`, tem que ser um valor `float`; e assim por diante.

Por exemplo [slide]: uma função chamada `soma`, que recebe dois valores e retorna a soma desses dois valores. Na `main`, eu chamo a função `soma`, passo os valores e salvo o resultado em uma variável.

#### Na prática: a função `soma`

Tenho aqui o meu programa pronto, com a variável de resultado, e vou criar a função. O tipo de retorno é `float`, o nome é `soma`, e os parâmetros são dois números que vão ser somados, ambos `float`: `numero1` e `numero2`. A função vai retornar `numero1 + numero2`. **Posso colocar uma expressão no `return`?** Pode: ele faz a conta e o resultado dessa expressão é o que será retornado pela função. Vou colocar um comentário marcando o que essa chave está fechando.

Agora, dentro da `main`, eu vou utilizar a minha função: `resultado` recebe o nome da função e, entre parênteses, os parâmetros, por exemplo, 3 e 7. Passando os dois parâmetros, a função vai somar e retornar o valor, que é salvo na variável `resultado`. Então 3 e 7 resultam em 10.

```c
#include <stdio.h>

float soma(float numero1, float numero2)
{
    return numero1 + numero2;
}   // fim da função soma

int main()
{
    float resultado;

    resultado = soma(3, 7);
    printf("Resultado = %.2f\n", resultado);   // [verificar: exibição não aparece na transcrição]

    return 0;
}
```

### Passando argumentos para a `main`

Agora eu já sei como passar valores para uma função que eu mesmo criei. Mas, e se eu quiser passar parâmetros **para a função `main`**? A `main` chama outras funções, mas **quem chama a `main`**? O sistema operacional. Então é isso que a gente vai ver agora: como passar valores pelo terminal, no momento da execução do meu programa.

Se eu estou no terminal (no Linux, por exemplo), digito `./main` (o nome do meu programa executável), espaço, e vou passando, separados por espaço, cada um dos valores que quero passar como parâmetro:

```bash
./main valor1 valor2 valor3
```

Nesse caso, se eu executar isso, a minha `main` vai receber **quatro argumentos**. Por quê? Porque, por padrão, **o primeiro argumento é sempre o nome do arquivo executável**. Então o primeiro é `./main`, depois `valor1` (segundo), `valor2` (terceiro) e `valor3` (quarto) [verificar: o original numera de forma confusa].

#### Como a `main` recebe os argumentos

Na `main`, em vez de `int main()` (ou `int main(void)`, sem nada dentro), quando você quer receber parâmetros, o padrão é:

```c
int main(int argc, char *argv[])
```

[verificar: o original descreve "char, ponteiro, argv", como se fosse um vetor de strings ou uma matriz de `char`.]

- O primeiro, **`argc`**, é o **contador de argumentos**: quantos argumentos foram passados.
- E em **`argv`** eu salvo os valores: ele é **um vetor de strings**, ou seja, cada um dos valores vem **como texto**.

Agora, dentro da `main`, vou exibir quantos valores foram recebidos: dou um `printf` em `argc`, porque ele é um inteiro. Para exibir os valores, faço um `for` que vai de zero até menor que `argc` (se são 3, vai de 0 até 2) e dou `printf` em `argv[i]`: como é um vetor de strings, uso `%s`.

```c
int main(int argc, char *argv[])
{
    int i;

    printf("Quantidade de argumentos: %d\n", argc);
    for (i = 0; i < argc; i++) {
        printf("%s\n", argv[i]);
    }

    return 0;
}
```

### Exemplo: somar dois valores passados na linha de comando

Agora, na prática, aquele mesmo exemplo da soma, mas passando os dois valores como parâmetro. Eu tenho a função `soma` de antes; eu **não quero valores fixos**, eu quero receber os dois valores aqui na `main`: `int argc` (contador de argumentos) e `char *argv[]` (os valores dos argumentos, como se fosse um vetor de strings, ou uma matriz de `char`).

Antes de calcular a soma, **eu tenho que garantir que recebi os argumentos certos**: testo `if (argc == 3)`; caso contrário, mostro uma mensagem de erro dizendo que o programa deve receber 2 argumentos. Olha lá: testei 3 (e não 2) porque o primeiro argumento, lembra, é o nome do arquivo executável.

Outro ponto: o meu número é um `float`, e ele está vindo como **string**. Vou ensinar uma função bem legal para **converter de texto para `float`**: a **`atof`** (*ASCII to float*). Então `numero1 = atof(argv[1]);`. Onde está o primeiro valor? Em `argv[1]`. Da mesma maneira, o `numero2` está em `argv[2]`.

```c
int main(int argc, char *argv[])
{
    float numero1, numero2, resultado;

    if (argc == 3) {
        numero1 = atof(argv[1]);
        numero2 = atof(argv[2]);
        resultado = soma(numero1, numero2);
        printf("Soma = %.2f\n", resultado);
    } else {
        printf("O programa deve receber 2 argumentos\n");
    }

    return 0;
}
```

#### Executando com argumentos

Se eu tentar executar direto no editor, o programa recebe só o argumento do nome do executável e não executa a soma (cai na mensagem de erro). Então vou abrir o terminal. Como eu executo esse programa? Uso o comando para listar os arquivos [`ls`, verificar] para ver o nome do meu executável, que vou chamar de `aula16_exemplo3` [verificar]. Então digito `./aula16_exemplo3 5 8`: para somar 5 mais 8, passo 3 argumentos no total (o nome do executável e os dois valores). Dessa maneira, eu consigo passar valores para a `main` pela linha de comando.

```bash
./aula16_exemplo3 5 8
```

**Tem como fazer isso dentro do editor, sem abrir o terminal?** Tem. Com **Ctrl+F6**, aparece a opção **"Run Argument"** [verificar]: ali você pode passar os valores que quiser para a sua `main`, como os dois números a somar [exemplo de valores confuso no original].

### Documentando as funções (Doxygen)

Para finalizar, uma dica de como vocês podem **documentar as suas funções**. Existe um padrão que vocês podem seguir, chamado **Doxygen** [verificar: o original diz "dox"], que gera documentação automática. Para isso, você tem que fazer o comentário de uma maneira correta: abre o comentário com barra e dois asteriscos [verificar]. Na linha de baixo você coloca uma **descrição do que a função faz**; depois, para cada parâmetro, você usa `@param`, seguido do nome do parâmetro e do que ele é; e, por último, para o retorno, `@return` com o que a função retorna.

Por exemplo, para a função `soma`: o que essa função faz? Soma dois números. `@param n1`: primeiro valor a ser somado. `@param n2`: segundo valor a ser somado. `@return`: a soma dos dois valores recebidos como parâmetros.

```c
/**
 * Soma dois números.
 * @param n1 primeiro valor a ser somado
 * @param n2 segundo valor a ser somado
 * @return a soma dos dois valores recebidos como parâmetros
 */
float soma(float n1, float n2)
{
    return n1 + n2;
}
```

Assim, a documentação segue um padrão e, depois, com o Doxygen, você pode gerar a documentação do seu programa **automaticamente**, em uma página web já formatada.

### Encerramento

É isso, pessoal. Lá nos slides também tem, para vocês, alguns exercícios para trabalharem esses conceitos. Bons estudos, um grande abraço e até a próxima!

### Avisos da aula

Há exercícios nos slides sobre funções com parâmetros e retorno. Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_17_Passagem_de_Parametros.md -->
## Aula 17 – Funções: Passagem de Parâmetros (por cópia e por referência)

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Mundial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

### Tópicos abordados

- Passagem de parâmetros **por cópia** × **por referência**
- Ponteiros: o que são, como declarar, `&` e `*`
- Exemplo: incrementar uma variável dentro de uma função
- Quando usar passagem por referência
- Vetores e matrizes são sempre passados por referência
- Estruturas: passagem por cópia e por ponteiro; operador seta (`->`)

### Glossário

- **Passagem por cópia:** a função recebe uma **cópia** do valor; alterar o parâmetro não altera a variável original.
- **Passagem por referência:** a função recebe o **endereço de memória** da variável; alterar o valor apontado altera a variável original.
- **Ponteiro:** variável que guarda o endereço de memória de outra variável.
- **`int *ponteiro`:** declara um ponteiro para inteiro (o asterisco indica que é ponteiro).
- **`&` (e comercial):** retorna o endereço de memória de uma variável.
- **`*` (asterisco, em uso):** retorna o valor que está no endereço apontado pelo ponteiro.
- **Estrutura:** tipo composto por membros (por exemplo, um ponto com `x` e `y`).
- **Operador seta (`->`):** acessa os membros de uma estrutura quando se tem um ponteiro para ela; `p->x` equivale a `(*p).x`.

---

### Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos falar sobre **diferentes maneiras de passar parâmetros para uma função**.

Na aula passada aprendemos que os parâmetros são os valores que podem ser passados para uma função. Na linguagem C, eles podem ser passados de duas maneiras: **por cópia** ou **por referência**. Até agora, na aula passada, nós utilizamos a **passagem por cópia**.

### Passagem por cópia

Vamos supor um programa em que a função `main` cria uma variável inteira, atribui 15 e chama uma função que vai receber esse valor e incrementar uma unidade. Depois que eu volto para a `main` e dou um `printf` do valor dessa variável, será que ele vai exibir 15 ou 16? Nesse caso, vai exibir **15**, porque eu passei uma **cópia** do valor. Então, quando ele entrou na função e fez o `++`, ele incrementou uma posição de memória diferente da variável que eu tinha lá na `main`. Logo, **a variável original não foi alterada**.

### Passagem por referência

E se eu quisesse que esse valor fosse alterado? Nesse caso, eu faço uma **passagem por referência**. O que seria isso? Em vez de passar o valor, **eu passo o endereço de memória onde está salva a variável**.

Lembra de como funcionava a memória RAM? Eu tinha uma variável com um nome (`valor`), o conteúdo (15) e um número, o endereço da memória onde está salva a variável. E eu podia, através do operador `&` (e comercial), pegar o endereço da memória onde está salva a variável. Então eu posso passar não o valor, mas o **endereço de memória**.

### Ponteiros

Posso criar uma variável que não salve um valor, mas o **endereço de memória de outra variável**? Pode. Isso é o que nós chamamos, na computação, de **ponteiros**. O que é um ponteiro? Nada mais é do que **uma variável que salva um endereço de memória de outra variável**.

Como eu faço isso? Eu declaro um **ponteiro para inteiro** com esta sintaxe: o tipo (`int`), um **asterisco** (que indica que é um ponteiro) e o nome (aqui, `ponteiro`). Essa variável **não vai salvar o inteiro**; ela vai salvar o endereço de memória onde está salvo o inteiro.

E como eu faço para guardar esse endereço aqui dentro? Uso o `&`, o mesmo que a gente utilizava lá no `scanf`: o ponteiro recebe o endereço de memória onde a variável `valor` está salva.

```c
int valor = 15;
int *ponteiro;

ponteiro = &valor;   // o ponteiro guarda o endereço de valor
```

Vamos olhar essa memória: aqui tem `valor`, que vale 15, salvo no endereço `AF60` [verificar: o original diz "f, 60"]. Aqui está a minha variável `ponteiro`, que é um ponteiro para inteiro. O que está salvo nela? **Não é um valor inteiro: é o endereço de memória, `AF60`, que é onde está salvo o inteiro.** E esse ponteiro, por sua vez, está salvo em outro endereço de memória.

**Como acessar o valor a partir do ponteiro?** Uso o operador **asterisco** (`*`). O asterisco retorna **o valor que está contido no endereço de memória apontado por esse ponteiro**.

```c
printf("%d\n", *ponteiro);   // exibe 15 (o valor apontado)
```

Ficou confuso? Vamos olhar um pouquinho no código.

### Exemplo: incrementar por referência

Agora é aquele mesmo código de antes. A minha função `incrementa` **não recebe mais o inteiro**, e sim um **ponteiro para inteiro**. Eu **não posso dar um `++` diretamente** no ponteiro aqui dentro. Por quê? Porque senão eu vou incrementar o **endereço** de memória, e eu não quero incrementar o endereço do meu ponteiro: eu quero incrementar o **valor** que está salvo no endereço de memória apontado por esse ponteiro. Então, nesse caso, coloco o asterisco entre parênteses: `(*ponteiro)++`. O que isso faz? Pega o valor salvo no endereço apontado pelo ponteiro e, desse valor, dá o `++`. Agora estou alterando a mesma região de memória.

Na `main`, eu também tenho que passar **não mais o valor 15**, mas o **endereço de memória onde está o 15**: para isso uso o `&`. Reparem que a gente está utilizando **passagem por referência**. Lembra do `scanf`? Lá a gente também usava o `&`, porque estava passando **por referência**: o endereço de memória da variável onde será salvo o valor digitado pelo usuário.

```c
#include <stdio.h>

void incrementa(int *ponteiro)
{
    printf("Dentro da função, antes: %d\n", *ponteiro);
    (*ponteiro)++;
    printf("Dentro da função, depois: %d\n", *ponteiro);
}

int main()
{
    int valor = 15;

    printf("Antes da função: %d\n", valor);
    incrementa(&valor);                           // passa o endereço
    printf("Depois da função: %d\n", valor);      // 16

    return 0;
}
```

[Código reconstruído; as mensagens exatas do `printf` não aparecem na transcrição.]

**Comparando na prática.**

- **Por cópia:** copia o 15 para a função; quando a função termina, não há nenhuma alteração. Antes da função, o valor é 15; incrementa para 16 *dentro* da função; depois que a função termina e volta para a `main`, continua **15**.
- **Por referência:** eu quero que a função altere o valor da minha variável. Então a função passa a receber um **ponteiro para inteiro**. Eu dou o `++` não no ponteiro, mas **no valor apontado pelo ponteiro**: pega aquele valor original e dá um `++`. Também preciso mudar o `printf`: o que eu estou exibindo não é o inteiro, é um ponteiro; eu quero exibir o valor salvo no endereço de memória apontado por ele, e quem faz isso é o operador `*`. Ao chamar a função, como ela recebe um ponteiro para inteiro, passo o endereço de memória (`&valor`). Executando: ela recebeu 15, incrementou para 16 e, quando voltou para a `main`, **continua 16** [verificar: trecho confuso no original], porque passei por referência e continua sendo o mesmo endereço de memória: a minha variável original é alterada.

### Quando usar passagem por referência?

1. **Quando estou passando uma quantidade muito grande de dados** para a minha função. Quando passa por cópia, ele vai ter que copiar todo esse valor, o que gera tempo de processamento e ocupa mais espaço na memória.
2. **Quando eu quero que a minha função retorne mais de um valor.** Pense: quero que a minha função retorne 2, 3, 4 valores diferentes. Com o `return` não é possível retornar mais de um. Uma das maneiras de fazer isso é **passar ponteiros para a minha função**, e a minha função salva os valores que eu quero como retorno **no endereço de memória apontado por esses ponteiros** que foram passados como parâmetro.

### Vetores e matrizes: sempre por referência

Agora, o que mais impacta no conteúdo que a gente já viu? **Se eu passar um vetor ou uma matriz, por padrão, sem você fazer nada, eles são sempre passados por referência.** Se eu passar um vetor como parâmetro para uma função, vai ser passado o **endereço de memória do começo do vetor**. Por quê? Porque é um volume muito grande de dados: eu teria que copiar todos os dados do vetor, ocupar memória e gastar tempo de processamento. Logo, a função recebe apenas o **endereço da primeira posição** do seu vetor.

Tenho aqui outro exemplo: uma função `incrementa_vetor` [verificar: nome]. Ela recebe um inteiro, que é o **tamanho do vetor**, e o vetor. Como eu passo um vetor como parâmetro? Coloco o tipo, o nome e só os colchetes abertos e fechados, **sem o tamanho** dentro. O tamanho eu passo como outro parâmetro. Aqui dentro da função, percorro o meu vetor de 0 até menor que `tamanho` e dou `++` na posição do vetor: somo uma unidade em cada posição.

Na `main`, crio o meu vetor e chamo a função `incrementa_vetor` passando o vetor. **Sem precisar do `&`**, porque o padrão já é por referência. Depois faço um `for` para exibir e ver se o vetor foi alterado ou não.

```c
void incrementa_vetor(int tamanho, int vetor[])
{
    int i;
    for (i = 0; i < tamanho; i++) {
        vetor[i]++;
    }
}

int main()
{
    int vetor[5] = {10, 20, 30, 40, 50};
    int i;

    incrementa_vetor(5, vetor);   // sem &: vetores já são passados por referência

    for (i = 0; i < 5; i++) {
        printf("%d\n", vetor[i]);
    }
    return 0;
}
```

Olha lá: antes era 10, 20, 30, 40, 50. Agora é 11, 21, 31, 41, 51 [verificar: o original diz "11, 21, 21, 21, 51, 51"]. Então, repare: sem eu precisar colocar o `&`, ele já passa por referência e altera o valor da variável original. **Ele não cria cópia quando se trata de vetores.**

### Estruturas: por cópia ou por ponteiro

E se eu considerar **estruturas**? Como elas funcionam? **Por padrão, as estruturas são passadas por cópia**, porque elas não costumam ter muitos membros, não costumam ser muito grandes. Então a função recebe uma **cópia de toda a estrutura e de todos os membros** dela. Logo, se eu alterar uma propriedade da estrutura dentro da função, isso **não vai refletir** na estrutura original.

Mas se essa estrutura tiver vetores ou matrizes, ela pode ser muito grande e comprometer a performance do programa. Nesse caso, posso passar **um ponteiro para a estrutura** para a minha função.

Vamos ver o que acontece. Defini o tipo `ponto` (uma estrutura), que tem um `x` e um `y` [verificar: definição não aparece na transcrição]:

```c
typedef struct {
    int x;
    int y;
} ponto;
```

Vou fazer uma função que incrementa um no `x` e um no `y`. Tenho um `ponto p1`, inicializado com 1 e 2. Como eu quero que a função altere o `p1`, vou passar o **endereço de memória de `p1`**. A função recebe o endereço de memória de uma estrutura do tipo `ponto`.

E aqui, pessoal, **quando você acessa um membro de uma estrutura, a gente usa o ponto**: `p.x`, `p.y`. No entanto, `p` agora **não é a estrutura em si**: `p` é um **ponteiro** para um endereço de memória onde está a sua estrutura. Nesse caso eu teria que fazer `(*p).x`: o `*p` me retorna a estrutura (o conteúdo salvo no endereço de memória apontado por esse ponteiro) e depois o `.x`.

Para não ter que fazer isso toda hora, existe um **operador específico**, o **operador seta** (`->`), formado por um hífen e o sinal de maior. Então `p->x++` e `p->y++`. É a maneira que eu uso para acessar os membros quando tenho **um ponteiro para uma estrutura**. A expressão `p->x` é **equivalente** a `(*p).x`, para facilitar a nossa vida.

**Na prática.** Tenho aqui um exemplo muito parecido com o anterior, primeiro **por cópia**: a estrutura `ponto` inicializada com 1 e 2; exibo antes da função, chamo a função e exibo depois. A função faz `p.x++` e `p.y++`, somando um em cada um dos membros. Executando, depois da função, mesmo com o `++`, **continua o valor antigo**: passando por cópia, não estou alterando o valor original.

**Por referência.** A função `incrementa_ponto` não recebe mais um `ponto` em si, mas sim um **ponteiro**, um endereço de memória onde está salva uma variável do tipo `ponto`. Como é um ponteiro para uma estrutura, **não uso o ponto: uso a seta** (`p->x`, `p->y`). E, ao chamar a função, não passo `p1`: passo **`&p1`**, o endereço de memória onde está salva uma variável do tipo `ponto`. Executando: antes da função, 1 e 2; depois da função, **2 e 3**. Porque agora estou passando por referência, um endereço de memória, e a função altera exatamente a mesma posição.

```c
void incrementa_ponto(ponto *p)
{
    p->x++;
    p->y++;
}

int main()
{
    ponto p1 = {1, 2};

    printf("Antes: %d %d\n", p1.x, p1.y);    // 1 2
    incrementa_ponto(&p1);
    printf("Depois: %d %d\n", p1.x, p1.y);   // 2 3

    return 0;
}
```

[Código reconstruído; verificar.]

### Encerramento

Com isso, pessoal, finalizamos esse conteúdo. É um conteúdo **mega importante**, o conteúdo de ponteiros [trecho confuso no original, algo sobre "sempre estar atento ao asterisco"]. Tem exercícios para vocês praticarem nos slides também. Bons estudos, um grande abraço e até a próxima!

### Avisos da aula

Há exercícios nos slides sobre passagem de parâmetros e ponteiros. Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_18_Recursividade.md -->
## Aula 18 – Recursividade

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Próximo Murial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O texto foi reconstruído com apoio dos slides da Aula 18 (`Material-Ensino-Verificado/Aula_18_Recursividade.md`). Os códigos foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

### Tópicos abordados

- Conceito de recursão (exemplo do vaso de flores)
- Caso base e chamada recursiva
- Exibir números de N até 1: versão iterativa × recursiva
- Vantagens e desvantagens da recursão
- Simulação da pilha: caminho de ida e de volta (`recursao(4)`)
- Recursão com retorno: soma de 1 até N
- Recursão de cauda [ver nota de correção]

### Glossário

- **Recursão:** processo definido a partir dele mesmo; uma função recursiva chama a si mesma.
- **Caso base:** situação em que a função **não** faz nova chamada recursiva; garante que a recursão termine.
- **Chamada recursiva:** a chamada da função a si mesma, com parâmetros que se aproximam do caso base.
- **Solução iterativa:** solução com laços de repetição (`for`, `while`).
- **Empilhamento / desempilhamento:** as chamadas ainda não finalizadas ficam guardadas em uma pilha (ida) e são retomadas na ordem inversa (volta).
- **Recursão de cauda:** quando a chamada recursiva é a **última operação** da função.

---

### Introdução: o que é recursão

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos aprender sobre **recursividade**.

O conceito de recursão é um **processo que é definido a partir dele mesmo**. Por exemplo, como eu faria a tarefa de **esvaziar um vaso que tem três flores**? Posso dizer que, para esvaziar um vaso com três flores, a pessoa deve retirar uma flor e depois esvaziar um vaso com duas flores. Repare: para fazer a tarefa de esvaziar um vaso, eu preciso esvaziar um vaso.

Mas como eu esvazio o vaso com duas flores? Tiro uma flor e depois esvazio um vaso com uma flor. E o vaso com uma flor? Retiro uma flor e depois esvazio um vaso com zero flores. E como esvazio um vaso com zero flores? **Por definição, um vaso com zero flores já está vazio.** É o que chamamos de **caso base** da nossa recursão.

Generalizando a solução recursiva: para esvaziar um vaso com N flores, **se o vaso já está vazio**, não há nada a fazer (caso base). **Caso contrário**, tiro uma flor e esvazio um vaso com N − 1 flores. A cada vez que chamo a função, ela fica **mais próxima do caso base**.

### Função recursiva

Trazendo para o código: uma **função recursiva** é uma função que **chama ela mesma**. Dentro da função `recursao`, estou chamando a função `recursao`. Mas isso não vai entrar em *loop*? Tem alguma vantagem? Vamos entender.

Até agora, na disciplina, utilizamos estratégias **iterativas**, com laços de repetição. Por exemplo, esta função exibe todos os números de `valor` até 1; se eu passar 5, ela mostra 5, 4, 3, 2, 1:

```c
void exibeNumeros(int valor)
{
    for (int i = valor; i >= 1; i--) {
        printf("Valor de i: %d\n", i);
    }
}
```

Dá para fazer isso de outra maneira, sem repetição? Sim, por **recursividade**. Para exibir os números de 5 até 1, eu exibo o 5 e depois exibo todos os números de 4 até 1. Para exibir de 4 até 1, exibo o 4 e depois de 3 até 1. E assim por diante, até exibir de 1 até 1: exibo o 1, que nesse caso é o **caso base**.

Primeiro testo o caso base: quando o valor vale 1, só exibo aquele valor e acaba a função. Caso contrário, exibo o valor e logo em seguida faço a **chamada recursiva**, passando `valor - 1`.

As duas partes principais de uma função recursiva são:

- **Caso base:** não há nova chamada; o problema já está resolvido e garante que a solução termine.
- **Chamada recursiva:** muda os parâmetros para que se aproximem do caso base. Se eu não alterar o valor, ela vai continuar em *loop*.

### No código: exibir números recursivamente

```c
void exibeNumeros(int valor)
{
    if (valor == 1) {                 // caso base
        printf("%d\n", valor);
    } else {                          // caso recursivo
        printf("%d\n", valor);
        exibeNumeros(valor - 1);      // chamada recursiva
    }
}
```

[Código reconstruído; o slide usa `valor <= 1` como caso base.] Se eu chamasse `exibeNumeros(valor)` sem diminuir, ele mostraria 5, chamaria de novo com 5, mostraria 5... e entraria em *loop*. Por isso atualizo para `valor - 1`.

Simulando com 5: 5 é igual a 1? Falso. Mostra o 5 e chama com 4. 4 é igual a 1? Falso. Mostra o 4 e chama com 3. E assim até chegar em 1: verdadeiro, mostra o 1. Executando: **5, 4, 3, 2, 1**.

### Vantagens e desvantagens

**Vantagens:** é uma solução mais elegante, menor e mais direta que a iterativa; deixa mais clara a solução do problema; elimina a necessidade de controlar manualmente as variáveis da repetição.

**Desvantagens:** tende a usar **mais espaço na memória RAM**, porque vai **empilhando** as chamadas recursivas ainda não finalizadas; pode ser **mais lenta**; e, se houver algum erro, é **mais difícil de depurar**.

### Ida e volta: exibir de N até 1 e de 1 até N

E se eu quiser que o código exiba os números de N até 1 e **também** de 1 até N? Posso fazer isso na mesma função recursiva? Pode. Antes eu tinha só a chamada recursiva; agora coloco um `printf` **depois** dela. Ele só vai ser executado depois que a chamada recursiva terminar.

```c
void recursao(int a)
{
    if (a > 0) {
        printf("%d ", a);
        recursao(a - 1);
        printf("%d ", a);
    } else {             // caso base
        printf("\n");
    }
}
```

Simulando o **caminho de ida** com `recursao(4)`: `a` vale 4, exibe 4 e faz a chamada recursiva com 3. Exibe 3 e chama com 2. Exibe 2 e chama com 1. 1 é maior que 0? É: exibe 1 e chama `recursao(0)`. `recursao(0)` é o nosso **caso base**: apenas exibe uma quebra de linha.

Ele terminou esse, mas **não terminou todas as chamadas que ficaram empilhadas antes**. Agora vem o **caminho de volta**: quem chamou `recursao(0)` foi a chamada com `a = 1`, então ela continua de onde parou e executa o segundo `printf`. Nesse escopo, quanto vale `a`? Vale **1**, então exibe 1. Essa termina e volta para quem a chamou, onde `a` vale **2**: exibe 2. Depois volta para a chamada onde `a` vale 3, exibe 3; e por fim para a chamada onde `a` vale 4, exibe 4.

Resultado: exibi todos os números de 4 até 1 e depois de 1 até 4. No código, com 5, a saída é **5 4 3 2 1** e depois **1 2 3 4 5**.

### Recursão com retorno

Até agora as funções recursivas não tinham valor de retorno, mas podem ter, sem problema nenhum. Posso usar o valor retornado pela função recursiva para ir **acumulando** e compor um resultado final. Por exemplo, somar todos os números de 1 até N de maneira recursiva:

```c
int somaNumeros(int valor)
{
    if (valor == 1) {            // caso base: a soma de 1 até 1 é 1
        return 1;
    } else {                     // caso recursivo
        return valor + somaNumeros(valor - 1);
    }
}
```

A soma até 5 é igual a 5 mais a soma até 4; e assim vou reduzindo o valor até chegar no caso base.

O professor comenta, neste ponto, que a chamada recursiva está na última linha e que isso seria uma **recursão de cauda**, com ganho de memória, e que é uma boa prática sempre que possível.

> **[Nota de correção — verificar com o professor]** `somaNumeros` **não** é uma recursão de cauda: embora a chamada esteja na última linha, depois que ela retorna ainda é preciso fazer a soma `valor + ...`. Recursão de cauda exige que a chamada recursiva seja a **última operação** (o resultado é devolvido sem nenhuma conta adicional), por exemplo `return somaCauda(valor - 1, acumulado + valor);`. Ver `Material-Ensino-Verificado/Aula_18_Recursividade.md`.

### Simulação da soma

Chamando `somaNumeros(6)`, ele vai calcular a soma de todos os números de 1 até 6:

- **Empilhando:** `soma(6)` é caso base? Não: é 6 + `soma(5)`. 5 é caso base? Não: 5 + `soma(4)`. Depois 4 + `soma(3)`, 3 + `soma(2)`, 2 + `soma(1)`.
- **Caso base:** `soma(1)` = 1. Repare que até agora **nenhuma conta foi feita**: só fui empilhando as chamadas.
- **Desempilhando:** `soma(2)` = 2 + 1 = **3**; `soma(3)` = 3 + 3 = **6**; `soma(4)` = 4 + 6 = **10**; `soma(5)` = 5 + 10 = **15**; `soma(6)` = 6 + 15 = **21**.

### No código e cuidados

Toda função recursiva **tem que ter o caso base** e **tem que ter o caso recursivo**, e na chamada recursiva você precisa **alterar os parâmetros** de forma que, em algum momento, eles cheguem ao caso base. Caso contrário, sua função recursiva **entra em *loop***, o que obviamente não é desejado.

Executando `somaNumeros(5)`: a soma é **15**. E com 6, o exemplo do slide, a soma é **21**.

### Encerramento

Com isso finalizamos a aula. No material há exercícios para vocês praticarem. E não se esqueçam: *para entender a recursão, é preciso entender a recursão...* (o professor repete a frase algumas vezes como piada e depois "retorna", como um caso base). Um grande abraço, bons estudos e até a próxima!

### Avisos da aula

O professor menciona exercícios no material [verificar: o PDF da Aula 18 não contém lista de exercícios]. Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_19_Ponteiros.md -->
## Aula 19 – Ponteiros

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O texto foi reconstruído com apoio dos slides da Aula 19 (`Material-Ensino-Verificado/Aula_19_Ponteiros.md`). Os códigos foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar]. Endereços de memória citados na execução estão parcialmente ininteligíveis.

### Tópicos abordados

- Relembrando variáveis: nome, conteúdo e endereço de memória
- O que é um ponteiro; declaração e inicialização com `NULL`
- Referenciação (`&`) e dereferenciação (`*`)
- Atribuição entre ponteiros (mesmo tipo)
- Aritmética de ponteiros
- Comparação de ponteiros × comparação de conteúdos
- Ponteiro genérico (`void*`)
- Ponteiros e vetores
- Ponteiro para ponteiro

### Glossário

- **Endereço de memória:** número que identifica cada "caixinha" (byte) da memória RAM.
- **Ponteiro:** variável especial que armazena o **endereço de memória** de outro valor.
- **`NULL`:** valor usado para inicializar um ponteiro que ainda não aponta para nada (na maioria dos compiladores, o endereço 0).
- **Referenciação (`&`):** retorna o endereço de memória de uma variável.
- **Dereferenciação (`*`):** retorna o conteúdo armazenado no endereço apontado pelo ponteiro.
- **Aritmética de ponteiros:** somar/subtrair inteiros a um ponteiro; o deslocamento depende do tamanho do tipo apontado.
- **Ponteiro genérico (`void*`):** ponteiro que não especifica o tipo apontado; exige *cast* antes de ser dereferenciado.

---

### Relembrando variáveis

Olá, pessoal, eu sou o professor Muriel e nesta aula vamos conversar sobre os **ponteiros**.

Vamos começar relembrando o uso de variáveis na linguagem C. Sempre que declaro uma variável, reservo um espacinho na memória RAM que tem um **nome** (uma etiqueta), e esse espacinho também tem um **endereço de memória**: todas as caixinhas da memória RAM têm um número, que chamamos de endereço de memória. E dentro dele fica o **conteúdo**; por exemplo, um valor do tipo inteiro, que vai de aproximadamente −2 bilhões a +2 bilhões.

### O que é um ponteiro

O ponteiro nada mais é do que um **tipo de variável especial**, que vai salvar não um inteiro, mas **um endereço de memória onde está salvo um outro valor**.

```c
int *ptr;
```

`int`, espaço, o **asterisco** (que é o sinal de ponteiro) e o nome `ptr` (abreviação de ponteiro). Nesse caso, não estou reservando memória onde vai ser salvo um inteiro: estou reservando memória para **salvar o endereço de memória onde está salvo um inteiro**.

E a inicialização? Se eu quiser inicializar, uso `NULL`, que, na maioria dos compiladores, é o endereço de memória zero:

```c
int *ptr = NULL;
```

### Referenciação e dereferenciação

Quais operadores posso usar com ponteiros?

- **Referenciação — operador `&`:** o mesmo "e comercial" que usamos no `scanf`. Ele retorna o **endereço de memória** onde a variável está salva.
- **Dereferenciação — operador `*`:** de maneira oposta, retorna o **conteúdo** do endereço de memória para o qual o ponteiro aponta.

Resumindo em um gráfico: se tenho uma variável e uso o `&`, chego no endereço de memória onde ela está salva. Se tenho um ponteiro e uso o `*`, volto para o conteúdo da variável salvo naquele endereço.

Na simulação da memória RAM: tenho a variável inteira com o valor 15 no endereço `0xF060`, e um ponteiro para inteiro salvo no próximo endereço, cujo conteúdo é **o endereço onde a variável está salva**: `0xF060`.

### No código

```c
int variavel = 15;
int *ptr;

ptr = &variavel;   // ptr recebe o endereço de memória de variavel

printf("Valor da variavel: %d\n", variavel);
printf("Endereco da variavel: %p\n", &variavel);
printf("Valor do ponteiro: %p\n", ptr);
printf("Dereferenciando o ponteiro: %d\n", *ptr);
```

Para exibir endereços uso o **`%p`** (de ponteiro). Executando: o valor da variável é 15; o endereço de memória da variável aparece em **hexadecimal** (endereços sempre são exibidos assim); o valor do ponteiro é **exatamente o mesmo** endereço; e, quando uso o asterisco no ponteiro, ele dereferencia e resgata o valor de volta: 15.

### Atribuição entre ponteiros

Tenho dois ponteiros para inteiro, `ptr1` e `ptr2`. Posso dizer que `ptr2` recebe o endereço guardado em `ptr1`? **Pode**, porque são dois ponteiros do mesmo tipo. Agora, se `y` é um `float` e eu tento salvar o endereço de `y` em um ponteiro para inteiro, **não pode**: dá erro. Você pode atribuir de um ponteiro para outro, mas o tipo apontado tem que ser o mesmo.

```c
int *ptr1, *ptr2, x = 10;
float y = 20;

ptr1 = &x;     // OK
ptr2 = ptr1;   // OK: mesmo tipo
ptr1 = &y;     // ERRO: int* recebendo endereço de float
```

### Aritmética de ponteiros

Posso fazer contas com ponteiros? Posso **somar ou subtrair inteiros**: o ponteiro avança ou recua posições de memória. Quantas posições ele avança ao somar 1? Como é um ponteiro para inteiro, e o inteiro tem **4 bytes**, ele avança **4 endereços** de memória.

Por exemplo, se o endereço fosse 1500 e eu der `++`, ele vai para 1504. Se mandar avançar 15 posições, avança 15 × 4 = **60** endereços. Se subtrair 2, recua 2 × 4 = **8** posições.

Na prática, criei uma variável inteira, inicializei o ponteiro com o endereço dela e fui somando 1, somando 15 e subtraindo 2, exibindo os endereços em hexadecimal e em decimal. A variável estava em um endereço com final **48**; com `++`, foi 4 bytes para frente: **52**. Com `+15`, avançou 60 posições: **612**. Com `-2`, voltou 8 posições: **604** [verificar: os números ditos na transcrição estão parcialmente ininteligíveis; os valores acima seguem a conta 48 + 4 = 52, 552 + 60 = 612, 612 − 8 = 604].

Quanto o ponteiro avança ou recua **depende do tipo para o qual ele aponta**.

### Comparando ponteiros

Posso comparar ponteiros? Sim, com os operadores comuns, como `==`:

```c
int valor1 = 10, valor2 = 10;
int *ptr1 = &valor1;
int *ptr2 = &valor2;

if (ptr1 == ptr2) {
    printf("Ponteiros iguais!\n");
} else {
    printf("Ponteiros diferentes!\n");   // esta é a saída
}
```

Os dois ponteiros apontam para variáveis que têm o valor 10, **mas essas variáveis estão em endereços distintos**. Como estou comparando **endereços**, ele diz que os ponteiros são diferentes.

E se eu quiser comparar o **conteúdo** dos endereços apontados? Faço uma **dereferenciação**: `*ptr1 == *ptr2`. O conteúdo apontado por `ptr1` é 10, e o apontado por `ptr2` também é 10, então ele diz que os **valores são iguais**.

```c
if (*ptr1 == *ptr2) {
    printf("Valores iguais!\n");
}
```

### Ponteiro genérico (`void*`)

Preciso sempre especificar o tipo para o qual o ponteiro aponta? Não necessariamente. Posso criar um **ponteiro genérico**, que aponta para qualquer tipo, declarando-o como `void*`. Mas, sempre que for utilizá-lo, tenho que fazer um **cast** (a conversão) para especificar o tipo apontado. Por exemplo, se o valor é um inteiro: primeiro faço a conversão para ponteiro de inteiro e depois dereferencio.

```c
printf("Exibindo o valor: %d\n", *(int*)ptrGenerico);
```

O que muda com o ponteiro genérico é a **aritmética**: com um ponteiro para inteiro, o `++` somava 4 no endereço; ao incrementar um ponteiro genérico, ele avança **apenas 1** posição. Se estava em 1500, com `++` vai para 1501; com `+15`, para 1516; com `-2`, para 1514. É preciso levar isso em consideração.

> **[Nota de verificação]** Aritmética com `void*` não faz parte do padrão C; o GCC a aceita como extensão (tratando cada elemento como 1 byte). Ver `Material-Ensino-Verificado/Aula_19_Ponteiros.md`.

### Ponteiros e vetores

Uma coisa que não falamos quando estudamos vetores: **o nome do vetor funciona como um ponteiro para a primeira posição** do vetor. Lembra que o valor entre colchetes é o **deslocamento** a partir da posição inicial? É exatamente aritmética de ponteiros: pega a posição inicial do vetor e soma a quantidade que está dentro dos colchetes.

Posso salvar essa posição em um ponteiro? Pode, e **não preciso do `&`**, porque o nome do vetor já é convertido para o endereço da primeira posição.

```c
int vetor[5] = {10, 20, 30, 40, 50};
int *ptrVet = vetor;   // sem &

for (int i = 0; i < 5; i++) {
    printf("%d - %p\n", ptrVet[i], &ptrVet[i]);
}
```

Executando: os valores 10, 20, 30, 40, 50, e os endereços são **sequenciais** na memória RAM, com finais `30`, `34`, `38`, `3C`, `40` [verificar], avançando de 4 em 4 bytes (em hexadecimal, depois de `38` vem `3C`).

Posso não usar o colchete e usar aritmética de ponteiros para percorrer o vetor? Posso: `ptrVet + i` é a posição inicial mais o deslocamento; e, dereferenciando esse endereço, pego o conteúdo.

```c
for (int i = 0; i < 5; i++) {
    printf("%d\n", *(ptrVet + i));   // equivalente a ptrVet[i]
}
```

Executando, continua exibindo o conteúdo do vetor normalmente, sem colchetes.

### Ponteiro para ponteiro

Para finalizar: posso ter um ponteiro para ponteiro? Posso. Antes eu tinha uma variável e um ponteiro com o endereço dessa variável. Agora crio um ponteiro que aponta para o ponteiro que aponta para a variável:

```c
int x = 10;
int *ptr = &x;          // guarda o endereço de x
int **ptrPtr = &ptr;    // guarda o endereço de ptr (dois asteriscos)

printf("%d\n", x);         // 10: acesso direto
printf("%d\n", *ptr);      // 10: dereferencia uma vez
printf("%d\n", **ptrPtr);  // 10: dereferencia duas vezes
```

Na memória: `x`, que vale 10, está em um endereço; `ptr` guarda o endereço de `x` (`0xF060`); e `ptrPtr` guarda o endereço onde o próprio `ptr` está salvo (`0xF068` [verificar]). A linguagem C permite outros níveis: ponteiro para ponteiro para ponteiro, e assim por diante. Apenas usem com cuidado para não se perderem.

Executando: **10, 10 e 10**. O primeiro é o acesso direto pelo inteiro; o segundo, pelo ponteiro; o terceiro, dereferenciando duas vezes o ponteiro para ponteiro.

### Encerramento

Ok, pessoal, com isso finalizamos a aula de hoje. Nos slides há alguns exercícios para vocês praticarem. Bons estudos, um grande abraço e até a próxima!

### Avisos da aula

Há exercícios nos slides (6 exercícios sobre ponteiros). Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_20_Alocacao_Dinamica.md -->
## Aula 20 – Alocação Dinâmica

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "produção brilho"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O texto foi reconstruído com apoio dos slides da Aula 20 (`Material-Ensino-Verificado/Aula_20_Alocacao_Dinamica.md`). Os códigos foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar]. Um trecho no meio da explicação de matrizes está **ininteligível** na transcrição original (texto sem sentido).

### Tópicos abordados

- Como o programa usa a memória: pilha (*stack*) e *heap*
- Organização da memória de um programa; estouro de pilha
- Quando usar *stack* e quando usar *heap*
- O que é alocação dinâmica
- `malloc`, `sizeof`, verificação de `NULL`
- `calloc`, `realloc`, `free`
- Alocação e liberação de matrizes
- Alocação de uma struct e de um vetor de structs

### Glossário

- **Pilha (*stack*):** região onde ficam as variáveis locais das funções; estrutura LIFO (último a entrar, primeiro a sair).
- **Heap:** região de memória não gerenciada automaticamente, usada pela alocação dinâmica.
- **Estouro de pilha (*stack overflow*):** quando a pilha não tem mais espaço para crescer e o programa é finalizado.
- **Alocação dinâmica:** reservar memória na *heap* em tempo de execução e liberá-la explicitamente.
- **`sizeof`:** operador que retorna o tamanho, em bytes, de um tipo ou estrutura.
- **Cast:** conversão de tipo, por exemplo de `void*` para `int*`.

---

### Introdução: pilha (*stack*)

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos falar sobre **alocação dinâmica**. Para isso, precisamos entender melhor como o nosso programa usa a memória.

Sempre que criamos variáveis e estruturas locais, elas são colocadas em uma estrutura chamada **pilha**. O que é uma pilha? É uma estrutura em que os novos elementos são colocados **sempre no topo**, e sempre retiramos o elemento do topo, assim como uma pilha de pratos. Também é chamada de **LIFO** (*Last In, First Out*): o último a entrar é o primeiro a sair.

Durante a execução de cada uma das funções, inclusive a `main`, todas as variáveis declaradas internamente são colocadas nessa pilha. Assim que a função finaliza, ela é retirada da pilha. Por exemplo, no fatorial: chamou a `main`, depois `fatorial(3)` (empilhou), `fatorial(2)` (empilhou), `fatorial(1)` (empilhou). Terminou de rodar `fatorial(1)`, ele é desempilhado e sai da memória.

### Heap

Outra região que temos é a **heap**, uma região nova para nós. *Heap* seria um "monte", um aglomerado de coisas. Geralmente é **maior** que a *stack*. É uma região que **não é gerenciada automaticamente**, diferente da pilha: o programador precisa usar a **alocação dinâmica**, ou seja, dizer explicitamente "reserva um espaço" e "libera um espaço".

Não existe restrição de tamanho na *heap*, a não ser a do hardware. Então podemos criar uma estrutura que cresce ou diminui conforme a necessidade e a demanda do programa. Uma desvantagem é que ela é **mais lenta** que a pilha. E qualquer valor que estiver na *heap* pode ser acessado por qualquer parte do programa, porém sempre **através de ponteiros**, que vimos na aula passada.

### Organização da memória

Considere esta barra como toda a região de memória utilizada pelo programa. Na parte de baixo ficam o **código**, as **constantes** e as **variáveis globais**, que ocupam a memória o tempo todo. Acima, a **heap** cresce de baixo para cima, e a **pilha** cresce de cima para baixo; no meio fica a área livre. Conforme a *heap* aloca, ela usa esse espaço; conforme libera, devolve. A pilha, conforme empilha chamadas, vai aumentando; conforme libera, vai voltando.

Se essas duas partes se encontrarem e a pilha não tiver mais espaço para crescer, temos o **stack overflow**, o famoso **estouro de pilha**: o programa é finalizado. Já na *heap*, quando não há mais espaço, as funções de alocação que veremos **retornam `NULL`**, indicando que não é possível alocar.

### *Stack* ou *heap*?

- **Stack:** normalmente quando estamos usando variáveis relativamente pequenas, que devem existir apenas durante a execução da função onde foram definidas.
- **Heap:** quando quero manipular valores relativamente grandes, quando quero que eles durem um longo período, e quando quero **aumentar ou diminuir** a quantidade de dados em tempo de execução, como vetores e matrizes de tamanho dinâmico.

### O que é alocação dinâmica

É uma técnica que permite ao programador criar variáveis **em tempo de execução**: alocar espaço na *heap*, manipular enquanto precisar e depois, explicitamente, liberar esse espaço. Permite usar a memória **sob demanda**: não preciso definir no código o tamanho do vetor; posso aumentar e diminuir o vetor ou a matriz conforme a necessidade, evitando desperdício de memória.

O espaço alocado fica reservado até eu liberá-lo. Depois de liberado, essa região fica disponível para outras partes do programa. Ao fechar o programa, toda a região de memória que ele ocupava na *heap* também é devolvida ao sistema operacional.

Na linguagem C usamos quatro funções básicas da biblioteca padrão (`stdlib.h`): **`malloc`**, **`calloc`**, **`realloc`** e **`free`**.

### `malloc`

A primeira é a `malloc` (*memory allocation*, alocação de memória). Ela recebe a **quantidade de bytes** a ser alocada [o professor diz "inteiro sem sinal"; o tipo real é `size_t`] e retorna um **ponteiro genérico** para a primeira posição da área alocada.

Para alocar espaço para mil caracteres: crio um ponteiro para `char` e chamo `malloc(1000)`, pois cada caractere ocupa um byte. Como a `malloc` retorna um ponteiro genérico, faço um **cast** para ponteiro de `char`, o mesmo tipo do ponteiro que criei:

```c
char *ptr;
ptr = (char*) malloc(1000);
```

E para números inteiros? O `int` pode ocupar 2 ou 4 bytes, dependendo da arquitetura. Por isso uso o **`sizeof`**, que retorna o tamanho de um tipo ou estrutura:

```c
int *ptr;
ptr = (int*) malloc(50 * sizeof(int));   // 50 × 4 = 200 bytes
```

O `sizeof` é muito útil com a `malloc` porque torna o código **independente de arquitetura**. Posso pegar o tamanho de um `char`, de um `int`, de um `float` e inclusive de uma estrutura que você criou: por exemplo, a estrutura `Ponto` (com `x` e `y` inteiros) ocupa **8 bytes**.

> **[Nota de verificação]** O professor se refere ao `sizeof` como "função"; tecnicamente é um **operador** da linguagem (por isso funciona com tipos e é calculado em tempo de compilação).

### Verificando `NULL`

Se não houver espaço disponível na *heap* (a memória é limitada pelo hardware, e pode já estar muito ocupada), a `malloc` retorna **`NULL`**. Então aloco e testo: se o ponteiro for igual a `NULL`, mostro "Erro: memória insuficiente" e posso finalizar o programa.

```c
int *ptr = (int*) malloc(5 * sizeof(int));
if (ptr == NULL) {
    printf("Erro: Memoria Insuficiente!\n");
    exit(1);
}
```

### `calloc`

Outra maneira é a função **`calloc`**. Ela faz praticamente a mesma coisa, mas a assinatura é diferente: recebe a **quantidade** e o **tamanho** de maneira separada. Para um vetor de 5 inteiros:

```c
int *ptr = (int*) calloc(5, sizeof(int));
```

> **[Nota de verificação]** Além da assinatura, há uma diferença importante não mencionada na fala: o `calloc` **inicializa toda a memória com zeros**; o `malloc` não inicializa (a memória contém lixo).

### `realloc`

Às vezes, durante a execução, preciso **aumentar ou diminuir** a área alocada para o vetor ou a matriz. Para isso uso o **`realloc`**: ele recebe o endereço da primeira posição previamente alocada e o **novo tamanho**, e retorna um ponteiro.

Por que retorna um ponteiro, se a área já estava alocada? Porque pode ser que, ao realocar, a região **mude de lugar** na *heap*, e a posição do primeiro elemento mude. Então ele sempre retorna o ponteiro para a primeira posição, e com isso atualizo o ponteiro no meu programa.

No exemplo do slide: alocamos 5 inteiros; depois realocamos `p` para **3** inteiros e atualizamos `p`; depois realocamos para **10** inteiros. Isso é a alocação **dinâmica**: posso aumentar ou reduzir a área de memória utilizada.

> **[Nota de verificação]** Ao aumentar para 10 posições, as posições novas **não são inicializadas** (contêm lixo). E o padrão `p = realloc(p, ...)` perde o bloco original se o `realloc` falhar e retornar `NULL`; o ideal é usar um ponteiro temporário. Ver material verificado.

### `free`

Uma coisa com que temos que nos preocupar: como temos controle total da memória, **toda memória que você alocar, você, programador, é responsável por liberar**. Para isso uso a função **`free`**, passando entre parênteses o ponteiro para a primeira posição da área que quero liberar. Caso contrário, esse espaço fica ocupado na *heap* e só é liberado quando o processo do programa for finalizado.

Mas o `free` não recebe o tamanho: como ele sabe quantos bytes liberar? Quando você faz um `malloc`, `calloc` ou `realloc`, internamente o programa mantém uma **tabela de alocação** que registra: "a região que começa no endereço tal tem tamanho tal". Assim, ele consulta a tabela para saber quantos bytes liberar.

### No código: alocando um vetor

Quero criar um vetor para 50 inteiros. Três formas que fazem a mesma coisa:

```c
int *ptr;

ptr = (int*) malloc(200);                   // 50 ints × 4 bytes (depende da arquitetura)
ptr = (int*) malloc(50 * sizeof(int));      // independente de arquitetura
ptr = (int*) calloc(50, sizeof(int));       // quantidade e tamanho separados
```

[No código do professor são três linhas alternativas; na prática usa-se apenas uma.]

E se precisar alterar o tamanho? Uso o `realloc`, passando o ponteiro para a primeira posição e o novo tamanho, `80 * sizeof(int)`: estou realocando o vetor de 50 para 80 posições. Como o vetor pode ter trocado de posição na *heap*, pego o ponteiro retornado, faço o cast para ponteiro de inteiro e atualizo `ptr`.

```c
ptr = (int*) realloc(ptr, 80 * sizeof(int));
/* ... usa ptr como um vetor normal ... */
free(ptr);
```

Depois posso usar normalmente, com um `for`, como fazia antes com vetores. E, quando terminar, **libero** com `free(ptr)`: como há a tabela de alocação interna, ele sabe exatamente quantos bytes liberar.

### Alocando matrizes

Lembra que uma matriz nada mais é do que um **vetor de vetores**? Para alocar um vetor, uso um ponteiro para inteiro; para alocar uma matriz, uso um **ponteiro para ponteiro para inteiro**.

Para uma matriz 4×4: o primeiro passo é criar um **vetor de ponteiros**, onde cada posição representa uma linha. Cada linha é um vetor, ou seja, um ponteiro para inteiro, então o tamanho de cada posição é `sizeof(int*)`. Depois, num laço `for`, percorro esse vetor de ponteiros alocando separadamente cada uma das linhas.

```c
int **matriz = (int**) malloc(4 * sizeof(int*));   // vetor de ponteiros (linhas)

for (int l = 0; l < 4; l++) {
    matriz[l] = (int*) malloc(4 * sizeof(int));    // cada linha
}
```

Para liberar, **primeiro** percorro todas as linhas dando `free` em cada uma (agora elas apontam para lixo, um valor indefinido) e, **depois** de liberar todas as linhas, dou o `free` no vetor de ponteiros:

```c
for (int l = 0; l < 4; l++) {
    free(matriz[l]);
}
free(matriz);
```

[Trecho ininteligível na transcrição original durante a demonstração no código; verificar.] Terminando de usar a matriz, percorro as linhas com `free` em cada uma e depois dou `free` na matriz principal, o vetor de ponteiros, liberando toda a memória.

### Alocando estruturas

Para alocar uma estrutura, uso o `sizeof`. Criei uma estrutura `Pessoa` com um nome de 50 caracteres (49 úteis, por causa do `'\0'`) e uma idade. Dou um `malloc(sizeof(Pessoa))`: ele calcula automaticamente quantos bytes precisa, aloca e retorna um ponteiro genérico, no qual faço o cast para `Pessoa*`.

Lembrem: quando a estrutura está alocada dinamicamente e é acessada por um **ponteiro**, cada membro é acessado com a **seta** (`->`), e não com o ponto.

```c
Pessoa *cadastro = (Pessoa*) malloc(sizeof(Pessoa));

strcpy(cadastro->nome, "Rosinosvalda");
cadastro->idade = 22;

free(cadastro);
```

E um **vetor** de estruturas? Muito parecido, só que agora `3 * sizeof(Pessoa)`. Para acessar, como uso o índice entre colchetes, o elemento **já está dereferenciado** (o colchete já resolve o endereço daquele elemento), então **não preciso da seta**: uso o **ponto**.

```c
Pessoa *vetCadastro = (Pessoa*) malloc(3 * sizeof(Pessoa));

strcpy(vetCadastro[0].nome, "Rosinosvalda");
vetCadastro[0].idade = 22;
/* ... */
free(vetCadastro);
```

### Encerramento

Com isso finalizamos esta aula. No material há exercícios para vocês trabalharem. Bons estudos, um grande abraço e até a próxima!

### Avisos da aula

Há exercícios nos slides (4 exercícios sobre alocação dinâmica). Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_21_Arquivos_Modo_Texto.md -->
## Aula 21 – Arquivos (Modo Texto)

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Prochor Morial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O texto foi reconstruído com apoio dos slides da Aula 21 (`Material-Ensino-Verificado/Aula_21_Arquivos.md`). Os códigos foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

### Tópicos abordados

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

### Glossário

- **Arquivo:** coleção de dados armazenada em memória secundária (HD, SSD, pen-drive), fora da RAM.
- **Arquivo texto:** guarda os dados como caracteres legíveis em um editor de texto.
- **Arquivo binário:** guarda os dados exatamente como estão na memória RAM; não é legível em editor de texto.
- **`FILE *`:** ponteiro de arquivo, usado por todas as funções de arquivo.
- **Buffer:** região de memória que guarda os dados temporariamente antes de gravá-los no disco.
- **`EOF`:** *End Of File*, constante (valor −1) que indica o fim do arquivo.

---

### O que são arquivos

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos conversar sobre **arquivos**.

Arquivos nada mais são do que **coleções de dados armazenadas em dispositivos de memória secundária**, ou seja, fora da memória RAM. Os exemplos mais clássicos são HD, SSD e pen-drives.

Por que usar arquivos?
- Permitem armazenar uma **grande quantidade de informação**.
- **Persistência dos dados:** quando desligo o computador ou acaba a energia, não perco a informação.
- O acesso pode ser **não sequencial**: posso ler uma informação no começo ou no fim do disco sem problema.
- **Acesso concorrente:** mais de um programa pode utilizar os dados ao mesmo tempo.

### Arquivo texto × binário

A linguagem C manipula arquivos de dois modos principais: **modo texto** e **modo binário**.

**Modo texto:** armazena todas as informações como **caracteres**. Por isso, posso abrir o arquivo em qualquer editor de texto, como o Bloco de Notas, e ler a informação. Os dados são gravados como caracteres de 8 bits. Por exemplo, um número inteiro, que na memória RAM ocupa 4 bytes (32 bits), no arquivo texto gasta **um byte para cada algarismo**: um número de 8 algarismos ocupa 8 bytes (64 bits).

No exemplo do slide, tenho uma string, um inteiro e um `float`. Salvando em modo texto e abrindo no Bloco de Notas, consigo ler tudo: o nome ("Rosinosberta"), o inteiro 32 (dois algarismos, dois bytes) e o `float`, que por padrão é escrito com 6 casas decimais (`1.750000`, 8 caracteres, 8 bytes).

**Modo binário:** armazena uma sequência de bits que segue as convenções do programa que a criou. É comum em arquivos executáveis e compactados. Os dados são gravados **do mesmo modo que estavam na memória RAM**: o inteiro que ocupa 4 bytes na RAM ocupa 4 bytes no arquivo. Se eu abrir esse arquivo em um editor de texto, vejo o nome normalmente, mas o editor tenta interpretar os bytes do inteiro e do `float` como caracteres e mostra **lixo**, porque ali não há caracteres, há valores binários.

### Arquivos em C: `stdio.h` e `FILE *`

Todas as funções de que vamos precisar estão na biblioteca **`stdio.h`** (*standard input/output*, entrada e saída padrão). Essa biblioteca **não tem funções automáticas** do tipo "leia tudo" ou "escreva tudo": as funções se limitam a abrir o arquivo, ler isto, escrever aquilo. **A tarefa do programador** é organizar como a informação será escrita e como será lida depois.

Todas as funções trabalham com o conceito de **ponteiro para arquivo**:

```c
FILE *fp;   // fp = "file pointer"; pode ter o nome que você quiser
```

### Abrindo um arquivo: `fopen`

Para abrir, uso a função **`fopen`** (*file open*). Ela recebe dois argumentos: o **nome do arquivo** e o **modo de abertura**. Se funcionar, retorna um ponteiro para o arquivo; se der algum erro, retorna **`NULL`**.

**Caminhos.** O nome do arquivo pode ser:
- **Absoluto:** a descrição completa desde a pasta raiz, que depende do sistema operacional. No Windows, algo como `"C:\\Projetos\\dados.txt"`: como a contrabarra é um caractere especial (usado no `\n`), para escrever uma contrabarra é preciso usar **duas** (`\\`). No Linux, algo como `"/home/usuario/dados.txt"`.
- **Relativo:** a partir do **diretório corrente** (o diretório do executável [verificar]). Se o arquivo está na mesma pasta, uso só o nome, `"arq.txt"`; em uma subpasta, `"diretorio/dados.txt"`; na pasta acima, `"../dados.txt"`. A barra também depende do sistema operacional.

**Modos de abertura.** Os três principais:
- **`"r"`** (*read*): leitura. O arquivo **deve existir**; caso contrário, retorna erro.
- **`"w"`** (*write*): escrita. Cria o arquivo se não existir. **Cuidado:** se já existir, ele **apaga** e começa o arquivo do zero.
- **`"a"`** (*append*): escrita, mas tudo o que escrever é **adicionado ao final** do arquivo existente.

Depois vêm **`"rb"`, `"wb"` e `"ab"`**, exatamente iguais aos três anteriores, mas em **modo binário**. Há ainda variações com o símbolo **`+`**: mantêm as características dos modos anteriores, mas permitem **ler e escrever** no arquivo.

### Verificando a abertura e `exit`

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

### Fechando: `fclose` e o buffer

Terminei de usar o arquivo: tenho que **fechá-lo** com a função **`fclose`**, passando o arquivo como argumento. Ela retorna **zero** em caso de sucesso. Ao fechar, **tudo o que estava no buffer é gravado** no disco.

O que é um **buffer**? Uma região de memória onde os dados ficam **temporariamente armazenados** antes de serem transferidos, por exemplo da RAM para o HD. Por quê? Se a cada letrinha o programa acessasse o HD, que é muito mais lento que a RAM, o programa ficaria muito lento. Então ele vai acumulando no buffer e, quando junta um bloco bom de caracteres, grava de uma vez só no HD, deixando o programa mais eficiente.

### Lendo e escrevendo

Há quatro maneiras de ler e escrever, que veremos nesta aula e na próxima: **caractere**, **string**, **sequência de bytes** e **string formatada**. Nesta aula: caracteres e strings.

### Caracteres: `fputc`, `fgetc` e `EOF`

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

### Arquivos pré-definidos

A linguagem C já tem vários arquivos pré-definidos, alguns dos quais já usamos no curso:
- **`stdin`**: entrada padrão (o teclado).
- **`stdout`**: saída padrão (o monitor).
- **`stderr`**: saída de erro padrão (por padrão a tela, mas pode ser um arquivo só de erros).
- O professor cita também **`stdaux`** (portas seriais, em sistemas antigos) e **`stdprn`** (portas paralelas, usadas antigamente por impressoras).

> **[Nota de verificação]** `stdaux` e `stdprn` existem apenas em compiladores antigos do DOS/Windows; não fazem parte do padrão C. Os três padronizados são `stdin`, `stdout` e `stderr`.

Exemplo: `fputc(caractere, stdout);` escreve o caractere **na tela**, equivalente ao `printf`. E `caractere = fgetc(stdin);` lê um caractere **do teclado**, como um `scanf` de um caractere.

### Strings: `fputs` e `fgets`

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

### Encerramento

E é isso, pessoal. Com isso finalizamos esta primeira parte de arquivos [verificar: a transcrição diz "estrens"]. Bons estudos, um grande abraço e até a próxima!

### Avisos da aula

O professor menciona que leitura/escrita de **sequências de bytes** e de **strings formatadas** ficam para a **próxima aula** (Parte 2). Há exercícios nos slides (6 exercícios sobre arquivos texto). Nenhum prazo ou prova foi mencionado.
