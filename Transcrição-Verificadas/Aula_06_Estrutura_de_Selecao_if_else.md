# Aula 06 – Estrutura de Seleção (if / else)

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Proso do Aguadiel"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor Atom na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

## Tópicos abordados

- Por que precisamos de caminhos alternativos no programa
- Estrutura `if` / `else` (o `else` é opcional)
- Condições: expressões relacionais (`==`, `!=`, `>`, `<`, `>=`, `<=`)
- Exemplo: maior ou menor de idade
- Operadores lógicos: E (`&&`), OU (`||`) e negação (`!`)
- Exemplo: adolescente (idade ≥ 12 **e** idade < 18)
- `if` aninhado (um `if/else` dentro de outro) e `else if`
- Indentação
- Quando as chaves podem ser omitidas
- Operador ternário

## Glossário

- **Estrutura de seleção:** estrutura que permite ao programa seguir caminhos alternativos, executando algumas linhas e outras não.
- **`if` / `else`:** palavras reservadas da linguagem; "se" a condição for verdadeira, executa um bloco; "senão", executa outro.
- **Condição:** expressão relacional que retorna verdadeiro ou falso (não existe outra possibilidade).
- **Operadores relacionais:** maior, menor, igual, diferente, maior ou igual, menor ou igual.
- **`==` × `=`:** `==` compara dois valores; `=` é atribuição (copia um valor para a variável).
- **Operadores lógicos:** combinam mais de uma condição na mesma expressão: E (`&&`), OU (`||`) e negação (`!`).
- **Bloco:** conjunto de instruções entre chaves `{ }`.
- **`if` aninhado:** estrutura `if/else` dentro de outra.
- **Indentação:** recuo do código dentro de cada bloco, para organizá-lo e facilitar a leitura e a manutenção.
- **`else if`:** `if` colocado logo após um `else`, na mesma linha.
- **Operador ternário:** forma compacta de seleção com três partes: `condição ? valor_se_verdadeiro : valor_se_falso`.

---

## Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos falar sobre a **estrutura de seleção**, o `if` e o `else`. Até agora, os nossos programas são capazes de receber informação pelo teclado, armazenar em variáveis, fazer uma conta e gerar uma saída. E todas as linhas do nosso programa são executadas, uma vez, obrigatoriamente.

Porém, na solução de alguns problemas, mais de um caminho pode ser necessário: eu tenho vários casos e, com isso, durante a execução, o programa pode seguir **caminhos alternativos**. Pode ter linhas do meu código que eu vou executar e outras que eu não vou executar. E é papel de quem escreve o código, ou seja, você, o programador, dar condições para o programa executar o caminho adequado para resolver o problema. Você não pode fazer um programa que resolve parcialmente o problema: para cada caso possível, ele tem que dar uma resposta; você não pode entregar uma solução parcial [verificar: trecho confuso no original].

E como a gente vai fazer isso? Através da estrutura `if` / `else`: em inglês, *if* é "se" e *else* é "senão". Se uma condição for verdadeira, eu faço uma coisa; senão, eu faço outra coisa.

## Sintaxe do `if` / `else`

[O professor mostra um slide com a estrutura.] Existem as palavras reservadas `if` e `else`. Eu coloco a estrutura `if` e, entre parênteses, uma **condição**, que vai me retornar verdadeiro ou falso.

```c
if (condição) {
    // executa se a condição for verdadeira
} else {
    // executa se a condição for falsa
}
```

Se a minha condição for verdadeira, eu vou executar o quê? Todo o código desse bloquinho, que começa na chave que abre e vai até a chave que fecha. Todas as instruções que eu colocar aqui só vão ser executadas se a minha condição for verdadeira. Ele segue esse caminho [azul, no slide], executa tudo o que está ali e, quando termina, na chave que fecha, **pula o bloco do `else`** e continua executando o que vem depois.

Se a minha condição for falsa, ele segue o outro caminho [vermelho, no slide]: **pula o primeiro bloco** e vem para o bloco do `else`, executando todo o conjunto de instruções que começa na chave aberta e fecha na chave seguinte.

[Trecho confuso no original.] Eu posso configurar para que, se a condição for verdadeira, ele faça isso e, se não for, eu não precise fazer nada. Então a parte do `else` em diante é uma **parte opcional**: você coloca se quiser.

## Como escrever a condição

Como se escreve essa condição, que me retorna verdadeiro ou falso? Para a gente, uma condição é uma **expressão relacional**, ou seja, que usa os **operadores relacionais** (maior, menor, igual, diferente) e retorna como resposta verdadeiro ou falso; não existe outra escolha.

| Operador | Significado |
|----------|-------------|
| `==` | igual |
| `!=` | diferente |
| `>` | maior |
| `<` | menor |
| `>=` | maior ou igual |
| `<=` | menor ou igual |

