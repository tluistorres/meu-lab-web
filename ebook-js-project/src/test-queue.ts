import Queue from './21-Queue.js';

const queue = new Queue<string>();

console.log("--- Lab Luis-Tech: Teste de Fila (FIFO) ---");
console.log("Fila vazia?", queue.isEmpty());

queue.enqueue("Luis");
queue.enqueue("Torres");
queue.enqueue("Ajudante IA");

console.log("Fila atual:", queue.toString());
console.log("Tamanho:", queue.size());

console.log("Atendendo (dequeue):", queue.dequeue()); // Deve sair o Luis
console.log("Próximo da fila:", queue.peek());      // Deve ser o Torres
console.log("Fila agora:", queue.toString());

// @ts-ignore - Ignoramos o erro de 'private' apenas para esse experimento técnico
console.log("--- Inspeção Interna do Objeto (Hack) ---");
console.log(queue['items']);