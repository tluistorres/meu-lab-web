import Book from './17-Book.js';

export default class ITBook extends Book {
    constructor(title, pages, technology) {
        super(title, pages);
        this.technology = technology;
    }

    // Sobrescrita (Override)
    printTitle() {
        // Podemos chamar o método do pai usando super.printTitle() 
        // ou criar um totalmente novo:
        console.log(`[TI] Título: ${this.title} - Tech: ${this.technology}`);
    }
}