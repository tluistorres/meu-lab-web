export interface IAuthor {
    name: string;
    bio: string;
    email?: string; // O '?' torna o email opcional, ou remova o '?' se for obrigatório
}
