# Aula 08 – Estrutura de Repetição `while`

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Moriel"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

## Tópicos abordados

- Por que usar estruturas de repetição (laços)
- Funcionamento e sintaxe do `while`
- Exemplo: contar de 0 até um limite
- Cuidado com laços infinitos (e *overflow*)
- Laço com número de repetições conhecido × desconhecido
- Variável **contador** (contar quantas vezes uma condição acontece)
- Variável **acumulador** (somar valores ao longo das repetições)

## Glossário

- **Estrutura de repetição / laço (*loop*):** estrutura que repete um bloco de comandos.
- **`while`:** "enquanto"; testa a condição **antes** de cada repetição; se verdadeira, executa o bloco e volta a testar; se falsa, sai do laço.
- **Laço infinito:** laço cuja condição nunca fica falsa; é obrigação do programador garantir que o laço termine.
- **Overflow:** quando um inteiro ultrapassa o limite do tipo (cerca de 2 bilhões para `int`) e passa a valores negativos.
- **Erro lógico:** o programa compila e roda, mas não faz o que deveria.
- **Variável contador:** variável que conta quantas vezes uma condição acontece; deve ser inicializada.
- **Variável acumulador:** variável que acumula, a cada repetição, uma parte do resultado (por exemplo, uma soma).
- **Inicializar:** atribuir um valor inicial a uma variável; caso contrário ela começa com lixo.
- **Número par:** número cujo resto da divisão por 2 é zero (`i % 2 == 0`).

---

## Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos conversar sobre a estrutura de repetição **`while`**.

Até agora, o nosso programa executava a partir da `main`, linha por linha, e cada linha era executada uma única vez. Porém, em alguns casos eu posso querer que um comando ou um comportamento do meu programa seja **repetido diversas vezes**. Nesse caso vou utilizar as estruturas de repetição: quando eu quero repetir um comportamento diversas vezes, escrevo esse comportamento **uma vez só** e mando executar quantas vezes eu quiser. E essas repetições podem ser **controladas por uma condição**.

**Cuidado:** você não pode deixar elas repetirem infinitamente. É sua obrigação, como programador, garantir que o laço acabe; caso contrário, ele fica rodando infinitamente.

## Como o `while` funciona

A estrutura `while` verifica, **no começo do laço**, uma condição: verdadeira ou falsa. Se for verdadeira, executa todo o conjunto de comandos que estiver embaixo dela, volta e testa novamente. Se for verdadeira, executa, volta, testa, volta, executa, testa. Então eu posso pensar no laço como o seguinte mecanismo: **enquanto a minha condição for verdadeira, executa o bloco do laço; caso contrário, sai do laço.**

## Sintaxe

Eu coloco a palavra `while`, que em inglês quer dizer "enquanto"; entre parênteses, a condição (nesse caso utilizo as mesmas regras que a gente utilizava na condicional do `if`). Em seguida, coloco o meu bloco de repetição. Todas as instruções que estiverem no bloco vão ser repetidas **enquanto essa minha condição for verdadeira**.

```c
while (condição) {
    // instruções repetidas enquanto a condição for verdadeira
}
```

## Exemplo: mostrar valores de 0 até 5

Vamos supor que eu queira mostrar o valor de uma variável `i`, de zero até 5. Na `main`, declaro a variável inteira, atribuo o valor zero e depois chego no `while` e testo.

```c
int i = 0;

while (i <= 5) {
    printf("%d\n", i);
    i++;
}
```

Passo a passo:

- `i` vale 0. Testa: 0 é menor ou igual a 5? Verdade [verificar: no início da explicação o original diz "menor que 5", mas o final mostra "menor ou igual a 5"]. Executa o que está dentro: mostro 0 e atualizo o valor (`i++`), que agora vale 0 + 1, ou seja, 1. Terminou o bloco, volta e testa de novo.
- 1 é menor ou igual a 5? Verdade. Mostro 1, atualizo para 2. Testa de novo.
- 2 é menor ou igual a 5, mostro 2, atualizo. 3 é menor ou igual a 5, mostro 3, atualizo. 4, mostro, atualizo. 5 é menor ou igual a 5, mostro 5, atualizo para 6.
- 6 é menor ou igual a 5? **Falso.**

