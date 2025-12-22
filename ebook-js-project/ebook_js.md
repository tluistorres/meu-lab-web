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

## Capítulo 2: Gestão de Coleções e Manipulação de Arrays

Neste capítulo, vamos criar uma classe Library (Livraria) que funcionará como um banco de dados em memória para gerenciar nossos livros.

1. O Conceito de "Container"

Uma classe não precisa sempre representar um objeto físico; ela pode ser uma ferramenta de gestão. A nossa Library terá um Array interno para guardar os livros.

2. Mão na Massa: Criando o 18-Library.js

Crie um novo arquivo para gerenciar seu acervo:

JavaScript

export default class Library {
    constructor() {
        this.books = []; // Nossa "estante" de livros
    }

    // Adiciona um livro à coleção
    addBook(book) {
        this.books.push(book);
        console.log(`Adicionado: ${book.title}`);
    }

    // LISTAR (Map): Transforma o array de objetos em um array de strings (títulos)
    getInventory() {
        return this.books.map(book => book.title);
    }

    // BUSCAR (Find): Localiza o primeiro livro de uma determinada tecnologia
    findTechBook(tech) {
        return this.books.find(book => book.technology === tech);
    }

    // FILTRAR (Filter): Retorna todos os livros com mais de X páginas
    findLargeBooks(minPages) {
        return this.books.filter(book => book.pages > minPages);
    }

    // TOTALIZAR (Reduce): Soma o total de páginas de todo o acervo
    getTotalPages() {
        return this.books.reduce((total, book) => total + book.pages, 0);
    }
}
3. Por que usar esses métodos (Map, Filter, Reduce)?

Antigamente, usávamos o laço for para tudo. Hoje, esses métodos são o padrão da indústria porque:

São Declarativos: Você diz o que quer, não como fazer.

Menos Bugs: Evitam erros comuns de contagem em índices de arrays.

Imutabilidade: Eles geralmente retornam um novo array em vez de modificar o original (o que é ótimo para segurança de dados).

4. Preparando o Teste Prático

Vamos ver essa livraria funcionando com diferentes tipos de livros que criamos no Capítulo 1.

Atualize o seu package.json para o teste do Capítulo 2:

JSON

"test-cap2": "npm run build && node -e \"const Library = require('./lib/18-Library.cjs').default; const ITBook = require('./lib/17-ITBook.cjs').default; const lib = new Library(); lib.addBook(new ITBook('React', 300, 'Web')); lib.addBook(new ITBook('Node', 450, 'Backend')); lib.addBook(new ITBook('Python', 150, 'Data Science')); console.log('\\nInventário:', lib.getInventory()); console.log('Total de páginas no acervo:', lib.getTotalPages());\""
(Não esqueça de adicionar 18-Library.js ao comando de build no package.json!)

O que vamos praticar agora:

Composição: Uma classe (Library) que contém instâncias de outra classe (Book).

Lógica de Negócio: Como extrair relatórios (Total de páginas, lista de títulos) de um conjunto de dados.

Podemos seguir com a criação do arquivo 18-Library.js e rodar esse teste? Se estiver pronto, me avise para refinarmos a lógica de busca!

## Vamos colocar a mão na massa. O segredo aqui é entender que a Library é o cérebro que organiza todos os objetos que criamos no Capítulo 1.

1. Criar o arquivo 18-Library.js

Crie o arquivo e cole o código abaixo. Note que aqui usamos métodos funcionais, que são a base do JavaScript moderno:

JavaScript

export default class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        console.log(`> Sucesso: "${book.title}" guardado na estante.`);
    }

    // MAP: Retorna apenas os nomes dos livros (uma lista de strings)
    getInventory() {
        return this.books.map(book => book.title);
    }

    // FILTER: Retorna um sub-array apenas com livros de uma certa tecnologia
    filterByTech(tech) {
        return this.books.filter(book => book.technology === tech);
    }

    // REDUCE: Transforma o array inteiro em um único número (a soma das páginas)
    calculateTotalPages() {
        return this.books.reduce((total, book) => total + book.pages, 0);
    }
}

2. Atualizar o package.json para o Capítulo 2

Precisamos ajustar o comando de build para incluir o novo arquivo e o comando test-cap2 para executar a lógica da livraria.

Substitua a seção de scripts:

JSON

