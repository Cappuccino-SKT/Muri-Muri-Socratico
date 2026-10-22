# Aula 04 – Operadores Aritméticos

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Burial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor Atom na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

## Tópicos abordados

- Operadores aritméticos (soma, subtração, multiplicação, divisão) e tipos dos resultados
- Como a atribuição é executada: direita primeiro, depois esquerda
- Execução do programa passo a passo (variáveis como "caixinhas" na memória RAM)
- Divisão inteira e o operador de resto `%`
- Divisão com `float`, `%f` e conversão de tipo (*cast*)
- Incremento (`++`) e decremento (`--`); pré-incremento × pós-incremento
- Precedência de operadores e uso de parênteses

## Glossário

- **Operador aritmético:** símbolo para fazer conta com valores de variáveis (`+`, `-`, `*`, `/`, `%`).
- **Atribuição (`=`):** a expressão do lado direito é resolvida primeiro e o resultado é salvo na variável do lado esquerdo.
- **Expressão:** conta ou combinação de valores e variáveis que o computador resolve.
- **Divisão inteira:** divisão entre dois inteiros; o resultado é a parte inteira (10 / 3 = 3).
- **Resto da divisão (`%`):** em C, o símbolo `%` retorna o resto da divisão; não tem relação com porcentagem.
- **Tipo mais abrangente:** em operações com tipos misturados, o resultado é do tipo mais abrangente (`float`, porque os inteiros são um subconjunto dos reais).
- **Cast (`(float)`):** conversão de tipo na hora da conta, escrita entre parênteses antes da variável.
- **Incremento (`++`):** soma uma unidade à variável.
- **Decremento (`--`):** subtrai uma unidade da variável.
- **Pré-incremento (`++x`):** incrementa primeiro, depois usa o valor.
- **Pós-incremento (`x++`):** usa o valor primeiro, depois incrementa.
- **Precedência de operadores:** a ordem em que as operações são resolvidas.
- **Lixo:** valor indeterminado de uma variável declarada e ainda não preenchida.
- **`%d`, `%f`:** marcadores do `printf` para exibir inteiro e `float`, respectivamente.

---

## Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos estudar os **operadores aritméticos**. Na aula passada aprendemos a criar variáveis, entrar com valores e exibir esses valores, mas ainda não sabemos como fazer conta com esses valores, e é isso que a gente vai aprender.

Para isso vamos utilizar os mesmos operadores aritméticos que nós temos na matemática: soma, subtração, multiplicação e divisão, que são os mais comuns. Você pode utilizá-los para fazer conta com os valores que estão lá nas variáveis, na memória RAM. Você deve utilizá-los para fazer operações com variáveis do **mesmo tipo**: se você somar dois inteiros, a resposta vai ser um inteiro; com dois floats, a resposta vai ser um float. E se você misturar inteiro e float, a resposta vai ser um float, um número real, que é o tipo mais abrangente. Temos também o resto da divisão e os operadores de pré e pós-incremento, que a gente vai ver na sequência.

**Como a atribuição funciona.** [O professor mostra exemplos em um slide; trecho confuso no original, verificar.] Ele faz a conta primeiro: 10 mais 2, 12, e salva o 12. Depois, para algo como "`x` recebe `a - 3`": ele vai lá na memória RAM ver quanto vale `a`; vamos supor 10; traz para cá, 10 menos 3, 7; salva 7 aqui. Então ele **sempre resolve o que está na expressão do lado direito e depois salva no lado esquerdo**.

## Somando dois valores (na prática, no Atom)

