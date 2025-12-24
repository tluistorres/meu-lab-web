export default class Deque<T> {
    private count: number;
    private lowestCount: number;
    private items: { [key: number]: T };

    constructor() {
        this.count = 0;
        this.lowestCount = 0;
        this.items = {};
    }

    addBack(element: T) {
        this.items[this.count] = element;
        this.count++;
    }

    addFront(element: T) {
        if (this.isEmpty()) {
            this.addBack(element);
        } else if (this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = element;
        } else {
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1];
            }
            this.count++;
            this.lowestCount = 0;
            this.items[0] = element;
        }
    }

    removeFront(): T | undefined {
        if (this.isEmpty()) return undefined;
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }

    removeBack(): T | undefined {
        if (this.isEmpty()) return undefined;
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }

    peekFront(): T | undefined {
        return this.isEmpty() ? undefined : this.items[this.lowestCount];
    }

    peekBack(): T | undefined {
        return this.isEmpty() ? undefined : this.items[this.count - 1];
    }

    isEmpty(): boolean {
        return this.count - this.lowestCount === 0;
    }

    size(): number {
        return this.count - this.lowestCount;
    }

    toString(): string {
        if (this.isEmpty()) return '';
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString}, ${this.items[i]}`;
        }
        return objString;
    }
}
