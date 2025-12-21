export default class Book {
    // Declaramos que o campo é privado antes de usar
    #pages; 

    constructor(title, pages) {
        this.title = title;
        this.pages = pages; 
    }

    get pages() {
        return this.#pages;
    }

    set pages(value) {
        if (value > 0) {
            this.#pages = value;
        } else {
            console.error("Erro: Valor inválido para #pages!");
        }
    }

    printTitle() {
        console.log("Título: " + this.title);
    }
}

// Dentro da classe Book em 17-Book.js
static isValid(bookObj) {
    return typeof bookObj.title === 'string' && bookObj.pages > 0;
}