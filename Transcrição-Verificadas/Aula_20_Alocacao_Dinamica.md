# Aula 20 – Alocação Dinâmica

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "produção brilho"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O texto foi reconstruído com apoio dos slides da Aula 20 (`Material-Ensino-Verificado/Aula_20_Alocacao_Dinamica.md`). Os códigos foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar]. Um trecho no meio da explicação de matrizes está **ininteligível** na transcrição original (texto sem sentido).

## Tópicos abordados

- Como o programa usa a memória: pilha (*stack*) e *heap*
- Organização da memória de um programa; estouro de pilha
- Quando usar *stack* e quando usar *heap*
- O que é alocação dinâmica
- `malloc`, `sizeof`, verificação de `NULL`
- `calloc`, `realloc`, `free`
- Alocação e liberação de matrizes
- Alocação de uma struct e de um vetor de structs

## Glossário

- **Pilha (*stack*):** região onde ficam as variáveis locais das funções; estrutura LIFO (último a entrar, primeiro a sair).
- **Heap:** região de memória não gerenciada automaticamente, usada pela alocação dinâmica.
- **Estouro de pilha (*stack overflow*):** quando a pilha não tem mais espaço para crescer e o programa é finalizado.
- **Alocação dinâmica:** reservar memória na *heap* em tempo de execução e liberá-la explicitamente.
- **`sizeof`:** operador que retorna o tamanho, em bytes, de um tipo ou estrutura.
- **Cast:** conversão de tipo, por exemplo de `void*` para `int*`.

---

## Introdução: pilha (*stack*)

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos falar sobre **alocação dinâmica**. Para isso, precisamos entender melhor como o nosso programa usa a memória.

Sempre que criamos variáveis e estruturas locais, elas são colocadas em uma estrutura chamada **pilha**. O que é uma pilha? É uma estrutura em que os novos elementos são colocados **sempre no topo**, e sempre retiramos o elemento do topo, assim como uma pilha de pratos. Também é chamada de **LIFO** (*Last In, First Out*): o último a entrar é o primeiro a sair.

Durante a execução de cada uma das funções, inclusive a `main`, todas as variáveis declaradas internamente são colocadas nessa pilha. Assim que a função finaliza, ela é retirada da pilha. Por exemplo, no fatorial: chamou a `main`, depois `fatorial(3)` (empilhou), `fatorial(2)` (empilhou), `fatorial(1)` (empilhou). Terminou de rodar `fatorial(1)`, ele é desempilhado e sai da memória.

## Heap

Outra região que temos é a **heap**, uma região nova para nós. *Heap* seria um "monte", um aglomerado de coisas. Geralmente é **maior** que a *stack*. É uma região que **não é gerenciada automaticamente**, diferente da pilha: o programador precisa usar a **alocação dinâmica**, ou seja, dizer explicitamente "reserva um espaço" e "libera um espaço".

Não existe restrição de tamanho na *heap*, a não ser a do hardware. Então podemos criar uma estrutura que cresce ou diminui conforme a necessidade e a demanda do programa. Uma desvantagem é que ela é **mais lenta** que a pilha. E qualquer valor que estiver na *heap* pode ser acessado por qualquer parte do programa, porém sempre **através de ponteiros**, que vimos na aula passada.

## Organização da memória

Considere esta barra como toda a região de memória utilizada pelo programa. Na parte de baixo ficam o **código**, as **constantes** e as **variáveis globais**, que ocupam a memória o tempo todo. Acima, a **heap** cresce de baixo para cima, e a **pilha** cresce de cima para baixo; no meio fica a área livre. Conforme a *heap* aloca, ela usa esse espaço; conforme libera, devolve. A pilha, conforme empilha chamadas, vai aumentando; conforme libera, vai voltando.

Se essas duas partes se encontrarem e a pilha não tiver mais espaço para crescer, temos o **stack overflow**, o famoso **estouro de pilha**: o programa é finalizado. Já na *heap*, quando não há mais espaço, as funções de alocação que veremos **retornam `NULL`**, indicando que não é possível alocar.

## *Stack* ou *heap*?

- **Stack:** normalmente quando estamos usando variáveis relativamente pequenas, que devem existir apenas durante a execução da função onde foram definidas.
- **Heap:** quando quero manipular valores relativamente grandes, quando quero que eles durem um longo período, e quando quero **aumentar ou diminuir** a quantidade de dados em tempo de execução, como vetores e matrizes de tamanho dinâmico.

## O que é alocação dinâmica