"scripts": {
  "build": "babel 17-Book.js 17-ITBook.js 17-Ebook.js 18-Library.js --out-dir lib && cp lib/*.js lib/*.cjs",
  "test-cap2": "npm run build && node -e \"const Library = require('./lib/18-Library.cjs').default; const ITBook = require('./lib/17-ITBook.cjs').default; const lib = new Library(); lib.addBook(new ITBook('React', 300, 'Web')); lib.addBook(new ITBook('Node.js', 450, 'Backend')); lib.addBook(new ITBook('Docker', 200, 'DevOps')); console.log('\\n--- RELATÓRIO DA BIBLIOTECA ---'); console.log('Livros disponíveis:', lib.getInventory()); console.log('Total de páginas no acervo:', lib.calculateTotalPages()); const devops = lib.filterByTech('DevOps'); console.log('Livros de DevOps encontrados:', devops.length);\""
}

3. Executar o Teste

No terminal:

Bash

npm run test-cap2

Por que este passo é crucial para o seu Ebook?
Nesta fase, o leitor aprende que objetos não vivem sozinhos. No Capítulo 1, focamos na "anatomia" do livro (a classe). No Capítulo 2, focamos no "ecossistema" (a livraria).

# O que observar na saída:

 - Iteração: Como o map percorreu cada livro e extraiu apenas o título.

 - Acumulação: Como o reduce começou em 0 e foi somando as páginas de cada objeto.

 - Estado: A instância lib mantém todos os livros salvos na memória enquanto o programa rodar.

 - Conseguiu rodar? Se o relatório aparecer corretamente no terminal, podemos adicionar uma funcionalidade de Busca por Nome usando o método .find(), que é essencial para qualquer sistema de busca. Quer tentar?

 ## Agora que a nossa Library já consegue listar e somar páginas, vamos adicionar a "cereja do bolo" da manipulação de dados: a Busca Refinada e a Ordenação.

No mundo real, os dados raramente chegam organizados. O seu sistema precisa saber encontrar um agulha no palheiro e entregar os resultados em ordem.

1. Evoluindo a 18-Library.js

Vamos adicionar dois métodos fundamentais:

.find(): Para localizar um livro específico pelo título (retorna o objeto inteiro).

.sort(): Para organizar os livros por número de páginas (do menor para o maior).

Atualize seu arquivo 18-Library.js:

JavaScript

export default class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        console.log(`> Sucesso: "${book.title}" guardado.`);
    }

    getInventory() {
        return this.books.map(book => book.title);
    }

    // FIND: Retorna o primeiro objeto que encontrar com esse título exato
    findBookByTitle(title) {
        const found = this.books.find(book => book.title === title);
        return found ? found : "Livro não encontrado.";
    }

    // SORT: Organiza os livros. 
    // (a, b) => a.pages - b.pages ordena do menor para o maior
    sortByPages() {
        return [...this.books].sort((a, b) => a.pages - b.pages);
    }

    calculateTotalPages() {
        return this.books.reduce((total, book) => total + book.pages, 0);
    }
}

2. Dica de Ouro: O "Spread Operator" ([...])

Repare que no sortByPages usei [...this.books].

Por que? O método .sort() do JavaScript é "destrutivo", ou seja, ele altera a ordem do array original.

A Boa Prática: Usamos os três pontos ... para criar uma cópia rápida do array antes de ordenar. Assim, a nossa estante original permanece na ordem em que os livros foram comprados/adicionados.

3. Teste de Busca e Ordenação no package.json

Vamos atualizar o script de teste para validar se a busca funciona e se a ordenação está correta:

JSON

"test-cap2": "npm run build && node -e \"const Library = require('./lib/18-Library.cjs').default; const ITBook = require('./lib/17-ITBook.cjs').default; const lib = new Library(); lib.addBook(new ITBook('React', 300, 'Web')); lib.addBook(new ITBook('Node.js', 450, 'Backend')); lib.addBook(new ITBook('Docker', 100, 'DevOps')); console.log('\\n--- BUSCA ---'); console.log('Buscando Node.js:', lib.findBookByTitle('Node.js').title); console.log('\\n--- ORDENAÇÃO (Menos páginas primeiro) ---'); lib.sortByPages().forEach(b => console.log(` + b.title + ': ' + b.pages + ' pags'));\""
4. Executar e Observar
Rode no terminal:

Bash

npm run test-cap2

O que você verá:

 - A busca retornará o objeto "Node.js".

 - A lista final mostrará Docker (100) antes de React (300), provando que o motor de ordenação funcionou.

 - O que acha de finalizarmos o Capítulo 2 com um pequeno desafio de "Remoção de Livros"? (Usando o método .filter() para excluir um livro da estante).

 ## Vamos fechar o Capítulo 2 com a funcionalidade de Remoção, que é o teste definitivo para o seu controle de "estado" da livraria.

