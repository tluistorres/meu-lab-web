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

# Checkpoint de Estudo (O que você praticou):

 - Sintaxe de Classe: class, constructor, new.

 - Proteção: #privateField, get, set.

 - Relacionamento: extends, super().

 - Especialização: Overriding de métodos.

 - Tooling: Uso de Babel, CLI e Scripts NPM.

 - Dica para o seu Ebook: Neste capítulo, a prática provou que a teoria da POO serve para criar códigos mais seguros (através do encapsulamento) e mais reutilizáveis (através da herança).

 - Para encerrar o Capítulo 1, vamos adicionar duas atividades que forçam o uso de Lógica Estática e Herança Avançada.

## Atividade 1: O Validador de Acervo (Método Estático)

 - Objetivo: Criar uma ferramenta na classe Book que consiga identificar se um objeto é um livro válido, sem precisar instanciar um novo livro para isso.

 - O Desafio: No arquivo 17-Book.js, adicione um método estático chamado isValid. Ele deve receber um objeto e verificar se ele possui um título (string) e se o número de páginas é maior que zero.

 - Código para implementar:

 - JavaScript

// Dentro da classe Book em 17-Book.js
static isValid(bookObj) {
    return typeof bookObj.title === 'string' && bookObj.pages > 0;
}
Como testar no terminal:

Bash

node -e "const Book = require('./lib/17-Book.cjs').default; console.log('É válido?', Book.isValid({title: 'Teste', pages: 10})); console.log('É válido?', Book.isValid({title: '', pages: -5}));"

## Atividade 2: A Especialização Máxima (Herança de Nível 2)

 - Objetivo: Provar que a herança pode ter múltiplas camadas (uma classe filha de outra classe filha).

 - O Desafio: Crie um novo arquivo chamado 17-Ebook.js. Esta classe deve herdar de ITBook.

 - Ela deve ter uma propriedade extra chamada fileSize (tamanho do arquivo em MB).

 - Ela deve sobrescrever o método printTitle para incluir o tamanho do arquivo.

 - Código para implementar:

JavaScript

// 17-Ebook.js
import ITBook from './17-ITBook.cjs';

export default class Ebook extends ITBook {
    constructor(title, pages, technology, fileSize) {
        super(title, pages, technology); // Passa os dados para o ITBook -> que passa para o Book
        this.fileSize = fileSize;
    }

    printTitle() {
        super.printTitle(); // Chama o print do ITBook
        console.log(`[Digital] Tamanho: ${this.fileSize}MB`);
    }
}
 - Passo a Passo para o Aluno (Prática de Fechamento):

 - Implemente o método isValid no 17-Book.js.

 - Crie o arquivo 17-Ebook.js com a estrutura acima.

 - Atualize seu package.json para incluir o novo arquivo no build: "build": "babel 17-Book.js 17-ITBook.js 17-Ebook.js --out-dir lib && cp lib/*.js lib/*.cjs"

 - Execute um teste criando um new Ebook(...) e veja a "cascata" de construtores e métodos funcionando.

## Resumo do Desfecho do Capítulo 1:

 - Ao concluir estas duas atividades, o leitor terá praticado:

 - Lógica de utilitário com métodos estáticos.

 - Cadeia de protótipos profunda (Ebook -> ITBook -> Book).

 - Reuso de código de ancestrais usando super.metodo().

## Aqui tens o "Grand Finale" do Capítulo 1. Vamos configurar um script de teste que valida tudo o que construímos: a Proteção de Dados, a Herança Multi-nível (Ebook -> ITBook -> Book) e o Método Estático.

1. Atualizar o package.json

Substitui a seção de scripts pelo código abaixo. Repara que adicionei o 17-Ebook.js ao build e criei o comando test-final.

JSON

"scripts": {
  "build": "babel 17-Book.js 17-ITBook.js 17-Ebook.js --out-dir lib && cp lib/*.js lib/*.cjs",
  "test-final": "npm run build && node -e \"const Ebook = require('./lib/17-Ebook.cjs').default; const Book = require('./lib/17-Book.cjs').default; console.log('--- TESTE 1: Validador Estático ---'); console.log('Dados OK:', Book.isValid({title: 'JS Guia', pages: 500})); console.log('Dados Errados:', Book.isValid({title: '', pages: -10})); console.log('\\n--- TESTE 2: Herança Multi-nível (Ebook) ---'); const meuEbook = new Ebook('Node.js Avançado', 450, 'Backend', 15); meuEbook.printTitle();\""
}

2. O que este script vai testar?

 - O Validador Estático: Ele vai usar a lógica do Book.isValid para dizer se os dados de um objeto são aceitáveis sem precisar criar um objeto new.

 - A Cascata de Herança: Ele vai instanciar um Ebook.

 - O Ebook chama o super() do ITBook.

 - O ITBook chama o super() do Book.

 - O Book valida as páginas no Setter.

A Sobrescrita (Override) Complexa: Quando chamarmos meuEbook.printTitle(), ele vai executar a lógica do ITBook E a lógica extra do Ebook.

3. Como Executar

No terminal, corre o seguinte comando:

Bash

npm run test-final

4. Resultado Esperado no Terminal

Se tudo estiver correto (após criares o ficheiro 17-Ebook.js), a saída deverá ser:

Plaintext

Successfully compiled 3 files with Babel.

--- TESTE 1: Validador Estático ---
Dados OK: true
Dados Errados: false

--- TESTE 2: Herança Multi-nível (Ebook) ---
[TI] Título: Node.js Avançado - Tecnologia: Backend
[Digital] Tamanho: 15MB
Explicação para o seu Ebook:

Teste 1: Demonstra que a classe pode funcionar como uma "caixa de ferramentas" (Utility Class).

Teste 2: Demonstra o Efeito Cascata. O Ebook é, ao mesmo tempo, um ITBook e um Book. Ele tem a marcação de TI ([TI]) e a marcação digital ([Digital]).

Com este teste a passar, o Capítulo 1 está oficialmente concluído e blindado! Estás pronto para enviar para o GitHub e começar o Capítulo 2?

## 