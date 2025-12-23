// @ts-check

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

 - Ao executar npm run test-it, o fluxo é:

 - O comando super(title, pages) no ITBook envia os dados para o Book.

 - Se enviarmos -5, o Setter bloqueia e exibe erro.

 - Ao chamar it.printTitle(), o JavaScript usa a versão da classe filha (Polimorfismo).

- Resultado esperado no console:

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

 - Antigamente, usávamos o laço for para tudo. Hoje, esses métodos são o padrão da indústria porque:

 - São Declarativos: Você diz o que quer, não como fazer.

 - Menos Bugs: Evitam erros comuns de contagem em índices de arrays.

 - Imutabilidade: Eles geralmente retornam um novo array em vez de modificar o original (o que é ótimo para segurança de dados).

4. Preparando o Teste Prático

 - Vamos ver essa livraria funcionando com diferentes tipos de livros que criamos no Capítulo 1.

 - Atualize o seu package.json para o teste do Capítulo 2:

JSON

"test-cap2": "npm run build && node -e \"const Library = require('./lib/18-Library.cjs').default; const ITBook = require('./lib/17-ITBook.cjs').default; const lib = new Library(); lib.addBook(new ITBook('React', 300, 'Web')); lib.addBook(new ITBook('Node', 450, 'Backend')); lib.addBook(new ITBook('Python', 150, 'Data Science')); console.log('\\nInventário:', lib.getInventory()); console.log('Total de páginas no acervo:', lib.getTotalPages());\""
(Não esqueça de adicionar 18-Library.js ao comando de build no package.json!)

O que vamos praticar agora:

 - Composição: Uma classe (Library) que contém instâncias de outra classe (Book).

 - Lógica de Negócio: Como extrair relatórios (Total de páginas, lista de títulos) de um conjunto de dados.

 - Podemos seguir com a criação do arquivo 18-Library.js e rodar esse teste? Se estiver pronto, me avise para refinarmos a lógica de busca!

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

## Capítulo 4: Módulos, Organização e Clean Code

Até agora, usamos o Babel para traduzir nossos arquivos, mas na prática, um projeto profissional de JavaScript (seja no Node.js moderno ou no React/Vue) depende do sistema de ES Modules (import/export).

1. O Conceito: O Código como Legos

Imagine que cada arquivo seu é uma peça de Lego. O objetivo deste capítulo é aprender a conectar essas peças sem que uma precise saber "demais" sobre a outra.

O que o leitor aprenderá:

Encapsulamento Real: Como esconder lógica complexa e expor apenas o necessário.

Reutilização: Como usar a classe Book em múltiplos lugares sem repetir código.

2. Refatorando para a Modernidade

Como movemos tudo para a pasta src/, vamos garantir que as referências internas estejam corretas. No JavaScript, quando um arquivo usa outro, ele precisa do caminho exato.

Exemplo no 17-ITBook.js: Verifique se o topo do seu arquivo está assim:

JavaScript

import Book from './17-Book.js'; // O ponto indica "nesta mesma pasta"

export default class ITBook extends Book {
    // ... seu código
}

3. O Desafio do Capítulo 4: O arquivo index.js

Em projetos profissionais, existe um arquivo chamado "ponto de entrada" (entry point), geralmente chamado de index.js. Ele é o maestro que inicia toda a aplicação.

Crie o arquivo src/index.js:

JavaScript

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

4. Atualizando o seu pipeline (Package.json)

Agora que temos um index.js, nosso script de teste fica muito mais simples, pois ele só precisa rodar esse arquivo principal.

Atualize o package.json dentro de ebook-js-project:

JSON

"scripts": {
    "build": "babel src/*.js --out-dir lib && cd lib && cp *.js *.cjs",
    "start": "npm run build && node lib/index.cjs"
}

2 Exercícios Passo a Passo (Capítulo 4)

Exercício 1: Exportando Múltiplas Constantes

 - Objetivo: Aprender que não se exporta apenas classes, mas também configurações.

 - Crie um arquivo src/config.js.

 - Adicione: export const VERSION = '1.0.0'; export const API_TIMEOUT = 2000;

 - Tente importar a VERSION no seu index.js e imprimir no console: console.log('Versão do App:', VERSION);

Exercício 2: O "Barrel Export" (O Barril)

Objetivo: Facilitar a vida de quem usa suas classes.

Crie um arquivo src/main-lib.js.

Adicione:

JavaScript

export { default as Book } from './17-Book.js';
export { default as Library } from './18-Library.js';

Isso permite que qualquer pessoa importe tudo de um lugar só!

Conseguiu criar o src/index.js e rodar o npm start? Se o seu terminal mostrar o "Sistema de Livraria Profissional" funcionando a partir do novo arquivo, você terá concluído a transição para um desenvolvedor de nível pleno em organização de projetos!

Quer que eu te ajude a ajustar o comando de build para que o index.js também seja convertido corretamente?

## Exercícios Passo a Passo (Encerramento Cap. 4)

Exercício 1: Centralização de Logs

