export default class Stack<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    // Adiciona no topo
    push(element: T): void {
        this.items.push(element);
    }

    // Remove do topo
    pop(): T | undefined {
        return this.items.pop();
    }

    // Apenas olha o topo
    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    clear(): void {
        this.items = [];
    }
}