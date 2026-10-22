# Aula 01 – Introdução à disciplina de Fundamentos de Programação

**Disciplina:** Fundamentos de Programação 1 (linguagem C)
**Professor:** Muriel [verificar: o original transcreveu "ProsoMuriel"]
**Observação:** a transcrição original não continha marcadores de tempo, por isso as seções abaixo não têm [mm:ss].

## Tópicos abordados

- O computador como máquina de entrada, armazenamento, processamento e saída
- Hardware e software; software básico e software aplicativo
- Bit, byte e unidades de armazenamento (KB, MB, GB, TB, PB, EB, ZB); tabela ASCII
- Diferença entre megabits (transmissão) e megabytes (armazenamento)
- Linguagem de programação e compilação
- O que é um algoritmo (exemplos: receita de bolo, trocar pneu, somar dois números)
- Os quatro passos para resolver um problema antes de programar

## Glossário

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

## Apresentação e objetivo da aula

Olá, pessoal, eu sou o professor Muriel [verificar] e hoje vamos fazer uma introdução à disciplina de Fundamentos de Programação. Aqui nessa disciplina, nós consideramos que ninguém é obrigado a entrar sabendo nenhum conceito prévio da área de computação ou programação. Nesta aula, a gente vai falar um pouquinho de alguns conceitos básicos, para quem não teve oportunidade de aprender antes, e também é legal para quem já sabe dar uma revisada em alguns conceitos. Ok? Vamos lá.

## O que é um computador

Primeiro de tudo, vamos aprender a programar o computador. Mas o que é o computador para você? Como você definiria essa máquina que está aqui na sua frente, que você está utilizando para assistir a este vídeo? Alguma ideia? [Respostas dadas pelo professor, trecho confuso no original: algo como "máquina inteligente", "rápida" – inaudível?]

O computador é uma máquina capaz de executar apenas quatro tarefas básicas. Quais são elas? Primeiro, é uma máquina capaz de receber uma **entrada de dados**, **armazenar** esses dados, **processar** (fazer contas, cálculos) e gerar uma **saída**. Tudo o que você faz no computador pode ser resumido a essas quatro tarefas.

**Exemplo 1 – abrir o site da universidade.** Você abre o site da universidade [verificar: o original diz "OTF"]. Você usa uma entrada de dados, teclado e mouse, né? Você abre o navegador, digita o endereço do site, termina em "ponto br" [verificar], aperta enter. O que vai acontecer por dentro? O computador vai pegar e processar a informação: vai fazer uma requisição pela rede e pedir essa página. Aí tem uma caixinha preta da internet, que a gente não vai explicar agora. Ele vai receber esse site de volta do servidor, vai armazenar temporariamente esse site e vai exibir na tela, gerando uma saída, que é mostrar o site para você. Então: entrada, armazenamento, processamento e saída.

**Exemplo 2 – WhatsApp.** O celular, hoje em dia, é mais do que nunca um sistema computacional. O WhatsApp tem entrada de dados (tela, microfone, botões), pode armazenar, pode processar, fazer conta e gerar saída. Quando você manda um "bom dia" lá no WhatsApp, você tem a entrada de dados: clica na tela para digitar a mensagem. O celular armazena essa mensagem, processa e manda para a rede. Depois gera a saída, que é mostrar a mensagem na tela do seu dispositivo e na do contato para quem você mandou. Entrada, processamento, armazenamento, saída.

**Exemplo 3 – um jogo.** Num jogo [trecho inicial confuso no original] também tem entrada, armazenamento, processamento e saída. Você clicou com o mouse, colocou a mira na cabeça do inimigo [verificar] e atirou: o dispositivo de entrada, nesse caso, é o mouse. O computador vai armazenar os dados do clique, da posição, e vai processar a informação: vai calcular a trajetória da bala, o que envolve muita física, inclusive para a galera que está fazendo Física. Ele faz a conta para ver se a bala atingiu ou não a cabeça do inimigo. Se atingiu, vai gerar a saída: a animação do inimigo morrendo e o somzinho de *headshot*. Entrada, armazenamento, processamento e saída.