Exemplos [do slide, reconstruídos; verificar]: se a quantidade for igual a zero (`quantidade == 0`); se o divisor for diferente de zero (`divisor != 0`); se o salário for maior que 2000 (`salario > 2000`); se a quantidade de horas for menor que 23 (`horas < 23`); se a nota for maior ou igual a 6 (`nota >= 6`); ou se a produção for menor ou igual a 5 (`producao <= 5`).

**Atenção:** para comparar um valor com outro, uso **igual igual (`==`)**. Não confundir com o símbolo de igual simples (`=`), que é atribuição. Em `idade = 18`, estou copiando o valor 18 para a idade. Já `quantidade == 0` está fazendo uma pergunta: "o valor da quantidade é igual a zero?". Estou comparando, e isso vai retornar verdadeiro ou falso.

## Exemplo: maior ou menor de idade

Esse exemplo é um programa que recebe uma idade e diz se a pessoa é maior ou menor de idade. Peço a idade ("digite a sua idade"), uso o `scanf` com formato inteiro e `&idade` (o endereço de memória onde a variável está salva) e, então, testo.

```c
int idade;

printf("Digite sua idade: ");
scanf("%d", &idade);

if (idade >= 18) {
    printf("Você é maior de idade\n");
} else {
    printf("Você é menor de idade\n");
}
```

Olha lá, isso aqui é uma pergunta: o valor que o usuário digitou é maior ou igual a 18? Por exemplo, ele digitou 25. 25 é maior ou igual a 18, então ele executa esse primeiro bloco, que mostra na tela "Você é maior de idade". Se ele digitou 5: 5 é maior ou igual a 18? Falso, então ele pula esse primeiro bloco e executa o senão, o `else`, que exibe "Você é menor de idade".

[O professor mostra o mesmo fluxo de forma gráfica, em um fluxograma:] o programa chega no início, recebe o valor com o `scanf` e chega no `if`: se `idade >= 18` for verdadeiro, mostro que é maior de idade e termino; caso contrário, mostro que é menor de idade e termino.

**Na prática, no Atom.** Aqui eu já tenho um esqueletinho do código: declarei a variável `idade`, peço a idade e leio com o `scanf`. Agora vou fazer o esqueleto do `if`. **Uma dica para quem está começando:** eu faço primeiro o esqueleto do `if/else`: o `if`, os parênteses da minha condição, a chave do bloco para verdadeiro, o `else` e a chave do bloco para falso. É muito comum a gente se perder, porque vai ter fecha chave, fecha chave... Então, para quem está começando, é legal colocar um comentário `// else` indicando que essa chave fecha o `else`. E o editor também ajuda: quando eu coloco o cursor em cima de uma chave, ele marca com uma linha azul qual é a chave correspondente.

Esse é o esqueleto do meu `if`. Então: se a idade for maior ou igual a 18, "você é maior de idade"; senão, "você é menor de idade". Executando: digito 25; 25 é maior que 18, mostrou "você é maior de idade". Se a condição for falsa, ele pula o primeiro bloco e executa o segundo. Agora a idade 8: 8 é menor que 18, então "você é menor de idade".

## Operadores lógicos: E, OU e negação

Voltando ao slide, temos outros casos. Quando tiver uma **condição mais complexa**, por exemplo, para ser aprovado, a nota tem que ser maior ou igual a 6 **e** a frequência tem que ser de pelo menos 75% [verificar: o original diz "25%"]. Ou, para considerar alguém adolescente, a pessoa tem que ter mais de 12 anos e menos de 18. Para isso eu vou utilizar os **operadores lógicos**: quando quero combinar mais de uma condição dentro de uma mesma expressão condicional, uso os operadores **E**, **OU** e **negação**.

**Operador E (`&&`, dois e comerciais).** As duas condições têm que ser verdadeiras *ao mesmo tempo* para que a minha condição final seja verdadeira. No exemplo do slide (nota maior ou igual a 6 e frequência suficiente): as duas condições têm que ser verdadeiras ao mesmo tempo para que a saída seja verdadeira. Se uma delas for falsa, a saída é falsa; ela só é verdadeira quando as duas são verdadeiras.

| Condição 1 | Condição 2 | Condição 1 `&&` Condição 2 |
|------------|------------|----------------------------|
| verdadeira | verdadeira | verdadeira |
| verdadeira | falsa | falsa |
| falsa | verdadeira | falsa |
| falsa | falsa | falsa |

**Operador OU (`||`, duas barrinhas).** Vai ser verdadeiro se **pelo menos uma** delas for verdadeira. Falso ou falso: a saída é falsa. Verdadeiro ou falso: a saída é verdadeira. Falso ou verdadeiro: verdadeira. Verdadeiro ou verdadeiro: verdadeira. É uma coisa ou outra: basta que uma delas seja verdadeira para que a saída seja verdadeira.

