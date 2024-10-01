import { JugadorEnCurso, PartidaEnCurso } from '../../types/partidaEnCurso';
import { obtenerJugador, obtenerPartida, guardarPartidaEnCurso } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import { socket } from './sockets';
import { Paths } from '../../types/routes.types';

const obtenerDatosPartida = () => {
    const navigate = useNavigate();

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

      // Redirigir al juego
      navigate(Paths.Game);
    };

    // Manejar los mensajes recibidos a través del WebSocket
    socket.onmessage = (event) => {
      const mensaje = JSON.parse(event.data);
      if (mensaje.type === 'IniciarPartida') {
        handleIniciarPartida(mensaje);
      }
    };
};

export default obtenerDatosPartida;