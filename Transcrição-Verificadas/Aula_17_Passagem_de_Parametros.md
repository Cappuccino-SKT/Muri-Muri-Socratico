# Aula 17 – Funções: Passagem de Parâmetros (por cópia e por referência)

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Mundial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

## Tópicos abordados

- Passagem de parâmetros **por cópia** × **por referência**
- Ponteiros: o que são, como declarar, `&` e `*`
- Exemplo: incrementar uma variável dentro de uma função
- Quando usar passagem por referência
- Vetores e matrizes são sempre passados por referência
- Estruturas: passagem por cópia e por ponteiro; operador seta (`->`)

## Glossário

- **Passagem por cópia:** a função recebe uma **cópia** do valor; alterar o parâmetro não altera a variável original.
- **Passagem por referência:** a função recebe o **endereço de memória** da variável; alterar o valor apontado altera a variável original.
- **Ponteiro:** variável que guarda o endereço de memória de outra variável.
- **`int *ponteiro`:** declara um ponteiro para inteiro (o asterisco indica que é ponteiro).
- **`&` (e comercial):** retorna o endereço de memória de uma variável.
- **`*` (asterisco, em uso):** retorna o valor que está no endereço apontado pelo ponteiro.
- **Estrutura:** tipo composto por membros (por exemplo, um ponto com `x` e `y`).
- **Operador seta (`->`):** acessa os membros de uma estrutura quando se tem um ponteiro para ela; `p->x` equivale a `(*p).x`.

---

## Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos falar sobre **diferentes maneiras de passar parâmetros para uma função**.

Na aula passada aprendemos que os parâmetros são os valores que podem ser passados para uma função. Na linguagem C, eles podem ser passados de duas maneiras: **por cópia** ou **por referência**. Até agora, na aula passada, nós utilizamos a **passagem por cópia**.

## Passagem por cópia

Vamos supor um programa em que a função `main` cria uma variável inteira, atribui 15 e chama uma função que vai receber esse valor e incrementar uma unidade. Depois que eu volto para a `main` e dou um `printf` do valor dessa variável, será que ele vai exibir 15 ou 16? Nesse caso, vai exibir **15**, porque eu passei uma **cópia** do valor. Então, quando ele entrou na função e fez o `++`, ele incrementou uma posição de memória diferente da variável que eu tinha lá na `main`. Logo, **a variável original não foi alterada**.

## Passagem por referência

E se eu quisesse que esse valor fosse alterado? Nesse caso, eu faço uma **passagem por referência**. O que seria isso? Em vez de passar o valor, **eu passo o endereço de memória onde está salva a variável**.

Lembra de como funcionava a memória RAM? Eu tinha uma variável com um nome (`valor`), o conteúdo (15) e um número, o endereço da memória onde está salva a variável. E eu podia, através do operador `&` (e comercial), pegar o endereço da memória onde está salva a variável. Então eu posso passar não o valor, mas o **endereço de memória**.

## Ponteiros

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

## Exemplo: incrementar por referência

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

## Quando usar passagem por referência?

1. **Quando estou passando uma quantidade muito grande de dados** para a minha função. Quando passa por cópia, ele vai ter que copiar todo esse valor, o que gera tempo de processamento e ocupa mais espaço na memória.
2. **Quando eu quero que a minha função retorne mais de um valor.** Pense: quero que a minha função retorne 2, 3, 4 valores diferentes. Com o `return` não é possível retornar mais de um. Uma das maneiras de fazer isso é **passar ponteiros para a minha função**, e a minha função salva os valores que eu quero como retorno **no endereço de memória apontado por esses ponteiros** que foram passados como parâmetro.

## Vetores e matrizes: sempre por referência

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

## Estruturas: por cópia ou por ponteiro

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

## Encerramento

Com isso, pessoal, finalizamos esse conteúdo. É um conteúdo **mega importante**, o conteúdo de ponteiros [trecho confuso no original, algo sobre "sempre estar atento ao asterisco"]. Tem exercícios para vocês praticarem nos slides também. Bons estudos, um grande abraço e até a próxima!

## Avisos da aula

Há exercícios nos slides sobre passagem de parâmetros e ponteiros. Nenhum prazo ou prova foi mencionado.
