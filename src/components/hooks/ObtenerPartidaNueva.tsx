import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { Partida } from '../../types/partida';

const url = 'ws://localhost:8000';
const socket = io(url);

const useSocketPartidas = (setPartidas: React.Dispatch<React.SetStateAction<Partida[]>>) => {
  useEffect(() => {
    const handleAgregarPartida = (mensaje: any) => {
      const partida = new Partida(mensaje.idPartida, mensaje.nombrePartida, mensaje.cantJugadoresMin, mensaje.cantJugadoresMax);
      setPartidas((partidas) => [...partidas, partida]);
    };

    socket.on('AgregarPartida', handleAgregarPartida);

    return () => {
      socket.off('AgregarPartida', handleAgregarPartida);
    };
  }, [setPartidas]);
};

export default useSocketPartidas;
