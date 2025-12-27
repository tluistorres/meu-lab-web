import { ValuePair } from './27-Dictionary.js';
import LinkedList from './23-LinkedList.js'; // Reaproveitando sua lista!

export default class HashTableChaining<K, V> {
    protected table: { [key: number]: LinkedList<ValuePair<K, V>> } = {};

    constructor() {}

    private djb2HashCode(key: K): number {
        const tableKey = JSON.stringify(key);
        let hash = 5381;
        for (let i = 0; i < tableKey.length; i++) {
            hash = (hash * 33) + tableKey.charCodeAt(i);
        }
        return hash % 1013;
    }

    put(key: K, value: V): boolean {
        if (key != null && value != null) {
            const position = this.djb2HashCode(key);
            if (this.table[position] == null) {
                this.table[position] = new LinkedList<ValuePair<K, V>>();
            }
            this.table[position].push(new ValuePair(key, value));
            return true;
        }
        return false;
    }

    get(key: K): V | undefined {
        const position = this.djb2HashCode(key);
        const linkedList = this.table[position];
        if (linkedList != null && !linkedList.isEmpty()) {
            let current = linkedList.getHead();
            while (current != null) {
                if (current.element.key === key) {
                    return current.element.value;
                }
                current = current.next;
            }
        }
        return undefined;
    }
}