#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 100

typedef struct {
    char* items[MAX];
    int count;
    int lowestCount;
} Deque;

void initDeque(Deque *deque) {
    deque->count = 0;
    deque->lowestCount = 0;
}

int isEmpty(Deque *deque) {
    return deque->count == 0;
}

void addFront(Deque *deque, char* element) {
    if (isEmpty(deque)) {
        deque->items[deque->count] = strdup(element);
        deque->count++;
    } else if (deque->lowestCount > 0) {
        deque->lowestCount--;
        deque->items[deque->lowestCount] = strdup(element);
    } else {
        for (int i = deque->count; i > 0; i--) {
            deque->items[i] = deque->items[i - 1];
        }
        deque->count++;
        deque->items[0] = strdup(element);
    }
}

void addBack(Deque *deque, char* element) {
    deque->items[deque->count] = strdup(element);
    deque->count++;
}

void printDeque(Deque *deque) {
    printf("[ ");
    for (int i = deque->lowestCount; i < deque->count; i++) {
        printf("%s ", deque->items[i]);
    }
    printf("]\n");
}

int size(Deque *deque) {
    return deque->count - deque->lowestCount;
}

char* removeFront(Deque *deque) {
    if (isEmpty(deque)) {
        return NULL;
    }
    char* element = deque->items[deque->lowestCount];
    deque->lowestCount++;
    return element;
}

char* removeBack(Deque *deque) {
    if (isEmpty(deque)) {
        return NULL;
    }
    char* element = deque->items[deque->count - 1];
    deque->count--;
    return element;
}

int main() {
    Deque deque;
    initDeque(&deque);

    printf("A fila está vazia: %s\n", isEmpty(&deque) ? "Sim" : "Não");
    printf("Fila: ");
    printDeque(&deque);

    addBack(&deque, "Lucas");
    addBack(&deque, "Livia");
    printf("Fila: ");
    printDeque(&deque);
    printf("Tamanho da fila: %d\n", size(&deque));

    addBack(&deque, "Louise");
    printf("Meus filhos são esses: ");
    printDeque(&deque);
    printf("A fila está vazia: %s\n", isEmpty(&deque) ? "Sim" : "Não");

    removeFront(&deque);
    printf("Fila: ");
    printDeque(&deque);
    removeBack(&deque);
    printf("Tamanho da fila: %d\n", size(&deque));

    addBack(&deque, "Louise");
    addBack(&deque, "Lucas");
    printf("Fila: ");
    printDeque(&deque);

    return 0;
}