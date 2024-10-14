import { JugadorEnCurso, PartidaEnCurso } from "../../../types/partidaEnCurso";
import { borrarPartidaEnCurso, guardarPartidaEnCurso, obtenerPartidaEnCurso } from "../../context/GameContext";

// Escucha los mensajes del servidor para pasar el turno
const ObtenerMensajes = (
  setTurnoActual: React.Dispatch<React.SetStateAction<number|null>>,
  setPartida: React.Dispatch<React.SetStateAction<PartidaEnCurso | null>>,
  setFinalizado: React.Dispatch<React.SetStateAction<boolean>>,
  socket: any
) => {    
  socket.onmessage = (event: any) => {
    const message = JSON.parse(event.data);
    if (message.type === 'PasarTurno') {
      setTurnoActual(message.turno);
    } else if (message.type === 'PartidaEliminada') {
      borrarPartidaEnCurso();
      setFinalizado(true);
      return () => socket.close();
    } else if (message.type === 'AbandonarPartida') {
      const partida = obtenerPartidaEnCurso();
      partida.jugadores = partida.jugadores.filter((jugador: JugadorEnCurso) => jugador.id !== message.data.idJugador);
      borrarPartidaEnCurso();
      guardarPartidaEnCurso(partida);
      setPartida(partida);
    }
  }
};

export default ObtenerMensajes;