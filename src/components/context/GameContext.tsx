import { Jugador, Partida, JugadoresUnidos } from "../../types/partidaListada";
import { PartidaEnCurso } from "../../types/partidaEnCurso";

// Jugador
export const guardarJugador = (jugador: Jugador) => {
    localStorage.setItem('jugador', JSON.stringify(jugador));
}

export const obtenerJugador = () => {
    const jugador = localStorage.getItem('jugador');
    return jugador ? JSON.parse(jugador) : {};
};

// Partida
export const guardarPartida = (partida: Partida) => {
    localStorage.setItem('partida', JSON.stringify(partida));
}

export const obtenerPartida = () => {
    const partida = localStorage.getItem('partida');
    return partida ? JSON.parse(partida) : {};
}

export const borrarPartida = () => {
    localStorage.clear();
}

// Partida en curso
export const guardarPartidaEnCurso = (partida: PartidaEnCurso) => {
    localStorage.setItem('partidaEnCurso', JSON.stringify(partida));
}

export const obtenerPartidaEnCurso = () => {
    const partida = localStorage.getItem('partidaEnCurso');
    return partida ? JSON.parse(partida) : {};
}

export const borrarPartidaEnCurso = () => {
    localStorage.removeItem('partidaEnCurso');
}

// Jugadores Unidos
export const guardarJugadoresUnidos = (jugadores: JugadoresUnidos[]) => {
    localStorage.setItem('jugadoresUnidos', JSON.stringify(jugadores));
}

export const obtenerJugadoresUnidos = () => {
    const jugadores = localStorage.getItem('jugadoresUnidos');
    return jugadores ? JSON.parse(jugadores) : [];
}

export const borrarJugadoresUnidos = () => {
    localStorage.removeItem('jugadoresUnidos');
}