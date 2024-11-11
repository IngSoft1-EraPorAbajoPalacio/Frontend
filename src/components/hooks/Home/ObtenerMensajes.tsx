import { Partida } from "../../../types/partidaListada";

// Escucha los mensajes del servidor para agregar o eliminar una partida
const ObtenerMensajes = (setPartidas: React.Dispatch<React.SetStateAction<Partida[]>>, socket: any) => {
  socket.onmessage = (event: any) => {
    const message = JSON.parse(event.data);

    // Si el mensaje es de tipo AgregarPartida, guarda la partida en la lista de partidas
    if (message.type === 'AgregarPartida') {
      const partida = new Partida(
        message.data.idPartida,
        message.data.nombrePartida,
        message.data.cantJugadoresMin,
        message.data.cantJugadoresMax,
        message.data.privada
      );
      setPartidas((partidas) => {
        if (!partidas.some(p => p.id === partida.id)) {
          return [...partidas, partida];
        }
        return partidas;
      });
    }
    
    // Si el mensaje es de tipo PartidaEliminada, borra la partida de la lista de partidas
    else if (message.type === 'PartidaEliminada' || message.type === "PartidaFinalizada") {
      setPartidas((partidas) => partidas.filter(p => p.id !== message.data.idPartida));
    }
  };
};

export default ObtenerMensajes;