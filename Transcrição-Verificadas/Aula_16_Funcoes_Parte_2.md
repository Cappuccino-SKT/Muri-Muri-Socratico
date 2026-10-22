# Aula 16 – Funções (Parte 2): parâmetros, retorno e argumentos da `main`

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "ProsoMudial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides, o editor e o terminal na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

## Tópicos abordados

- Revisão de escopo: variáveis locais × globais
- Funções com parâmetros e valor de retorno
- Exemplo: função `soma` com `float`
- Argumentos da `main` pela linha de comando (`argc` e `argv`)
- Converter texto em número com `atof`
- Executar com argumentos no terminal e no editor
- Documentar funções (padrão Doxygen: `@param` e `@return`)

## Glossário

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

## Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e esta é a continuação da nossa aula sobre funções.

Na primeira parte, nós aprendemos a criar funções, mas ainda sem passar parâmetros e sem receber nenhum retorno. Nesta aula vamos aprender a trabalhar com **parâmetros** e com **valores de retorno**. Para isso, vamos precisar revisar alguns conceitos relacionados ao **escopo de variáveis**. Até agora, nós usamos a função `main` e todas as variáveis ficavam lá dentro. Agora nós temos diversas funções e, portanto, é conveniente que a gente revise esse conteúdo.

## Revisão: escopo de variáveis

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

## Funções com parâmetros e retorno

Vamos ver como criar funções passando parâmetros e recebendo valor de retorno. É muito parecido com o que a gente fez antes, só que agora, **entre parênteses, eu coloco todos os parâmetros**: o tipo do parâmetro, espaço, o nome, vírgula; tipo, espaço, nome, vírgula; e assim por quantos parâmetros eu quiser.

E, na hora de retornar, eu faço `return` e coloco um valor. **Esse valor tem que ser exatamente do tipo definido antes do nome da função**: se antes do nome da função está `int`, o valor tem que ser `int`; se for `float`, tem que ser um valor `float`; e assim por diante.

Por exemplo [slide]: uma função chamada `soma`, que recebe dois valores e retorna a soma desses dois valores. Na `main`, eu chamo a função `soma`, passo os valores e salvo o resultado em uma variável.

### Na prática: a função `soma`

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

## Passando argumentos para a `main`

Agora eu já sei como passar valores para uma função que eu mesmo criei. Mas, e se eu quiser passar parâmetros **para a função `main`**? A `main` chama outras funções, mas **quem chama a `main`**? O sistema operacional. Então é isso que a gente vai ver agora: como passar valores pelo terminal, no momento da execução do meu programa.

Se eu estou no terminal (no Linux, por exemplo), digito `./main` (o nome do meu programa executável), espaço, e vou passando, separados por espaço, cada um dos valores que quero passar como parâmetro:

```bash
./main valor1 valor2 valor3
```

Nesse caso, se eu executar isso, a minha `main` vai receber **quatro argumentos**. Por quê? Porque, por padrão, **o primeiro argumento é sempre o nome do arquivo executável**. Então o primeiro é `./main`, depois `valor1` (segundo), `valor2` (terceiro) e `valor3` (quarto) [verificar: o original numera de forma confusa].

### Como a `main` recebe os argumentos

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

## Exemplo: somar dois valores passados na linha de comando

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

### Executando com argumentos

Se eu tentar executar direto no editor, o programa recebe só o argumento do nome do executável e não executa a soma (cai na mensagem de erro). Então vou abrir o terminal. Como eu executo esse programa? Uso o comando para listar os arquivos [`ls`, verificar] para ver o nome do meu executável, que vou chamar de `aula16_exemplo3` [verificar]. Então digito `./aula16_exemplo3 5 8`: para somar 5 mais 8, passo 3 argumentos no total (o nome do executável e os dois valores). Dessa maneira, eu consigo passar valores para a `main` pela linha de comando.

```bash
./aula16_exemplo3 5 8
```

**Tem como fazer isso dentro do editor, sem abrir o terminal?** Tem. Com **Ctrl+F6**, aparece a opção **"Run Argument"** [verificar]: ali você pode passar os valores que quiser para a sua `main`, como os dois números a somar [exemplo de valores confuso no original].

## Documentando as funções (Doxygen)

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

## Encerramento

É isso, pessoal. Lá nos slides também tem, para vocês, alguns exercícios para trabalharem esses conceitos. Bons estudos, um grande abraço e até a próxima!

## Avisos da aula

Há exercícios nos slides sobre funções com parâmetros e retorno. Nenhum prazo ou prova foi mencionado.
