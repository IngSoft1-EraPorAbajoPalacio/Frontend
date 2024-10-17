import { JugadorEnCurso, PartidaEnCurso } from "../../../types/partidaEnCurso";
import { borrarPartida, guardarPartidaEnCurso, obtenerPartidaEnCurso } from "../../context/GameContext";
import { CartaMovimiento, Movimiento } from "../../../types/partidaEnCurso";

// Escucha los mensajes del servidor para pasar el turno
const ObtenerMensajes = (
  setTurnoActual: React.Dispatch<React.SetStateAction<number|null>>,
  setPartida: React.Dispatch<React.SetStateAction<PartidaEnCurso|null>>,
  setMovimiento: React.Dispatch<React.SetStateAction<Movimiento|null>>,
  setMovimientoAgregado: React.Dispatch<React.SetStateAction<boolean>>,
  setFinalizado: React.Dispatch<React.SetStateAction<boolean>>,
  socket: any
) => {    
  socket.onmessage = (event: any) => {
    const message = JSON.parse(event.data);

    // Si el mensaje es de tipo PasarTurno, setea el turno actual
    if (message.type === 'PasarTurno') {
      setTurnoActual(message.turno);
    }

    // Si el mensaje es de tipo PartidaEliminada, elimina los datos de la partida 
    else if (message.type === 'PartidaEliminada') {
      borrarPartida();
      setFinalizado(true);
      return () => socket.close();
    }

    // Si el mensaje es de tipo AbandonarPartida, borra al jugador idJugador de la partida
    else if (message.type === 'AbandonarPartida') {
      const partida = obtenerPartidaEnCurso();
      partida.jugadores = partida.jugadores.filter((jugador: JugadorEnCurso) => jugador.id !== message.data.idJugador);
      borrarPartida();
      guardarPartidaEnCurso(partida);
      setPartida(partida);
    }

    // Si el mensaje es de tipo MovimientoParcial setea la carta recibida
    else if (message.type === 'MovimientoParcial') {
      const newCarta = new CartaMovimiento(message.data.carta.id, message.data.carta.movimiento);
      const newMovimiento = new Movimiento(newCarta, message.data.fichas[0], message.data.fichas[1]);
      setMovimiento(newMovimiento);
      setMovimientoAgregado(true);
    }
  }
};

export default ObtenerMensajes;
