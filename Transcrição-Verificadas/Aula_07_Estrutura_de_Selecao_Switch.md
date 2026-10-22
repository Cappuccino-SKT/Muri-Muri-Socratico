# Aula 07 – Estrutura de Seleção `switch`

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Processor Memorial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

## Tópicos abordados

- Quando usar `switch` em vez de vários `if/else`
- Limitação: só funciona com variáveis `int` e `char`
- Sintaxe: `switch`, `case`, `break` e `default`
- Exemplo: menu de opções com `int` (cores)
- Versão com `char`: aspas simples e diferença entre maiúscula e minúscula
- Mais de um `case` para o mesmo `break` (o `break` não é obrigatório)

## Glossário

- **`switch`:** estrutura de seleção multicondicional; recebe o nome de uma variável (não uma condição) e compara o valor com cada `case`.
- **`case`:** cada valor possível da variável que se quer tratar, seguido de dois pontos e das instruções.
- **`break`:** encerra a execução do bloco do `case` e continua a execução fora do `switch`.
- **`default`:** caso padrão; executa quando o valor da variável não é igual a nenhum dos `case`.
- **Estrutura multicondicional:** estrutura com várias alternativas, como o `switch`.
- **Aspas simples (`'v'`):** em C, o valor de um `char` é escrito entre aspas simples, para diferenciá-lo do nome de uma variável.
- **Maiúscula × minúscula:** para o computador, `'V'` e `'v'` são valores diferentes.

---

## Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos aprender sobre a estrutura de seleção **`switch`**.

Na aula anterior aprendemos a estrutura de seleção `if/else`, que era muito útil quando eu queria resolver problemas que tinham duas alternativas diferentes. Porém, muitas vezes eu tinha que tratar 4 ou 10 alternativas diferentes. Nesse caso, apesar de eu poder aninhar a estrutura de `if/else`, um dentro do outro [trecho confuso no original], isso traz muita complexidade para o meu código. Uma solução que você pode utilizar nesse caso é uma estrutura **multicondicional** chamada `switch`. Porém, a gente vai ver que ela não é útil em todos os casos, pois **ela opera apenas com variáveis do tipo `int` e `char`**.

## Sintaxe do `switch`

[O professor mostra um slide com a estrutura.] Eu coloco a palavra `switch` e, entre parênteses, o nome da variável do tipo `char` ou `int`. Reparem que aqui eu **não tenho uma condição**, apenas o nome da variável. Em seguida abro o bloco de opções (chave). Dentro dele, coloco todos os valores, todos os casos disponíveis que eu quero tratar para o valor daquela variável que está lá em cima.

Então eu coloco a palavra `case`, seguida do valor possível daquela variável e de dois pontos. Ele vai comparar o valor da variável que está entre parênteses com o valor que você coloca na frente do `case`. Se o valor da variável for igual a esse, eu executo essas instruções. Para finalizar um caso, coloco a palavra `break`. **O que o `break` faz? Ele encerra a execução desse bloco e continua a execução fora do `switch`.** Em seguida vem outro `case`: outro valor possível, dois pontos, as instruções, `break`. E assim eu vou colocando quantos `case` eu quiser. Ele compara: esse valor é igual a esse? Faz isso. Esse valor é igual a esse outro? Faz isso. Existe limite de número de `case`? Não. Esse exemplo tem dois, mas pode ter 10, 20, 30 `case`, sem problema.

E se o valor da variável não for igual a nenhum dos casos? Nesse caso, tenho a opção do **`default`**, o caso padrão. Ele é o que eu vou executar caso nenhum `case` seja atendido, ou seja, quando o valor da variável não for igual a nenhum dos valores que estão na frente da palavra `case`.

```c
switch (variavel) {
    case valor1:
        // instruções
        break;
    case valor2:
        // instruções
        break;
    default:
        // executa se nenhum case for atendido
}
```

Vamos ver isso na prática. Nesse primeiro exemplo [slide], tem uma variável `char` chamada `opcao`, mostro as opções para o usuário e recebo o valor. Aí vem o `switch (opcao)`: repare, apenas o nome da variável. Abro a chave e coloco os casos aqui embaixo: aqui tem 3 casos. Se o valor da variável `opcao` for o do primeiro caso, eu executo isso e o `break` faz ele pular o resto; se for o do segundo, executa aquilo; se for o do terceiro, mostra qual opção foi escolhida e cai fora. [Trecho confuso no original.] Se não cair em nenhum `case`, vou executar o caso padrão: qualquer valor diferente de A, B ou C [verificar: o original diz "a vc"] vai cair no `default`, e ele mostra que a opção é diferente de A, B ou C.

## Exemplo: menu de cores com `int`

Vamos ver como fica no código. Eu tenho aqui um menuzinho, tipo de telemarketing. Eu costumo falar que a estrutura `switch` é muito boa para fazer esses menus de telemarketing: "1 para vendas, 2 para compras, 4 para fornecedores", e assim por diante.

