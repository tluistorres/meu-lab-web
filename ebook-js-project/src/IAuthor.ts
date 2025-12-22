// src/IAuthor.ts
export interface IAuthor {
    name: string;
    email: string;
    bio?: string; // O '?' indica que a bio é opcional
}