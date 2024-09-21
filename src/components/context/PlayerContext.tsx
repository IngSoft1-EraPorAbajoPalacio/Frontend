import Jugador from "../../types/jugador";
import { Partida } from "../../types/partida";

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