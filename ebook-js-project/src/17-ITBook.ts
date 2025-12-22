import Book from './17-Book.js'; 

export default class ITBook extends Book {
    public category: string;

    constructor(title: string, author: string, pages: number, category: string) {
        // Passa título e páginas para a classe pai (Book)
        super(title, pages);
        this.category = category;
    }

    public printDetails(): void {
        // Agora o TS reconhece title e pages porque declaramos no Book.ts
        console.log(`IT Book: ${this.title} | Categoria: ${this.category} | Páginas: ${this.pages}`);
    }
}