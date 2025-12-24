# 📚 Meu Lab Web: JavaScript Moderno & OO


[![Node.js Version](https://img.shields.io/badge/node-v18.19.1+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/developed%20with-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Este repositório é um laboratório prático de desenvolvimento JavaScript e TypeScript, focado em **Estruturas de Dados**, **Programação Orientada a Objetos (POO)** e **Algoritmos Avançados**.

O projeto evoluiu de um sistema de biblioteca para uma implementação completa de estruturas fundamentais de computação, servindo de base para o e-book "JS Moderno: Do Zero ao Profissional".

---

## 🚀 Estrutura do Projeto

A organização segue padrões modernos, utilizando TypeScript para garantir tipagem forte e segurança no desenvolvimento:

```text
ebook-js-project/
├── src/                # 🛠️ Código Fonte (TS/ES Modules)
│   ├── models/         # Interfaces e Classes de suporte (Nodes)
│   ├── 17-22/          # POO, Herança e Assincronismo
│   ├── 23-LinkedList/  # Listas Ligadas e Circulares
│   ├── 24-Doubly/      # Listas Duplamente Ligadas
│   ├── 26-Sets/        # Conjuntos e Operações Matemáticas
│   └── 27-Hash/        # Dicionários e Tabelas Hash (djb2)
├── lib/                # 📦 Código Transpilado (JavaScript)
├── package.json        # Scripts e Dependências
└── tsconfig.json       # Configuração do compilador TS

🛠️ Tecnologias Utilizadas

 - TypeScript: Superconjunto de JavaScript para desenvolvimento seguro.

 - Node.js: Ambiente de execução.

 - Babel/TSC: Transpilação para compatibilidade.

 - ES6+ Concepts: Classes, Generics, Destructuring e Modules.

⚡ Como Executar

Pré-requisitos

 -Node.js instalado (v18+)

 - Alias runts configurado (opcional para facilitar execução)

Instalação

1. Clone o repositório:

  git clone [https://github.com/tluistorres/meu-lab-web.git](https://github.com/tluistorres/meu-lab-web.git)

2. Entre na pasta e instale as dependências:

  cd ebook-js-project && npm install

Executando Testes

Para rodar qualquer estrutura de dados específica (ex: Tabela Hash):

  runts test-dict

📖 Jornada de Aprendizado 

 - Cap 1-4: Fundamentos de POO, Herança e Modularização Profissional.

 - Cap 5-6: Pilhas (Stacks) e Filas (Queues) com lógica de algoritmos (Batata Quente).

 - Cap 7: Listas Ligadas, Circulares e Ordenadas (Manipulação de Memória).

 - Cap 8: Conjuntos (Sets) e Operações Matemáticas de União e Interseção.

 - Cap 9: Dicionários e Tabelas Hash (Resolução de colisões com Separate Chaining).

👨‍💻 Autor

Luís Torres

GitHub: @tluistorres

 - Projeto desenvolvido durante o estudo de Engenharia de Software e Algoritmos.

 - Este projeto é a implementação prática dos exemplos do e-book "JS Moderno: Do Zero ao Profissional".