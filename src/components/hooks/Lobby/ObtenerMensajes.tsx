import socket from "../../../services/socketLobby";
import { borrarJugadoresUnidos } from '../../context/GameContext';
import { guardarPartidaEnCurso, obtenerPartida } from '../../context/GameContext';
import { JugadorEnCurso, PartidaEnCurso } from '../../../types/partidaEnCurso';

// Escucha los mensajes del servidor en el lobby
const ObtenerMensajes = (
  setJugador: React.Dispatch<React.SetStateAction<{id: number, nombre: string}[]>>,
  setContador: React.Dispatch<React.SetStateAction<number>>,
  setPartidaIniciada: React.Dispatch<React.SetStateAction<boolean>>,
  idJugador: number,
  idPartida: number
) => {
  socket.onmessage = (event: any) => {
    const message = JSON.parse(event.data);
    // Si el mensaje es de tipo JugadorUnido, actualiza la lista de jugadores en el lobby
    if (message.type === 'JugadorUnido') {
      setJugador(message.ListaJugadores);
      setContador(message.ListaJugadores.length);
    }
    // Si el mensaje es de tipo IniciarPartida, llama a la API para inicia la partida
    else if (message.type === 'IniciarPartida') {
      setPartidaIniciada(true);
      handleIniciarPartida(message, idJugador, idPartida);
      borrarJugadoresUnidos();
    }
  };
};

const handleIniciarPartida = (mensaje: any, idJugador: number, idPartida: number) => {

  // Filtrar las cartas de movimiento del jugador
  const manoMovimiento = mensaje.cartasMovimiento.filter(
  (mazo: {"idJugador": number, "nombreJugador": string, "cartas": [{"id": number, "movimiento": number}]}) => mazo.idJugador === idJugador);

  const cartasMovimiento = manoMovimiento.length > 0 ? manoMovimiento[0].cartas : [];
  
  // Crea una nueva instancia de cada jugador de la partida
  const jugadores = mensaje.cartasFigura.map( ( mazo: {"idJugador": number, "nombreJugador": string, "cartas": [{"id": number, "figura": number}]} ) =>
    (mazo.idJugador === idJugador) ?
      new JugadorEnCurso(idJugador, mazo.nombreJugador, mazo.cartas, cartasMovimiento, true, true) :
      new JugadorEnCurso(mazo.idJugador, mazo.nombreJugador, mazo.cartas, [], true, false)
  );

  // Crear una nueva instancia de PartidaEnCurso
  const partida = new PartidaEnCurso(
    idPartida, 
    obtenerPartida().nombre, 
    mensaje.orden.length, 
    jugadores, 
    mensaje.fichas, 
    mensaje.orden
  );

  // Guardar la partida en el contexto
  guardarPartidaEnCurso(partida);

};

export default ObtenerMensajes;