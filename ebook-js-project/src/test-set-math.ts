import SetCustom from './26-Set.js';

const setA = new SetCustom<number>();
setA.add(1);
setA.add(2);
setA.add(3);

const setB = new SetCustom<number>();
setB.add(2);
setB.add(3);
setB.add(4);

console.log("--- 🧮 Lab Luis-Tech: Operações de Conjuntos ---");
console.log("Set A:", setA.values()); // [1, 2, 3]
console.log("Set B:", setB.values()); // [2, 3, 4]

const unionAB = setA.union(setB);
console.log("União (A ∪ B):", unionAB.values()); // [1, 2, 3, 4]

const intersectionAB = setA.intersection(setB);
console.log("Interseção (A ∩ B):", intersectionAB.values()); // [2, 3]

const differenceAB = setA.difference(setB);
console.log("Diferença (A - B):", differenceAB.values()); // [1]

const setC = new SetCustom<number>();
setC.add(2);
setC.add(3);
console.log("C [2, 3] é subconjunto de A?", setC.isSubsetOf(setA)); // true