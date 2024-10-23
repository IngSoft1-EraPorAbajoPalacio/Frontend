import { borrarJugadoresUnidos, guardarFichasTablero, borrarPartida, guardarMovimientos, guardarJugador1, guardarJugador2, guardarJugador3, guardarFiguraJugador1, guardarFiguraJugador2, guardarFiguraJugador3, guardarFiguraJugador4, guardarJugador4 } from '../../context/GameContext';
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
        const nuevosJugadores = antiguosJugadores.filter((player) => (Number(player.id) !== Number(message.data.idJugador)));
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
  guardarMovimientos(cartasMovimiento);

  const cantJugadores = mensaje.orden.length;

  // Guarda los jugadores en el contexto
  guardarJugador1(new JugadorEnCurso(mensaje.cartasFigura[0].idJugador, mensaje.cartasFigura[0].nombreJugador, true, mensaje.cartasFigura[0].idJugador === idJugador));
  guardarJugador2(new JugadorEnCurso(mensaje.cartasFigura[1].idJugador, mensaje.cartasFigura[1].nombreJugador,  true, mensaje.cartasFigura[1].idJugador === idJugador));
  (cantJugadores > 2) ? guardarJugador3(new JugadorEnCurso(mensaje.cartasFigura[2].idJugador, mensaje.cartasFigura[2].nombreJugador, true, mensaje.cartasFigura[2].idJugador === idJugador)) : null;
  (cantJugadores > 3) ? guardarJugador4(new JugadorEnCurso(mensaje.cartasFigura[3].idJugador, mensaje.cartasFigura[3].nombreJugador, true, mensaje.cartasFigura[3].idJugador === idJugador)) : null;

  // Guardar las figuras en el contexto
  const cartaJugador1 = mensaje.cartasFigura[0].cartas;
  const cartaJugador2 = mensaje.cartasFigura[1].cartas;
  const cartaJugador3 = (cantJugadores > 2) ? mensaje.cartasFigura[2].cartas : [];
  const cartaJugador4 = (cantJugadores > 3) ? mensaje.cartasFigura[3].cartas : [];

  guardarFiguraJugador1(cartaJugador1);
  guardarFiguraJugador2(cartaJugador2);
  guardarFiguraJugador3(cartaJugador3);
  guardarFiguraJugador4(cartaJugador4);
  
  // Crear una nueva instancia de PartidaEnCurso
  const partida = new PartidaEnCurso(
    idPartida, 
    obtenerPartida().nombre, 
    mensaje.orden.length, 
    mensaje.orden
  );

  // Guardar la partida en el contexto
  guardarPartidaEnCurso(partida);
  guardarFichasTablero(mensaje.fichas);

};

export default ObtenerMensajes;