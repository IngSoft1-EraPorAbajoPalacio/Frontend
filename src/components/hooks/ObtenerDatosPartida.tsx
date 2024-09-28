import { useEffect } from 'react';
import socket from './ObtenerPartidaNueva';
import { Partida } from '../../types/partidaListada';

const useSocketPartidas = (setPartidas: React.Dispatch<React.SetStateAction<Partida[]>>) => {
  useEffect(() => {
    const handleAgregarPartida = (mensaje: any) => {
      const partida = new Partida(mensaje.idPartida, mensaje.nombrePartida, mensaje.cantJugadoresMin, mensaje.cantJugadoresMax);
      setPartidas((partidas) => [...partidas, partida]);
    };

    socket.on('IniciarPartida', handleAgregarPartida);

    return () => {
      socket.off('IniciarPartida', handleAgregarPartida);
    };
  }, [setPartidas]);
};

export default useSocketPartidas;
