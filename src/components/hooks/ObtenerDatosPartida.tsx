import { useEffect } from 'react';
import { socket } from './ObtenerPartidaNueva';
import { JugadorEnCurso, PartidaEnCurso } from '../../types/partidaEnCurso';
//import { obtenerJugador, obtenerPartida, guardarPartidaEnCurso } from '../context/GameContext';
import { obtenerPartida, guardarPartidaEnCurso } from '../context/GameContext';

const obtenerDatosPartida = () => {    

  useEffect(() => {
    const handleIniciarPartida = (mensaje: any) => {
      const jugadores = mensaje.cartasFigura.map( ( mazo: {"idJugador": number, "nombreJugador": string, "cartas":[{"id": number, "figura": number}]} ) => {
        const jugador = (mazo.idJugador === 1) ? //Mockear contexto del jugador 
        //const jugador = (mazo.idJugador === obtenerJugador().id) ?
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