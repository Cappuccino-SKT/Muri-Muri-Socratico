# Aula 02 – Linguagem C

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Corial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor de código na tela; o que não aparece na transcrição está sinalizado entre colchetes.

## Tópicos abordados

- Revisão: linguagem de máquina × linguagem de programação
- Linguagem de máquina, hexadecimal e Assembly (exemplo de "Hello World")
- Linguagens de baixo nível × alto nível
- História da linguagem C (BCPL → B → C), usos e portabilidade
- Padrões da linguagem C
- Arquivo `.c`, compilador e GCC
- Estrutura de uma função (cabeçalho, chaves, retorno)
- O primeiro programa em C: `main`, `printf`, `return 0`
- Como compilar e executar (comando `gcc` e o editor Atom)
- Bibliotecas e `#include` (`stdio.h`, `stdlib.h`)
- Caracteres de escape (`\n`, `\a`, `\t`, `\"`, `\\`)
- Comentários de uma linha e de várias linhas

## Glossário

- **Linguagem de máquina:** sequência de bytes em que cada sequência representa uma instrução dentro do processador; cada família de processador tem seu próprio conjunto de instruções.
- **Hexadecimal:** representação de números binários usando 16 símbolos (0 a 9 e A a F).
- **Assembly:** representação em texto das instruções de máquina.
- **Linguagem de baixo nível:** linguagem em nível de máquina, que depende do hardware.
- **Linguagem de alto nível:** linguagem que abstrai a arquitetura do computador.
- **Portabilidade:** possibilidade de adaptar o mesmo programa a diferentes computadores sem mudar o código, desde que se sigam os padrões da linguagem.
- **Código-fonte:** arquivo com o código escrito na linguagem de programação (em C, extensão `.c`).
- **Compilador:** programa que transforma o código-fonte em linguagem de máquina executável.
- **GCC (GNU Compiler Collection):** coleção de compiladores GNU, usada na disciplina.
- **Função:** bloco de instruções com nome, parâmetros (entre parênteses) e valor de retorno.
- **Cabeçalho da função:** linha com o tipo de retorno, o nome e os parâmetros.
- **`main`:** função principal; todo programa em C deve ter uma e apenas uma.
- **`printf`:** função que exibe texto formatado na tela.
- **Biblioteca:** conjunto de funções já prontas, incluído com `#include`.
- **`stdio.h`:** "standard input output", biblioteca padrão de entrada e saída.
- **`stdlib.h`:** "standard library", biblioteca padrão usada em outros comandos.
- **Caractere de escape:** caractere especial iniciado por contrabarra (`\`).
- **Comentário:** anotação no código que é descartada na compilação.

---

## Revisão da aula anterior

Olá, pessoal, eu sou o professor Muriel [verificar] e na aula de hoje vamos falar um pouco mais sobre a linguagem de programação C.

Na aula passada, além de fazer uma revisão de diversos conceitos relacionados à computação, nós vimos que o computador é uma máquina eletrônica e só entende zeros e uns. E nós, seres humanos, falamos uma língua oral, no caso do Brasil, o português. O computador é muito rápido, porém a gente tem que falar para ele o que fazer. Então, eu, que falo português, vou fazer o quê? Vou escrever em uma linguagem de programação, que depois será convertida pelo compilador [verificar: o original diz "computador"] em uma linguagem de máquina, que é entendível pelas máquinas.

## Linguagem de máquina

A linguagem de máquina é um conjunto, uma sequência de bytes que representa um comandinho, uma instrução dentro do processador. E todos os processadores não são iguais: cada família de processador tem o seu próprio conjunto de instruções, de comandos que você pode dar para ele. Então você vai mandar uma sequência de bytes, e cada sequência vai representar "faz isso, faz aquilo". E existem diferentes famílias.

Como seria isso se eu tentasse ver um arquivo executável? [O professor mostra um slide.] A parte que vocês estão vendo em amarelo representa o código de um programa que tudo o que ele faz é mostrar a mensagem "Hello World" na tela, ou seja, "Olá, mundo". É o menor programa, o mais simples que existe. Em amarelo está o código em **hexadecimal**, que é quando se exibem os números binários utilizando 16 símbolos, do 0 ao 9 e da letra A até a F. Do lado direito, vocês estão vendo o código correspondente em formato texto, que seria o código em **Assembly**, se alguém já ouviu falar [verificar: o original diz "Assemble"].

Reparem como seria complexo programar o computador direto em linguagem de máquina. Se eu não utilizasse nenhuma linguagem de programação, eu teria que programar esses valores em Assembly, ou até mesmo esses valores em amarelo, em hexadecimal. Assim, não, né?

A linguagem de máquina que eu mostrei para vocês gera códigos extremamente rápidos e otimizados, porém difíceis de programar. E depende do hardware, porque cada código vai depender do processador: se eu estou num AMD, num Intel, num ARM, num Snapdragon, cada tipo de processador tem o seu código. Então é muito fácil errar [verificar], e os códigos ficam muito extensos e difíceis de entender [verificar: trecho confuso no original].

Por isso, a gente precisa aprender o quê? Não vou programar em uma linguagem de **baixo nível**, como a gente fala nesse caso. A gente precisa de uma linguagem de **alto nível**, em que eu consiga abstrair algumas camadas relacionadas à arquitetura. Nesse caso, a gente vai utilizar a linguagem C.

## A linguagem C: história e características

A linguagem C é da década de 70. Repare, para a computação, que ela surgiu ali [trecho confuso no original, algo sobre a computação eletrônica ter surgido na década de 40]. É uma linguagem antiga, né? Tem 50 anos. Porém ela é utilizada até hoje. Ela evoluiu com o tempo, não ficou parada. Existem várias linguagens que são variantes, derivadas dela. Então ela é muito utilizada.

O nome é um exemplo de criatividade: a linguagem C veio de outra linguagem, a B. A linguagem B evoluiu para o C. A C foi criada por Dennis Ritchie [verificar: o original diz "Denise Whate"], no início dos anos 70. A linguagem B foi criada por Ken Thompson [verificar: o original diz "em Thompson"], e veio de outra que já existia antes, a BCPL [verificar: o original diz "BCPR"]. Ou seja, ela não foi criada do nada, houve uma constante evolução. [Frase inaudível? sobre o que foi feito de melhor.]

Ela é utilizada para diversos tipos de programas [trecho inaudível?]. Navegadores, sistemas operacionais e jogos foram feitos utilizando a linguagem C, ou linguagens variantes dela, como C++ e C#.

**Alto nível.** A gente fala que é uma linguagem de alto nível, às vezes de nível médio. Lembrando que uma linguagem de baixo nível é aquela que está em nível de máquina, em que eu mando instruções em linguagem de máquina para o hardware. Uma linguagem de alto nível é aquela que abstrai toda essa questão da arquitetura: eu digo "exiba essa mensagem na tela" e, independente do processador, ele vai executar e exibir essa mensagem. Então ela combina elementos de alto nível, para facilitar a programação. Porém, caso necessário, dentro do código C eu consigo inserir códigos de linguagem de máquina, trechos bem otimizados quando necessário. Eu posso sim mexer em bits e bytes e em endereço de memória, sem problema nenhum.

**Portabilidade.** Além disso, é uma linguagem altamente portável. Eu posso adaptar o mesmo software para diferentes tipos de computadores sem mudar nada do meu código, desde que eu siga os padrões. Existem padrões da linguagem C: o primeiro padrão foi em 78 [verificar], depois veio o ANSI C [verificar: o original diz "ONCEC"], que foi atualizado em 89, em 99, em 2011 e em 2018 [verificar: o original diz "2008", mas cita "C11" e "C18"]. Se você utilizou esse padrão, você pode usar um compilador para compilar o seu programa e gerar o código de máquina para diferentes plataformas. Portanto, é uma linguagem portável.

## Arquivo `.c` e compilador

E qual é o esqueleto dessa linguagem? Como vai ser um código dela? Eu vou criar um arquivo com a extensão `.c`. Um arquivo de música não é `.mp3`? Então um arquivo de código-fonte é `.c`, que tem código da linguagem de programação C. Ali eu vou escrever o meu algoritmo utilizando essa linguagem. Depois eu vou passar esse arquivo para um **compilador C**, que vai transformar todo aquele código em linguagem de máquina, executável.

Existem diversos compiladores que seguem o padrão. O que a gente vai utilizar aqui na disciplina é o GNU C, que está dentro do **GCC**, o GNU Compiler Collection, a coleção de compiladores GNU, que está disponível para vocês.

## Estrutura de uma função

Qual é a estrutura do código em C? Lembra da matemática? Não tem a questão de funções? `y = f(x)`: *f* é o nome da função, *x* é o argumento e *y* é o resultado. Um programa em C, de maneira similar, é composto por diversas funções.

[O professor mostra um slide com a estrutura.] Aqui eu tenho o nome da função; entre parênteses, os parâmetros; e aqui um tipo de saída [tipo de retorno]. Isso é o **cabeçalho da função**, a gente fala. Aqui a chave indica onde ela começa, e a outra chave indica onde ela termina. Dentro eu vou ter as instruções, a minha receitinha de bolo, o passo a passo do que essa função vai fazer. Quando ela termina, ela vai retornar um valor de retorno, do mesmo tipo da saída. Lembra? `y = f(x)`: chamo pelo nome, passo o parâmetro, tenho o retorno.

## O primeiro programa em C: Hello World

Vamos olhar isso agora em um código em C. Esse aqui é o primeiro programa de vocês em C. [A transcrição não traz o código escrito; ele foi reconstruído a partir da descrição do professor. Verificar.]

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    printf("Hello World");
    return 0;
}
```

Conseguem achar aqui uma função, com o nome da função, um parâmetro e um retorno? O nome seria `main`, que em inglês quer dizer "principal": é a **função principal**. Todo programa em C deve ter uma e apenas uma função `main`. Entre parênteses, tem algum valor? Não. Nesse caso, a função `main` está recebendo nenhum valor de parâmetro (poderia receber). E qual é o valor de retorno? `int`. A gente vai ver mais para frente que isso quer dizer um valor inteiro, um número inteiro. Aqui é onde a função começa (chave) e aqui é onde ela termina.

O que a minha função faz? Ela tem apenas um comando: `printf("Hello World")`. O `printf` manda o computador exibir, de forma formatada, na tela, o texto que está entre aspas duplas, no caso "Hello World", que em inglês quer dizer "Olá, mundo". Depois de terminar, ele retorna o valor zero. Então, meu programa começa, mostra "Hello World" na tela e depois termina. Um programa bem simples.

## Compilando e executando

Se você já tiver instalado o compilador, conforme eu ensino em outros vídeos, você pode executar esse programa. Como? Pega esse código, coloca num arquivo de texto (pode utilizar o Bloco de Notas, não precisa de nenhum programa específico), salva com o nome `hello.c` e, usando o terminal no Linux ou o prompt de comando no Windows, executa o comando abaixo:

```bash
gcc -Wall -o hello hello.c
```

`gcc` é o nome do compilador; `-Wall` ativa todos os alertas; `-o` indica o arquivo de saída, que vai se chamar `hello`; e `hello.c` é onde estão os meus códigos-fonte.

**Na prática, no editor Atom.** Aqui eu estou com esse mesmo código no editor, lembrando que já estou com o compilador e o editor instalados e configurados corretamente, como eu ensino nos outros tutoriais. Para executar, vou pressionar a tecla **F6**. Esse programa tem função `main`, que não recebe parâmetro, retorna um número inteiro, começa aqui, termina aqui, e tem uma única instrução, o `printf`, que exibe na tela a mensagem "Hello World" e depois finaliza. Ao pressionar F6, ele executou a mensagem e, só para não fechar a tela, aparece "Pressione qualquer tecla para continuar". O F6 salva o código, passa pelo compilador, gera o arquivo binário executável e executa o programa. Isso acontece quando você pressiona F6.

## Bibliotecas e `#include`

Tem mais algumas coisas que eu ainda não expliquei: **as duas linhas de cima**. São as **bibliotecas**. Com o `#include` eu estou incluindo as bibliotecas que vou utilizar. Por exemplo, para que eu possa utilizar a função `printf`, alguém tem que ter feito essa função; ela está em uma biblioteca, e eu faço o `include` aqui em cima. `stdio` (não é "estúdio") é *standard input output*, a biblioteca padrão de entrada e saída. A linha de baixo, `stdlib`, é *standard library*, a biblioteca padrão que vou precisar para outros comandos com que a gente vai trabalhar durante a disciplina.

Repare: é uma linguagem, não é português, mas também não é linguagem de máquina. Então tem alguns símbolos e regras: o `include` sempre tem que ter o `#` (cerquilha, hashtag), e o nome da biblioteca tem que ficar entre os sinais de menor e maior (`< >`). É uma língua, assim como se eu estivesse estudando inglês, francês, alemão: tem as regras dela, e você tem que seguir.

## `printf` e `return 0`

Aqui eu chamo a função `printf`. O argumento, o que eu quero exibir, é "Hello World", entre aspas duplas, e deixei os argumentos entre parênteses. Para finalizar o comando, ponto e vírgula no final.

E o `return 0`: para quem vai esse zero? Estou retornando esse valor para quem? Quem roda um programa aplicativo? O sistema operacional. Toda vez que um programa aplicativo retorna 0 para o sistema operacional (Windows, Linux), ele está informando que esse programa finalizou sem nenhum erro. Só se o programa der algum erro ao executar é que ele finaliza com um valor diferente de zero. [Trechos confusos no original: inaudível?] Aqui a chave fecha a função `main`.

## Caracteres de escape

Vamos mudar um pouquinho aqui. Depois do "Hello World", vou escrever "Apucarana" [verificar: o original diz "pucarana"]. O que aconteceu? [O texto aparece na linha de baixo por causa do `\n`; o código exato não aparece na transcrição.] É isso que o `\n` faz: toda vez que você coloca um `\n` na mensagem a ser exibida, ele vai para a linha de baixo.

Vou escrever em três linhas: "Hello World", "Apucarana" e "UTFPR" [verificar: o original diz "TSPR"]. Se eu quiser colocar outro texto, precisa ser tudo no mesmo `printf`? Não. Vou colocar uma linha nova, outro `printf`, e escrever "Engenharia de Computação". Ao executar com F6, aparece "Hello World", "Apucarana", "UTFPR", "Engenharia de Computação" e o "pressione qualquer tecla para continuar". Repare, pessoal: se eu tirar o `\n` e executar, ele mostra "UTFPR Engenharia..." na mesma linha. Mesmo com dois `printf` diferentes, não são duas linhas: você não mandou ele para a linha de baixo. Ele só vai para a linha de baixo se eu mandar, e, nesse caso, isso é feito colocando um `\n`.

Fora o `\n`, tem mais alguma coisa para aprender? Tem. Por exemplo, se eu der um `\a`, repare o que vai acontecer. Vocês escutaram o barulhinho? `\a` é **alerta**: ele dá um bipe [no meu computador; trecho confuso no original: "aqui no meu ele usa de outra maneira"], um alerta ao usuário.

**Aspas duplas.** O texto que eu quero exibir tem que estar entre aspas duplas. Como eu faço se eu quiser exibir as próprias aspas duplas? Repare que o texto entre aspas aparece com uma cor diferente aqui no editor, o que ajuda a gente. Se eu colocar mais aspas aqui no meio, o compilador vai se confundir com a forma do meu texto [verificar: trecho confuso no original]. Para diferenciar as aspas duplas que começam e terminam o texto das aspas duplas que eu quero que sejam exibidas na tela, eu utilizo uma contrabarra antes das aspas duplas: `\"`. Nesse caso, por exemplo, o texto "Engenharia de Computação" aparece entre aspas duplas na tela.

Existem diversos outros caracteres especiais, os **caracteres de escape**. A contrabarra (barra invertida) é utilizada para esses caracteres especiais:

| Sequência | Significado |
|-----------|-------------|
| `\a` | alerta (bipe) |
| `\n` | nova linha |
| `\t` | tabulação (empurra o texto um pouquinho para frente) |
| `\\` | exibir a própria contrabarra (preciso escrever duas) |
| `\"` | exibir aspas duplas |
| `\'` | exibir aspas simples [verificar] |
| `\?` | exibir interrogação [verificar: o professor diz, se não me engano, que também precisa de uma contrabarra antes] |

## Comentários

E os comentários: eu posso colocar comentários no meu código? Sim. O que acontece com o comentário quando o compilador roda? Eles são simplesmente apagados (ignorados). Então, para que serve? Para você ter organização; é uma anotação. Num código pequeno é fácil ver o que faz o quê, mas, conforme os nossos códigos forem crescendo, você precisa documentar o seu código para poder entender o que o programa faz depois de seis meses, depois de um ano, ou então, trabalhando em equipe, para um programador saber o que o outro fez.

Eu posso fazer um comentário de duas maneiras diferentes:

1. **Comentário de uma linha:** `//`. Por exemplo, `// Exibe uma mensagem na tela`. Repare que todo o texto depois do `//` fica cinza. Isso é um comentário; aqui eu posso escrever o que eu quiser, que não vai influenciar em nada o meu código. Porém, esse comentário dura uma linha só.
2. **Comentário de várias linhas:** vou ter que fazer outra marcação, abrindo e fechando o trecho comentado, que no padrão da linguagem é `/* ... */` [verificar: a transcrição original ficou confusa nesse trecho]. Aqui eu posso fazer um comentário de várias linhas, sem limite.

Ou seja, eu posso fazer um comentário de apenas uma linha ou um comentário de várias linhas. O comentário de uma linha também pode ficar na mesma linha de um trecho de código: por exemplo, ao lado da linha da função `main`. Da linha até aqui é código; daqui em diante é comentário.

```c
// Exibe uma mensagem na tela
printf("Hello World");

/* Comentário
   de várias linhas */

int main() // comentário na mesma linha do código
```

[Exemplo ilustrativo, reconstruído a partir da descrição do professor.]

## Encerramento

Por hoje é isso, pessoal. Treinem bastante [verificar: o original diz "Trame bastante"]. Até a próxima. Um grande abraço.

## Avisos da aula

Nenhum aviso administrativo (prazos, provas, tarefas) nesta aula. O professor remete a outros vídeos de tutorial para a instalação e a configuração do compilador e do editor Atom.
