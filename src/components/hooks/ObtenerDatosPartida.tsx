import { useEffect } from 'react';
import { socket } from './ObtenerPartidaNueva';
import { idJugadores } from '../../types/partidaListada';
import { JugadorEnCurso, PartidaEnCurso } from '../../types/partidaEnCurso';
import { obtenereJugador, obtenerPartida, guardarPartidaEnCurso } from '../context/GameContext';

const obtenerDatosPartida = () => {    

  useEffect(() => {
    const handleIniciarPartida = (mensaje: any) => {
      const jugadores = mensaje.cartasFigura.map( ( mazo: {"idJugador": idJugadores, "nombreJugador": string, "cartas":[{"id": number, "figura": number}]} ) => {
        //const jugador = (mazo.idJugador === 3) ? //Mockear contexto del jugador 
        const jugador = (mazo.idJugador === obtenereJugador().id) ?
          new JugadorEnCurso(mazo.idJugador, mazo.nombreJugador, mazo.cartas, mensaje.cartasMovimiento, true, true) :
          new JugadorEnCurso(mazo.idJugador, mazo.nombreJugador, mazo.cartas, [], true, false);
        return jugador;
      });

      const partida = new PartidaEnCurso(obtenerPartida().id, obtenerPartida().nombre, mensaje.orden.length, jugadores, mensaje.fichas, mensaje.orden);
      guardarPartidaEnCurso(partida);
    };

    socket.on('IniciarPartida', handleIniciarPartida);

    return () => {
      socket.off('IniciarPartida', handleIniciarPartida);
    };
  }, [socket]);
};

export default obtenerDatosPartida;
