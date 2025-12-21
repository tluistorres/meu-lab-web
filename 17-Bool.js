export default class Book {
    constructor(title, pages) {
        this.title = title;
        this.pages = pages;
    }

    printTitle() {
        console.log("Título: " + this.title);
    }

    // O método static pertence à CLASSE, não ao objeto (instância)
    static comparePages(bookA, bookB) {
        if (bookA.pages > bookB.pages) {
            return `${bookA.title} é maior.`;
        }
        return `${bookB.title} é maior.`;
    }
}
