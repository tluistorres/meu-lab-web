// src/index.ts
import Library from './18-Library.js';
import ITBook from './17-ITBook.js';
import ApiService from './19-ApiService.js';
import { IAuthor } from './IAuthor.js'; // 1. Adicionamos a importação

async function main() {
    console.log("=== SISTEMA EBOOK (TS: COM INTERFACE DE AUTOR) ===\n");

    const myLibrary = new Library<ITBook>();

    try {
        const bookData = await ApiService.fetchBookData("TypeScript Avançado");
        
        // 2. Definimos o objeto do autor seguindo a Interface
        const authorLuis: IAuthor = {
            name: "Luís Torres",
            email: "luis@exemplo.com",
            bio: "Desenvolvedor e entusiasta de TypeScript"
        };

        // 3. Criamos o livro usando o objeto authorLuis
        const newBook = new ITBook(
            bookData.title, 
            authorLuis, 
            bookData.pages, 
            "Tecnologia"
        );
        
        myLibrary.addBook(newBook);

        console.log("\n✅ Execução bem-sucedida!");
        // Note que se você quiser imprimir o nome do autor agora é: newBook.author.name
        console.log(`Livro: ${newBook.title} | Autor: ${newBook.author.name}`);
        console.log("Inventário Atual:", myLibrary.inventory);

    } catch (error: any) {
        console.error("\n❌ ERRO NO FLUXO TS:", error.message);
    } finally {
        console.log("\n[Sistema] Sessão encerrada.");
    }
}

main();