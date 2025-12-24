import Stack from './20-Stack.js';

const stack = new Stack<number>();

console.log("Está vazia?", stack.isEmpty()); 

stack.push(5);
stack.push(8);
stack.push(15);

console.log("Topo da pilha:", stack.peek()); // 15
console.log("Tamanho:", stack.size());        // 3
console.log("Removendo:", stack.pop());       // 15