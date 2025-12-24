import LinkedList from './23-LinkedList.js';

const lista = new LinkedList<string>();
lista.push("Java");
lista.push("TypeScript");
lista.push("Python");

console.log("--- 🔍 Teste de Busca ---");
console.log("Onde está o TypeScript?", lista.indexOf("TypeScript")); // Esperado: 1
console.log("Onde está o PHP?", lista.indexOf("PHP")); // Esperado: -1

console.log("\n--- 🗑️ Teste de Remoção por Valor ---");
lista.remove("Java");
console.log("Após remover Java:", lista.toString());
console.log("Novo Head:", lista.getHead()?.element);