Eu declaro uma variável `opcao`, nesse caso do tipo `int`, e mostro o menu com as opções: 1 para verde, 2 para amarelo, 3 para preto, 4 para branco [verificar: trecho confuso no original]. Recebo o valor em `opcao` e aqui coloco a minha estrutura `switch`: a palavra reservada `switch`, depois, entre parênteses, qual variável é responsável pela minha seleção, `opcao`, abre chave. Dentro, coloco os `case`: `case 1:`, que é só um valor inteiro, nesse caso, sem nenhuma marcação; se for igual, exibo "você escolheu o verde"; e, para finalizar o `case`, o `break`. Essa é a estrutura de uma das opções; agora faço as outras: 2 para amarelo, 3 para preto, 4 para branco. Eu coloquei 4 opções, mas poderia ser 5, 10, 20, quantas eu precisar.

E se o valor for diferente de 1, 2, 3 ou 4? Vou fazer qual caso? O **`default`**. Aqui eu posso exibir uma mensagem, por exemplo, "Opção inválida". E nesse caso, pessoal, o `break` não precisa estar aqui, porque o `default` está na última linha e o fluxo já vai sair do `switch`.

```c
int opcao;

printf("Escolha uma cor:\n");
printf("1 - Verde\n2 - Amarelo\n3 - Preto\n4 - Branco\n");
scanf("%d", &opcao);

switch (opcao) {
    case 1:
        printf("Você escolheu o verde\n");
        break;
    case 2:
        printf("Você escolheu o amarelo\n");
        break;
    case 3:
        printf("Você escolheu o preto\n");
        break;
    case 4:
        printf("Você escolheu o branco\n");
        break;
    default:
        printf("Opção inválida\n");
}
```

Vou executar esse programa para ver como fica: ele mostra o menu (1 verde, 2 amarelo, 3 preto, 4 branco). Digito 8: "opção inválida". Digito -7: "opção inválida". Qualquer valor diferente de 1, 2, 3 ou 4 mostra "opção inválida" também.

## Versão com `char`: aspas simples e maiúsculas × minúsculas

Agora vamos ver como ficaria fazendo o mesmo com `char`, e o que eu teria que mudar. Aqui `opcao` passa a ser `char`. Vou usar uma letra para cada cor: `v` para verde, `a` para amarelo, `p` para preto e `b` para branco [verificar: letras exatas, o original está confuso]. E uso `%c` no `scanf`, para fazer a leitura de um caractere.

Repare: aqui o `v` é de verde, mas eu **não quero me referir ao valor da variável `v`**; a variável `v` nem existe, eu não poderia fazer a estrutura assim. Então, para diferenciar do nome de uma variável, o valor do caractere vem **entre aspas simples**: `'v'`. Mesmo esquema para `'a'`, `'p'`, `'b'`.

Fazendo o teste: digito `v`, "você escolheu o verde"; digito `b`, "você escolheu o branco". Agora digito `V` maiúsculo e: "opção inválida". Por que deu isso? Repare que eu digitei o `V` **maiúsculo**: para o computador, o `V` maiúsculo é diferente do `v` minúsculo. Como resolver isso?

Uma primeira opção seria fazer **dois `case` por opção**: um para `'v'` e outro para `'V'`, cada um com o seu código [trecho confuso no original]. Mas então eu teria que pegar e duplicar todo o meu código? Não: tem uma solução mais tranquila. Lembrando que o `break` vai finalizar o bloco e ir lá para baixo, **o `break` não é obrigatório**: eu posso não colocar o `break` em alguns `case`. Por exemplo, eu tenho dois casos, `'V'` e `'v'`, e quero que os dois tenham o mesmo comportamento. Então faço **dois `case` para um `break`**: `case 'V':`, `case 'v':`, as instruções e o `break`. Ele entra no primeiro, passa para o segundo e executa as instruções, e só depois chega no `break`. Posso fazer isso para todos os casos.

```c
switch (opcao) {
    case 'V':
    case 'v':
        printf("Você escolheu o verde\n");
        break;
    case 'A':
    case 'a':
        printf("Você escolheu o amarelo\n");
        break;
    // ... demais cores, também com maiúscula e minúscula
    default:
        printf("Opção inválida\n");
}
```

Testando: `V` maiúsculo, funcionando; `v` minúsculo, funcionando.

Obviamente, pessoal, você teria um método que poderia converter essa entrada para maiúsculo e depois comparar só com maiúsculo, evitando as duas comparações [verificar: trecho confuso no original]. Mas eu queria exemplificar que **é possível fazer mais de um `case` para cada `break`**. O `break` não é obrigatório: apesar de ser muito comum ter sempre um `break` ao final de cada `case`, você pode fazer uso dessa não obrigatoriedade para obter um comportamento diferente no seu programa.

## Encerramento

Temos, para vocês, alguns exercícios para praticarem; deem uma olhadinha depois. É isso, um grande abraço, bons estudos e até a próxima!

## Avisos da aula

Há exercícios no material da disciplina sobre a estrutura `switch`. Nenhum prazo ou prova foi mencionado.
