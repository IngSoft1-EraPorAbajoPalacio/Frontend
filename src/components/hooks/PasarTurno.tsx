import { obtenerPartidaEnCurso, borrarPartidaEnCurso, guardarPartidaEnCurso } from "../context/GameContext";

export function PasarTurno() {
    let partida = obtenerPartidaEnCurso();
    console.log("Turno actual: ", partida.orden[partida.turnoActual]);
    partida.turnoActual = (partida.turnoActual + 1) % partida.cantJugadores;
    borrarPartidaEnCurso();
    guardarPartidaEnCurso(partida);
}