Então, em tudo isso [no uso do dia a dia, em jogos, na engenharia, na programação – trecho confuso no original] estão envolvidas entrada, armazenamento, processamento e saída. Seja um computador muito simples, um celular, um notebook, um desktop, um servidor ou um supercomputador, sempre vão estar envolvidas essas quatro operações.

## Hardware e software

Tudo o que está no computador a gente divide em duas partes: a parte física, que você consegue encostar com a mão, o **hardware**, e o **software**, que é um programa. Uma brincadeira que eu sempre faço com os alunos, para vocês nunca mais esquecerem: **software é aquilo que você xinga; hardware é aquilo que você chuta.**

Se o Windows travou, você pode chutar ele? Não, não pode, porque ele não existe fisicamente; você não consegue pegar o Windows na mão. Então você xinga o Windows. Agora, se o computador travou, você pode chutar? Pode. Não deveria, não faça isso, mas você pode: ele existe fisicamente. Placa-mãe [verificar], memória, processador, sensor, componentes que existem dentro do computador e que você pode pegar na mão são hardware.

O Firefox, o navegador: é hardware ou software? Dá para chutar? Na verdade não, ele não existe fisicamente. Ele é um software, um conjunto de instruções que rodam no seu computador. Esse é um conceito tranquilo; acho que a maioria de vocês já tem.

## Software básico e software aplicativo

Agora vamos descer um pouquinho mais nessa conversa. Existe só um tipo de software? Não. A gente vai descer em duas classificações: **software básico** e **software aplicativo**.

**Software básico** é aquele que você precisa ter instalado no computador para ele funcionar: o **sistema operacional** e os **drivers**. Sabe o que é o sistema operacional? Windows, Linux, Mac, qual for. E os drivers: quando você vai instalar uma impressora, às vezes vem um CD de instalação, ou ele manda você entrar no site do fabricante para fazer o download [trecho confuso no original]. Esse é o driver. Ele vai ensinar o Windows (no caso do Windows) como a impressora funciona. Ele faz a "conversa" do hardware, daquele periférico, com o sistema operacional. Se não tiver o sistema operacional e os drivers, dá para usar o computador facilmente? Não. Isso é o básico, ok?

Mas o Windows ou o Linux, sozinho, tem utilidade para mim, ser humano? Não, não tem. Eu ligo o PC só para usar o Windows? Só para usar o Linux, o Mac? Não. Então o que eu vou fazer? Vou instalar aplicativos.

**Software aplicativo**, o nome já diz, é aquele que tem uma aplicação direta para o usuário. Por exemplo, para navegar na internet eu abro o navegador, o browser, que pode ser o Firefox ou o Chrome, e daí navego na internet; tenho uma aplicação para mim. Vou digitar um texto: abro o LibreOffice, ou o Word. São aplicativos que têm uma utilidade direta para o usuário. Jogos, sim, também são aplicativos. Todos os softwares aplicativos dependem do software básico para funcionar.

E quem mais está nessa linha de aplicativo? Os softwares que a gente vai fazer aqui na disciplina. Por enquanto, aqui em Fundamentos, todos os programas que a gente desenvolver vão ser softwares aplicativos.

## Bits, bytes e unidades de armazenamento

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

## Megabits × megabytes

Sempre vai ter uma diferença entre megabits e megabytes, e o pessoal sempre acaba se confundindo. Quando você contrata uma internet de 10 mega [verificar], consegue baixar um arquivo de 10 mega em um segundo? Se você tem uma internet de 100 mega, baixa um arquivo de 500 mega em 5 segundos? Não, né? Na verdade, o que é vendido para a gente é "100 mega", mas mega o quê? [trecho repetitivo e confuso no original]

