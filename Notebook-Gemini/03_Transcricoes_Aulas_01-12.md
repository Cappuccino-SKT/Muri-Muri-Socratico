# Transcrições Verificadas das Videoaulas – Aulas 01 a 12

O que o professor fala em cada videoaula, organizado por seções na ordem do vídeo. Serve para saber em qual vídeo (e em que parte dele) cada assunto aparece. Em caso de divergência técnica, vale o Material de Ensino Verificado.

<!-- Transcrição: Aula_01_Introducao.md -->
## Aula 01 – Introdução à disciplina de Fundamentos de Programação

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "ProsoMuriel"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss].

### Tópicos abordados

- O computador como máquina de entrada, armazenamento, processamento e saída
- Hardware e software; software básico e software aplicativo
- Bit, byte e unidades de armazenamento (KB, MB, GB, TB, PB, EB, ZB); tabela ASCII
- Diferença entre megabits (transmissão) e megabytes (armazenamento)
- Linguagem de programação e compilação
- O que é um algoritmo (exemplos: receita de bolo, trocar pneu, somar dois números)
- Os quatro passos para resolver um problema antes de programar

### Glossário

- **Entrada, armazenamento, processamento e saída:** as quatro tarefas básicas que o computador executa.
- **Hardware:** parte física do computador, que se consegue pegar com a mão ("aquilo que você chuta").
- **Software:** conjunto de instruções/programa, que não existe fisicamente ("aquilo que você xinga").
- **Software básico:** o que precisa estar instalado para o computador funcionar: sistema operacional e drivers.
- **Sistema operacional:** por exemplo Windows, Linux, Mac.
- **Driver:** software que ensina o sistema operacional a se comunicar com um periférico (por exemplo, uma impressora).
- **Software aplicativo:** software com aplicação direta para o usuário (navegador, editor de texto, jogos e os programas feitos na disciplina).
- **Bit:** menor unidade de dados; dois estados, ligado/desligado (0 ou 1).
- **Byte:** conjunto de 8 bits; permite 256 combinações (2 elevado a 8).
- **Tabela ASCII:** tabela que associa cada caractere do teclado a um valor de 1 byte.
- **Base 2:** na computação os prefixos usam potências de 2 (1 KB = 1.024 bytes).
- **Linguagem de programação:** conjunto de regras definidas, organizadas e depois convertidas para a linguagem de máquina.
- **Compilação / compilador:** processo/programa que converte o código escrito em 0 e 1.
- **Algoritmo:** procedimento passo a passo para resolver um problema ou uma tarefa.

---

### Apresentação e objetivo da aula

Olá, pessoal, eu sou o professor Muriel [verificar] e hoje vamos fazer uma introdução à disciplina de Fundamentos de Programação. Aqui nessa disciplina, nós consideramos que ninguém é obrigado a entrar sabendo nenhum conceito prévio da área de computação ou programação. Nesta aula, a gente vai falar um pouquinho de alguns conceitos básicos, para quem não teve oportunidade de aprender antes, e também é legal para quem já sabe dar uma revisada em alguns conceitos. Ok? Vamos lá.

### O que é um computador

Primeiro de tudo, vamos aprender a programar o computador. Mas o que é o computador para você? Como você definiria essa máquina que está aqui na sua frente, que você está utilizando para assistir a este vídeo? Alguma ideia? [Respostas dadas pelo professor, trecho confuso no original: algo como "máquina inteligente", "rápida" – inaudível?]

O computador é uma máquina capaz de executar apenas quatro tarefas básicas. Quais são elas? Primeiro, é uma máquina capaz de receber uma **entrada de dados**, **armazenar** esses dados, **processar** (fazer contas, cálculos) e gerar uma **saída**. Tudo o que você faz no computador pode ser resumido a essas quatro tarefas.

**Exemplo 1 – abrir o site da universidade.** Você abre o site da universidade [verificar: o original diz "OTF"]. Você usa uma entrada de dados, teclado e mouse, né? Você abre o navegador, digita o endereço do site, termina em "ponto br" [verificar], aperta enter. O que vai acontecer por dentro? O computador vai pegar e processar a informação: vai fazer uma requisição pela rede e pedir essa página. Aí tem uma caixinha preta da internet, que a gente não vai explicar agora. Ele vai receber esse site de volta do servidor, vai armazenar temporariamente esse site e vai exibir na tela, gerando uma saída, que é mostrar o site para você. Então: entrada, armazenamento, processamento e saída.

**Exemplo 2 – WhatsApp.** O celular, hoje em dia, é mais do que nunca um sistema computacional. O WhatsApp tem entrada de dados (tela, microfone, botões), pode armazenar, pode processar, fazer conta e gerar saída. Quando você manda um "bom dia" lá no WhatsApp, você tem a entrada de dados: clica na tela para digitar a mensagem. O celular armazena essa mensagem, processa e manda para a rede. Depois gera a saída, que é mostrar a mensagem na tela do seu dispositivo e na do contato para quem você mandou. Entrada, processamento, armazenamento, saída.

**Exemplo 3 – um jogo.** Num jogo [trecho inicial confuso no original] também tem entrada, armazenamento, processamento e saída. Você clicou com o mouse, colocou a mira na cabeça do inimigo [verificar] e atirou: o dispositivo de entrada, nesse caso, é o mouse. O computador vai armazenar os dados do clique, da posição, e vai processar a informação: vai calcular a trajetória da bala, o que envolve muita física, inclusive para a galera que está fazendo Física. Ele faz a conta para ver se a bala atingiu ou não a cabeça do inimigo. Se atingiu, vai gerar a saída: a animação do inimigo morrendo e o somzinho de *headshot*. Entrada, armazenamento, processamento e saída.

Então, em tudo isso [no uso do dia a dia, em jogos, na engenharia, na programação – trecho confuso no original] estão envolvidas entrada, armazenamento, processamento e saída. Seja um computador muito simples, um celular, um notebook, um desktop, um servidor ou um supercomputador, sempre vão estar envolvidas essas quatro operações.

### Hardware e software

Tudo o que está no computador a gente divide em duas partes: a parte física, que você consegue encostar com a mão, o **hardware**, e o **software**, que é um programa. Uma brincadeira que eu sempre faço com os alunos, para vocês nunca mais esquecerem: **software é aquilo que você xinga; hardware é aquilo que você chuta.**

Se o Windows travou, você pode chutar ele? Não, não pode, porque ele não existe fisicamente; você não consegue pegar o Windows na mão. Então você xinga o Windows. Agora, se o computador travou, você pode chutar? Pode. Não deveria, não faça isso, mas você pode: ele existe fisicamente. Placa-mãe [verificar], memória, processador, sensor, componentes que existem dentro do computador e que você pode pegar na mão são hardware.

O Firefox, o navegador: é hardware ou software? Dá para chutar? Na verdade não, ele não existe fisicamente. Ele é um software, um conjunto de instruções que rodam no seu computador. Esse é um conceito tranquilo; acho que a maioria de vocês já tem.

### Software básico e software aplicativo

Agora vamos descer um pouquinho mais nessa conversa. Existe só um tipo de software? Não. A gente vai descer em duas classificações: **software básico** e **software aplicativo**.

**Software básico** é aquele que você precisa ter instalado no computador para ele funcionar: o **sistema operacional** e os **drivers**. Sabe o que é o sistema operacional? Windows, Linux, Mac, qual for. E os drivers: quando você vai instalar uma impressora, às vezes vem um CD de instalação, ou ele manda você entrar no site do fabricante para fazer o download [trecho confuso no original]. Esse é o driver. Ele vai ensinar o Windows (no caso do Windows) como a impressora funciona. Ele faz a "conversa" do hardware, daquele periférico, com o sistema operacional. Se não tiver o sistema operacional e os drivers, dá para usar o computador facilmente? Não. Isso é o básico, ok?

Mas o Windows ou o Linux, sozinho, tem utilidade para mim, ser humano? Não, não tem. Eu ligo o PC só para usar o Windows? Só para usar o Linux, o Mac? Não. Então o que eu vou fazer? Vou instalar aplicativos.

**Software aplicativo**, o nome já diz, é aquele que tem uma aplicação direta para o usuário. Por exemplo, para navegar na internet eu abro o navegador, o browser, que pode ser o Firefox ou o Chrome, e daí navego na internet; tenho uma aplicação para mim. Vou digitar um texto: abro o LibreOffice, ou o Word. São aplicativos que têm uma utilidade direta para o usuário. Jogos, sim, também são aplicativos. Todos os softwares aplicativos dependem do software básico para funcionar.

E quem mais está nessa linha de aplicativo? Os softwares que a gente vai fazer aqui na disciplina. Por enquanto, aqui em Fundamentos, todos os programas que a gente desenvolver vão ser softwares aplicativos.

### Bits, bytes e unidades de armazenamento

A gente vê muito na internet, quando falam da representação dentro do computador, aquele monte de código binário. Por quê? O computador não sabe o que é uma letra, não sabe o que é uma foto do Facebook. Tudo o que o computador armazena internamente fica salvo em **bits**.

O que é um bit? É um estado que pode ser ligado ou desligado: zero ou um. Está passando energia? Não está passando energia? É a menor unidade de armazenamento que existe, a menor unidade de dados que eu posso ter no computador. Está magnetizado ou não está magnetizado? Está ligado ou não? E assim por diante. Então o bit é 0 ou 1, ligado ou desligado.

Só com dois estados não conseguimos armazenar muita coisa. Nesse caso eu vou precisar de vários bits. Eu agrupo **8 bits para formar 1 byte**. Com 1 byte, quantas informações diferentes eu posso armazenar? Lembrando de combinatória: 2 elevado a 8 são **256 combinações diferentes**. Com isso eu consigo salvar um caractere do teclado. Qualquer letra do teclado eu consigo armazenar com 1 byte. Isso é o que a gente chama de **tabela ASCII**.

Por exemplo, a letra A: quando eu aperto a tecla, o valor que é armazenado no computador é 01000001 [verificar: o original transcreveu "0110001"]. Como o computador não sabe que é a letra A, tudo para ele é uma sequência de 0 e 1. Então, com um bit eu só salvo duas informações diferentes, e com um byte, que são 8 bits, eu consigo salvar 256 combinações diferentes, o que dá para salvar um caractere seguindo a tabela ASCII.

Agora, uma letra: eu salvo muita coisa? Não. Se eu for salvar um texto, um capítulo de um livro, vou precisar de muito mais informação. E daí eu começo a agrupar meus bytes.

**Unidades.** Se eu juntar mil gramas, eu tenho 1 quilograma. Da mesma maneira, se eu juntar mil bytes, eu tenho 1 quilobyte. Calma lá: a computação usa um pouquinho diferente. Tudo na computação é base 2. Então, 2 elevado a 10, que dá, na verdade, **1.024 bytes**, formam 1 kilobyte.

E depois, o que você vai ter? Além do kilobyte: por exemplo, você tem um pen drive de 8 gigas. Quanto é isso de informação? [trecho confuso no original] Vamos continuar caminhando.

- Se eu juntar 1.024 kilobytes, eu chego em **1 megabyte**, que são 1.048.576 bytes disponíveis para armazenar informação. Por exemplo, um MP3 de 5 megabytes: para salvar essa música eu vou utilizar aproximadamente 5 milhões de grupos de 8 zeros e uns.
- **Gigabyte:** agora, um vídeo, um filme [verificar] que tem 2 gigas. O que é um giga? São 1.024 megabytes, o que dá cerca de 1,1 bilhão de bytes [verificar: o original diz "milhão"].
- **Terabyte:** depois do giga, se eu juntar 1.024, eu tenho 1 terabyte, aproximadamente 1 trilhão de bytes. [Trecho confuso no original sobre servidores e organizações que já não trabalham só com terabytes.]
- Se eu juntar 1.024 teras, eu tenho 1 **petabyte**. Com 1.024 petabytes, eu tenho 1 **exabyte**. Com 1.024 exabytes, eu tenho 1 **zettabyte**.

O professor mostra uma tabela completa com as unidades [a tabela não aparece na transcrição]. Muitas organizações já trabalham com petabytes diários. Imagina quanta informação circula por aí, para não dizer que já tem exabytes de informação circulando diariamente. Eu já tinha visto algumas notícias com esses números certinhos [inaudível?], mas esses números sempre são ultrapassados de um dia para o outro.

**Base 2 e padrão formal.** É legal falar sobre essa diferença do 1.024: existe até um padrão. Na matemática, os prefixos seguem potências de 10 (mil, um milhão e assim por diante), e na computação a gente não utiliza essa forma; a gente utiliza sempre base 2. Então seria 2 elevado a 10, 2 elevado a 20, 2 elevado a 30, tá? E existe até uma definição formal, da ISO [verificar], que usa os prefixos Ki, Mi, Gi [verificar], e que deixa claro que é base 2. Mas na prática a gente acaba nunca utilizando. Você só precisa saber que existe uma maneira formal de falar na base 2.

### Megabits × megabytes

Sempre vai ter uma diferença entre megabits e megabytes, e o pessoal sempre acaba se confundindo. Quando você contrata uma internet de 10 mega [verificar], consegue baixar um arquivo de 10 mega em um segundo? Se você tem uma internet de 100 mega, baixa um arquivo de 500 mega em 5 segundos? Não, né? Na verdade, o que é vendido para a gente é "100 mega", mas mega o quê? [trecho repetitivo e confuso no original]

Quando você fala de **armazenamento** de dados, a medida é sempre em **bytes**: terabyte, gigabyte, megabyte, tamanho do arquivo, capacidade do meu HD. Mas quando eu estou trabalhando com **transmissão**, a velocidade de transmissão de uma rede, a gente utiliza **megabits**. Então os 100 mega que você contrata são 100 megabits, não 100 megabytes. Com isso, você não vai conseguir baixar um arquivo de 100 megabytes em um segundo. Quanto você vai conseguir baixar? 100 dividido por 8, ok? Dá **12,5 megabytes por segundo**, no máximo. Então essa é a diferença. [Trecho confuso no original, algo como "não estão mentindo para você":] a informação que está ali está em megabits, não em megabytes.

### Linguagem de programação e compilação

Agora, beleza. Eu tenho essa máquina que só fala 0 e 1, e o computador só entende 0 e 1. E eu, o programador, quero que ele resolva o problema para mim, mas eu só falo português, ou inglês, francês, alemão, enfim. Como eu vou ensinar essa máquina a executar a série de instruções que eu quero? Nesse caso eu vou precisar de uma **linguagem de programação**.

A máquina só sabe 0 e 1, e eu só sei a língua portuguesa. Eu preciso de alguém no meio do caminho que faça essa "tradução" para a gente, e quem faz esse meio do caminho é a linguagem de programação. Então, o que é uma linguagem de programação? É um conjunto de regras definidas, que devem ser organizadas e convertidas para a linguagem de máquina. Eu não escrevo em português, mas também não escrevo em 0 e 1. É o conjunto de regrinhas, de comandinhos, que eu coloco de forma organizada, e que depois vai passar por um outro processo, chamado **compilação**, que vai transformar esse código na linguagem de 0 e 1. Então eu saio um pouquinho do português, escrevo um código, e um compilador pega esse código e converte em 0 e 1, que a máquina entende. Ok?

E essas regras, nós temos que estruturá-las com uma lógica, com base em algoritmos.

### Algoritmos

Se você já ouviu falar do termo **algoritmo**: um algoritmo nada mais é do que um procedimento, um passo a passo, para resolver um problema ou uma tarefa. Se você seguir o passo a passo, você resolve o seu problema. Esse termo não está necessariamente ligado à computação. Qualquer sequência passo a passo para resolver um problema já é um algoritmo, seja ligado à computação ou não. Os matemáticos [trecho inaudível?] estudam algoritmos há muitos séculos, muito antes da própria invenção dos computadores. O algoritmo que o Google usa para calcular a rota de um lugar para outro, lá no Google Maps, já existia muito antes da existência dos computadores eletrônicos. Quando vieram os computadores elétricos, aí foi possível automatizá-lo e colocá-lo para executar de maneira automática para o usuário. Mas ele já existia muito antes.

**Exemplo: receita de bolo.** Uma receita de bolo é um algoritmo. Se eu não sei fazer um bolo, mas sigo essa sequência de passo a passo, eu consigo fazer o bolo? Consigo. Então ela é um algoritmo. Tem uma **entrada**, que são os ingredientes do bolo e as quantidades; tem um **processamento**, que é o passo a passo, as regras, a sequência dos itens que você vai colocar; e a **saída** é o próprio bolo pronto. Entrada, processamento e saída.

**Exemplo: trocar o pneu.** Trocar um pneu tem uma ordem do que você vai colocar, tem um passo a passo que você segue. Você pode trocar o pneu do carro, mesmo que não saiba, seguindo esse passo a passo [trecho confuso no original]. Então ele é um algoritmo.

**O computador é "burro", mas rápido.** O computador é muito rápido, gente. Um computador com um programa inteligente [trecho confuso no original] já ganhou do campeão de xadrez [verificar: o original diz "chadreis"], mas porque ele testou todas as combinações, milhões de vezes por segundo, para poder fazer isso. Eu costumo dizer que o computador em si é burro, mas é o mais rápido que existe. Se você ensinar as regras para ele, ele vai testar milhões de combinações por segundo, e com isso passa a impressão de que ele é inteligente.

