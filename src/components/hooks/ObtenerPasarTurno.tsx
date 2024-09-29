import { guardarPartidaEnCurso, borrarPartidaEnCurso } from "../context/GameContext";
import { socket } from './ObtenerPartidaNueva';
import { PartidaEnCurso } from "../../types/partidaEnCurso";

export const obtenerPasarTurno = (setPartida: React.Dispatch<React.SetStateAction<PartidaEnCurso | null>>) => {    
  const handlePasarTurno = (_mensaje: any) => {

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
  };

  socket.on('PasarTurno', handlePasarTurno);

  return () => {
      socket.off('PasarTurno', handlePasarTurno);
  };
};