Quando você fala de **armazenamento** de dados, a medida é sempre em **bytes**: terabyte, gigabyte, megabyte, tamanho do arquivo, capacidade do meu HD. Mas quando eu estou trabalhando com **transmissão**, a velocidade de transmissão de uma rede, a gente utiliza **megabits**. Então os 100 mega que você contrata são 100 megabits, não 100 megabytes. Com isso, você não vai conseguir baixar um arquivo de 100 megabytes em um segundo. Quanto você vai conseguir baixar? 100 dividido por 8, ok? Dá **12,5 megabytes por segundo**, no máximo. Então essa é a diferença. [Trecho confuso no original, algo como "não estão mentindo para você":] a informação que está ali está em megabits, não em megabytes.

## Linguagem de programação e compilação

Agora, beleza. Eu tenho essa máquina que só fala 0 e 1, e o computador só entende 0 e 1. E eu, o programador, quero que ele resolva o problema para mim, mas eu só falo português, ou inglês, francês, alemão, enfim. Como eu vou ensinar essa máquina a executar a série de instruções que eu quero? Nesse caso eu vou precisar de uma **linguagem de programação**.

A máquina só sabe 0 e 1, e eu só sei a língua portuguesa. Eu preciso de alguém no meio do caminho que faça essa "tradução" para a gente, e quem faz esse meio do caminho é a linguagem de programação. Então, o que é uma linguagem de programação? É um conjunto de regras definidas, que devem ser organizadas e convertidas para a linguagem de máquina. Eu não escrevo em português, mas também não escrevo em 0 e 1. É o conjunto de regrinhas, de comandinhos, que eu coloco de forma organizada, e que depois vai passar por um outro processo, chamado **compilação**, que vai transformar esse código na linguagem de 0 e 1. Então eu saio um pouquinho do português, escrevo um código, e um compilador pega esse código e converte em 0 e 1, que a máquina entende. Ok?

E essas regras, nós temos que estruturá-las com uma lógica, com base em algoritmos.

## Algoritmos

Se você já ouviu falar do termo **algoritmo**: um algoritmo nada mais é do que um procedimento, um passo a passo, para resolver um problema ou uma tarefa. Se você seguir o passo a passo, você resolve o seu problema. Esse termo não está necessariamente ligado à computação. Qualquer sequência passo a passo para resolver um problema já é um algoritmo, seja ligado à computação ou não. Os matemáticos [trecho inaudível?] estudam algoritmos há muitos séculos, muito antes da própria invenção dos computadores. O algoritmo que o Google usa para calcular a rota de um lugar para outro, lá no Google Maps, já existia muito antes da existência dos computadores eletrônicos. Quando vieram os computadores elétricos, aí foi possível automatizá-lo e colocá-lo para executar de maneira automática para o usuário. Mas ele já existia muito antes.

**Exemplo: receita de bolo.** Uma receita de bolo é um algoritmo. Se eu não sei fazer um bolo, mas sigo essa sequência de passo a passo, eu consigo fazer o bolo? Consigo. Então ela é um algoritmo. Tem uma **entrada**, que são os ingredientes do bolo e as quantidades; tem um **processamento**, que é o passo a passo, as regras, a sequência dos itens que você vai colocar; e a **saída** é o próprio bolo pronto. Entrada, processamento e saída.

**Exemplo: trocar o pneu.** Trocar um pneu tem uma ordem do que você vai colocar, tem um passo a passo que você segue. Você pode trocar o pneu do carro, mesmo que não saiba, seguindo esse passo a passo [trecho confuso no original]. Então ele é um algoritmo.

**O computador é "burro", mas rápido.** O computador é muito rápido, gente. Um computador com um programa inteligente [trecho confuso no original] já ganhou do campeão de xadrez [verificar: o original diz "chadreis"], mas porque ele testou todas as combinações, milhões de vezes por segundo, para poder fazer isso. Eu costumo dizer que o computador em si é burro, mas é o mais rápido que existe. Se você ensinar as regras para ele, ele vai testar milhões de combinações por segundo, e com isso passa a impressão de que ele é inteligente.