**Exemplo: somar dois números.** O computador sabe somar dois números? Não: eu ensino ele a fazer isso. Como seria o passo a passo? Eu começo um programa. Defino um lugar para guardar o primeiro valor [reservo espaço – trecho confuso no original], defino um lugar para guardar o segundo valor e um lugar para guardar o valor do resultado. Leio o primeiro valor, pode ser do teclado, por exemplo. Leio o segundo valor do teclado. Somo os dois valores e salvo no terceiro local de armazenamento [nome dado a ele no original: inaudível?, algo como "soma"]. E mostro a mensagem com a soma. Ok? Esse seria o algoritmo para somar dois números.

### O difícil é entender o problema

Vocês vão ver que a grande dificuldade é entender o problema. O difícil não é saber o código; escrever a sintaxe da linguagem não é o difícil. O difícil é entender o problema. Vai ter um enunciado para vocês: "Faça um programa que faça tal coisa, implemente tal coisa, leia tal valor, e tal." Ler esse texto, interpretar esse texto e, a partir dele, fazer o programa que descreve aquele comportamento: isso é o difícil.

**O cartum do projeto.** O professor mostra um cartum com as diferentes versões que diversas pessoas podem ter do mesmo problema. O primeiro quadrinho mostra o que o cliente explicou que queria. Aí o líder do projeto achou que era isso. O analista achou que era isso. O programador fez isso. O consultor de negócios escreveu como sendo isso. A documentação não existiu. As funcionalidades que realmente foram feitas foram isso aqui. O cliente foi cobrado como se fosse uma montanha [de arroz? – verificar] e não o simples balanço. Como foi mantido [trecho inaudível?]. E, na verdade, o que o cliente queria era só um balanço com um pneuzinho [verificar], bem tranquilo, bem simples.

Repare que nessa comunicação tem muito ruído: cada um fala uma coisa e o outro entende outra. Então tenha muita atenção na leitura dos enunciados das questões. [Trecho confuso no original:] isso vai ajudar muito a fazer o código.

### Os quatro passos básicos para resolver um problema

Quais são os quatro passos básicos que eu aconselho? Em vez de pegar o enunciado do programa, abrir o editor e fazer direto o código, sem parar para pensar no problema (assim não vai dar nada), o que você deve fazer antes?

1. **Conhecer o problema a ser resolvido.** Qual é o objetivo do programa? Leia o enunciado, levante as informações certinho, com atenção; interprete o que ele quer.
2. **Extrair as informações.** A partir do enunciado, extraia todas as informações a respeito do problema. Quais valores têm lá que são úteis para você?
3. **Descrever o passo a passo.** Descreva claramente, passo a passo, como resolver aquela situação. Coloque esse passo a passo no seu algoritmo.
4. **Escrever o código.** Só depois de fazer isso, no quarto passo, você escreve o seu código, em qualquer linguagem de programação que você precisar.

**Exemplo: equação de Bhaskara.** Se tiver um programa para você resolver a equação de Bhaskara: vai conseguir resolver esse exercício se não souber a fórmula de Bhaskara? Nunca. Eu vou te dizer: você jamais faz um programa que resolve um problema que você não resolve no papel e na caneta. Então, primeiro certifique-se: se eu não sei resolver uma equação do segundo grau usando papel e caneta, jamais vou fazer um programa que faça essa conta. Extraia as informações e leve para o seu algoritmo. "Opa, eu não sei a fórmula de Bhaskara": vá para a internet, procure a fórmula, volte, resolva uma vez na mão. Só depois, sabendo o passo a passo que você fez no papel e na caneta, passe esse passo a passo para o seu algoritmo. Você vai descrever isso de maneira lógica, para depois escrever o seu código utilizando a sua linguagem de programação. Ok?

### Encerramento

É isso, pessoal. Essa primeira aula é mais teórica. A próxima aula já vai trazer um pouco mais de código, mas são alguns elementos importantes para nivelar todo mundo: alguns [já sabem bastante de computação, outros não – trecho confuso no original], mas é legal a gente ter essa introdução antes de partir para o código. É isso, pessoal. Até mais, um grande abraço.

### Avisos da aula

Nenhum aviso administrativo (prazos, provas, tarefas) nesta aula.

---

<!-- Transcrição: Aula_02_Linguagem_C.md -->
## Aula 02 – Linguagem C

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Corial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor de código na tela; o que não aparece na transcrição está sinalizado entre colchetes.

### Tópicos abordados

- Revisão: linguagem de máquina × linguagem de programação
- Linguagem de máquina, hexadecimal e Assembly (exemplo de "Hello World")
- Linguagens de baixo nível × alto nível
- História da linguagem C (BCPL → B → C), usos e portabilidade
- Padrões da linguagem C
- Arquivo `.c`, compilador e GCC
- Estrutura de uma função (cabeçalho, chaves, retorno)
- O primeiro programa em C: `main`, `printf`, `return 0`
- Como compilar e executar (comando `gcc` e o editor Atom)
- Bibliotecas e `#include` (`stdio.h`, `stdlib.h`)
- Caracteres de escape (`\n`, `\a`, `\t`, `\"`, `\\`)
- Comentários de uma linha e de várias linhas

### Glossário

- **Linguagem de máquina:** sequência de bytes em que cada sequência representa uma instrução dentro do processador; cada família de processador tem seu próprio conjunto de instruções.
- **Hexadecimal:** representação de números binários usando 16 símbolos (0 a 9 e A a F).
- **Assembly:** representação em texto das instruções de máquina.
- **Linguagem de baixo nível:** linguagem em nível de máquina, que depende do hardware.
- **Linguagem de alto nível:** linguagem que abstrai a arquitetura do computador.
- **Portabilidade:** possibilidade de adaptar o mesmo programa a diferentes computadores sem mudar o código, desde que se sigam os padrões da linguagem.
- **Código-fonte:** arquivo com o código escrito na linguagem de programação (em C, extensão `.c`).
- **Compilador:** programa que transforma o código-fonte em linguagem de máquina executável.
- **GCC (GNU Compiler Collection):** coleção de compiladores GNU, usada na disciplina.
- **Função:** bloco de instruções com nome, parâmetros (entre parênteses) e valor de retorno.
- **Cabeçalho da função:** linha com o tipo de retorno, o nome e os parâmetros.
- **`main`:** função principal; todo programa em C deve ter uma e apenas uma.
- **`printf`:** função que exibe texto formatado na tela.
- **Biblioteca:** conjunto de funções já prontas, incluído com `#include`.
- **`stdio.h`:** "standard input output", biblioteca padrão de entrada e saída.
- **`stdlib.h`:** "standard library", biblioteca padrão usada em outros comandos.
- **Caractere de escape:** caractere especial iniciado por contrabarra (`\`).
- **Comentário:** anotação no código que é descartada na compilação.

---

### Revisão da aula anterior

Olá, pessoal, eu sou o professor Muriel [verificar] e na aula de hoje vamos falar um pouco mais sobre a linguagem de programação C.

Na aula passada, além de fazer uma revisão de diversos conceitos relacionados à computação, nós vimos que o computador é uma máquina eletrônica e só entende zeros e uns. E nós, seres humanos, falamos uma língua oral, no caso do Brasil, o português. O computador é muito rápido, porém a gente tem que falar para ele o que fazer. Então, eu, que falo português, vou fazer o quê? Vou escrever em uma linguagem de programação, que depois será convertida pelo compilador [verificar: o original diz "computador"] em uma linguagem de máquina, que é entendível pelas máquinas.

### Linguagem de máquina

A linguagem de máquina é um conjunto, uma sequência de bytes que representa um comandinho, uma instrução dentro do processador. E todos os processadores não são iguais: cada família de processador tem o seu próprio conjunto de instruções, de comandos que você pode dar para ele. Então você vai mandar uma sequência de bytes, e cada sequência vai representar "faz isso, faz aquilo". E existem diferentes famílias.

Como seria isso se eu tentasse ver um arquivo executável? [O professor mostra um slide.] A parte que vocês estão vendo em amarelo representa o código de um programa que tudo o que ele faz é mostrar a mensagem "Hello World" na tela, ou seja, "Olá, mundo". É o menor programa, o mais simples que existe. Em amarelo está o código em **hexadecimal**, que é quando se exibem os números binários utilizando 16 símbolos, do 0 ao 9 e da letra A até a F. Do lado direito, vocês estão vendo o código correspondente em formato texto, que seria o código em **Assembly**, se alguém já ouviu falar [verificar: o original diz "Assemble"].

Reparem como seria complexo programar o computador direto em linguagem de máquina. Se eu não utilizasse nenhuma linguagem de programação, eu teria que programar esses valores em Assembly, ou até mesmo esses valores em amarelo, em hexadecimal. Assim, não, né?

A linguagem de máquina que eu mostrei para vocês gera códigos extremamente rápidos e otimizados, porém difíceis de programar. E depende do hardware, porque cada código vai depender do processador: se eu estou num AMD, num Intel, num ARM, num Snapdragon, cada tipo de processador tem o seu código. Então é muito fácil errar [verificar], e os códigos ficam muito extensos e difíceis de entender [verificar: trecho confuso no original].

Por isso, a gente precisa aprender o quê? Não vou programar em uma linguagem de **baixo nível**, como a gente fala nesse caso. A gente precisa de uma linguagem de **alto nível**, em que eu consiga abstrair algumas camadas relacionadas à arquitetura. Nesse caso, a gente vai utilizar a linguagem C.

### A linguagem C: história e características

A linguagem C é da década de 70. Repare, para a computação, que ela surgiu ali [trecho confuso no original, algo sobre a computação eletrônica ter surgido na década de 40]. É uma linguagem antiga, né? Tem 50 anos. Porém ela é utilizada até hoje. Ela evoluiu com o tempo, não ficou parada. Existem várias linguagens que são variantes, derivadas dela. Então ela é muito utilizada.

O nome é um exemplo de criatividade: a linguagem C veio de outra linguagem, a B. A linguagem B evoluiu para o C. A C foi criada por Dennis Ritchie [verificar: o original diz "Denise Whate"], no início dos anos 70. A linguagem B foi criada por Ken Thompson [verificar: o original diz "em Thompson"], e veio de outra que já existia antes, a BCPL [verificar: o original diz "BCPR"]. Ou seja, ela não foi criada do nada, houve uma constante evolução. [Frase inaudível? sobre o que foi feito de melhor.]

Ela é utilizada para diversos tipos de programas [trecho inaudível?]. Navegadores, sistemas operacionais e jogos foram feitos utilizando a linguagem C, ou linguagens variantes dela, como C++ e C#.

**Alto nível.** A gente fala que é uma linguagem de alto nível, às vezes de nível médio. Lembrando que uma linguagem de baixo nível é aquela que está em nível de máquina, em que eu mando instruções em linguagem de máquina para o hardware. Uma linguagem de alto nível é aquela que abstrai toda essa questão da arquitetura: eu digo "exiba essa mensagem na tela" e, independente do processador, ele vai executar e exibir essa mensagem. Então ela combina elementos de alto nível, para facilitar a programação. Porém, caso necessário, dentro do código C eu consigo inserir códigos de linguagem de máquina, trechos bem otimizados quando necessário. Eu posso sim mexer em bits e bytes e em endereço de memória, sem problema nenhum.

**Portabilidade.** Além disso, é uma linguagem altamente portável. Eu posso adaptar o mesmo software para diferentes tipos de computadores sem mudar nada do meu código, desde que eu siga os padrões. Existem padrões da linguagem C: o primeiro padrão foi em 78 [verificar], depois veio o ANSI C [verificar: o original diz "ONCEC"], que foi atualizado em 89, em 99, em 2011 e em 2018 [verificar: o original diz "2008", mas cita "C11" e "C18"]. Se você utilizou esse padrão, você pode usar um compilador para compilar o seu programa e gerar o código de máquina para diferentes plataformas. Portanto, é uma linguagem portável.

### Arquivo `.c` e compilador

E qual é o esqueleto dessa linguagem? Como vai ser um código dela? Eu vou criar um arquivo com a extensão `.c`. Um arquivo de música não é `.mp3`? Então um arquivo de código-fonte é `.c`, que tem código da linguagem de programação C. Ali eu vou escrever o meu algoritmo utilizando essa linguagem. Depois eu vou passar esse arquivo para um **compilador C**, que vai transformar todo aquele código em linguagem de máquina, executável.

Existem diversos compiladores que seguem o padrão. O que a gente vai utilizar aqui na disciplina é o GNU C, que está dentro do **GCC**, o GNU Compiler Collection, a coleção de compiladores GNU, que está disponível para vocês.

### Estrutura de uma função

Qual é a estrutura do código em C? Lembra da matemática? Não tem a questão de funções? `y = f(x)`: *f* é o nome da função, *x* é o argumento e *y* é o resultado. Um programa em C, de maneira similar, é composto por diversas funções.

[O professor mostra um slide com a estrutura.] Aqui eu tenho o nome da função; entre parênteses, os parâmetros; e aqui um tipo de saída [tipo de retorno]. Isso é o **cabeçalho da função**, a gente fala. Aqui a chave indica onde ela começa, e a outra chave indica onde ela termina. Dentro eu vou ter as instruções, a minha receitinha de bolo, o passo a passo do que essa função vai fazer. Quando ela termina, ela vai retornar um valor de retorno, do mesmo tipo da saída. Lembra? `y = f(x)`: chamo pelo nome, passo o parâmetro, tenho o retorno.

### O primeiro programa em C: Hello World

Vamos olhar isso agora em um código em C. Esse aqui é o primeiro programa de vocês em C. [A transcrição não traz o código escrito; ele foi reconstruído a partir da descrição do professor. Verificar.]

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    printf("Hello World");
    return 0;
}
```

Conseguem achar aqui uma função, com o nome da função, um parâmetro e um retorno? O nome seria `main`, que em inglês quer dizer "principal": é a **função principal**. Todo programa em C deve ter uma e apenas uma função `main`. Entre parênteses, tem algum valor? Não. Nesse caso, a função `main` está recebendo nenhum valor de parâmetro (poderia receber). E qual é o valor de retorno? `int`. A gente vai ver mais para frente que isso quer dizer um valor inteiro, um número inteiro. Aqui é onde a função começa (chave) e aqui é onde ela termina.

O que a minha função faz? Ela tem apenas um comando: `printf("Hello World")`. O `printf` manda o computador exibir, de forma formatada, na tela, o texto que está entre aspas duplas, no caso "Hello World", que em inglês quer dizer "Olá, mundo". Depois de terminar, ele retorna o valor zero. Então, meu programa começa, mostra "Hello World" na tela e depois termina. Um programa bem simples.

### Compilando e executando

Se você já tiver instalado o compilador, conforme eu ensino em outros vídeos, você pode executar esse programa. Como? Pega esse código, coloca num arquivo de texto (pode utilizar o Bloco de Notas, não precisa de nenhum programa específico), salva com o nome `hello.c` e, usando o terminal no Linux ou o prompt de comando no Windows, executa o comando abaixo:

```bash
gcc -Wall -o hello hello.c
```

`gcc` é o nome do compilador; `-Wall` ativa todos os alertas; `-o` indica o arquivo de saída, que vai se chamar `hello`; e `hello.c` é onde estão os meus códigos-fonte.

**Na prática, no editor Atom.** Aqui eu estou com esse mesmo código no editor, lembrando que já estou com o compilador e o editor instalados e configurados corretamente, como eu ensino nos outros tutoriais. Para executar, vou pressionar a tecla **F6**. Esse programa tem função `main`, que não recebe parâmetro, retorna um número inteiro, começa aqui, termina aqui, e tem uma única instrução, o `printf`, que exibe na tela a mensagem "Hello World" e depois finaliza. Ao pressionar F6, ele executou a mensagem e, só para não fechar a tela, aparece "Pressione qualquer tecla para continuar". O F6 salva o código, passa pelo compilador, gera o arquivo binário executável e executa o programa. Isso acontece quando você pressiona F6.

### Bibliotecas e `#include`

Tem mais algumas coisas que eu ainda não expliquei: **as duas linhas de cima**. São as **bibliotecas**. Com o `#include` eu estou incluindo as bibliotecas que vou utilizar. Por exemplo, para que eu possa utilizar a função `printf`, alguém tem que ter feito essa função; ela está em uma biblioteca, e eu faço o `include` aqui em cima. `stdio` (não é "estúdio") é *standard input output*, a biblioteca padrão de entrada e saída. A linha de baixo, `stdlib`, é *standard library*, a biblioteca padrão que vou precisar para outros comandos com que a gente vai trabalhar durante a disciplina.

Repare: é uma linguagem, não é português, mas também não é linguagem de máquina. Então tem alguns símbolos e regras: o `include` sempre tem que ter o `#` (cerquilha, hashtag), e o nome da biblioteca tem que ficar entre os sinais de menor e maior (`< >`). É uma língua, assim como se eu estivesse estudando inglês, francês, alemão: tem as regras dela, e você tem que seguir.

### `printf` e `return 0`

Aqui eu chamo a função `printf`. O argumento, o que eu quero exibir, é "Hello World", entre aspas duplas, e deixei os argumentos entre parênteses. Para finalizar o comando, ponto e vírgula no final.

E o `return 0`: para quem vai esse zero? Estou retornando esse valor para quem? Quem roda um programa aplicativo? O sistema operacional. Toda vez que um programa aplicativo retorna 0 para o sistema operacional (Windows, Linux), ele está informando que esse programa finalizou sem nenhum erro. Só se o programa der algum erro ao executar é que ele finaliza com um valor diferente de zero. [Trechos confusos no original: inaudível?] Aqui a chave fecha a função `main`.

### Caracteres de escape

Vamos mudar um pouquinho aqui. Depois do "Hello World", vou escrever "Apucarana" [verificar: o original diz "pucarana"]. O que aconteceu? [O texto aparece na linha de baixo por causa do `\n`; o código exato não aparece na transcrição.] É isso que o `\n` faz: toda vez que você coloca um `\n` na mensagem a ser exibida, ele vai para a linha de baixo.

Vou escrever em três linhas: "Hello World", "Apucarana" e "UTFPR" [verificar: o original diz "TSPR"]. Se eu quiser colocar outro texto, precisa ser tudo no mesmo `printf`? Não. Vou colocar uma linha nova, outro `printf`, e escrever "Engenharia de Computação". Ao executar com F6, aparece "Hello World", "Apucarana", "UTFPR", "Engenharia de Computação" e o "pressione qualquer tecla para continuar". Repare, pessoal: se eu tirar o `\n` e executar, ele mostra "UTFPR Engenharia..." na mesma linha. Mesmo com dois `printf` diferentes, não são duas linhas: você não mandou ele para a linha de baixo. Ele só vai para a linha de baixo se eu mandar, e, nesse caso, isso é feito colocando um `\n`.

Fora o `\n`, tem mais alguma coisa para aprender? Tem. Por exemplo, se eu der um `\a`, repare o que vai acontecer. Vocês escutaram o barulhinho? `\a` é **alerta**: ele dá um bipe [no meu computador; trecho confuso no original: "aqui no meu ele usa de outra maneira"], um alerta ao usuário.

**Aspas duplas.** O texto que eu quero exibir tem que estar entre aspas duplas. Como eu faço se eu quiser exibir as próprias aspas duplas? Repare que o texto entre aspas aparece com uma cor diferente aqui no editor, o que ajuda a gente. Se eu colocar mais aspas aqui no meio, o compilador vai se confundir com a forma do meu texto [verificar: trecho confuso no original]. Para diferenciar as aspas duplas que começam e terminam o texto das aspas duplas que eu quero que sejam exibidas na tela, eu utilizo uma contrabarra antes das aspas duplas: `\"`. Nesse caso, por exemplo, o texto "Engenharia de Computação" aparece entre aspas duplas na tela.

Existem diversos outros caracteres especiais, os **caracteres de escape**. A contrabarra (barra invertida) é utilizada para esses caracteres especiais:

| Sequência | Significado |
|-----------|-------------|
| `\a` | alerta (bipe) |
| `\n` | nova linha |
| `\t` | tabulação (empurra o texto um pouquinho para frente) |
| `\\` | exibir a própria contrabarra (preciso escrever duas) |
| `\"` | exibir aspas duplas |
| `\'` | exibir aspas simples [verificar] |
| `\?` | exibir interrogação [verificar: o professor diz, se não me engano, que também precisa de uma contrabarra antes] |

### Comentários

E os comentários: eu posso colocar comentários no meu código? Sim. O que acontece com o comentário quando o compilador roda? Eles são simplesmente apagados (ignorados). Então, para que serve? Para você ter organização; é uma anotação. Num código pequeno é fácil ver o que faz o quê, mas, conforme os nossos códigos forem crescendo, você precisa documentar o seu código para poder entender o que o programa faz depois de seis meses, depois de um ano, ou então, trabalhando em equipe, para um programador saber o que o outro fez.

Eu posso fazer um comentário de duas maneiras diferentes:

1. **Comentário de uma linha:** `//`. Por exemplo, `// Exibe uma mensagem na tela`. Repare que todo o texto depois do `//` fica cinza. Isso é um comentário; aqui eu posso escrever o que eu quiser, que não vai influenciar em nada o meu código. Porém, esse comentário dura uma linha só.
2. **Comentário de várias linhas:** vou ter que fazer outra marcação, abrindo e fechando o trecho comentado, que no padrão da linguagem é `/* ... */` [verificar: a transcrição original ficou confusa nesse trecho]. Aqui eu posso fazer um comentário de várias linhas, sem limite.

Ou seja, eu posso fazer um comentário de apenas uma linha ou um comentário de várias linhas. O comentário de uma linha também pode ficar na mesma linha de um trecho de código: por exemplo, ao lado da linha da função `main`. Da linha até aqui é código; daqui em diante é comentário.

```c
// Exibe uma mensagem na tela
printf("Hello World");

/* Comentário
   de várias linhas */

int main() // comentário na mesma linha do código
```

[Exemplo ilustrativo, reconstruído a partir da descrição do professor.]

### Encerramento

Por hoje é isso, pessoal. Treinem bastante [verificar: o original diz "Trame bastante"]. Até a próxima. Um grande abraço.

### Avisos da aula

Nenhum aviso administrativo (prazos, provas, tarefas) nesta aula. O professor remete a outros vídeos de tutorial para a instalação e a configuração do compilador e do editor Atom.

---

<!-- Transcrição: Aula_03_Variaveis.md -->
## Aula 03 – Variáveis

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "professor Daniel"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar]. A transcrição original está **muito distorcida** em vários trechos; o que não pôde ser confirmado está marcado.

