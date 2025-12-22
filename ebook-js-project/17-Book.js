export default class Book {
    // 1. Declaração obrigatória para o TS enxergar as propriedades
    title;
    _pages;
    constructor(title, pages) {
        this.title = title;
        this._pages = 0; // Inicializa
        this.pages = pages; // Usa o setter
    }
    get pages() {
        return this._pages;
    }
    set pages(value) {
        if (value > 0) {
            this._pages = value;
        }
        else {
            throw new Error("O número de páginas deve ser positivo!");
        }
    }
    printTitle() {
        console.log(`Título: ${this.title}`);
    }
    static isValid(bookObj) {
        return typeof bookObj.title === 'string' && bookObj.pages > 0;
    }
}