Na programação, remover um item de uma lista quase nunca significa "apagar" fisicamente, mas sim gerar uma nova lista que não contenha aquele item específico.

1. Implementando a Remoção no 18-Library.js

Para remover, usaremos o método .filter(). A lógica é: "Quero todos os livros, exceto aquele que tem o título X".

Adicione este método ao seu arquivo:

JavaScript

    // DELETE: Remove um livro pelo título
    removeBook(title) {
        const initialCount = this.books.length;
        // Filtramos a lista mantendo apenas quem NÃO tem o título informado
        this.books = this.books.filter(book => book.title !== title);
        
        if (this.books.length < initialCount) {
            console.log(`> Sucesso: "${title}" foi removido do acervo.`);
        } else {
            console.log(`> Aviso: "${title}" não foi encontrado para remoção.`);
        }
    }
2. Script de Teste Completo (O Gran Finale do Cap. 2)

Vamos atualizar o seu package.json para fazer o ciclo completo: Adicionar, Listar, Ordenar e Remover.

JSON

"test-cap2": "npm run build && node -e \"const Library = require('./lib/18-Library.cjs').default; const ITBook = require('./lib/17-ITBook.cjs').default; const lib = new Library(); lib.addBook(new ITBook('React', 300, 'Web')); lib.addBook(new ITBook('Node', 450, 'Backend')); lib.addBook(new ITBook('Docker', 100, 'DevOps')); console.log('\\n--- ESTADO INICIAL ---'); console.log(lib.getInventory()); console.log('\\n--- REMOVENDO NODE ---'); lib.removeBook('Node'); console.log('\\n--- ESTADO FINAL ---'); console.log(lib.getInventory());\""

3. Por que isso encerra o Capítulo 2?
Com essa última peça, você ensinou ao leitor as 4 operações básicas de qualquer sistema de dados (CRUD - Create, Read, Update, Delete), mas usando Programação Funcional dentro de Classes.

 - Create: addBook (Array.push)

 - Read: getInventory (Array.map) e findBookByTitle (Array.find)

 - Delete: removeBook (Array.filter)

4. Resumo para o seu Ebook (Capítulo 2)

# Atividades Práticas Sugeridas:

 - A Estante Inteligente: Adicione 5 livros e use o filter para mostrar apenas os que têm mais de 200 páginas.

 - O Inventário de Valor: Use o reduce para calcular quanto custaria o acervo se cada página custasse R$ 0,50.

 ## Capítulo 2: Gestão de Coleções e Manipulação de Dados

Neste capítulo, elevamos o nível da aplicação. Saímos da criação de objetos isolados para a construção de um sistema de gestão (Library), utilizando o poder dos métodos funcionais de Array do JavaScript moderno.

1. O Conceito de Gerenciamento de Estado

Uma classe de gerenciamento (como a Library) serve para agrupar instâncias de outras classes e oferecer ferramentas para manipular esse conjunto de dados de forma segura e eficiente.

2. Métodos de Array: O Coração do JavaScript Moderno

 - Abandonamos os laços for tradicionais em favor de métodos declarativos que tornam o código mais limpo e menos propenso a erros:

 - map(): Transforma dados. Usado para extrair apenas os títulos dos livros.

 - filter(): Filtra dados. Essencial para buscas por critérios (ex: tecnologia) ou para remover itens do acervo.

 - find(): Localização precisa. Retorna o primeiro objeto que satisfaz uma condição.

 - reduce(): Agregação. Transforma um array inteiro em um único valor (ex: soma total de páginas).

 - sort(): Ordenação. Organiza o acervo por critérios numéricos ou alfabéticos.

3. Exemplo Prático: A Classe Library

JavaScript

// 18-Library.js
export default class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    getInventory() {
        return this.books.map(b => b.title);
    }

    removeBook(title) {
        this.books = this.books.filter(b => b.title !== title);
    }

    calculateTotalPages() {
        return this.books.reduce((total, b) => total + b.pages, 0);
    }
}

4. Exercícios de Encerramento (Capítulo 2)

Exercício 1: O Relatório de "Livros Densos" (Filtro e Mapeamento)

Objetivo: Criar um método que retorne apenas os títulos dos livros que possuem mais de 250 páginas.

