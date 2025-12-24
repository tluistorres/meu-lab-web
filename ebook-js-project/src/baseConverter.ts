// src/baseConverter.ts

// Interface simples de Pilha para o algoritmo
class Stack<T> {
    private items: T[] = [];
    push(element: T) { this.items.push(element); }
    pop() { return this.items.pop(); }
    isEmpty() { return this.items.length === 0; }
}

/**
 * Converte um número decimal para qualquer base entre 2 e 36
 * @param decNumber O número decimal a ser convertido
 * @param base A base de destino (ex: 2 para binário, 16 para hex)
 */
export function baseConverter(decNumber: number, base: number): string {
    const remStack = new Stack<number>();
    // Mapeamento de dígitos para bases superiores a 10 (A-Z)
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = decNumber;
    let rem: number;
    let baseString = '';

    // Validação de segurança típica de TypeScript
    if (!(base >= 2 && base <= 36)) {
        return 'Erro: Base inválida. Escolha entre 2 e 36.';
    }

    if (decNumber === 0) return '0';

    // Fase 1: Divisões sucessivas e Empilhamento
    while (number > 0) {
        rem = Math.floor(number % base);
        remStack.push(rem);
        number = Math.floor(number / base);
    }

    // Fase 2: Desempilhamento (Inversão LIFO)
    while (!remStack.isEmpty()) {
        const index = remStack.pop();
        if (index !== undefined) {
            baseString += digits[index];
        }
    }

    return baseString;
}