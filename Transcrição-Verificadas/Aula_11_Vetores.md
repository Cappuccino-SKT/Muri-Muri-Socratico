# Aula 11 – Vetores

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Proversor Moriel"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

## Tópicos abordados

- Por que usar vetores (muitos dados do mesmo tipo)
- Declaração de um vetor e reserva de posições na memória
- Índice: começa em 0 e vai até tamanho − 1 (e por quê)
- Inicialização do vetor (com chaves, ou posição por posição)
- Percorrer o vetor com `for` para ler e exibir valores
- Exemplo completo: ler e exibir 5 idades
- Cuidado: ler e escrever fora dos índices permitidos

## Glossário

- **Vetor:** coleção de elementos do **mesmo tipo**, armazenados sequencialmente na memória e acessados por um único nome.
- **Elemento:** cada valor guardado no vetor ("caixinha").
- **Índice (posição):** número entre colchetes que identifica o elemento; começa em 0 e vai até tamanho − 1.
- **Tamanho:** quantidade de elementos reservados na declaração (`int notas[5];`).
- **Deslocamento:** distância, a partir do início do vetor, até a posição desejada; é o que o índice representa na prática.
- **Inicialização com chaves:** valores de todas as posições entre `{ }`, separados por vírgula; permite omitir o tamanho.
- **Acesso fora dos limites:** ler ou escrever em um índice que não existe no vetor; sobrescreve memória de outras variáveis.

---

## Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e na aula de hoje vamos aprender a trabalhar com **vetores**.

Até a aula passada, nós já aprendemos a utilizar estruturas de controle condicional e estruturas de repetição no nosso código. Mas a quantidade de informação, a quantidade de dados com que a gente estava trabalhando, era muito pequena. Como posso fazer se eu quiser armazenar e manipular uma **quantidade maior de elementos** no nosso programa? Por exemplo, eu sei calcular a média de 1 aluno, mas e se eu quiser calcular a média de 40 alunos? Ou saber a idade de 50 alunos de uma academia, por exemplo, ou ter uma lista de 100 produtos, mantendo ao mesmo tempo todos os valores na memória? Seria inviável fazer 40 variáveis, uma variável para cada aluno, ou 50 variáveis de preço para 50 produtos diferentes. A solução para isso é a utilização de **vetores**.

## O que é um vetor

No contexto da linguagem de programação, os vetores são utilizados para armazenar e processar uma **coleção de elementos do mesmo tipo**. Isso é muito importante: **todos eles têm que ser do mesmo tipo**, seja tudo `int`, tudo `float`, tudo `char`. Eles se comportam como uma lista de variáveis, e existe uma maneira de acessar cada um dos elementos dessa lista. Então eu consigo salvar uma lista de notas, uma lista de salários, sem problema nenhum. Eu posso pensar neles como uma lista, ou uma matriz de uma única linha [verificar: trecho confuso no original].

## Declarando um vetor

Na linguagem C, como eu faço isso na prática? Se eu quiser declarar um vetor de 5 posições, para 5 notas, por exemplo, eu coloco o tipo do meu vetor (`int`), o nome do meu vetor (`notas`) e, entre colchetes, a quantidade de elementos:

```c
int notas[5];
```

Quando eu faço isso, **eu não estou reservando apenas 1 variável do tipo `int`**. Eu estou reservando **5 caixinhas, 5 posições diferentes da memória**, para 5 valores ao mesmo tempo.

**Uma dica muito legal:** no nome da variável, eu costumo deixar no **plural**, como nesse exemplo, `notas`, porque, ao ver o nome no plural, você vai lembrar que ele armazena não apenas 1 valor, mas um conjunto de valores.

## Acessando os elementos: o índice