# Passo a Passo:

 - No arquivo 18-Library.js, crie um método chamado getLargeBookTitles(minPages).

 - Use o .filter() para selecionar os livros que têm pages > minPages.

 - Encadeie um .map() logo em seguida para retornar apenas o title desses livros.

Teste no Terminal:

Bash

node -e "const Library = require('./lib/18-Library.cjs').default; const ITBook = require('./lib/17-ITBook.cjs').default; const lib = new Library(); lib.addBook(new ITBook('A', 100, 'X')); lib.addBook(new ITBook('B', 500, 'Y')); console.log(lib.getLargeBookTitles(250));"

Exercício 2: Calculadora de Investimento (Transformação de Dados)

Objetivo: Criar um método que calcule o valor total de mercado da livraria, considerando que cada página de um livro de TI custa R$ 0,50.

Passo a Passo:

 - Crie um método chamado calculateMarketValue(pricePerPage).

 - Use o método calculateTotalPages() que já criamos para obter o total de páginas.

 - Multiplique esse total pelo parâmetro pricePerPage.

 - Retorne o valor formatado.

 - Teste no Terminal:

Bash

node -e "const Library = require('./lib/18-Library.cjs').default; const ITBook = require('./lib/17-ITBook.cjs').default; const lib = new Library(); lib.addBook(new ITBook('React', 300, 'Web')); console.log('Valor Total: R$', lib.calculateMarketValue(0.50));"
Checkpoint Final do Capítulo 2:

# Ao concluir este capítulo e os exercícios, você dominou o CRUD (Create, Read, Update, Delete) de forma funcional e entendeu como classes interagem entre si para formar sistemas complexos.

## Como enviar para o GitHub:

Bash

git add 18-Library.js ebook_js.md package.json
git commit -m "docs: finaliza capítulo 2 - Gestão de Coleções e Arrays"
git push origin main

# Pronto para o Capítulo 3? Nele, vamos aprender sobre Programação Assíncrona (Promises e Async/Await) para simular o carregamento de livros de uma API externa!

## Vamos validar se a sua "estante digital" está funcionando com todos os métodos de array que implementamos.

1. Preparação do Teste

Certifique-se de que o seu package.json está configurado para o teste do Capítulo 2. O comando deve ser este:

JSON

"test-cap2": "npm run build && node -e \"const Library = require('./lib/18-Library.cjs').default; const ITBook = require('./lib/17-ITBook.cjs').default; const lib = new Library(); lib.addBook(new ITBook('React', 300, 'Web')); lib.addBook(new ITBook('Node.js', 450, 'Backend')); lib.addBook(new ITBook('Docker', 100, 'DevOps')); console.log('\\n--- RELATÓRIO DA BIBLIOTECA ---'); console.log('Livros no Inventário:', lib.getInventory()); console.log('Total de páginas no acervo:', lib.calculateTotalPages()); const devops = lib.filterByTech('DevOps'); console.log('Livros de DevOps encontrados:', devops.length);\""

2. Rodando o Comando
No seu terminal, digite:

Bash

npm run test-cap2

O que observar no resultado:

 - Se tudo estiver correto, o terminal deve mostrar:

 - A Compilação: O Babel confirmando que compilou os arquivos (incluindo o novo 18-Library.js).

 - O Inventário: Uma lista (Array) apenas com os nomes: ['React', 'Node.js', 'Docker'].

 - A Soma: O valor 850 (300 + 450 + 100).

 - O Filtro: A confirmação de que encontrou 1 livro de DevOps.

Se algo der errado (Dicas de Debug):

Erro de "Cannot find module": Verifique se o seu comando de build no package.json inclui o 18-Library.js.

Erro "is not a constructor": Verifique se você colocou o .default no final do require dentro do comando de teste.

Assim que o resultado aparecer no seu terminal, me envie o que apareceu! Se estiver tudo certinho, daremos o "visto" no Capítulo 2 e abriremos as portas para o Capítulo 3: Assincronismo e APIs.

## O Capítulo 2 está oficialmente concluído e funcionando perfeitamente.

 - O log mostra que a sua classe Library foi capaz de:

 - Instanciar objetos de diferentes tipos.

 - Armazenar esses objetos em um array interno.

 - Processar o array para extrair os títulos (map).

 - Acumular valores para somar as páginas (reduce).

# Exercícios Finais do Capítulo 2 (Passo a Passo)

Como prometido, aqui estão dois exercícios para você consolidar a lógica de manipulação de dados antes de subirmos tudo para o GitHub.

