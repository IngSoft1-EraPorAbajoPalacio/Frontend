import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Partida } from '../../types/partidaListada';

const url = 'ws://localhost:3000/';
export const socket = io(url);

export const ObtenerPartidaNueva = (setPartidas: React.Dispatch<React.SetStateAction<Partida[]>>) => {
  useEffect(() => {
    const handleAgregarPartida = (mensaje: any) => {
      const partida = new Partida(mensaje.idPartida, mensaje.nombrePartida, mensaje.cantJugadoresMin, mensaje.cantJugadoresMax);
      setPartidas((partidas) => {
        if (!partidas.some(p => p.id === partida.id)) {
          return [...partidas, partida];
        }
        return partidas;
      });
      setPartidas((partidas) => {
        if (!partidas.some(p => p.id === partida.id)) {
          return [...partidas, partida];
        }
        return partidas;
      });
    };

    socket.on('AgregarPartida', handleAgregarPartida);

  }, [socket]);
};