### Tópicos abordados

- O que é uma variável e por que declará-la antes de usar
- Escopo global × local
- Valor "lixo" em variável sem valor inicial
- Atribuição (`=`) e declaração com atribuição na mesma linha
- Tipos principais: `char`, `int`, `float`, `double` (tamanho e precisão)
- Regras: *case sensitive*, ponto decimal, ponto e vírgula, palavras reservadas
- Notação científica e números muito grandes
- Exibir variáveis com `printf` (`%d`, `%f`, `%c`, `%.2f`) e vários valores em um `printf`
- Bases numéricas (hexadecimal, octal, binário), sufixos (`U`, `L`) e `sizeof`
- Constantes: `#define` e `const`

### Glossário

- **Variável:** posição específica da memória RAM, reservada para guardar um valor que pode mudar quando você quiser.
- **Declaração:** reservar a variável antes de usá-la: tipo, espaço, nome e ponto e vírgula.
- **Escopo global:** variável declarada fora de qualquer função; todas as funções a veem.
- **Escopo local:** variável declarada dentro de uma função (por enquanto, dentro da `main`).
- **Lixo:** valor aleatório que existe na posição de memória antes de você escrever nela; não é necessariamente zero.
- **Atribuição:** ato de escrever um valor em uma variável, com o operador `=`; do lado esquerdo vai a variável e do direito o valor.
- **`char`:** uma letra do teclado; 8 bits (1 byte); 256 valores (tabela ASCII).
- **`int`:** número inteiro; 32 bits (4 bytes).
- **`float`:** número real; 32 bits (4 bytes); cerca de 7 casas decimais de precisão.
- **`double`:** número real com precisão dupla; 64 bits (8 bytes); cerca de 15 casas decimais.
- **Case sensitive:** a linguagem C diferencia maiúsculas de minúsculas (`preco` e `Preco` são variáveis diferentes).
- **Palavra reservada:** palavra da linguagem que não pode ser nome de variável (`include`, `return`...).
- **Especificador de formato:** marcador usado no `printf` para indicar o tipo do valor a ser exibido (`%d`, `%f`, `%c`).
- **`sizeof`:** retorna quantos bytes um tipo (ou variável) ocupa no seu computador.
- **`#define`:** diretiva de pré-compilação que cria uma constante por substituição de texto (não é uma variável).
- **`const`:** declara uma variável protegida contra alteração.

---

### Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos conversar um pouquinho sobre **variáveis**.

Até agora nós vimos que o computador é uma máquina capaz de realizar 4 tarefas: receber uma entrada de dados, armazenar, processar essas informações (fazer contas com elas) e gerar uma saída. Mas, até agora, os nossos programas só exibiam "Hello World" na tela, ou seja, apenas geravam uma saída. Nesta aula vamos aprender como **armazenar valores na memória** através de **variáveis**.

### O que são variáveis

Variáveis são **uma posição específica da memória RAM**. Você pode reservar essa posição e deixá-la guardada para salvar uma informação e alterá-la sempre que quiser. Por isso se chama variável: **o valor varia**, o tempo que você desejar.

Antes de utilizar, você tem que falar para o computador: "reserve uma caixinha para mim, uma posição da memória RAM". Então, **toda variável deve ser declarada antes de ser utilizada**. Como se faz a declaração? Escreve-se o **tipo** (daqui a pouco vamos falar sobre os tipos), um espaço, o **nome da variável**, e finaliza-se com **ponto e vírgula**. Isso tem que ser feito com toda variável antes de utilizá-la.

```c
tipo nome;
```

### Escopo: global × local

A variável pode ter dois escopos diferentes, duas áreas onde ela é válida:

- **Escopo global:** quando declaro a variável **fora** da função `main` (ou de qualquer outra função).
- **Escopo local:** quando declaro a variável **dentro** da função `main` (ou de outra função).

Vamos usar o exemplo do nosso "Hello World". Nessa área, depois das bibliotecas e antes da minha função `main`, repare que não estou dentro de nenhuma função: qualquer variável que eu declarar aqui será considerada **global**, e todas as funções conseguem vê-la. Já nessa área, dentro das chaves da função `main`, qualquer variável que eu colocar será **local**: a sua visibilidade é dentro dessa função.

Mas, nesse instante do curso, **não se preocupe muito com essas questões**. Quando chegarmos na aula sobre funções, a gente vai retomar esse assunto com mais profundidade. **Por agora, vamos sempre declarar as nossas variáveis dentro da função `main`.**

### Valor inicial: o "lixo"

Reparem: eu reservei, na memória RAM, uma caixinha. Será que essa variável tem alguma informação lá? "Ah, é zero, professor." **Não é zero.** Aquela caixinha, aquela posição de memória, sempre vai ter um valor: por exemplo, do último programa que usou aquela região de memória. Então ele vai ter um valor lá, que a gente chama de **lixo**: qualquer valor aleatório. **Você não tem nenhuma garantia.**

### Atribuição

Então, o que a gente vai fazer é **escrever** nessa memória. Antes, só reservamos espaço na memória RAM; agora, vamos escrever. O ato de escrever um valor em uma posição de memória tem o nome de **atribuição**: eu vou atribuir um valor àquela posição de memória. A atribuição permite fornecer um valor para uma variável. Isso, pessoal, sempre tem que ser **dentro da função**.

O valor que você atribui tem que ser **exatamente do tipo** que você declarou para a variável. E isso é feito através do operador de igual (`=`): eu estou **copiando um valor para uma variável**. Então, **do lado esquerdo vai sempre a variável** e, do lado direito, o valor que vai ser atribuído a ela:

```c
nome = valor;
```

Aqui, do lado direito, eu também posso ter uma **expressão** (na próxima aula a gente vai aprender a fazer continhas com os valores): ele vai pegar o resultado dessa expressão e salvar na minha variável.

**Declaração e atribuição.** Eu posso fazer separado: uma linha para declarar e outra para atribuir. Mas eu também posso **declarar e atribuir na mesma linha**. É possível, sim. Por exemplo:

```c
int idade = 0;
```

- `int`: é um valor do tipo inteiro que estou declarando;
- `idade`: o nome da variável;
- `=`: uma atribuição; agora estou escrevendo zero nessa posição de memória.

Então eu estou fazendo **dois comandos na mesma linha**: primeiro, falando para o computador "reserve uma caixinha para mim e dê o nome dessa caixinha de `idade`"; segundo, "nessa caixinha que você reservou, escreva o valor zero". Quando você escreve zero, vai apagar qualquer lixo, qualquer valor aleatório que tinha lá dentro dessa posição de memória. Inclusive, alguns autores recomendam, como **boa prática, sempre atribuir um valor inicial** para as suas variáveis, principalmente porque a gente está começando a programar.

### Os tipos de variáveis

Só tenho o tipo `int`, pessoal? Não: essa é só uma lista das variáveis que você tem disponíveis, e a lista é bem longa. A gente vai trabalhar, na disciplina, mais com **estas quatro**:

- **`char`:** uma **letra do teclado**. Ocupa **8 bits, que é 1 byte**. Lembra do computador em binário (0, 1, 0, 0, 0, 1...)? É a letrinha. Ele consegue salvar qualquer valor do teclado, da tabela ASCII: **256 valores diferentes**.
- **`int`:** número **inteiro**. Ocupa **32 bits, que são 4 bytes**. Com 4 bytes (2 elevado a 32), você consegue armazenar qualquer valor entre cerca de **menos 2 bilhões e 147 milhões** e **mais 2 bilhões e 147 milhões**. Os números inteiros são infinitos, mas **na memória do seu computador, não**: sempre vai ter um limite máximo.
- **`float`:** representa os **números reais** (de ponto flutuante). Se eu quero colocar o valor de um preço de produto, que tem centavos, não vou utilizar um `int`. Um `float` também ocupa **32 bits, 4 bytes**, na memória RAM. Nesse caso, não se fala de mínimo e máximo: o que importa é a **precisão**, ou seja, quantas casas decimais você consegue armazenar. O `float` consegue armazenar até **7 casas decimais** de precisão.
- **`double`:** às vezes 7 casas são muito pouco para a sua aplicação. O `double` é um `float` com **precisão dupla**: também é um número real, só que você consegue ter até **15 casas decimais** de precisão. Quando você trabalha, por exemplo, com computação científica, você não pode ter problema por arredondamento; é legal utilizar o `double`. Porém, lembre-se: ele ocupa **64 bits, que são 8 bytes**.

Eu preciso decorar toda essa lista? Não. Essa tabela eu tirei do livro, e ela está incompleta. A gente vai trabalhar mais com essas 4; caso você precise, pode consultar no slide ou no livro.

| Tipo | Representa | Tamanho | Observação |
|------|------------|---------|------------|
| `char` | uma letra do teclado | 8 bits (1 byte) | 256 valores (tabela ASCII) |
| `int` | número inteiro | 32 bits (4 bytes) | cerca de −2,147 bilhões a +2,147 bilhões |
| `float` | número real | 32 bits (4 bytes) | até 7 casas decimais |
| `double` | número real | 64 bits (8 bytes) | até 15 casas decimais |

#### Exemplos de declaração com atribuição

- **Salário** (número real, com centavos): declaro uma variável do tipo real, `float`, com o nome `salario`, e já atribuo o valor [o valor do slide é "um real e 23 centavos", ou seja, 1.23; verificar]. **Cuidado:** na programação, **o ponto representa a casa decimal**; não se usa a vírgula [verificar: a justificativa dada no original, algo sobre "sistema imperial", é confusa].
- **Letra** (`char`): `char letra = 'a';`. O valor de um caractere tem que estar **sempre entre aspas simples**, porque, senão, o computador não saberia se você está copiando o valor da variável `a` para a variável `letra`, ou se você quer salvar a letra "a" dentro da variável `char`.
- **Idade:** é um número inteiro; ninguém fala "eu tenho 18,75 anos": ou você tem 18, ou você tem 19. Reparem que aqui há até um **modificador** (`short`): faz com que ocupe menos espaço. Faz sentido: ninguém vai ter 2 bilhões de anos. Então um `short int` é um inteiro que ocupa menos bytes na memória RAM, e estou só salvando o valor 22 [verificar: o original diz "32" e depois "22"].
- **Preço** com muitas casas decimais de precisão (mais do que 7): vou salvar como `double`. Por exemplo, 315 reais e 59 centavos.

```c
float salario = 1.23;        // valor ilustrativo [verificar]
char letra = 'a';
short int idade = 22;
double preco = 315.59;
```

### Regras e convenções

- **A linguagem C é *case sensitive*:** ela faz diferenciação entre maiúsculas e minúsculas. Por exemplo, se você criar a variável `preco` tudo em minúsculo, e outra com `R` maiúsculo, ou `Preco`, qualquer variante, para o computador são **duas posições de memória diferentes**.
- **Padronização (convenção, não é obrigatório):** para a gente não se perder, aqui na disciplina vamos trabalhar sempre com **nomes de variáveis todos em minúsculo**, agora no começo, para não ter problemas relacionados a isso.
- **Ponto e vírgula:** toda instrução de declaração e de atribuição **termina com ponto e vírgula**.
- **Ponto decimal:** para `float` e `double`, sempre vamos utilizar o **ponto** (e não a vírgula) para representar a parte decimal. [Trecho confuso no original, com um exemplo numérico que não pôde ser recuperado.]
- **Palavras reservadas:** posso dar qualquer nome à minha variável? Não: existem algumas palavras que são reservadas da linguagem, e você não pode utilizá-las. Por exemplo, para incluir uma biblioteca usamos a palavra `include`; então você não pode criar uma variável chamada `include`. Para finalizar a função, eu preciso dar um `return`; é um comando específico da linguagem e você não pode criar uma variável com o nome `return`. Tem uma tabelinha completa no slide, com todas as palavras reservadas. O importante, nesse momento, é saber que você não pode criar uma variável com nenhum desses nomes; se você pensar em nomes em português, não vai ter muito problema quanto a isso.

