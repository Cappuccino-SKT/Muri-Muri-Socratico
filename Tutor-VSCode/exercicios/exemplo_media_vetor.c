/*
 * EXERCÍCIO DE EXEMPLO (para testar o Tutor Socrático)
 *
 * Enunciado: leia 5 notas inteiras, guarde-as em um vetor e mostre
 * a soma e a média das notas (com duas casas decimais).
 *
 * Este código tem erros de propósito. Experimente compilar
 * (Ctrl+Shift+B), executar e pedir ajuda ao Tutor Socrático no chat.
 */
#include <stdio.h>

int main()
{
    int notas[5];
    int soma = 0;
    float media;

    for (int i = 0; i <= 5; i++) {
        printf("Digite a nota %d: ", i + 1);
        scanf("%d", notas[i]);
    }

    for (int i = 0; i < 5; i++) {
        soma = soma + notas[i];
    }

    media = soma / 5;

    printf("Soma: %d\n", soma);
    printf("Media: %.2f\n", media);

    return 0;
}
