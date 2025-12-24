import HashTableChaining from './29-HashTableChaining.js';

const hash = new HashTableChaining<string, string>();

// Vamos fingir que essas chaves colidem (ou apenas testar o armazenamento)
hash.put("Luis", "luis@mail.com");
hash.put("Torres", "torres@mail.com");

console.log("--- ⛓️ Lab Luis-Tech: Teste de Colisão ---");
console.log("Busca Luis:", hash.get("Luis"));
console.log("Busca Torres:", hash.get("Torres"));