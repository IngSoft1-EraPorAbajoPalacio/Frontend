import { socket } from "../../../hooks/sockets";
import { useEffect } from 'react';
import axios from "axios"

export const ListarJugadores = (
    setJugador: React.Dispatch<React.SetStateAction<{id: number, nombre: string}[]>>,
    setContador: React.Dispatch<React.SetStateAction<number>>
) => {
    useEffect(() => {
        socket.onmessage = (event) => {
            console.log(event);
            const message = JSON.parse(event.data);
            if (message.type === 'JugadorUnido') {
                setJugador(message.ListaJugadores);
                setContador(message.ListaJugadores.length);
            }
        };
    }, [setJugador, setContador]);
};

export const iniciarPartida = async (idPartida:number, idJugador: number) => {
    try {
      const url = `http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`;
      const response = await axios.patch(url);
      if ((response.status !== 202)) throw new Error("Error iniciando el juago");
    } catch (error) {
      console.error("Error iniciando el juago:", error);
    }
};
