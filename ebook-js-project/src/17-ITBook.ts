// src/17-ITBook.ts
import Book from './17-Book.js';
import { IAuthor } from './IAuthor.js';

export default class ITBook extends Book {
    public category: string;

    constructor(title: string, author: IAuthor, pages: number, category: string) {
        // O super() deve enviar os 3 argumentos que o Book (pai) exige
        super(title, author, pages);
        this.category = category;
    }

    /**
     * Exibe detalhes específicos de livros de tecnologia.
     */
    public printDetails(): void {
        console.log(
            `[IT Book] ${this.title}\n` +
            `Autor: ${this.author.name} (${this.author.email})\n` +
            `Categoria: ${this.category} | Páginas: ${this.pages}`
        );
    }
}