### Números muito grandes ou muito pequenos

Se o número for muito grande ou muito pequeno, como eu vou atribuí-lo? Por exemplo, a constante de Planck, da física: 6,62 vezes 10 elevado a menos 34. Nesse caso eu uso um `double` e a **notação científica**: o `e` representa "vezes 10 elevado a" [verificar: o original está confuso neste trecho].

```c
double planck = 6.62e-34;   // 6,62 × 10^-34
```

E se eu quiser salvar um número **maior** do que o limite do `int`, ou um número complexo? Nesse caso, existem **bibliotecas específicas** para isso. Nos padrões mais novos da linguagem, vocês vão ver que existem padrões para criar variáveis para números complexos e também para inteiros muito grandes. Você pode usar bibliotecas (o original cita duas, uma delas muito utilizada em criptografia [verificar nomes]) para salvar números realmente grandes, por exemplo, um número com centenas de algarismos. Isso é possível, mas você vai precisar de uma biblioteca específica. Legal?

### Exibindo variáveis com `printf`

Beleza: eu criei uma caixinha, atribuí um valor; como posso **exibir** esse valor? Com o `printf`. As duas primeiras linhas a gente já sabe: reserva uma caixinha e dá o nome de `idade`; atribui 18, ou seja, pega o valor 18 e escreve na caixinha `idade`. Agora, para exibir, lembra do nosso `printf` do "Hello World"? Agora ele vai ter um **marcador específico**.

Reparem esse **`%d`**: é o que a gente chama de **especificador de formato**. Estou dizendo que, **nessa posição**, eu quero que seja exibido o valor de uma variável do tipo inteiro. Então eu coloco, entre aspas, o texto e, na posição em que eu quero que o número seja exibido, coloco esse especificador de formato. Depois fecho as aspas, coloco uma **vírgula** e, em seguida, a variável do tipo inteiro. Qual? A variável `idade`. Ele vai pegar o valor da variável `idade` lá na memória RAM e exibir nessa posição da mensagem.

```c
printf("idade = %d", idade);   // mostra: idade = 18
```

**Especificadores:**

| Tipo | Especificador |
|------|---------------|
| inteiro | `%d` (de decimal) ou `%i` [o original transcreveu "porcentagem e"] |
| `float` | `%f` |
| `char` | `%c` |

Aqui, `%d`/`%i` especificam um inteiro na base 10.

### Na prática (no editor)

Aqui eu tenho o nosso programa, com a `main` meio vazia. Vamos criar uma variável. Estou dentro da `main`, então ela vai ser **local**. Declaro a variável `idade`: o tipo inteiro, espaço, o nome. Estou declarando a variável: ele vai reservar uma caixinha da memória RAM.

Agora um elemento novo: a **memória RAM é dividida em compartimentos, em caixinhas**, nas quais eu posso escrever e ler informações. Quando você escreve `int idade`, o computador reserva uma caixinha da memória RAM e dá o nome a essa caixinha, o identificador dela: `idade`. E qual valor está lá nesse instante? **Lixo.** Não tem nada garantido: pode ser qualquer valor, inclusive zero, mas não tem como garantir nada.

Como faço uma atribuição? O nome da variável, espaço, o sinal de igual, o valor que vou atribuir: no caso, 18. Quando passar por essa linha, ele vai fazer o quê? Falando como o computador: "Tem uma variável chamada `idade` na memória RAM? Tem. Escreve o valor 18 nela." Ele apaga qualquer lixo que tinha lá e escreve o valor 18.

Agora vou exibir esse valor: `printf`, "idade = ", e quero receber nessa posição o valor da variável `idade`. Qual é o tipo da variável? É um inteiro, então `%d` dentro das aspas e, fora das aspas, vírgula e `idade`. Deixo um `\n` no final para ir para a linha de baixo, caso eu continue esse programa depois.

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    int idade;
    idade = 18;
    printf("idade = %d\n", idade);

    return 0;
}
```

Quando o programa chega nessa linha do `printf`, ele fala: "Exiba essa mensagem na tela; quando chegar no `%d`, exiba um inteiro. Qual inteiro? O da variável `idade`. Tem uma variável chamada `idade` na memória? Tem. Quanto vale? 18." Ele pega o valor 18 e coloca onde está o `%d`. Executando: **idade = 18**. Então, nesse instante, a gente reservou espaço para a variável, escreveu o valor 18 e depois **leu** esse valor para exibir na tela. Tranquilo?

#### Um exemplo com cada tipo

Agora vamos fazer um exemplo com cada um dos tipos que a gente aprendeu.

**Salário (`float`).** Salário tem centavos, então uso `float`. [Brincadeira do professor sobre o primeiro salário dos alunos quando formados; o valor exato citado no original está confuso e não pôde ser recuperado.] Para exibir, uso `%f`. Executando, ele mostra o valor com **6 casas decimais** por padrão (lembrando que o `float` tem 7 casas de precisão) [verificar: trecho confuso no original]. Se eu quiser **formatar**, coloco um `.2` no especificador: `%.2f`. Falando como o computador: "aqui é um `float` e exiba apenas 2 casas depois do ponto." Executando de novo: o valor aparece com 2 casas decimais, por exemplo, "... reais e 90 centavos".

**Letra (`char`).** Em que **bloco** a gente vai ter aula? Quero salvar "bloco A": é uma letra, um caractere. Então `char bloco;`, e atribuo o valor: lembra que o valor tem que estar **entre aspas simples** (`'A'`) [verificar: a letra]. Para exibir, uso `%c`.

**Vários valores em um único `printf`.** Posso usar um único `printf` para exibir esses três valores? Pode. Eu tenho três especificadores (`%d`, `%.2f` e `%c`), então preciso de **três variáveis**, separadas por vírgula, **na mesma ordem em que aparecem os especificadores**: o primeiro especificador é de um inteiro, a `idade`; o segundo, `%.2f`, é o `salario`; o terceiro, `%c`, é o `bloco`.

```c
int idade = 18;
float salario = 2500.90;   // valor ilustrativo [verificar]
char bloco = 'A';          // [verificar]

printf("Idade = %d, Salario = %.2f, Bloco = %c\n", idade, salario, bloco);
```

Rodando: a idade é 18, o salário aparece com 2 casas, e o bloco aparece como a letra. **Lembre-se sempre:** todos os especificadores que você colocar entre as aspas precisam das respectivas variáveis, separadas por vírgula e **na mesma ordem**.

### Material complementar do slide (não precisa decorar)

Deixei no slide alguns exemplos de tudo o que a gente conversou, inclusive exibindo várias variáveis em um `printf`. E também deixei uma **tabela mais completa de especificadores de tipo**, que vocês não precisam decorar, mas podem **consultar** sempre que precisarem. Ela inclui o `char`, o `short int`, o inteiro sem sinal, o inteiro longo etc. (está completa no livro). **Não tem que saber decorar; tem que saber que existe e onde consultar.**

**Bases numéricas.** Se você quiser atribuir o valor 18, normalmente é na **base 10**. Mas, caso você queira, pode atribuir um valor em **hexadecimal**, colocando `0x` na frente. Em **octal** (base 8), você coloca um `0` na frente. Também dá para atribuir em **binário**, colocando `0b` (ou `0B`) na frente [verificar]. Não precisa decorar; basta consultar o slide ou o livro depois.

**Variantes dos inteiros e sufixos.** Existem também as variantes dos inteiros: inteiro sem sinal (*unsigned*), inteiro longo (*long*), inteiro curto (*short*), inteiro longo sem sinal. Na hora de fazer a atribuição, basta colocar um **`U`** ou um **`L`** ao lado do número, como a tabela completa mostra. E, se for um número com casa decimal (por exemplo, `float` ou `double`), você coloca uma letra (como `F`) no final, como mostra o exemplo do slide [verificar].

Por exemplo: **`0x15FUL`**. O que isso representa? O `0x` está dizendo que o número está em **hexadecimal**; `15F` é o valor em hexadecimal (lembre que o hexadecimal usa os valores de 0 a 9 e de A a F); o `U` é de *unsigned* (**sem sinal**) e o `L` é de *long* (**longo**). Mas, por enquanto, não precisa se preocupar em decorar isso; eu deixei no slide mais para consulta.

**Formatação do `printf`.** O `printf` (o *f* é de *formatado*) tem diversas formatações, como o `%.2f` para mostrar duas casas decimais. Existe uma sequência de diversas formatações que você pode usar na hora de mostrar o seu código. Vale brincar com cada um desses tipos.

**`sizeof`: quantos bytes cada tipo ocupa.** No final, esses valores (quanto ocupa um `int`, um `char`, um `float`, um `long`, um `double`) **variam de computador para computador**. Como eu sei, no meu computador, quanto vale isso? Você pode utilizar a função **`sizeof`** [verificar: o original diz "tais de ó"]: você passa o **tipo** ou o **nome da variável** que quer saber o tamanho, e ela retorna um número inteiro que diz quantos bytes ocupa: por exemplo, "o `int` ocupa 4 bytes". No slide tem um exemplo de código e a saída de exemplo, **no computador do professor**, mostrando quanto ocupa cada um desses tipos.

### Constantes

Para finalizar: variável é uma caixinha de memória cujo valor pode ser trocado, **o valor varia**. Porém, às vezes é interessante criar uma **constante**: um valor que não muda. Você pode definir uma constante e proteger esse valor para que não seja alterado.

#### `#define`

Lá no começo, junto com os `include` (pode ser depois dos `include`), você usa esta sintaxe: o `#` (cerquilha), a palavra `define`, espaço, o nome da sua constante, espaço, o valor. Por exemplo, o valor de π: faz sentido o usuário poder alterar o valor de π? Não, π é constante.

```c
#define PI 3.1416
```

Repare que, nesse caso, **não tem tipo, não tem sinal de igual e não tem ponto e vírgula**. Por quê? Porque, na verdade, ele **não é uma variável**: não vai criar uma caixinha na memória RAM. É o que a gente chama de **diretiva de pré-compilação**. O que ele faz? **Antes de compilar** o seu código, o compilador vai pegar e **substituir** tudo: onde a gente escrever `PI`, ele vai substituir pelo valor `3.1416`. Ou seja, não é uma posição de memória; é só uma **regrinha para o compilador**, aplicada na hora em que o seu código é compilado.

É bom porque **facilita a manutenção do código**: se você usa o mesmo valor em diversos lugares, pode usar uma constante. Também evita que alguém vá lá e queira trocar o valor de algo importante para você, como o π.

#### `const`

Vocês também podem ver, no livro, outra forma: criar uma **variável definida como constante**, com `const`.

```c
const double PI = 3.1415;   // [verificar: 3.1415 ou 3.1416]
```

Repare que, nesse caso, é diferente: **não é uma definição de pré-compilação**; existe uma variável na memória RAM, só que ela é **protegida** para que você não altere o valor dela. Nesse slide tem um exemplo de como declarar e como exibir o valor de uma constante.

### Encerramento

É isso, pessoal. Eu vou deixar aqui para vocês alguns exercícios para que possam praticar. Finalizamos, então. Um grande abraço, bons estudos e até a próxima.

### Avisos da aula

Há exercícios no material da disciplina sobre variáveis. Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_04_Operadores_Aritmeticos.md -->
## Aula 04 – Operadores Aritméticos

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Burial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor Atom na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

### Tópicos abordados

- Operadores aritméticos (soma, subtração, multiplicação, divisão) e tipos dos resultados
- Como a atribuição é executada: direita primeiro, depois esquerda
- Execução do programa passo a passo (variáveis como "caixinhas" na memória RAM)
- Divisão inteira e o operador de resto `%`
- Divisão com `float`, `%f` e conversão de tipo (*cast*)
- Incremento (`++`) e decremento (`--`); pré-incremento × pós-incremento
- Precedência de operadores e uso de parênteses

### Glossário

- **Operador aritmético:** símbolo para fazer conta com valores de variáveis (`+`, `-`, `*`, `/`, `%`).
- **Atribuição (`=`):** a expressão do lado direito é resolvida primeiro e o resultado é salvo na variável do lado esquerdo.
- **Expressão:** conta ou combinação de valores e variáveis que o computador resolve.
- **Divisão inteira:** divisão entre dois inteiros; o resultado é a parte inteira (10 / 3 = 3).
- **Resto da divisão (`%`):** em C, o símbolo `%` retorna o resto da divisão; não tem relação com porcentagem.
- **Tipo mais abrangente:** em operações com tipos misturados, o resultado é do tipo mais abrangente (`float`, porque os inteiros são um subconjunto dos reais).
- **Cast (`(float)`):** conversão de tipo na hora da conta, escrita entre parênteses antes da variável.
- **Incremento (`++`):** soma uma unidade à variável.
- **Decremento (`--`):** subtrai uma unidade da variável.
- **Pré-incremento (`++x`):** incrementa primeiro, depois usa o valor.
- **Pós-incremento (`x++`):** usa o valor primeiro, depois incrementa.
- **Precedência de operadores:** a ordem em que as operações são resolvidas.
- **Lixo:** valor indeterminado de uma variável declarada e ainda não preenchida.
- **`%d`, `%f`:** marcadores do `printf` para exibir inteiro e `float`, respectivamente.

---

### Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos estudar os **operadores aritméticos**. Na aula passada aprendemos a criar variáveis, entrar com valores e exibir esses valores, mas ainda não sabemos como fazer conta com esses valores, e é isso que a gente vai aprender.

Para isso vamos utilizar os mesmos operadores aritméticos que nós temos na matemática: soma, subtração, multiplicação e divisão, que são os mais comuns. Você pode utilizá-los para fazer conta com os valores que estão lá nas variáveis, na memória RAM. Você deve utilizá-los para fazer operações com variáveis do **mesmo tipo**: se você somar dois inteiros, a resposta vai ser um inteiro; com dois floats, a resposta vai ser um float. E se você misturar inteiro e float, a resposta vai ser um float, um número real, que é o tipo mais abrangente. Temos também o resto da divisão e os operadores de pré e pós-incremento, que a gente vai ver na sequência.

**Como a atribuição funciona.** [O professor mostra exemplos em um slide; trecho confuso no original, verificar.] Ele faz a conta primeiro: 10 mais 2, 12, e salva o 12. Depois, para algo como "`x` recebe `a - 3`": ele vai lá na memória RAM ver quanto vale `a`; vamos supor 10; traz para cá, 10 menos 3, 7; salva 7 aqui. Então ele **sempre resolve o que está na expressão do lado direito e depois salva no lado esquerdo**.

### Somando dois valores (na prática, no Atom)

