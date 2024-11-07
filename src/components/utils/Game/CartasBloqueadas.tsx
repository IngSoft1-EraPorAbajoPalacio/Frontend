const cartasBloqueadas: number[] = []; // IDs de las cartas bloqueadas

export const bloquearCarta = (carta: number): void => {
    cartasBloqueadas.push(carta);
};

export const desbloquearCarta = (carta: number): void => {
    const index = cartasBloqueadas.indexOf(carta);
    if (index > -1) {
        cartasBloqueadas.splice(index, 1);
    }
};

export const esCartaBloqueada = (carta: number): boolean => {
    return cartasBloqueadas.includes(carta);
};