Então repare: no momento em que a minha condição fica falsa, ele **não executa o que está dentro do bloco e sai**. Depois ele continua com o que vem depois do laço e, se não tiver mais nada, encerra o programa.

## Na prática: contador e a velocidade do computador

Vamos dar uma olhadinha no código para ver como fica essa estrutura. Repare que eu também tenho um **contador** que conta quantas vezes o meu laço está repetindo. Comecei o contador em zero e vou repetir enquanto o contador for menor ou igual a 10: mostro o valor e incremento. Então vou mostrar todos os números de 0 a 10. Executando: mostrou todos os números de 0 a 10, rapidamente.

Agora vou mudar o limite para 10 mil, depois para 1 milhão, 100 milhões [verificar: números citados de forma confusa no original]. Repare como o computador é tão rápido que mal dá para acompanhar a contagem na tela: 1 milhão, 2 milhões, 3 milhões, 4 milhões... Ele é bom, mas lembre: ele é rápido. Ele vai ficar repetindo aquele código 10 milhões de vezes. O cuidado é **garantir que esse laço acabe**.

## Cuidado: laço infinito

Por exemplo, se eu faço isso aqui [laço com contador começando em zero e condição "contador maior ou igual a zero", incrementando a cada volta – verificar], quantas vezes esse laço vai repetir? Zero? Duas? Um milhão? Dez milhões? Infinitas? Repare: esse meu programa aqui está **em loop**, ele nunca vai finalizar. Na verdade, ele só vai finalizar quando chegar no maior valor inteiro, o limite dos inteiros, que é cerca de 2 bilhões. Ao somar mais um, ocorre o ***overflow***: o valor passa para cerca de menos 2 bilhões, e nesse caso menos 2 bilhões é menor que zero, a condição fica falsa e ele sai. Será um **erro lógico**: esse é um código que está em loop.

Posso pensar no caso oposto: enquanto o contador for **maior que zero** [contador começando em zero – verificar]. Quantas vezes o meu programa executa? Nenhuma, nem uma vez, porque a condição já é falsa no primeiro teste. Então, cuidado com a sua condição.

## Número de repetições conhecido × desconhecido

Reparem que, nesses exemplos, **eu sei quantas vezes o meu laço vai repetir**, olhando para o valor inicial do contador e para a condição [trecho confuso no original, algo como "de 0 a 9"].

Porém, nem sempre eu vou saber. Olha lá um exemplo: "*Faça um programa que leia e mostre os números digitados pelo usuário enquanto o valor for diferente de zero.*" Eu sei quantas vezes vai repetir? Não: depende de uma **condição externa**, ou seja, não depende da lógica do programa. Pode ser que o primeiro valor seja zero e o programa saia logo; pode ser que o usuário digite duas vezes valores diferentes de zero e depois zero; pode ser que ele digite infinitamente valores diferentes de zero. Então, repare que esse laço **não depende de um contador**.

[Trecho confuso no original: o professor comenta o valor inicial da variável, que de início teria lixo, e a necessidade de ler um valor antes do primeiro teste.]

```c
int valor;

printf("Digite um valor: ");
scanf("%d", &valor);

while (valor != 0) {
    printf("Valor: %d\n", valor);
    printf("Digite um valor: ");
    scanf("%d", &valor);
}
```

Para sair, o laço sai pela lógica; olhando para o código, não tem como saber, neste caso, quantas vezes ele vai repetir, porque a repetição não depende de um contador, depende do valor digitado.

## Variável contador

