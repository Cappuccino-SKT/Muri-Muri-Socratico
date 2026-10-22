# Aula 19 – Ponteiros

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O texto foi reconstruído com apoio dos slides da Aula 19 (`Material-Ensino-Verificado/Aula_19_Ponteiros.md`). Os códigos foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar]. Endereços de memória citados na execução estão parcialmente ininteligíveis.

## Tópicos abordados

- Relembrando variáveis: nome, conteúdo e endereço de memória
- O que é um ponteiro; declaração e inicialização com `NULL`
- Referenciação (`&`) e dereferenciação (`*`)
- Atribuição entre ponteiros (mesmo tipo)
- Aritmética de ponteiros
- Comparação de ponteiros × comparação de conteúdos
- Ponteiro genérico (`void*`)
- Ponteiros e vetores
- Ponteiro para ponteiro

## Glossário

- **Endereço de memória:** número que identifica cada "caixinha" (byte) da memória RAM.
- **Ponteiro:** variável especial que armazena o **endereço de memória** de outro valor.
- **`NULL`:** valor usado para inicializar um ponteiro que ainda não aponta para nada (na maioria dos compiladores, o endereço 0).
- **Referenciação (`&`):** retorna o endereço de memória de uma variável.
- **Dereferenciação (`*`):** retorna o conteúdo armazenado no endereço apontado pelo ponteiro.
- **Aritmética de ponteiros:** somar/subtrair inteiros a um ponteiro; o deslocamento depende do tamanho do tipo apontado.
- **Ponteiro genérico (`void*`):** ponteiro que não especifica o tipo apontado; exige *cast* antes de ser dereferenciado.

---

## Relembrando variáveis

Olá, pessoal, eu sou o professor Muriel e nesta aula vamos conversar sobre os **ponteiros**.

Vamos começar relembrando o uso de variáveis na linguagem C. Sempre que declaro uma variável, reservo um espacinho na memória RAM que tem um **nome** (uma etiqueta), e esse espacinho também tem um **endereço de memória**: todas as caixinhas da memória RAM têm um número, que chamamos de endereço de memória. E dentro dele fica o **conteúdo**; por exemplo, um valor do tipo inteiro, que vai de aproximadamente −2 bilhões a +2 bilhões.

## O que é um ponteiro

O ponteiro nada mais é do que um **tipo de variável especial**, que vai salvar não um inteiro, mas **um endereço de memória onde está salvo um outro valor**.

```c
int *ptr;
```

`int`, espaço, o **asterisco** (que é o sinal de ponteiro) e o nome `ptr` (abreviação de ponteiro). Nesse caso, não estou reservando memória onde vai ser salvo um inteiro: estou reservando memória para **salvar o endereço de memória onde está salvo um inteiro**.

E a inicialização? Se eu quiser inicializar, uso `NULL`, que, na maioria dos compiladores, é o endereço de memória zero:

```c
int *ptr = NULL;
```

## Referenciação e dereferenciação

Quais operadores posso usar com ponteiros?

- **Referenciação — operador `&`:** o mesmo "e comercial" que usamos no `scanf`. Ele retorna o **endereço de memória** onde a variável está salva.
- **Dereferenciação — operador `*`:** de maneira oposta, retorna o **conteúdo** do endereço de memória para o qual o ponteiro aponta.

Resumindo em um gráfico: se tenho uma variável e uso o `&`, chego no endereço de memória onde ela está salva. Se tenho um ponteiro e uso o `*`, volto para o conteúdo da variável salvo naquele endereço.

Na simulação da memória RAM: tenho a variável inteira com o valor 15 no endereço `0xF060`, e um ponteiro para inteiro salvo no próximo endereço, cujo conteúdo é **o endereço onde a variável está salva**: `0xF060`.

## No código

```c
int variavel = 15;
int *ptr;

ptr = &variavel;   // ptr recebe o endereço de memória de variavel

printf("Valor da variavel: %d\n", variavel);
printf("Endereco da variavel: %p\n", &variavel);
printf("Valor do ponteiro: %p\n", ptr);
printf("Dereferenciando o ponteiro: %d\n", *ptr);
```

Para exibir endereços uso o **`%p`** (de ponteiro). Executando: o valor da variável é 15; o endereço de memória da variável aparece em **hexadecimal** (endereços sempre são exibidos assim); o valor do ponteiro é **exatamente o mesmo** endereço; e, quando uso o asterisco no ponteiro, ele dereferencia e resgata o valor de volta: 15.

## Atribuição entre ponteiros

Tenho dois ponteiros para inteiro, `ptr1` e `ptr2`. Posso dizer que `ptr2` recebe o endereço guardado em `ptr1`? **Pode**, porque são dois ponteiros do mesmo tipo. Agora, se `y` é um `float` e eu tento salvar o endereço de `y` em um ponteiro para inteiro, **não pode**: dá erro. Você pode atribuir de um ponteiro para outro, mas o tipo apontado tem que ser o mesmo.

```c
int *ptr1, *ptr2, x = 10;
float y = 20;

ptr1 = &x;     // OK
ptr2 = ptr1;   // OK: mesmo tipo
ptr1 = &y;     // ERRO: int* recebendo endereço de float
```

## Aritmética de ponteiros

Posso fazer contas com ponteiros? Posso **somar ou subtrair inteiros**: o ponteiro avança ou recua posições de memória. Quantas posições ele avança ao somar 1? Como é um ponteiro para inteiro, e o inteiro tem **4 bytes**, ele avança **4 endereços** de memória.

Por exemplo, se o endereço fosse 1500 e eu der `++`, ele vai para 1504. Se mandar avançar 15 posições, avança 15 × 4 = **60** endereços. Se subtrair 2, recua 2 × 4 = **8** posições.

