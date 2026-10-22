# Aula 03 – Variáveis

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "professor Daniel"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar]. A transcrição original está **muito distorcida** em vários trechos; o que não pôde ser confirmado está marcado.

## Tópicos abordados

- O que é uma variável e por que declará-la antes de usar
- Escopo global × local
- Valor "lixo" em variável sem valor inicial
- Atribuição (`=`) e declaração com atribuição na mesma linha
- Tipos principais: `char`, `int`, `float`, `double` (tamanho e precisão)
- Regras: *case sensitive*, ponto decimal, ponto e vírgula, palavras reservadas
- Notação científica e números muito grandes
- Exibir variáveis com `printf` (`%d`, `%f`, `%c`, `%.2f`) e vários valores em um `printf`
- Bases numéricas (hexadecimal, octal, binário), sufixos (`U`, `L`) e `sizeof`
- Constantes: `#define` e `const`

## Glossário

- **Variável:** posição específica da memória RAM, reservada para guardar um valor que pode mudar quando você quiser.
- **Declaração:** reservar a variável antes de usá-la: tipo, espaço, nome e ponto e vírgula.
- **Escopo global:** variável declarada fora de qualquer função; todas as funções a veem.
- **Escopo local:** variável declarada dentro de uma função (por enquanto, dentro da `main`).
- **Lixo:** valor aleatório que existe na posição de memória antes de você escrever nela; não é necessariamente zero.
- **Atribuição:** ato de escrever um valor em uma variável, com o operador `=`; do lado esquerdo vai a variável e do direito o valor.
- **`char`:** uma letra do teclado; 8 bits (1 byte); 256 valores (tabela ASCII).
- **`int`:** número inteiro; 32 bits (4 bytes).
- **`float`:** número real; 32 bits (4 bytes); cerca de 7 casas decimais de precisão.
- **`double`:** número real com precisão dupla; 64 bits (8 bytes); cerca de 15 casas decimais.
- **Case sensitive:** a linguagem C diferencia maiúsculas de minúsculas (`preco` e `Preco` são variáveis diferentes).
- **Palavra reservada:** palavra da linguagem que não pode ser nome de variável (`include`, `return`...).
- **Especificador de formato:** marcador usado no `printf` para indicar o tipo do valor a ser exibido (`%d`, `%f`, `%c`).
- **`sizeof`:** retorna quantos bytes um tipo (ou variável) ocupa no seu computador.
- **`#define`:** diretiva de pré-compilação que cria uma constante por substituição de texto (não é uma variável).
- **`const`:** declara uma variável protegida contra alteração.

---

## Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos conversar um pouquinho sobre **variáveis**.

Até agora nós vimos que o computador é uma máquina capaz de realizar 4 tarefas: receber uma entrada de dados, armazenar, processar essas informações (fazer contas com elas) e gerar uma saída. Mas, até agora, os nossos programas só exibiam "Hello World" na tela, ou seja, apenas geravam uma saída. Nesta aula vamos aprender como **armazenar valores na memória** através de **variáveis**.

## O que são variáveis

Variáveis são **uma posição específica da memória RAM**. Você pode reservar essa posição e deixá-la guardada para salvar uma informação e alterá-la sempre que quiser. Por isso se chama variável: **o valor varia**, o tempo que você desejar.

Antes de utilizar, você tem que falar para o computador: "reserve uma caixinha para mim, uma posição da memória RAM". Então, **toda variável deve ser declarada antes de ser utilizada**. Como se faz a declaração? Escreve-se o **tipo** (daqui a pouco vamos falar sobre os tipos), um espaço, o **nome da variável**, e finaliza-se com **ponto e vírgula**. Isso tem que ser feito com toda variável antes de utilizá-la.

```c
tipo nome;
```

## Escopo: global × local

A variável pode ter dois escopos diferentes, duas áreas onde ela é válida:

- **Escopo global:** quando declaro a variável **fora** da função `main` (ou de qualquer outra função).
- **Escopo local:** quando declaro a variável **dentro** da função `main` (ou de outra função).

