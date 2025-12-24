export default class Queue<T> {
    private count: number;
    private lowestCount: number;
    private items: { [key: number]: T };

    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    // Adiciona ao final da fila
    enqueue(element: T) {
        this.items[this.count] = element;
        this.count++;
    }

    // Remove o primeiro da fila
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }

    // Olha quem é o próximo a ser atendido
    peek(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }

    isEmpty(): boolean {
        return this.count - this.lowestCount === 0;
    }

    size(): number {
        return this.count - this.lowestCount;
    }

    toString(): string {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString}, ${this.items[i]}`;
        }
        return objString;
    }
}
