export default class Book {
    #pages; 

    constructor(title, pages) {
        this.title = title;
        // Ao atribuir aqui, o JS chama o 'set pages(value)' abaixo automaticamente
        this.pages = pages; 
    }

    get pages() { return this.#pages; }

    set pages(value) {
        if (value > 0) {
            this.#pages = value;
        } else {
            // 🚨 A MUDANÇA É AQUI:
            // O 'throw' interrompe a execução e pula direto para o 'catch' do index.js
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