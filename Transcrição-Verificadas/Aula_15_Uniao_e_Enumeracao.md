# Aula 15 – União (Union) e Enumeração (Enum)

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Mariau"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O texto foi reconstruído com apoio dos slides da Aula 15 (`Material-Ensino-Verificado/Aula_15_Union_e_Enum.md`). Os códigos foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar]. Um trecho perto do fim está ininteligível na transcrição original.

## Tópicos abordados

- Diferença entre estrutura (`struct`) e união (`union`)
- Sintaxe e uso de `union`; tamanho ocupado na memória
- Sobrescrita entre membros da união
- Quando usar `union`
- Enumerações (`enum`): sintaxe, valores padrão e valores definidos
- `enum` no `switch` (exemplo do menu de cores)
- Juntando tudo: `enum` + `union` + `struct` + `typedef`

## Glossário

- **União (`union`):** agrupamento de membros de tipos distintos que **compartilham a mesma região de memória**; só um deles guarda valor válido por vez.
- **Enumeração (`enum`):** tipo definido pelo usuário que restringe a variável a um conjunto de **constantes inteiras nomeadas**.
- **Enumerador:** cada constante de um `enum` (ex.: `SEGUNDA`, `DINHEIRO`).
- **Discriminador:** membro (geralmente um `enum`) que indica qual membro de uma união está válido.

---

## Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos falar sobre os tipos **união** e **enumeração**.

Na aula passada falamos sobre as estruturas, que são agrupamentos de variáveis de tipos distintos, compostas por membros que **coexistem**. Nesta aula vamos falar sobre as uniões. As uniões também são agrupamentos de variáveis de tipos distintos, só que **os membros não podem coexistir**.

## União × estrutura

Qual a diferença de uma união para uma estrutura? A **estrutura** armazena **simultaneamente** todos os membros na memória. Já a **união** armazena **apenas um membro de cada vez**: todos os membros compartilham a **mesma região de memória**.

Na linguagem C, a união é feita com a palavra reservada **`union`**. A sintaxe é: `union`, espaço, o nome da união e, entre chaves, todos os membros, igual fazíamos nas estruturas.

```c
union Uniao {
    char letra;
    int numero;
};
```

Nesse exemplo, só posso ter **ou** a letra armazenada **ou** o número armazenado, nunca os dois ao mesmo tempo. Essa declaração apenas **define o tipo** da união, mas não reserva espaço na memória, assim como acontecia nas estruturas. Depois de definida, posso declarar uma variável desse tipo: `union Uniao nome;`. Eu poderia também usar `typedef`, igual fazia com as estruturas, sem problema nenhum.

## Quanto espaço a união ocupa?

É igual às estruturas? **Não.** A união ocupa apenas o espaço do **membro de maior tamanho**. Por exemplo, aqui o `int numero` ocupa 4 bytes e o `char letra` ocupa 1 byte. Qual é o espaço que essa união vai ocupar? O do tipo de maior tamanho, o `numero`: vou reservar **4 bytes** na memória RAM para essa variável do tipo união.

## Salvando e exibindo valores

É muito parecido com a estrutura: faço a definição fora da `main`, declaro a variável e acesso os membros com o **ponto**.

```c
union Numero {
    int inteiro;
    float real;
};

int main()
{
    union Numero numero;

    numero.real = 3.14;
    printf("%f\n", numero.real);

    numero.inteiro = 15;
    printf("%d\n", numero.inteiro);

    return 0;
}
```

Qual é o problema e a principal diferença para a estrutura? Como **apenas um desses valores existe ao mesmo tempo** na memória RAM, quando eu defino `numero.inteiro`, estou **sobrescrevendo**, destruindo a informação que estava em `numero.real`. Escrevi um dos membros, destruí o outro. Na hora de exibir, ele exibe corretamente apenas o **último valor** escrito; se eu tentar exibir o `real` como `float` depois de escrever o inteiro, vai mostrar **lixo**.

## Quando usar `union`?

- Quando **não sei exatamente qual tipo de dado** vou armazenar (por exemplo, não sei se vou salvar um `int` ou um `float`), mas só preciso de um de cada vez.
- Principalmente quando quero **economizar memória**. Em alguns tipos de dispositivo a memória é bem restrita [verificar], então, em vez de deixar duas variáveis criadas ocupando espaço, uso uma união.

## No código: quantidade de um produto

Suponha que eu vá salvar os dados de um produto, mas não sei se a quantidade dele é calculada em **unidades** ou em **peso** (vendido a granel). Crio uma união `Quantidade` com os dois tipos: `int unidade` (por pacote) e `float peso` (a granel). Posso usar o `typedef` que aprendemos na aula passada para não ter que escrever `union` toda vez.

```c
typedef union {
    int unidade;
    float peso;
} Quantidade;

int main()
{
    Quantidade minha_quantidade;

    minha_quantidade.unidade = 15;
    printf("Quantidade: %d\n", minha_quantidade.unidade);   // 15

    minha_quantidade.peso = 23.8;
    printf("Quantidade: %.1f\n", minha_quantidade.peso);    // 23.8

    printf("Unidade: %d\n", minha_quantidade.unidade);      // lixo!
    return 0;
}
```

