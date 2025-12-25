
/* class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  isEmpty() {
    return this.count - this.lowestCount === 0;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  size() {
    return this.count - this.lowestCount;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let result = '';
    for (let i = this.lowestCount; i < this.count; i++) {
      result += this.items[i] + (i < this.count - 1 ? ', ' : '');
    }
    return result;
  }
}


const queue = new Queue(); // Intância de Class  


console.log(queue.isEmpty()); // Uso dos Modos de Classe Queue
queue.enqueue('John');
queue.enqueue('Jack');
queue.enqueue('Luis');
console.log(queue.toString()); // "John, Jack"
console.log(queue.size()); // 
queue.enqueue('Camila');
console.log(queue.toString()); // "John, Jack, Camila"
queue.enqueue('Matheus');
queue.enqueue('Livia');
queue.enqueue('Louise');
console.log(queue.toString());*/


class FilaDePedidos {
  constructor() {
    this.pedidos = [];
  }

  enqueue(item) {
    this.pedidos.push(item);
    return `Pedido "${item}" adicionado à fila.`;
  }

  dequeue() {
    if (this.isEmpty()) {
      return "A fila está vazia.";
    }
    const itemRemovido = this.pedidos.shift();
    return `Pedido "${itemRemovido}" removido da frente da fila.`;
  }

  isEmpty() {
    return this.pedidos.length === 0;
  }

  peek() {
    if (this.isEmpty()) {
      return "A fila está vazia.";
    }
    return this.pedidos[0];
  }

  size() {
    return this.pedidos.length;
  }

  clear() {
    this.pedidos = [];
    return "Fila limpa.";
  }

  toString() {
    if (this.isEmpty()) {
      return "A fila está vazia.";
    }
    return this.pedidos.join(", ");
  }

  front() {
    return this.peek();
  }

  back() {
    if (this.isEmpty()) {
      return "A fila está vazia.";
    }
    return this.pedidos[this.pedidos.length - 1];
  }

  remove(item) {
    const index = this.pedidos.indexOf(item);
    if (index !== -1) {
      this.pedidos.splice(index, 1);
      return `Item "${item}" removido da fila.`;
    }
    return `Item "${item}" não encontrado na fila.`;
  }

  contains(item) {
    return this.pedidos.includes(item);
  }

sort(compareFunction) {
    this.pedidos.sort(compareFunction);
    return "Fila ordenada.";
    }

}

const filaDeAtendimento = new FilaDePedidos();

filaDeAtendimento.enqueue("Paciente 1");
filaDeAtendimento.enqueue("Paciente 2");
filaDeAtendimento.enqueue("Paciente 3");
filaDeAtendimento.enqueue("Paciente 4");

console.log("Fila de atendimento:", filaDeAtendimento.toString());
// Fila de atendimento: Paciente 1, Paciente 2, Paciente 3

console.log("Próximo paciente:", filaDeAtendimento.front());
// Próximo paciente: Paciente 1

filaDeAtendimento.dequeue();
console.log("Fila de atendimento após atendimento:", filaDeAtendimento.toString());
// Fila de atendimento após atendimento: Paciente 2, Paciente 3

filaDeAtendimento.enqueue("Paciente 5");
console.log("Fila de atendimento após novo paciente:", filaDeAtendimento.toString());
// Fila de atendimento após novo paciente: Paciente 2, Paciente 3, Paciente 4

console.log("Paciente 3 está na fila:", filaDeAtendimento.contains("Paciente 3"));
// Paciente 3 está na fila: true

filaDeAtendimento.remove("Paciente 2");
console.log("Fila de atendimento após remoção:", filaDeAtendimento.toString());
// Fila de atendimento após remoção: Paciente 3, Paciente 4, Paciente 5

filaDeAtendimento.remove("Paciente 3");
console.log(filaDeAtendimento.toString());

filaDeAtendimento.enqueue("Paciente 1000");
console.log("Fila de atendimento após remoção:",filaDeAtendimento.toString());

console.log("Quantidade de pacientes na fila:", filaDeAtendimento.size());

filaDeAtendimento.enqueue("Paciente 10A");
console.log("Fila de atendimento após adicionar paciente 10A:", filaDeAtendimento.toString());
console.log("Quantidade de pacientes na fila:", filaDeAtendimento.size());

filaDeAtendimento.remove("Paciente 10A");
console.log("Fila de atendimento após remover paciente 10A:", filaDeAtendimento.toString());

console.log("Fila de atendimento original:", filaDeAtendimento.toString());

filaDeAtendimento.sort((a, b) => {
  const matchA = a.match(/Paciente (\d+)/);
  const matchB = b.match(/Paciente (\d+)/);
  const numA = parseInt(matchA[1], 10);
  const numB = parseInt(matchB[1], 10);
  return numA - numB;
});

console.log("Fila de atendimento ordenada:", filaDeAtendimento.toString());

