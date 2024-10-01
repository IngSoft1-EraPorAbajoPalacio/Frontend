import { socket } from "../../../hooks/sockets";
import { useEffect } from 'react';
import axios from "axios"
import { JugadorEnCurso, PartidaEnCurso } from "../../../../types/partidaEnCurso";
import { obtenerJugador, obtenerPartida, guardarPartidaEnCurso, borrarJugadoresUnidos } from '../../../context/GameContext';

export const ListarJugadores = (
    setJugador: React.Dispatch<React.SetStateAction<{id: number, nombre: string}[]>>,
    setContador: React.Dispatch<React.SetStateAction<number>>,
    SetList: React.Dispatch<React.SetStateAction<boolean>>
) => {
    useEffect(() => {
        socket.onmessage = (event) => {
            console.log(event);
            const message = JSON.parse(event.data);
            if (message.type === 'JugadorUnido') {
                setJugador(message.ListaJugadores);
                setContador(message.ListaJugadores.length);
                borrarJugadoresUnidos();
            }
            if (message.type === 'IniciarPartida') {
                SetList(true);
                handleIniciarPartida(message);
              }
        };
    }, [setJugador, setContador]);
};

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

export const iniciarPartida = async (idPartida:number, idJugador: number) => {
    try {
      const url = `http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`;
      const response = await axios.post(url);
      if ((response.status !== 200)) throw new Error("Error iniciando el juego");
    } catch (error) {
      console.error("Error iniciando el juego:", error);
    }
};