| Condição 1 | Condição 2 | Condição 1 `\|\|` Condição 2 |
|------------|------------|------------------------------|
| verdadeira | verdadeira | verdadeira |
| verdadeira | falsa | verdadeira |
| falsa | verdadeira | verdadeira |
| falsa | falsa | falsa |

**Operador de negação (`!`, ponto de exclamação).** Ele inverte o valor: se a condição era falsa, passa a ser verdadeira; se era verdadeira, com o operador de negação passa a ser falsa [trecho confuso no original].

## Exemplo: adolescente (usando `&&`)

Como ficaria isso no código? Vamos pegar aquele exemplo do adolescente. Para ser adolescente, eu tenho que ter idade **maior ou igual a 12 e menor que 18**. No meu `if`: se a idade for maior ou igual a 12 (essa é uma condição) e a idade for menor que 18 (outra condição). Qual é a minha regra? As duas condições têm que ser verdadeiras para que a pessoa seja considerada adolescente. Basta uma delas? Nesse caso, não: têm que ser as duas, então uso o operador E (`&&`). Se as duas condições forem verdadeiras ao mesmo tempo, eu exibo na tela "Você é adolescente"; caso contrário, se uma dessas duas condições não for verdadeira, exibo "Você é criança ou adulto". Se eu não sou adolescente, só tenho duas opções: ou sou criança (tenho menos de 12) ou sou adulto (tenho mais de 18).

```c
if (idade >= 12 && idade < 18) {
    printf("Você é adolescente\n");
} else {
    printf("Você é criança ou adulto\n");
}
```

Vamos executar, testando com alguns valores:

- **15 anos:** "Você é adolescente", porque 15 é maior ou igual a 12 (verdadeiro) e 15 é menor que 18 (verdadeiro); verdadeiro E verdadeiro, a saída é verdadeira.
- **5 anos:** "Você é criança ou adulto", porque 5 é maior ou igual a 12? Falso. 5 é menor que 18? Verdadeiro. Falso E verdadeiro, a saída é falsa.
- **56 anos:** "Você é criança ou adulto", porque 56 é maior ou igual a 12 (verdadeiro), 56 é menor que 18 (falso); verdadeiro E falso, a saída é falsa; então ele vai para o `else` e executa "Você é criança ou adulto".

Repare que eu utilizo aqui um operador lógico para combinar duas condições diferentes, ok?

## `if` aninhado (um dentro do outro)

Às vezes pode acontecer de ter mais casos: por exemplo, eu quero separar os casos de criança, adolescente e adulto. São **três casos**, mas um `if/else` só separa em dois (verdadeiro e falso). Nesse caso, você vai utilizar mais de um `if/else`: vamos colocar um `if/else` dentro do outro. Repare nesse código que esse `if` está dentro desse outro `else`, que é maior.

Vamos ver na prática no editor. Eu tenho aqui o caso de adulto: recebi o valor da idade, em inteiro, e testo: se a idade for maior ou igual a 18, "você é adulto". Senão, sobram ainda dois casos: adolescente ou criança. Então, repare: já tem um `else`; o que eu faço dentro desse `else`? Eu faço outro `if`. Qual é a condição para ser considerado adolescente? A idade tem que ser maior ou igual a 12 [trecho inaudível?].

Em que caso eu vou executar esse `if` interno? Só se eu vim para o `else` do primeiro. Então, se ele veio para cá, **com certeza ele não é adulto**, com certeza a idade dele é menor que 18. Logo, eu **não preciso fazer o teste** de "menor que 18"; basta testar se a idade é maior ou igual a 12. Se for, exibo "Você é adolescente". E caso contrário, o que sobra? Se eu não sou adulto e não sou adolescente, só me sobrou ser criança; eu não preciso testar. Então `printf("Você é criança")`. Reparem: eu tenho uma estrutura `if/else` dentro de outra estrutura `if/else`.

```c
if (idade >= 18) {
    printf("Você é adulto\n");
} else {
    if (idade >= 12) {
        printf("Você é adolescente\n");
    } else {
        printf("Você é criança\n");
    }
}
```

Vamos fazer uma brincadeira. Entro 25: 25 é maior ou igual a 18, ele entra aqui, exibe "Você é adulto" e pula todo o `else`. Agora entro 15: 15 é maior ou igual a 18? Falso; ele vai para o `else` e testa: 15 é maior ou igual a 12? Verdadeiro, então exibe "Você é adolescente" [o original diz "você adulto e sente"] e pula o resto. Entro 5: 5 é maior ou igual a 18? Falso, vai para o `else`; 5 é maior ou igual a 12? Falso, vai para o `else`; chegou aqui, exibe "Você é criança". Dessa maneira, você pode combinar quantos `if` você quiser, um dentro do outro, sem problema nenhum. Só cuidado para não se perder nessa estrutura de chaves.

