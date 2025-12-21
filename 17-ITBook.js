import Library from './18-Library.js';
import ITBook from './17-ITBook.js';
import ApiService from './19-ApiService.js';

async function bootstrap() {
    const myLib = new Library();
    
    console.log("--- Sistema de Livraria Profissional ---");
    
    // 1. Buscando dados externos
    try {
        const bookData = await ApiService.fetchBookData('Clean Code');
        const newBook = new ITBook(bookData.title, 464, 'Engenharia de Software');
        
        myLib.addBook(newBook);
        
        console.log("Inventário Atual:", myLib.getInventory());
    } catch (error) {
        console.error("Falha ao iniciar sistema:", error);
    }
}

bootstrap();
