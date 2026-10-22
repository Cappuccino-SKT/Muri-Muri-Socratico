# Aula 10 – Estrutura de Repetição `for`

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "pré-also-hermoreal"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

## Tópicos abordados

- Quando usar o `for` (número de repetições conhecido, com contador)
- Sintaxe: inicialização; condição; atualização
- Fluxo de execução do `for`
- Contagem crescente e decrescente
- Atualizar de 2 em 2, 3 em 3 e o operador `+=`
- Declarar a variável dentro do `for` (C99) e escopo
- `for` com duas variáveis
- `for` aninhado (um dentro do outro) e `usleep`

## Glossário

- **`for`:** "para"; estrutura de repetição com três partes entre parênteses (inicialização, condição e atualização).
- **Inicialização:** executada **uma única vez**, quando o fluxo chega no `for`.
- **Condição:** testada antes de cada repetição.
- **Atualização:** executada ao final de cada repetição, para mudar o valor do contador.
- **Contador:** variável que controla a repetição.
- **`+=`:** abreviação; `contador += 3` equivale a `contador = contador + 3`.
- **C99:** versão do padrão da linguagem C que permite declarar a variável dentro do `for`.
- **Escopo:** região do código onde a variável existe; a variável declarada no `for` só existe dentro dele.
- **`for` aninhado:** um `for` dentro de outro; o de dentro repete completamente a cada repetição do de fora.
- **`usleep`:** função (biblioteca `unistd.h` [verificar]) que faz uma pausa, com o valor em microssegundos.

---

## Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos aprender sobre a estrutura de repetição **`for`**.

Nas aulas anteriores aprendemos sobre a estrutura de repetição `while` (e `do-while`). Lembrando que o laço de repetição é necessário quando devo repetir um comando ou um conjunto de comandos diversas vezes. Nesse caso, eu escrevo esse comando, ou esse conjunto de comandos, **uma única vez** e mando repetir diversas vezes. Essa repetição é controlada por uma condição, e você, enquanto programador, tem que garantir que esse laço acabe.

Mas nós também temos a opção do laço **`for`**. O laço `for` é usado principalmente **quando você sabe quantas vezes quer repetir**, principalmente quando você tem **um contador que controla a sua repetição**. Na verdade, eu poderia ensinar para vocês só o `while`, e ele daria conta de todas as estruturas de repetição de que você precisar. Porém, em alguns casos, o `for` é mais fácil de fazer a mesma tarefa.

## Sintaxe

Aqui você vai ter a palavra `for` ("para") e, entre parênteses, **três partes**, não apenas a condição:

1. a **inicialização**: você inicializa o valor da sua variável;
2. ponto e vírgula, a **condição**;
3. ponto e vírgula, a **atualização** (o incremento): como você atualiza a sua variável.

Três partes, cada uma separada da outra por ponto e vírgula.

```c
for (inicialização; condição; atualização) {
    // instruções repetidas
}
```

## Fluxo de execução

Primeiro ele chega no `for`. Qual é a primeira coisa que ele vai fazer? A **inicialização**. Inicializou, testa. Se for verdade, executa o que está dentro; terminou de executar, **incrementa (atualiza)**. Testa de novo. Se for verdade, executa, incrementa, testa. E ele vai continuar nessa repetição enquanto essa condição for verdadeira.

Reparem: a **inicialização é executada uma única vez**, quando ele chega no `for`. Logo em seguida ele segue o ciclo: **teste, execução, atualização**; teste, execução, atualização.

## Exemplo: valores de 0 a 4

Vou exibir os valores de 0 a 4. O contador vale 0; 0 é menor que 5? Verdade. Mostrei o 0, atualizei: o contador vale 1. 1 é menor que 5? Mostra 1, atualiza, vira 2. 2 é menor que 5; 3 é menor que 5; 4 é menor que 5; 5 é menor que 5? Falso: sai do `for`. Aqui eu estou **incrementando** a minha variável.

Posso também fazer uma contagem **regressiva**. Inicializei o meu contador em 5 [verificar: o original diz "4", mas a contagem mostra 5]. Enquanto o contador for positivo (maior que 0), `contador--`. Então: contador vale 5, 5 é maior que 0, mostra o 5, `contador--`, vira 4. 4 é maior que 0, mostra o 4. 3, 2, 1... 0 é maior que 0? Falso: sai do `for`. A saída é 5, 4, 3, 2, 1.

```c
int contador;

for (contador = 0; contador < 5; contador++) {
    printf("%d\n", contador);   // 0 1 2 3 4
}

for (contador = 5; contador > 0; contador--) {
    printf("%d\n", contador);   // 5 4 3 2 1
}
```

Olhando no código: eu tenho o meu contador começando em 0 e repito enquanto ele for menor que 5; vamos fazer um exemplo menor, até 4: 0 é menor que 5, mostra o 0, atualiza; 1 é menor que 5; 2... e assim por diante. Se eu fizer até 50, vai repetir 50 vezes, enquanto você quiser. Para **decrementar**, posso começar, por exemplo, em 10, enquanto o contador for positivo, atualizo com `contador--`. Olha lá: de 10 até 1.

## Atualizando de 2 em 2, de 3 em 3

Agora um detalhe interessante: eu só posso atualizar de 1 em 1? Com o `++`, sempre só um. Como faço para atualizar de 2 em 2, de 3 em 3? Eu não posso utilizar a maneira abreviada: faço `contador = contador + 2`. Aí a saída será 0, 2, 4, 6 e assim por diante: atualizou de 2 em 2. Para atualizar de 3 em 3: `contador = contador + 3`. Então você pode somar ou subtrair quanto você precisar para atualizar a sua variável.

