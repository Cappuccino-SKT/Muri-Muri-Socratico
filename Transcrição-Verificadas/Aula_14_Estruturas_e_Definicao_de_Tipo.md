# Aula 14 – Estruturas (Structs) e Definição de Tipo

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Proceum Memorial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. A transcrição automática desta aula está **muito degradada**; o texto foi reconstruído com apoio dos slides da Aula 14 (`Material-Ensino-Verificado/Aula_14_Structs.md`). Os códigos foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

## Tópicos abordados

- Estruturas homogêneas (vetores/matrizes) × heterogêneas (structs)
- Definição de uma `struct` e declaração de variáveis
- Acesso aos membros com o operador ponto (`.`)
- Inicialização e atribuição de estruturas
- Vetor de estruturas
- Estruturas aninhadas
- `typedef`: criando novos nomes de tipo

## Glossário

- **Estrutura (struct) / registro:** conjunto de variáveis de **tipos diferentes** relacionadas entre si, agrupadas sob um nome.
- **Membro / campo:** cada variável declarada dentro da estrutura.
- **Operador ponto (`.`):** acessa um membro de uma variável do tipo estrutura (`aluno.idade`).
- **Definição × declaração:** a definição ensina ao computador como é a estrutura (não reserva memória); a declaração cria a variável (reserva memória).
- **`typedef`:** cria um novo nome (apelido) para um tipo existente.

---

## Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos falar sobre **estruturas e definições de tipos**.

Em um programa, nós sempre vamos encontrar um conjunto de variáveis que estão relacionadas à realização de uma determinada tarefa, e é conveniente para nós, programadores, ter como agrupar essas variáveis. Nas aulas anteriores aprendemos a fazer isso com **vetores e matrizes**, que são estruturas **homogêneas**: agrupam valores do mesmo tipo. No entanto, se eu quiser uma estrutura **heterogênea**, ou seja, com tipos diferentes, e que eu possa identificar por um nome específico, podemos utilizar as **estruturas** ou **registros**.

## O que é uma estrutura heterogênea

É um conjunto de variáveis de tipos diferentes, mas que têm uma relação em comum; também conhecido como estrutura ou registro. Por exemplo, uma estrutura baseada nos dados de um aluno pode ter várias variáveis: o **nome**, a **idade**, o **peso** e a **altura** desse aluno. Essas variáveis são denominadas **membros** ou **campos** da estrutura. Estou criando uma variável que tem dentro dela várias outras variáveis: um vetor de caracteres para o nome, um inteiro para a idade, um `float` para o peso e outro `float` para a altura.

Essa estrutura permite que o usuário **defina um novo tipo de dados** a partir dos tipos primitivos que já existem na linguagem, como `int`, `char` e `float`.

## Definindo uma estrutura em C

Na linguagem C usamos a palavra reservada **`struct`** (abreviação de *structure*, estrutura em inglês), seguida de um espaço, do nome da estrutura e de um bloco de código entre chaves com a lista de todas as variáveis que a compõem, ou seja, todos os membros. Depois de fechar a chave, **precisa de um ponto e vírgula**. Atenção a esse ponto e vírgula, porque essa definição de estrutura é um comando.

```c
struct Aluno {
    char nome[50];
    int idade;
    float peso;
    float altura;
};
```

Quando eu faço a **definição** da estrutura, **ainda não estou reservando nada na memória RAM**: só estou ensinando ao computador quais são os membros daquela estrutura. A memória é reservada quando faço a **declaração**:

```c
struct Aluno aluno_1, aluno_2, aluno_3;
```

Agora sim estou reservando espaço na memória RAM para três alunos. Cada aluno tem um nome, uma idade, um peso e uma altura.

Por convenção, vamos sempre colocar o nome da estrutura com a **inicial maiúscula** e o restante em minúsculo [verificar].

## Acessando os membros

