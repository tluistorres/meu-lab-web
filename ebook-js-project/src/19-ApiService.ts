// Definimos uma Interface para os dados da API
interface BookApiResponse {
    title: string;
    pages: number;
}

class ApiService {
    static async fetchBookData(title: string): Promise<BookApiResponse> {
        console.log(`[API TS] Buscando dados de "${title}"...`);

        if (!title) {
            throw new Error("O título é obrigatório.");
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() < 0.2) {
                    reject(new Error("Falha na conexão com o servidor."));
                } else {
                    // O TS garante que este objeto segue a interface BookApiResponse
                    resolve({ title: title, pages: 500 });
                }
            }, 1000);
        });
    }
}

export default ApiService;