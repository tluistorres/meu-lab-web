import Deque from './22-Deque.js';

const deque = new Deque<string>();

console.log("--- 🚋 Lab Luis-Tech: Teste de Deque ---");

deque.addBack("Torres");
deque.addBack("Ajudante IA");
console.log("Início:", deque.toString()); // Torres, Ajudante IA

deque.addFront("Luis (Prioridade)"); 
console.log("Após addFront:", deque.toString()); // Luis, Torres, Ajudante IA

deque.addBack("Novo Aluno");
console.log("Após addBack:", deque.toString());

deque.removeFront();
console.log("Removido da frente. Sobrou:", deque.toString());

deque.removeBack();
console.log("Alguém desistiu no fim da fila. Sobrou:", deque.toString());