É uma técnica que permite ao programador criar variáveis **em tempo de execução**: alocar espaço na *heap*, manipular enquanto precisar e depois, explicitamente, liberar esse espaço. Permite usar a memória **sob demanda**: não preciso definir no código o tamanho do vetor; posso aumentar e diminuir o vetor ou a matriz conforme a necessidade, evitando desperdício de memória.

O espaço alocado fica reservado até eu liberá-lo. Depois de liberado, essa região fica disponível para outras partes do programa. Ao fechar o programa, toda a região de memória que ele ocupava na *heap* também é devolvida ao sistema operacional.

Na linguagem C usamos quatro funções básicas da biblioteca padrão (`stdlib.h`): **`malloc`**, **`calloc`**, **`realloc`** e **`free`**.

## `malloc`

A primeira é a `malloc` (*memory allocation*, alocação de memória). Ela recebe a **quantidade de bytes** a ser alocada [o professor diz "inteiro sem sinal"; o tipo real é `size_t`] e retorna um **ponteiro genérico** para a primeira posição da área alocada.

Para alocar espaço para mil caracteres: crio um ponteiro para `char` e chamo `malloc(1000)`, pois cada caractere ocupa um byte. Como a `malloc` retorna um ponteiro genérico, faço um **cast** para ponteiro de `char`, o mesmo tipo do ponteiro que criei:

```c
char *ptr;
ptr = (char*) malloc(1000);
```

E para números inteiros? O `int` pode ocupar 2 ou 4 bytes, dependendo da arquitetura. Por isso uso o **`sizeof`**, que retorna o tamanho de um tipo ou estrutura:

```c
int *ptr;
ptr = (int*) malloc(50 * sizeof(int));   // 50 × 4 = 200 bytes
```

O `sizeof` é muito útil com a `malloc` porque torna o código **independente de arquitetura**. Posso pegar o tamanho de um `char`, de um `int`, de um `float` e inclusive de uma estrutura que você criou: por exemplo, a estrutura `Ponto` (com `x` e `y` inteiros) ocupa **8 bytes**.

> **[Nota de verificação]** O professor se refere ao `sizeof` como "função"; tecnicamente é um **operador** da linguagem (por isso funciona com tipos e é calculado em tempo de compilação).

## Verificando `NULL`

Se não houver espaço disponível na *heap* (a memória é limitada pelo hardware, e pode já estar muito ocupada), a `malloc` retorna **`NULL`**. Então aloco e testo: se o ponteiro for igual a `NULL`, mostro "Erro: memória insuficiente" e posso finalizar o programa.

```c
int *ptr = (int*) malloc(5 * sizeof(int));
if (ptr == NULL) {
    printf("Erro: Memoria Insuficiente!\n");
    exit(1);
}
```

## `calloc`

Outra maneira é a função **`calloc`**. Ela faz praticamente a mesma coisa, mas a assinatura é diferente: recebe a **quantidade** e o **tamanho** de maneira separada. Para um vetor de 5 inteiros:

```c
int *ptr = (int*) calloc(5, sizeof(int));
```

> **[Nota de verificação]** Além da assinatura, há uma diferença importante não mencionada na fala: o `calloc` **inicializa toda a memória com zeros**; o `malloc` não inicializa (a memória contém lixo).

## `realloc`

Às vezes, durante a execução, preciso **aumentar ou diminuir** a área alocada para o vetor ou a matriz. Para isso uso o **`realloc`**: ele recebe o endereço da primeira posição previamente alocada e o **novo tamanho**, e retorna um ponteiro.

Por que retorna um ponteiro, se a área já estava alocada? Porque pode ser que, ao realocar, a região **mude de lugar** na *heap*, e a posição do primeiro elemento mude. Então ele sempre retorna o ponteiro para a primeira posição, e com isso atualizo o ponteiro no meu programa.

No exemplo do slide: alocamos 5 inteiros; depois realocamos `p` para **3** inteiros e atualizamos `p`; depois realocamos para **10** inteiros. Isso é a alocação **dinâmica**: posso aumentar ou reduzir a área de memória utilizada.

> **[Nota de verificação]** Ao aumentar para 10 posições, as posições novas **não são inicializadas** (contêm lixo). E o padrão `p = realloc(p, ...)` perde o bloco original se o `realloc` falhar e retornar `NULL`; o ideal é usar um ponteiro temporário. Ver material verificado.

## `free`

Uma coisa com que temos que nos preocupar: como temos controle total da memória, **toda memória que você alocar, você, programador, é responsável por liberar**. Para isso uso a função **`free`**, passando entre parênteses o ponteiro para a primeira posição da área que quero liberar. Caso contrário, esse espaço fica ocupado na *heap* e só é liberado quando o processo do programa for finalizado.