[Código reconstruído; verificar.] Repare: depois que escrevi o peso, se eu tentar mostrar as unidades, ele vai interpretar os bytes do `float` como `int`, e o valor exibido é um **lixo**, porque quando escrevo o 23,8 eu destruo o valor 15 que estava em `unidade`.

## Enumerações (`enum`)

O próximo recurso são os **tipos enumerados**. A enumeração também é um tipo definido pelo usuário, só que ela **define quais valores aquela variável pode assumir**: é um conjunto restrito de **constantes**.

A sintaxe é: `enum`, o nome da enumeração e, entre chaves, os possíveis valores separados por vírgula, terminando com ponto e vírgula. Automaticamente o compilador atribui inteiros às constantes: `VALOR1` vale **0**, `VALOR2` vale 1, `VALOR3` vale 2, e assim por diante.

Exemplo: quero uma variável que armazene **dias da semana**; ela só pode ter sete valores.

```c
enum Semana { DOMINGO, SEGUNDA, TERCA, QUARTA, QUINTA, SEXTA, SABADO };

int main()
{
    enum Semana hoje;
    hoje = QUINTA;

    if (hoje == SEGUNDA) {
        /* ... */
    } else if (hoje == TERCA) {
        /* ... */
    }
    return 0;
}
```

`enum Semana` é o tipo da minha enumeração; `hoje` é o nome da variável. Posso atribuir (`hoje = QUINTA`) e comparar normalmente.

## `enum` no `switch`

Posso usar no `switch`? Pode. Por exemplo, formas de pagamento que só podem ser de três tipos: dinheiro, cartão ou vale-refeição.

```c
enum FormaPagamento { DINHEIRO, CARTAO, VALE_REFEICAO };

enum FormaPagamento opcao = DINHEIRO;

switch (opcao) {
    case DINHEIRO:      /* ... */ break;
    case CARTAO:        /* ... */ break;
    case VALE_REFEICAO: /* ... */ break;
}
```

Seria equivalente a usar `case 0`, `case 1`, `case 2` com números inteiros, mas fica muito mais legível.

## Definindo os valores

Por padrão, o primeiro valor é 0, o segundo é 1, o terceiro é 2, e assim por diante. Mas, caso precise, você pode definir o valor inicial. Se eu quero que comece no 30: `VALOR1 = 30`, e automaticamente os próximos serão 31, 32, 33, 34.

Tem que ser sequencial? **Não.** Por exemplo: `VALOR1 = 15`; o seguinte, sem nada, é 16; `VALOR3 = 45`, consequentemente o próximo é 46; e o último, 70.

```c
enum nomeEnum { VALOR1 = 15, VALOR2, VALOR3 = 45, VALOR4, VALOR5 = 70 };
// 15, 16, 45, 46, 70
```

Quando não tem nada, ele faz a continuação do valor anterior, sempre contando de 1 em 1.

## No código: menu de cores

Tenho aqui o exemplo que usamos na aula de `switch` para fazer o menu de cores. Não quero ter que lembrar qual cor corresponde a `case 1`, `case 2`, `case 3`. Os valores possíveis para a variável de opção são apenas quatro, então crio uma enumeração de cores. Deixo em **maiúsculo**, porque são constantes:

```c
enum Cor { VERDE = 1, AMARELO, PRETO, BRANCO };
```

Repare que, se eu não definisse nada, `VERDE` receberia 0, `AMARELO` 1, `PRETO` 2 e `BRANCO` 3, o que **não corresponde** ao nosso menu (que começa em 1). Por isso falo que `VERDE` começa com 1; assim `AMARELO` é 2, `PRETO` é 3 e `BRANCO` é 4, igual ao menu.

Agora, em vez de lembrar o número de cada caso, escrevo `case VERDE:`, `case AMARELO:`, `case PRETO:`, `case BRANCO:`. Muito mais legível e simples. Executando, escolho 1 e aparece o verde; escolho 4 e aparece o branco: o programa continua funcionando normalmente, mas agora mais organizado.

Também é possível usar `typedef` com a enumeração, criando o tipo diretamente [trecho ininteligível na transcrição original; verificar]:

```c
typedef enum { VERDE = 1, AMARELO, PRETO, BRANCO } Cor;

Cor opcao;
```

## Juntando tudo

Neste último exemplo do slide, uso um tipo enumerado (`PESO` e `VOLUME`) que diz qual é o tipo de quantidade salvo em uma **união**, que é membro de uma **estrutura** definida usando **`typedef`**. Repare que estou usando nessa estrutura todos os recursos que vimos nas duas últimas aulas.

```c
typedef enum { PESO, VOLUME } TipoQuantidade;

typedef struct {
    char descricao[30];
    TipoQuantidade tipo;
    union {
        double volume;        // litros
        unsigned int peso;    // gramas
    } quantidade;
} Produto;
```

Pode parecer um pouco confuso para quem está vendo esse assunto pela primeira vez, mas com a prática vocês vão ver que é bem tranquilo, e essa estrutura é muito usada no dia a dia.

## Encerramento

Então é isso, pessoal. Tem alguns exercícios para vocês praticarem. Bons estudos, um grande abraço e até a próxima!

## Avisos da aula

O professor menciona exercícios para praticar [verificar: o PDF da Aula 15 não contém lista de exercícios]. Nenhum prazo ou prova foi mencionado.
