/*
class Stack {
    constructor() {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
    }
    isEmpty() {
        return this.items.length === 0;
    }
    pop() {
        return this.items.pop();
    }

}

function decimalToBinary(decNumber) {
    const remStack = new Stack();
    let number = decNumber;
    let rem;
    let binaryString = '';
    while (number > 0) {
        rem = Math.floor(number % 2);
        remStack.push(rem);
        number = Math.floor(number / 2);
    }
    while (!remStack.isEmpty()) {
        binaryString += remStack.pop().toString();
    }
    return binaryString;    
}

console.log(decimalToBinary(233));
console.log(decimalToBinary(10));
console.log(decimalToBinary(1000));

*/

class Stack {
    constructor() {
        this.items = [];
    }
    push(element) {
        this.items.push(element);
    }
    isEmpty() {
        return this.items.length === 0;
    }
    pop() {
        return this.items.pop();
    }

}
function decimalToBinary(decNumber) {
  if (typeof decNumber !== 'number' || decNumber < 0 || decNumber % 1 !== 0) {
    return 'Entrada inválida. Por favor, insira um inteiro não negativo.';
  }

  const remStack = new Stack();
  let number = decNumber;
  let rem;
  let binaryString = '';

  while (number > 0) {
    rem = Math.floor(number % 2);
    remStack.push(rem);
    number = Math.floor(number / 2);
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }

  return binaryString;
}



// Testes
console.log(decimalToBinary(233)); // 11101001
console.log(decimalToBinary(10)); // 1010
console.log(decimalToBinary(1000)); // 1111101000
console.log(decimalToBinary(-1)); // Erro: Entrada inválida...
console.log(decimalToBinary(3.14)); // Erro: Entrada inválida...

