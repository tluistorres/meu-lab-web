Capítulo 1: POO na Prática - Do Zero ao Ambiente Profissional

1. O Ponto de Partida: A Classe Base (17-Book.js)
O primeiro passo foi criar uma classe com Encapsulamento real. Usamos # para campos privados e get/set para validação.

JavaScript

// 17-Book.js
export default class Book {
    #pages; // Campo privado: inacessível fora da classe

    constructor(title, pages) {
        this.title = title;
        this.pages = pages; // Aciona o setter para validação
    }

    // Getters e Setters: Proteção de dados
    get pages() { return this.#pages; }

    set pages(value) {
        if (value > 0) {
            this.#pages = value;
        } else {
            console.error("Erro: O número de páginas deve ser positivo!");
        }
    }

    // Método de Instância
    printTitle() {
        console.log(`Título: ${this.title}`);
    }

    // Método Estático: Lógica global que não depende de um objeto específico
    static comparePages(bookA, bookB) {
        return bookA.pages > bookB.pages ? bookA.title : bookB.title;
    }
}
2. Especialização: Herança e Polimorfismo (17-ITBook.js)

Aqui, criamos uma classe filha que herda as regras da classe pai, mas personaliza o seu próprio comportamento (Polimorfismo).

JavaScript

// 17-ITBook.js
import Book from './17-Book.cjs'; // Importando a versão compatível com Node

export default class ITBook extends Book {
    constructor(title, pages, technology) {
        super(title, pages); // Chama o construtor do pai (Book)
        this.technology = technology;
    }

    // Sobrescrita de Método (Polimorfismo):
    // Redefinimos o printTitle para ser mais específico para TI
    printTitle() {
        console.log(`[TI] Título: ${this.title} - Tecnologia: ${this.technology}`);
    }
}
3. O "Pulo do Gato": Pipeline de Build (package.json)
Como o Node.js lida de forma diferente com módulos modernos e antigos, configuramos o Babel para automatizar a tradução do código.

Passo a Passo da Automação:

Build: Transpila o código JS moderno para a pasta /lib.

Compatibilidade: Renomeia para .cjs para o Node não "reclamar" do require.

Execução: Testa se a proteção de dados está funcionando.

JSON

{
  "type": "module",
  "scripts": {
    "build": "babel 17-Book.js 17-ITBook.js --out-dir lib && cp lib/*.js lib/*.cjs",
    "test-it": "npm run build && node -e \"const ITBook = require('./lib/17-ITBook.cjs').default; const it = new ITBook('React', 300, 'Web'); it.printTitle();\""
  }
}
4. Teste Prático (O que acontece no terminal)
Ao executar npm run test-it, o fluxo é:

O comando super(title, pages) no ITBook envia os dados para o Book.

Se enviarmos -5, o Setter bloqueia e exibe erro.

Ao chamar it.printTitle(), o JavaScript usa a versão da classe filha (Polimorfismo).

Resultado esperado no console:

Plaintext

Successfully compiled 2 files with Babel.
[TI] Título: React - Tecnologia: Web
Páginas: 300
Checkpoint de Estudo (O que você praticou):
Sintaxe de Classe: class, constructor, new.

Proteção: #privateField, get, set.

Relacionamento: extends, super().

Especialização: Overriding de métodos.

Tooling: Uso de Babel, CLI e Scripts NPM.

Dica para o seu Ebook: Neste capítulo, a prática provou que a teoria da POO serve para criar códigos mais seguros (através do encapsulamento) e mais reutilizáveis (através da herança).



