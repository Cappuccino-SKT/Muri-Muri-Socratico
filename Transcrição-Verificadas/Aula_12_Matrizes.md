# Aula 12 – Matrizes

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

## Tópicos abordados

- O que é uma matriz (vetor de vetores, vetor bidimensional)
- Declaração: linhas e colunas
- Índices: de 0 até tamanho − 1, em cada dimensão
- Atribuição e leitura indicando linha **e** coluna
- Inicialização com chaves
- Preencher e exibir a matriz com `for` aninhado
- Exibir em formato de tabela (onde colocar o `\n`)
- Matrizes com mais de duas dimensões

## Glossário

- **Matriz:** estrutura que usa um vetor para armazenar um conjunto de vetores; pode ser vista como uma tabela. Também chamada de vetor bidimensional (ou multidimensional).
- **Linha:** primeiro índice entre colchetes.
- **Coluna:** segundo índice entre colchetes.
- **`for` aninhado:** um `for` dentro de outro; o externo percorre as linhas e o interno percorre as colunas.
- **Matriz multidimensional:** matriz com mais de duas dimensões (por exemplo, 3 × 3 × 3, "com profundidade").

---

## Introdução

Olá, pessoal, eu sou o professor Muriel e nesta aula vamos aprender a trabalhar com **matrizes**.

Na aula anterior aprendemos a utilizar vetores para armazenar um conjunto de valores, do tipo inteiro, `char` ou `float`. Nesta aula vamos explorar outra possibilidade: **utilizar um vetor para armazenar um conjunto de vetores**. Com isso, eu posso visualizar a estrutura como se fosse **uma tabela ou uma matriz**, e ela às vezes é conhecida como **vetor bidimensional**, tridimensional, ou seja, multidimensional.

## Declaração

Como ficaria isso na declaração do nosso código? Muito parecido com o que temos no vetor, só que agora eu tenho **uma dimensão a mais**:

```c
int matriz[3][4];
```

`int` é o tipo, `matriz` é o nome da minha variável e agora eu coloco **duas dimensões**: essa matriz armazena **três vetores de tamanho 4** cada um deles. Podemos pensar que o primeiro elemento, entre colchetes, é a **linha** e o segundo é a **coluna**.

## Índices

Lembrando como ficam os índices nesse caso: **sempre começam em zero e vão até o tamanho menos 1**. Se são três linhas, as linhas começam em 0 e vão até 2 (3 − 1). Se são quatro colunas, as colunas começam em 0 e vão até 3 (4 − 1).

## Atribuindo e lendo valores

Se eu quiser atribuir um valor, eu **não posso mais indicar só a linha**: tenho que dizer **em qual linha e em qual coluna** eu estou salvando. Por exemplo:

- `matriz[0][2]` recebe o valor 10: linha 0, coluna 2 recebe 10;
- `matriz[1][1]` recebe 5: linha 1, coluna 1 recebe 5;
- `matriz[2][0]` recebe 3: linha 2, coluna 0 recebe 3.

Posso pegar o valor de uma posição e copiar para outra? Posso. Olha aqui: pego a posição `matriz[2][0]` e salvo na posição `matriz[0][0]`: ou seja, peguei o 3 da linha 2, coluna 0 e copiei para a posição 0, 0. E, finalizando, `matriz[1][3]` recebe 7: linha 1, coluna 3 recebe 7.

```c
int matriz[3][4];

matriz[0][2] = 10;
matriz[1][1] = 5;
matriz[2][0] = 3;
matriz[0][0] = matriz[2][0];   // copia o 3 para a posição 0,0
matriz[1][3] = 7;
```

Então, **sempre que eu quiser atribuir, ler, exibir ou fazer qualquer operação** com a matriz, eu tenho que indicar **em qual linha e em qual coluna** eu estou lendo ou gravando.

## Inicializando uma matriz

Se eu quiser inicializar, tem como? Tem. Olha como ficaria a estrutura: são três linhas e quatro colunas. Vou utilizar a mesma estrutura de chaves que eu tinha lá no vetor; como a matriz é um **vetor de vetores**, coloco a chave externa e, dentro dela, o vetor da primeira linha entre chaves, vírgula, o vetor da segunda linha, vírgula, o vetor da terceira linha, e fecho a chave externa com ponto e vírgula. Dessa maneira, o primeiro vetor é a primeira linha, o segundo vetor é a segunda linha, e assim por diante.

