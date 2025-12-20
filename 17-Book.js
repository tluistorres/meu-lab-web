export default class Book {
    constructor(title, pages) {
        this.title = title;
        this.pages = pages;
    }
    printTitle() {
        console.log("Título: " + this.title);
    }
}
