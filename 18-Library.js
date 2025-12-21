export default class Library {
    constructor() {
        this.books = []; // Nossa "estante" de livros
    }

    // Adiciona um livro à coleção
    addBook(book) {
        this.books.push(book);
        console.log(`Adicionado: ${book.title}`);
    }

    // LISTAR (Map): Transforma o array de objetos em um array de strings (títulos)
    getInventory() {
        return this.books.map(book => book.title);
    }

    // BUSCAR (Find): Localiza o primeiro livro de uma determinada tecnologia
    findTechBook(tech) {
        return this.books.find(book => book.technology === tech);
    }

    // FILTRAR (Filter): Retorna todos os livros com mais de X páginas
    findLargeBooks(minPages) {
        return this.books.filter(book => book.pages > minPages);
    }

    // TOTALIZAR (Reduce): Soma o total de páginas de todo o acervo
    getTotalPages() {
        return this.books.reduce((total, book) => total + book.pages, 0);
    }
}
