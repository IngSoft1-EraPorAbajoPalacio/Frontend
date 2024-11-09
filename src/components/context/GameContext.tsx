import { Jugador, Partida, JugadoresUnidos } from "../../types/partidaListada";
import { Ficha, CartaMovimiento, CartaFigura, JugadorEnCurso } from "../../types/partidaEnCurso";

// Jugador
export const guardarJugador = (jugador: Jugador) => {
    sessionStorage.setItem('jugador', JSON.stringify(jugador));
}

export const obtenerJugador = () => {
    const jugador = sessionStorage.getItem('jugador');
    return jugador ? JSON.parse(jugador) : {};
};

// Partida
export const guardarPartida = (partida: Partida) => {
    sessionStorage.setItem('partida', JSON.stringify(partida));
}

export const obtenerPartida = () => {
    const partida = sessionStorage.getItem('partida');
    return partida ? JSON.parse(partida) : {};
}

// Ficha seleccionada
export const guardarFichaSeleccionada = (ficha: number) => {
    sessionStorage.setItem('fichaSeleccionada', JSON.stringify(ficha));
}

export const borrarFichaSeleccionada = () => {
    sessionStorage.removeItem('fichaSeleccionada');
}

export const obtenerFichaSeleccionada = () => {
    const ficha = sessionStorage.getItem('fichaSeleccionada');
    return ficha ? JSON.parse(ficha) : -1;
}

// Jugadores Unidos
export const guardarJugadoresUnidos = (jugadores: JugadoresUnidos[]) => {
    sessionStorage.setItem('jugadoresUnidos', JSON.stringify(jugadores));
}

export const obtenerJugadoresUnidos = () => {
    const jugadores = sessionStorage.getItem('jugadoresUnidos');
    return jugadores ? JSON.parse(jugadores) : [];
}

export const borrarJugadoresUnidos = () => {
    sessionStorage.removeItem('jugadoresUnidos');
}

// Fichas del tablero
export const guardarFichasTablero = (fichas: Ficha[]) => {
    sessionStorage.setItem('fichasTablero', JSON.stringify(fichas));
}

export const obtenerFichasTablero = () => {
    const fichas = sessionStorage.getItem('fichasTablero');
    return fichas ? JSON.parse(fichas) : [];
}

export const borrarFichasTablero = () => {
    sessionStorage.removeItem('fichasTablero');
}

// Movimientos
export const guardarMovimientos = (movimientos: CartaMovimiento[]) => {
    sessionStorage.setItem('movimientos', JSON.stringify(movimientos));
}

export const obtenerMovimientos = () => {
    const movimientos = sessionStorage.getItem('movimientos');
    return movimientos ? JSON.parse(movimientos) : null;
}

export const borrarMovimientos = () => {
    sessionStorage.removeItem('movimientos');
}

// Guarda los jugadores

// Jugador 1
export const guardarJugador1 = (jugador1: JugadorEnCurso) => {
    sessionStorage.setItem('jugador1', JSON.stringify(jugador1));
}

export const obtenerJugador1 = () => {
    const jugador1 = sessionStorage.getItem('jugador1');
    return jugador1 ? JSON.parse(jugador1) : null;
}

export const borrarJugador1 = () => {
    sessionStorage.removeItem('jugador1');
}

// Jugador 2
export const guardarJugador2 = (jugador2: JugadorEnCurso) => {
    sessionStorage.setItem('jugador2', JSON.stringify(jugador2));
}

export const obtenerJugador2 = () => {
    const jugador2 = sessionStorage.getItem('jugador2');
    return jugador2 ? JSON.parse(jugador2) : null;
}

export const borrarJugador2 = () => {
    sessionStorage.removeItem('jugador2');
}

// Jugador 3
export const guardarJugador3 = (jugador3: JugadorEnCurso) => {
    sessionStorage.setItem('jugador3', JSON.stringify(jugador3));
}

