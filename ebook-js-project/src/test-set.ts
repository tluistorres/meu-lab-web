import SetCustom from './26-Set.js';

const conjunto = new SetCustom<number>();

console.log("--- 💡 Lab Luis-Tech: Teste de Conjuntos ---");

conjunto.add(1);
conjunto.add(2);
conjunto.add(1); // Tentativa de duplicado

console.log("Valores do conjunto (deve ser [1, 2]):", conjunto.values());
console.log("Tamanho (deve ser 2):", conjunto.size());
console.log("Tem o número 2?", conjunto.has(2));

conjunto.delete(1);
console.log("Após apagar o 1:", conjunto.values());
conjunto.add(500);
console.log(conjunto.values());
console.log(conjunto.size());