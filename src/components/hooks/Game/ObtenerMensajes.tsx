import { useEffect } from 'react';
import { borrarPartidaEnCurso, obtenerJugador } from "../../context/GameContext";// Adjust the import paths as needed
import { PartidaEnCurso, JugadorEnCurso } from "../../../types/partidaEnCurso"; // Your types/interfaces

export const ObtenerMensajes = (
  setTurnoActual: React.Dispatch<React.SetStateAction<number | null>>,
  setPartida: React.Dispatch<React.SetStateAction<PartidaEnCurso | null>>,
  partidaActual: PartidaEnCurso | null,
  redirectToEnd: (idPartida: number, idJugador: number) => void,
  socket: any
) => {
  
  const jugadorRestante = obtenerJugador().id;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);

      if (message.type === 'PasarTurno') {
        setTurnoActual(message.turno);

      } else if (message.type === 'PartidaEliminada') {
        borrarPartidaEnCurso();
        redirectToEnd(message.data.idPartida, jugadorRestante);
        
      } else if (message.type === "AbandonarPartida") {
        const jugadorAbandonaId = message.data.idJugador; 
                        
                        
        if (partidaActual) { 
          const nuevaPartida: PartidaEnCurso = {
            ...partidaActual,
            jugadores: partidaActual.jugadores.filter((jugador: JugadorEnCurso) => jugador.id !== jugadorAbandonaId),
          };

          setPartida(nuevaPartida);
        }
      }
    };

    socket.onmessage = handleMessage;

    return () => {
      socket.onmessage = null;
    };
  }, [partidaActual, setTurnoActual, setPartida, redirectToEnd]);
};


export default ObtenerMensajes;