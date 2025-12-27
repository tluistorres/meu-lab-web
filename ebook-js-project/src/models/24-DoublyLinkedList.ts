import { DoublyNode } from './models/linked-list-models.js';
import LinkedList, { defaultEquals } from './23-LinkedList.js';

export default class DoublyLinkedList<T> extends LinkedList<T> {
    // RESOLUÇÃO DO TS2612: 'declare' avisa que o head existe mas com tipo diferente
    protected declare head?: DoublyNode<T>; 
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

            if (index === 0) {
                if (this.head == null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    node.next = this.head;
                    this.head.prev = node;
                    this.head = node;
                }
            } else if (index === this.count) {
                current = this.tail;
                if (current) {
                    current.next = node;
                    node.prev = current;
                    this.tail = node;
                }
            } else {
                const previous = this.getElementAt(index - 1) as DoublyNode<T>;
                current = previous.next;
                node.next = current;
                if (current) current.prev = node;
                previous.next = node;
                node.prev = previous;
            }
            this.count++;
            return true;
        }
        return false;
    }

    removeAt(index: number): T | undefined {
        if (index >= 0 && index < this.count) {
            let current = this.head;

            if (index === 0) {
                this.head = current?.next;
                if (this.count === 1) {
                    this.tail = undefined;
                } else if (this.head) {
                    this.head.prev = undefined;
                }
            } else if (index === this.count - 1) {
                current = this.tail;
                this.tail = current?.prev;
                if (this.tail) {
                    this.tail.next = undefined;
                }
            } else {
                current = this.getElementAt(index) as DoublyNode<T>;
                const previous = current?.prev;
                const next = current?.next;
                if (previous && next) {
                    previous.next = next;
                    next.prev = previous;
                }
            }
            this.count--;
            return current?.element;
        }
        return undefined;
    }

    getTail() {
        return this.tail;
    }

    inverseToString(): string {
        if (this.tail == null) return '';
        let objString = `${this.tail.element}`;
        let previous = this.tail.prev;
        while (previous != null) {
            objString = `${objString}, ${previous.element}`;
            previous = previous.prev;
        }
        return objString;
    }
}