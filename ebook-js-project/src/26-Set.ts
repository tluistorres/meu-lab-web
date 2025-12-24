export default class SetCustom<T> {
    private items: any = {}; // Usamos um objeto para garantir unicidade

    constructor() {}

    // Verifica se o elemento já existe no conjunto
    has(element: T): boolean {
        // O método Object.prototype.hasOwnProperty é a forma mais segura de verificar chaves
        return Object.prototype.hasOwnProperty.call(this.items, element as any);
    }

    // Adiciona um novo elemento se ele ainda não existir
    add(element: T): boolean {
        if (!this.has(element)) {
            this.items[element as any] = element; // A chave e o valor são iguais
            return true;
        }
        return false; // Elemento já existe, não faz nada
    }

    // Remove um elemento do conjunto
    delete(element: T): boolean {
        if (this.has(element)) {
            delete this.items[element as any];
            return true;
        }
        return false;
    }

    clear() {
        this.items = {};
    }

    size(): number {
        return Object.keys(this.items).length;
    }

    values(): T[] {
        return Object.values(this.items);
    }

// ... métodos anteriores (add, has, delete, etc)

    // UNIÃO: Elementos de A OU B
    union(otherSet: SetCustom<T>): SetCustom<T> {
        const unionSet = new SetCustom<T>();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
    }

    // INTERSEÇÃO: Elementos de A E B (ao mesmo tempo)
    intersection(otherSet: SetCustom<T>): SetCustom<T> {
        const intersectionSet = new SetCustom<T>();
        const values = this.values();
        const otherValues = otherSet.values();
        
        // Otimização: iteramos sobre o conjunto menor
        const smallerSet = values.length <= otherValues.length ? values : otherValues;
        const largerSet = values.length <= otherValues.length ? otherSet : this;

        smallerSet.forEach(value => {
            if (largerSet.has(value)) {
                intersectionSet.add(value);
            }
        });
        return intersectionSet;
    }

    // DIFERENÇA: Elementos que estão em A, mas NÃO em B
    difference(otherSet: SetCustom<T>): SetCustom<T> {
        const differenceSet = new SetCustom<T>();
        this.values().forEach(value => {
            if (!otherSet.has(value)) {
                differenceSet.add(value);
            }
        });
        return differenceSet;
    }

    // SUBCONJUNTO: A está totalmente contido em B?
    isSubsetOf(otherSet: SetCustom<T>): boolean {
        if (this.size() > otherSet.size()) return false;
        return this.values().every(value => otherSet.has(value));
    }
}