# Aula 05 – Entrada de Dados

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor Atom na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

## Tópicos abordados

- Receber valores do usuário com o comando `scanf`
- Expressão de controle (`%d`, `%f`, `%c`) e o operador `&`
- Exemplo: ler a idade do usuário e exibi-la
- Como funciona na memória RAM: endereço de memória, `&` e `%p`
- Ler vários valores com um único `scanf` (exemplo: data dd/mm/aaaa)
- Problema do buffer do teclado ao ler `char` depois de números, e como resolver

## Glossário

- **`scanf`:** comando que lê informações do teclado e salva em um endereço de memória.
- **Expressão de controle:** primeiro argumento do `scanf`; define o formato do valor lido.
- **`%d`:** lê/exibe número inteiro.
- **`%f`:** lê/exibe número `float`.
- **`%c`:** lê/exibe um caractere.
- **`&` (e comercial):** operador que converte o nome de uma variável no seu endereço de memória.
- **Endereço de memória:** número que identifica a posição ("caixinha") onde a variável está salva na memória RAM; costuma ser exibido em hexadecimal.
- **`%p`:** marcador do `printf` para exibir um endereço de memória (ponteiro).
- **Lixo:** valor aleatório que existe numa variável declarada e ainda não preenchida; não é garantido que seja zero.
- **Buffer do teclado:** memória temporária onde ficam as teclas digitadas, inclusive o *enter*.
- **`stdin`:** *standard input*, a entrada padrão (teclado).
- **`setbuf`:** função usada para configurar o buffer; aqui, para esvaziar o buffer de entrada.

---

## Introdução

Olá, pessoal, eu sou o professor Muriel e nesta aula vamos aprender como **receber valores**. Até agora o nosso programa é capaz de armazenar informação na memória RAM, fazer conta com esses valores e gerar uma saída. Mas, até agora, todos os valores são fixos: não tem como o usuário fornecer informação para o sistema. E é isso que vamos aprender nesta aula.

Uma das maneiras possíveis de receber valores é através do comando **`scanf`**. Vamos pensar da seguinte maneira: ele vai ler as informações do teclado e salvar em um endereço de memória.

## Sintaxe do `scanf`

Entre parênteses, o `scanf` recebe **dois argumentos**:

1. O primeiro é uma **expressão de controle**, que vai formatar o tipo do valor que estou lendo.
2. O segundo, separado por vírgula, é o símbolo **`&`** (e comercial) seguido do **nome da variável destino**, onde eu vou salvar o valor.

Na expressão de controle, se eu quiser interpretar o que está sendo digitado como um número inteiro, uso `%d`; se eu quiser interpretar como `float`, uso `%f`; se eu quiser interpretar como um caractere, uso `%c` [verificar: o original transcreveu "porcentagem e", "porcentagem i"; usei `%d` como no restante da aula]. E no destino eu vou utilizar sempre o símbolo `&` seguido do nome da variável destino. Por exemplo: `%d` com `&` e o nome da minha variável inteira; `%f` com `&` e o nome da variável `float`; e assim por diante.

## Exemplo: ler a idade do usuário

