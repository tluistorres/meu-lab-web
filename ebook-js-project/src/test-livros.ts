import Stack from './20-Stack.js';

// Criamos uma instância da Stack especializada em 'string'
const biblioteca = new Stack<string>();

console.log("--- 📚 Biblioteca do Luis: Controle de Pilha ---");

biblioteca.push("O Senhor dos Anéis");
biblioteca.push("Harry Potter");
biblioteca.push("Código Limpo");

console.log("Livro no topo (último a chegar):", biblioteca.peek());
console.log("Total de livros na pilha:", biblioteca.size());

console.log("\n--- Retirando livros para leitura ---");
console.log("Retirando:", biblioteca.pop()); // Deve retirar o "Código Limpo"
console.log("Agora o topo é:", biblioteca.peek());
console.log("Pilha atualizada:", biblioteca.toString());

