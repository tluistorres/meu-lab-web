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


// class Stack {
//     constructor() {
//         this.items = [];
//     }
//     push(element) {
//         this.items.push(element);
//     }
//     isEmpty() {
//         return this.items.length === 0;
//     }
//     pop() {
//         return this.items.pop();
//     }
// }


// function decimalToBinary(decNumber) {
//   // Validação Melhorada: Verifica se é número, se é negativo ou se é float
//   if (typeof decNumber !== 'number') return 'Erro: A entrada deve ser um número.';
//   if (decNumber < 0) return 'Erro: Números negativos não são permitidos.';
//   if (!Number.isInteger(decNumber)) return `Erro: O número ${decNumber} é um float. Insira um número inteiro.`;

//   // Caso especial para o número 0
//   if (decNumber === 0) return '0';

//   const remStack = new Stack();
//   let number = decNumber;
//   let rem;
//   let binaryString = '';

//   while (number > 0) {
//     rem = Math.floor(number % 2);
//     remStack.push(rem);
//     number = Math.floor(number / 2);
//   }

//   while (!remStack.isEmpty()) {
//     binaryString += remStack.pop().toString();
//   }

//   return binaryString;
// }

// console.log("--- Sucesso ---");
// console.log(decimalToBinary(233)); // 11101001
// console.log(decimalToBinary(10));  // 1010
// console.log(decimalToBinary(0));   // 0

// console.log("\n--- Validação de Erros ---");
// // Teste com Número Float
// console.log(decimalToBinary(3.14)); 
// // Saída: Erro: O número 3.14 é um float. Insira um número inteiro.

// // Teste com Número Negativo
// console.log(decimalToBinary(-10));  
// // Saída: Erro: Números negativos não são permitidos.

// // Teste com String
// console.log(decimalToBinary("15"));``
// // Saída: Erro: A entrada deve ser um número.

// Pressione Ctrl + K, solte, e depois Ctrl + C (Windows/Linux) para comentar.
// Pressione Ctrl + K, solte, e depois Ctrl + U (Windows/Linux) para descomentar.


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
  // Valida se é nome, letra ou qualquer coisa que não seja número
  if (typeof decNumber !== 'number') {
    return `Erro: "${decNumber}" não é um número. Insira um valor numérico.`;
  }

  // Valida se é um número "quebrado" (float)
  if (!Number.isInteger(decNumber)) {
    return `Erro: O valor ${decNumber} é decimal. Use apenas inteiros.`;
  }

  // Valida se é negativo
  if (decNumber < 0) {
    return `Erro: ${decNumber} é negativo. Insira um número positivo.`;
  }

  // Caso base para o zero
  if (decNumber === 0) return '0';

  // INSTÂNCIA DA CLASSE (Aqui usamos o new Stack)
  const remStack = new Stack();
  let number = decNumber;
  let binaryString = '';

  while (number > 0) {
    let rem = Math.floor(number % 2);
    remStack.push(rem); // Empilha o resto
    number = Math.floor(number / 2); // Divide o número por 2
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString(); // Desempilha invertendo a ordem
  }

  return binaryString;
}

console.log("--- RESULTADOS ---");
console.log("Binário de 50:", decimalToBinary(50));   // Saída: 110010
console.log("Binário de 233:", decimalToBinary(233)); // Saída: 11101001

console.log("\n--- TESTES DE ERRO ---");
console.log(decimalToBinary("Luis"));   // Erro de string/nome
console.log(decimalToBinary(3.14));     // Erro de float
console.log(decimalToBinary("10"));     // Erro: string numérica também é bloqueada
console.log(decimalToBinary(-10));
console.log(decimalToBinary("ABC"));