Para acessar os campos ou membros, utilizo o **operador ponto**: à esquerda, o nome da variável que representa a estrutura; à direita, o nome do campo que estou acessando. Por exemplo, `aluno_1.idade`, `aluno_1.peso`.

Resumindo:

1. Defino a estrutura: `struct`, espaço, nome da estrutura e, entre chaves, os membros (só ensina ao computador; não reserva memória).
2. Declaro uma variável: `struct`, nome da estrutura, espaço, nome da variável (agora reserva espaço na memória RAM).
3. Para acessar: o ponto.

## Inicializando e atribuindo

Assim como eu fazia com vetores, posso inicializar uma estrutura: coloco `=` e, entre chaves e separados por vírgula, o valor de cada campo **na ordem em que fiz a definição**. O nome é uma string, então vai entre aspas duplas.

```c
struct Aluno aluno = {"Rosinosberto", 53, 72.5, 1.64};
```

[verificar: na transcrição os valores ditos estão ininteligíveis; os valores acima são os do slide.]

Posso também **atribuir** uma estrutura a outra, como faria normalmente com variáveis:

```c
struct Aluno meu_aluno = {"Rosinosberto", 53, 72.5, 1.64};
struct Aluno seu_aluno;

seu_aluno = meu_aluno;   // copia todos os campos: nome, idade, peso e altura
```

Quando faço uma atribuição, **ele copia todos os campos da estrutura**.

## No código: criando e usando uma estrutura

Tenho aqui um código comum, sem utilizar estrutura, tratando de um aluno com nome, idade, peso e altura como variáveis separadas. Vou criar a estrutura **fora da `main`, antes dela**: `struct`, o nome `Aluno`, e entre chaves coloco os campos, finalizando com ponto e vírgula. Agora essas variáveis, que têm uma relação comum mas são de tipos diferentes, fazem parte da minha estrutura.

Já reservei memória? Ainda não: só ensinei ao computador que um aluno é composto de nome, idade, peso e altura. Para criar a variável, dentro da `main`: `struct Aluno aluno;`. Posso inicializá-la entre chaves:

```c
struct Aluno aluno = {"Rosinosberto", 56, 72.5, 1.68};   // [verificar valores]

printf("Nome: %s\n", aluno.nome);
printf("Idade: %d\n", aluno.idade);
printf("Peso: %.2f\n", aluno.peso);
printf("Altura: %.2f\n", aluno.altura);
```

E se eu quiser inicializar campo por campo, separadamente? Posso fazer `aluno.nome = "Rosinosberto";`? **Não posso**, porque estou copiando uma string, um vetor de caracteres. Nesse caso uso o que aprendemos na aula passada, o **`strcpy`** (primeiro quem vai receber, depois de onde está vindo). Os demais campos posso atribuir direto:

```c
strcpy(aluno.nome, "Rosinosberto");
aluno.idade = 56;
aluno.peso = 72.5;
aluno.altura = 1.68;
```

## Vetor de estruturas

Posso fazer um vetor de estruturas? Pode, sem problema nenhum. Se eu não quero salvar os dados de um cliente só, mas de três clientes, faço um vetor da estrutura `Cliente` com 3 posições, muito parecido com o que fazíamos antes:

```c
struct Cliente cadastros[3] = {
    {"Paulo Teste", "Rua do Torto, 1234", 56},
    {"Ze Roberto", "Rua dos Robertos, 4321", 65},
    {"Maria Carla", "Av. Sem Fundo, 778", 28}
};

cadastros[0] = cadastros[1];   // copia o Zé Roberto para a posição 0
```

Da mesma maneira que faço com vetores, ao copiar o cadastro do índice 1 para o índice 0, o Zé Roberto **sobrescreve** o conteúdo que havia antes (o Paulo Teste).

## Estruturas aninhadas

