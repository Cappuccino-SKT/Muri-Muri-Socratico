# Aula 13 – Strings (Parte 2): funções da `string.h`

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

## Tópicos abordados

- Por que strings precisam de funções para copiar e comparar
- Biblioteca `string.h`
- `strlen`: comprimento da string (e o caso dos caracteres acentuados)
- `strcpy`: copiar uma string para outra
- `strcat`: concatenar (juntar) strings
- `strcmp`: comparar strings (e a diferença entre maiúsculas e minúsculas)
- `strcasecmp`: comparar ignorando maiúsculas/minúsculas

## Glossário

- **`string.h`:** biblioteca padrão da linguagem C com funções para manipular strings.
- **`strlen(s)`:** retorna quantos caracteres (bytes) existem na string **até o `\0`**.
- **`strcpy(destino, origem)`:** copia o conteúdo da origem para o destino; o que havia no destino é perdido.
- **`strcat(destino, origem)`:** concatena; copia o conteúdo da origem **no final** do destino, sem apagar o que já estava lá.
- **`strcmp(s1, s2)`:** compara duas strings e retorna um número; **zero significa que são iguais**.
- **`strcasecmp(s1, s2)`:** compara duas strings desconsiderando maiúsculas e minúsculas.
- **Destino × origem:** na `strcpy` e na `strcat`, o primeiro parâmetro recebe e o segundo fornece o conteúdo.
- **Concatenar:** juntar uma string ao final de outra.

---

## Introdução

Olá, eu sou o professor Muriel e esta é a segunda parte da nossa aula sobre strings.

Na primeira parte, nós aprendemos que strings são apenas um vetor de caracteres que utilizamos para salvar e manipular texto. Aprendemos como recuperar uma string a partir do teclado e exibi-la na tela. Aprendemos também a utilizar uma matriz para armazenar um conjunto de strings.

No entanto, é muito comum precisarmos manipular esses dados, como, por exemplo, **copiar** e **comparar**. Só que não é tão simples como numa variável comum, porque agora eu não estou falando apenas de uma variável: estou falando de **um vetor inteiro** que deve ser copiado, **um vetor inteiro** que deve ser comparado. Para isso, utilizaremos uma biblioteca padrão da linguagem C chamada **`string.h`**. Para facilitar a manipulação das strings, vamos usar as funções dela.

Você pode consultar a relação completa das funções que ela tem em um site, ou então no terminal do Linux, digitando `man string` [verificar: o original está confuso], que mostra uma lista de todas as funções. Vamos fazer uma passadinha rápida em 4 exemplos, que são funções bastante úteis.

## `strlen`: comprimento da string

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

## `strcpy`: copiar uma string

Outra função é a **`strcpy`** (*string copy*): copia o conteúdo de uma string para outra. Se eu não tivesse essa função, eu teria que copiar letra por letra, fazendo um `for`: pega a letra 0 daqui, copia para a letra 0 de lá; a 1 daqui para a 1 de lá; a 2 daqui para a 2 de lá.

Vamos ver como ficaria no nosso código. Eu tenho duas strings: na primeira, já inicializei com o nome "Maria"; a segunda não tem nada. Eu quero copiar todo o conteúdo desse vetor para esse. Em vez de fazer um `for` copiando letra por letra, uso **`strcpy`**: o primeiro parâmetro é **quem vai receber** (o destino), a `saida`; o segundo é **de onde está vindo** (a origem), o `nome`. Ele copia as letrinhas do `nome` para a `saida`. Depois, um `printf` da saída.

```c
char nome[21] = "Maria";   // [verificar: tamanhos]
char saida[21];

strcpy(saida, nome);       // destino, origem
printf("%s\n", saida);
```

Executando: a saída é "Maria". Repare que o `printf` do meu vetor `saida`, que não tinha nada, agora mostra "Maria". **Se tivesse algo na `saida`, ele seria sobrescrito: perderia tudo o que tinha antes** [verificar: trecho confuso no original].

## `strcat`: concatenar (juntar) strings

E se eu **não quiser perder** o que já estava na string, e sim **juntar duas strings**? Nesse caso, vou utilizar a **`strcat`** (*string concatenate*), a função que concatena, que junta as strings. Ela vai juntar o conteúdo da segunda string **ao final da primeira**, sem perder o que tinha lá antes.

Como vai ficar? Eu tenho a string `nome` com um conteúdo (um nome, terminado em espaço) e a string `sobrenome` com outro conteúdo (por exemplo, "da Silva") [verificar: exemplo do slide confuso], e quero juntar para ficar com nome e sobrenome. Se eu usasse o `strcpy`, ele apagaria o conteúdo do `nome`; eu não quero isso. Então, uso o `strcat`: o primeiro parâmetro é onde vai ser salvo (`nome`) e o segundo é de onde está vindo (`sobrenome`). Ele pega todo o conteúdo da string `sobrenome` e copia no **final** da string `nome`. Agora, se eu exibir o `nome`, vai estar tudo lá: antes era só o nome e, depois do `strcat`, aparece o nome com o conteúdo do sobrenome.

```c
char nome[41] = "João ";        // [verificar: valores e tamanhos]
char sobrenome[21] = "da Silva";

strcat(nome, sobrenome);        // destino, origem
printf("%s\n", nome);           // João da Silva
```

Repare que o `strcat` **não adiciona espaço**: o espaço aparece entre eles só porque eu coloquei um espaço na hora de inicializar a string.

## `strcmp`: comparar strings

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

## `strcasecmp`: ignorando maiúsculas e minúsculas

Tem como fazer a comparação **desconsiderando** a diferença entre maiúsculas e minúsculas? Tem uma função alternativa à `strcmp`: a **`strcasecmp`** [verificar: o original diz "S-T-R-K-S-M-P"]. Ela compara as duas strings desconsiderando se é maiúsculo ou minúsculo. Então, nesse caso, mesmo que seja maiúsculo ou minúsculo, ele vai dizer que os nomes são iguais [verificar: a biblioteca e a disponibilidade dessa função dependem do compilador].

```c
if (strcasecmp(nome1, nome2) == 0) {
    printf("Os nomes são iguais\n");   // "João" e "joão" são iguais
}
```

## Encerramento

Com isso finalizamos a aula de hoje. No material, tem para vocês alguns exercícios para praticarem os conceitos vistos na aula de hoje. Bons estudos, um grande abraço e até a próxima!

## Avisos da aula

Há exercícios no material da disciplina sobre as funções de `string.h`. Nenhum prazo ou prova foi mencionado.