## Indentação

Reparem também que eu fiz uma coisa diferente nesse código: toda vez que eu abro uma chavinha, um bloco de código novo, o código dentro dela fica empurrado um pouquinho para frente. Isso se chama **indentação**, e serve para organizar o nosso código. Aqui eu consigo ver que essa estrutura de `if` está dentro desse bloco porque ela está alinhada para dentro, em relação à linha onde está o `else` externo.

Olha só como fica sem nenhuma indentação: fica difícil de entender, difícil de manter, e a qualidade do código cai. [Frase inaudível?.] Posso voltar ao código que eu tinha antes (Ctrl+Z): olha como ele é mais fácil de entender: dentro desse `if` só está esse `printf`; dentro desse `else` está essa estrutura de `if`.

E se eu quiser mais uma categoria? Por exemplo, o **bebê** [verificar: o original transcreveu "ggbb", "gbb"; pelo final da aula parece ser "bebê"]. Onde ele entraria? Se chegou até aqui, ou ele é criança ou é bebê. Então, aqui dentro desse `else`, coloco outra estrutura `if`: se a idade for maior ou igual a [limite que não aparece na transcrição], "Você é criança"; caso contrário, "Você é bebê". Ou seja, tenho um `if/else` dentro de outro `if/else`, dentro de outro `if/else`; olha só como eu consigo acompanhar o fechamento das chaves.

## Omitindo as chaves e `else if`

Há um único caso em que você pode **não colocar as chaves**: se o que estiver dentro do bloco for **um único comando**. Dentro desse `if` tem apenas um único comando, então eu poderia apagar essas chaves; dentro desse `else`, tem apenas uma única estrutura `if/else`, ou seja, apenas um bloco, então posso apagar essa chave também. Nesse caso é comum deixar na mesma linha, e essa estrutura a gente chama de **`else if`**. O mesmo vale aqui: dentro desse `else` tem apenas um `printf`, posso apagar; e assim por diante. Fica um código sem nenhuma chave.

```c
if (idade >= 18)
    printf("Você é adulto\n");
else if (idade >= 12)
    printf("Você é adolescente\n");
else
    printf("Você é criança\n");
```

[Com a categoria "bebê", seria mais um `else if`; o limite de idade não aparece na transcrição.]

Mas nem sempre a gente pode fazer isso, e **use esse recurso com muita calma, com muito cuidado**. Às vezes você acha que está ajudando tirando as chaves e acaba atrapalhando; de certa maneira, a chave também ajuda a organizar. Rodando o código, testando 25, 15, 8 e 2 [verificar: trecho confuso no original], ele responde adulto, adolescente, criança e bebê: funciona.

## Operador ternário

Para finalizar, vamos dar uma olhada em uma última estrutura, chamada **operador ternário**. Não é tão comum a pessoa utilizar, mas é legal vocês saberem, caso vejam um código, em algum livro ou material da internet, que utilize essa estrutura. É uma estrutura de seleção limitada, mas serve para alguns casos. Ele tem três partes: uma **condição**, depois o ponto de interrogação (`?`), o que você quer fazer quando for verdadeiro, e depois o que você quer fazer quando for falso.

Por exemplo, com um `if` comum: se a produção for menor que 200 [verificar: o original diz "dos lentos"], a meta recebe 0 (não bateu a meta); caso contrário, a meta recebe 1 (bateu a meta). Com o operador ternário, fica assim: a `meta` recebe o resultado da condição `producao < 200`; se for verdadeira, recebe 0; caso contrário, recebe 1.

```c
int meta, producao;

printf("Digite a produção: ");
scanf("%d", &producao);

meta = (producao < 200) ? 0 : 1;
printf("Meta = %d\n", meta);
```

Aqui eu tenho dois inteiros, `meta` e `producao`, e leio a produção. Tenho uma atribuição usando o operador ternário, que tem três partes. Qual valor a `meta` vai receber? A minha condição está aqui: se a produção for menor que 200, eu copio a parte verdadeira, o 0; se a minha condição for falsa, copio o 1. Vamos executar: produção de 100, meta 0, não bate a meta; produção de 500, meta 1, bate a meta.

## Encerramento

É isso, pessoal. Tem alguns exercícios aqui para vocês praticarem; resolvam esses exercícios. Um grande abraço, bons estudos a todos e até a próxima!

## Avisos da aula

Há exercícios no material da disciplina sobre a estrutura de seleção. Nenhum prazo ou prova foi mencionado.
