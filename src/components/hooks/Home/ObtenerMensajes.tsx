import { Partida } from "../../../types/partidaListada";

// Escucha los mensajes del servidor para agregar o eliminar una partida
const ObtenerMensajes = (setPartidas: React.Dispatch<React.SetStateAction<Partida[]>>, socket: any) => {
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
    } else if (message.type === 'AbandonarPartida') {
      console.log("Abandonar partida desde Home");
    }
  };
};

export default ObtenerMensajes;