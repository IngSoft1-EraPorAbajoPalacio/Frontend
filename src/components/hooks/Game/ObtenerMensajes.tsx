import { JugadorEnCurso, PartidaEnCurso } from "../../../types/partidaEnCurso";
import { borrarPartidaEnCurso, guardarPartidaEnCurso, obtenerJugador, obtenerPartidaEnCurso } from "../../context/GameContext";

// Escucha los mensajes del servidor para pasar el turno
const ObtenerMensajes = (
  setTurnoActual: React.Dispatch<React.SetStateAction<number|null>>,
  setPartida: React.Dispatch<React.SetStateAction<PartidaEnCurso | null>>,
  redirectToEnd: (idPartida: number, idJugador: number) => void,
  socket: any
) => {    
  socket.onmessage = (event: any) => {
    const message = JSON.parse(event.data);
    if (message.type === 'PasarTurno') {
      setTurnoActual(message.turno);
    } else if (message.type === 'TerminarPartida') {
      const idJugador = obtenerJugador().id;
      borrarPartidaEnCurso();
      redirectToEnd(message.data.idPartida, idJugador);
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