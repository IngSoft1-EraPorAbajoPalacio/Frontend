import { PartidaEnCurso } from "../types/partidaEnCurso";

export const partidaMock: PartidaEnCurso = {
    id: 34,
    nombre: "Partida 1",
    cantJugadores: 2,
    jugadores:
    [{
        id: 5,
        nombre: "Jugador 1", 
        cartasFigura: [
            {id: 45, figura: 20},
            {id: 29, figura: 4},
            {id: 43, figura: 18}
        ],
        cartasMovimiento: [
            //Tiene todas las cartas de movimiento
            {id: 1, movimiento: 1},
            {id: 2, movimiento: 2},
            {id: 3, movimiento: 3},
            {id: 4, movimiento: 4},
            {id: 5, movimiento: 5},
            {id: 6, movimiento: 6},
            {id: 7, movimiento: 7}

        ],
        enPartida: true,
        esGuardador: true
    },{
        id: 6,
        nombre: "Jugador 2",
        cartasFigura: [
            {id: 17, figura: 17},
            {id: 49, figura: 24},
            {id: 42, figura: 17}
        ],
        cartasMovimiento: [
            //Tiene todas las cartas de movimiento
            {id: 1, movimiento: 1},
            {id: 2, movimiento: 2},
            {id: 3, movimiento: 3},
            {id: 4, movimiento: 4},
            {id: 5, movimiento: 5},
            {id: 6, movimiento: 6},
            {id: 7, movimiento: 7}
    
        ],
        enPartida: true,
        esGuardador: false
    }],
    fichas:
    [
        {x: 0, y: 0, color: 'Amarillo'},
        {x: 0, y: 1, color: 'Verde'},
        {x: 0, y: 2, color: 'Verde'},
        {x: 0, y: 3, color: 'Azul'},
        {x: 0, y: 4, color: 'Rojo'},
        {x: 0, y: 5, color: 'Azul'},
        {x: 1, y: 0, color: 'Azul'},
        {x: 1, y: 1, color: 'Amarillo'},
        {x: 1, y: 2, color: 'Verde'},
        {x: 1, y: 3, color: 'Verde'},
        {x: 1, y: 4, color: 'Amarillo'},
        {x: 1, y: 5, color: 'Azul'},
        {x: 2, y: 0, color: 'Azul'},
        {x: 2, y: 1, color: 'Verde'},
        {x: 2, y: 2, color: 'Amarillo'},
        {x: 2, y: 3, color: 'Rojo'},
        {x: 2, y: 4, color: 'Verde'},
        {x: 2, y: 5, color: 'Amarillo'},
        {x: 3, y: 0, color: 'Verde'},
        {x: 3, y: 1, color: 'Rojo'},
        {x: 3, y: 2, color: 'Verde'},
        {x: 3, y: 3, color: 'Verde'},
        {x: 3, y: 4, color: 'Azul'},
        {x: 3, y: 5, color: 'Azul'},
        {x: 4, y: 0, color: 'Rojo'},
        {x: 4, y: 1, color: 'Amarillo'},
        {x: 4, y: 2, color: 'Amarillo'},
        {x: 4, y: 3, color: 'Rojo'},
        {x: 4, y: 4, color: 'Amarillo'},
        {x: 4, y: 5, color: 'Rojo'},
        {x: 5, y: 0, color: 'Rojo'},
        {x: 5, y: 1, color: 'Azul'},
        {x: 5, y: 2, color: 'Amarillo'},
        {x: 5, y: 3, color: 'Rojo'},
        {x: 5, y: 4, color: 'Azul'},
        {x: 5, y: 5, color: 'Rojo'}
    ],
    orden: [5, 6],
}