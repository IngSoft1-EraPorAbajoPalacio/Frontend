import { guardarPartidaEnCurso, borrarPartidaEnCurso } from "../../context/GameContext";
import socket from "../../../services/sockets";
import { PartidaEnCurso } from "../../../types/partidaEnCurso";

// Escucha los mensajes del servidor para pasar el turno
export const obtenerPasarTurno = (setPartida: React.Dispatch<React.SetStateAction<PartidaEnCurso | null>>) => {    
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'PasarTurno') {
      setPartida(partida => {
        if (!partida) return null;

        const nuevoTurno = (partida.turnoActual + 1) % partida.cantJugadores;
        const nuevaPartida = new PartidaEnCurso(
          partida.id,
          partida.nombre,
          partida.cantJugadores,
          partida.jugadores,
          partida.fichas,
          partida.orden
        );
        nuevaPartida.turnoActual = nuevoTurno;

        borrarPartidaEnCurso();
        guardarPartidaEnCurso(nuevaPartida);

        return nuevaPartida;
      });
    } else if (message.type === 'TerminarPartida') {
      //navigate(Paths.End);
    }
  }
};