```c
int matriz[3][4] = {
    {valor, valor, valor, valor},   // linha 0
    {valor, valor, valor, valor},   // linha 1
    {valor, valor, valor, valor}    // linha 2
};
```

[Os valores do exemplo do slide não puderam ser recuperados da transcrição; verificar.]

## Percorrendo a matriz com `for` aninhado

Como eu faço se o tamanho da minha matriz for grande? Eu não vou fazer manualmente; nesse caso, vou utilizar uma **estrutura de repetição**. Antes, para preencher um vetor, eu precisava de um `for`. Agora, para preencher uma matriz, eu preciso de **um `for` dentro de outro `for`**.

Repare: a matriz é um vetor de vetores. Então, **um `for` preenche um vetor** (uma linha) e eu preciso de **outro `for`, por fora, para percorrer todas as linhas** da minha matriz. Olha aqui: `l` de linha e `c` de coluna. O `for` interno está percorrendo todas as colunas, que juntas representam uma linha. Mas eu não quero percorrer apenas uma linha, eu quero percorrer várias; para isso eu faço um `for` externo, que vai percorrer todas as linhas da minha matriz.

Então, como vai ser: a linha vale 0 (a primeira linha), e a coluna vale 0, 1, 2, 3; a linha vale 1, e a coluna vale 0, 1, 2, 3; a linha vale 2, e a coluna vale 0, 1, 2, 3. Dessa maneira eu percorro todas as posições da minha matriz: 0,0; 0,1; 0,2; 0,3; 1,0; 1,1; 1,2; 1,3; 2,0; 2,1; 2,2 e 2,3. Ok?

**E para exibir?** Vai ser **a mesma estrutura**, porque os índices são os mesmos. Eu posso usar a mesma estrutura de `for` que utilizei para receber os valores, para exibir os valores. O que tem de diferente é que, na hora de exibir, no meu `printf` eu tenho que dizer **qual posição da matriz** estou exibindo: qual linha e qual coluna. Então, repare: estou exibindo o valor da matriz na linha `l`, na coluna `c`: `matriz[l][c]`.

## Na prática: matriz 3 × 3

Vamos ver na prática no nosso código. Primeiro, vamos criar as variáveis. **Uma dica:** chamar de `l` (linhas) e `c` (colunas) os nossos contadores. Vou criar uma matriz **3 × 3**, para brincar: três linhas e três colunas.

**Passo 1: ler os valores.** Primeiro, o `for` das linhas: quantas linhas eu tenho? Três linhas, que vão de 0 até 2. Então `for` com a linha começando em 0, enquanto a linha for menor que 3, `l++`. Menor que 3 vai de 0 até 2. Só que agora, para cada linha, eu quero percorrer as colunas: faço outro `for`, com a coluna começando em 0, enquanto a coluna for menor que 3, `c++`.

E agora eu vou receber o valor: mostro ao usuário a posição que ele está preenchendo (para a gente acompanhar depois na execução), com dois `%d`, para os dois valores `l` e `c`. Depois, o `scanf`: vou pegar o que o usuário digitar como um inteiro decimal (`%d`) e salvar no endereço de memória da matriz, **na linha `l` e na coluna `c`**.

```c
int matriz[3][3];
int l, c;

for (l = 0; l < 3; l++) {
    for (c = 0; c < 3; c++) {
        printf("Digite o valor da posição [%d][%d]: ", l, c);
        scanf("%d", &matriz[l][c]);
    }
}
```

**Como isso fica na memória.** Quando faço `matriz[3][3]`, eu reservei espaço para quantas variáveis? Para 3 × 3 = **9 valores do tipo inteiro** na memória RAM. Na memória, vão estar: `matriz[0][0]`, `matriz[0][1]`, `matriz[0][2]`, `matriz[1][0]`, `matriz[1][1]`, `matriz[1][2]`, `matriz[2][0]`, `matriz[2][1]`, `matriz[2][2]`. E a cada repetição eu percorro cada um desses valores.

