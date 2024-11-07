import { CartaFigura } from '../../../types/partidaEnCurso';

const cartasBloqueadas: number[] = []; // IDs de las cartas bloqueadas

export const bloquearCarta = (carta: CartaFigura): void => {
    cartasBloqueadas.push(carta.id);
};

export const desbloquearCarta = (carta: CartaFigura): void => {
    const index = cartasBloqueadas.indexOf(carta.id);
    if (index > -1) {
        cartasBloqueadas.splice(index, 1);
    }
};

export const esCartaBloqueada = (carta: CartaFigura): boolean => {
    return cartasBloqueadas.includes(carta.id);
};