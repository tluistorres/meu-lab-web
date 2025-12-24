import Stack from './20-Stack.js';

// 1. Criamos a pilha (apenas uma vez!)
const stack = new Stack<number>();

console.log("--- Lab Luis-Tech: Teste de Pilha ---");
stack.push(10);
stack.push(20);
stack.push(30);

console.log("1. Pilha inicial:", stack.toString());
console.log("2. Removendo topo:", stack.pop());
console.log("3. Pilha após pop:", stack.toString());

console.log("--- Adicionando o 1000 ---");
stack.push(1000);
console.log("4. Novo tamanho:", stack.size());
console.log("5. Pilha atualizada:", stack.toString()); 

console.log("--- Testando Symbols (Hacker Mode) ---");
// Tentando descobrir propriedades ocultas (Symbols)
let objectSymbols = Object.getOwnPropertySymbols(stack);
console.log("Quantidade de Symbols encontrados:", objectSymbols.length);

// Se quiser testar o comportamento do livro, 
// note que o TS vai reclamar se você tentar acessar o privado.
// Por enquanto, vamos apenas imprimir o que você já tem:
console.log("Estado final da pilha:", stack.toString());