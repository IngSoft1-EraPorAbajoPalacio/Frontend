import { Jugador } from "../../types/partidaListada";
import { Partida } from "../../types/partidaListada";

export const guardarJugador = (jugador: Jugador) => {
    localStorage.setItem('jugador', JSON.stringify(jugador));
}

export const obtenereJugador = () => {
    const jugador = localStorage.getItem('jugador');
    return jugador ? JSON.parse(jugador) : {};
};

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