import Deque from './22-Deque.js';

function verificadorPalindromo(texto: string): boolean {
    if (!texto) return false;

    const deque = new Deque<string>();
    // Normaliza: remove espaços e deixa tudo em minúsculo
    const textoLimpo = texto.toLowerCase().replace(/\s/g, '');
    let ePalindromo = true;

    // Adiciona cada letra no Deque
    for (const caractere of textoLimpo) {
        deque.addBack(caractere);
    }

    // Compara as pontas enquanto houver mais de uma letra
    while (deque.size() > 1 && ePalindromo) {
        const primeiraLetra = deque.removeFront();
        const ultimaLetra = deque.removeBack();
        
        if (primeiraLetra !== ultimaLetra) {
            ePalindromo = false;
        }
    }

    return ePalindromo;
}

const palavras = ["Radar", "Luis", "Arara", "A base do teto desaba", "TypeScript"];

console.log("--- 🔍 Lab Luis-Tech: Verificador de Palíndromos ---");

palavras.forEach(p => {
    const resultado = verificadorPalindromo(p);
    console.log(`"${p}" é um palíndromo? ${resultado ? '✅ SIM' : '❌ NÃO'}`);
});
