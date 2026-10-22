---
titulo: "Aula 01 - Introdução"
numero_aula: 1
disciplina: "Fundamentos de Programação (Engenharia de Computação)"
professor: "Muriel de Souza Godoi"
topicos: [computador, hardware, software, bits, bytes, unidades de armazenamento, linguagem de programação, algoritmo]
pre_requisitos: []
fonte_original: "Material-Ensino-Não-Verificado/Aula 01 - Introdução.pdf"
transcricao_relacionada: "Transcrição-Verificadas/Aula_01_Introducao.md"
revisado_em: 2026-10-11
status: verificado
---

# Aula 01 - Introdução

## Objetivo
Apresentar os conceitos básicos de computação (hardware, software, unidades de dados) e o conceito de algoritmo, como base para a introdução à programação em C.

## Conceitos-chave

- **Computador**: equipamento eletrônico que executa quatro tarefas básicas: Entrada de Dados → Armazenamento → Processamento → Saída de Resultados.
- **Hardware**: componentes físicos (processador, placa-mãe, memória, periféricos).
- **Software**: conjunto de instruções (em bytes) que o processador executa. Divide-se em:
  - *Software básico*: necessário para o funcionamento do sistema (ex.: sistema operacional, drivers).
  - *Software aplicativo*: uso direto do usuário (ex.: navegador, editor de texto, jogos) — é o tipo de programa desenvolvido na disciplina.
- **Bit**: menor unidade de dado, valor 0 ou 1 (desligado/ligado).
- **Byte**: conjunto de 8 bits; representa 1 caractere; permite 2^8 = 256 combinações.
- **Unidades de medida (base 2)**: 1 KB = 2^10 bytes, 1 MB = 2^20 bytes, 1 GB = 2^30 bytes, 1 TB = 2^40 bytes.
  - Atenção: fabricantes de disco costumam anunciar capacidade em base 10 (ex.: 1 TB = 10^12 bytes), o que gera a diferença entre a capacidade "anunciada" e a capacidade real mostrada pelo sistema operacional (que usa base 2). Isso explica por que um "HD de 1 TB" aparece com menos espaço no computador.
- **Linguagem de máquina**: sequência de bits que o processador entende diretamente; difícil de escrever e ler.
- **Linguagem de programação**: conjunto de regras mais próximas da linguagem humana, convertido para linguagem de máquina (compilação). Exemplo: linguagem C.
- **Algoritmo**: sequência finita e bem definida de passos para resolver um problema. Não é um conceito restrito à computação (ex.: receita de bolo, troca de pneu).

## Exemplo de algoritmo (pseudocódigo)

```
Algoritmo: Somar dois números
Início
  Definir Valor1, Valor2, Soma
  Ler Valor1
  Ler Valor2
  Soma = Valor1 + Valor2
  Mostrar Soma
Fim
```

## Etapas para construir um algoritmo
1. Entender claramente o problema a ser resolvido (objetivo do programa).
2. Levantar todas as informações relevantes (dados de entrada e operações necessárias).
3. Descrever os passos da solução em sequência lógica.
4. Chegar à especificação final do algoritmo.

## Erros comuns e pontos de atenção
- Confundir **hardware** com **software** (hardware é físico; software é o conjunto de instruções).
- Achar que "capacidade do disco" na caixa é igual à capacidade mostrada pelo sistema operacional — a diferença vem da base 10 (fabricante) vs. base 2 (sistema).
- Pular a etapa de entender o problema e já tentar "escrever código" — a maior dificuldade em algoritmos costuma ser compreender exatamente o que está sendo pedido, não a sintaxe.

## Perguntas socráticas sugeridas
- "Se um processador só entende 0 e 1, como um comando como `printf` chega a virar algo que ele executa?"
- "Por que você acha que um HD de '1 TB' aparece com menos de 1000 GB no seu computador?"
- "Antes de escrever qualquer linha de código, que perguntas você faria sobre o problema para garantir que entendeu o que precisa ser feito?"

## Notas de revisão
- Conteúdo das slides conferido e consistente com a bibliografia da disciplina; nenhuma correção técnica foi necessária nesta aula.
