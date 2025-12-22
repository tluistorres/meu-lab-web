// src/17-Book.ts
import { IAuthor } from './IAuthor.js';

export default class Book {
    public title: string;
    public author: IAuthor; // Agora usa a Interface IAuthor
    private _pages: number = 0;

    constructor(title: string, author: IAuthor, pages: number) {
        this.title = title;
        this.author = author;
        // O setter 'pages' será chamado aqui para validar o valor
        this.pages = pages;
    }

    // Getter para acessar o número de páginas com segurança
    get pages(): number {
        return this._pages;
    }

    // Setter para validar se o número de páginas é positivo
    set pages(value: number) {
        if (value > 0) {
            this._pages = value;
        } else {
            throw new Error("O número de páginas deve ser um valor positivo!");
        }
    }

    /**
     * Exibe informações básicas do livro no console.
     */
    public printTitle(): void {
        console.log(`Título: ${this.title} | Escrito por: ${this.author.name}`);
    }
}