class Library {
    constructor() {
        this._books = []; // Garanta que o array existe
    }

    addBook(book) {
        if (book && book.title) {
            this._books.push(book);
            console.log(`Adicionado: ${book.title}`);
        }
    }

    get inventory() {
        return this._books.map(b => b.title);
    }
}
export default Library;