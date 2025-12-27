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



class Job {
    constructor(valorHora, tempoEstimado, desconto) {
        this.valorHora = valorHora;
        this.tempoEstimado = tempoEstimado;
        this.desconto = desconto;
    }

    // MÉTODO PRIVADO: Só a classe Job pode ler isso.
    #aplicarDesconto() {
        return this.valorHora * this.tempoEstimado * (this.desconto / 100);
    }

    // MÉTODO PÚBLICO: Qualquer um pode chamar.
    calcularCusto() {
        // Internamente, eu consigo usar o método privado
        return (this.valorHora * this.tempoEstimado) - this.#aplicarDesconto();
    }
}


// Uso Correto (Instância)

const job1 = new Job(50, 20, 10);
console.log(`Custo Total Job 1: R$ ${job1.calcularCusto()}`); // Funciona!

const job2 = new Job(150, 200, 19.5);
console.log(`Custo Total Job 2: R$ ${job2.calcularCusto()}`); // Funciona!

