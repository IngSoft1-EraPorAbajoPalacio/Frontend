import { Partida } from "../../../types/partidaListada";
import { guardarPartida } from "../../utils/Home/GuardarPartida";

// Escucha los mensajes del servidor para agregar o eliminar una partida
const ObtenerMensajes = (
  setPartidas: React.Dispatch<React.SetStateAction<Partida[]>>,
  actualizarPartidaActiva: (PartidaActiva: Partida) => void,
  socket: any) => {
  socket.onmessage = (event: any) => {
    const message = JSON.parse(event.data);

    // Si el mensaje es de tipo PartidaIniciada, guarda la partida activa
    if (message.type === 'PartidaIniciada') {
      const partida = guardarPartida(message);
      actualizarPartidaActiva(partida);
    }

    // Si el mensaje es de tipo AgregarPartida, guarda la partida en la lista de partidas
    if (message.type === 'AgregarPartida') {
      const nuevaPartida: Partida = guardarPartida(message);
      setPartidas((partidas: Partida[]) => {
        if (!partidas.some(p => p.id === nuevaPartida.id)) {
          return [...partidas, nuevaPartida];
        }
        return partidas;
      });
    }
    
    // Si el mensaje es de tipo PartidaEliminada, borra la partida de la lista de partidas
    if (message.type === 'PartidaEliminada' || message.type === "PartidaFinalizada") {
      setPartidas((partidas) => partidas.filter(p => p.id !== message.data.idPartida));
    }
  };
};

export default ObtenerMensajes;