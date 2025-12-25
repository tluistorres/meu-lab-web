
 class Queue {
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

// Instância da Classe Queue

const queue = new Queue();

// Uso dos Métodos da Classe Queue

console.log(queue.isEmpty()); // true
queue.enqueue('John');
queue.enqueue('Jack');
queue.enqueue('Luis');
console.log(queue.toString()); // "John, Jack"
console.log(queue.size()); // 2
queue.enqueue('Camila');
console.log(queue.toString()); // "John, Jack, Camila"
queue.enqueue('Matheus');
queue.enqueue('Livia');
queue.enqueue('Louise');
console.log(queue.toString());
  


