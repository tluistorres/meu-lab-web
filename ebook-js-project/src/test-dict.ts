import Dictionary from './27-Dictionary.js';
import HashTable from './28-HashTable.js';

console.log("--- 📖 Lab Luis-Tech: Dicionário ---");
const dict = new Dictionary<string, string>();
dict.set("luis", "luistorres090165@gmail.com");
dict.set("torres", "torres090165@gmail.com");
console.log("Email do Luis:", dict.get("luis"));

console.log("\n--- ⚡ Lab Luis-Tech: Hash Table ---");
const hash = new HashTable<string, string>();
hash.put("admin", "123456");
hash.put("user", "qwerty");
console.log("Password Admin (Hash):", hash.get("admin"));