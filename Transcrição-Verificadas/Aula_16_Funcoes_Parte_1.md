# Aula 16 – Funções (Parte 1)

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Processor Memorial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

## Tópicos abordados

- Por que dividir o código em funções
- Conceito de função e vantagens (organização, reutilização, independência)
- Boa função: fortemente coesa e fracamente acoplada
- Como definir e como chamar uma função (sem parâmetros e com parâmetros)
- Fluxo de execução: a `main` é suspensa durante a chamada
- Exemplo prático: função `void` sem parâmetros
- Uma função chamando outra
- Definição antes do uso e o **cabeçalho** da função

## Glossário

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

## Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos conversar sobre as **funções**.

Até agora, todo o nosso código estava na função `main`. Desde o início do curso, quando nós fazíamos o "Hello World", até agora, o nosso código só foi crescendo. O código da função `main` agora é mais complexo, tem várias linhas e, consequentemente, está mais difícil de organizar. A nossa função `main` faz muitas coisas [trecho confuso no original]. Então, o que a gente pode fazer? A gente pode **organizar o nosso programa, o nosso código, em diversas funções**.

## O que é uma função

Qual é o conceito de função dentro de uma linguagem de programação? É **um pedaço do código que realiza uma determinada tarefa, de uma certa maneira, independentemente do resto do programa**.

Antes, a função `main` continha todos os itens, estava tudo misturado dentro dela. Agora não: agora a gente vai ter uma **sequência de funções**, cada uma com a sua tarefa específica e independente das demais, e depois a função `main` vai ter a função de **organizar e chamar essas tarefas menores**.

## Vantagens de utilizar funções

1. **Organização do código:** se eu separar o meu código em pedacinhos menores, fica muito mais fácil de entender e de dar manutenção nesse código depois.
2. **Reutilização:** às vezes eu tenho que repetir um comportamento diversas vezes, e posso utilizar o mesmo comportamento em diversos lugares. Posso, inclusive, levar esse mesmo código e reutilizá-lo em outro programa.
3. **Independência:** a função é relativamente independente do código que a chamou. [Trecho confuso no original.] As variáveis que ela se limita a alterar são as que foram passadas por parâmetros.

Nós costumamos dizer que **uma boa função é fortemente coesa**, ou seja, focada na sua tarefa, **e fracamente acoplada**, ou seja, não depende muito do restante do código.

## Como definir uma função

Para criar uma função, eu tenho que **defini-la antes da utilização**. Como se escreve? Coloco o **tipo do retorno** (por exemplo, `int`); depois o **nome da função** e, entre parênteses, quais são os **parâmetros**. Em seguida abro o corpo da função com uma chave; o `return` marca o fim da minha função; e aqui fecho a chave.

```c
tipo_do_retorno nome_da_funcao(parâmetros)
{
    // corpo da função
    return valor;
}
```

## Como chamar uma função

Uma vez definida, posso chamar a minha função. Como eu faço?

- **Função sem parâmetros e sem retorno:** só chamo o nome da função, com abre e fecha parênteses e ponto e vírgula. Repare que, apesar de a função não ter parâmetros, **eu preciso obrigatoriamente colocar os parênteses** ao chamá-la.
- **Função com parâmetro e com retorno:** escrevo o nome da função e, entre parênteses, passo o parâmetro. Para salvar o valor de retorno, eu o **atribuo a uma variável**.

```c
nome_da_funcao();                       // sem parâmetros, sem retorno

resultado = nome_da_funcao(parametro);  // com parâmetro e com retorno
```

Estou chamando o nome da função, passando o parâmetro, e o resultado da função eu salvo na variável.

## Exemplo: a função `mensagem`

Vamos ver um exemplo. Eu tenho a função `main` e, **antes** da minha função `main`, eu defini uma função `mensagem`. Ela não recebe nenhum parâmetro e não tem nenhum tipo de retorno (por isso usamos `void`: quando a função não tem retorno, a gente usa `void`). Essa função simplesmente exibe uma mensagem e depois termina. Dentro da `main`, eu vou chamar a função `mensagem`.

**Qual é o fluxo de execução?** Ele vai executar de cima para baixo, primeiro `mensagem` e depois `main`? Não. Ele **começa sempre a execução pela `main`**. Quando encontra a chamada da função, ele **suspende a execução da `main`**, vai lá para `mensagem` e executa tudo o que estiver dentro da função. Quando termina, **ele volta para o mesmo ponto onde parou na `main`**.

### Na prática

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

## Uma função chamando outra

Posso fazer agora uma função chamar outra? Pode, sim. Vou criar uma função chamada `mensagem_interna` [verificar: nome]. Dentro da função `mensagem`, vou chamar agora a `mensagem_interna()` e, depois, dentro da função `mensagem`, mostro de novo "dentro da função".

Como vai ser a execução? Começo pela `main`: mostra "antes de chamar a função"; chama `mensagem`, vai para lá e mostra "dentro da função"; depois, ao chegar na chamada de `mensagem_interna`, **suspende a execução da função `mensagem`** e vai para a `mensagem_interna`; mostra "dentro da função interna"; terminou, volta para a `mensagem` e mostra de novo "dentro da função"; termina a `mensagem`, volta para a `main` e mostra "depois de chamar a função".

Saída:

1. antes de chamar a função
2. dentro da função
3. dentro da função interna
4. dentro da função
5. depois de chamar a função

## Definição antes do uso e o cabeçalho da função

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

## Encerramento

Para essa aula não ficar muito longa, nós vamos dividir em **duas partes**. Nesta primeira parte, vimos as funções **sem receber nenhum parâmetro e sem retornar nenhum valor**. Na próxima aula, vamos aprender a passar parâmetros e a retornar valores nas nossas funções. É isso, pessoal. Um grande abraço, bons estudos e até a próxima!

## Avisos da aula

Esta é a primeira de duas partes sobre funções. Nenhum prazo ou prova foi mencionado.
