import { Jugador, Partida, JugadoresUnidos } from "../../types/partidaListada";
import { PartidaEnCurso } from "../../types/partidaEnCurso";
import { Ficha } from "../../types/Partida";

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

// Partida en curso
export const guardarPartidaEnCurso = (partida: PartidaEnCurso) => {
    sessionStorage.setItem('partidaEnCurso', JSON.stringify(partida));
}

export const obtenerPartidaEnCurso = () => {
    const partida = sessionStorage.getItem('partidaEnCurso');
    return partida ? JSON.parse(partida) : {};
}

export const borrarPartidaEnCurso = () => {
    sessionStorage.removeItem('partidaEnCurso');
}

// Fichas seleccionadas
export const guardarFichasSeleccionadas = (fichas: number[]) => {
    sessionStorage.setItem('fichasSeleccionadas', JSON.stringify(fichas));
}

export const borrarFichasSeleccionadas = () => {
    sessionStorage.removeItem('fichasSeleccionadas');
}

export const obtenerFichasSeleccionadas = () => {
    const fichas = sessionStorage.getItem('fichasSeleccionadas');
    return fichas ? JSON.parse(fichas) : [];
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

// Borra el session storege completo
export const borrarPartida = () => {
    sessionStorage.clear();
}