# Aula 18 – Recursividade

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Próximo Murial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O texto foi reconstruído com apoio dos slides da Aula 18 (`Material-Ensino-Verificado/Aula_18_Recursividade.md`). Os códigos foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

## Tópicos abordados

- Conceito de recursão (exemplo do vaso de flores)
- Caso base e chamada recursiva
- Exibir números de N até 1: versão iterativa × recursiva
- Vantagens e desvantagens da recursão
- Simulação da pilha: caminho de ida e de volta (`recursao(4)`)
- Recursão com retorno: soma de 1 até N
- Recursão de cauda [ver nota de correção]

## Glossário

- **Recursão:** processo definido a partir dele mesmo; uma função recursiva chama a si mesma.
- **Caso base:** situação em que a função **não** faz nova chamada recursiva; garante que a recursão termine.
- **Chamada recursiva:** a chamada da função a si mesma, com parâmetros que se aproximam do caso base.
- **Solução iterativa:** solução com laços de repetição (`for`, `while`).
- **Empilhamento / desempilhamento:** as chamadas ainda não finalizadas ficam guardadas em uma pilha (ida) e são retomadas na ordem inversa (volta).
- **Recursão de cauda:** quando a chamada recursiva é a **última operação** da função.

---

## Introdução: o que é recursão

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos aprender sobre **recursividade**.

O conceito de recursão é um **processo que é definido a partir dele mesmo**. Por exemplo, como eu faria a tarefa de **esvaziar um vaso que tem três flores**? Posso dizer que, para esvaziar um vaso com três flores, a pessoa deve retirar uma flor e depois esvaziar um vaso com duas flores. Repare: para fazer a tarefa de esvaziar um vaso, eu preciso esvaziar um vaso.

Mas como eu esvazio o vaso com duas flores? Tiro uma flor e depois esvazio um vaso com uma flor. E o vaso com uma flor? Retiro uma flor e depois esvazio um vaso com zero flores. E como esvazio um vaso com zero flores? **Por definição, um vaso com zero flores já está vazio.** É o que chamamos de **caso base** da nossa recursão.

Generalizando a solução recursiva: para esvaziar um vaso com N flores, **se o vaso já está vazio**, não há nada a fazer (caso base). **Caso contrário**, tiro uma flor e esvazio um vaso com N − 1 flores. A cada vez que chamo a função, ela fica **mais próxima do caso base**.

## Função recursiva

Trazendo para o código: uma **função recursiva** é uma função que **chama ela mesma**. Dentro da função `recursao`, estou chamando a função `recursao`. Mas isso não vai entrar em *loop*? Tem alguma vantagem? Vamos entender.

Até agora, na disciplina, utilizamos estratégias **iterativas**, com laços de repetição. Por exemplo, esta função exibe todos os números de `valor` até 1; se eu passar 5, ela mostra 5, 4, 3, 2, 1:

```c
void exibeNumeros(int valor)
{
    for (int i = valor; i >= 1; i--) {
        printf("Valor de i: %d\n", i);
    }
}
```

Dá para fazer isso de outra maneira, sem repetição? Sim, por **recursividade**. Para exibir os números de 5 até 1, eu exibo o 5 e depois exibo todos os números de 4 até 1. Para exibir de 4 até 1, exibo o 4 e depois de 3 até 1. E assim por diante, até exibir de 1 até 1: exibo o 1, que nesse caso é o **caso base**.

Primeiro testo o caso base: quando o valor vale 1, só exibo aquele valor e acaba a função. Caso contrário, exibo o valor e logo em seguida faço a **chamada recursiva**, passando `valor - 1`.

As duas partes principais de uma função recursiva são:

- **Caso base:** não há nova chamada; o problema já está resolvido e garante que a solução termine.
- **Chamada recursiva:** muda os parâmetros para que se aproximem do caso base. Se eu não alterar o valor, ela vai continuar em *loop*.

## No código: exibir números recursivamente

```c
void exibeNumeros(int valor)
{
    if (valor == 1) {                 // caso base
        printf("%d\n", valor);
    } else {                          // caso recursivo
        printf("%d\n", valor);
        exibeNumeros(valor - 1);      // chamada recursiva
    }
}
```

[Código reconstruído; o slide usa `valor <= 1` como caso base.] Se eu chamasse `exibeNumeros(valor)` sem diminuir, ele mostraria 5, chamaria de novo com 5, mostraria 5... e entraria em *loop*. Por isso atualizo para `valor - 1`.

Simulando com 5: 5 é igual a 1? Falso. Mostra o 5 e chama com 4. 4 é igual a 1? Falso. Mostra o 4 e chama com 3. E assim até chegar em 1: verdadeiro, mostra o 1. Executando: **5, 4, 3, 2, 1**.

## Vantagens e desvantagens

**Vantagens:** é uma solução mais elegante, menor e mais direta que a iterativa; deixa mais clara a solução do problema; elimina a necessidade de controlar manualmente as variáveis da repetição.

