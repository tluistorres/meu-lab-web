import Book from './17-Book.js';

export default class ITBook extends Book {
    constructor(title, pages, technology) {
        super(title, pages);
        this.technology = technology;
    }

    printTechnology() {
        console.log(`Tecnologia: ${this.technology}`);
    }

    // Adicione este aqui:
    printFullSummary() {
        console.log(`${this.title} (${this.technology}) - ${this.pages} páginas.`);
    }
}
