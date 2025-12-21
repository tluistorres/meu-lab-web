export default class ApiService {
    // Simulamos uma busca externa usando Promise e setTimeout
    static fetchBookData(title) {
        console.log(`[API] Buscando dados de "${title}" nos servidores...`);
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const found = true; // Simulação de busca positiva

                if (found) {
                    resolve({
                        title: title,
                        isbn: "978-3-16-148410-0",
                        available: true,
                        serverTime: new Date().toLocaleTimeString()
                    });
                } else {
                    reject("Erro: Livro não encontrado no servidor.");
                }
            }, 2000); // Espera 2 segundos
        });
    }
}
