import { Partida } from "../../../types/partidaListada";
import socket from "../../../services/sockets";

// Escucha los mensajes del servidor para agregar o eliminar una partida
const ObtenerMensajes = (setPartidas: React.Dispatch<React.SetStateAction<Partida[]>>) => {
  socket.onmessage = (event: any) => {
    const message = JSON.parse(event.data);
    if (message.type === 'AgregarPartida') {
      const partida = new Partida(
        message.data.idPartida,
        message.data.nombrePartida,
        message.data.cantJugadoresMin,
        message.data.cantJugadoresMax,
      );
      setPartidas((partidas) => {
        if (!partidas.some(p => p.id === partida.id)) {
          return [...partidas, partida];
        }
        return partidas;
      });
    } else if (message.type === 'EliminarPartida') {
      setPartidas((partidas) => partidas.filter(p => p.id !== message.data.id));
    }
  };
};

export default ObtenerMensajes;