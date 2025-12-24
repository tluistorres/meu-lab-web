import { baseConverter } from './baseConverter.js';

console.log("--- 🧮 Lab Luis-Tech: Conversor de Bases ---");

const numero = 100345;

console.log(`Decimal: ${numero}`);
console.log(`Binário (Base 2):   ${baseConverter(numero, 2)}`);
console.log(`Octal (Base 8):     ${baseConverter(numero, 8)}`);
console.log(`Hexa (Base 16):     ${baseConverter(numero, 16)}`);
console.log(`Base 36:            ${baseConverter(numero, 36)}`);

// Teste de borda: Número zero e bases inválidas
console.log(`Teste Zero:         ${baseConverter(0, 2)}`);
console.log(`Teste Erro Base:    ${baseConverter(10, 40)}`);