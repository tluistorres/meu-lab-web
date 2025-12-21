// 17-Ebook.js
import ITBook from './17-ITBook.cjs';

export default class Ebook extends ITBook {
    constructor(title, pages, technology, fileSize) {
        super(title, pages, technology); // Passa os dados para o ITBook -> que passa para o Book
        this.fileSize = fileSize;
    }

    printTitle() {
        super.printTitle(); // Chama o print do ITBook
        console.log(`[Digital] Tamanho: ${this.fileSize}MB`);
    }
}