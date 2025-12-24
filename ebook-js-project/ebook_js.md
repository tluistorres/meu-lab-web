📚 Capítulo: Ecossistema JavaScript Moderno1. POO na Prática: A Classe Base (17-Book.js)O primeiro passo para um sistema robusto é o Encapsulamento. Utilizamos # para campos privados, garantindo que o estado interno do objeto não seja corrompido.JavaScriptexport default class Book {
    #pages; // Campo privado

    constructor(title, pages) {
        this.title = title;
        this.pages = pages; // Aciona o setter para validação
    }

    get pages() { return this.#pages; }

    set pages(value) {
        if (value > 0) this.#pages = value;
        else console.error("Erro: O número de páginas deve ser positivo!");
    }

    static isValid(bookObj) {
        return typeof bookObj.title === 'string' && bookObj.pages > 0;
    }
}
2. Manipulação de Coleções (18-Library.js)A classe Library atua como um gerenciador de estado, utilizando métodos funcionais para processar dados de forma declarativa.Exercícios de Encerramento (Capítulo 2)Implementamos métodos que combinam o poder do filter, map e reduce:Relatório de Livros Densos: Filtra por tamanho e mapeia apenas os títulos.Calculadora de Investimento: Transforma a contagem de páginas em valor monetário.JavaScriptgetLargeBookTitles(minPages) {
    return this.books
        .filter(book => book.pages > minPages)
        .map(book => book.title);
}

calculateMarketValue(pricePerPage) {
    const totalPages = this.calculateTotalPages();
    return (totalPages * pricePerPage).toFixed(2);
}
3. Funções de Iteração (Higher-Order Functions)Em vez de loops for manuais, utilizamos métodos que descrevem o que queremos fazer.MétodoPropósitoExemploeveryVerifica se todos atendem à condição.arr.every(x => x > 0)someVerifica se pelo menos um atende.arr.some(x => x === 10)forEachExecuta uma ação (efeito colateral).arr.forEach(x => save(x))mapTransforma e gera um novo array.arr.map(x => x * 2)filterSeleciona itens baseados em teste.arr.filter(x => x > 5)reduceAcumula o array em um único valor.arr.reduce((acc, cur) => acc + cur, 0)O Poder do flatMapO flatMap é a ferramenta "dois em um". Ele mapeia cada item e depois remove os níveis de aninhamento (flat). É ideal para fluxos onde você precisa transformar e filtrar ao mesmo tempo:JavaScript// Exemplo: Gerar etiquetas apenas para produtos em estoque
const etiquetas = produtos.flatMap(p => p.estoque ? [p.nome, p.id] : []);
4. Funcionalidades Modernas (ES2016 - ES2023)O JavaScript evoluiu para privilegiar a Imutabilidade, essencial para frameworks modernos como React.at(-1) (ES2022): A forma elegante de pegar o último elemento.toSorted() / toReversed() (ES2023): Versões imutáveis dos métodos clássicos. Elas retornam uma cópia, mantendo o array original intacto.includes() (ES2016): Verificação de existência mais legível que indexOf.5. Assincronismo: Promises e Async/AwaitNa vida real, dados vêm de APIs externas. Aprendemos a não travar a aplicação enquanto esperamos por uma resposta.JavaScript// Consumo elegante com Async/Await
async function carregarAcervo() {
    try {
        const dados = await ApiService.fetchBookData('Node.js');
        console.log('Sucesso:', dados);
    } catch (err) {
        console.error('Falha na conexão:', err);
    }
}
🏁 Conclusão do MóduloDominar estas estruturas lineares e métodos de manipulação é o que separa um programador iniciante de um desenvolvedor capaz de construir sistemas escaláveis. Ao usar map, filter e reduce, você escreve menos código, evita bugs de índices e facilita a manutenção.Pronto para o próximo desafio? Gostaria que eu preparasse o guia prático sobre como aplicar essas funções de Array dentro das Listas Ligadas que começamos a codar?
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


# 🏢 Arrays Bidimensionais e Multidimensionais

Um array bidimensional é uma matriz (uma tabela com linhas e colunas). Em JavaScript, estruturas multidimensionais são "arrays de arrays".