Vamos usar o exemplo do nosso "Hello World". Nessa área, depois das bibliotecas e antes da minha função `main`, repare que não estou dentro de nenhuma função: qualquer variável que eu declarar aqui será considerada **global**, e todas as funções conseguem vê-la. Já nessa área, dentro das chaves da função `main`, qualquer variável que eu colocar será **local**: a sua visibilidade é dentro dessa função.

Mas, nesse instante do curso, **não se preocupe muito com essas questões**. Quando chegarmos na aula sobre funções, a gente vai retomar esse assunto com mais profundidade. **Por agora, vamos sempre declarar as nossas variáveis dentro da função `main`.**

## Valor inicial: o "lixo"

Reparem: eu reservei, na memória RAM, uma caixinha. Será que essa variável tem alguma informação lá? "Ah, é zero, professor." **Não é zero.** Aquela caixinha, aquela posição de memória, sempre vai ter um valor: por exemplo, do último programa que usou aquela região de memória. Então ele vai ter um valor lá, que a gente chama de **lixo**: qualquer valor aleatório. **Você não tem nenhuma garantia.**

## Atribuição

Então, o que a gente vai fazer é **escrever** nessa memória. Antes, só reservamos espaço na memória RAM; agora, vamos escrever. O ato de escrever um valor em uma posição de memória tem o nome de **atribuição**: eu vou atribuir um valor àquela posição de memória. A atribuição permite fornecer um valor para uma variável. Isso, pessoal, sempre tem que ser **dentro da função**.

O valor que você atribui tem que ser **exatamente do tipo** que você declarou para a variável. E isso é feito através do operador de igual (`=`): eu estou **copiando um valor para uma variável**. Então, **do lado esquerdo vai sempre a variável** e, do lado direito, o valor que vai ser atribuído a ela:

```c
nome = valor;
```

Aqui, do lado direito, eu também posso ter uma **expressão** (na próxima aula a gente vai aprender a fazer continhas com os valores): ele vai pegar o resultado dessa expressão e salvar na minha variável.

**Declaração e atribuição.** Eu posso fazer separado: uma linha para declarar e outra para atribuir. Mas eu também posso **declarar e atribuir na mesma linha**. É possível, sim. Por exemplo:

```c
int idade = 0;
```

- `int`: é um valor do tipo inteiro que estou declarando;
- `idade`: o nome da variável;
- `=`: uma atribuição; agora estou escrevendo zero nessa posição de memória.

Então eu estou fazendo **dois comandos na mesma linha**: primeiro, falando para o computador "reserve uma caixinha para mim e dê o nome dessa caixinha de `idade`"; segundo, "nessa caixinha que você reservou, escreva o valor zero". Quando você escreve zero, vai apagar qualquer lixo, qualquer valor aleatório que tinha lá dentro dessa posição de memória. Inclusive, alguns autores recomendam, como **boa prática, sempre atribuir um valor inicial** para as suas variáveis, principalmente porque a gente está começando a programar.

## Os tipos de variáveis

Só tenho o tipo `int`, pessoal? Não: essa é só uma lista das variáveis que você tem disponíveis, e a lista é bem longa. A gente vai trabalhar, na disciplina, mais com **estas quatro**:

- **`char`:** uma **letra do teclado**. Ocupa **8 bits, que é 1 byte**. Lembra do computador em binário (0, 1, 0, 0, 0, 1...)? É a letrinha. Ele consegue salvar qualquer valor do teclado, da tabela ASCII: **256 valores diferentes**.
- **`int`:** número **inteiro**. Ocupa **32 bits, que são 4 bytes**. Com 4 bytes (2 elevado a 32), você consegue armazenar qualquer valor entre cerca de **menos 2 bilhões e 147 milhões** e **mais 2 bilhões e 147 milhões**. Os números inteiros são infinitos, mas **na memória do seu computador, não**: sempre vai ter um limite máximo.
- **`float`:** representa os **números reais** (de ponto flutuante). Se eu quero colocar o valor de um preço de produto, que tem centavos, não vou utilizar um `int`. Um `float` também ocupa **32 bits, 4 bytes**, na memória RAM. Nesse caso, não se fala de mínimo e máximo: o que importa é a **precisão**, ou seja, quantas casas decimais você consegue armazenar. O `float` consegue armazenar até **7 casas decimais** de precisão.
- **`double`:** às vezes 7 casas são muito pouco para a sua aplicação. O `double` é um `float` com **precisão dupla**: também é um número real, só que você consegue ter até **15 casas decimais** de precisão. Quando você trabalha, por exemplo, com computação científica, você não pode ter problema por arredondamento; é legal utilizar o `double`. Porém, lembre-se: ele ocupa **64 bits, que são 8 bytes**.

Eu preciso decorar toda essa lista? Não. Essa tabela eu tirei do livro, e ela está incompleta. A gente vai trabalhar mais com essas 4; caso você precise, pode consultar no slide ou no livro.

| Tipo | Representa | Tamanho | Observação |
|------|------------|---------|------------|
| `char` | uma letra do teclado | 8 bits (1 byte) | 256 valores (tabela ASCII) |
| `int` | número inteiro | 32 bits (4 bytes) | cerca de −2,147 bilhões a +2,147 bilhões |
| `float` | número real | 32 bits (4 bytes) | até 7 casas decimais |
| `double` | número real | 64 bits (8 bytes) | até 15 casas decimais |

### Exemplos de declaração com atribuição

- **Salário** (número real, com centavos): declaro uma variável do tipo real, `float`, com o nome `salario`, e já atribuo o valor [o valor do slide é "um real e 23 centavos", ou seja, 1.23; verificar]. **Cuidado:** na programação, **o ponto representa a casa decimal**; não se usa a vírgula [verificar: a justificativa dada no original, algo sobre "sistema imperial", é confusa].
- **Letra** (`char`): `char letra = 'a';`. O valor de um caractere tem que estar **sempre entre aspas simples**, porque, senão, o computador não saberia se você está copiando o valor da variável `a` para a variável `letra`, ou se você quer salvar a letra "a" dentro da variável `char`.
- **Idade:** é um número inteiro; ninguém fala "eu tenho 18,75 anos": ou você tem 18, ou você tem 19. Reparem que aqui há até um **modificador** (`short`): faz com que ocupe menos espaço. Faz sentido: ninguém vai ter 2 bilhões de anos. Então um `short int` é um inteiro que ocupa menos bytes na memória RAM, e estou só salvando o valor 22 [verificar: o original diz "32" e depois "22"].
- **Preço** com muitas casas decimais de precisão (mais do que 7): vou salvar como `double`. Por exemplo, 315 reais e 59 centavos.

```c
float salario = 1.23;        // valor ilustrativo [verificar]
char letra = 'a';
short int idade = 22;
double preco = 315.59;
```

## Regras e convenções

- **A linguagem C é *case sensitive*:** ela faz diferenciação entre maiúsculas e minúsculas. Por exemplo, se você criar a variável `preco` tudo em minúsculo, e outra com `R` maiúsculo, ou `Preco`, qualquer variante, para o computador são **duas posições de memória diferentes**.
- **Padronização (convenção, não é obrigatório):** para a gente não se perder, aqui na disciplina vamos trabalhar sempre com **nomes de variáveis todos em minúsculo**, agora no começo, para não ter problemas relacionados a isso.
- **Ponto e vírgula:** toda instrução de declaração e de atribuição **termina com ponto e vírgula**.
- **Ponto decimal:** para `float` e `double`, sempre vamos utilizar o **ponto** (e não a vírgula) para representar a parte decimal. [Trecho confuso no original, com um exemplo numérico que não pôde ser recuperado.]
- **Palavras reservadas:** posso dar qualquer nome à minha variável? Não: existem algumas palavras que são reservadas da linguagem, e você não pode utilizá-las. Por exemplo, para incluir uma biblioteca usamos a palavra `include`; então você não pode criar uma variável chamada `include`. Para finalizar a função, eu preciso dar um `return`; é um comando específico da linguagem e você não pode criar uma variável com o nome `return`. Tem uma tabelinha completa no slide, com todas as palavras reservadas. O importante, nesse momento, é saber que você não pode criar uma variável com nenhum desses nomes; se você pensar em nomes em português, não vai ter muito problema quanto a isso.