Mas o `free` não recebe o tamanho: como ele sabe quantos bytes liberar? Quando você faz um `malloc`, `calloc` ou `realloc`, internamente o programa mantém uma **tabela de alocação** que registra: "a região que começa no endereço tal tem tamanho tal". Assim, ele consulta a tabela para saber quantos bytes liberar.

## No código: alocando um vetor

Quero criar um vetor para 50 inteiros. Três formas que fazem a mesma coisa:

```c
int *ptr;

ptr = (int*) malloc(200);                   // 50 ints × 4 bytes (depende da arquitetura)
ptr = (int*) malloc(50 * sizeof(int));      // independente de arquitetura
ptr = (int*) calloc(50, sizeof(int));       // quantidade e tamanho separados
```

[No código do professor são três linhas alternativas; na prática usa-se apenas uma.]

E se precisar alterar o tamanho? Uso o `realloc`, passando o ponteiro para a primeira posição e o novo tamanho, `80 * sizeof(int)`: estou realocando o vetor de 50 para 80 posições. Como o vetor pode ter trocado de posição na *heap*, pego o ponteiro retornado, faço o cast para ponteiro de inteiro e atualizo `ptr`.

```c
ptr = (int*) realloc(ptr, 80 * sizeof(int));
/* ... usa ptr como um vetor normal ... */
free(ptr);
```

Depois posso usar normalmente, com um `for`, como fazia antes com vetores. E, quando terminar, **libero** com `free(ptr)`: como há a tabela de alocação interna, ele sabe exatamente quantos bytes liberar.

## Alocando matrizes

Lembra que uma matriz nada mais é do que um **vetor de vetores**? Para alocar um vetor, uso um ponteiro para inteiro; para alocar uma matriz, uso um **ponteiro para ponteiro para inteiro**.

Para uma matriz 4×4: o primeiro passo é criar um **vetor de ponteiros**, onde cada posição representa uma linha. Cada linha é um vetor, ou seja, um ponteiro para inteiro, então o tamanho de cada posição é `sizeof(int*)`. Depois, num laço `for`, percorro esse vetor de ponteiros alocando separadamente cada uma das linhas.

```c
int **matriz = (int**) malloc(4 * sizeof(int*));   // vetor de ponteiros (linhas)

for (int l = 0; l < 4; l++) {
    matriz[l] = (int*) malloc(4 * sizeof(int));    // cada linha
}
```

Para liberar, **primeiro** percorro todas as linhas dando `free` em cada uma (agora elas apontam para lixo, um valor indefinido) e, **depois** de liberar todas as linhas, dou o `free` no vetor de ponteiros:

```c
for (int l = 0; l < 4; l++) {
    free(matriz[l]);
}
free(matriz);
```

[Trecho ininteligível na transcrição original durante a demonstração no código; verificar.] Terminando de usar a matriz, percorro as linhas com `free` em cada uma e depois dou `free` na matriz principal, o vetor de ponteiros, liberando toda a memória.

## Alocando estruturas

Para alocar uma estrutura, uso o `sizeof`. Criei uma estrutura `Pessoa` com um nome de 50 caracteres (49 úteis, por causa do `'\0'`) e uma idade. Dou um `malloc(sizeof(Pessoa))`: ele calcula automaticamente quantos bytes precisa, aloca e retorna um ponteiro genérico, no qual faço o cast para `Pessoa*`.

Lembrem: quando a estrutura está alocada dinamicamente e é acessada por um **ponteiro**, cada membro é acessado com a **seta** (`->`), e não com o ponto.

```c
Pessoa *cadastro = (Pessoa*) malloc(sizeof(Pessoa));

strcpy(cadastro->nome, "Rosinosvalda");
cadastro->idade = 22;

free(cadastro);
```

E um **vetor** de estruturas? Muito parecido, só que agora `3 * sizeof(Pessoa)`. Para acessar, como uso o índice entre colchetes, o elemento **já está dereferenciado** (o colchete já resolve o endereço daquele elemento), então **não preciso da seta**: uso o **ponto**.

```c
Pessoa *vetCadastro = (Pessoa*) malloc(3 * sizeof(Pessoa));

strcpy(vetCadastro[0].nome, "Rosinosvalda");
vetCadastro[0].idade = 22;
/* ... */
free(vetCadastro);
```

## Encerramento

Com isso finalizamos esta aula. No material há exercícios para vocês trabalharem. Bons estudos, um grande abraço e até a próxima!

## Avisos da aula

Há exercícios nos slides (4 exercícios sobre alocação dinâmica). Nenhum prazo ou prova foi mencionado.