Vamos para a prática. Vou abrir o nosso Atom e aqui eu quero somar dois valores. Vou criar `int a = 10;`. Aqui estou criando (declarando) a variável e atribuindo o valor na mesma linha. Depois, `int b = 3;`. Criei minhas duas variáveis, e eu vou ter que salvar o resultado em algum lugar, então vou criar outra variável, `int resultado;`, em que ainda não vou salvar nada. Agora vou fazer a conta: `resultado = a + b;`. E agora posso exibir. Como eu exibo a variável `resultado`? Com o `printf`. Qual é o tipo da variável `resultado`? É um inteiro, então `%d` dentro das aspas e, fora das aspas, vírgula e `resultado`. Vou colocar um `\n` para ficar esteticamente mais certinho. Vou executar com F6 e repare: resultado igual a 13 [verificar: o original diz "3"].

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    int a = 10;
    int b = 3;
    int resultado;

    resultado = a + b;
    printf("Resultado = %d\n", resultado);

    return 0;
}
```

### Como o computador executa o programa, passo a passo

Vamos entender como esse programa foi executado. Quando o computador vai executar o programa, sempre, pessoal, ele vai executar passo a passo a minha receitinha de bolo, **linha por linha**. E o programa sempre começa pela função `main`: ele vai procurar a `main` e começar a executar.

- `int a = 10;` significa: "Computador, reserve uma caixinha de tamanho inteiro e chame-a de `a`, e salve nela o valor 10."
- Linha 6: "Computador, reserve uma caixinha e chame-a de `b`, e salve nela o valor 3."
- "Computador, reserve uma caixinha chamada `resultado` e não salve nada." O que vai ter nesse instante na variável `resultado`? **Lixo**. Ok.

Quando chegar na linha da conta, repare: temos uma **atribuição**, o símbolo de igual. Aqui a gente tem uma **expressão**: ele vai resolver essa conta e depois salvar na variável `resultado`. Falando como o computador: "Tem uma variável chamada `a`? Vê quanto vale: 10. Traz o 10 para cá. Tem uma variável chamada `b`? Vê quanto vale: 3. Faz a conta: 10 mais 3, terminou, o resultado é 13. Pega 13 e salva na variável `resultado`."

Depois eu dou o `printf`. Falando como o computador: "Exiba a palavra 'resultado' e depois exiba um número inteiro." Qual número inteiro? O que está na variável `resultado`. O computador tem alguma variável `resultado`? Tem. Quanto vale? 13. Pega o 13 e exibe [verificar: o original diz "salva"]. Repare que o valor foi trocado de lixo para 13. Assim que eu termino essa conta, faço a atribuição do valor, e esse valor é salvo na memória RAM.

### Subtração, multiplicação e divisão inteira

Brincando um pouquinho aqui: `a - b` é 10 menos 3, 7. `a * b` é 10 vezes 3, 30. `a / b`: 10 dividido por 3 dá... 3. Ué, como assim? 10 dividido por 3 é 3? Está errado? Não, porque aqui a operação é **inteira**: a aritmética é feita a partir de números inteiros, então 10 dividido por 3 é 3. Lembra da conta com criancinhas: eu tenho 10 criancinhas e vou dividir em 3 grupos. Dá 3 criancinhas em cada grupo, e sobra uma criancinha que vai ficar sem grupo. Isso é o **resto**.

Esse resto, tem como eu pegar? Tem. Lembra que existe um operador, o símbolo de porcentagem (`%`)? Repare que na computação, na linguagem C, esse símbolo que a gente normalmente usa para porcentagem quer dizer **o resto da divisão**. Não tem nada a ver com cálculo percentual. Então eu falo ao computador: divida `a` por `b` e salve o resto da divisão de `a` por `b` na variável `resultado`. Qual é o resto da divisão de 10 por 3? O quociente é 3 e o resto é 1. Então, se eu executar, o resultado é 1. É o meu resto.

```c
resultado = a % b;   // resto da divisão de a por b (10 % 3 = 1)
```

### Divisão com `float` e `%f`

E se eu quiser 3,33? Para isso o resultado não pode ser `int`: tem que ser `float`. E, para exibir um `float`, tem que ser `%f`. Deixo duas casas decimais [`%.2f`, verificar: trecho confuso no original]. Então, beleza: dividi 10 por 3 e salvei o resultado em um `float`.

```c
float resultado;
resultado = a / b;
printf("Resultado = %.2f\n", resultado);
```

Agora eu vou conseguir 3,33? Não: dá 3,00. Agora a gente está trabalhando com `float`, então por que deu 3,00? Lembra que eu falei para vocês que o processamento dessa linha é feito em **duas etapas**: primeiro ele divide `a` por `b`, e depois ele salva o resultado na variável `resultado`. `a` é inteiro e `b` é inteiro, então 10 dividido por 3 dá 3 (a parte inteira). Depois que ele pegou esse 3, ele vai salvar na variável `resultado`, que vai ficar 3,00.

**Para obter 3,33**, uma das duas variáveis tem que ser `float`, porque eu estou fazendo uma mistura de tipos na mesma conta, e o resultado vai ser do tipo mais abrangente, nesse caso o `float`, porque os números inteiros são um subconjunto dos números reais. Posso, por exemplo, declarar a variável `b` como `float`. Agora sim: estou dividindo um inteiro por um float, e quando divido um inteiro por um float, dá um float: 3,33.

[Trecho confuso no original: o professor comenta que mudar o tipo da variável nem sempre é o desejado, pois ela pode representar uma quantidade que não faria sentido como número real.] Tem como fazer essa conta considerando que um deles é `float`? Tem, olha só. Mantenho `b` como `int` e, antes do nome da variável `a`, coloco `float` entre parênteses. Isso faz a conta considerando que a variável `a` é um `float`, um número real. Quando for dividir um `float` por um inteiro, um real por um inteiro, a resposta vai ser real, vai ser `float`. Vamos ver: 3,33. O nome dessa técnica é **cast** [verificar: o original diz "John de Best"], a conversão de tipo. Tranquilo até aqui?

```c
resultado = (float) a / b;   // cast: a é tratado como float na conta
```

### Incremento e decremento

Vocês devem ter visto também a questão dos **pré-incrementos** e **pós-incrementos**. O que é incrementar? Somar um, ou somar outro valor que você precisa. É muito comum, na computação, fazer uma contagem. Vamos criar aqui uma variável chamada `contador` com valor zero e um `printf` para exibir o valor dela. Estou contando e-mails que vou receber, contando arquivos... é muito comum: o computador vai contando 1, 2, 3, 4, 5, 6. Como quando eu conto nos dedos: virou um, 1; virou dois, 2; virou três... Eu tenho que somar um, sempre.

Como eu faço o computador somar um? Alguma ideia? O contador recebe o valor dele mais um: `contador = contador + 1;`. O contador vale 1? Não: independente do valor que ele tiver, ele vai ser incrementado. Quanto o contador valia antes? Mais uma unidade. Posso colocar `contador` dos dois lados da igualdade? Pode. Ele vai resolver a expressão que está do lado de cá e depois fazer a atribuição.

Então, o contador vale zero; zero mais um. Ele faz primeiro a conta, 0 + 1, e depois atribui. Repeti o mesmo `printf` aqui embaixo: ele é idêntico, só que nesse instante do código o meu contador vale zero antes e vale um depois. Vamos duplicar: `contador = contador + 1;` de novo. Então vale zero mais um, um: mostro um. Um mais um dá dois: mostro dois. Agora, na linha 11, ele vale dois. Dois mais um, três. Cada vez que eu faço `contador = contador + 1`, ele incrementa, soma uma unidade no meu contador.

```c
int contador = 0;
printf("%d\n", contador);   // 0
contador = contador + 1;
printf("%d\n", contador);   // 1
contador = contador + 1;
printf("%d\n", contador);   // 2
```

É tão comum somar uma unidade que existe uma técnica para isso, chamada **incremento**: `contador++;`. Essa linha (linha 8) faz exatamente a mesma coisa que a linha 7. `contador++` é apenas uma maneira abreviada de escrever `contador = contador + 1`. Vou apagar a outra aqui para vocês verem: ele faz exatamente a mesma coisa. Sempre que vocês virem `++` no código, `contador++`, vocês têm que ler como: "o valor do contador vai receber o valor que ele valia antes, mais uma unidade".

Da mesma maneira existe o **decremento**, que é subtrair um valor, para fazer contagens regressivas: 10, 9, 8, 7... Como seria? O contador começa em 10 e eu faço `contador = contador - 1;`. 10 menos 1, 9; 9 menos 1, 8; 8 menos 1, 7. Executando: 10, 9, 8, 7. E, como isso também é muito comum, existe a maneira abreviada, o decremento: `contador--;`. Sempre que vocês virem `--`, ele está dizendo que essa variável recebe o valor que ela valia antes menos uma unidade. É muito comum na computação, tanto contagens progressivas quanto regressivas.

```c
contador--;   // mesmo que contador = contador - 1;
```

### Pré-incremento × pós-incremento

Eu posso misturar o incremento com uma atribuição. Olhem esse exemplo: a variável `contador` vale 10, a variável `saida` não tem nenhum valor, e embaixo tem a exibição dos dois valores. O que acontece com `saida = contador++;`? Repare que tenho duas instruções: estou falando para o contador incrementar (somar uma unidade) e, também, para ele copiar o valor do contador para a saída. A questão é: qual ele vai fazer primeiro? Primeiro copiar o valor para a saída e depois incrementar o contador, ou primeiro incrementar o contador e depois copiar o valor para a saída?

Esse caso é o **pós-incremento**: ele incrementa *depois*, repare que o `++` está depois da variável. Primeiro ele copia o valor do contador para a saída: nesse instante o contador vale 10, então copio 10 para a saída. Depois ele faz o `contador++`, e o contador vai de 10 para 11. Então **`saida` vale 10 e `contador` vale 11**.

Também podemos ter o caso oposto: `saida = ++contador;`. Esse é o **pré-incremento**. Aqui primeiro ele incrementa o contador e depois gera a saída. Chegou aqui, o contador vale 10. Primeiro ele incrementa o valor para 11 e depois copia 11 para a saída. Nesse caso, o contador vale 11 e a saída vale 11 [verificar: o original diz "1"].

```c
int contador = 10;
int saida;

saida = contador++;   // pós: saida = 10, contador = 11
// saida = ++contador;   // pré: saida = 11, contador = 11
```

### Precedência de operadores

Temos um último caso: uma variável `resultado`, e aqui eu estou exibindo o valor dela. Qual seria a saída se eu executar esse código? [Aqui, pessoal, você pode escrever a expressão que quiser, sem problema nenhum.] Alguns podem falar que o resultado é 64, outros vão falar que é 43. Reparem, pessoal: o computador é burro, mas ele sabe matemática. Na matemática eu faço primeiro as operações de multiplicação e divisão, depois soma e subtração. Então ele vai primeiro multiplicar 5 vezes 8, 40, mais 3, 43. E na matemática, se eu quisesse forçar a fazer o 3 mais 5 primeiro, eu faria o quê? Colocaria entre parênteses. Aqui é a mesma coisa: 3 mais 5 entre parênteses. Ele vai fazer primeiro o que está entre parênteses para depois multiplicar pelo outro: 3 mais 5, 8, vezes 8, 64.

```c
resultado = 3 + 5 * 8;     // 43
resultado = (3 + 5) * 8;   // 64
```

[Expressões reconstruídas a partir dos números citados; verificar.]

Então você pode construir a fórmula que você quiser aqui. Ele vai resolver continha por continha, até terminar o resultado da expressão, trabalhando com resultados parciais, e sempre vai seguir as regras da matemática. Vamos dar uma olhadinha na revisão:

1. Primeiro ele resolve as expressões que estão **entre parênteses**. Se você tiver parênteses dentro de parênteses, sempre os parênteses mais internos primeiro.
2. Depois ele faz as operações de **multiplicação e divisão**. Se houver várias, sempre da esquerda para a direita.
3. Depois, todas as operações de **soma e subtração**, também da esquerda para a direita.

Usando essas regras, você pode resolver qualquer um desses testes da internet, "de Einstein, que apenas gênios conseguem resolver". É bem tranquila essa parte da matemática, que se chama **precedência de operadores**: qual operador vem antes de qual operador, qual operação você faz primeiro.

Vamos olhar um exemplo em slide. [A expressão do slide não aparece na transcrição; pela descrição do professor, algo como uma divisão entre dois produtos de variáveis com somas entre parênteses, guardando o resultado em `p1` – verificar.] Quem você vai resolver primeiro? Os parênteses mais internos: primeiro `c + d`, depois `e + f`, indo da esquerda para a direita. Depois ele faz `a` vezes o resultado de `c + d`, e `b` vezes o resultado de `e + f`. Depois ele divide o resultado da primeira parte pelo resultado da segunda parte. E, tendo esse resultado, ele guarda em `p1`. No slide você tem o passo a passo.

### Voltando ao algoritmo da primeira aula

Agora a gente consegue fazer aquele algoritmo que a gente tinha na primeira aula: pegar os valores, somar e mostrar o resultado. Declaro as três variáveis [trecho confuso no original, algo sobre variável global], atribuo os valores também e mostro a saída. A gente consegue fazer, então, aquele exemplo lá da primeira aula.

### Encerramento

É isso, pessoal. No material, tenho alguns exercícios para vocês trabalharem esse conteúdo. Bons estudos, um grande abraço e até a próxima.

### Avisos da aula

No material da disciplina há exercícios sobre este conteúdo (operadores aritméticos). Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_05_Entrada_de_Dados.md -->
## Aula 05 – Entrada de Dados

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor Atom na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

### Tópicos abordados

- Receber valores do usuário com o comando `scanf`
- Expressão de controle (`%d`, `%f`, `%c`) e o operador `&`
- Exemplo: ler a idade do usuário e exibi-la
- Como funciona na memória RAM: endereço de memória, `&` e `%p`
- Ler vários valores com um único `scanf` (exemplo: data dd/mm/aaaa)
- Problema do buffer do teclado ao ler `char` depois de números, e como resolver

### Glossário

- **`scanf`:** comando que lê informações do teclado e salva em um endereço de memória.
- **Expressão de controle:** primeiro argumento do `scanf`; define o formato do valor lido.
- **`%d`:** lê/exibe número inteiro.
- **`%f`:** lê/exibe número `float`.
- **`%c`:** lê/exibe um caractere.
- **`&` (e comercial):** operador que converte o nome de uma variável no seu endereço de memória.
- **Endereço de memória:** número que identifica a posição ("caixinha") onde a variável está salva na memória RAM; costuma ser exibido em hexadecimal.
- **`%p`:** marcador do `printf` para exibir um endereço de memória (ponteiro).
- **Lixo:** valor aleatório que existe numa variável declarada e ainda não preenchida; não é garantido que seja zero.
- **Buffer do teclado:** memória temporária onde ficam as teclas digitadas, inclusive o *enter*.
- **`stdin`:** *standard input*, a entrada padrão (teclado).
- **`setbuf`:** função usada para configurar o buffer; aqui, para esvaziar o buffer de entrada.

---

### Introdução

Olá, pessoal, eu sou o professor Muriel e nesta aula vamos aprender como **receber valores**. Até agora o nosso programa é capaz de armazenar informação na memória RAM, fazer conta com esses valores e gerar uma saída. Mas, até agora, todos os valores são fixos: não tem como o usuário fornecer informação para o sistema. E é isso que vamos aprender nesta aula.

Uma das maneiras possíveis de receber valores é através do comando **`scanf`**. Vamos pensar da seguinte maneira: ele vai ler as informações do teclado e salvar em um endereço de memória.

### Sintaxe do `scanf`

Entre parênteses, o `scanf` recebe **dois argumentos**:

1. O primeiro é uma **expressão de controle**, que vai formatar o tipo do valor que estou lendo.
2. O segundo, separado por vírgula, é o símbolo **`&`** (e comercial) seguido do **nome da variável destino**, onde eu vou salvar o valor.

Na expressão de controle, se eu quiser interpretar o que está sendo digitado como um número inteiro, uso `%d`; se eu quiser interpretar como `float`, uso `%f`; se eu quiser interpretar como um caractere, uso `%c` [verificar: o original transcreveu "porcentagem e", "porcentagem i"; usei `%d` como no restante da aula]. E no destino eu vou utilizar sempre o símbolo `&` seguido do nome da variável destino. Por exemplo: `%d` com `&` e o nome da minha variável inteira; `%f` com `&` e o nome da variável `float`; e assim por diante.

### Exemplo: ler a idade do usuário

Como ficaria se eu quiser receber a idade de um usuário e em seguida exibir essa informação? Eu declaro a variável `idade`, dou um `printf` para exibir o pedido para o usuário e, em seguida, o `scanf`. Reparem que esse `printf` não está fazendo nenhuma leitura de dados: ele é **apenas estético**, para que o usuário não se perca. O comando que está fazendo a leitura é o `scanf`, com `%d`, porque o valor que estou lendo é um valor inteiro, vírgula, `&idade`. Ele vai pegar o valor que está vindo do teclado, interpretar como um valor inteiro e salvar no endereço de memória onde a variável `idade` está salva. Fiquem tranquilos: a gente vai conversar sobre esse endereço de memória. Em seguida, ele vai exibir "você tem tantos anos".

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    int idade;

    printf("Digite sua idade: ");
    scanf("%d", &idade);
    printf("Você tem %d anos\n", idade);

    return 0;
}
```

Vamos ver na prática como funciona. Aqui nós temos a função `main`, e dentro dela apenas declaramos a variável `idade` e solicitamos a idade para o usuário. Esse `printf` é apenas estético. Quem vai fazer a leitura de dados é a função `scanf`. Entre parênteses, dois argumentos: o primeiro, qual é o tipo de variável que estou lendo? É um inteiro, então `%d`; o segundo, onde eu vou salvar? Na variável destino, a variável `idade`: `&idade`.

Quando o programa chegar nessa linha, **ele vai parar e esperar o usuário digitar a informação**. Ele não vai continuar executando nada enquanto o usuário não digitar o valor e pressionar *enter*. Assim que ele fizer isso, posso mandar o `printf` "você tem `%d` anos". Qual é o valor que estou exibindo? A idade: ele vai pegar o valor que o usuário acabou de digitar e inserir na mensagem. Vamos executar para ver: F6, o programa pede a idade, digito 35 e aparece "você tem 35 anos" [trecho confuso no original].

### Como isso funciona na memória RAM

Vou pedir ajuda para a nossa memória RAM. Quando eu chego na linha 11 [declaração da variável], ele fala, como o computador: "reserve uma caixinha lá na memória RAM". [Trecho inaudível?: "vai ter 14"]. Essa caixinha vai ser sempre relacionada com a variável `idade`. Aqui o usuário vai digitar o valor: o que o usuário digita no teclado vai ser interpretado como um número inteiro e salvo no endereço de memória da variável `idade`. Onde está a idade? Está aqui. Então, por exemplo, se o usuário digitou 18, ele vai lá na memória RAM e escreve o valor 18. Em seguida, no `printf` "você tem `%d` anos", ele vai exibir o valor da idade: vai na memória RAM, a idade vale 18, pega esse 18 que o usuário acabou de escrever e exibe na tela. Ok?

### De onde vem o `&` (endereço de memória)