**Desvantagens:** tende a usar **mais espaço na memória RAM**, porque vai **empilhando** as chamadas recursivas ainda não finalizadas; pode ser **mais lenta**; e, se houver algum erro, é **mais difícil de depurar**.

## Ida e volta: exibir de N até 1 e de 1 até N

E se eu quiser que o código exiba os números de N até 1 e **também** de 1 até N? Posso fazer isso na mesma função recursiva? Pode. Antes eu tinha só a chamada recursiva; agora coloco um `printf` **depois** dela. Ele só vai ser executado depois que a chamada recursiva terminar.

```c
void recursao(int a)
{
    if (a > 0) {
        printf("%d ", a);
        recursao(a - 1);
        printf("%d ", a);
    } else {             // caso base
        printf("\n");
    }
}
```

Simulando o **caminho de ida** com `recursao(4)`: `a` vale 4, exibe 4 e faz a chamada recursiva com 3. Exibe 3 e chama com 2. Exibe 2 e chama com 1. 1 é maior que 0? É: exibe 1 e chama `recursao(0)`. `recursao(0)` é o nosso **caso base**: apenas exibe uma quebra de linha.

Ele terminou esse, mas **não terminou todas as chamadas que ficaram empilhadas antes**. Agora vem o **caminho de volta**: quem chamou `recursao(0)` foi a chamada com `a = 1`, então ela continua de onde parou e executa o segundo `printf`. Nesse escopo, quanto vale `a`? Vale **1**, então exibe 1. Essa termina e volta para quem a chamou, onde `a` vale **2**: exibe 2. Depois volta para a chamada onde `a` vale 3, exibe 3; e por fim para a chamada onde `a` vale 4, exibe 4.

Resultado: exibi todos os números de 4 até 1 e depois de 1 até 4. No código, com 5, a saída é **5 4 3 2 1** e depois **1 2 3 4 5**.

## Recursão com retorno

Até agora as funções recursivas não tinham valor de retorno, mas podem ter, sem problema nenhum. Posso usar o valor retornado pela função recursiva para ir **acumulando** e compor um resultado final. Por exemplo, somar todos os números de 1 até N de maneira recursiva:

```c
int somaNumeros(int valor)
{
    if (valor == 1) {            // caso base: a soma de 1 até 1 é 1
        return 1;
    } else {                     // caso recursivo
        return valor + somaNumeros(valor - 1);
    }
}
```

A soma até 5 é igual a 5 mais a soma até 4; e assim vou reduzindo o valor até chegar no caso base.

O professor comenta, neste ponto, que a chamada recursiva está na última linha e que isso seria uma **recursão de cauda**, com ganho de memória, e que é uma boa prática sempre que possível.

> **[Nota de correção — verificar com o professor]** `somaNumeros` **não** é uma recursão de cauda: embora a chamada esteja na última linha, depois que ela retorna ainda é preciso fazer a soma `valor + ...`. Recursão de cauda exige que a chamada recursiva seja a **última operação** (o resultado é devolvido sem nenhuma conta adicional), por exemplo `return somaCauda(valor - 1, acumulado + valor);`. Ver `Material-Ensino-Verificado/Aula_18_Recursividade.md`.

## Simulação da soma

Chamando `somaNumeros(6)`, ele vai calcular a soma de todos os números de 1 até 6:

- **Empilhando:** `soma(6)` é caso base? Não: é 6 + `soma(5)`. 5 é caso base? Não: 5 + `soma(4)`. Depois 4 + `soma(3)`, 3 + `soma(2)`, 2 + `soma(1)`.
- **Caso base:** `soma(1)` = 1. Repare que até agora **nenhuma conta foi feita**: só fui empilhando as chamadas.
- **Desempilhando:** `soma(2)` = 2 + 1 = **3**; `soma(3)` = 3 + 3 = **6**; `soma(4)` = 4 + 6 = **10**; `soma(5)` = 5 + 10 = **15**; `soma(6)` = 6 + 15 = **21**.

## No código e cuidados

Toda função recursiva **tem que ter o caso base** e **tem que ter o caso recursivo**, e na chamada recursiva você precisa **alterar os parâmetros** de forma que, em algum momento, eles cheguem ao caso base. Caso contrário, sua função recursiva **entra em *loop***, o que obviamente não é desejado.

Executando `somaNumeros(5)`: a soma é **15**. E com 6, o exemplo do slide, a soma é **21**.

## Encerramento

Com isso finalizamos a aula. No material há exercícios para vocês praticarem. E não se esqueçam: *para entender a recursão, é preciso entender a recursão...* (o professor repete a frase algumas vezes como piada e depois "retorna", como um caso base). Um grande abraço, bons estudos e até a próxima!

## Avisos da aula

O professor menciona exercícios no material [verificar: o PDF da Aula 18 não contém lista de exercícios]. Nenhum prazo ou prova foi mencionado.
