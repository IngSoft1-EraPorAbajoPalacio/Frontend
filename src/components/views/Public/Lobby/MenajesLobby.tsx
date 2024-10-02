import { socket } from "../../../hooks/sockets";
import { useEffect } from 'react';
import axios from "axios"
import { JugadorEnCurso, PartidaEnCurso } from "../../../../types/partidaEnCurso";
import { obtenerJugador, obtenerPartida, guardarPartidaEnCurso, borrarJugadoresUnidos } from '../../../context/GameContext';

// Escucha los mensajes del servidor en el lobby
export const ListarJugadores = (
  setJugador: React.Dispatch<React.SetStateAction<{id: number, nombre: string}[]>>,
  setContador: React.Dispatch<React.SetStateAction<number>>,
  SetList: React.Dispatch<React.SetStateAction<boolean>>
) => {
  socket.onmessage = (event) => {
    console.log(event);
    const message = JSON.parse(event.data);
    // Si el mensaje es de tipo JugadorUnido, actualiza la lista de jugadores en el lobby
    if (message.type === 'JugadorUnido') {
      setJugador(message.ListaJugadores);
      setContador(message.ListaJugadores.length);
      borrarJugadoresUnidos();
    }
    // Si el mensaje es de tipo IniciarPartida, llama a la API para inicia la partida
    if (message.type === 'IniciarPartida') {
      SetList(true);
      handleIniciarPartida(message);
    }
  };
};

const handleIniciarPartida = (mensaje: any) => {

  // Obtener el id del jugador del contexto
  const idJugador = obtenerJugador().id;

  // Filtrar las cartas de movimiento del jugador
  const movimientos = mensaje.cartasMovimiento.filter(
    (mazo: {"idJugador": number, "nombreJugador": string, "cartas": [{"id": number, "movimiento": number}]}) => mazo.idJugador === idJugador);
  
  // Crea una nueva instancia de cada jugador de la partida
  const jugadores = mensaje.cartasFigura.map( ( mazo: {"idJugador": number, "nombreJugador": string, "cartas":[{"id": number, "figura": number}]} ) => {
    const jugador = (mazo.idJugador === idJugador) ?
      new JugadorEnCurso(mazo.idJugador, mazo.nombreJugador, mazo.cartas, movimientos, true, true) :
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

// Llama a la API para iniciar la partida
export const iniciarPartida = async (idPartida:number, idJugador: number) => {
    try {
      const url = `http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`;
      const response = await axios.post(url);
      if ((response.status !== 200)) throw new Error("Error iniciando el juego");
    } catch (error) {
      console.error("Error iniciando el juego:", error);
    }
};