Vamos para a prática. Vou abrir o nosso Atom e aqui eu quero somar dois valores. Vou criar `int a = 10;`. Aqui estou criando (declarando) a variável e atribuindo o valor na mesma linha. Depois, `int b = 3;`. Criei minhas duas variáveis, e eu vou ter que salvar o resultado em algum lugar, então vou criar outra variável, `int resultado;`, em que ainda não vou salvar nada. Agora vou fazer a conta: `resultado = a + b;`. E agora posso exibir. Como eu exibo a variável `resultado`? Com o `printf`. Qual é o tipo da variável `resultado`? É um inteiro, então `%d` dentro das aspas e, fora das aspas, vírgula e `resultado`. Vou colocar um `\n` para ficar esteticamente mais certinho. Vou executar com F6 e repare: resultado igual a 13 [verificar: o original diz "3"].

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    int a = 10;
    int b = 3;
    int resultado;

    resultado = a + b;
    printf("Resultado = %d\n", resultado);

    return 0;
}
```

## Como o computador executa o programa, passo a passo

Vamos entender como esse programa foi executado. Quando o computador vai executar o programa, sempre, pessoal, ele vai executar passo a passo a minha receitinha de bolo, **linha por linha**. E o programa sempre começa pela função `main`: ele vai procurar a `main` e começar a executar.

- `int a = 10;` significa: "Computador, reserve uma caixinha de tamanho inteiro e chame-a de `a`, e salve nela o valor 10."
- Linha 6: "Computador, reserve uma caixinha e chame-a de `b`, e salve nela o valor 3."
- "Computador, reserve uma caixinha chamada `resultado` e não salve nada." O que vai ter nesse instante na variável `resultado`? **Lixo**. Ok.

Quando chegar na linha da conta, repare: temos uma **atribuição**, o símbolo de igual. Aqui a gente tem uma **expressão**: ele vai resolver essa conta e depois salvar na variável `resultado`. Falando como o computador: "Tem uma variável chamada `a`? Vê quanto vale: 10. Traz o 10 para cá. Tem uma variável chamada `b`? Vê quanto vale: 3. Faz a conta: 10 mais 3, terminou, o resultado é 13. Pega 13 e salva na variável `resultado`."

Depois eu dou o `printf`. Falando como o computador: "Exiba a palavra 'resultado' e depois exiba um número inteiro." Qual número inteiro? O que está na variável `resultado`. O computador tem alguma variável `resultado`? Tem. Quanto vale? 13. Pega o 13 e exibe [verificar: o original diz "salva"]. Repare que o valor foi trocado de lixo para 13. Assim que eu termino essa conta, faço a atribuição do valor, e esse valor é salvo na memória RAM.

## Subtração, multiplicação e divisão inteira

Brincando um pouquinho aqui: `a - b` é 10 menos 3, 7. `a * b` é 10 vezes 3, 30. `a / b`: 10 dividido por 3 dá... 3. Ué, como assim? 10 dividido por 3 é 3? Está errado? Não, porque aqui a operação é **inteira**: a aritmética é feita a partir de números inteiros, então 10 dividido por 3 é 3. Lembra da conta com criancinhas: eu tenho 10 criancinhas e vou dividir em 3 grupos. Dá 3 criancinhas em cada grupo, e sobra uma criancinha que vai ficar sem grupo. Isso é o **resto**.

Esse resto, tem como eu pegar? Tem. Lembra que existe um operador, o símbolo de porcentagem (`%`)? Repare que na computação, na linguagem C, esse símbolo que a gente normalmente usa para porcentagem quer dizer **o resto da divisão**. Não tem nada a ver com cálculo percentual. Então eu falo ao computador: divida `a` por `b` e salve o resto da divisão de `a` por `b` na variável `resultado`. Qual é o resto da divisão de 10 por 3? O quociente é 3 e o resto é 1. Então, se eu executar, o resultado é 1. É o meu resto.

```c
resultado = a % b;   // resto da divisão de a por b (10 % 3 = 1)
```

## Divisão com `float` e `%f`

E se eu quiser 3,33? Para isso o resultado não pode ser `int`: tem que ser `float`. E, para exibir um `float`, tem que ser `%f`. Deixo duas casas decimais [`%.2f`, verificar: trecho confuso no original]. Então, beleza: dividi 10 por 3 e salvei o resultado em um `float`.

```c
float resultado;
resultado = a / b;
printf("Resultado = %.2f\n", resultado);
```

Agora eu vou conseguir 3,33? Não: dá 3,00. Agora a gente está trabalhando com `float`, então por que deu 3,00? Lembra que eu falei para vocês que o processamento dessa linha é feito em **duas etapas**: primeiro ele divide `a` por `b`, e depois ele salva o resultado na variável `resultado`. `a` é inteiro e `b` é inteiro, então 10 dividido por 3 dá 3 (a parte inteira). Depois que ele pegou esse 3, ele vai salvar na variável `resultado`, que vai ficar 3,00.

**Para obter 3,33**, uma das duas variáveis tem que ser `float`, porque eu estou fazendo uma mistura de tipos na mesma conta, e o resultado vai ser do tipo mais abrangente, nesse caso o `float`, porque os números inteiros são um subconjunto dos números reais. Posso, por exemplo, declarar a variável `b` como `float`. Agora sim: estou dividindo um inteiro por um float, e quando divido um inteiro por um float, dá um float: 3,33.

[Trecho confuso no original: o professor comenta que mudar o tipo da variável nem sempre é o desejado, pois ela pode representar uma quantidade que não faria sentido como número real.] Tem como fazer essa conta considerando que um deles é `float`? Tem, olha só. Mantenho `b` como `int` e, antes do nome da variável `a`, coloco `float` entre parênteses. Isso faz a conta considerando que a variável `a` é um `float`, um número real. Quando for dividir um `float` por um inteiro, um real por um inteiro, a resposta vai ser real, vai ser `float`. Vamos ver: 3,33. O nome dessa técnica é **cast** [verificar: o original diz "John de Best"], a conversão de tipo. Tranquilo até aqui?

```c
resultado = (float) a / b;   // cast: a é tratado como float na conta
```

## Incremento e decremento

Vocês devem ter visto também a questão dos **pré-incrementos** e **pós-incrementos**. O que é incrementar? Somar um, ou somar outro valor que você precisa. É muito comum, na computação, fazer uma contagem. Vamos criar aqui uma variável chamada `contador` com valor zero e um `printf` para exibir o valor dela. Estou contando e-mails que vou receber, contando arquivos... é muito comum: o computador vai contando 1, 2, 3, 4, 5, 6. Como quando eu conto nos dedos: virou um, 1; virou dois, 2; virou três... Eu tenho que somar um, sempre.

Como eu faço o computador somar um? Alguma ideia? O contador recebe o valor dele mais um: `contador = contador + 1;`. O contador vale 1? Não: independente do valor que ele tiver, ele vai ser incrementado. Quanto o contador valia antes? Mais uma unidade. Posso colocar `contador` dos dois lados da igualdade? Pode. Ele vai resolver a expressão que está do lado de cá e depois fazer a atribuição.

Então, o contador vale zero; zero mais um. Ele faz primeiro a conta, 0 + 1, e depois atribui. Repeti o mesmo `printf` aqui embaixo: ele é idêntico, só que nesse instante do código o meu contador vale zero antes e vale um depois. Vamos duplicar: `contador = contador + 1;` de novo. Então vale zero mais um, um: mostro um. Um mais um dá dois: mostro dois. Agora, na linha 11, ele vale dois. Dois mais um, três. Cada vez que eu faço `contador = contador + 1`, ele incrementa, soma uma unidade no meu contador.

```c
int contador = 0;
printf("%d\n", contador);   // 0
contador = contador + 1;
printf("%d\n", contador);   // 1
contador = contador + 1;
printf("%d\n", contador);   // 2
```

É tão comum somar uma unidade que existe uma técnica para isso, chamada **incremento**: `contador++;`. Essa linha (linha 8) faz exatamente a mesma coisa que a linha 7. `contador++` é apenas uma maneira abreviada de escrever `contador = contador + 1`. Vou apagar a outra aqui para vocês verem: ele faz exatamente a mesma coisa. Sempre que vocês virem `++` no código, `contador++`, vocês têm que ler como: "o valor do contador vai receber o valor que ele valia antes, mais uma unidade".

Da mesma maneira existe o **decremento**, que é subtrair um valor, para fazer contagens regressivas: 10, 9, 8, 7... Como seria? O contador começa em 10 e eu faço `contador = contador - 1;`. 10 menos 1, 9; 9 menos 1, 8; 8 menos 1, 7. Executando: 10, 9, 8, 7. E, como isso também é muito comum, existe a maneira abreviada, o decremento: `contador--;`. Sempre que vocês virem `--`, ele está dizendo que essa variável recebe o valor que ela valia antes menos uma unidade. É muito comum na computação, tanto contagens progressivas quanto regressivas.

```c
contador--;   // mesmo que contador = contador - 1;
```

## Pré-incremento × pós-incremento

Eu posso misturar o incremento com uma atribuição. Olhem esse exemplo: a variável `contador` vale 10, a variável `saida` não tem nenhum valor, e embaixo tem a exibição dos dois valores. O que acontece com `saida = contador++;`? Repare que tenho duas instruções: estou falando para o contador incrementar (somar uma unidade) e, também, para ele copiar o valor do contador para a saída. A questão é: qual ele vai fazer primeiro? Primeiro copiar o valor para a saída e depois incrementar o contador, ou primeiro incrementar o contador e depois copiar o valor para a saída?

Esse caso é o **pós-incremento**: ele incrementa *depois*, repare que o `++` está depois da variável. Primeiro ele copia o valor do contador para a saída: nesse instante o contador vale 10, então copio 10 para a saída. Depois ele faz o `contador++`, e o contador vai de 10 para 11. Então **`saida` vale 10 e `contador` vale 11**.

Também podemos ter o caso oposto: `saida = ++contador;`. Esse é o **pré-incremento**. Aqui primeiro ele incrementa o contador e depois gera a saída. Chegou aqui, o contador vale 10. Primeiro ele incrementa o valor para 11 e depois copia 11 para a saída. Nesse caso, o contador vale 11 e a saída vale 11 [verificar: o original diz "1"].

```c
int contador = 10;
int saida;

