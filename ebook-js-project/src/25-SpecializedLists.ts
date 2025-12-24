import LinkedList from './23-LinkedList.js';
import { Node } from './models/linked-list-models.js';

// --- 1. LISTA LIGADA CIRCULAR ---
export class CircularLinkedList<T> extends LinkedList<T> {
    constructor() {
        super();
    }

    push(element: T) {
        const node = new Node(element);
        if (this.head == null) {
            this.head = node;
        } else {
            const current = this.getElementAt(this.size() - 1);
            if (current) current.next = node;
        }
        node.next = this.head; // O pulo do gato: aponta para o início
        this.count++;
    }

    insert(element: T, index: number): boolean {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            let current = this.head;
            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    node.next = this.head;
                } else {
                    node.next = this.head;
                    current = this.getElementAt(this.size() - 1);
                    this.head = node;
                    if (current) current.next = this.head; // Fecha o círculo
                }
            } else {
                const previous = this.getElementAt(index - 1);
                node.next = previous?.next;
                if (previous) previous.next = node;
            }
            this.count++;
            return true;
        }
        return false;
    }
}

// --- 2. LISTA LIGADA ORDENADA ---
export class SortedLinkedList<T> extends LinkedList<T> {
    constructor() {
        super();
    }

    insert(element: T): boolean { // Note que não recebe index!
        if (this.isEmpty()) {
            return super.insert(element, 0);
        }
        const pos = this.getIndexNextSortedElement(element);
        return super.insert(element, pos);
    }

    private getIndexNextSortedElement(element: T): number {
        let current = this.head;
        let i = 0;
        for (; i < this.size() && current; i++) {
            if (element < current.element) { // Lógica de ordenação
                return i;
            }
            current = current.next;
        }
        return i;
    }
}