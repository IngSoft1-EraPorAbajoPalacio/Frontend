import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Partida } from '../../types/partida';

const url = 'http://localhost:3000/';
const socket = io(url);

const useSocketPartidas = (setPartidas: React.Dispatch<React.SetStateAction<Partida[]>>) => {
  useEffect(() => {
    const handleAgregarPartida = (mensaje: any) => {
      const partida = new Partida(mensaje.idPartida, mensaje.nombrePartida, mensaje.cantJugadoresMin, mensaje.cantJugadoresMax);
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

export default useSocketPartidas;
