// Código C que gera: Números: 1, Números: 3, Números: 5
#include <stdio.h>

int main(){
    for (int i=1; i<=5; i+=2){ // i+=2 incrementa em 2
        printf("Números: %d\n",i);
    }
    return 0;
}

// Para funcionar tem que compilar o código, digitando "gcc loop_exemplo.c -o loop_c", 
// e em sequẽncia 'loop_c'.

