import { ValuePair } from './27-Dictionary.js';

export default class HashTable<K, V> {
    protected table: { [key: number]: ValuePair<K, V> } = {};

    constructor() {}

    // A famosa Função Hash (djb2)
    private djb2HashCode(key: K): number {
        const tableKey = this.toStrFn(key);
        let hash = 5381;
        for (let i = 0; i < tableKey.length; i++) {
            hash = (hash * 33) + tableKey.charCodeAt(i);
        }
        return hash % 1013;
    }

    private toStrFn(item: K): string {
        if (item === null) return 'NULL';
        if (item === undefined) return 'UNDEFINED';
        if (typeof item === 'string' || item instanceof String) return `${item}`;
        return JSON.stringify(item);
    }

    put(key: K, value: V): boolean {
        if (key != null && value != null) {
            const position = this.djb2HashCode(key);
            this.table[position] = new ValuePair(key, value);
            return true;
        }
        return false;
    }

    get(key: K): V | undefined {
        const valuePair = this.table[this.djb2HashCode(key)];
        return valuePair == null ? undefined : valuePair.value;
    }

    remove(key: K): boolean {
        const hash = this.djb2HashCode(key);
        const valuePair = this.table[hash];
        if (valuePair != null) {
            delete this.table[hash];
            return true;
        }
        return false;
    }
}