// Mockeo de mensajes de lobby por WebSocket - IniciarPartida

// Fichas
const fichas = [
    {'x': 0, 'y': 0, 'color': 'Azul'},
    {'x': 0, 'y': 1, 'color': 'Verde'},
    {'x': 0, 'y': 2, 'color': 'Verde'},
    {'x': 0, 'y': 3, 'color': 'Amarillo'},
    {'x': 0, 'y': 4, 'color': 'Amarillo'},
    {'x': 0, 'y': 5, 'color': 'Verde'},
    {'x': 1, 'y': 0, 'color': 'Azul'},
    {'x': 1, 'y': 1, 'color': 'Verde'},
    {'x': 1, 'y': 2, 'color': 'Verde'},
    {'x': 1, 'y': 3, 'color': 'Verde'},
    {'x': 1, 'y': 4, 'color': 'Verde'},
    {'x': 1, 'y': 5, 'color': 'Rojo'},
    {'x': 2, 'y': 0, 'color': 'Amarillo'},
    {'x': 2, 'y': 1, 'color': 'Amarillo'},
    {'x': 2, 'y': 2, 'color': 'Verde'},
    {'x': 2, 'y': 3, 'color': 'Rojo'},
    {'x': 2, 'y': 4, 'color': 'Amarillo'},
    {'x': 2, 'y': 5, 'color': 'Verde'},
    {'x': 3, 'y': 0, 'color': 'Amarillo'},
    {'x': 3, 'y': 1, 'color': 'Rojo'},
    {'x': 3, 'y': 2, 'color': 'Amarillo'},
    {'x': 3, 'y': 3, 'color': 'Rojo'},
    {'x': 3, 'y': 4, 'color': 'Rojo'},
    {'x': 3, 'y': 5, 'color': 'Azul'},
    {'x': 4, 'y': 0, 'color': 'Amarillo'},
    {'x': 4, 'y': 1, 'color': 'Azul'},
    {'x': 4, 'y': 2, 'color': 'Azul'},
    {'x': 4, 'y': 3, 'color': 'Rojo'},
    {'x': 4, 'y': 4, 'color': 'Azul'},
    {'x': 4, 'y': 5, 'color': 'Azul'},
    {'x': 5, 'y': 0, 'color': 'Azul'},
    {'x': 5, 'y': 1, 'color': 'Azul'},
    {'x': 5, 'y': 2, 'color': 'Amarillo'},
    {'x': 5, 'y': 3, 'color': 'Rojo'},
    {'x': 5, 'y': 4, 'color': 'Rojo'},
    {'x': 5, 'y': 5, 'color': 'Rojo'}
]

const movimiento1 = {'idJugador': 1, 'nombreJugador': '1', 'cartas': [
    {'id': 4, 'movimiento': 4},
    {'id': 16, 'movimiento': 2},
    {'id': 3, 'movimiento': 3}
]}

const movimiento2 = {'idJugador': 2, 'nombreJugador': '2', 'cartas': [
    {'id': 5, 'movimiento': 5},
    {'id': 45, 'movimiento': 3},
    {'id': 44, 'movimiento': 2}
]}

const movimiento3 = {'idJugador': 3, 'nombreJugador': '3', 'cartas': [
    {'id': 6, 'movimiento': 6},
    {'id': 7, 'movimiento': 7},
    {'id': 8, 'movimiento': 8}
]}

const movimiento4 = {'idJugador': 4, 'nombreJugador': '4', 'cartas': [
    {'id': 9, 'movimiento': 9},
    {'id': 10, 'movimiento': 10},
    {'id': 11, 'movimiento': 11}
]}

const figura1 = {'idJugador': 1, 'nombreJugador': '1', 'cartas': [
    {'id': 45, 'figura': 20},
    {'id': 17, 'figura': 17},
    {'id': 39, 'figura': 14}
]}

const figura2 = {'idJugador': 2, 'nombreJugador': '2', 'cartas': [
    {'id': 35, 'figura': 10},
    {'id': 49, 'figura': 24},
    {'id': 20, 'figura': 20}
]}

const figura3 = {'idJugador': 3, 'nombreJugador': '3', 'cartas': [
    {'id': 21, 'figura': 21},
    {'id': 22, 'figura': 22},
    {'id': 23, 'figura': 23}
]}

const figura4 = {'idJugador': 4, 'nombreJugador': '4', 'cartas': [
    {'id': 24, 'figura': 24},
    {'id': 25, 'figura': 25},
    {'id': 26, 'figura': 26}
]}

// Mock de mensaje de IniciarPartida con 2 jugadores
export const MockIniciarPartida2Jugadores = {
    'type': 'IniciarPartida',
    'fichas': fichas,
    'orden': [1, 2],
    'cartasMovimiento': [movimiento1, movimiento2],
    'cartasFigura': [figura1, figura2    ]
}

// Mock de mensaje de IniciarPartida con 3 jugadores
export const MockIniciarPartida3Jugadores = {
    'type': 'IniciarPartida',
    'fichas': fichas,
    'orden': [1, 2, 3],
    'cartasMovimiento': [movimiento1, movimiento2, movimiento3],
    'cartasFigura': [figura1, figura2, figura3]
}

// Mock de mensaje de IniciarPartida con 4 jugadores
export const MockIniciarPartida4Jugadores = {
    'type': 'IniciarPartida',
    'fichas': fichas,
    'orden': [1, 2, 3, 4],
    'cartasMovimiento': [movimiento1, movimiento2, movimiento3, movimiento4],
    'cartasFigura': [figura1, figura2, figura3, figura4]
}