**Exemplo: somar dois números.** O computador sabe somar dois números? Não: eu ensino ele a fazer isso. Como seria o passo a passo? Eu começo um programa. Defino um lugar para guardar o primeiro valor [reservo espaço – trecho confuso no original], defino um lugar para guardar o segundo valor e um lugar para guardar o valor do resultado. Leio o primeiro valor, pode ser do teclado, por exemplo. Leio o segundo valor do teclado. Somo os dois valores e salvo no terceiro local de armazenamento [nome dado a ele no original: inaudível?, algo como "soma"]. E mostro a mensagem com a soma. Ok? Esse seria o algoritmo para somar dois números.

## O difícil é entender o problema

Vocês vão ver que a grande dificuldade é entender o problema. O difícil não é saber o código; escrever a sintaxe da linguagem não é o difícil. O difícil é entender o problema. Vai ter um enunciado para vocês: "Faça um programa que faça tal coisa, implemente tal coisa, leia tal valor, e tal." Ler esse texto, interpretar esse texto e, a partir dele, fazer o programa que descreve aquele comportamento: isso é o difícil.

**O cartum do projeto.** O professor mostra um cartum com as diferentes versões que diversas pessoas podem ter do mesmo problema. O primeiro quadrinho mostra o que o cliente explicou que queria. Aí o líder do projeto achou que era isso. O analista achou que era isso. O programador fez isso. O consultor de negócios escreveu como sendo isso. A documentação não existiu. As funcionalidades que realmente foram feitas foram isso aqui. O cliente foi cobrado como se fosse uma montanha [de arroz? – verificar] e não o simples balanço. Como foi mantido [trecho inaudível?]. E, na verdade, o que o cliente queria era só um balanço com um pneuzinho [verificar], bem tranquilo, bem simples.

Repare que nessa comunicação tem muito ruído: cada um fala uma coisa e o outro entende outra. Então tenha muita atenção na leitura dos enunciados das questões. [Trecho confuso no original:] isso vai ajudar muito a fazer o código.

## Os quatro passos básicos para resolver um problema

Quais são os quatro passos básicos que eu aconselho? Em vez de pegar o enunciado do programa, abrir o editor e fazer direto o código, sem parar para pensar no problema (assim não vai dar nada), o que você deve fazer antes?

1. **Conhecer o problema a ser resolvido.** Qual é o objetivo do programa? Leia o enunciado, levante as informações certinho, com atenção; interprete o que ele quer.
2. **Extrair as informações.** A partir do enunciado, extraia todas as informações a respeito do problema. Quais valores têm lá que são úteis para você?
3. **Descrever o passo a passo.** Descreva claramente, passo a passo, como resolver aquela situação. Coloque esse passo a passo no seu algoritmo.
4. **Escrever o código.** Só depois de fazer isso, no quarto passo, você escreve o seu código, em qualquer linguagem de programação que você precisar.

**Exemplo: equação de Bhaskara.** Se tiver um programa para você resolver a equação de Bhaskara: vai conseguir resolver esse exercício se não souber a fórmula de Bhaskara? Nunca. Eu vou te dizer: você jamais faz um programa que resolve um problema que você não resolve no papel e na caneta. Então, primeiro certifique-se: se eu não sei resolver uma equação do segundo grau usando papel e caneta, jamais vou fazer um programa que faça essa conta. Extraia as informações e leve para o seu algoritmo. "Opa, eu não sei a fórmula de Bhaskara": vá para a internet, procure a fórmula, volte, resolva uma vez na mão. Só depois, sabendo o passo a passo que você fez no papel e na caneta, passe esse passo a passo para o seu algoritmo. Você vai descrever isso de maneira lógica, para depois escrever o seu código utilizando a sua linguagem de programação. Ok?

## Encerramento

É isso, pessoal. Essa primeira aula é mais teórica. A próxima aula já vai trazer um pouco mais de código, mas são alguns elementos importantes para nivelar todo mundo: alguns [já sabem bastante de computação, outros não – trecho confuso no original], mas é legal a gente ter essa introdução antes de partir para o código. É isso, pessoal. Até mais, um grande abraço.

## Avisos da aula

Nenhum aviso administrativo (prazos, provas, tarefas) nesta aula.
