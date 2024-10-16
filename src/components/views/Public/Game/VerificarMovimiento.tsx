import { Movimiento } from "../../../../types/partidaEnCurso"

const VerificarMovimiento = (
    movimiento: Movimiento,
    idJugador: number,
    turnoActual: number | null
) => {

    if (idJugador !== turnoActual){
        console.error("Error: Jugador fuera de turno");
        return false;
    }

    // Se extraen las propiedades del movimiento
    const { carta, primerFicha, segundaFicha } = movimiento;

    // Se extraen las coordenadas de las fichas
    const x1 = primerFicha.x;
    const y1 = primerFicha.y;
    const x2 = segundaFicha.x;
    const y2 = segundaFicha.y;

    // Se crea un objeto con las posibles validaciones de los movimientos
    const movimientos: { [key: number]: () => boolean } = {
        1: () => // Mover dos pasos en diagonal
            Math.abs(x1 - x2) === 2 && Math.abs(y1 - y2) === 2,
        2: () => // Mover dos pasos horizontalmente o verticalmente
            (Math.abs(x1 - x2) === 2 && y1 === y2) ||
            (x1 === x2 && Math.abs(y1 - y2) === 2),
        3: () => // Mover un paso horizontalmente o verticalmente
            Math.abs(x1 - x2) + Math.abs(y1 - y2) === 1,
        4: () => //Mover un paso en diagonal
            Math.abs(x1 - x2) === 1 && Math.abs(y1 - y2) === 1,
        5: () => // Mover en forma de L inversa
            Math.abs(x1 - x2) === 1 ?
                (x2 - x1 === 1 && y2 - y1 === -2) || (x2 - x1 === -1 && y2 - y1 === 2) :
                (y2 - y1 === 1 && x2 - x1 === -2) || (y2 - y1 === -1 && x2 - x1 === 2),
        6: () => // Mover en forma de L
            Math.abs(x1 - x2) === 1 ?
                (x2 - x1 === 1 && y2 - y1 === 2) || (x2 - x1 === -1 && y2 - y1 === -2) :
                (y2 - y1 === 1 && x2 - x1 === 2) || (y2 - y1 === -1 && x2 - x1 === -2),
        7: () => // Mover hasta un borde manteniendo la misma fila o columna
            (x1 === x2 && (y2 === 0 || y2 === 5)) ||
            (y1 === y2 && (x2 === 0 || x2 === 5)),
    };

    // Si el movimiento es válido, se retorna true, de lo contrario, false y se imprime un mensaje de error
    const esValido = movimientos[carta.movimiento] ? movimientos[carta.movimiento]() : false;
    if(!esValido) console.error("Error: Movimiento inválido.");

    return esValido;
}

export default VerificarMovimiento;