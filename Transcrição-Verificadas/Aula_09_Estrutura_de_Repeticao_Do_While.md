# Aula 09 – Estrutura de Repetição `do-while` e Modificadores de Fluxo

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

## Tópicos abordados

- Diferença entre `while` e `do-while` (execução pelo menos uma vez)
- Sintaxe do `do-while` (com ponto e vírgula depois da condição)
- Exemplo: validar a idade digitada pelo usuário
- Modificadores de fluxo: `break`, `continue` e `goto`
- Cuidado: `continue` pode causar laço infinito
- Por que **não** usar `goto` (programação estruturada)

## Glossário

- **`do-while`:** "faça enquanto"; executa o bloco **pelo menos uma vez** e só depois testa a condição.
- **Modificador de fluxo:** palavra que altera o fluxo normal de execução do código (`break`, `continue`, `goto`).
- **`break`:** finaliza imediatamente a execução do laço, independente da condição.
- **`continue`:** ignora o restante do bloco de repetição e volta ao teste da condição.
- **`goto`:** "vá para"; interrompe incondicionalmente a execução e salta para outro ponto do código (para frente ou para trás). Não é indicado.
- **Label (rótulo):** nome de um lugar no código, escrito seguido de dois pontos (`inicio:`), usado como destino do `goto`.
- **Programação estruturada:** teoria segundo a qual sequência de comandos, estruturas condicionais e estruturas de repetição bastam para qualquer lógica de programa.
- **Laço infinito (*loop*):** laço que nunca termina.

---

## Introdução

Olá, pessoal, eu sou o professor Muriel e nesta aula vamos aprender sobre a estrutura de repetição **`do-while`**, além de alguns **modificadores de fluxo**.

Na aula passada aprendemos a utilizar a estrutura de repetição `while` e aprendemos que a primeira coisa que o seu código faz quando chega no `while` é **realizar o teste**. Porém, se esse teste for falso, o bloco de repetição que vem embaixo **não é executado nenhuma vez**. Algumas vezes eu quero garantir que, **pelo menos uma vez**, a minha estrutura de repetição seja executada. Nesse caso você pode utilizar a estrutura `do-while`: "faça alguma coisa enquanto a condição for verdadeira".

## Sintaxe do `do-while`

Temos a palavra `do` ("faça") antes do bloco de repetição, seguida de um bloco com os comandos que vão ser repetidos. Depois do bloco, coloco a palavra `while` e a condição. Nesse caso eu **finalizo com ponto e vírgula depois da condição**.

```c
do {
    // instruções
} while (condição);
```

Reparem que nesse caso o bloco de repetição vem **antes**: ele não faz nenhum teste, vai executar tudo o que está aqui dentro, uma vez pelo menos. E só depois ele executa o teste. Se for verdadeiro, volta lá no `do` e faz tudo o que está dentro; se for verdadeiro, faz de novo, enquanto a condição for verdadeira. Se for falso, cai fora.

**Exemplo: ler um valor positivo.** Declaro a variável do tipo valor e faço a estrutura `do-while`: ele vai ler **pelo menos uma vez** o valor do teclado. E enquanto o valor for negativo, eu peço novamente. Então, se o usuário digitar o primeiro valor de forma positiva, já cai fora, tendo executado pelo menos uma vez. Caso contrário, ele faz a repetição.

## Na prática: validando a idade

Na prática, tenho aqui um exemplo em que eu peço ao usuário a idade dele. Faz sentido o usuário digitar um valor negativo para a idade? Não. Então, pelo menos uma vez ele vai digitar a idade: coloco uma estrutura `do`, com o que eu quero que seja repetido, que é receber o valor da idade pelo teclado. E enquanto a idade for menor que zero, eu peço novamente [verificar: trecho confuso no original].

```c
int idade;

do {
    printf("Digite a idade: ");
    scanf("%d", &idade);
} while (idade < 0);
```

Repare: o bloco que vai ser executado na repetição está **antes** do `while`. Executei: "digite a idade": -8, pediu de novo; -15, pediu de novo. Enquanto digita valor negativo, ele pede de novo; quando digitei um valor positivo, ele aceitou. Agora, executando com um valor positivo logo de cara: ele recebeu uma vez só.

## Modificadores de fluxo

Continuando a nossa aula: às vezes eu quero **alterar o fluxo normal de execução** do meu código. Em geral, o código executa de acordo com a condição, enquanto a condição for verdadeira. Porém, existem algumas palavras, alguns **modificadores**, que podem alterar esse fluxo.

### `break`

Um deles a gente já viu: o `break`. Lembra o que ele fazia no `switch`? Ele saía do bloco do `switch` quando chegava no `break`. Posso utilizá-lo no laço? Pode. O que o laço vai fazer? Independente da condição, se eu estou dentro do laço e encontrei o `break`, ele vai **finalizar a execução do meu laço**. Não importa a condição, não importa nada: chegou no `break`, ele finaliza.