Exercício 1: Criando um Filtro de Segurança

Objetivo: Adicionar um método que retorne apenas livros de uma categoria específica, para evitar que o usuário veja o acervo inteiro se não precisar.

No arquivo 18-Library.js, adicione este método antes da última chave }:

JavaScript

getBooksByTechnology(tech) {
    return this.books.filter(book => book.technology === tech);
}
O teste: No terminal, execute este comando rápido:

Bash

node -e "const Library = require('./lib/18-Library.cjs').default; const ITBook = require('./lib/17-ITBook.cjs').default; const lib = new Library(); lib.addBook(new ITBook('React', 300, 'Web')); console.log('Resultado do Filtro:', lib.getBooksByTechnology('Web'));"

Exercício 2: Calculadora de Valor do Acervo

Objetivo: Praticar o uso de parâmetros em métodos que processam coleções. Vamos calcular o valor da biblioteca baseado em um preço por página.

No arquivo 18-Library.js, adicione:

JavaScript

calculateMarketValue(pricePerPage) {
    const totalPages = this.calculateTotalPages();
    return (totalPages * pricePerPage).toFixed(2);
}
O teste: No terminal, execute:

Bash

node -e "const Library = require('./lib/18-Library.cjs').default; const ITBook = require('./lib/17-ITBook.cjs').default; const lib = new Library(); lib.addBook(new ITBook('JS', 200, 'TI')); console.log('Valor de Mercado: R$', lib.calculateMarketValue(0.50));"

# Próximo Passo: GitHub e Capítulo 3

Agora que o código está estável e testado, vamos registrar esse progresso:

Envie para o GitHub:

Bash

git add .
git commit -m "feat: implementa Library com métodos funcionais e conclui Cap 2"
git push origin main

##  Capítulo 3: Assincronismo - Promises e Async/Await

Na vida real, os dados não aparecem instantaneamente. Eles vêm de APIs, bancos de dados ou arquivos externos que levam tempo para responder. Se o JavaScript ficasse parado esperando, a aplicação travaria.

1. O Conceito: A "Promessa" (Promise)

Imagine que você pede um livro raro. A livraria não o tem na hora, mas te dá um "pager":

 - Pendente: O livro está sendo buscado.

 - Resolvida: O livro chegou (Sucesso).

 - Rejeitada: O livro está esgotado (Erro).

2. Mão na Massa: Simulando uma API

Vamos criar o arquivo 19-ApiService.js. Ele vai simular um servidor que demora 2 segundos para nos entregar os dados de um livro.

Crie o arquivo 19-ApiService.js:

JavaScript

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
3. Consumindo com Async/Await

O Async/Await é a forma mais elegante de lidar com Promises. Ele faz o código parecer sequencial, mesmo sendo assíncrono.

Atualize o seu package.json para o teste do Capítulo 3:

JSON

"test-cap3": "npm run build && node -e \"const Api = require('./lib/19-ApiService.cjs').default; async function run() { console.log('--- INÍCIO DA REQUISIÇÃO ---'); try { const data = await Api.fetchBookData('JavaScript Moderno'); console.log('Dados Recebidos:', data); } catch (err) { console.error(err); } console.log('--- FIM (O código não travou!) ---'); } run();\""
(Lembre-se de adicionar o 19-ApiService.js ao comando de build no seu package.json!)

4. Por que isso é vital para o seu Ebook?

Nesta seção, o leitor aprenderá que:

Não bloqueamos a Thread principal: Enquanto o setTimeout espera, o computador poderia fazer outras coisas.

Tratamento de Erros: O bloco try/catch é essencial para quando a internet cai ou a API falha.

# Próximo Passo:

Adicione o 19-ApiService.js ao seu comando de build no package.json.

Crie o arquivo 19-ApiService.js com o código acima.

Execute: npm run test-cap3

Quando você rodar, notará uma pausa de 2 segundos antes de os dados aparecerem. Esse "silêncio" é o assincronismo em ação! Conseguiu configurar? Se sim, me envie o resultado do terminal para avançarmos para o próximo nível: Múltiplas requisições simultâneas!

## Exercício 1: Tratamento de Erros (Simulando uma Falha)

Objetivo: Mostrar ao leitor que o seu código é resiliente e não "quebra" quando algo dá errado (ex: servidor fora do ar).

Abra o arquivo 19-ApiService.js.

Mude a linha const found = true; para const found = false;.

Salve o arquivo e rode: npm run test-cap3.

