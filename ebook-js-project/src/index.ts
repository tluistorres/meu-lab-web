// src/index.ts
import Library from './18-Library.js';
import ITBook from './17-ITBook.js';
import ApiService from './19-ApiService.js';

async function main() {
    console.log("=== SISTEMA EBOOK (MIGRAÇÃO TYPESCRIPT CONCLUÍDA) ===\n");

    // Usando Generics: Nossa biblioteca agora é específica para ITBooks
    const myLibrary = new Library<ITBook>();

    try {
        const bookData = await ApiService.fetchBookData("TypeScript Avançado");
        
        const newBook = new ITBook(
            bookData.title, 
            "Luís Torres", 
            bookData.pages, 
            "Tecnologia"
        );
        
        myLibrary.addBook(newBook);

        console.log("\n✅ Execução bem-sucedida!");
        console.log("Inventário Atual:", myLibrary.inventory);

    } catch (error: any) {
        console.error("\n❌ ERRO NO FLUXO TS:", error.message);
    } finally {
        console.log("\n[Sistema] Sessão encerrada.");
    }
}

main();