Posso criar estruturas mais complexas, uma estrutura dentro de outra? Pode. Por exemplo, o `Cadastro` tem nome e idade, mas supondo que eu queira guardar também o endereço, e o endereço em si é uma estrutura composta do nome da rua e do número:

```c
struct Endereco {
    char rua[31];
    int numero;
};

struct Cadastro {
    char nome[21];
    int idade;
    struct Endereco end;
};
```

Para acessar o membro mais interno, uso o ponto **duas vezes**, porque é uma estrutura dentro de outra:

```c
struct Cadastro cad;
cad.end.numero = 1234;
```

## No código: lendo um vetor de alunos

Neste exemplo, agora quem digita o nome, a idade, o peso e a altura é o usuário. No `scanf`, em vez de passar `&idade`, passo `&aluno.idade`, `&aluno.peso`, `&aluno.altura`; e para o nome uso o `fgets` em `aluno.nome`, fazendo os tratamentos do buffer que vimos na aula passada.

E para um vetor de estruturas? Não quero salvar só um aluno, quero salvar a sala inteira. Chamo a variável de `alunos`, no plural, com 3 posições, e coloco todo o código de leitura dentro de um laço `for` de 0 até 2 [verificar: o professor menciona usar um índice "sem sinal", `unsigned int`]. Onde vai o colchete? Eu tenho um vetor de alunos, então é `alunos[i].nome`, `alunos[i].idade`, `alunos[i].peso`, `alunos[i].altura`.

Depois de digitar a altura e dar Enter, o Enter fica no buffer e, ao voltar para ler o próximo nome, daria problema de "lixo". Por isso coloco mais um `setbuf` para limpar o buffer.

```c
struct Aluno alunos[3];

for (unsigned int i = 0; i < 3; i++) {
    printf("Nome: ");
    fgets(alunos[i].nome, 50, stdin);
    alunos[i].nome[strcspn(alunos[i].nome, "\n")] = '\0';
    printf("Idade: ");
    scanf("%d", &alunos[i].idade);
    printf("Peso: ");
    scanf("%f", &alunos[i].peso);
    printf("Altura: ");
    scanf("%f", &alunos[i].altura);
    setbuf(stdin, NULL);   // absorve o Enter deixado pelo scanf
}
```

[Código reconstruído; verificar.] Executando, recebi os três alunos e eles foram exibidos [verificar: nomes citados na execução estão ininteligíveis, algo como "Ana" e "José"].

## `typedef`: definição de tipo

Um recurso que ajuda muito na hora de utilizar estruturas é transformá-las em um **novo tipo**. Para isso uso o comando **`typedef`** (*type definition*, definição de tipo). A sintaxe é: `typedef`, espaço, tipo existente, espaço, novo tipo.

No caso de estruturas, uso o `typedef` diretamente na estrutura que estou criando. Como o nome da estrutura deixa de ser relevante, **posso suprimi-lo**, e coloco o nome do novo tipo no final, depois da chave:

```c
typedef struct {
    char nome[50];
    int idade;
    float peso;
    float altura;
} Aluno;

Aluno meu_aluno;   // não preciso mais escrever "struct"
```

Comparando:

```c
// Sem typedef                      // Com typedef
struct MeuCadastro {                typedef struct {
    char nome[21];                      char nome[21];
    char endereco[31];                  char endereco[31];
    int idade;                          int idade;
};                                  } MeuCadastro;

struct MeuCadastro X[10];           MeuCadastro X[10];
```

Agora, assim como eu tenho os tipos `int`, `char` e `float`, eu tenho o tipo `Aluno`, composto por quatro campos: nome, idade, peso e altura.

## Encerramento

Com isso finalizamos a aula de hoje. Nos slides há exercícios para vocês praticarem. Um grande abraço, bons estudos e até a próxima!

## Avisos da aula

O professor menciona exercícios nos slides [verificar: o PDF da Aula 14 não contém lista de exercícios]. Nenhum prazo ou prova foi mencionado.
