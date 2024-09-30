import { useEffect } from 'react';
import { Partida } from '../../types/partidaListada';
import { socket } from './sockets';
export const ObtenerPartidaNueva = (setPartidas: React.Dispatch<React.SetStateAction<Partida[]>>) => {
  useEffect(() => {
    socket.onmessage = (event) => {
      console.log(event);
      const message = JSON.parse(event.data);
      if (message.type === 'AgregarPartida') {
        const partida = new Partida(
          message.data.idPartida,
          message.data.nombrePartida,
          message.data.cantJugadoresMin,
          message.data.cantJugadoresMax
        );
        setPartidas((partidas) => {
          if (!partidas.some(p => p.id === partida.id)) {
            return [...partidas, partida];
          }
          return partidas;
        });
      }
    };

  }, [setPartidas]);
};