E, sendo que o nome é único, como eu faço para acessar cada elemento? Escrevo o nome do vetor, `notas`, seguido, entre colchetes, da **posição ou índice** do elemento. **O índice sempre começa em 0 e vai até o tamanho menos 1.** Nesse caso, se o tamanho é 5, os índices vão de 0 até 4 (5 − 1). Então eu reservei 5 caixinhas: `notas[0]`, `notas[1]`, `notas[2]`, `notas[3]` e `notas[4]`. Sempre dessa maneira: começando em 0 e indo até o tamanho menos 1.

**Mas por que começa em 0?** Vamos dar uma olhadinha na memória RAM. Quando você cria um vetor, todas as posições são armazenadas **sequencialmente**, sem nenhum buraco entre uma e outra. E, no fundo, o que você coloca entre colchetes é o **deslocamento**, do início do vetor até a posição que você quer. Para a primeira posição, o deslocamento é 0. Para a segunda posição, eu tenho que me deslocar 1 a partir do começo do vetor. Para a terceira posição, preciso me deslocar 2. E assim por diante.

## Inicializando um vetor

Como eu faço para inicializar o meu vetor? Faço a declaração normalmente, seguida do símbolo de igual, e coloco os valores de cada posição entre chaves, separados por vírgula. Por exemplo [valores do slide, verificar]: `idades[0]` recebe 2, `idades[1]` recebe 12, `idades[2]` recebe 1.

```c
int idades[] = {2, 12, 1};
```

Apenas nesse caso, quando você está inicializando **todos** os elementos do vetor, você pode **omitir o tamanho** do vetor, porque o computador vai saber quantos elementos tem e quantas posições reservar.

Fazer a inicialização dessa maneira é equivalente a fazer separadamente: na primeira linha eu declaro o vetor e, depois, faço as atribuições:

```c
int idades[3];

idades[0] = 2;
idades[1] = 12;
idades[2] = 1;
```

Repare: é uma atribuição como qualquer outra. Mas eu **não posso** dizer apenas "`idades` recebe 2": em qual das três posições do vetor eu quero salvar? Por isso preciso especificar o índice.

## Percorrendo o vetor com `for`

Se eu tiver muitos elementos, um vetor grande, de 50, eu não vou fazer um por um, nem com as chaves, nem separadamente. Nesse caso, posso fazer uma **estrutura de repetição** que vai percorrer todas as posições do meu vetor.

Se o seu vetor tem tamanho 5, os índices vão de 0 até 4: então um `for` com o índice começando em 0 e terminando em 4, ou seja, `i < 5`. A cada repetição, faço o `scanf` e mando salvar no endereço de memória do vetor `notas`, na posição `i`: na posição 0, na posição 1, na posição 2... Para exibir, faço outro `for`, também de 0 até 4, e a cada repetição dou um `printf`, mandando exibir quem? `notas[i]`. Eu não estou exibindo o valor do contador no segundo argumento: estou mandando exibir o valor que está no vetor `notas`, na posição `i`.

```c
int notas[5];
int i;

for (i = 0; i < 5; i++) {
    scanf("%d", &notas[i]);
}

for (i = 0; i < 5; i++) {
    printf("%d\n", notas[i]);
}
```

## Exemplo completo: ler e exibir 5 idades

Vamos ver como ficaria um exemplo da utilização de vetores.

**Passo 1: criar o vetor** [o original alterna entre "idade" e "idades"; usei `idades`, verificar]:

```c
int idades[5];
```

Quando eu faço isso, o que acontece na memória RAM? Eu tenho o nome da variável e o valor que está salvo dentro. Vai reservar 5 caixinhas: `idades[0]`, `idades[1]`, `idades[2]`, `idades[3]` e `idades[4]`. Reparem que essa declaração **não reservou uma posição** da memória RAM: ela reservou **5 posições** lá na memória RAM, que são identificadas pelo índice de 0 até 4.

