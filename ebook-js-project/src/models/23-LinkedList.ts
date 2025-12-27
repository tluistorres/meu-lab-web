import { Node } from './models/linked-list-models.js';

export function defaultEquals<T>(a: T, b: T): boolean {
    return a === b;
}

export default class LinkedList<T> {
    protected count = 0;
    protected head?: Node<T>;
    protected equalsFn: (a: T, b: T) => boolean;

    constructor(equalsFn = defaultEquals) {
        this.equalsFn = equalsFn;
    }

    push(element: T) {
        const node = new Node(element);
        let current: Node<T>;

        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }

    insert(element: T, index: number): boolean {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if (index === 0) {
                const current = this.head;
                node.next = current;
                this.head = node;
            } else {
                const previous = this.getElementAt(index - 1);
                const current = previous?.next;
                node.next = current;
                if (previous) {
                    previous.next = node;
                }
            }
            this.count++;
            return true;
        }
        return false;
    }

    getElementAt(index: number): Node<T> | undefined {
        if (index >= 0 && index <= this.count) {
            let node = this.head;
            for (let i = 0; i < index && node != null; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }

    removeAt(index: number): T | undefined {
        if (index >= 0 && index < this.count) {
            let current = this.head;

            if (index === 0) {
                this.head = current?.next;
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous?.next;
                
                if (previous && current) {
                    previous.next = current.next;
                }
            }
            this.count--;
            return current?.element;
        }
        return undefined;
    }

    // --- MÉTODOS DE BUSCA E UTILITÁRIOS ---

    indexOf(element: T): number {
        let current = this.head;
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }

    remove(element: T): T | undefined {
        const index = this.indexOf(element);
        return this.removeAt(index);
    }

    getHead(): Node<T> | undefined {
        return this.head;
    }

    size(): number {
        return this.count;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    toString(): string {
        if (this.head == null) return '';
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 1; i < this.size() && current != null; i++) {
            objString = `${objString}, ${current.element}`;
            current = current.next;
        }
        return objString;
    }
}