O que observar: O terminal não mostrará os dados, mas sim a mensagem de erro que definimos no reject. O mais importante é que a frase --- FIM (O código não travou!) --- continuará aparecendo, provando que o try/catch protegeu sua aplicação.

Exercício 2: Alta Performance com Promise.all

Objetivo: Aprender a buscar múltiplos dados simultaneamente. Em vez de esperar 2s para um livro e +2s para outro (total 4s), vamos buscar ambos nos mesmos 2 segundos.

No terminal, execute este comando especial (copie e cole todo ele):

Bash

node -e "const Api = require('./lib/19-ApiService.cjs').default; async function multi() { console.log('--- BUSCA DUPLA INICIADA ---'); const t1 = Date.now(); try { const [livro1, livro2] = await Promise.all([ Api.fetchBookData('React Avançado'), Api.fetchBookData('Node Expert') ]); console.log('Recebidos:', livro1.title, 'e', livro2.title); const total = (Date.now() - t1) / 1000; console.log('Tempo total:', total, 'segundos'); } catch (e) { console.error(e); } } multi();"

O que observar: O terminal buscará dois livros, mas o tempo total será próximo de 2 segundos e não 4. Isso é o que chamamos de paralelismo assíncrono.

Conclusão do Capítulo 3

# Agora você domina:

 - Promises: O contrato de que algo será entregue no futuro.

 - Async/Await: A sintaxe moderna e limpa para ler código assíncrono.

 - Promise.all: Como otimizar o tempo de resposta da sua aplicação.

Gostaria de subir esse progresso para o GitHub antes de passarmos para o Capítulo 4 (Onde vamos aprender sobre Módulos e Organização de Pastas)? Se sim, aqui estão os comandos:

Bash

git add 19-ApiService.js ebook_js.md package.json
git commit -m "feat: implementa ApiService com Promises e Async/Await"
git push origin main

Pronto para o próximo passo? No Capítulo 4, vamos organizar tudo isso para que o seu código pareça um projeto profissional de larga escala!

## 🧐 O que aconteceu nos bastidores?

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

luis@luis-torres:~/testa_aplicativos/ebook-js-project$ ls lib
17-Book.d.ts  17-Book.js  17-ITBook.d.ts  17-ITBook.js  18-Library.d.ts  18-Library.js  19-ApiService.d.ts  19-ApiService.js  index.d.ts  index.js

luis@luis-torres:~/testa_aplicativos/ebook-js-project$ node lib/index.js
=== SISTEMA EBOOK (MIGRAÇÃO TYPESCRIPT CONCLUÍDA) ===

[API TS] Buscando dados de "TypeScript Avançado"...
[TS] Adicionado ao inventário: TypeScript Avançado

✅ Execução bem-sucedida!
Inventário Atual: [ 'TypeScript Avançado' ]

[Sistema] Sessão encerrada.

++++++++++++++++++++++++++++=++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Agora que o sistema rodou, repare nos arquivos .d.ts que o ls lib mostrou. Eles são o "mapa" do seu código. Se você decidir criar um segundo projeto e importar sua biblioteca de livros, o VS Code lerá esses arquivos .d.ts para te dar o autocompletar exato, sem você precisar abrir o código-fonte.

💡 Dicas para o seu novo fluxo de trabalho
A partir de agora, sempre que você alterar algo no código (src/*.ts), o fluxo será:

Codar na pasta src.

Compilar: npx tsc (isso valida se você cometeu algum erro de lógica ou tipo).

Executar: node lib/index.js.

🏆 Desafio de "Batismo" no TypeScript

 - Para testar se o TypeScript está realmente te protegendo, tente fazer um pequeno teste de erro:

 - Abra o src/index.ts.

 - No comando new ITBook(...), tente mudar o número de páginas para uma string, por exemplo: "500" (com aspas).

 - Salve e rode npx tsc.

Você verá que o TypeScript recusará a compilar, avisando que você está tentando colocar um texto onde o sistema espera um número. Isso evita que erros bobos cheguem ao usuário final!

💾 Salvando o Progresso
Como essa foi uma grande mudança de arquitetura, não esqueça de registrar:

Bash

git add .
git commit -m "chore: migração completa para TypeScript concluída com sucesso"
git push origin main

Parabéns pela persistência, Luís! O ambiente está pronto. Qual o próximo passo? Queremos explorar o Capítulo 6 (Testes com Jest) ou quer que eu te mostre como usar Interfaces para deixar sua API ainda mais robusta?

## 