Mas de onde vem esse `&`? Pessoal, toda variável tem associado a ela um **endereço de memória**. Cada posição da memória RAM é numerada: um, dois, três, quatro, cinco, seis, sete... mas, como são milhões, a gente costuma exibir esses valores em **hexadecimal**. Quando você pede para reservar memória, cada variável vai ter o seu endereço de memória: quando eu falo "a variável `idade`", ele sabe que ela está no endereço 25, por exemplo, ou no endereço 48. Cada caixinha tem o seu próprio endereço.

Então, a função `scanf`, na verdade, **não recebe o nome da variável: ela recebe o endereço de memória onde aquela variável está salva**. Como eu faço para converter `idade` no endereço de memória onde a idade está salva? Eu uso o operador `&` (e comercial).

### Exibindo o endereço de memória

Vamos olhar outro código, um exemplo que vai mostrar o endereço de memória. Eu reservei a caixinha de memória chamada `idade`. Eu posso exibir esse endereço? Pode: com o `&`, ele converte o nome da variável no endereço onde ela está salva. Aqui estou mandando o computador exibir na tela o endereço de memória da variável `idade`; para exibir, uso o `%p`, de ponteiro [verificar]. E aqui estou mostrando o valor da idade, o valor salvo na caixinha `idade`. Nesse instante eu tenho um valor lá? Sim, mas qual valor? **Lixo**, lembra? Eu não tenho garantia de que vai ser zero. Depois eu recebo o valor, e então mostro de novo o endereço de memória e o novo valor armazenado.

```c
int idade;
printf("Endereço: %p\n", &idade);
printf("Valor: %d\n", idade);      // lixo
printf("Digite a idade: ");
scanf("%d", &idade);
printf("Endereço: %p\n", &idade);  // o mesmo endereço
printf("Valor: %d\n", idade);      // o valor digitado
```

Vamos executar, F6. O endereço de memória aparece em hexadecimal: a variável `idade` está nesse endereço, esse é o número da caixinha dela, e o valor que está lá é 32.1667 [verificar: número do lixo, truncado no original]. Isso é o nosso lixo, lembra? Eu falei que tem um lixo lá. Agora vou digitar a idade: 18, enter. Repare: o endereço de memória é o mesmo; a caixinha continua sempre igual. O que mudou é o valor que está lá dentro.

Resumindo como funciona: quando eu declaro a variável `idade`, ele vai à memória RAM e reserva a caixinha; esse endereço de memória fica associado a essa variável, e o valor que tem nesse momento é lixo, qualquer valor aleatório. Depois ele mostra o endereço e mostra a idade (o lixo). Em seguida eu peço a idade: o valor que o usuário digitar, ele lê do teclado, interpreta como um número e salva no endereço de memória onde a variável `idade` está salva. O `&` transforma `idade` no endereço de memória, e ele salva nessa posição, por exemplo, 18. Em seguida, ao exibir o endereço de novo, repare que ele continuou exatamente igual; e depois mostra a idade, que agora vale 18: o valor daquela posição de memória foi alterado.

### Lendo vários valores com um único `scanf`

Voltando ao slide: posso utilizar o `scanf` para ler vários valores, ou um comando `scanf` lê apenas um valor? Eu posso utilizar para ler vários. Como funciona: eu coloco, na expressão de controle, os especificadores de tipo de todas as variáveis que eu quero que ele leia; e depois, nos destinos, coloco todos os destinos separados por vírgula, **na mesma ordem em que eles aparecem**. É muito parecido com quando eu quero exibir várias variáveis dentro do mesmo `printf`, não é?

Vamos ver no código. Declaro três variáveis: `dia`, `mes` e `ano`. Posso declarar as três na mesma linha? Pode, não tem problema nenhum, se eu separar por vírgula, mas cuidado para não se perder; não é muito recomendável para quem está começando. Depois mostro um `printf`, e aqui eu quero que ele digite o dia, barra, o mês, barra, o ano. Eu quero pegar os três valores inteiros (dia, mês e ano) separados por barra. Como fica o `scanf`? O formato para receber é: um número inteiro, que vai ser o dia; depois uma barra; depois outro número inteiro, o mês; depois outra barra; depois outro `%d` [verificar: o original diz "%i"], o ano. Depois vírgula, e agora os destinos: o primeiro `%d` eu salvo no endereço de memória onde está o dia; vírgula, o segundo `%d` no endereço de memória onde está o mês; vírgula, o terceiro no endereço de memória onde está o ano. Coloco todos os destinos com o `&` antes de cada um, na mesma ordem em que eles aparecem. Em seguida estou exibindo essas três variáveis. Digitando a data 1/1/2021 [trecho confuso no original], ele pegou os três valores separados por barra.

```c
int dia, mes, ano;

printf("Digite a data (dd/mm/aaaa): ");
scanf("%d/%d/%d", &dia, &mes, &ano);
printf("Data: %d/%d/%d\n", dia, mes, ano);
```

### Problema do buffer do teclado

Para finalizar a aula de hoje, vamos ver um problema que é muito comum: **problemas com buffer de teclado**. Como assim, professor? Olhando para esse código: declarei uma letra (`char`) e dois números inteiros, e estou fazendo três `printf`. A princípio não tem nenhum erro de sintaxe, os tipos estão perfeitos. Porém ele vai fazer a leitura de um número, depois de uma letra (um `char`) e depois de outro número.

```c
char letra;
int num1, num2;

printf("Digite um número: ");
scanf("%d", &num1);
printf("Digite uma letra: ");
scanf("%c", &letra);
printf("Digite outro número: ");
scanf("%d", &num2);
```

Quando eu rodo, olha o que acontece: "digite um número", por exemplo 15, enter. Reparem que **ele não parou para eu digitar a letra**: foi direto para o segundo número e pulou o `char`. Por que isso aconteceu? Porque, para digitar o 15, depois do 15 eu digitei o quê? Um *enter*. O computador pega o 15 e salva na primeira variável [trecho confuso no original]. Só que o *enter* que eu digitei **ficou na memória temporária do teclado, que a gente chama de buffer**. Esse *enter*, no fundo, é um caractere, só que invisível. Então, quando chega no `scanf` do `char`, o computador pega o que tem do teclado, interpreta como um caractere e salva em `letra`: quem ele está pegando? O *enter*. Ele acha que o usuário digitou o *enter* como valor e salva o *enter* no endereço de memória de `letra`, porque o *enter* é um caractere, e depois segue direto para o "digite o número 2".

**Tem como resolver? Tem.** Eu posso limpar o buffer do teclado, para que, quando ele chegar no segundo `scanf`, esse erro não ocorra. O que eu tenho que fazer é, antes do meu próximo `scanf`, dar um comando para limpar esse buffer. Uma das possibilidades é o `setbuf`: estou configurando o buffer da entrada padrão (`stdin`, *standard input*), e o valor que eu coloco nele é `NULL` (nulo), ou seja, o buffer fica vazio [verificar: o original transcreveu "set buffer, STD, no luo"].

```c
printf("Digite um número: ");
scanf("%d", &num1);
setbuf(stdin, NULL);   // limpa o buffer do teclado
printf("Digite uma letra: ");
scanf("%c", &letra);
```

Vamos executar agora: digite o número, 15, enter; e agora ele parou. Digite uma letra; digite outro número, 18. Agora vai funcionar. Esse problema normalmente acontece quando você lê um `int` ou um `float` e, logo em seguida, precisa ler um caractere ou uma sequência de caracteres. [Trecho confuso no original.]

### Encerramento

No slide tem a explicação para você consultar e, para vocês praticarem, temos também alguns exercícios, ok? É isso, pessoal. Bons estudos, um grande abraço e até a próxima!

### Avisos da aula

Há exercícios no material da disciplina para praticar o conteúdo desta aula (`scanf`). Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_06_Estrutura_de_Selecao_if_else.md -->
## Aula 06 – Estrutura de Seleção (if / else)

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Proso do Aguadiel"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor Atom na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

### Tópicos abordados

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

### Glossário

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

### Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos falar sobre a **estrutura de seleção**, o `if` e o `else`. Até agora, os nossos programas são capazes de receber informação pelo teclado, armazenar em variáveis, fazer uma conta e gerar uma saída. E todas as linhas do nosso programa são executadas, uma vez, obrigatoriamente.

Porém, na solução de alguns problemas, mais de um caminho pode ser necessário: eu tenho vários casos e, com isso, durante a execução, o programa pode seguir **caminhos alternativos**. Pode ter linhas do meu código que eu vou executar e outras que eu não vou executar. E é papel de quem escreve o código, ou seja, você, o programador, dar condições para o programa executar o caminho adequado para resolver o problema. Você não pode fazer um programa que resolve parcialmente o problema: para cada caso possível, ele tem que dar uma resposta; você não pode entregar uma solução parcial [verificar: trecho confuso no original].

E como a gente vai fazer isso? Através da estrutura `if` / `else`: em inglês, *if* é "se" e *else* é "senão". Se uma condição for verdadeira, eu faço uma coisa; senão, eu faço outra coisa.

### Sintaxe do `if` / `else`

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

### Como escrever a condição

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

### Exemplo: maior ou menor de idade

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

### Operadores lógicos: E, OU e negação

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

### Exemplo: adolescente (usando `&&`)

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

### `if` aninhado (um dentro do outro)

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

### Indentação

Reparem também que eu fiz uma coisa diferente nesse código: toda vez que eu abro uma chavinha, um bloco de código novo, o código dentro dela fica empurrado um pouquinho para frente. Isso se chama **indentação**, e serve para organizar o nosso código. Aqui eu consigo ver que essa estrutura de `if` está dentro desse bloco porque ela está alinhada para dentro, em relação à linha onde está o `else` externo.

Olha só como fica sem nenhuma indentação: fica difícil de entender, difícil de manter, e a qualidade do código cai. [Frase inaudível?.] Posso voltar ao código que eu tinha antes (Ctrl+Z): olha como ele é mais fácil de entender: dentro desse `if` só está esse `printf`; dentro desse `else` está essa estrutura de `if`.

E se eu quiser mais uma categoria? Por exemplo, o **bebê** [verificar: o original transcreveu "ggbb", "gbb"; pelo final da aula parece ser "bebê"]. Onde ele entraria? Se chegou até aqui, ou ele é criança ou é bebê. Então, aqui dentro desse `else`, coloco outra estrutura `if`: se a idade for maior ou igual a [limite que não aparece na transcrição], "Você é criança"; caso contrário, "Você é bebê". Ou seja, tenho um `if/else` dentro de outro `if/else`, dentro de outro `if/else`; olha só como eu consigo acompanhar o fechamento das chaves.

### Omitindo as chaves e `else if`

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

### Operador ternário

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

### Encerramento

É isso, pessoal. Tem alguns exercícios aqui para vocês praticarem; resolvam esses exercícios. Um grande abraço, bons estudos a todos e até a próxima!

### Avisos da aula

Há exercícios no material da disciplina sobre a estrutura de seleção. Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_07_Estrutura_de_Selecao_Switch.md -->
## Aula 07 – Estrutura de Seleção `switch`

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Processor Memorial"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

### Tópicos abordados

- Quando usar `switch` em vez de vários `if/else`
- Limitação: só funciona com variáveis `int` e `char`
- Sintaxe: `switch`, `case`, `break` e `default`
- Exemplo: menu de opções com `int` (cores)
- Versão com `char`: aspas simples e diferença entre maiúscula e minúscula
- Mais de um `case` para o mesmo `break` (o `break` não é obrigatório)

### Glossário

- **`switch`:** estrutura de seleção multicondicional; recebe o nome de uma variável (não uma condição) e compara o valor com cada `case`.
- **`case`:** cada valor possível da variável que se quer tratar, seguido de dois pontos e das instruções.
- **`break`:** encerra a execução do bloco do `case` e continua a execução fora do `switch`.
- **`default`:** caso padrão; executa quando o valor da variável não é igual a nenhum dos `case`.
- **Estrutura multicondicional:** estrutura com várias alternativas, como o `switch`.
- **Aspas simples (`'v'`):** em C, o valor de um `char` é escrito entre aspas simples, para diferenciá-lo do nome de uma variável.
- **Maiúscula × minúscula:** para o computador, `'V'` e `'v'` são valores diferentes.

---

### Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos aprender sobre a estrutura de seleção **`switch`**.

Na aula anterior aprendemos a estrutura de seleção `if/else`, que era muito útil quando eu queria resolver problemas que tinham duas alternativas diferentes. Porém, muitas vezes eu tinha que tratar 4 ou 10 alternativas diferentes. Nesse caso, apesar de eu poder aninhar a estrutura de `if/else`, um dentro do outro [trecho confuso no original], isso traz muita complexidade para o meu código. Uma solução que você pode utilizar nesse caso é uma estrutura **multicondicional** chamada `switch`. Porém, a gente vai ver que ela não é útil em todos os casos, pois **ela opera apenas com variáveis do tipo `int` e `char`**.

### Sintaxe do `switch`

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

### Exemplo: menu de cores com `int`

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

### Versão com `char`: aspas simples e maiúsculas × minúsculas

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

### Encerramento

Temos, para vocês, alguns exercícios para praticarem; deem uma olhadinha depois. É isso, um grande abraço, bons estudos e até a próxima!

### Avisos da aula

Há exercícios no material da disciplina sobre a estrutura `switch`. Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_08_Estrutura_de_Repeticao_While.md -->
## Aula 08 – Estrutura de Repetição `while`

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Moriel"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

### Tópicos abordados

- Por que usar estruturas de repetição (laços)
- Funcionamento e sintaxe do `while`
- Exemplo: contar de 0 até um limite
- Cuidado com laços infinitos (e *overflow*)
- Laço com número de repetições conhecido × desconhecido
- Variável **contador** (contar quantas vezes uma condição acontece)
- Variável **acumulador** (somar valores ao longo das repetições)

### Glossário

- **Estrutura de repetição / laço (*loop*):** estrutura que repete um bloco de comandos.
- **`while`:** "enquanto"; testa a condição **antes** de cada repetição; se verdadeira, executa o bloco e volta a testar; se falsa, sai do laço.
- **Laço infinito:** laço cuja condição nunca fica falsa; é obrigação do programador garantir que o laço termine.
- **Overflow:** quando um inteiro ultrapassa o limite do tipo (cerca de 2 bilhões para `int`) e passa a valores negativos.
- **Erro lógico:** o programa compila e roda, mas não faz o que deveria.
- **Variável contador:** variável que conta quantas vezes uma condição acontece; deve ser inicializada.
- **Variável acumulador:** variável que acumula, a cada repetição, uma parte do resultado (por exemplo, uma soma).
- **Inicializar:** atribuir um valor inicial a uma variável; caso contrário ela começa com lixo.
- **Número par:** número cujo resto da divisão por 2 é zero (`i % 2 == 0`).

---

### Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos conversar sobre a estrutura de repetição **`while`**.

Até agora, o nosso programa executava a partir da `main`, linha por linha, e cada linha era executada uma única vez. Porém, em alguns casos eu posso querer que um comando ou um comportamento do meu programa seja **repetido diversas vezes**. Nesse caso vou utilizar as estruturas de repetição: quando eu quero repetir um comportamento diversas vezes, escrevo esse comportamento **uma vez só** e mando executar quantas vezes eu quiser. E essas repetições podem ser **controladas por uma condição**.

**Cuidado:** você não pode deixar elas repetirem infinitamente. É sua obrigação, como programador, garantir que o laço acabe; caso contrário, ele fica rodando infinitamente.

### Como o `while` funciona

A estrutura `while` verifica, **no começo do laço**, uma condição: verdadeira ou falsa. Se for verdadeira, executa todo o conjunto de comandos que estiver embaixo dela, volta e testa novamente. Se for verdadeira, executa, volta, testa, volta, executa, testa. Então eu posso pensar no laço como o seguinte mecanismo: **enquanto a minha condição for verdadeira, executa o bloco do laço; caso contrário, sai do laço.**

### Sintaxe

Eu coloco a palavra `while`, que em inglês quer dizer "enquanto"; entre parênteses, a condição (nesse caso utilizo as mesmas regras que a gente utilizava na condicional do `if`). Em seguida, coloco o meu bloco de repetição. Todas as instruções que estiverem no bloco vão ser repetidas **enquanto essa minha condição for verdadeira**.

```c
while (condição) {
    // instruções repetidas enquanto a condição for verdadeira
}
```

### Exemplo: mostrar valores de 0 até 5

Vamos supor que eu queira mostrar o valor de uma variável `i`, de zero até 5. Na `main`, declaro a variável inteira, atribuo o valor zero e depois chego no `while` e testo.

```c
int i = 0;

while (i <= 5) {
    printf("%d\n", i);
    i++;
}
```

Passo a passo:

- `i` vale 0. Testa: 0 é menor ou igual a 5? Verdade [verificar: no início da explicação o original diz "menor que 5", mas o final mostra "menor ou igual a 5"]. Executa o que está dentro: mostro 0 e atualizo o valor (`i++`), que agora vale 0 + 1, ou seja, 1. Terminou o bloco, volta e testa de novo.
- 1 é menor ou igual a 5? Verdade. Mostro 1, atualizo para 2. Testa de novo.
- 2 é menor ou igual a 5, mostro 2, atualizo. 3 é menor ou igual a 5, mostro 3, atualizo. 4, mostro, atualizo. 5 é menor ou igual a 5, mostro 5, atualizo para 6.
- 6 é menor ou igual a 5? **Falso.**

