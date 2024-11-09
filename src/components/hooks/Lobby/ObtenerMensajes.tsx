import { borrarJugadoresUnidos, borrarPartida } from '../../context/GameContext';

// Escucha los mensajes del servidor en el lobby
const ObtenerMensajes = (
  setJugadores: React.Dispatch<React.SetStateAction<{id: number, nombre: string}[]>>,
  setContador: React.Dispatch<React.SetStateAction<number>>,
  setPartidaIniciada: React.Dispatch<React.SetStateAction<boolean>>,
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
  }
};

export default ObtenerMensajes;