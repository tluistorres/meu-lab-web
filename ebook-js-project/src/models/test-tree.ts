import BinarySearchTree from './31-BinarySearchTree.js'; // PRECISA ter o .js no final
export {}; 

const tree = new BinarySearchTree<number>();
[11, 7, 15, 5, 3, 9, 8, 10, 13, 20].forEach(v => tree.insert(v));

console.log("--- 🌳 Lab Luis-Tech: Árvore Binária ---");

const ordenados: number[] = [];
tree.inOrderTraverse(v => ordenados.push(v));

console.log("Sequência Ordenada:", ordenados.join(' -> '));
console.log("Menor valor:", tree.min());
console.log("Maior valor:", tree.max());

console.log("--- 📊 Estatísticas da Árvore ---");
console.log("Total de nós (Size):", tree.size());
console.log("Altura da árvore (Height):", tree.height());
console.log("\n--- 🎨 Visualização Gráfica (Luis-Tech) ---");
tree.print();