## Números muito grandes ou muito pequenos

Se o número for muito grande ou muito pequeno, como eu vou atribuí-lo? Por exemplo, a constante de Planck, da física: 6,62 vezes 10 elevado a menos 34. Nesse caso eu uso um `double` e a **notação científica**: o `e` representa "vezes 10 elevado a" [verificar: o original está confuso neste trecho].

```c
double planck = 6.62e-34;   // 6,62 × 10^-34
```

E se eu quiser salvar um número **maior** do que o limite do `int`, ou um número complexo? Nesse caso, existem **bibliotecas específicas** para isso. Nos padrões mais novos da linguagem, vocês vão ver que existem padrões para criar variáveis para números complexos e também para inteiros muito grandes. Você pode usar bibliotecas (o original cita duas, uma delas muito utilizada em criptografia [verificar nomes]) para salvar números realmente grandes, por exemplo, um número com centenas de algarismos. Isso é possível, mas você vai precisar de uma biblioteca específica. Legal?

## Exibindo variáveis com `printf`

Beleza: eu criei uma caixinha, atribuí um valor; como posso **exibir** esse valor? Com o `printf`. As duas primeiras linhas a gente já sabe: reserva uma caixinha e dá o nome de `idade`; atribui 18, ou seja, pega o valor 18 e escreve na caixinha `idade`. Agora, para exibir, lembra do nosso `printf` do "Hello World"? Agora ele vai ter um **marcador específico**.

Reparem esse **`%d`**: é o que a gente chama de **especificador de formato**. Estou dizendo que, **nessa posição**, eu quero que seja exibido o valor de uma variável do tipo inteiro. Então eu coloco, entre aspas, o texto e, na posição em que eu quero que o número seja exibido, coloco esse especificador de formato. Depois fecho as aspas, coloco uma **vírgula** e, em seguida, a variável do tipo inteiro. Qual? A variável `idade`. Ele vai pegar o valor da variável `idade` lá na memória RAM e exibir nessa posição da mensagem.

```c
printf("idade = %d", idade);   // mostra: idade = 18
```

**Especificadores:**

| Tipo | Especificador |
|------|---------------|
| inteiro | `%d` (de decimal) ou `%i` [o original transcreveu "porcentagem e"] |
| `float` | `%f` |
| `char` | `%c` |

Aqui, `%d`/`%i` especificam um inteiro na base 10.

## Na prática (no editor)

Aqui eu tenho o nosso programa, com a `main` meio vazia. Vamos criar uma variável. Estou dentro da `main`, então ela vai ser **local**. Declaro a variável `idade`: o tipo inteiro, espaço, o nome. Estou declarando a variável: ele vai reservar uma caixinha da memória RAM.

Agora um elemento novo: a **memória RAM é dividida em compartimentos, em caixinhas**, nas quais eu posso escrever e ler informações. Quando você escreve `int idade`, o computador reserva uma caixinha da memória RAM e dá o nome a essa caixinha, o identificador dela: `idade`. E qual valor está lá nesse instante? **Lixo.** Não tem nada garantido: pode ser qualquer valor, inclusive zero, mas não tem como garantir nada.

Como faço uma atribuição? O nome da variável, espaço, o sinal de igual, o valor que vou atribuir: no caso, 18. Quando passar por essa linha, ele vai fazer o quê? Falando como o computador: "Tem uma variável chamada `idade` na memória RAM? Tem. Escreve o valor 18 nela." Ele apaga qualquer lixo que tinha lá e escreve o valor 18.