Objetivo: Criar um módulo utilitário para formatar as mensagens do console.

 - Crie src/utils.js.

 - Adicione: export const logger = (msg) => console.log(\[LOG]: ${msg}`);`

 - Importe no index.js: import { logger } from './utils.js';

 - Use: logger("Sistema iniciado com sucesso");

Exercício 2: Exportação Nomeada vs Default

Objetivo: Entender a diferença entre exportar uma classe inteira ou funções soltas.

No src/config.js, exporte uma constante: export const APP_NAME = "MyDigitalLibrary";

Tente importar usando chaves: import { APP_NAME } from './config.js';

O comando npm start funcionou com a nova estrutura? Se o sistema iniciou e mostrou o "Clean Code" no inventário, sua arquitetura modular está pronta para o mundo real! Qual o seu próximo passo: rodar o teste ou quer que eu revise algum arquivo de src?

## Você acaba de configurar um ambiente de desenvolvimento profissional que usa as tecnologias mais atuais do mercado (Babel + ES Modules).

 - O que você fez não foi apenas "rodar um script". Você construiu um pipeline de build:

 - Código-fonte (src/): Onde você escreve JavaScript moderno e elegante.

 - Transpilação (Babel): Onde o código é preparado para execução.

 - Distribuição (lib/): Onde o código final reside e é executado pelo Node.js.

# Resumo do Capítulo 4 para o seu ebook_js.md

Sugiro que você adicione esta seção ao seu arquivo para documentar o que aprendeu:

## Capítulo 4: A Arquitetura Profissional

Neste capítulo, evoluímos de arquivos soltos para uma estrutura de projeto real.

# O que aprendemos:

 - Separação de Preocupações: Criamos a pasta src/ para o código humano e lib/ para o código de execução.

 - ES Modules (ESM): Implementamos import e export, entendendo que o Node.js exige a extensão .js nas importações internas quando usamos "type": "module".

 - Build Pipeline: Usamos o Babel para garantir que nosso código seja processado corretamente antes de ir para produção.

 = Entry Point: Criamos o index.js, o arquivo "maestro" que coordena todas as classes e serviços.

# O Próximo Passo: Salvar no GitHub

Agora que tudo está funcionando perfeitamente, vamos enviar essa organização para o seu repositório:

Bash

# 1. Adicione as mudanças

git add .

# 2. Faça o commit da vitória

git commit -m "feat: conclui Cap 4 com estrutura profissional src/lib e ESM"

# 3. Envie para o GitHub

git push origin main

Você gostaria de avançar para o Capítulo 5 (Tratamento de Erros e Debugging) ou quer que eu te ajude a criar um arquivo README.md bonito para esse seu novo laboratório?

## Introdução ao TypeScript (TS): 

É o "manual de instruções e o controle de qualidade" que garante que você não use a ferramenta de forma errada.

O TypeScript não é uma linguagem nova do zero; ele é um superset (superconjunto) do JavaScript. Isso significa que todo código JS é um código TS válido, mas o TS adiciona uma camada de segurança que o JS não tem por padrão.

1. Verificação em Tempo de Compilação

No JavaScript, você só descobre que passou um "texto" onde deveria ser um "número" quando o sistema quebra na mão do usuário.

No TypeScript, o erro aparece enquanto você digita. O compilador (tsc) analisa o código e impede que você gere o arquivo final se houver erros de lógica de tipos.

2. Inferência de Tipo

O TS é inteligente. Você não precisa dizer o tipo de tudo.

TypeScriptlet 

let paginas = 100; // O TS infere (deduz) que 'paginas' é number.
// paginas = "cem"; // ❌ O TS apresentará um erro imediato aqui.

3. Interfaces: O Contrato do ObjetoAs Interfaces definem a "forma" que um objeto deve ter. Elas são excelentes para documentar suas classes de livros.

TypeScript

interface IBook {
  title: string;
  pages: number;
  category?: string; // O '?' indica que é opcional
}

const meuLivro: IBook = {
  title: "Clean Code",
  pages: 464
};

4. Generics: Flexibilidade com Segurança

Os Genéricos permitem criar componentes que funcionam com vários tipos, mas mantêm a verificação de tipo. É como uma "variável para tipos".

TypeScript

function envolverEmLista<T>(item: T): T[] {
  return [item];
}

const listaDeNumeros = envolverEmLista<number>(10); // Retorna number[]
const listaDeStrings = envolverEmLista<string>("JS"); // Retorna string[]

5. TS em Arquivos JS (checkJs)

Você não precisa converter todo o seu projeto para .ts de uma vez. O TypeScript pode vigiar seus arquivos .js atuais!

 - Como fazer no seu projeto:

 - Crie um arquivo chamado jsconfig.json ou tsconfig.json na raiz.

Adicione esta configuração:

JSON

{
  "compilerOptions": {
    "checkJs": true,
    "allowJs": true,
    "noEmit": true
  }
}

Agora, o VS Code ou seu editor começará a sublinhar erros de tipo nos seus arquivos .js baseando-se no que ele consegue inferir ou nos seus comentários JSDoc.

| **Funcionalidade** | **Vantagem para o desenvolvedor** |
| --- | --- |
| Autocompletar (IntelliSense) | O editor sugere exatamente os métodos e propriedades que uma classe ou objeto possui, eliminando a necessidade de "adivinhar" nomes de variáveis. |
| Refatoração Segura | Se você renomear uma propriedade no arquivo base (ex: 17-Book.js), o TS identifica e avisa instantaneamente todos os outros arquivos que dependiam daquele nome. |
| Documentação Viva | O código se torna autoexplicativo. Ao definir tipos, você documenta o que cada função espera receber e o que ela retorna, sem precisar de comentários manuais. |
| Detecção de Erros Precoce | Erros de lógica (como somar um número com undefined) são capturados durante a escrita (tempo de compilação), e não na mão do usuário. |
| Navegação de Código | Permite saltar diretamente para a definição de uma classe ou interface com um clique, facilitando o entendimento de projetos com muitos arquivos. |


Como isso se aplica ao nosso Cap. 5?

No Capítulo 5, falaremos de Tratamento de Erros. O TypeScript ajuda a evitar "erros bobos" (como passar undefined para uma função), permitindo que foquemos em erros complexos (como falhas de conexão de rede).

Gostaria que eu fizesse um exemplo rápido de como ficaria sua classe Book.js se fosse convertida para TypeScript (Book.ts)? Isso ajudaria a visualizar a diferença prática.

## 🛡️ Capítulo 5: Tratamento de Erros e Debugging Profissional

No JavaScript, o tratamento de erros gira em torno do bloco try...catch...finally e da criação de erros personalizados.

1. O Bloco Try-Catch-Finally

Este é o mecanismo básico para capturar exceções.

JavaScripttry 

{
   
    // Código que pode falhar (ex: uma divisão por zero ou chamada de API)
    const resultado = 10 / 0;
} catch (error) {
    // O que fazer se der erro
    console.error("Ocorreu um erro inesperado:", error.message);
} finally {
    // Código que executa SEMPRE (útil para fechar conexões ou limpar logs)
    console.log("Operação finalizada.");
}

2. Lançando Erros (Throw)Você pode (e deve) interromper o fluxo se uma regra de negócio for quebrada. Lembra das páginas negativas do Livro?

JavaScript

set pages(value) {
    if (value <= 0) {
        throw new Error("O número de páginas deve ser maior que zero!");
    }
    this._pages = value;
}

3. Criando Erros Customizados

Para projetos grandes, criar tipos específicos de erro ajuda no Debugging (identificar a causa raiz).

| **Tipo de Erro** | **Uso Sugerido** |
| --- | --- |
| ValidationError | Falha em regras de negócio (ex: preço negativo) |
| ApiError | Falha na comunicação com servidores externos |
| NotFoundError | Quando um livro buscado não existe no inventário |

🛠️ Desafio Prático: Refatorando o ApiService
Vamos aplicar isso no seu projeto. Atualmente, o 19-ApiService.js assume que a API sempre funciona. Vamos torná-lo resiliente.

# Siga estes passos:

 - Abra o arquivo src/19-ApiService.js.

 - Adicione um try...catch para lidar com falhas na "conexão".

 - Simule um erro se o nome do livro for vazio.

 - Como deve ficar o seu código:



JavaScript

// src/19-ApiService.js

class ApiService {
    static async fetchBookData(title) {
        try {
            console.log(`[API] Buscando dados de "${title}"...`);

            if (!title) {
                throw new Error("O título do livro é obrigatório para a busca.");
            }

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulando uma falha aleatória (30% de chance)
                    if (Math.random() < 0.3) {
                        reject(new Error("Falha na conexão com o servidor de livros."));
                    } else {
                        resolve({ title: title, pages: 500 });
                    }
                }, 2000);
            });
        } catch (error) {
            // Repassa o erro para quem chamou a função tratar
            throw error; 
        }
    }
}
export default ApiService;

Próximo PassoDepois de alterar o ApiService, precisamos ajustar o seu src/index.js para capturar esse erro e não deixar o Node travar.
Deseja que eu te mostre como fazer o index.js "sobreviver" a uma falha na API?

## 1. Refatorando o src/index.js para sobreviver a falhas

O objetivo aqui é tentar rodar o sistema, mas, se algo der errado (na API ou na validação de dados), o programa deve avisar o usuário e encerrar educadamente, em vez de "quebrar".

Abra seu src/index.js e atualize-o com esta estrutura:

javaScript

import Library from './18-Library.js';
import ITBook from './17-ITBook.js';
import ApiService from './19-ApiService.js';

