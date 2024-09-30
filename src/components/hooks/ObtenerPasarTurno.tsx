import { guardarPartidaEnCurso, borrarPartidaEnCurso } from "../context/GameContext";
import { socket } from "./sockets";
import { PartidaEnCurso } from "../../types/partidaEnCurso";
import { useEffect } from "react";

export const obtenerPasarTurno = (setPartida: React.Dispatch<React.SetStateAction<PartidaEnCurso | null>>) => {    

  useEffect(() => {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'JugadorUnido') {
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
      }
    }
  }, [setPartida]);

};