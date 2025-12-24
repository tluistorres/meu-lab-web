// tests/Book.test.ts
import Book from '../src/17-Book.js';

describe('Testes da Classe Book', () => {
    const author = { name: 'Luis Torres', bio: 'Dev' };

    test('Deve criar um livro corretamente', () => {
        const book = new Book('TS Pro', author, 100);
        expect(book.pages).toBe(100);
    });

    test('Deve lançar erro ao inserir páginas negativas', () => {
        const book = new Book('TS Pro', author, 100);
        expect(() => {
            book.pages = -10;
        }).toThrow("O número de páginas deve ser um valor positivo!");
    });
});