**Passo 2: ler os valores.** O que eu tenho que fazer agora? Preciso de 5 valores, 5 caixinhas. Tenho um comportamento padrão que vai ser repetido 5 vezes, então vou fazer um `for`: o índice `i` começa em 0, enquanto `i` for menor que 5 (ou seja, até 4), atualizo de 1 em 1. Esse `for` percorre todas as posições. Aqui dentro peço ao usuário o valor com um `printf` e, em seguida, faço o `scanf`. Qual é o tipo da variável? Inteira, então `%d`, vírgula, `&` e onde eu vou salvar? No vetor `idades`. Repare que eu tenho 5 caixinhas: qual das 5 eu quero salvar? Na primeira repetição, a caixinha 0; depois a caixinha 1, a caixinha 2, e assim por diante. Quem varre de 0 até 4? O `i`. Então `idades[i]`.

```c
int idades[5];
int i;

for (i = 0; i < 5; i++) {
    printf("Digite a idade %d: ", i);
    scanf("%d", &idades[i]);
}
```

**Como seria a execução?** Da primeira vez que ele entra, `i` vale 0, então ele vai salvar em `idades[0]` o valor que o usuário digitar, por exemplo, 10. `i++`: 1 é menor que 5? Verdade, salva em `idades[1]`. `i++`: 2 é menor que 5? Salva em `idades[2]`. 3 é menor que 5, salva em `idades[3]`. 4 é menor que 5, salva em `idades[4]`. `i++`: 5 é menor que 5? Falso, sai do `for`. Reparem nessa estrutura de repetição: ele executa 5 vezes e, em cada vez, salva em uma posição diferente do meu vetor, preenchendo-o por inteiro.

**Passo 3: exibir os valores.** Se eu quiser exibir agora esses valores, como vai ficar? Eu tenho que percorrer de novo os valores para dar um `printf` em cada um deles. Então faço outro `for`: o índice começa em 0, condição `i < 5`, `i++`. Aqui dentro eu só exibo `idades[i]`.

```c
for (i = 0; i < 5; i++) {
    printf("%d\n", idades[i]);
}
```

Vamos executar para ver como fica: digito 10, 20, 30, 40, 50. Aqui estão os 5 valores, salvos na memória ao mesmo tempo.

Se eu quiser saber os índices em que eu estou salvando e depois exibir, posso exibir o valor de `i` também. Por exemplo, com dois `%d`: primeiro mostra a posição e depois mostra o valor que está naquela posição [verificar: trecho confuso no original].

```c
for (i = 0; i < 5; i++) {
    printf("idades[%d] = %d\n", i, idades[i]);
}
```

Olha lá: a posição 0 vale 10, a posição 1 vale 20, e assim por diante. Agora eu consigo exibir o índice de cada posição do meu vetor.

E se fossem 50 valores? É só mudar o tamanho do vetor para 50 e o `for` para ir de 0 até 49 [verificar: trecho confuso no original]. Eu criei espaço para salvar 50 valores na memória RAM, peguei cada um deles do teclado, salvei cada um em uma posição e depois exibi cada um na tela. Nesse instante, os 50 valores estão disponíveis para serem manipulados e consultados quando eu quiser.

## Cuidado: não ultrapasse os índices do vetor

Um cuidado que você deve ter, enquanto programador, ao trabalhar com vetores: **sempre garantir que o seu programa só vai ler e escrever dentro dos índices permitidos pelo vetor**.

Por exemplo, eu não poderia criar um vetor de tamanho 5 e percorrê-lo, para ler ou exibir, até o índice 49. O problema é que o compilador vai permitir que eu salve no índice 6, 7, 8, 9... aparentemente sem problema nenhum. Mas ele vai estar **sobrescrevendo posições de memória que pertenciam a outras variáveis**, e isso pode causar um comportamento inesperado, até mesmo para o seu programa.

## Encerramento

E, finalizando esse exemplo, finalizamos a aula de hoje. Tenho lá para vocês alguns exercícios para trabalharem. É isso, pessoal. Bons estudos, um grande abraço e até a próxima.

## Avisos da aula

Há exercícios no material da disciplina sobre vetores. Nenhum prazo ou prova foi mencionado.
