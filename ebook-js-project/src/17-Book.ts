// src/17-Book.ts

export default class Book {
    // 1. No TypeScript, declaramos as propriedades antes do constructor
    public title: string;
    private _pages: number;

    constructor(title: string, pages: number) {
        this.title = title;
        // Inicializamos com um valor padrão antes de passar pelo setter
        this._pages = 0; 
        // Aqui chamamos o setter 'pages' abaixo para validar o valor
        this.pages = pages;
    }

    // Getter para ler o número de páginas
    get pages(): number {
        return this._pages;
    }

    // Setter para validar e gravar o número de páginas
    set pages(value: number) {
        if (value > 0) {
            this._pages = value;
        } else {
            // No TS, o 'throw' é a forma correta de interromper o fluxo
            throw new Error("O número de páginas deve ser positivo!");
        }
    }

    // Método comum
    public printTitle(): void {
        console.log(`Título: ${this.title}`);
    }

    /**
     * Método estático para validar se um objeto tem o formato de um livro.
     * @param bookObj Objeto com título (string) e páginas (number)
     */
    static isValid(bookObj: { title: string; pages: number }): boolean {
        return typeof bookObj.title === 'string' && bookObj.pages > 0;
    }
}