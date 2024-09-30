import { useEffect } from 'react';
import { JugadorEnCurso, PartidaEnCurso } from '../../types/partidaEnCurso';
import { obtenerJugador, obtenerPartida, guardarPartidaEnCurso } from '../context/GameContext';

const obtenerDatosPartida = () => {
  useEffect(() => {
    // Crear una nueva conexión de WebSocket
    const socket = new WebSocket('ws://localhost:8000');

    // Función para manejar el inicio de la partida
    const handleIniciarPartida = (mensaje: any) => {
      const jugadores = mensaje.cartasFigura.map( ( mazo: {"idJugador": number, "nombreJugador": string, "cartas":[{"id": number, "figura": number}]} ) => {
        const jugador = (mazo.idJugador === obtenerJugador().id) ?
          new JugadorEnCurso(mazo.idJugador, mazo.nombreJugador, mazo.cartas, mensaje.cartasMovimiento, true, true) :
          new JugadorEnCurso(mazo.idJugador, mazo.nombreJugador, mazo.cartas, [], true, false);
        return jugador;
      });

      // Crear una nueva instancia de PartidaEnCurso
      const partida = new PartidaEnCurso(
        obtenerPartida().id, 
        obtenerPartida().nombre, 
        mensaje.orden.length, 
        jugadores, 
        mensaje.fichas, 
        mensaje.orden
      );
      guardarPartidaEnCurso(partida); // Guardar la partida en el contexto
    };

    // Manejar los mensajes recibidos a través del WebSocket
    socket.onmessage = (event) => {
      const mensaje = JSON.parse(event.data);
      if (mensaje.type === 'IniciarPartida') {
        handleIniciarPartida(mensaje);
      }
    };

    // Cerrar la conexión del WebSocket cuando el componente se desmonte
    return () => {
      socket.close();
    };
  }, []); // Solo se ejecuta una vez, cuando el componente se monta
};

export default obtenerDatosPartida;