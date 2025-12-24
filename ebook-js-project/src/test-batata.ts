import Queue from './21-Queue.js';

function batataQuente(listaNomes: string[], num: number) {
    const fila = new Queue<string>();
    const eliminados: string[] = [];

    // Adiciona todo mundo na fila
    for (let i = 0; i < listaNomes.length; i++) {
        fila.enqueue(listaNomes[i]);
    }

    while (fila.size() > 1) {
        // Passa a batata 'num' vezes
        for (let i = 0; i < num; i++) {
            // Tira da frente e joga pro final (a batata circulando)
            fila.enqueue(fila.dequeue()!);
        }
        // A batata parou! Quem está na frente sai do jogo
        eliminados.push(fila.dequeue()!);
        console.log(`A batata parou! ${eliminados[eliminados.length - 1]} foi eliminado.`);
    }

    return {
        vencedor: fila.dequeue(),
        eliminados: eliminados
    };
}

const nomes = ['Luis', 'Torres', 'Lucas', 'Bia', 'Louise', 'Quiteria'];
const resultado = batataQuente(nomes, 7);

console.log(`\n🏆 O VENCEDOR É: ${resultado.vencedor}`);
