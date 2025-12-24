// Classe auxiliar para o par chave-valor
export class ValuePair<K, V> {
    constructor(public key: K, public value: V) {}
    // ... rest of the class
}

export default class Dictionary<K, V> {
    private table: { [key: string]: ValuePair<K, V> } = {};

    constructor() {}

    hasKey(key: K): boolean {
        return this.table[this.toStrFn(key)] != null;
    }

    set(key: K, value: V): boolean {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key, value);
            return true;
        }
        return false;
    }

    get(key: K): V | undefined {
        const valuePair = this.table[this.toStrFn(key)];
        return valuePair == null ? undefined : valuePair.value;
    }

    remove(key: K): boolean {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }

    private toStrFn(item: K): string {
        if (item === null) return 'NULL';
        if (item === undefined) return 'UNDEFINED';
        if (typeof item === 'string' || item instanceof String) return `${item}`;
        return JSON.stringify(item);
    }

    values(): V[] {
        return Object.values(this.table).map(vp => vp.value);
    }
}
