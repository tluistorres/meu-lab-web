import { DoublyNode } from './models/linked-list-models.js';
import LinkedList, { defaultEquals } from './23-LinkedList.js';

export default class DoublyLinkedList<T> extends LinkedList<T> {
    protected head?: DoublyNode<T>;
    protected tail?: DoublyNode<T>;

    constructor(equalsFn = defaultEquals) {
        super(equalsFn);
    }

    push(element: T) {
        const node = new DoublyNode(element);
        if (this.head == null) {
            this.head = node;
            this.tail = node;
        } else if (this.tail) {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.count++;
    }

    insert(element: T, index: number): boolean {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(element);
            let current = this.head;

            if (index === 0) { // Inserir no início
                if (this.head == null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    this.head.prev = node; // Costura 1
                    this.head = node;      // Costura 2
                }
            } else if (index === this.count) { // Inserir no fim
                current = this.tail;
                if (current) {
                    current.next = node;
                    node.prev = current;
                    this.tail = node;
                }
            } else { // Inserir no meio
                const previous = this.getElementAt(index - 1) as DoublyNode<T>;
                current = previous.next;
                node.next = current;
                if (current) current.prev = node; // Costura para frente
                previous.next = node;             // Costura para trás
                node.prev = previous;             // Costura o novo nó
            }
            this.count++;
            return true;
        }
        return false;
    }

    getTail() {
        return this.tail;
    }
}