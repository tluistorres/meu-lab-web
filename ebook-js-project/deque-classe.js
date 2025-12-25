class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  isEmpty() {
    return this.count === 0;
  }

  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.lowestCount = 0;
      this.items[0] = element;
    }
  }

  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }

  toString() {
    let str = '';
    for (let i = this.lowestCount; i < this.count; i++) {
      str += this.items[i] + ', ';
    }
    return str.slice(0, -2); // remover a vírgula e o espaço no final
  }

  size() {
    return this.count - this.lowestCount;
  }

  removeFront() {
    if (this.isEmpty()) {
      return null;
    }
    const element = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return element;
  }

  removeBack() {
    if (this.isEmpty()) {
      return null;
    }
    const element = this.items[this.count - 1];
    delete this.items[this.count - 1];
    this.count--;
    return element;
  }
}

const deque = new Deque();
console.log(deque.isEmpty()); 
console.log(deque.items); 
deque.addBack('Lucas');
deque.addBack('Livia');
console.log(deque.toString()); 
console.log(deque.size()); 
deque.addBack('Louise');
console.log("Meus filhos são esses:", deque.toString()); 
console.log(deque.isEmpty());
deque.removeFront();
console.log(deque.toString()); 
deque.removeBack();
console.log(deque.size()); 
deque.addBack('Louise');
deque.addBack('Lucas');
console.log(deque.toString()); 