Se eu fosse ver essa estrutura como uma **planilha** (tabela) mesmo, quem vai ser preenchido primeiro? A posição 0,0; depois 0,1; depois 0,2; depois 1,0; 1,1; 1,2; depois 2,0; 2,1; 2,2. Ou seja, **vou preenchendo cada linha, da primeira coluna até o final**.

**Passo 2: exibir os valores.** Para exibir, lembro que falei: a estrutura é a mesma. Então vou duplicar essa mesma estrutura de `for` aninhado, que vai percorrer as mesmas posições, só que agora eu não quero mais ler o valor, quero exibir o valor. Então vou mostrar o valor com `%d` e `matriz[l][c]`.

Mas eu quero exibir **no formato de uma tabela**: em linhas e colunas. Então, quero exibir os valores de uma linha na mesma linha da tela e, depois de exibir toda uma linha (passando por todas as colunas), **quebrar a linha**. Onde vai ficar o `\n`? **Dentro do `for` externo, mas fora do `for` interno.** Porque, olha lá: ele exibe, exibe, exibe, quebra a linha; exibe, exibe, exibe, quebra a linha; exibe, exibe, exibe, quebra a linha. Como o `for` externo repete 3 vezes, eu tenho 3 quebras de linha na hora de exibir a minha matriz.

```c
for (l = 0; l < 3; l++) {
    for (c = 0; c < 3; c++) {
        printf("%d ", matriz[l][c]);   // [verificar: espaçamento exato]
    }
    printf("\n");   // quebra de linha depois de cada linha da matriz
}
```

**Executando.** Vamos executar para ver como fica, acompanhando a memória RAM: `matriz[0][0]` recebe 1; `matriz[0][1]` recebe 2; `matriz[0][2]` recebe 3. Agora o `for` interno termina e o `for` externo atualiza a linha para 1: `matriz[1][0]` recebe 4; `matriz[1][1]` recebe 5; `matriz[1][2]` recebe 6. A linha atualiza novamente, vai para a última linha: `matriz[2][0]` recebe 7; `matriz[2][1]` recebe 8; `matriz[2][2]` recebe 9. Então ele já exibiu os valores, em formato de tabela:

```
1 2 3
4 5 6
7 8 9
```

Você pode utilizar as matrizes sempre que precisar de **vetores bidimensionais**, de duas dimensões, para armazenar valores tabulares. Qualquer conjunto de valores que você queira organizar de maneira bidimensional, você pode armazenar em uma matriz.

## Matrizes com mais de duas dimensões

Para finalizar: eu posso fazer só duas dimensões? **Não.** Posso fazer uma matriz tridimensional, quadridimensional, e assim por diante. Como seria uma matriz **3 × 3 × 3**? Três linhas, três colunas, com 3 de **profundidade**. O que mudaria? Eu teria que ter **um `for` dentro de um `for` dentro de outro `for`**: duplicaria e faria mais um `for`. Agora eu tenho um vetor de matrizes, pensando assim. Eu teria um `for` com `p`, de profundidade, e o código que preenchia uma matriz fica dentro de um `for` que vai repetir 3 vezes. Com isso eu consigo preencher a minha matriz tridimensional.

```c
int matriz[3][3][3];
int l, c, p;

for (p = 0; p < 3; p++) {
    for (l = 0; l < 3; l++) {
        for (c = 0; c < 3; c++) {
            scanf("%d", &matriz[l][c][p]);   // [verificar: ordem dos índices]
        }
    }
}
```

Pode ser matriz de 4 dimensões, 5, e assim por diante: **não tem limite**, depende da sua necessidade, para você saber qual tipo de matriz vai utilizar.

## Encerramento

Voltando para o nosso slide, era isso que a gente tinha para hoje. Tem também alguns exercícios para vocês praticarem, com exemplos de **soma e multiplicação de matrizes** e [trecho confuso no original, algo sobre a importância desse assunto em outra disciplina, "G.A."; verificar]. É isso que a gente tem para hoje. Bons estudos, um grande abraço e até a próxima.

## Avisos da aula

Há exercícios no material da disciplina sobre matrizes, incluindo soma e multiplicação de matrizes. Nenhum prazo ou prova foi mencionado.
