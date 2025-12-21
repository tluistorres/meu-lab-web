export default class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        console.log(`Adicionado: ${book.title}`);
    }

    getInventory() {
        // Retorna array de títulos
        return this.books.map(book => book.title);
    }

    // O método que o teste está chamando:
    calculateTotalPages() {
        return this.books.reduce((total, book) => total + book.pages, 0);
    }

    // EXTRA: Para o exercício de filtro
    getBooksByTech(tech) {
        return this.books.filter(book => book.technology === tech);
    }
}