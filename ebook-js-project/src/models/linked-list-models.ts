// Modelo para Lista Ligada Simples
export class Node<T> {
    constructor(
        public element: T, 
        public next?: Node<T>
    ) {}
}

// Modelo para Lista Duplamente Ligada
// Herdamos de Node para reaproveitar o 'element' e o 'next'
export class DoublyNode<T> extends Node<T> {
    // Sobrescrevemos o next para ser um DoublyNode e adicionamos o prev
    constructor(
        public override element: T,
        public override next?: DoublyNode<T>,
        public prev?: DoublyNode<T>
    ) {
        super(element, next);
    }
}