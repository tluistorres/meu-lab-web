/**
 * Cálculo de Fatorial de forma recursiva
 */
export function factorial(n: number): number {
    // Caso de Base
    if (n === 0 || n === 1) {
        return 1;
    }
    // Caso Recursivo
    return n * factorial(n - 1);
}

// Teste rápido
console.log("--- 🔄 Lab Luis-Tech: Recursividade ---");
console.log("Fatorial de 5:", factorial(5)); // Deve ser 120

/**
 * Sequência de Fibonacci Recursiva
 * Retorna o valor na posição 'n'
 */
export function fibonacci(n: number): number {
    if (n < 1) return 0; // Caso de base 1
    if (n <= 2) return 1; // Caso de base 2
    
    return fibonacci(n - 1) + fibonacci(n - 2); // Caso recursivo
}