Agora vou exibir esse valor: `printf`, "idade = ", e quero receber nessa posição o valor da variável `idade`. Qual é o tipo da variável? É um inteiro, então `%d` dentro das aspas e, fora das aspas, vírgula e `idade`. Deixo um `\n` no final para ir para a linha de baixo, caso eu continue esse programa depois.

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    int idade;
    idade = 18;
    printf("idade = %d\n", idade);

    return 0;
}
```

Quando o programa chega nessa linha do `printf`, ele fala: "Exiba essa mensagem na tela; quando chegar no `%d`, exiba um inteiro. Qual inteiro? O da variável `idade`. Tem uma variável chamada `idade` na memória? Tem. Quanto vale? 18." Ele pega o valor 18 e coloca onde está o `%d`. Executando: **idade = 18**. Então, nesse instante, a gente reservou espaço para a variável, escreveu o valor 18 e depois **leu** esse valor para exibir na tela. Tranquilo?

### Um exemplo com cada tipo

Agora vamos fazer um exemplo com cada um dos tipos que a gente aprendeu.

**Salário (`float`).** Salário tem centavos, então uso `float`. [Brincadeira do professor sobre o primeiro salário dos alunos quando formados; o valor exato citado no original está confuso e não pôde ser recuperado.] Para exibir, uso `%f`. Executando, ele mostra o valor com **6 casas decimais** por padrão (lembrando que o `float` tem 7 casas de precisão) [verificar: trecho confuso no original]. Se eu quiser **formatar**, coloco um `.2` no especificador: `%.2f`. Falando como o computador: "aqui é um `float` e exiba apenas 2 casas depois do ponto." Executando de novo: o valor aparece com 2 casas decimais, por exemplo, "... reais e 90 centavos".

**Letra (`char`).** Em que **bloco** a gente vai ter aula? Quero salvar "bloco A": é uma letra, um caractere. Então `char bloco;`, e atribuo o valor: lembra que o valor tem que estar **entre aspas simples** (`'A'`) [verificar: a letra]. Para exibir, uso `%c`.

**Vários valores em um único `printf`.** Posso usar um único `printf` para exibir esses três valores? Pode. Eu tenho três especificadores (`%d`, `%.2f` e `%c`), então preciso de **três variáveis**, separadas por vírgula, **na mesma ordem em que aparecem os especificadores**: o primeiro especificador é de um inteiro, a `idade`; o segundo, `%.2f`, é o `salario`; o terceiro, `%c`, é o `bloco`.

```c
int idade = 18;
float salario = 2500.90;   // valor ilustrativo [verificar]
char bloco = 'A';          // [verificar]

