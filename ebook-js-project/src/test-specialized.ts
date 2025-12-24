import { CircularLinkedList, SortedLinkedList } from './25-SpecializedLists.js';

console.log("--- 🌀 Teste Lista Circular ---");
const circular = new CircularLinkedList<string>();
circular.push("A");
circular.push("B");
const last = circular.getElementAt(1);
console.log("Último elemento:", last?.element);
console.log("Próximo após o último (deve ser o head):", last?.next?.element);

console.log("\n--- 📈 Teste Lista Ordenada ---");
const ordenada = new SortedLinkedList<number>();
ordenada.insert(50);
ordenada.insert(10);
ordenada.insert(30);
console.log("Lista Ordenada:", ordenada.toString()); // Esperado: 10, 30, 50