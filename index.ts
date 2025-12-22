import Library from './18-Library.js';
import ITBook from './17-ITBook.js';
import ApiService from './19-ApiService.js';

async function main() {
    const myLibrary = new Library<ITBook>(); // Usando o Generic que criamos

    try {
        const bookData = await ApiService.fetchBookData("JavaScript Moderno");
        const newBook = new ITBook(bookData.title, "Luís Torres", bookData.pages, "Tecnologia");
        
        myLibrary.addBook(newBook);
        console.log("\n✅ Processo finalizado com sucesso!");
        console.log(`Inventário:`, myLibrary.inventory);

    } catch (error: any) {
        console.error("\n❌ ERRO CAPTURADO:", error.message);
    }
}

main();