async function main() {
    console.log("=== INICIANDO SISTEMA (CAP 5: TRATAMENTO DE ERROS) ===\n");

    const myLibrary = new Library();

    try {
        // Tentativa de buscar dados
        const bookData = await ApiService.fetchBookData("JavaScript Moderno");
        
        // Se a API falhar, o código abaixo nem será executado, ele pula direto para o catch
        const newBook = new ITBook(bookData.title, "Luís Torres", bookData.pages, "Tecnologia");
        myLibrary.addBook(newBook);

        console.log("\n✅ Processo finalizado com sucesso!");
        console.log(`Inventário:`, myLibrary.inventory);

    } catch (error) {
        // Aqui tratamos o erro de forma elegante
        console.error("\n❌ OPS! OCORREU UM ERRO NO SISTEMA:");
        console.error(`> Motivo: ${error.message}`);
        
        if (error.message.includes("conexão")) {
            console.log("> Dica: Verifique sua internet e tente novamente.");
        }
    } finally {
        // Isso executa independente de erro ou sucesso
        console.log("\n[Log de Auditoria] Sessão encerrada.");
    }
}

main();

| **Elemento** | **O que faz no Capítulo 5** |
| --- | --- |
| try | Monitora o bloco de código. Se o ApiService disparar um reject (erro), o JS para imediatamente. |
| catch (error) | Captura o objeto de erro. Aqui você pode enviar o erro para um banco de dados de logs ou mostrar um aviso amigável. |
| finally | Perfeito para "limpar a mesa". Em apps reais, é usado para esconder ícones de carregamento (spinners) ou fechar conexões. |

3. Testando a Resiliência

Como colocamos o Math.random() < 0.3 no ApiService, sua tarefa agora é rodar o sistema algumas vezes:

Bash