Outro caso muito comum é utilizar a estrutura de repetição para **percorrer uma lista de valores** e saber **quantos deles atendem a uma determinada condição**. Por exemplo, quantos alunos de uma lista foram aprovados (nota maior ou igual a seis), ou quantos números de uma relação de números são pares. Então, além da minha variável do laço, eu crio uma variável chamada **contador**, que vai contar quantas vezes aquela condição acontece.

**Cuidado:** essa variável, pessoal, você **obrigatoriamente tem que inicializar**. Caso contrário, quando você começar a contar um, dois, três com ela, o valor inicial vai ser lixo: vai ficar lixo mais um, lixo mais dois... Então, variáveis do tipo contador sempre devem ser inicializadas.

**Exemplo: contar os pares entre 0 e 20.** Repare que a variável `i` vai de 0 a 20, então o laço repete 21 vezes: zero é menor ou igual a 20, `i++`; um é menor ou igual a 20; dois... até a condição ficar falsa. O que está entrando de diferente é uma variável contadora, `contapar` [verificar: o original diz "counterpart"], que conta quantas vezes `i` recebe um valor par. Ela é inicializada em zero e, a cada repetição, eu testo: o valor de `i` é par? Ou seja, o resto da divisão de `i` por dois é zero? Se for, `contapar++`. Então: 0 é par, contador vai a 1; 1 não é par, não faz nada; 2 é par, contador vai a 2; e assim por diante.

```c
int i = 0;
int contapar = 0;

while (i <= 20) {
    if (i % 2 == 0) {
        contapar++;
    }
    i++;
}
printf("Quantidade de pares: %d\n", contapar);
```

Numa variável contadora, o resultado só vale **depois que ele termina a repetição**, quando saiu do laço; a cada passo ele conta se aquela condição foi satisfeita ou não. Executando: entre zero e vinte, temos **11 números pares** [verificar: o original diz "6" antes]. Posso ter outra condição? Posso, por exemplo, para saber quantos são múltiplos de três: tem **7 números múltiplos de três** entre zero e vinte.

## Variável acumulador

Às vezes eu posso querer também **somar** os valores. Por exemplo, a soma de todos os números pares entre zero e vinte. Nesse caso, temos uma **variável acumulador**: a cada repetição, a minha variável acumula uma parte do resultado. Percorrendo:

- 0 é par: soma 0.
- 1 é par? Não.
- 2 é par: 0 + 2 = 2.
- 3 é par? Não.
- 4 é par: 2 + 4 = 6.
- 6: 6 + 6 = 12. 8: 12 + 8 = 20. 10: 20 + 10 = 30. E assim por diante.

Reparem na conta: eu não estou apenas somando um valor novo; a `soma` recebe **o que a soma valia na repetição anterior mais o valor de `i`**. E o resultado só é mostrado quando eu saio dessa repetição.

```c
int i = 0;
int soma = 0;

while (i <= 20) {
    if (i % 2 == 0) {
        soma = soma + i;
    }
    i++;
}
printf("Soma dos pares: %d\n", soma);
```

Vamos exemplificar: somando todos os números entre zero e 100, a soma é **5.050** [verificar: o original diz "cinco mil e cinco"]. Depois, para todos os valores até 10 mil, e, lembra? O computador é muito rápido.

## Encerramento

Pessoal, a parte teórica da estrutura de repetição é relativamente simples. Porém, ela exige **bastante treino** para que vocês possam dominar esse ponto. Por conta disso, eu deixei lá, nos links [verificar: o original diz "likes"], vários exercícios para vocês. Tentem fazer precisando do mínimo de ajuda possível; só assim você vai saber se realmente aprendeu ou não. É isso, pessoal. Um grande abraço, bons estudos e até a próxima.

## Avisos da aula

O professor deixou vários exercícios sobre estruturas de repetição no material da disciplina e recomenda resolvê-los com o mínimo de ajuda possível. Nenhum prazo ou prova foi mencionado.
