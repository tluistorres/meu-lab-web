// src/index.js
import Library from './18-Library.js'; // PRECISA do .js
import ITBook from './17-ITBook.js';   // PRECISA do .js
import ApiService from './19-ApiService.js'; // PRECISA do .js

// ... resto do código

async function runSystem() {
    console.log("=== INICIANDO SISTEMA (CAP 4) ===\n");
    const lib = new Library();

    try {
        const data = await ApiService.fetchBookData('JavaScript Moderno');
        const book = new ITBook(data.title, 500, 'Programação');
        lib.addBook(book);
        
        console.log("\nInventário:", lib.getInventory());
        console.log("Total de páginas:", lib.calculateTotalPages());
    } catch (err) {
        console.error("Erro no carregamento:", err);
    }
}

runSystem();