Então repare: no momento em que a minha condição fica falsa, ele **não executa o que está dentro do bloco e sai**. Depois ele continua com o que vem depois do laço e, se não tiver mais nada, encerra o programa.

### Na prática: contador e a velocidade do computador

Vamos dar uma olhadinha no código para ver como fica essa estrutura. Repare que eu também tenho um **contador** que conta quantas vezes o meu laço está repetindo. Comecei o contador em zero e vou repetir enquanto o contador for menor ou igual a 10: mostro o valor e incremento. Então vou mostrar todos os números de 0 a 10. Executando: mostrou todos os números de 0 a 10, rapidamente.

Agora vou mudar o limite para 10 mil, depois para 1 milhão, 100 milhões [verificar: números citados de forma confusa no original]. Repare como o computador é tão rápido que mal dá para acompanhar a contagem na tela: 1 milhão, 2 milhões, 3 milhões, 4 milhões... Ele é bom, mas lembre: ele é rápido. Ele vai ficar repetindo aquele código 10 milhões de vezes. O cuidado é **garantir que esse laço acabe**.

### Cuidado: laço infinito

Por exemplo, se eu faço isso aqui [laço com contador começando em zero e condição "contador maior ou igual a zero", incrementando a cada volta – verificar], quantas vezes esse laço vai repetir? Zero? Duas? Um milhão? Dez milhões? Infinitas? Repare: esse meu programa aqui está **em loop**, ele nunca vai finalizar. Na verdade, ele só vai finalizar quando chegar no maior valor inteiro, o limite dos inteiros, que é cerca de 2 bilhões. Ao somar mais um, ocorre o ***overflow***: o valor passa para cerca de menos 2 bilhões, e nesse caso menos 2 bilhões é menor que zero, a condição fica falsa e ele sai. Será um **erro lógico**: esse é um código que está em loop.

Posso pensar no caso oposto: enquanto o contador for **maior que zero** [contador começando em zero – verificar]. Quantas vezes o meu programa executa? Nenhuma, nem uma vez, porque a condição já é falsa no primeiro teste. Então, cuidado com a sua condição.

### Número de repetições conhecido × desconhecido

Reparem que, nesses exemplos, **eu sei quantas vezes o meu laço vai repetir**, olhando para o valor inicial do contador e para a condição [trecho confuso no original, algo como "de 0 a 9"].

Porém, nem sempre eu vou saber. Olha lá um exemplo: "*Faça um programa que leia e mostre os números digitados pelo usuário enquanto o valor for diferente de zero.*" Eu sei quantas vezes vai repetir? Não: depende de uma **condição externa**, ou seja, não depende da lógica do programa. Pode ser que o primeiro valor seja zero e o programa saia logo; pode ser que o usuário digite duas vezes valores diferentes de zero e depois zero; pode ser que ele digite infinitamente valores diferentes de zero. Então, repare que esse laço **não depende de um contador**.

[Trecho confuso no original: o professor comenta o valor inicial da variável, que de início teria lixo, e a necessidade de ler um valor antes do primeiro teste.]

```c
int valor;

printf("Digite um valor: ");
scanf("%d", &valor);

while (valor != 0) {
    printf("Valor: %d\n", valor);
    printf("Digite um valor: ");
    scanf("%d", &valor);
}
```

Para sair, o laço sai pela lógica; olhando para o código, não tem como saber, neste caso, quantas vezes ele vai repetir, porque a repetição não depende de um contador, depende do valor digitado.

### Variável contador

Outro caso muito comum é utilizar a estrutura de repetição para **percorrer uma lista de valores** e saber **quantos deles atendem a uma determinada condição**. Por exemplo, quantos alunos de uma lista foram aprovados (nota maior ou igual a seis), ou quantos números de uma relação de números são pares. Então, além da minha variável do laço, eu crio uma variável chamada **contador**, que vai contar quantas vezes aquela condição acontece.

**Cuidado:** essa variável, pessoal, você **obrigatoriamente tem que inicializar**. Caso contrário, quando você começar a contar um, dois, três com ela, o valor inicial vai ser lixo: vai ficar lixo mais um, lixo mais dois... Então, variáveis do tipo contador sempre devem ser inicializadas.

**Exemplo: contar os pares entre 0 e 20.** Repare que a variável `i` vai de 0 a 20, então o laço repete 21 vezes: zero é menor ou igual a 20, `i++`; um é menor ou igual a 20; dois... até a condição ficar falsa. O que está entrando de diferente é uma variável contadora, `contapar` [verificar: o original diz "counterpart"], que conta quantas vezes `i` recebe um valor par. Ela é inicializada em zero e, a cada repetição, eu testo: o valor de `i` é par? Ou seja, o resto da divisão de `i` por dois é zero? Se for, `contapar++`. Então: 0 é par, contador vai a 1; 1 não é par, não faz nada; 2 é par, contador vai a 2; e assim por diante.

```c
int i = 0;
int contapar = 0;

while (i <= 20) {
    if (i % 2 == 0) {
        contapar++;
    }
    i++;
}
printf("Quantidade de pares: %d\n", contapar);
```

Numa variável contadora, o resultado só vale **depois que ele termina a repetição**, quando saiu do laço; a cada passo ele conta se aquela condição foi satisfeita ou não. Executando: entre zero e vinte, temos **11 números pares** [verificar: o original diz "6" antes]. Posso ter outra condição? Posso, por exemplo, para saber quantos são múltiplos de três: tem **7 números múltiplos de três** entre zero e vinte.

### Variável acumulador

Às vezes eu posso querer também **somar** os valores. Por exemplo, a soma de todos os números pares entre zero e vinte. Nesse caso, temos uma **variável acumulador**: a cada repetição, a minha variável acumula uma parte do resultado. Percorrendo:

- 0 é par: soma 0.
- 1 é par? Não.
- 2 é par: 0 + 2 = 2.
- 3 é par? Não.
- 4 é par: 2 + 4 = 6.
- 6: 6 + 6 = 12. 8: 12 + 8 = 20. 10: 20 + 10 = 30. E assim por diante.

Reparem na conta: eu não estou apenas somando um valor novo; a `soma` recebe **o que a soma valia na repetição anterior mais o valor de `i`**. E o resultado só é mostrado quando eu saio dessa repetição.

```c
int i = 0;
int soma = 0;

while (i <= 20) {
    if (i % 2 == 0) {
        soma = soma + i;
    }
    i++;
}
printf("Soma dos pares: %d\n", soma);
```

Vamos exemplificar: somando todos os números entre zero e 100, a soma é **5.050** [verificar: o original diz "cinco mil e cinco"]. Depois, para todos os valores até 10 mil, e, lembra? O computador é muito rápido.

### Encerramento

Pessoal, a parte teórica da estrutura de repetição é relativamente simples. Porém, ela exige **bastante treino** para que vocês possam dominar esse ponto. Por conta disso, eu deixei lá, nos links [verificar: o original diz "likes"], vários exercícios para vocês. Tentem fazer precisando do mínimo de ajuda possível; só assim você vai saber se realmente aprendeu ou não. É isso, pessoal. Um grande abraço, bons estudos e até a próxima.

### Avisos da aula

O professor deixou vários exercícios sobre estruturas de repetição no material da disciplina e recomenda resolvê-los com o mínimo de ajuda possível. Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_09_Estrutura_de_Repeticao_Do_While.md -->
## Aula 09 – Estrutura de Repetição `do-while` e Modificadores de Fluxo

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

### Tópicos abordados

- Diferença entre `while` e `do-while` (execução pelo menos uma vez)
- Sintaxe do `do-while` (com ponto e vírgula depois da condição)
- Exemplo: validar a idade digitada pelo usuário
- Modificadores de fluxo: `break`, `continue` e `goto`
- Cuidado: `continue` pode causar laço infinito
- Por que **não** usar `goto` (programação estruturada)

### Glossário

- **`do-while`:** "faça enquanto"; executa o bloco **pelo menos uma vez** e só depois testa a condição.
- **Modificador de fluxo:** palavra que altera o fluxo normal de execução do código (`break`, `continue`, `goto`).
- **`break`:** finaliza imediatamente a execução do laço, independente da condição.
- **`continue`:** ignora o restante do bloco de repetição e volta ao teste da condição.
- **`goto`:** "vá para"; interrompe incondicionalmente a execução e salta para outro ponto do código (para frente ou para trás). Não é indicado.
- **Label (rótulo):** nome de um lugar no código, escrito seguido de dois pontos (`inicio:`), usado como destino do `goto`.
- **Programação estruturada:** teoria segundo a qual sequência de comandos, estruturas condicionais e estruturas de repetição bastam para qualquer lógica de programa.
- **Laço infinito (*loop*):** laço que nunca termina.

---

### Introdução

Olá, pessoal, eu sou o professor Muriel e nesta aula vamos aprender sobre a estrutura de repetição **`do-while`**, além de alguns **modificadores de fluxo**.

Na aula passada aprendemos a utilizar a estrutura de repetição `while` e aprendemos que a primeira coisa que o seu código faz quando chega no `while` é **realizar o teste**. Porém, se esse teste for falso, o bloco de repetição que vem embaixo **não é executado nenhuma vez**. Algumas vezes eu quero garantir que, **pelo menos uma vez**, a minha estrutura de repetição seja executada. Nesse caso você pode utilizar a estrutura `do-while`: "faça alguma coisa enquanto a condição for verdadeira".

### Sintaxe do `do-while`

Temos a palavra `do` ("faça") antes do bloco de repetição, seguida de um bloco com os comandos que vão ser repetidos. Depois do bloco, coloco a palavra `while` e a condição. Nesse caso eu **finalizo com ponto e vírgula depois da condição**.

```c
do {
    // instruções
} while (condição);
```

Reparem que nesse caso o bloco de repetição vem **antes**: ele não faz nenhum teste, vai executar tudo o que está aqui dentro, uma vez pelo menos. E só depois ele executa o teste. Se for verdadeiro, volta lá no `do` e faz tudo o que está dentro; se for verdadeiro, faz de novo, enquanto a condição for verdadeira. Se for falso, cai fora.

**Exemplo: ler um valor positivo.** Declaro a variável do tipo valor e faço a estrutura `do-while`: ele vai ler **pelo menos uma vez** o valor do teclado. E enquanto o valor for negativo, eu peço novamente. Então, se o usuário digitar o primeiro valor de forma positiva, já cai fora, tendo executado pelo menos uma vez. Caso contrário, ele faz a repetição.

### Na prática: validando a idade

Na prática, tenho aqui um exemplo em que eu peço ao usuário a idade dele. Faz sentido o usuário digitar um valor negativo para a idade? Não. Então, pelo menos uma vez ele vai digitar a idade: coloco uma estrutura `do`, com o que eu quero que seja repetido, que é receber o valor da idade pelo teclado. E enquanto a idade for menor que zero, eu peço novamente [verificar: trecho confuso no original].

```c
int idade;

do {
    printf("Digite a idade: ");
    scanf("%d", &idade);
} while (idade < 0);
```

Repare: o bloco que vai ser executado na repetição está **antes** do `while`. Executei: "digite a idade": -8, pediu de novo; -15, pediu de novo. Enquanto digita valor negativo, ele pede de novo; quando digitei um valor positivo, ele aceitou. Agora, executando com um valor positivo logo de cara: ele recebeu uma vez só.

### Modificadores de fluxo

Continuando a nossa aula: às vezes eu quero **alterar o fluxo normal de execução** do meu código. Em geral, o código executa de acordo com a condição, enquanto a condição for verdadeira. Porém, existem algumas palavras, alguns **modificadores**, que podem alterar esse fluxo.

#### `break`

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

#### `continue`

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

#### `goto` (não use)

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

### Encerramento

Voltando ao nosso código, eu deixei também para vocês alguns exercícios para praticarem. Ok? É isso, pessoal. Bons estudos, um grande abraço e até a próxima.

### Avisos da aula

Há exercícios no material da disciplina sobre `do-while`, `break`, `continue` e `goto`. Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_10_Estrutura_de_Repeticao_For.md -->
## Aula 10 – Estrutura de Repetição `for`

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "pré-also-hermoreal"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

### Tópicos abordados

- Quando usar o `for` (número de repetições conhecido, com contador)
- Sintaxe: inicialização; condição; atualização
- Fluxo de execução do `for`
- Contagem crescente e decrescente
- Atualizar de 2 em 2, 3 em 3 e o operador `+=`
- Declarar a variável dentro do `for` (C99) e escopo
- `for` com duas variáveis
- `for` aninhado (um dentro do outro) e `usleep`

### Glossário

- **`for`:** "para"; estrutura de repetição com três partes entre parênteses (inicialização, condição e atualização).
- **Inicialização:** executada **uma única vez**, quando o fluxo chega no `for`.
- **Condição:** testada antes de cada repetição.
- **Atualização:** executada ao final de cada repetição, para mudar o valor do contador.
- **Contador:** variável que controla a repetição.
- **`+=`:** abreviação; `contador += 3` equivale a `contador = contador + 3`.
- **C99:** versão do padrão da linguagem C que permite declarar a variável dentro do `for`.
- **Escopo:** região do código onde a variável existe; a variável declarada no `for` só existe dentro dele.
- **`for` aninhado:** um `for` dentro de outro; o de dentro repete completamente a cada repetição do de fora.
- **`usleep`:** função (biblioteca `unistd.h` [verificar]) que faz uma pausa, com o valor em microssegundos.

---

### Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e nesta aula vamos aprender sobre a estrutura de repetição **`for`**.

Nas aulas anteriores aprendemos sobre a estrutura de repetição `while` (e `do-while`). Lembrando que o laço de repetição é necessário quando devo repetir um comando ou um conjunto de comandos diversas vezes. Nesse caso, eu escrevo esse comando, ou esse conjunto de comandos, **uma única vez** e mando repetir diversas vezes. Essa repetição é controlada por uma condição, e você, enquanto programador, tem que garantir que esse laço acabe.

Mas nós também temos a opção do laço **`for`**. O laço `for` é usado principalmente **quando você sabe quantas vezes quer repetir**, principalmente quando você tem **um contador que controla a sua repetição**. Na verdade, eu poderia ensinar para vocês só o `while`, e ele daria conta de todas as estruturas de repetição de que você precisar. Porém, em alguns casos, o `for` é mais fácil de fazer a mesma tarefa.

### Sintaxe

Aqui você vai ter a palavra `for` ("para") e, entre parênteses, **três partes**, não apenas a condição:

1. a **inicialização**: você inicializa o valor da sua variável;
2. ponto e vírgula, a **condição**;
3. ponto e vírgula, a **atualização** (o incremento): como você atualiza a sua variável.

Três partes, cada uma separada da outra por ponto e vírgula.

```c
for (inicialização; condição; atualização) {
    // instruções repetidas
}
```

### Fluxo de execução

Primeiro ele chega no `for`. Qual é a primeira coisa que ele vai fazer? A **inicialização**. Inicializou, testa. Se for verdade, executa o que está dentro; terminou de executar, **incrementa (atualiza)**. Testa de novo. Se for verdade, executa, incrementa, testa. E ele vai continuar nessa repetição enquanto essa condição for verdadeira.

Reparem: a **inicialização é executada uma única vez**, quando ele chega no `for`. Logo em seguida ele segue o ciclo: **teste, execução, atualização**; teste, execução, atualização.

### Exemplo: valores de 0 a 4

Vou exibir os valores de 0 a 4. O contador vale 0; 0 é menor que 5? Verdade. Mostrei o 0, atualizei: o contador vale 1. 1 é menor que 5? Mostra 1, atualiza, vira 2. 2 é menor que 5; 3 é menor que 5; 4 é menor que 5; 5 é menor que 5? Falso: sai do `for`. Aqui eu estou **incrementando** a minha variável.

Posso também fazer uma contagem **regressiva**. Inicializei o meu contador em 5 [verificar: o original diz "4", mas a contagem mostra 5]. Enquanto o contador for positivo (maior que 0), `contador--`. Então: contador vale 5, 5 é maior que 0, mostra o 5, `contador--`, vira 4. 4 é maior que 0, mostra o 4. 3, 2, 1... 0 é maior que 0? Falso: sai do `for`. A saída é 5, 4, 3, 2, 1.

```c
int contador;

for (contador = 0; contador < 5; contador++) {
    printf("%d\n", contador);   // 0 1 2 3 4
}

for (contador = 5; contador > 0; contador--) {
    printf("%d\n", contador);   // 5 4 3 2 1
}
```

Olhando no código: eu tenho o meu contador começando em 0 e repito enquanto ele for menor que 5; vamos fazer um exemplo menor, até 4: 0 é menor que 5, mostra o 0, atualiza; 1 é menor que 5; 2... e assim por diante. Se eu fizer até 50, vai repetir 50 vezes, enquanto você quiser. Para **decrementar**, posso começar, por exemplo, em 10, enquanto o contador for positivo, atualizo com `contador--`. Olha lá: de 10 até 1.

### Atualizando de 2 em 2, de 3 em 3