Vamos olhar. Aqui eu tenho um laço com a condição "`i` menor que 10" e um `i++`. Aqui eu faço um teste: se `i` for igual a 5, `break`.

```c
int i = 1;

while (i < 10) {
    if (i == 5) {
        break;
    }
    printf("%d\n", i);
    i++;
}
```

Olha lá: mostra 1, 2, 3, 4 e `break` [verificar: o original não deixa claro se `i` começa em 0 ou em 1]. Apesar de a condição do meu laço ser "menor que 10", ele iria até 9, mas quando `i` chegou a 5, ele executou o `break` e saiu. O último valor mostrado é o 4, porque ele chegou nesse `if` antes de mostrar.

### `continue`

Tenho outro modificador, o **`continue`**. Ele vai **ignorar o restante do meu bloco de repetição** e voltar lá para o teste novamente. Vamos usar no nosso código: naquele exemplo, vou trocar esse `break` pelo `continue`. O que vai acontecer? O laço vai até 9, mas sempre que `i` for igual a 5, `continue`: ele ignora o restante do meu bloco e vai lá para o teste. Só que `i` continua valendo 5; 5 é menor que 10, ele testa de novo, `i` é 5, `continue`... Então, repare: nesse caso **o meu programa está em loop**.

```c
// versão com laço infinito: i nunca sai de 5
if (i == 5) {
    continue;
}
```

Se eu quiser fazer funcionar, posso colocar a atualização do meu contador antes do `continue`. Executando a saída: 1, 2, 3, 4, 6, 7, 8, 9. Por quê? Porque quando chegou em 5, o `i++` faz ele passar a valer 6, e o `continue` faz com que ele **não mostre o 5**: ele vai lá para cima e testa: 6 é menor que 10; 6 é igual a 5? Falso. Mostra o 6, mostra o 7, o 8, o 9, e assim por diante.

```c
int i = 1;

while (i < 10) {
    if (i == 5) {
        i++;        // atualiza o contador antes do continue
        continue;   // volta ao teste sem mostrar o 5
    }
    printf("%d\n", i);
    i++;
}
```

### `goto` (não use)

O último tópico da aula de hoje é o famoso **`goto`**. Não é para utilizar; é mais para conhecimento, porque se você vir algum outro código, tem que saber o que é e como funciona. O `goto` seria um "vá para": ele **interrompe incondicionalmente** o que está executando e vai para outro ponto do código, que pode ser para frente, para trás, em qualquer lugar.

Porém, **não é indicado usá-lo**. Lembra da teoria da **programação estruturada** que a gente está vendo: o sequenciamento dos comandos, junto com as estruturas condicionais e de repetição, são suficientes para fazer qualquer lógica de programa que eu quiser. Quando você usa `goto`, torna o código muito difícil de fazer manutenção e de entender. E é muito raro que valha a pena utilizá-lo; ele quebra muito a estrutura do programa. [Brincadeira do professor, trecho confuso no original: existe uma "lenda" de que cada vez que se usa `goto`, um panda fica muito triste – verificar.]

Vamos olhar no código como é esse "vá para". Aqui eu tenho um exemplo com uma variável `i` iniciando em 0, um `printf` do valor e um `i++`. Vou colocar dois **labels** (rótulos): o nome do lugar no código, seguido de dois pontos. Um no início, chamado `inicio:`, e outro no final, chamado `final:`. Posso, por exemplo, fazer o código chegar aqui e mandar de volta para o início: `goto inicio;`. Ele vai passar por aqui, executar isso, chegar aqui, ir para o início, de novo e de novo. Vamos ver: o meu código vai voltando lá para cima toda vez que chega no `goto`, eternamente.

E se eu quiser que esse `printf` repita apenas 10 vezes? Eu posso colocar, antes do `printf`, "se `i` for igual a 10, `goto final`", onde `final` é o nome do rótulo. Executando, olha lá: ... 8, 9. Ele chega aqui: `i` é igual a 10? Não, não vai entrar no `goto`. (Só faltou a chave; lembra: quando tem apenas um comando, não precisa das chaves.) Chegou aqui, `i++`, vai para o início. Vale 2, vale 3, 4, 5, ele vai repetindo isso até que `i` vale 10: `goto final`, vai para o final e finaliza. Ok?

```c
int i = 0;

inicio:
    if (i == 10) goto final;
    printf("%d\n", i);
    i++;
    goto inicio;

final:
    return 0;
```

[Código reconstruído a partir da fala; verificar.] Mas atenção: [trecho confuso no original, algo como "um professor vai achar ruim se você usar `goto`"]. **Jamais, nunca utilize `goto`.**

## Encerramento

Voltando ao nosso código, eu deixei também para vocês alguns exercícios para praticarem. Ok? É isso, pessoal. Bons estudos, um grande abraço e até a próxima.

## Avisos da aula

Há exercícios no material da disciplina sobre `do-while`, `break`, `continue` e `goto`. Nenhum prazo ou prova foi mencionado.