printf("Idade = %d, Salario = %.2f, Bloco = %c\n", idade, salario, bloco);
```

Rodando: a idade é 18, o salário aparece com 2 casas, e o bloco aparece como a letra. **Lembre-se sempre:** todos os especificadores que você colocar entre as aspas precisam das respectivas variáveis, separadas por vírgula e **na mesma ordem**.

## Material complementar do slide (não precisa decorar)

Deixei no slide alguns exemplos de tudo o que a gente conversou, inclusive exibindo várias variáveis em um `printf`. E também deixei uma **tabela mais completa de especificadores de tipo**, que vocês não precisam decorar, mas podem **consultar** sempre que precisarem. Ela inclui o `char`, o `short int`, o inteiro sem sinal, o inteiro longo etc. (está completa no livro). **Não tem que saber decorar; tem que saber que existe e onde consultar.**

**Bases numéricas.** Se você quiser atribuir o valor 18, normalmente é na **base 10**. Mas, caso você queira, pode atribuir um valor em **hexadecimal**, colocando `0x` na frente. Em **octal** (base 8), você coloca um `0` na frente. Também dá para atribuir em **binário**, colocando `0b` (ou `0B`) na frente [verificar]. Não precisa decorar; basta consultar o slide ou o livro depois.

**Variantes dos inteiros e sufixos.** Existem também as variantes dos inteiros: inteiro sem sinal (*unsigned*), inteiro longo (*long*), inteiro curto (*short*), inteiro longo sem sinal. Na hora de fazer a atribuição, basta colocar um **`U`** ou um **`L`** ao lado do número, como a tabela completa mostra. E, se for um número com casa decimal (por exemplo, `float` ou `double`), você coloca uma letra (como `F`) no final, como mostra o exemplo do slide [verificar].

Por exemplo: **`0x15FUL`**. O que isso representa? O `0x` está dizendo que o número está em **hexadecimal**; `15F` é o valor em hexadecimal (lembre que o hexadecimal usa os valores de 0 a 9 e de A a F); o `U` é de *unsigned* (**sem sinal**) e o `L` é de *long* (**longo**). Mas, por enquanto, não precisa se preocupar em decorar isso; eu deixei no slide mais para consulta.

**Formatação do `printf`.** O `printf` (o *f* é de *formatado*) tem diversas formatações, como o `%.2f` para mostrar duas casas decimais. Existe uma sequência de diversas formatações que você pode usar na hora de mostrar o seu código. Vale brincar com cada um desses tipos.

**`sizeof`: quantos bytes cada tipo ocupa.** No final, esses valores (quanto ocupa um `int`, um `char`, um `float`, um `long`, um `double`) **variam de computador para computador**. Como eu sei, no meu computador, quanto vale isso? Você pode utilizar a função **`sizeof`** [verificar: o original diz "tais de ó"]: você passa o **tipo** ou o **nome da variável** que quer saber o tamanho, e ela retorna um número inteiro que diz quantos bytes ocupa: por exemplo, "o `int` ocupa 4 bytes". No slide tem um exemplo de código e a saída de exemplo, **no computador do professor**, mostrando quanto ocupa cada um desses tipos.

## Constantes

Para finalizar: variável é uma caixinha de memória cujo valor pode ser trocado, **o valor varia**. Porém, às vezes é interessante criar uma **constante**: um valor que não muda. Você pode definir uma constante e proteger esse valor para que não seja alterado.

### `#define`

Lá no começo, junto com os `include` (pode ser depois dos `include`), você usa esta sintaxe: o `#` (cerquilha), a palavra `define`, espaço, o nome da sua constante, espaço, o valor. Por exemplo, o valor de π: faz sentido o usuário poder alterar o valor de π? Não, π é constante.

```c
#define PI 3.1416
```

Repare que, nesse caso, **não tem tipo, não tem sinal de igual e não tem ponto e vírgula**. Por quê? Porque, na verdade, ele **não é uma variável**: não vai criar uma caixinha na memória RAM. É o que a gente chama de **diretiva de pré-compilação**. O que ele faz? **Antes de compilar** o seu código, o compilador vai pegar e **substituir** tudo: onde a gente escrever `PI`, ele vai substituir pelo valor `3.1416`. Ou seja, não é uma posição de memória; é só uma **regrinha para o compilador**, aplicada na hora em que o seu código é compilado.

É bom porque **facilita a manutenção do código**: se você usa o mesmo valor em diversos lugares, pode usar uma constante. Também evita que alguém vá lá e queira trocar o valor de algo importante para você, como o π.

### `const`

Vocês também podem ver, no livro, outra forma: criar uma **variável definida como constante**, com `const`.

```c
const double PI = 3.1415;   // [verificar: 3.1415 ou 3.1416]
```

Repare que, nesse caso, é diferente: **não é uma definição de pré-compilação**; existe uma variável na memória RAM, só que ela é **protegida** para que você não altere o valor dela. Nesse slide tem um exemplo de como declarar e como exibir o valor de uma constante.

## Encerramento

É isso, pessoal. Eu vou deixar aqui para vocês alguns exercícios para que possam praticar. Finalizamos, então. Um grande abraço, bons estudos e até a próxima.

## Avisos da aula

Há exercícios no material da disciplina sobre variáveis. Nenhum prazo ou prova foi mencionado.
