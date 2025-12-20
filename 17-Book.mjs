// 17-Book.js
export default class Book {
    constructor(title) {
        this.title = title;
    }
    
    printTitle() {
        console.log("Título do livro: " + this.title);
    }
}