saida = contador++;   // pós: saida = 10, contador = 11
// saida = ++contador;   // pré: saida = 11, contador = 11
```

## Precedência de operadores

Temos um último caso: uma variável `resultado`, e aqui eu estou exibindo o valor dela. Qual seria a saída se eu executar esse código? [Aqui, pessoal, você pode escrever a expressão que quiser, sem problema nenhum.] Alguns podem falar que o resultado é 64, outros vão falar que é 43. Reparem, pessoal: o computador é burro, mas ele sabe matemática. Na matemática eu faço primeiro as operações de multiplicação e divisão, depois soma e subtração. Então ele vai primeiro multiplicar 5 vezes 8, 40, mais 3, 43. E na matemática, se eu quisesse forçar a fazer o 3 mais 5 primeiro, eu faria o quê? Colocaria entre parênteses. Aqui é a mesma coisa: 3 mais 5 entre parênteses. Ele vai fazer primeiro o que está entre parênteses para depois multiplicar pelo outro: 3 mais 5, 8, vezes 8, 64.

```c
resultado = 3 + 5 * 8;     // 43
resultado = (3 + 5) * 8;   // 64
```

[Expressões reconstruídas a partir dos números citados; verificar.]

Então você pode construir a fórmula que você quiser aqui. Ele vai resolver continha por continha, até terminar o resultado da expressão, trabalhando com resultados parciais, e sempre vai seguir as regras da matemática. Vamos dar uma olhadinha na revisão:

1. Primeiro ele resolve as expressões que estão **entre parênteses**. Se você tiver parênteses dentro de parênteses, sempre os parênteses mais internos primeiro.
2. Depois ele faz as operações de **multiplicação e divisão**. Se houver várias, sempre da esquerda para a direita.
3. Depois, todas as operações de **soma e subtração**, também da esquerda para a direita.

Usando essas regras, você pode resolver qualquer um desses testes da internet, "de Einstein, que apenas gênios conseguem resolver". É bem tranquila essa parte da matemática, que se chama **precedência de operadores**: qual operador vem antes de qual operador, qual operação você faz primeiro.

Vamos olhar um exemplo em slide. [A expressão do slide não aparece na transcrição; pela descrição do professor, algo como uma divisão entre dois produtos de variáveis com somas entre parênteses, guardando o resultado em `p1` – verificar.] Quem você vai resolver primeiro? Os parênteses mais internos: primeiro `c + d`, depois `e + f`, indo da esquerda para a direita. Depois ele faz `a` vezes o resultado de `c + d`, e `b` vezes o resultado de `e + f`. Depois ele divide o resultado da primeira parte pelo resultado da segunda parte. E, tendo esse resultado, ele guarda em `p1`. No slide você tem o passo a passo.

## Voltando ao algoritmo da primeira aula

Agora a gente consegue fazer aquele algoritmo que a gente tinha na primeira aula: pegar os valores, somar e mostrar o resultado. Declaro as três variáveis [trecho confuso no original, algo sobre variável global], atribuo os valores também e mostro a saída. A gente consegue fazer, então, aquele exemplo lá da primeira aula.

## Encerramento

É isso, pessoal. No material, tenho alguns exercícios para vocês trabalharem esse conteúdo. Bons estudos, um grande abraço e até a próxima.

## Avisos da aula

No material da disciplina há exercícios sobre este conteúdo (operadores aritméticos). Nenhum prazo ou prova foi mencionado.