npx babel src/*.js --out-dir lib && node lib/index.js

 - Cenário A (Sucesso): O sistema mostrará o livro adicionado.

 - Cenário B (Erro): O sistema mostrará a mensagem amigável: ❌ OPS! OCORREU UM ERRO NO SISTEMA.

Desafio de Debugging (Opcional):

Tente forçar um erro de validação enviando um título vazio no fetchBookData("") e veja como o seu catch reage de forma diferente.

Conseguiu ver os dois cenários (sucesso e erro) no seu terminal? Se sim, você acaba de implementar o primeiro nível de Fault Tolerance (Tolerância a Falhas) do seu sistema!

## Para o comando funcionar, você precisa primeiro entrar na pasta do projeto.

1. Volte para a pasta do projeto

Bash

cd ebook-js-project

2. Execute o comando de build e execução

Bash

npx babel src/*.js --out-dir lib && node lib/index.js

🔍 O que observar no Capítulo 5

 _ Como você adicionou a lógica de erro aleatório (Math.random()), execute o comando acima umas 3 ou 4 vezes.

 - Você verá o comportamento profissional do sistema:

 - Na sorte: O sistema exibe o livro e o total de páginas.

 - No azar: O sistema exibe a mensagem amigável ❌ OPS! OCORREU UM ERRO NO SISTEMA em vez de travar o terminal com um erro vermelho gigante.

📖 Resumo para o seu ebook_js.md

Enquanto o sistema roda, você já pode documentar o aprendizado deste capítulo:

| **Conceito** | **Descrição** |
| --- | --- |
| Resiliência | Capacidade do sistema de continuar funcionando (ou encerrar com dignidade) após uma falha. |
| Controle de Exceções | Uso de try/catch para capturar erros assíncronos de APIs externas. |
| Feedback ao Usuário | Transformar erros técnicos (stack traces) em mensagens compreensíveis. |

## luis@luis-torres:~/testa_aplicativos/ebook-js-project$ npx babel src/*.js --out-dir lib && node lib/index.js

Successfully compiled 6 files with Babel (248ms).
=== INICIANDO SISTEMA (CAP 5: TRATAMENTO DE ERROS) ===

[API] Buscando dados de "JavaScript Moderno" nos servidores...

❌ ERRO CAPTURADO NO SISTEMA:
> Motivo: O número de páginas deve ser positivo!

[Log de Auditoria] Sessão encerrada.

# PERFEITO! Esse é o comportamento de um software de alta qualidade.

Veja o que você conquistou com essa execução:

 - Integridade: O sistema detectou que os dados da API (ou do objeto) estavam inválidos.

 - Segurança: Ele interrompeu o processo antes de adicionar um livro com erro à biblioteca.

 - Experiência do Usuário (UX): Em vez de um erro técnico incompreensível, você entregou uma mensagem clara: > Motivo: O número de páginas deve ser positivo!.

 - Finalização Limpa: O bloco finally garantiu que o "Log de Auditoria" fosse registrado, mesmo com a falha.

🏆 Conclusão do Capítulo 5

Você agora domina o ciclo completo de desenvolvimento em JavaScript Moderno:

 - POO: Classes, Herança e Encapsulamento.

 - Assincronismo: Promises e Async/Await.

 - Arquitetura: Separação entre src e lib com Babel.

 - Resiliência: Tratamento de exceções com try/catch/throw.

 | **Conceito Chave** | **Resultado Prático** |
| --- | --- |
| throw new Error | Interrompe o fluxo assim que algo errado é detectado. |
| catch | Centraliza a gestão de crises e erros do sistema. |
| finally | Garante o encerramento de processos (logs, conexões, loaders). |

💾 Hora de Salvar sua Evolução

Vamos registrar esse marco no Git:

Bash

# 1. Adiciona as correções do Book.js e index.js
git add .

# 2. Commit do capítulo 5
git commit -m "feat: implementa tratamento de erros profissional (Cap 5)"

# 3. Sobe para o GitHub
git push origin main

🏁 O que vem a seguir?

O seu laboratório básico está concluído e funcional! Agora temos dois caminhos possíveis para o seu aprendizado:

Explorar o Capítulo 6 (Testes Unitários com Jest): Aprender a criar testes automáticos para garantir que ninguém quebre seu código no futuro.

Migração para TypeScript: Transformar esse projeto em .ts para ganhar aquele "Autocompletar" e "Verificação de Tipos" que discutimos na tabela anterior.

## 🏗️ Preparando o Ambiente para TypeScript

O TypeScript não roda nativamente no Node.js; ele precisa ser "compilado" (ou transpilado) para JavaScript, assim como fazíamos com o Babel.

1. Instalação das Dependências

No seu terminal, dentro da pasta ebook-js-project, instale o TypeScript e os tipos para o Node:

Bash

npm install --save-dev typescript @types/node

2. Inicializando o Configurador (tsconfig.json)

O tsconfig.json é o coração do projeto TS. Ele diz ao compilador como se comportar. Gere o arquivo padrão com:

Bash

npx tsc --init

📝 O Primeiro Arquivo: 17-Book.ts

Vamos renomear e converter seu primeiro arquivo. Ação: Mude o nome de src/17-Book.js para src/17-Book.ts.

Agora, veja como o código ganha "superpoderes" com as anotações de tipo:

TypeScript

// src/17-Book.ts
export default class Book {
    // No TS, declaramos o tipo das propriedades no topo
    private _pages: number = 0; 
    public title: string;

    constructor(title: string, pages: number) {
        this.title = title;
        this.pages = pages; // O setter será chamado
    }

    get pages(): number { 
        return this._pages; 
    }

    set pages(value: number) {
        if (value > 0) {
            this._pages = value;
        } else {
            throw new Error("O número de páginas deve ser positivo!");
        }
    }

    printTitle(): void {
        console.log(`Título: ${this.title}`);
    }

    static isValid(bookObj: { title: string; pages: number }): boolean {
        return typeof bookObj.title === 'string' && bookObj.pages > 0;
    }
}

## Para realizar o teste de erro que você quer, vamos modificar o código propositalmente. O objetivo aqui é ver o TypeScript impedindo a compilação.

# Aequivo scr/index.ts ---> Antes de fazer o teste.

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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
            "Luís Torres", bookData.pages,
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

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


Aqui está o arquivo src/index.ts alterado para gerar o erro de tipo (trocando o número de páginas pela string "500"):

TypeScript

// src/index.ts
import Library from './18-Library.js';
import ITBook from './17-ITBook.js';
import ApiService from './19-ApiService.js';

async function main() {
    console.log("=== SISTEMA EBOOK (TESTANDO ERRO DE TIPAGEM) ===\n");

    const myLibrary = new Library<ITBook>();

    try {
        const bookData = await ApiService.fetchBookData("TypeScript Avançado");
        
        // 🚨 TESTE DE ERRO AQUI:
        // Trocamos 'bookData.pages' (number) por "500" (string)
        // E removemos o argumento duplicado que estava antes.
        const newBook = new ITBook(
            bookData.title, 
            "Luís Torres", 
            "500", // <--- O TS VAI RECLAMAR DISSO! Esperado: number, Recebido: string.
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


🛠️ Como realizar o teste:

Salve o arquivo acima como src/index.ts.

No terminal, tente compilar:

Bash

npx tsc

🛑 O resultado esperado:

O TypeScript não vai deixar passar. Você verá um erro vermelho no terminal parecido com este:

src/index.ts:16:13 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

💡 Por que isso é incrível?

Repare que você nem chegou a rodar o programa com o Node. O erro foi pego antes do código ser executado. No JavaScript puro, o programa rodaria, criaria um livro com páginas do tipo "texto" e você só descobriria o problema muito tempo depois, talvez quando tentasse somar o total de páginas e o resultado desse algo como NaN ou 0500.

Conseguiu ver a mensagem de erro no terminal ao rodar o npx tsc? Se sim, agora você pode corrigir o código removendo as aspas do 500 (ou voltando para bookData.pages) e rodar o npx tsc novamente para ver o erro sumir e o arquivo lib/index.js ser finalmente atualizado! Gostaria que eu te ajudasse a criar uma Interface agora para definir melhor os dados da sua biblioteca?

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

luis@luis-torres:~/testa_aplicativos/ebook-js-project$ npx tsc
src/index.ts:20:13 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

20             "500", // <--- O TS VAI RECLAMAR DISSO! Esperado: number, Recebido: string.
               ~~~~~

Found 1 error in src/index.ts:20

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


## O silêncio do terminal após o npx tsc é o melhor som que um desenvolvedor TypeScript pode ouvir! 🚀

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

luis@luis-torres:~/testa_aplicativos/ebook-js-project$ npx tsc
luis@luis-torres:~/testa_aplicativos/ebook-js-project$ 

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Isso significa que:

 - Seu código está logicamente consistente.

 - Todos os tipos de dados batem (strings com strings, números com números).

 - As importações entre os arquivos estão funcionando perfeitamente.

 - A pasta lib/ foi atualizada com o JavaScript seguro.

O que você construiu até agora?

 - Você saiu de um conjunto de scripts soltos em JavaScript para um sistema robusto que utiliza:

 - Classes e Herança: ITBook herdando de Book.

 - Encapsulamento: Uso de private e get/set para proteger os dados.

 - Generics: Uma classe Library<T> que pode aceitar qualquer tipo de item, mas que você restringiu para aceitar apenas livros.
 
 - Interfaces: Contratos que garantem que a resposta da sua API não venha quebrada.

 - Módulos ESM: Uso de import/export seguindo os padrões modernos do Node.js.

Próximo Passo Sugerido: Interfaces de Domínio

Agora que a fundação está sólida, o próximo passo natural é parar de usar strings simples para dados complexos. Por exemplo, um Autor não é apenas um nome; ele pode ter um país, uma bio ou um e-mail.

Podemos criar uma interface para o autor e aplicá-la ao construtor do livro.

Gostaria que eu te mostrasse como criar o arquivo src/interfaces/IAuthor.ts para deixar o campo "author" do seu livro muito mais rico em informações? Isso vai te ensinar como organizar pastas dentro de um projeto TypeScript maior.

## Ao usar Interfaces, você para de tratar dados como simples "textos" e passa a tratá-los como Objetos Estruturados. Isso é o que separa um código iniciante de um código profissional.

Vamos criar uma estrutura onde um Autor é um objeto real.

1. Criando a Interface do Autor

Crie um novo arquivo chamado src/IAuthor.ts:

TypeScript

// src/IAuthor.ts
export interface IAuthor {
    name: string;
    email: string;
    bio?: string; // O '?' indica que a bio é opcional
}

2. Atualizando o src/17-Book.ts

Agora, vamos dizer ao Livro que o autor não é mais apenas uma string, mas sim um objeto que segue a interface IAuthor.

TypeScript

// src/17-Book.ts
import { IAuthor } from './IAuthor.js';

export default class Book {
    public title: string;
    public author: IAuthor; // Mudança aqui!
    private _pages: number = 0;

    constructor(title: string, author: IAuthor, pages: number) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
    // ... (manter getters e setters de pages)
}

3. Ajustando o src/17-ITBook.ts

O ITBook também precisa ser atualizado para repassar o objeto de autor para o pai (super).

TypeScript

// src/17-ITBook.ts
import Book from './17-Book.js';
import { IAuthor } from './IAuthor.js';

export default class ITBook extends Book {
    public category: string;

    constructor(title: string, author: IAuthor, pages: number, category: string) {
        super(title, author, pages);
        this.category = category;
    }
    // ...
}

4. Como fica o seu src/index.ts agora?

Agora, se você tentar passar apenas "Luís Torres", o TypeScript vai dar erro! Você precisa passar o objeto completo.

TypeScript

// No seu src/index.ts, dentro do try:

const authorLuis: IAuthor = {
    name: "Luís Torres",
    email: "luis@exemplo.com",
    bio: "Desenvolvedor e entusiasta de TypeScript"
};

const newBook = new ITBook(
    bookData.title, 
    authorLuis, // Passando o objeto completo
    bookData.pages, 
    "Tecnologia"
);

Por que isso é melhor?

 - Consistência: Você garante que todo autor no sistema tenha um e-mail válido para contato.
 
 - Navegação: No seu editor, ao digitar newBook.author., ele vai te sugerir automaticamente name, email e bio.

 - Escalabilidade: Se amanhã você precisar adicionar a "Foto do Autor", você muda apenas na Interface e o TypeScript te mostrará todos os lugares onde você esqueceu de colocar a foto.

🚀 Desafio

Tente criar esses arquivos e atualizar as classes. Depois, rode o comando:

Bash

npx tsc && node lib/index.js

Quer que eu te envie o código completo de algum desses arquivos para garantir que não falte nenhum detalhe na importação?

## luis@luis-torres:~/testa_aplicativos/ebook-js-project$ npx tsc && node lib/index.js
=== SISTEMA EBOOK (TS: COM INTERFACE DE AUTOR) ===

[API TS] Buscando dados de "TypeScript Avançado"...
[TS] Adicionado ao inventário: TypeScript Avançado

✅ Execução bem-sucedida!
Livro: TypeScript Avançado | Autor: Luís Torres
Inventário Atual: [ 'TypeScript Avançado' ]

[Sistema] Sessão encerrada.

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

## Agora sim o sistema está 100% sincronizado.

O terminal limpo e a execução sem erros confirmam que você dominou a base do TypeScript: Herança, Interfaces, Generics e Mapeamento de Módulos.

O que você alcançou com essa estrutura?
Segurança de Dados: Se você tentar criar um autor sem e-mail, o sistema não compila.

Abstração: O index.ts não precisa saber como o Book valida as páginas; ele apenas confia na classe.

Extensibilidade: Se você quiser criar uma classe CookingBook amanhã, basta herdar de Book e o autor já virá configurado corretamente.

🌟 Sugestão de Próximo Passo: Enums

Atualmente, a sua categoria no ITBook é uma string livre: "Tecnologia". No mundo real, isso pode ser perigoso (alguém pode escrever "tec" ou "Technology" e quebrar filtros de busca).

Podemos usar um Enum para restringir isso. Assim, o TypeScript só aceitaria categorias pré-definidas.

## Estudo Detalhado: Estruturas de Dados com Arrays em JavaScript

1. Introdução

Arrays são coleções ordenadas de dados. No JavaScript, eles são dinâmicos (podem crescer ou diminuir) e podem armazenar diferentes tipos de dados na mesma estrutura.

Declaração e Inicialização

Existem duas formas principais de criar um array:

Literal (Recomendado): let daysOfWeek = [];

Construtor: let daysOfWeek = new Array(7);

2. Acesso e Modificação Manual

O acesso é feito através de índices numéricos que começam em 0.

const averageTemp = [];
averageTemp[0] = 31.9;
averageTemp[1] = 35.3;
averageTemp[2] = 42.4;

O Erro Comum: Redeclaração

Ao usar let ou const, você não pode declarar a mesma variável duas vezes no mesmo escopo:

Erro: let x = []; let x = [1]; -> Uncaught SyntaxError: Identifier 'x' has already been declared.

Correção: Apenas atribua o novo valor: x = [1];.

3. Iteração (Loops)

Para percorrer um array, utilizamos o comprimento da estrutura (length).

JavaScript

for (let i = 0; i < daysOfWeekn.length; i++) {
  console.log(daysOfWeekn[i]);
}

Exemplo Prático: Sequência de Fibonacci

# A lógica de Fibonacci em arrays demonstra como usar índices para cálculos baseados em elementos anteriores:

JavaScript

const fibonacci = [];
fibonacci[1] = 1;
fibonacci[2] = 1;

for (let i = 3; i < 20; i++) {
  fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
}
4. Manipulação de Elementos (Métodos Nativos)

Inserção e Remoção (Final e Início)

 **Método** | **Descrição** | **Exemplo** |
| --- | --- | --- |
| .push() | Adiciona ao final. | numbers.push(10); |
| .pop() | Remove do final (e retorna o elemento). | let ultimo = numbers.pop(); |
| .unshift() | Adiciona ao início. | numbers.unshift(-1); |
| .shift() | Remove do início. | numbers.shift(); |

# O "Canivete Suíço": .splice()

 - Permite adicionar, remover ou substituir elementos em qualquer posição.

 - Sintaxe: array.splice(índice, qtde_deletar, itens_adicionar...)

Exemplo: numbers.splice(5, 0, 15, 25, 35); (Insere 15, 25 e 35 a partir do índice 5, sem deletar nada).

5. Entendendo a Lógica Interna (Algoritmos de Deslocamento)

Você explorou como os métodos nativos funcionam "por baixo dos panos".

 - Inserindo na Primeira Posição (Manualmente)
 - Para inserir no início sem unshift, é preciso mover todos os itens uma casa para a direita:

 JavaScript

Array.prototype.insertFirstPosition = function(value) {
  for (let i = this.length; i >= 0; i--) {
    this[i] = this[i - 1]; // Move o item para a direita
  }
  this[0] = value; // Preenche a primeira casa
};

Removendo da Primeira Posição (O problema do undefined)

Ao mover itens para a esquerda manualmente, o último índice fica vazio:

JavaScript

for (let i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i + 1];
}
// Resultado: O último item se torna 'undefined' porque não há nada após ele.

# 6. Extras Sugeridos para seu eBook

Métodos Modernos de Iteração (ES6+)

Além do for clássico, o JavaScript moderno oferece formas mais elegantes:

 - .forEach(): Apenas percorre.

JavaScript

numbers.forEach(n => console.log(n));

 - .map(): Cria um novo array transformado.

JavaScript

const dobro = numbers.map(n => n * 2);

 - .filter(): Cria um novo array apenas com itens que passam em um teste.

JavaScript

// Útil para remover o 'undefined' que sobrou nos seus testes:
const limpo = numbers.filter(n => n !== undefined);

# Arrays Multidimensionais (Matrizes)

Imagine um array dentro de outro para representar coordenadas ou planilhas:

JavaScript

let matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
console.log(matriz[1][1]); // Acessa o número 5

# 1. Adiciona as correções do Book.js e index.js
git add .

# 2. Commit do capítulo 5
git commit -m "Acrescentado Estruturas de Dados com Arrays em JavaScript"

# 3. Sobe para o GitHub
git push origin main

# Dica para o eBook: Use blocos de código com cores (como os acima) e sempre mostre o estado do array antes e depois de cada operação para facilitar o aprendizado visual.

## Capítulo: Manipulação Avançada de Arrays

1. Arrays Bidimensionais e Multidimensionais (Matrizes)

Arrays bidimensionais são, essencialmente, "arrays de arrays". Imagine uma planilha de Excel ou um tabuleiro de xadrez.

Exemplo: Tabela de Temperaturas Semanais

JavaScript

let averageTemp = [
  [72, 75, 79, 79, 81, 81], // Semana 1
  [81, 79, 75, 75, 73, 72]  // Semana 2
];

// Acessando o valor da primeira semana, segundo dia:
console.log(averageTemp[0][1]); // 75

2. Juntando Arrays: concat

O método concat é usado para mesclar dois ou mais arrays. Ele não altera os arrays originais, mas retorna um novo.

JavaScript

const zero = 0;
const positiveNumbers = [1, 2, 3];
const negativeNumbers = [-3, -2, -1];

let numbers = negativeNumbers.concat(zero, positiveNumbers);
// Resultado: [-3, -2, -1, 0, 1, 2, 3]

3. Funções de Iteração (Os Métodos de Ordem Superior)

O JavaScript moderno oferece métodos poderosos que substituem o clássico loop for.

# Guia de Referência de Métodos de Array

Aqui está a tabela mestre para o seu estudo, organizada por funcionalidade:

Tabela Comparativa de Métodos
 **Método** | **Propósito** | **Retorno** |
| --- | --- | --- |
| every | Verifica se todos os itens satisfazem uma condição. | Boolean (true/false) |
| some | Verifica se pelo menos um item satisfaz uma condição. | Boolean (true/false) |
| forEach | Executa uma função para cada elemento. | undefined |
| map | Transforma cada elemento e cria um novo array. | Novo Array |
| filter | Cria um novo array com itens que passaram no teste. | Novo Array |
| reduce | Reduz o array a um único valor (acumulador). | Um único valor |
| join | Une todos os elementos em uma String, com um separador. | String |
| indexOf | Retorna o primeiro índice onde um elemento é encontrado. | Número (-1 se não existir) |
| lastIndexOf | Retorna o último índice onde um elemento é encontrado. | Número (-1 se não existir) |
| reverse | Inverte a ordem dos elementos no array. | O array invertido |
| slice | Extrai uma parte do array sem modificar o original. | Novo Array |
| sort | Ordena os elementos (cuidado: converte para string por padrão). | O array ordenado |
| toString | Converte o array em uma string separada por vírgulas. | String |
| valueOf | Retorna o valor primitivo do array (geralmente ele mesmo). | O próprio Array |

Exemplos Detalhados

1. every e some

JavaScript

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Todos são pares?
const isEven = x => x % 2 === 0;
console.log(numbers.every(isEven)); // false

// Pelo menos um é par?
console.log(numbers.some(isEven)); // true

2. forEach

Ideal para quando você quer apenas "fazer algo" com cada item (como salvar no banco ou imprimir), sem gerar um novo array.

JavaScript

numbers.forEach(x => console.log(x % 2 === 0 ? `${x} é par` : `${x} é ímpar`));

3. map (O Transformador)

Imagine que você quer dobrar todos os valores.

JavaScript

const doubleNumbers = numbers.map(x => x * 2);
// [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

4. filter (O Selecionador)

Filtra apenas os números maiores que 5.

JavaScript

const biggerThanFive = numbers.filter(x => x > 5);
// [6, 7, 8, 9, 10]

5. reduce (O Acumulador)

O método mais versátil. Ele recebe dois parâmetros principais: o acumulador (acc) e o valor atual (cur).

JavaScript

const sum = numbers.reduce((acc, cur) => acc + cur, 0);
console.log(sum); // 55

4. Por que usar esses métodos em vez do for?

 - No seu eBook, é importante destacar os benefícios:

 - Legibilidade: O código fica mais curto e expressivo.

 - Menos Bugs: Você não precisa se preocupar com índices (i++, i < length), que são fontes comuns de erros.

 - Imutabilidade: Métodos como map e filter não alteram o array original, o que é uma boa prática em programação funcional.

# Sugestão de Exercício para o eBook:

Tente criar um array de objetos (ex: alunos com nome e nota) e use o filter para selecionar apenas os aprovados (nota > 7) e depois o reduce para calcular a média da turma.

1. Transformação em String: join e toString

JavaScript

const names = ['Luis', 'Ana', 'Beto'];

console.log(names.toString());  // "Luis,Ana,Beto"
console.log(names.join(' - ')); // "Luis - Ana - Beto" (Você escolhe o separador)

2. Busca de Posição: indexOf e lastIndexOf

JavaScript

const numbers = [10, 20, 30, 20, 40];

console.log(numbers.indexOf(20));     // 1 (primeira ocorrência)
console.log(numbers.lastIndexOf(20)); // 3 (última ocorrência)
console.log(numbers.indexOf(99));     // -1 (não encontrado)

3. Organização: reverse e sort

Atenção: Estes métodos modificam o array original!

JavaScript

const letters = ['B', 'A', 'D', 'C'];

letters.sort();    // ['A', 'B', 'C', 'D']
letters.reverse(); // ['D', 'C', 'B', 'A']

Dica para o eBook: Para ordenar números corretamente com sort, use uma função de comparação: numbers.sort((a, b) => a - b);.

4. Extração: slice

Diferente do splice (que corta e remove), o slice apenas "tira uma foto" de uma parte do array.

JavaScript

const fruits = ['Maçã', 'Banana', 'Laranja', 'Manga'];
const citricas = fruits.slice(2, 4); // Pega do índice 2 até antes do 4
// Resultado: ['Laranja', 'Manga']

# Juntando tudo: Um fluxo de trabalho real

No seu eBook, você pode mostrar como encadear esses métodos (Chaining):

JavaScript

const precos = [10.5, 20, 35, 15, 50];

const resultado = precos
  .filter(p => p > 15)       // Filtra maiores que 15 -> [20, 35, 50]
  .map(p => p * 1.1)         // Aumenta 10% -> [22, 38.5, 55]
  .reverse()                 // Inverte -> [55, 38.5, 22]
  .join(' | ');              // String -> "55 | 38.5 | 22"

console.log(resultado);

O que acha de incluirmos agora uma seção sobre como copiar arrays com segurança usando o Spread Operator (...), para evitar que as alterações em um array afetem o outro?

# Funções de Iteração (Higher-Order Functions)

Em vez de usar loops manuais como o for(let i=0; i < array.length; i++), utilizamos métodos que descrevem o que queremos fazer, e não como fazer.

1. every

Verifica se todos os elementos do array atendem a uma condição lógica.

JavaScript

const idades = [18, 21, 25, 30];
const todosMaiores = idades.every(idade => idade >= 18); // true

2. some

Verifica se pelo menos um elemento atende à condição.

JavaScript

const tarefas = [{id: 1, feita: false}, {id: 2, feita: true}];
const temTarefaConcluida = tarefas.some(t => t.feita); // true

3. forEach

O substituto direto do loop for. Ele executa uma ação para cada item, mas não retorna nada (retorna undefined).

JavaScript

['A', 'B', 'C'].forEach((letra, indice) => {
  console.log(`${letra} está na posição ${indice}`);
});

4. map

Transforma o array original em um novo array de mesmo tamanho, mas com os valores alterados.

JavaScript

const num = [1, 2, 3];
const dobro = num.map(n => n * 2); // [2, 4, 6]

5. filter

Cria um novo array contendo apenas os elementos que passarem em um teste lógico.

JavaScript

const precos = [10, 50, 80, 120];
const caros = precos.filter(p => p > 70); // [80, 120]

6. reduce

O método mais poderoso. Ele "achata" o array em um único valor final (pode ser um número, uma string ou até um objeto).

Parâmetros: Acumulador (acc) e Valor Atual (cur).

JavaScript

const carrinho = [10, 20, 30];
const total = carrinho.reduce((acc, cur) => acc + cur, 0); // 60

Novas Funcionalidades de Array (ECMAScript 2016+)

O JavaScript evolui todos os anos (ES2016, ES2017, etc.). Abaixo estão as adições mais importantes e recentes para o seu estudo:

# Tabela de Funcionalidades Modernas (ES2016 - ES2023)

| **Versão** | **Funcionalidade** | **Descrição** |
| --- | --- | --- |
| ES2016 | includes() | Verifica se um array contém um valor (melhor que indexOf). |
| ES2019 | flat() | "Achata" arrays multidimensionais (ex: [[1], [2]] vira [1, 2]). |
| ES2019 | flatMap() | Mapeia e achata o resultado em um único passo. |
| ES2022 | at() | Permite usar índices negativos para pegar itens do fim (ex: arr.at(-1)). |
| ES2023 | toSorted() | Versão do sort() que não altera o array original (imutável). |
| ES2023 | toReversed() | Versão do reverse() que não altera o original. |
| ES2023 | with() | Altera um item específico gerando um novo array, sem modificar o original. |

# Exemplos das Funcionalidades Recentes

 - includes (ES2016)

Mais legível que o antigo indexOf !== -1.

JavaScript

const frutas = ['uva', 'maçã'];
console.log(frutas.includes('uva')); // true

 - flat (ES2019)

Útil para limpar matrizes (arrays bidimensionais).

JavaScript

const matriz = [1, 2, [3, 4, [5, 6]]];
console.log(matriz.flat(2)); // [1, 2, 3, 4, 5, 6]

 - at (ES2022) - A queridinha dos devs

Antes: arr[arr.length - 1]. Agora:

JavaScript

const letras = ['A', 'B', 'C', 'D'];
console.log(letras.at(-1)); // 'D' (Pega o último de trás para frente)

 - toSorted e toReversed (ES2023)

A grande mudança aqui é a Imutabilidade. Os métodos antigos sort e reverse alteram o array original. Estes novos criam uma cópia.

JavaScript

const original = [3, 1, 2];
const ordenado = original.toSorted(); 

console.log(original); // [3, 1, 2] (Permanece intacto)
console.log(ordenado); // [1, 2, 3] (Novo array)

Dica para o eBook: Destaque que usar métodos imutáveis (como map, filter, toSorted) é a base para trabalhar com frameworks modernos como React, onde nunca devemos alterar os dados originais diretamente.

# Eles continuam sendo usados e são extremamente importantes, mas alguns deles são mais "especializados" do que os métodos populares como map ou filter.

Muitos desses métodos foram introduzidos no ES6 (ECMAScript 2015) e servem para tarefas específicas, como manipulação de memória, busca de objetos e criação de arrays a partir de outras estruturas.

Aqui está o estudo detalhado deles para o seu guia:

Métodos de Utilitários e Busca (ES6+):


| **Método** | **Propósito** | **Frequência de Uso** |
| --- | --- | --- |
| find | Retorna o primeiro elemento que satisfaz a condição. | Muito Alta |
| findIndex | Retorna o índice do primeiro elemento que satisfaz a condição. | Alta |
| includes | Verifica se um valor existe no array. | Muito Alta |
| from | Cria um array a partir de um objeto iterável (ex: NodeList do HTML). | Alta |
| of | Cria um array a partir dos argumentos passados. | Média |
| fill | Preenche o array com um valor estático. | Média |
| copyWithin | Copia parte do array para outra posição no mesmo array. | Baixa (Uso técnico) |
| entries/keys/values | Retornam Iteradores para percorrer o array. | Média |
| @@iterator | É a propriedade interna que permite que o array seja usado em for...of. | Interna |
| keys | Devolve @@iterator, contendo as chaves do array. | ### |
| values | Devolve @@iterator, contendo os valores do array | ### |

Detalhando os Métodos Essenciais

1. find e findIndex

Diferente do filter, que retorna um array com todos os resultados, o find retorna apenas o primeiro objeto encontrado. É ideal para buscar IDs únicos.

JavaScript

const usuarios = [{id: 1, nome: 'Luis'}, {id: 2, nome: 'Ana'}];
const usuario = usuarios.find(u => u.id === 2); 
// Resultado: {id: 2, nome: 'Ana'}

2. Array.from() e Array.of()

 - from: Muito usado para converter coisas que "parecem" arrays (como o resultado de uma busca no DOM) em arrays reais para usar map/filter.

JavaScript

const divs = document.querySelectorAll('div'); // NodeList
const arrayDivs = Array.from(divs); // Agora é um Array!

 - of: Resolve o problema do new Array(). Lembra que new Array(7) cria 7 espaços vazios? O Array.of(7) cria um array com o número 7 dentro: [7].

3. fill e copyWithin

São métodos de manipulação direta:

fill(valor, inicio, fim): Ótimo para resetar arrays ou criar dados iniciais.

JavaScript

const base = new Array(5).fill(0); // [0, 0, 0, 0, 0]

 - copyWithin: Usado em processamento de dados de baixo nível (como manipulação de pixels em Canvas), onde performance é crítica e você não quer criar novos arrays na memória.

O Mundo dos Iteradores: keys, values, entries e @@iterator

Estes métodos não retornam arrays, mas sim Iteradores. Eles são usados principalmente em loops for...of.

JavaScript

const letras = ['a', 'b'];

// entries() gera pares [índice, valor]
for (let [indice, valor] of letras.entries()) {
  console.log(indice, valor); 
}
// 0 'a'
// 1 'b'

O que é o @@iterator?

Você raramente verá alguém digitando @@iterator no código do dia a dia. Ele é um símbolo interno (Symbol.iterator). Quando você faz isso:

JavaScript

for (let x of array) { ... }

O JavaScript, por baixo dos panos, está chamando o método @@iterator do seu array para conseguir percorrer os itens. É o "motor" que permite a iteração.

Conclusão para o eBook

# Nenhum desses métodos foi "descartado". O que acontece é que:

 - find e findIndex tornaram o código muito mais limpo para buscas.

 - entries, keys e values são essenciais quando você precisa de controle fino em loops modernos.

 - from é a ponte entre o HTML e o JavaScript.

 ## O método flatMap: 
 
 - É uma das ferramentas mais elegantes do JavaScript moderno (ES2019). 
 
 - Ele combina a transformação de um map com o nivelamento de um flat.
    
 - No seu eBook, você pode descrevê-lo como o método "dois em um" que resolve o problema de gerar arrays aninhados acidentalmente durante uma transformação.
    
1. O Conceito: Por que não usar apenas map?

Imagine que você tem uma lista de frases e quer extrair todas as palavras individuais em um único array.

 - Com map: Ele retornaria um array de arrays (matriz), pois cada frase vira um novo array de palavras.

 - Com flatMap: Ele mapeia cada frase para um array de palavras e, em seguida, "achata" (flat) tudo em um único nível.

JavaScript

const frases = ["Olá mundo", "Arrays são incríveis"];

// Usando map (gera matriz)
const comMap = frases.map(f => f.split(' ')); 
// [ ["Olá", "mundo"], ["Arrays", "são", "incríveis"] ]

// Usando flatMap (gera lista única)
const comFlatMap = frases.flatMap(f => f.split(' '));
// ["Olá", "mundo", "Arrays", "são", "incríveis"]

2. Estudo de Caso: flatMap + filter

Uma das maiores utilidades do flatMap é que ele permite adicionar ou remover itens durante o mapeamento, funcionando como um 
filtro e transformador simultâneo.

# O cenário: Você tem uma lista de produtos. Alguns estão em estoque, outros não. Você quer gerar uma etiqueta apenas para os que estão disponíveis, mas a etiqueta deve conter o nome e o código separadamente.

JavaScript

const produtos = [
  { nome: 'Teclado', estoque: true, id: 'T123' },
  { nome: 'Mouse', estoque: false, id: 'M456' },
  { nome: 'Monitor', estoque: true, id: 'V789' }
];

const etiquetas = produtos.flatMap(p => {
  if (p.estoque) {
    // Retornamos um array com os dois elementos que queremos "soltar" no array final
    return [p.nome, p.id];
  } else {
    // Se não tem estoque, retornamos um array vazio. 
    // O flatMap vai "achatar" esse vazio, ou seja, ele desaparece!
    return [];
  }
});

console.log(etiquetas);
// Resultado: ["Teclado", "T123", "Monitor", "V789"]

3. Comparativo para o eBookPara o leitor do seu eBook entender quando usar cada um, você pode usar esta tabela em Markdown:

| **Se você quer...** | **Use...** | **Resultado** |
| --- | --- | --- |
| Apenas transformar cada item. | map | Array do mesmo tamanho do original. |
| Apenas remover itens indesejados. | filter | Array menor ou igual ao original. |
| Transformar e achatar níveis. | flatMap | Array de qualquer tamanho (maior, menor ou igual). |

4. Exemplo Avançado: Limpeza de Dados Complexos

Imagine que você recebe dados de uma API onde cada usuário tem uma lista de "pedidos", e você quer uma lista única de todos os "IDs de itens" de todos os usuários, mas apenas de pedidos que não foram cancelados.

JavaScript

const usuarios = [
  { id: 1, pedidos: [{ item: 'A1', status: 'pago' }, { item: 'A2', status: 'cancelado' }] },
  { id: 2, pedidos: [{ item: 'B1', status: 'pago' }] }
];

const itensParaEnvio = usuarios.flatMap(u => 
  u.pedidos
    .filter(p => p.status === 'pago') // Filtra primeiro os pedidos válidos
    .map(p => p.item)               // Transforma em apenas o ID do item
);

console.log(itensParaEnvio); 
// Resultado: ["A1", "B1"]

Dica de Ouro para o eBook: O flatMap só achata um nível de profundidade. Se você tiver arrays triplamente aninhados, precisará usar o .flat(2) manualmente ou encadear mais operações.

## 📚 Cheat Sheet: O Guia Definitivo de Arrays (JS)

1. Métodos de Adição e Remoção (Mutáveis)

Alteram o array original.

| **Método** | **Ação** | **Retorno** |
| --- | --- | --- |
| push() | Adiciona itens ao final. | Novo length |
| pop() | Remove o último item. | O item removido |
| unshift() | Adiciona itens ao início. | Novo length |
| shift() | Remove o primeiro item. | O item removido |
| splice() | Remove/Adiciona em qualquer posição. | Itens removidos |

2. Métodos de Busca e Verificação
Encontram valores ou confirmam condições.

| **Método** | **Ação** | **Retorno** |
| --- | --- | --- |
| indexOf() | Busca o índice da primeira ocorrência. | Índice ou -1 |
| lastIndexOf() | Busca o índice da última ocorrência. | Índice ou -1 |
| includes() | Verifica se o item existe (ES2016). | true / false |
| find() | Retorna o primeiro objeto que combina. | O objeto ou undefined |
| findIndex() | Retorna o índice do primeiro objeto. | Índice ou -1 |
| some() | Algum item satisfaz a condição? | true / false |
| every() | Todos os itens satisfazem a condição? | true / false |

3. Transformação e Filtragem (Imutáveis)
Não alteram o original (recomendado para código moderno).

| **Método** | **Ação** | **Retorno** |
| --- | --- | --- |
| map() | Transforma cada item do array. | Novo Array (mesmo tamanho) |
| filter() | Filtra itens com base em um teste. | Novo Array (menor ou igual) |
| flatMap() | Mapeia e depois "achata" (ES2019). | Novo Array (tamanho variável) |
| reduce() | Acumula todos os valores em um só. | Valor único (número, obj...) |
| concat() | Junta dois ou mais arrays. | Novo Array |
| slice() | "Tira uma foto" de parte do array. | Novo Array |

4. Utilidades e Estética

| **Método** | **Ação** | **Retorno** |
| --- | --- | --- |
| join() | Une itens em uma string com separador. | String |
| sort() | Ordena os itens (cuidado: mutável). | Array ordenado |
| reverse() | Inverte a ordem (cuidado: mutável). | Array invertido |
| at() | Acessa índice (aceita negativos) (ES2022). | O elemento |
| flat() | Achata níveis de profundidade (ES2019). | Novo Array |


1💡 Dica de Ouro para o eBook: Quando usar o quê?

1. "Preciso de uma lista de nomes a partir de uma lista de objetos?" → Use map.

2. "Preciso remover os itens duplicados ou inválidos?" → Use filter.

3. "Preciso do valor total de uma soma?" → Use reduce.

4. "Preciso apenas encontrar um usuário específico pelo ID?" → Use find.

5. "Preciso imprimir cada item na tela?" → Use forEach.

Com este Cheat Sheet, você encerra a parte técnica de métodos! 

## 🏢 Arrays Bidimensionais e Multidimensionais

Um array bidimensional é basicamente uma matriz (uma tabela com linhas e colunas). 

Um array multidimensional vai além, podendo ser comparado a um "cubo" de dados ou estruturas ainda mais complexas.

1. Representação Visual e Acesso

Imagine uma tabela de notas de alunos em diferentes disciplinas:

          Matemática	Português	História 

Aluno 0	  8	            9           7
Aluno 1   6             7           8


Em JavaScript:

JavaScript

const notas = [
  [8, 9, 7], // Linha 0
  [6, 7, 8]  // Linha 1
];

// Acessando a nota de Português (coluna 1) do Aluno 0 (linha 0):
console.log(notas[0][1]); // 9

2. Iterando em Arrays Multidimensionais

Para percorrer todos os itens, usamos loops aninhados (um dentro do outro):

JavaScript

for (let i = 0; i < notas.length; i++) {
  for (let j = 0; j < notas[i].length; j++) {
    console.log(`Aluno ${i}, Disciplina ${j}: Nota ${notas[i][j]}`);
  }
}

🟦 Arrays em TypeScript

O TypeScript adiciona a tipagem estática aos arrays, o que evita o erro clássico de tentar somar um número com uma string acidentalmente.

1. Declaração de Tipos

Existem duas formas de declarar arrays no TS:

TypeScript

// Forma 1: Tipo[] (Mais comum)
let nomes: string[] = ['Luis', 'Ana'];
let idades: number[] = [25, 30];

// Forma 2: Array<Tipo> (Generic)
let valores: Array<number> = [10.5, 20.0];

2. Arrays de Tipos Mistos (Union Types)

Se você precisar de um array que aceite mais de um tipo:

TypeScript

let misto: (string | number)[] = ['Luis', 35, 'Ana', 28];

3. Tuplas (Tuples)

A Tupla é um tipo especial de array onde o número de elementos e os tipos são fixos em posições específicas. 
Muito usado para coordenadas ou respostas de API.

TypeScript

let coordenada: [number, number] = [10.5, -45.2];
let usuario: [number, string] = [1, 'Luis Torres'];

4. Arrays Readonly (Somente Leitura)

No TS, você pode impedir que um array seja modificado:

TypeScript

const config: readonly string[] = ['dark-mode', 'pt-br'];
// config.push('admin'); // ERRO: O TS não deixa você alterar!

📝 Tabela Comparativa: JS vs TS em Arrays

| **Característica** | **JavaScript** | **TypeScript** |
| --- | --- | --- |
| Flexibilidade | Aceita qualquer tipo a qualquer hora. | Tipos definidos na criação. |
| Segurança | Erros só aparecem na execução (Runtime). | Erros aparecem durante o desenvolvimento. |
| Autocompletar | Limitado. | Excelente (o editor sabe o que tem no array). |
| Tuplas | Não existem formalmente. | Suporte nativo para posições fixas. |

 # ⚠️ Erros Comuns e Boas Práticas

1. O Perigo da Referência de Memória

Em JavaScript, arrays são objetos. Isso significa que, ao "copiar" um array para outra variável, 
você não está criando uma cópia dos valores, mas sim um atalho (ponteiro) para o mesmo lugar na memória.

O Erro Clássico:

JavaScript

let original = [1, 2, 3];
let copia = original; // Isso NÃO é uma cópia real!

copia.push(4);

console.log(original); // [1, 2, 3, 4] -> O original foi alterado