Como ficaria se eu quiser receber a idade de um usuário e em seguida exibir essa informação? Eu declaro a variável `idade`, dou um `printf` para exibir o pedido para o usuário e, em seguida, o `scanf`. Reparem que esse `printf` não está fazendo nenhuma leitura de dados: ele é **apenas estético**, para que o usuário não se perca. O comando que está fazendo a leitura é o `scanf`, com `%d`, porque o valor que estou lendo é um valor inteiro, vírgula, `&idade`. Ele vai pegar o valor que está vindo do teclado, interpretar como um valor inteiro e salvar no endereço de memória onde a variável `idade` está salva. Fiquem tranquilos: a gente vai conversar sobre esse endereço de memória. Em seguida, ele vai exibir "você tem tantos anos".

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    int idade;

    printf("Digite sua idade: ");
    scanf("%d", &idade);
    printf("Você tem %d anos\n", idade);

    return 0;
}
```

Vamos ver na prática como funciona. Aqui nós temos a função `main`, e dentro dela apenas declaramos a variável `idade` e solicitamos a idade para o usuário. Esse `printf` é apenas estético. Quem vai fazer a leitura de dados é a função `scanf`. Entre parênteses, dois argumentos: o primeiro, qual é o tipo de variável que estou lendo? É um inteiro, então `%d`; o segundo, onde eu vou salvar? Na variável destino, a variável `idade`: `&idade`.

Quando o programa chegar nessa linha, **ele vai parar e esperar o usuário digitar a informação**. Ele não vai continuar executando nada enquanto o usuário não digitar o valor e pressionar *enter*. Assim que ele fizer isso, posso mandar o `printf` "você tem `%d` anos". Qual é o valor que estou exibindo? A idade: ele vai pegar o valor que o usuário acabou de digitar e inserir na mensagem. Vamos executar para ver: F6, o programa pede a idade, digito 35 e aparece "você tem 35 anos" [trecho confuso no original].

## Como isso funciona na memória RAM

Vou pedir ajuda para a nossa memória RAM. Quando eu chego na linha 11 [declaração da variável], ele fala, como o computador: "reserve uma caixinha lá na memória RAM". [Trecho inaudível?: "vai ter 14"]. Essa caixinha vai ser sempre relacionada com a variável `idade`. Aqui o usuário vai digitar o valor: o que o usuário digita no teclado vai ser interpretado como um número inteiro e salvo no endereço de memória da variável `idade`. Onde está a idade? Está aqui. Então, por exemplo, se o usuário digitou 18, ele vai lá na memória RAM e escreve o valor 18. Em seguida, no `printf` "você tem `%d` anos", ele vai exibir o valor da idade: vai na memória RAM, a idade vale 18, pega esse 18 que o usuário acabou de escrever e exibe na tela. Ok?

## De onde vem o `&` (endereço de memória)

Mas de onde vem esse `&`? Pessoal, toda variável tem associado a ela um **endereço de memória**. Cada posição da memória RAM é numerada: um, dois, três, quatro, cinco, seis, sete... mas, como são milhões, a gente costuma exibir esses valores em **hexadecimal**. Quando você pede para reservar memória, cada variável vai ter o seu endereço de memória: quando eu falo "a variável `idade`", ele sabe que ela está no endereço 25, por exemplo, ou no endereço 48. Cada caixinha tem o seu próprio endereço.

Então, a função `scanf`, na verdade, **não recebe o nome da variável: ela recebe o endereço de memória onde aquela variável está salva**. Como eu faço para converter `idade` no endereço de memória onde a idade está salva? Eu uso o operador `&` (e comercial).

## Exibindo o endereço de memória

Vamos olhar outro código, um exemplo que vai mostrar o endereço de memória. Eu reservei a caixinha de memória chamada `idade`. Eu posso exibir esse endereço? Pode: com o `&`, ele converte o nome da variável no endereço onde ela está salva. Aqui estou mandando o computador exibir na tela o endereço de memória da variável `idade`; para exibir, uso o `%p`, de ponteiro [verificar]. E aqui estou mostrando o valor da idade, o valor salvo na caixinha `idade`. Nesse instante eu tenho um valor lá? Sim, mas qual valor? **Lixo**, lembra? Eu não tenho garantia de que vai ser zero. Depois eu recebo o valor, e então mostro de novo o endereço de memória e o novo valor armazenado.

```c
int idade;
printf("Endereço: %p\n", &idade);
printf("Valor: %d\n", idade);      // lixo
printf("Digite a idade: ");
scanf("%d", &idade);
printf("Endereço: %p\n", &idade);  // o mesmo endereço
printf("Valor: %d\n", idade);      // o valor digitado
```

Vamos executar, F6. O endereço de memória aparece em hexadecimal: a variável `idade` está nesse endereço, esse é o número da caixinha dela, e o valor que está lá é 32.1667 [verificar: número do lixo, truncado no original]. Isso é o nosso lixo, lembra? Eu falei que tem um lixo lá. Agora vou digitar a idade: 18, enter. Repare: o endereço de memória é o mesmo; a caixinha continua sempre igual. O que mudou é o valor que está lá dentro.

Resumindo como funciona: quando eu declaro a variável `idade`, ele vai à memória RAM e reserva a caixinha; esse endereço de memória fica associado a essa variável, e o valor que tem nesse momento é lixo, qualquer valor aleatório. Depois ele mostra o endereço e mostra a idade (o lixo). Em seguida eu peço a idade: o valor que o usuário digitar, ele lê do teclado, interpreta como um número e salva no endereço de memória onde a variável `idade` está salva. O `&` transforma `idade` no endereço de memória, e ele salva nessa posição, por exemplo, 18. Em seguida, ao exibir o endereço de novo, repare que ele continuou exatamente igual; e depois mostra a idade, que agora vale 18: o valor daquela posição de memória foi alterado.

## Lendo vários valores com um único `scanf`

Voltando ao slide: posso utilizar o `scanf` para ler vários valores, ou um comando `scanf` lê apenas um valor? Eu posso utilizar para ler vários. Como funciona: eu coloco, na expressão de controle, os especificadores de tipo de todas as variáveis que eu quero que ele leia; e depois, nos destinos, coloco todos os destinos separados por vírgula, **na mesma ordem em que eles aparecem**. É muito parecido com quando eu quero exibir várias variáveis dentro do mesmo `printf`, não é?

Vamos ver no código. Declaro três variáveis: `dia`, `mes` e `ano`. Posso declarar as três na mesma linha? Pode, não tem problema nenhum, se eu separar por vírgula, mas cuidado para não se perder; não é muito recomendável para quem está começando. Depois mostro um `printf`, e aqui eu quero que ele digite o dia, barra, o mês, barra, o ano. Eu quero pegar os três valores inteiros (dia, mês e ano) separados por barra. Como fica o `scanf`? O formato para receber é: um número inteiro, que vai ser o dia; depois uma barra; depois outro número inteiro, o mês; depois outra barra; depois outro `%d` [verificar: o original diz "%i"], o ano. Depois vírgula, e agora os destinos: o primeiro `%d` eu salvo no endereço de memória onde está o dia; vírgula, o segundo `%d` no endereço de memória onde está o mês; vírgula, o terceiro no endereço de memória onde está o ano. Coloco todos os destinos com o `&` antes de cada um, na mesma ordem em que eles aparecem. Em seguida estou exibindo essas três variáveis. Digitando a data 1/1/2021 [trecho confuso no original], ele pegou os três valores separados por barra.

```c
int dia, mes, ano;

