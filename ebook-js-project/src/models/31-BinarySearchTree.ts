import { TreeNode } from './tree-models.js'; // PRECISA ter o .js no final

export default class BinarySearchTree<T> {
    protected root: TreeNode<T> | null = null;

    constructor() {}

    // --- INSERÇÃO ---
    insert(key: T): void {
        if (this.root === null) {
            this.root = new TreeNode(key);
        } else {
            this.insertNode(this.root, key);
        }
    }

    private insertNode(node: TreeNode<T>, key: T): void {
        if (key < node.key) {
            if (node.left === null) {
                node.left = new TreeNode(key);
            } else {
                this.insertNode(node.left, key);
            }
        } else if (key > node.key) {
            if (node.right === null) {
                node.right = new TreeNode(key);
            } else {
                this.insertNode(node.right, key);
            }
        }
    }

    // --- BUSCA ---
    search(key: T): boolean {
        return this.searchNode(this.root, key);
    }

    private searchNode(node: TreeNode<T> | null, key: T): boolean {
        if (node === null) return false;
        if (key < node.key) return this.searchNode(node.left, key);
        if (key > node.key) return this.searchNode(node.right, key);
        return true;
    }

    // --- PERCURSOS ---
    inOrderTraverse(callback: (key: T) => void): void {
        this.inOrderTraverseNode(this.root, callback);
    }

    private inOrderTraverseNode(node: TreeNode<T> | null, callback: (key: T) => void): void {
        if (node !== null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            this.inOrderTraverseNode(node.right, callback);
        }
    }

    // --- EXTREMOS ---
    min(): T | null {
        const node = this.minNode(this.root);
        return node ? node.key : null;
    }

    private minNode(node: TreeNode<T> | null): TreeNode<T> | null {
        let current = node;
        while (current !== null && current.left !== null) {
            current = current.left;
        }
        return current;
    }

    max(): T | null {
        let current = this.root;
        while (current !== null && current.right !== null) {
            current = current.right;
        }
        return current ? current.key : null;
    }

    // --- REMOÇÃO ---
    remove(key: T): void {
        this.root = this.removeNode(this.root, key);
    }

    private removeNode(node: TreeNode<T> | null, key: T): TreeNode<T> | null {
        if (node === null) return null;

        if (key < node.key) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (key > node.key) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            // Caso 1: Folha (sem filhos)
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            // Caso 2: Apenas um filho
            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }
            // Caso 3: Dois filhos
            const aux = this.minNode(node.right)!;
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key);
            return node;
        }
    }

    getRoot() { return this.root; }


     // --- DESAFIO FINAL ---

    // 1. Contar total de nós
    size(): number {
        return this.countNodes(this.root);
    }

    private countNodes(node: TreeNode<T> | null): number {
        if (node === null) return 0;
        return 1 + this.countNodes(node.left) + this.countNodes(node.right);
    }

    // 2. Calcular altura da árvore
    height(): number {
        return this.getNodeHeight(this.root);
    }

    private getNodeHeight(node: TreeNode<T> | null): number {
        if (node === null) return -1;
        return 1 + Math.max(
            this.getNodeHeight(node.left), 
            this.getNodeHeight(node.right)
        );
    }   

    // --- BÔNUS: VISUALIZAÇÃO ---
    print(): void {
        this.printNode(this.root, 0);
    }

    private printNode(node: TreeNode<T> | null, level: number): void {
        if (node !== null) {
            this.printNode(node.right, level + 1);
            console.log(`${' '.repeat(level * 4)}→ ${node.key}`);
            this.printNode(node.left, level + 1);
        }
    }

}