// const valorHora = 80;
// const tempoEstimado = 20;
// const desconto = valorHora * tempoEstimado * (10 / 100);

// const custoEstimado = valorHora * tempoEstimado - desconto;

// console.log(custoEstimado);

// class Job {
//     constructor(valorHora, tempoEstimado, desconto) {
//         this.valorHora = valorHora;
//         this.tempoEstimado = tempoEstimado;
//         this.desconto = desconto;
//     }

//     #aplicarDesconto() {
//         return this.valorHora * this.tempoEstimado * (this.desconto / 100)
//     }

//     calcularCusto() {
//         return this.valorHora * this.tempoEstimado - this.#aplicarDesconto()
//     }
// }


// const job1 = new Job(50, 20, 10);
// console.log(job1.calcularCusto());

// const job2 = new Job(150, 200, 28);

// console.log(job2.calcularCusto());

// Job.#aplicarDesconto();



// class Job {
//     constructor(valorHora, tempoEstimado, desconto) {
//         this.valorHora = valorHora;
//         this.tempoEstimado = tempoEstimado;
//         this.desconto = desconto;
//     }

//     // MÉTODO PRIVADO: Só a classe Job pode ler isso.
//     #aplicarDesconto() {
//         return this.valorHora * this.tempoEstimado * (this.desconto / 100);
//     }

//     // MÉTODO PÚBLICO: Qualquer um pode chamar.
//     calcularCusto() {
//         // Internamente, eu consigo usar o método privado
//         return (this.valorHora * this.tempoEstimado) - this.#aplicarDesconto();
//     }
// }


// // Uso Correto (Instância)

// const job1 = new Job(50, 20, 10);
// console.log(`Custo Total Job 1: R$ ${job1.calcularCusto()}`); // Funciona!

// const job2 = new Job(150, 200, 19.5);
// console.log(`Custo Total Job 2: R$ ${job2.calcularCusto()}`); // Funciona!

/////////////////////////////////////////////////////////////////////////////

// 1. Definição da Classe com Getter e Método Privado

// class Job {
//     constructor(valorHora, tempoEstimado, desconto) {
//         this.valorHora = valorHora;
//         this.tempoEstimado = tempoEstimado;
//         this._descontoPercentual = desconto; // Usamos _ para indicar que é interno
//     }

//     // MÉTODO PRIVADO: Cálculo interno que ninguém vê de fora
//     #calcularValorDoDesconto() {
//         return (this.valorHora * this.tempoEstimado) * (this._descontoPercentual / 100);
//     }

//     // GETTER: Permite ler o valor do desconto, mas não permite alterá-lo diretamente
//     get valorEconomizado() {
//         return `R$ ${this.#calcularValorDoDesconto().toFixed(2)}`;
//     }

//     // MÉTODO PÚBLICO: O resultado final para o cliente
//     calcularCusto() {
//         const bruto = this.valorHora * this.tempoEstimado;
//         return bruto - this.#calcularValorDoDesconto();
//     }
// }

// 2. Instância e Uso do Getter

// const meuProjeto = new Job(100, 10, 15); // R$ 1000 brutos, 15% de desconto

// console.log("--- RELATÓRIO DO PROJETO ---");
// console.log(`Custo Total: R$ ${meuProjeto.calcularCusto()}`);

// // Acessamos o getter como se fosse uma variável comum (sem parênteses)
// console.log(`Você economizou: ${meuProjeto.valorEconomizado}`);

// 1. Definição da Classe com Proteção

// class Job {
//     constructor(valorHora, tempoEstimado, desconto) {
//         // Validação: Valor hora não pode ser zero ou negativo
//         if (valorHora <= 0) {
//             throw new Error("O valor da hora deve ser maior que zero.");
//         }

//         // Validação: Tempo não pode ser negativo
//         if (tempoEstimado < 0) {
//             throw new Error("O tempo estimado não pode ser negativo.");
//         }

//         this.valorHora = valorHora;
//         this.tempoEstimado = tempoEstimado;
//         this._descontoPercentual = desconto;
//     }

//     #calcularValorDoDesconto() {
//         return (this.valorHora * this.tempoEstimado) * (this._descontoPercentual / 100);
//     }

//     get valorEconomizado() {
//         return `R$ ${this.#calcularValorDoDesconto().toFixed(2)}`;
//     }

//     calcularCusto() {
//         return (this.valorHora * this.tempoEstimado) - this.#calcularValorDoDesconto();
//     }
// }

// 1. Definição da Classe com Proteção

class Job {
    constructor(valorHora, tempoEstimado, desconto) {
        // Validação: Valor hora não pode ser zero ou negativo
        if (valorHora <= 0) {
            throw new Error("O valor da hora deve ser maior que zero.");
        }

        // Validação: Tempo não pode ser negativo
        if (tempoEstimado < 0) {
            throw new Error("O tempo estimado não pode ser negativo.");
        }

        this.valorHora = valorHora;
        this.tempoEstimado = tempoEstimado;
        this._descontoPercentual = desconto;
    }

    #calcularValorDoDesconto() {
        return (this.valorHora * this.tempoEstimado) * (this._descontoPercentual / 100);
    }

    get valorEconomizado() {
        return `R$ ${this.#calcularValorDoDesconto().toFixed(2)}`;
    }

    calcularCusto() {
        return (this.valorHora * this.tempoEstimado) - this.#calcularValorDoDesconto();
    }
}

// 2. Testando a Segurança (Try/Catch)

console.log("--- TESTE DE SEGURANÇA ---");

try {
    const jobInvalido = new Job(-10, 20, 5); // Isso vai disparar o erro!
} catch (erro) {
    console.error(`Falha ao criar Job: ${erro.message}`);
}

console.log("\n--- TESTE DE SUCESSO ---");
const jobValido = new Job(100, 5, 10);
console.log(`Custo do Job Válido: R$ ${jobValido.calcularCusto()}`);