export const obtenerJugador3 = () => {
    const jugador3 = sessionStorage.getItem('jugador3');
    return jugador3 ? JSON.parse(jugador3) : null;
}

export const borrarJugador3 = () => {
    sessionStorage.removeItem('jugador3');
}

// Jugador 4
export const guardarJugador4 = (jugador4: JugadorEnCurso) => {
    sessionStorage.setItem('jugador4', JSON.stringify(jugador4));
}

export const obtenerJugador4 = () => {
    const jugador4 = sessionStorage.getItem('jugador4');
    return jugador4 ? JSON.parse(jugador4) : null;
}

export const borrarJugador4 = () => {
    sessionStorage.removeItem('jugador4');
}

// Guarda la figura de cada jugador

// Jugador 1
export const guardarFiguraJugador1 = (figura1: CartaFigura[]) => {
    sessionStorage.setItem('figuraJugador1', JSON.stringify(figura1));
}

export const obtenerFiguraJugador1 = () => {
    const figura1 = sessionStorage.getItem('figuraJugador1');
    return figura1 ? JSON.parse(figura1) : null;
}

export const borrarFiguraJugador1 = () => {
    sessionStorage.removeItem('figuraJugador1');
}

// Jugador 2
export const guardarFiguraJugador2 = (figura2: CartaFigura[]) => {
    sessionStorage.setItem('figuraJugador2', JSON.stringify(figura2));
}

export const obtenerFiguraJugador2 = () => {
    const figura2 = sessionStorage.getItem('figuraJugador2');
    return figura2 ? JSON.parse(figura2) : null;
}

export const borrarFiguraJugador2 = () => {
    sessionStorage.removeItem('figuraJugador2');
}

// Jugador 3
export const guardarFiguraJugador3 = (figura3: CartaFigura[]) => {
    sessionStorage.setItem('figuraJugador3', JSON.stringify(figura3));
}

export const obtenerFiguraJugador3 = () => {
    const figura3 = sessionStorage.getItem('figuraJugador3');
    return figura3 ? JSON.parse(figura3) : null;
}

export const borrarFiguraJugador3 = () => {
    sessionStorage.removeItem('figuraJugador3');
}

// Jugador 4
export const guardarFiguraJugador4 = (figura4: CartaFigura[]) => {
    sessionStorage.setItem('figuraJugador4', JSON.stringify(figura4));
}

export const obtenerFiguraJugador4 = () => {
    const figura4 = sessionStorage.getItem('figuraJugador4');
    return figura4 ? JSON.parse(figura4) : null;
}

export const borrarFiguraJugador4 = () => {
    sessionStorage.removeItem('figuraJugador4');
}

// Color prohibido
export const guardarColorProhibido = (color: string) => {
    sessionStorage.setItem('colorProhibido', JSON.stringify(color));
}

export const obtenerColorProhibido = () => {
    const color = sessionStorage.getItem('colorProhibido');
    return color ? JSON.parse(color) : null;
}

export const borrarColorProhibido = () => {
    sessionStorage.removeItem('colorProhibido');
}


// Borra el session storage completo
export const borrarPartida = () => {
    sessionStorage.clear();
}

// Guarda en el SessionStorage si el jugador es Host o no
export const guardarEsHost = (esHost: boolean) => {
    sessionStorage.setItem('esHost', JSON.stringify(esHost));
}

//Obtener si el jugador es host
export const obtenerEsHost = () => {
   const esHost = sessionStorage.getItem('esHost');
   return esHost ? JSON.parse(esHost) :false;
}

// Guardo la cantidad de jugadores en la partida
export const guardarCantJugadoresPartida = (contadorJ: number)=>{
    sessionStorage.setItem('cantJugadoresPartida', JSON.stringify(contadorJ));
}

export const obtenerCantJugadoresPartida = ()=>{
    const contadorJ = sessionStorage.getItem('cantJugadoresPartida');
    return contadorJ ? JSON.parse(contadorJ) : 1;
}