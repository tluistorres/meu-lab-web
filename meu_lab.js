// Função 1: Portaria
function verificarPortaria(idade) {
    return idade >= 18 ? "Pode entrar! ✅" : "Entrada proibida! ❌";
}

// Função 2: Calcular Desconto (Preço, Porcentagem)
function calcularDesconto(preco, porcento) {
    let desconto = preco * (porcento / 100);
    let valorFinal = preco - desconto;
    return "O desconto é R$ " + desconto + ". Valor final: R$ " + valorFinal;
}

console.log("--- Lab de Funções Carregado ---");

// Função 3: Calcular IMC (Peso, Altura)
function calcularIMC(peso, altura) {
    let imc = peso / (altura * altura);
    return "Seu IMC é: " + imc.toFixed(2);
}

// Função 4: Somar uma lista de números
function somarLista(numeros) {
    let total = 0;
    for (let n of numeros) {
        total += n;
    }
    return "O total da lista é: " + total;
}