```c
for (contador = 0; contador < 20; contador = contador + 2) {
    printf("%d\n", contador);   // 0 2 4 6 ...
}
```

Aproveitando o gancho, vou mostrar **outra abreviação**. Eu falei que não tinha como abreviar `contador = contador + 3`; na verdade, tem sim: **`contador += 3`**. É uma abreviação para "o contador recebe ele mesmo mais 3". [Trecho confuso no original.]

**O velho cuidado:** como você garante que a sua repetição não fique infinita? Sempre, a sua atualização tem que mudar o valor do contador de forma que, em algum momento, o seu teste (a condição) fique falso.

## Declarando a variável dentro do `for` (C99) e escopo

Na linguagem C, até agora, eu pedi para vocês sempre declararem as variáveis antes, lá no começo. No caso do `for`, é permitido declarar a variável que vai fazer a contagem **dentro da própria estrutura `for`**, na inicialização.

```c
for (int contador = 0; contador < 5; contador++) {
    printf("%d\n", contador);
}
```

Porém, **isso só funciona em compiladores mais atuais**: da versão **C99** em diante. Se você tem um compilador antigo, pode ser que essa opção não funcione. Então, em vez de declarar a variável lá fora, eu a declaro aqui na inicialização.

Reparem qual é o **escopo** dela, onde ela "vive": essa variável `contador` só existe dentro dessa estrutura `for`. Se eu der um `printf` do contador aqui fora, vai dar erro, porque o contador não existe aqui fora; ele só existe aqui dentro. Veja se, para o seu caso, é interessante ou não utilizar essa declaração do contador dentro da estrutura `for`.

## `for` com mais de uma variável

O `for` pode ter apenas uma única variável? Não: eu posso ter mais de uma variável, sempre separadas por vírgula. Aqui eu tenho duas inicializações separadas por vírgula; a condição; e, na atualização, posso fazer duas atualizações: estou somando um em uma variável e decrementando a outra em cada repetição.

Olhando no código: eu tenho a variável `i`, indo de zero até quatro. Quero uma segunda variável, `j`. Vou colocar duas inicializações separadas por vírgula; o `j`, por exemplo, começa em 99. Não vou utilizar o `j` na minha condição, e, na atualização, `j--`. Em cada repetição, o `i` vai ser incrementado de uma unidade e o `j` vai ser decrementado de uma unidade.

```c
int i, j;

for (i = 0, j = 99; i < 5; i++, j--) {
    printf("%d %d\n", i, j);
}
```

Executando: na primeira repetição, `i` vale 0 e `j` vale 99; depois `i` vale 1 e `j` vale 98; depois 2 e 97; 3 e 96; 4 e 95. Então o `i` está sendo incrementado e o `j` decrementado a cada repetição.

**Cuidado:** vírgula para separar as variáveis dentro da inicialização (e dentro da atualização); ponto e vírgula para separar a inicialização da condição, e a condição da atualização.

## `for` aninhado

Temos também a opção de fazer um `for` **aninhado**: posso colocar um `for` dentro do outro. Posso também fazer um `while` dentro do outro; não tem problema nenhum. Assim como tinha `if` dentro de outro `if`, eu posso também aninhar `for` e `while`.

Vamos ver no código. Aqui eu tenho a variável `x` e a variável `y`: o `x` vai de zero até 9, e o `y` também, de zero até 9. Primeiro eu tenho um `for` depois do outro, **independentes**: um `printf` 10 vezes aqui e 10 vezes aqui. Como faria com o `for` aninhado? Pego o `for` do `y` e coloco dentro do `for` do `x`. Quantas vezes ele vai executar esse `printf`? 10 × 10 = **100 vezes**.

```c
int x, y;

for (x = 0; x < 10; x++) {
    for (y = 0; y < 10; y++) {
        printf("x = %d, y = %d\n", x, y);
    }
}
```

Ele entra aqui a primeira vez: `x` vale 0; `y` vale 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. Terminou o `for` de dentro, atualiza o `x`: `x` vale 1; `y` vale 0, 1, 2, ..., 9. Ele vai executar o `printf` 100 vezes, porque **cada vez que o `for` de fora executa uma vez, o `for` de dentro executa 10 vezes**. [Trecho confuso no original, algo como "o `x` é lento e o `y` é rápido"; verificar.]

Os valores passam tão rápido que não dá para ver direito. Então vou incluir uma biblioteca diferente, a `unistd.h` [verificar: o original diz "unie-spd"], que permite fazer uma chamada ao sistema operacional, e depois de cada `printf` vou utilizar a função **`usleep`** [verificar: o original diz "o e-sleep"] para dar uma pausa. O valor está em **microssegundos**; vou colocar 100 mil [verificar: trecho confuso no original, algo como 100 milissegundos]. Aí fica legal: ele espera, e você consegue ver a execução mais pausadamente. Você pode brincar com esse valor para ver mais devagar. Para cada valor de `x`, o `y` repete 10 vezes.

## Encerramento

Pessoal, tem aqui no slide também os desafios/exercícios para vocês [verificar: o original diz "desertos operativos"]. Adicionalmente, temos exercícios para vocês praticarem. Um grande abraço, bons estudos e até a próxima.

## Avisos da aula

Há exercícios e desafios no slide/material da disciplina sobre o `for`. Nenhum prazo ou prova foi mencionado.