Agora um detalhe interessante: eu só posso atualizar de 1 em 1? Com o `++`, sempre só um. Como faço para atualizar de 2 em 2, de 3 em 3? Eu não posso utilizar a maneira abreviada: faço `contador = contador + 2`. Aí a saída será 0, 2, 4, 6 e assim por diante: atualizou de 2 em 2. Para atualizar de 3 em 3: `contador = contador + 3`. Então você pode somar ou subtrair quanto você precisar para atualizar a sua variável.

```c
for (contador = 0; contador < 20; contador = contador + 2) {
    printf("%d\n", contador);   // 0 2 4 6 ...
}
```

Aproveitando o gancho, vou mostrar **outra abreviação**. Eu falei que não tinha como abreviar `contador = contador + 3`; na verdade, tem sim: **`contador += 3`**. É uma abreviação para "o contador recebe ele mesmo mais 3". [Trecho confuso no original.]

**O velho cuidado:** como você garante que a sua repetição não fique infinita? Sempre, a sua atualização tem que mudar o valor do contador de forma que, em algum momento, o seu teste (a condição) fique falso.

### Declarando a variável dentro do `for` (C99) e escopo

Na linguagem C, até agora, eu pedi para vocês sempre declararem as variáveis antes, lá no começo. No caso do `for`, é permitido declarar a variável que vai fazer a contagem **dentro da própria estrutura `for`**, na inicialização.

```c
for (int contador = 0; contador < 5; contador++) {
    printf("%d\n", contador);
}
```

Porém, **isso só funciona em compiladores mais atuais**: da versão **C99** em diante. Se você tem um compilador antigo, pode ser que essa opção não funcione. Então, em vez de declarar a variável lá fora, eu a declaro aqui na inicialização.

Reparem qual é o **escopo** dela, onde ela "vive": essa variável `contador` só existe dentro dessa estrutura `for`. Se eu der um `printf` do contador aqui fora, vai dar erro, porque o contador não existe aqui fora; ele só existe aqui dentro. Veja se, para o seu caso, é interessante ou não utilizar essa declaração do contador dentro da estrutura `for`.

### `for` com mais de uma variável

O `for` pode ter apenas uma única variável? Não: eu posso ter mais de uma variável, sempre separadas por vírgula. Aqui eu tenho duas inicializações separadas por vírgula; a condição; e, na atualização, posso fazer duas atualizações: estou somando um em uma variável e decrementando a outra em cada repetição.

Olhando no código: eu tenho a variável `i`, indo de zero até quatro. Quero uma segunda variável, `j`. Vou colocar duas inicializações separadas por vírgula; o `j`, por exemplo, começa em 99. Não vou utilizar o `j` na minha condição, e, na atualização, `j--`. Em cada repetição, o `i` vai ser incrementado de uma unidade e o `j` vai ser decrementado de uma unidade.

```c
int i, j;

for (i = 0, j = 99; i < 5; i++, j--) {
    printf("%d %d\n", i, j);
}
```

Executando: na primeira repetição, `i` vale 0 e `j` vale 99; depois `i` vale 1 e `j` vale 98; depois 2 e 97; 3 e 96; 4 e 95. Então o `i` está sendo incrementado e o `j` decrementado a cada repetição.

**Cuidado:** vírgula para separar as variáveis dentro da inicialização (e dentro da atualização); ponto e vírgula para separar a inicialização da condição, e a condição da atualização.

### `for` aninhado

Temos também a opção de fazer um `for` **aninhado**: posso colocar um `for` dentro do outro. Posso também fazer um `while` dentro do outro; não tem problema nenhum. Assim como tinha `if` dentro de outro `if`, eu posso também aninhar `for` e `while`.

Vamos ver no código. Aqui eu tenho a variável `x` e a variável `y`: o `x` vai de zero até 9, e o `y` também, de zero até 9. Primeiro eu tenho um `for` depois do outro, **independentes**: um `printf` 10 vezes aqui e 10 vezes aqui. Como faria com o `for` aninhado? Pego o `for` do `y` e coloco dentro do `for` do `x`. Quantas vezes ele vai executar esse `printf`? 10 × 10 = **100 vezes**.

```c
int x, y;

for (x = 0; x < 10; x++) {
    for (y = 0; y < 10; y++) {
        printf("x = %d, y = %d\n", x, y);
    }
}
```

Ele entra aqui a primeira vez: `x` vale 0; `y` vale 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. Terminou o `for` de dentro, atualiza o `x`: `x` vale 1; `y` vale 0, 1, 2, ..., 9. Ele vai executar o `printf` 100 vezes, porque **cada vez que o `for` de fora executa uma vez, o `for` de dentro executa 10 vezes**. [Trecho confuso no original, algo como "o `x` é lento e o `y` é rápido"; verificar.]

Os valores passam tão rápido que não dá para ver direito. Então vou incluir uma biblioteca diferente, a `unistd.h` [verificar: o original diz "unie-spd"], que permite fazer uma chamada ao sistema operacional, e depois de cada `printf` vou utilizar a função **`usleep`** [verificar: o original diz "o e-sleep"] para dar uma pausa. O valor está em **microssegundos**; vou colocar 100 mil [verificar: trecho confuso no original, algo como 100 milissegundos]. Aí fica legal: ele espera, e você consegue ver a execução mais pausadamente. Você pode brincar com esse valor para ver mais devagar. Para cada valor de `x`, o `y` repete 10 vezes.

### Encerramento

Pessoal, tem aqui no slide também os desafios/exercícios para vocês [verificar: o original diz "desertos operativos"]. Adicionalmente, temos exercícios para vocês praticarem. Um grande abraço, bons estudos e até a próxima.

### Avisos da aula

Há exercícios e desafios no slide/material da disciplina sobre o `for`. Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_11_Vetores.md -->
## Aula 11 – Vetores

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "Proversor Moriel"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

### Tópicos abordados

- Por que usar vetores (muitos dados do mesmo tipo)
- Declaração de um vetor e reserva de posições na memória
- Índice: começa em 0 e vai até tamanho − 1 (e por quê)
- Inicialização do vetor (com chaves, ou posição por posição)
- Percorrer o vetor com `for` para ler e exibir valores
- Exemplo completo: ler e exibir 5 idades
- Cuidado: ler e escrever fora dos índices permitidos

### Glossário

- **Vetor:** coleção de elementos do **mesmo tipo**, armazenados sequencialmente na memória e acessados por um único nome.
- **Elemento:** cada valor guardado no vetor ("caixinha").
- **Índice (posição):** número entre colchetes que identifica o elemento; começa em 0 e vai até tamanho − 1.
- **Tamanho:** quantidade de elementos reservados na declaração (`int notas[5];`).
- **Deslocamento:** distância, a partir do início do vetor, até a posição desejada; é o que o índice representa na prática.
- **Inicialização com chaves:** valores de todas as posições entre `{ }`, separados por vírgula; permite omitir o tamanho.
- **Acesso fora dos limites:** ler ou escrever em um índice que não existe no vetor; sobrescreve memória de outras variáveis.

---

### Introdução

Olá, pessoal, eu sou o professor Muriel [verificar] e na aula de hoje vamos aprender a trabalhar com **vetores**.

Até a aula passada, nós já aprendemos a utilizar estruturas de controle condicional e estruturas de repetição no nosso código. Mas a quantidade de informação, a quantidade de dados com que a gente estava trabalhando, era muito pequena. Como posso fazer se eu quiser armazenar e manipular uma **quantidade maior de elementos** no nosso programa? Por exemplo, eu sei calcular a média de 1 aluno, mas e se eu quiser calcular a média de 40 alunos? Ou saber a idade de 50 alunos de uma academia, por exemplo, ou ter uma lista de 100 produtos, mantendo ao mesmo tempo todos os valores na memória? Seria inviável fazer 40 variáveis, uma variável para cada aluno, ou 50 variáveis de preço para 50 produtos diferentes. A solução para isso é a utilização de **vetores**.

### O que é um vetor

No contexto da linguagem de programação, os vetores são utilizados para armazenar e processar uma **coleção de elementos do mesmo tipo**. Isso é muito importante: **todos eles têm que ser do mesmo tipo**, seja tudo `int`, tudo `float`, tudo `char`. Eles se comportam como uma lista de variáveis, e existe uma maneira de acessar cada um dos elementos dessa lista. Então eu consigo salvar uma lista de notas, uma lista de salários, sem problema nenhum. Eu posso pensar neles como uma lista, ou uma matriz de uma única linha [verificar: trecho confuso no original].

### Declarando um vetor

Na linguagem C, como eu faço isso na prática? Se eu quiser declarar um vetor de 5 posições, para 5 notas, por exemplo, eu coloco o tipo do meu vetor (`int`), o nome do meu vetor (`notas`) e, entre colchetes, a quantidade de elementos:

```c
int notas[5];
```

Quando eu faço isso, **eu não estou reservando apenas 1 variável do tipo `int`**. Eu estou reservando **5 caixinhas, 5 posições diferentes da memória**, para 5 valores ao mesmo tempo.

**Uma dica muito legal:** no nome da variável, eu costumo deixar no **plural**, como nesse exemplo, `notas`, porque, ao ver o nome no plural, você vai lembrar que ele armazena não apenas 1 valor, mas um conjunto de valores.

### Acessando os elementos: o índice

E, sendo que o nome é único, como eu faço para acessar cada elemento? Escrevo o nome do vetor, `notas`, seguido, entre colchetes, da **posição ou índice** do elemento. **O índice sempre começa em 0 e vai até o tamanho menos 1.** Nesse caso, se o tamanho é 5, os índices vão de 0 até 4 (5 − 1). Então eu reservei 5 caixinhas: `notas[0]`, `notas[1]`, `notas[2]`, `notas[3]` e `notas[4]`. Sempre dessa maneira: começando em 0 e indo até o tamanho menos 1.

**Mas por que começa em 0?** Vamos dar uma olhadinha na memória RAM. Quando você cria um vetor, todas as posições são armazenadas **sequencialmente**, sem nenhum buraco entre uma e outra. E, no fundo, o que você coloca entre colchetes é o **deslocamento**, do início do vetor até a posição que você quer. Para a primeira posição, o deslocamento é 0. Para a segunda posição, eu tenho que me deslocar 1 a partir do começo do vetor. Para a terceira posição, preciso me deslocar 2. E assim por diante.

### Inicializando um vetor

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

### Percorrendo o vetor com `for`

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

### Exemplo completo: ler e exibir 5 idades

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

### Cuidado: não ultrapasse os índices do vetor

Um cuidado que você deve ter, enquanto programador, ao trabalhar com vetores: **sempre garantir que o seu programa só vai ler e escrever dentro dos índices permitidos pelo vetor**.

Por exemplo, eu não poderia criar um vetor de tamanho 5 e percorrê-lo, para ler ou exibir, até o índice 49. O problema é que o compilador vai permitir que eu salve no índice 6, 7, 8, 9... aparentemente sem problema nenhum. Mas ele vai estar **sobrescrevendo posições de memória que pertenciam a outras variáveis**, e isso pode causar um comportamento inesperado, até mesmo para o seu programa.

### Encerramento

E, finalizando esse exemplo, finalizamos a aula de hoje. Tenho lá para vocês alguns exercícios para trabalharem. É isso, pessoal. Bons estudos, um grande abraço e até a próxima.

### Avisos da aula

Há exercícios no material da disciplina sobre vetores. Nenhum prazo ou prova foi mencionado.

---

<!-- Transcrição: Aula_12_Matrizes.md -->
## Aula 12 – Matrizes

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss]. O professor usa slides e o editor na tela; os códigos abaixo foram **reconstruídos a partir da descrição falada** e devem ser conferidos [verificar].

### Tópicos abordados

- O que é uma matriz (vetor de vetores, vetor bidimensional)
- Declaração: linhas e colunas
- Índices: de 0 até tamanho − 1, em cada dimensão
- Atribuição e leitura indicando linha **e** coluna
- Inicialização com chaves
- Preencher e exibir a matriz com `for` aninhado
- Exibir em formato de tabela (onde colocar o `\n`)
- Matrizes com mais de duas dimensões

### Glossário

- **Matriz:** estrutura que usa um vetor para armazenar um conjunto de vetores; pode ser vista como uma tabela. Também chamada de vetor bidimensional (ou multidimensional).
- **Linha:** primeiro índice entre colchetes.
- **Coluna:** segundo índice entre colchetes.
- **`for` aninhado:** um `for` dentro de outro; o externo percorre as linhas e o interno percorre as colunas.
- **Matriz multidimensional:** matriz com mais de duas dimensões (por exemplo, 3 × 3 × 3, "com profundidade").

---

### Introdução

Olá, pessoal, eu sou o professor Muriel e nesta aula vamos aprender a trabalhar com **matrizes**.

Na aula anterior aprendemos a utilizar vetores para armazenar um conjunto de valores, do tipo inteiro, `char` ou `float`. Nesta aula vamos explorar outra possibilidade: **utilizar um vetor para armazenar um conjunto de vetores**. Com isso, eu posso visualizar a estrutura como se fosse **uma tabela ou uma matriz**, e ela às vezes é conhecida como **vetor bidimensional**, tridimensional, ou seja, multidimensional.

### Declaração

Como ficaria isso na declaração do nosso código? Muito parecido com o que temos no vetor, só que agora eu tenho **uma dimensão a mais**:

```c
int matriz[3][4];
```

`int` é o tipo, `matriz` é o nome da minha variável e agora eu coloco **duas dimensões**: essa matriz armazena **três vetores de tamanho 4** cada um deles. Podemos pensar que o primeiro elemento, entre colchetes, é a **linha** e o segundo é a **coluna**.

### Índices

Lembrando como ficam os índices nesse caso: **sempre começam em zero e vão até o tamanho menos 1**. Se são três linhas, as linhas começam em 0 e vão até 2 (3 − 1). Se são quatro colunas, as colunas começam em 0 e vão até 3 (4 − 1).

### Atribuindo e lendo valores

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

### Inicializando uma matriz

Se eu quiser inicializar, tem como? Tem. Olha como ficaria a estrutura: são três linhas e quatro colunas. Vou utilizar a mesma estrutura de chaves que eu tinha lá no vetor; como a matriz é um **vetor de vetores**, coloco a chave externa e, dentro dela, o vetor da primeira linha entre chaves, vírgula, o vetor da segunda linha, vírgula, o vetor da terceira linha, e fecho a chave externa com ponto e vírgula. Dessa maneira, o primeiro vetor é a primeira linha, o segundo vetor é a segunda linha, e assim por diante.

```c
int matriz[3][4] = {
    {valor, valor, valor, valor},   // linha 0
    {valor, valor, valor, valor},   // linha 1
    {valor, valor, valor, valor}    // linha 2
};
```

[Os valores do exemplo do slide não puderam ser recuperados da transcrição; verificar.]

### Percorrendo a matriz com `for` aninhado

Como eu faço se o tamanho da minha matriz for grande? Eu não vou fazer manualmente; nesse caso, vou utilizar uma **estrutura de repetição**. Antes, para preencher um vetor, eu precisava de um `for`. Agora, para preencher uma matriz, eu preciso de **um `for` dentro de outro `for`**.

Repare: a matriz é um vetor de vetores. Então, **um `for` preenche um vetor** (uma linha) e eu preciso de **outro `for`, por fora, para percorrer todas as linhas** da minha matriz. Olha aqui: `l` de linha e `c` de coluna. O `for` interno está percorrendo todas as colunas, que juntas representam uma linha. Mas eu não quero percorrer apenas uma linha, eu quero percorrer várias; para isso eu faço um `for` externo, que vai percorrer todas as linhas da minha matriz.

Então, como vai ser: a linha vale 0 (a primeira linha), e a coluna vale 0, 1, 2, 3; a linha vale 1, e a coluna vale 0, 1, 2, 3; a linha vale 2, e a coluna vale 0, 1, 2, 3. Dessa maneira eu percorro todas as posições da minha matriz: 0,0; 0,1; 0,2; 0,3; 1,0; 1,1; 1,2; 1,3; 2,0; 2,1; 2,2 e 2,3. Ok?

**E para exibir?** Vai ser **a mesma estrutura**, porque os índices são os mesmos. Eu posso usar a mesma estrutura de `for` que utilizei para receber os valores, para exibir os valores. O que tem de diferente é que, na hora de exibir, no meu `printf` eu tenho que dizer **qual posição da matriz** estou exibindo: qual linha e qual coluna. Então, repare: estou exibindo o valor da matriz na linha `l`, na coluna `c`: `matriz[l][c]`.

### Na prática: matriz 3 × 3

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

### Matrizes com mais de duas dimensões

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

### Encerramento

Voltando para o nosso slide, era isso que a gente tinha para hoje. Tem também alguns exercícios para vocês praticarem, com exemplos de **soma e multiplicação de matrizes** e [trecho confuso no original, algo sobre a importância desse assunto em outra disciplina, "G.A."; verificar]. É isso que a gente tem para hoje. Bons estudos, um grande abraço e até a próxima.

### Avisos da aula

Há exercícios no material da disciplina sobre matrizes, incluindo soma e multiplicação de matrizes. Nenhum prazo ou prova foi mencionado.
