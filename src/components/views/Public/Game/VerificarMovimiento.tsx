import { Movimiento } from "../../../../types/partidaEnCurso"

const VerificarMovimiento = (movimiento: Movimiento) => {

    // Se extraen las propiedades del movimiento
    const { carta, primerFicha, segundaFicha } = movimiento;

    // Se crea un objeto con las posibles validaciones de los movimientos
    const movimientos: { [key: number]: () => boolean } = {
        1: () => 
            (primerFicha.x === segundaFicha.x + 2 && primerFicha.y === segundaFicha.y + 2) ||
            (primerFicha.x === segundaFicha.x - 2 && primerFicha.y === segundaFicha.y - 2),
        2: () => 
            primerFicha.x === segundaFicha.x &&
            (primerFicha.y === segundaFicha.y - 2 || primerFicha.y === segundaFicha.y + 2),
        3: () => 
            primerFicha.x === segundaFicha.x &&
            (primerFicha.y === segundaFicha.y - 1 || primerFicha.y === segundaFicha.y + 1),
        4: () => 
            (primerFicha.x === segundaFicha.x + 1 && primerFicha.y === segundaFicha.y - 1) ||
            (primerFicha.x === segundaFicha.x - 1 && primerFicha.y === segundaFicha.y + 1),
        5: () => 
            (primerFicha.x === segundaFicha.x + 1 && primerFicha.y === segundaFicha.y - 2) ||
            (primerFicha.x === segundaFicha.x - 1 && primerFicha.y === segundaFicha.y + 2),
        6: () => 
            (primerFicha.x === segundaFicha.x + 1 && primerFicha.y === segundaFicha.y - 2) ||
            (primerFicha.x === segundaFicha.x - 1 && primerFicha.y === segundaFicha.y + 2),
        7: () => 
            primerFicha.x === segundaFicha.x &&
            (primerFicha.y === segundaFicha.y - 4 || primerFicha.y === segundaFicha.y + 4)
    };

    // Si el movimiento es válido, se retorna true, de lo contrario, false
    return movimientos[carta.movimiento] ? movimientos[carta.movimiento]() : false;
}

export default VerificarMovimiento;