printf("Digite a data (dd/mm/aaaa): ");
scanf("%d/%d/%d", &dia, &mes, &ano);
printf("Data: %d/%d/%d\n", dia, mes, ano);
```

## Problema do buffer do teclado

Para finalizar a aula de hoje, vamos ver um problema que é muito comum: **problemas com buffer de teclado**. Como assim, professor? Olhando para esse código: declarei uma letra (`char`) e dois números inteiros, e estou fazendo três `printf`. A princípio não tem nenhum erro de sintaxe, os tipos estão perfeitos. Porém ele vai fazer a leitura de um número, depois de uma letra (um `char`) e depois de outro número.

```c
char letra;
int num1, num2;

printf("Digite um número: ");
scanf("%d", &num1);
printf("Digite uma letra: ");
scanf("%c", &letra);
printf("Digite outro número: ");
scanf("%d", &num2);
```

Quando eu rodo, olha o que acontece: "digite um número", por exemplo 15, enter. Reparem que **ele não parou para eu digitar a letra**: foi direto para o segundo número e pulou o `char`. Por que isso aconteceu? Porque, para digitar o 15, depois do 15 eu digitei o quê? Um *enter*. O computador pega o 15 e salva na primeira variável [trecho confuso no original]. Só que o *enter* que eu digitei **ficou na memória temporária do teclado, que a gente chama de buffer**. Esse *enter*, no fundo, é um caractere, só que invisível. Então, quando chega no `scanf` do `char`, o computador pega o que tem do teclado, interpreta como um caractere e salva em `letra`: quem ele está pegando? O *enter*. Ele acha que o usuário digitou o *enter* como valor e salva o *enter* no endereço de memória de `letra`, porque o *enter* é um caractere, e depois segue direto para o "digite o número 2".

**Tem como resolver? Tem.** Eu posso limpar o buffer do teclado, para que, quando ele chegar no segundo `scanf`, esse erro não ocorra. O que eu tenho que fazer é, antes do meu próximo `scanf`, dar um comando para limpar esse buffer. Uma das possibilidades é o `setbuf`: estou configurando o buffer da entrada padrão (`stdin`, *standard input*), e o valor que eu coloco nele é `NULL` (nulo), ou seja, o buffer fica vazio [verificar: o original transcreveu "set buffer, STD, no luo"].

```c
printf("Digite um número: ");
scanf("%d", &num1);
setbuf(stdin, NULL);   // limpa o buffer do teclado
printf("Digite uma letra: ");
scanf("%c", &letra);
```

Vamos executar agora: digite o número, 15, enter; e agora ele parou. Digite uma letra; digite outro número, 18. Agora vai funcionar. Esse problema normalmente acontece quando você lê um `int` ou um `float` e, logo em seguida, precisa ler um caractere ou uma sequência de caracteres. [Trecho confuso no original.]

## Encerramento

No slide tem a explicação para você consultar e, para vocês praticarem, temos também alguns exercícios, ok? É isso, pessoal. Bons estudos, um grande abraço e até a próxima!

## Avisos da aula

Há exercícios no material da disciplina para praticar o conteúdo desta aula (`scanf`). Nenhum prazo ou prova foi mencionado.
