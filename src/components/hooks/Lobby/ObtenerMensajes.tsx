import { borrarJugadoresUnidos, guardarFichasTablero, borrarPartida } from '../../context/GameContext';
import { guardarPartidaEnCurso, obtenerPartida } from '../../context/GameContext';
import { JugadorEnCurso, PartidaEnCurso } from '../../../types/partidaEnCurso';

// Escucha los mensajes del servidor en el lobby
const ObtenerMensajes = (
  setJugadores: React.Dispatch<React.SetStateAction<{id: number, nombre: string}[]>>,
  setContador: React.Dispatch<React.SetStateAction<number>>,
  setPartidaIniciada: React.Dispatch<React.SetStateAction<boolean>>,
  idJugador: number,
  idPartida: number,
  setCancelada: React.Dispatch<React.SetStateAction<boolean>>,
  socket : any
) => {
  socket.onmessage = (event: any) => {
    const message = JSON.parse(event.data);

    // Si el mensaje es de tipo JugadorUnido, actualiza la lista de jugadores en el lobby
    if (message.type === 'JugadorUnido') {
      setJugadores(message.ListaJugadores);
      setContador(message.ListaJugadores.length);
    }

    // Si el mensaje es de tipo IniciarPartida, llama a la API para inicia la partida
    else if (message.type === 'IniciarPartida') {
      setPartidaIniciada(true);
      handleIniciarPartida(message, idJugador, idPartida);
      borrarJugadoresUnidos();
    }
    
    // Si el mensaje es de tipo AbandonarPartida, actualiza la lista de jugadores en el lobby
    else if (message.type === 'AbandonarPartida') {
      setJugadores((antiguosJugadores: {id: number, nombre: string}[]) => {
        const nuevosJugadores = antiguosJugadores.filter((player) => player.id !== message.data.idJugador);
        return nuevosJugadores;
      });
      setContador((contador: number) => contador - 1);
    }
    // Si el mensaje es de tipo PartidaEliminada, redirecciona al usuario al Home
    else if (message.type === 'PartidaEliminada') {
      borrarPartida();
      setCancelada(true);
      return () => socket.close();
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
    mensaje.orden
  );

  // Guardar la partida en el contexto
  guardarPartidaEnCurso(partida);
  guardarFichasTablero(mensaje.fichas);

};

export default ObtenerMensajes;