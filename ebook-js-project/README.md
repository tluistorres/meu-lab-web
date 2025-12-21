# 📚 Meu Lab Web: JavaScript Moderno & OO

[![Node.js Version](https://img.shields.io/badge/node-v18.19.1+-green.svg)](https://nodejs.org/)
[![Babel](https://img.shields.io/badge/compiled%20with-babel-yellow.svg)](https://babeljs.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Este repositório é um laboratório prático de desenvolvimento JavaScript, focado em **Programação Orientada a Objetos (POO)**, **Assincronismo** e **Arquitetura de Projetos Profissionais**. 

O projeto simula um sistema de gerenciamento de biblioteca (E-books e IT Books) integrado a APIs externas.

---

## 🚀 Estrutura do Projeto

A organização segue o padrão de mercado, separando o código fonte do código transpilado:

```text
ebook-js-project/
├── src/                # 🛠️ Código Fonte (ES Modules)
│   ├── index.js        # Maestro do sistema (Entry Point)
│   ├── 17-Book.js      # Classe Base
│   ├── 17-ITBook.js    # Herança e Especialização
│   ├── 18-Library.js   # Agregação e Lógica de Negócio
│   └── 19-ApiService.js # Consumo de API (Promises/Async-Await)
├── lib/                # 📦 Código Distribuído (Gerado pelo Babel)
├── package.json        # Gerenciamento de dependências e scripts
└── .babelrc            # Configuração do transpiler

🛠️ Tecnologias Utilizadas

Node.js: Ambiente de execução.

ES6+ (ECMAScript): Classes, Arrow Functions, Destructuring e Modules.

Babel: Transpilação para garantir compatibilidade.

Async/Await: Manipulação de operações assíncronas.

⚡ Como Executar

Pré-requisitos
Node.js instalado (v18+)

NPM (instalado com o Node)

Instalação

Clone o repositório:

Bash

git clone [https://github.com/tluistorres/meu-lab-web.git](https://github.com/tluistorres/meu-lab-web.git)

Entre na pasta do projeto:

Bash

cd ebook-js-project

Instale as dependências:

Bash

npm install

Rodando o Sistema

Para compilar o código e iniciar o sistema em um único comando:

Bash

npm start

📖 O que foi aprendido até aqui?

Cap 1-2: Criação de classes, herança e encapsulamento de propriedades (getters e setters).

Cap 3: Manipulação de Promises e simulação de requisições a APIs externas com setTimeout.

Cap 4 (Atual): Modularização profissional, configuração de ambientes de build (src/lib) e resolução de conflitos entre ESM e CommonJS.

👨‍💻 Autor

Luís Torres

GitHub: @tluistorres

Projeto desenvolvido durante o estudo de JavaScript Avançado.

Este projeto é parte do e-book "JS Moderno: Do Zero ao Profissional".


---

### Dicas para o README:

1.  **Badges**: Aqueles selos no topo (Node version, License) dão um ar muito profissional.
2.  **Estrutura de Pastas**: Visualizar a árvore de diretórios ajuda outros desenvolvedores a entenderem seu projeto rapidamente.
3.  **Instruções Claras**: O bloco "Como Executar" evita que as pessoas tenham dúvidas de como testar seu código.

