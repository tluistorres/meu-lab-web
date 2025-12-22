import Library from './18-Library.js';
import ITBook from './17-ITBook.js';
import ApiService from './19-ApiService.js';

async function main() {
    console.log("=== INICIANDO SISTEMA (CAP 5: TRATAMENTO DE ERROS) ===\n");

    const myLibrary = new Library();

    try {
        const bookData = await ApiService.fetchBookData("JavaScript Moderno");
        
        // Se bookData.pages for <= 0, o construtor do ITBook deve lançar um THROW
        const newBook = new ITBook(bookData.title, "Luís Torres", bookData.pages, "Tecnologia");
        
        myLibrary.addBook(newBook);

        console.log("\n✅ Processo finalizado com sucesso!");
        console.log(`Inventário:`, myLibrary.inventory);

    } catch (error) {
        // Unificamos os dois blocos catch em um só
        console.error("\n❌ ERRO CAPTURADO NO SISTEMA:");
        console.error(`> Motivo: ${error.message}`);
        
        // Verificação específica para erros de rede
        if (error.message.includes("conexão")) {
            console.log("> Dica: Verifique sua internet ou o status do servidor e tente novamente.");
        }
    } finally {
        console.log("\n[Log de Auditoria] Sessão encerrada.");
    }
}

main();