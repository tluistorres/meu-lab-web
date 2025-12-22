import Book from './17-Book.js'; // Adicione o .js

// O <T extends Book> diz: "Esta biblioteca trabalha com o tipo T, 
// desde que T seja um Book ou um filho de Book (como o ITBook)"
export default class Library<T extends Book> {
    private _books: T[];

    constructor() {
        this._books = [];
    }

    addBook(book: T): void {
        this._books.push(book);
        console.log(`[TS] Adicionado ao inventário: ${book.title}`);
    }

    get inventory(): string[] {
        return this._books.map(b => b.title);
    }

    // Método para buscar um livro específico com tipagem garantida
    findBookByTitle(title: string): T | undefined {
        return this._books.find(b => b.title === title);
    }
}