Na prática, criei uma variável inteira, inicializei o ponteiro com o endereço dela e fui somando 1, somando 15 e subtraindo 2, exibindo os endereços em hexadecimal e em decimal. A variável estava em um endereço com final **48**; com `++`, foi 4 bytes para frente: **52**. Com `+15`, avançou 60 posições: **612**. Com `-2`, voltou 8 posições: **604** [verificar: os números ditos na transcrição estão parcialmente ininteligíveis; os valores acima seguem a conta 48 + 4 = 52, 552 + 60 = 612, 612 − 8 = 604].

Quanto o ponteiro avança ou recua **depende do tipo para o qual ele aponta**.

## Comparando ponteiros

Posso comparar ponteiros? Sim, com os operadores comuns, como `==`:

```c
int valor1 = 10, valor2 = 10;
int *ptr1 = &valor1;
int *ptr2 = &valor2;

if (ptr1 == ptr2) {
    printf("Ponteiros iguais!\n");
} else {
    printf("Ponteiros diferentes!\n");   // esta é a saída
}
```

Os dois ponteiros apontam para variáveis que têm o valor 10, **mas essas variáveis estão em endereços distintos**. Como estou comparando **endereços**, ele diz que os ponteiros são diferentes.

E se eu quiser comparar o **conteúdo** dos endereços apontados? Faço uma **dereferenciação**: `*ptr1 == *ptr2`. O conteúdo apontado por `ptr1` é 10, e o apontado por `ptr2` também é 10, então ele diz que os **valores são iguais**.

```c
if (*ptr1 == *ptr2) {
    printf("Valores iguais!\n");
}
```

## Ponteiro genérico (`void*`)

Preciso sempre especificar o tipo para o qual o ponteiro aponta? Não necessariamente. Posso criar um **ponteiro genérico**, que aponta para qualquer tipo, declarando-o como `void*`. Mas, sempre que for utilizá-lo, tenho que fazer um **cast** (a conversão) para especificar o tipo apontado. Por exemplo, se o valor é um inteiro: primeiro faço a conversão para ponteiro de inteiro e depois dereferencio.

```c
printf("Exibindo o valor: %d\n", *(int*)ptrGenerico);
```

O que muda com o ponteiro genérico é a **aritmética**: com um ponteiro para inteiro, o `++` somava 4 no endereço; ao incrementar um ponteiro genérico, ele avança **apenas 1** posição. Se estava em 1500, com `++` vai para 1501; com `+15`, para 1516; com `-2`, para 1514. É preciso levar isso em consideração.

> **[Nota de verificação]** Aritmética com `void*` não faz parte do padrão C; o GCC a aceita como extensão (tratando cada elemento como 1 byte). Ver `Material-Ensino-Verificado/Aula_19_Ponteiros.md`.

## Ponteiros e vetores

Uma coisa que não falamos quando estudamos vetores: **o nome do vetor funciona como um ponteiro para a primeira posição** do vetor. Lembra que o valor entre colchetes é o **deslocamento** a partir da posição inicial? É exatamente aritmética de ponteiros: pega a posição inicial do vetor e soma a quantidade que está dentro dos colchetes.

Posso salvar essa posição em um ponteiro? Pode, e **não preciso do `&`**, porque o nome do vetor já é convertido para o endereço da primeira posição.

```c
int vetor[5] = {10, 20, 30, 40, 50};
int *ptrVet = vetor;   // sem &

for (int i = 0; i < 5; i++) {
    printf("%d - %p\n", ptrVet[i], &ptrVet[i]);
}
```

Executando: os valores 10, 20, 30, 40, 50, e os endereços são **sequenciais** na memória RAM, com finais `30`, `34`, `38`, `3C`, `40` [verificar], avançando de 4 em 4 bytes (em hexadecimal, depois de `38` vem `3C`).

Posso não usar o colchete e usar aritmética de ponteiros para percorrer o vetor? Posso: `ptrVet + i` é a posição inicial mais o deslocamento; e, dereferenciando esse endereço, pego o conteúdo.

```c
for (int i = 0; i < 5; i++) {
    printf("%d\n", *(ptrVet + i));   // equivalente a ptrVet[i]
}
```

Executando, continua exibindo o conteúdo do vetor normalmente, sem colchetes.

## Ponteiro para ponteiro

Para finalizar: posso ter um ponteiro para ponteiro? Posso. Antes eu tinha uma variável e um ponteiro com o endereço dessa variável. Agora crio um ponteiro que aponta para o ponteiro que aponta para a variável:

```c
int x = 10;
int *ptr = &x;          // guarda o endereço de x
int **ptrPtr = &ptr;    // guarda o endereço de ptr (dois asteriscos)

printf("%d\n", x);         // 10: acesso direto
printf("%d\n", *ptr);      // 10: dereferencia uma vez
printf("%d\n", **ptrPtr);  // 10: dereferencia duas vezes
```

Na memória: `x`, que vale 10, está em um endereço; `ptr` guarda o endereço de `x` (`0xF060`); e `ptrPtr` guarda o endereço onde o próprio `ptr` está salvo (`0xF068` [verificar]). A linguagem C permite outros níveis: ponteiro para ponteiro para ponteiro, e assim por diante. Apenas usem com cuidado para não se perderem.

Executando: **10, 10 e 10**. O primeiro é o acesso direto pelo inteiro; o segundo, pelo ponteiro; o terceiro, dereferenciando duas vezes o ponteiro para ponteiro.

## Encerramento

Ok, pessoal, com isso finalizamos a aula de hoje. Nos slides há alguns exercícios para vocês praticarem. Bons estudos, um grande abraço e até a próxima!

## Avisos da aula

Há exercícios nos slides (6 exercícios sobre ponteiros). Nenhum prazo ou prova foi mencionado.
