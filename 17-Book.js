export default class Book {
    #pages; 

    constructor(title, pages) {
        this.title = title;
        this.pages = pages;
    }

    get pages() { return this.#pages; }

    set pages(value) {
        if (value > 0) {
            this.#pages = value;
        } else {
            console.error("Erro: O número de páginas deve ser positivo!");
        }
    }

    printTitle() {
        console.log(`Título: ${this.title}`);
    }

    // O método static DEVE estar antes da última chave da classe
    static isValid(bookObj) {
        return typeof bookObj.title === 'string' && bookObj.pages > 0;
    }
} // <--- ESTA CHAVE FECHA A CLASSE INTEIRA