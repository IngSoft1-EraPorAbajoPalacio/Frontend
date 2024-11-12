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

const figura1 = {'idJugador': 1, 'nombreJugador': '1', 'cartas': [
    {'id': 45, 'figura': 20},
    {'id': 17, 'figura': 17},
    {'id': 39, 'figura': 14}
]}

// Mock de mensaje de inicio de conexión
export const mockInicioConexion = {
    "fichas": fichas,
    "orden": [1, 2, 3, 4],
    "turnoActual": 1,
    "colorProhibido": "Amarillo",
    "tiempo": 160,
    "cartasMovimiento": movimiento1,
    "cartasFigura": figura1,
    "cartasBloqueadas": [],
    "cantMovimientosParciales": 0
}
