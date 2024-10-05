import socket from "../../../services/sockets";
import { borrarJugadoresUnidos } from '../../context/GameContext';
import { guardarPartidaEnCurso, obtenerJugador, obtenerPartida } from '../../context/GameContext';
import { JugadorEnCurso, PartidaEnCurso } from '../../../types/partidaEnCurso';

// Escucha los mensajes del servidor en el lobby
const ObtenerMensajesLobby = (
  setJugador: React.Dispatch<React.SetStateAction<{id: number, nombre: string}[]>>,
  setContador: React.Dispatch<React.SetStateAction<number>>,
  SetList: React.Dispatch<React.SetStateAction<boolean>>
) => {
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    // Si el mensaje es de tipo JugadorUnido, actualiza la lista de jugadores en el lobby
    if (message.type === 'JugadorUnido') {
      setJugador(message.ListaJugadores);
      setContador(message.ListaJugadores.length);
      borrarJugadoresUnidos();
    }
    // Si el mensaje es de tipo IniciarPartida, llama a la API para inicia la partida
    if (message.type === 'IniciarPartida') {
      SetList(true);
      handleIniciarPartida(message);
    }
  };
};

const handleIniciarPartida = (mensaje: any) => {

  // Obtener el id del jugador del contexto
  const idJugador = obtenerJugador().id;

  // Filtrar las cartas de movimiento del jugador
  const movimientos = mensaje.cartasMovimiento.filter(
    (mazo: {"idJugador": number, "nombreJugador": string, "cartas": [{"id": number, "movimiento": number}]}) => mazo.idJugador === idJugador);
  
  // Crea una nueva instancia de cada jugador de la partida
  const jugadores = mensaje.cartasFigura.map( ( mazo: {"idJugador": number, "nombreJugador": string, "cartas":[{"id": number, "figura": number}]} ) => {
    const jugador = (mazo.idJugador === idJugador) ?
      new JugadorEnCurso(mazo.idJugador, mazo.nombreJugador, mazo.cartas, movimientos, true, true) :
      new JugadorEnCurso(mazo.idJugador, mazo.nombreJugador, mazo.cartas, [], true, false);
    return jugador;
  });

  // Crear una nueva instancia de PartidaEnCurso
  const partida = new PartidaEnCurso(
    obtenerPartida().id, 
    obtenerPartida().nombre, 
    mensaje.orden.length, 
    jugadores, 
    mensaje.fichas, 
    mensaje.orden
  );
  guardarPartidaEnCurso(partida); // Guardar la partida en el contexto

};

export default ObtenerMensajesLobby;