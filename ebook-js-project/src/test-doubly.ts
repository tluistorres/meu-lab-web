import DoublyLinkedList from './24-DoublyLinkedList.js';

const lista = new DoublyLinkedList<string>();

console.log("--- 🔄 Lab Luis-Tech: Teste Completo Lista Dupla ---");

lista.push("A");
lista.push("B");
lista.push("C");
lista.insert("PRIMEIRO", 0);

console.log("Lista completa:", lista.toString());

lista.removeAt(2); // Remove o "B"
console.log("Após remover o 'B':", lista.toString());

const tail = lista.getTail();
console.log(`Navegação reversa: ${tail?.element} -> ${tail?.prev?.element} -> ${tail?.prev?.prev?.element}`);;