### Exemplo: Tabela de Notas
```javascript
const notas = [
  [8, 9, 7], // Linha 0 (Aluno 0)
  [6, 7, 8]  // Linha 1 (Aluno 1)
];

// Acesso: notas[linha][coluna]
console.log(notas[0][1]); // Saída: 9 (Português do Aluno 0)
Iteração em MatrizesPara percorrer tabelas, utilizamos loops aninhados (um for dentro do outro). O primeiro controla as linhas e o segundo as colunas.🟦 Arrays em TypeScript (Segurança de Tipos)O TypeScript traz previsibilidade. Ele garante que um array de números nunca receba uma string por engano.1. Declaração e TipagemTypeScriptlet nomes: string[] = ['Luis', 'Ana']; // Notação colchetes
let idades: Array<number> = [25, 30];  // Notação Generic
2. Tuplas (Tuples)Diferente do JS, o TS permite fixar o tamanho e o tipo de cada posição. Ideal para coordenadas (X, Y) ou retornos de funções.TypeScriptlet coordenada: [number, number] = [10.5, -45.2];
3. Readonly (Imutabilidade)TypeScriptconst config: readonly string[] = ['dark-mode', 'pt-br'];
// config.push('admin'); // ❌ Erro de compilação!
⚠️ Erros Comuns e Boas PráticasO Perigo da Referência de MemóriaEste é o erro que mais causa bugs em produção. Em JS/TS, arrays são objetos. Ao fazer let copia = original, você não copia os dados, apenas o endereço de memória.A Solução: Spread Operator (...)Para criar uma cópia real e independente, "espalhe" os itens em um novo array:JavaScriptlet original = [1, 2, 3];
let copiaReal = [...original]; // ✅ Agora são independentes

copiaReal.push(4);
console.log(original); // [1, 2, 3] (Permanece intacto!)
💡 Cheat Sheet: Quando usar o quê?Se você precisa de...Use o Método...Nova lista baseada na originalmapRemover itens indesejadosfilterUm único valor final (soma, etc)reduceLocalizar um item específicofindApenas executar algo para cada itemforEachVerificar se todos cumprem a regraevery
### 🚀 O que achou desse fechamento? 

Agora que terminamos a teoria pesada de Arrays, Matrizes e a segurança do TypeScript, você tem a base perfeita para as **Estruturas de Dados Dinâmicas**. 

**Podemos voltar para o código da nossa Lista Ligada (`23-LinkedList.ts`) e implementar o método `removeAt(index)` usando essa lógica de ponteiros que você acabou de aprender?**

# Capítulo 6: Estruturas de Dados Lineares na Prática

As estruturas lineares organizam elementos em uma sequência lógica, mas diferem radicalmente na forma como permitem o acesso, inserção e remoção de dados.

## 1. Pilha (Stack) — O Princípio LIFO
* **Conceito:** *Last-In, First-Out* (O último a entrar é o primeiro a sair).
* **Analogia:** Uma pilha de pratos ou de livros.
* **Uso Comum:** Histórico de navegação, botão "Desfazer" (Ctrl+Z) e gerenciamento de chamadas de funções (Call Stack).



## 2. Fila (Queue) — O Princípio FIFO
* **Conceito:** *First-In, First-Out* (O primeiro a entrar é o primeiro a sair).
* **Analogia:** Fila de banco ou de impressão.
* **Uso Comum:** Escalonamento de processos e sistemas de mensagens (Buffer).



## 3. Deque (Double-Ended Queue) — Flexibilidade Total
* **Conceito:** Fila de duas extremidades. Permite inserção e remoção em ambos os lados.
* **Analogia:** Um vagão de trem com portas em ambas as pontas.
* **Uso Comum:** Verificador de palíndromos e algoritmos de "roubo de tarefas" (work-stealing).

---

## 🛠️ Lições do Laboratório: Erros e Soluções

Durante a implementação prática em TypeScript, enfrentamos e resolvemos desafios reais de compilação que consolidaram o aprendizado:

### A. Erro de Escopo e Redeclaração (`TS2451`)
* **O Erro:** `Cannot redeclare block-scoped variable 'stack'`.
* **A Causa:** Tentar declarar `const stack` duas vezes no mesmo arquivo de teste.
* **A Solução:** Em TypeScript/ES6, variáveis de escopo de bloco não podem ser redeclaradas. Deve-se reutilizar a variável ou isolar os testes em escopos ou arquivos diferentes.

### B. Erros de Sintaxe e Posicionamento (`TS1005` e `TS1434`)
* **O Erro:** `';' expected` ou `Unexpected keyword`.
* **A Causa:** Ocorreu ao tentar escrever o método `toString()` fora das chaves `{ }` da classe, ou por erros de digitação como `consolo.log` (typos).
* **A Solução:** Garantir que todos os métodos pertençam ao corpo da classe e utilizar o corretor do compilador para identificar erros ortográficos em comandos globais.

### C. Proteção de Membros Privados (`TS7053`)
* **O Erro:** Falha ao tentar acessar `stack.items` externamente.
* **A Causa:** Atributos marcados como `private` são inacessíveis fora da classe no TypeScript.
* **A Solução:** Respeitar o encapsulamento. A segurança do modificador `private` torna desnecessário o uso de artifícios como `Symbols` para ocultar dados, garantindo uma API mais limpa e segura.

---

## 📊 Comparativo Técnico de Performance

| Estrutura | Regra | Entrada | Saída | Complexidade (Remoção) |
| :--- | :--- | :--- | :--- | :--- |
| **Pilha** | LIFO | Topo | Topo | $O(1)$ |
| **Fila** | FIFO | Fim | Início | $O(1)$ (com objeto) |
| **Deque** | Livre | Ambas pontas | Ambas pontas | $O(1)$ |

> **Dica de Engenharia:** A implementação de Filas e Deques usando **Objetos Literais** (`{}`) é superior ao uso de **Arrays** (`[]`) para grandes volumes de dados, pois evita o custo de reindexação (reordenar os índices) ao remover o primeiro elemento (índice 0).

---