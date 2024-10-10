import socket from "../../../services/sockets";
import { useEffect } from 'react';
import { borrarPartidaEnCurso, obtenerJugador } from "../../context/GameContext";// Adjust the import paths as needed
import { PartidaEnCurso, JugadorEnCurso } from "../../../types/partidaEnCurso"; // Your types/interfaces

export const ObtenerMensajes = (
  setTurnoActual: React.Dispatch<React.SetStateAction<number | null>>,
  setPartida: React.Dispatch<React.SetStateAction<PartidaEnCurso | null>>,
  partidaActual: PartidaEnCurso | null,
  redirectToEnd: (idPartida: number, idJugador: number) => void
) => {
  
  const jugadorRestante = obtenerJugador().id;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);

      if (message.type === 'PasarTurno') {
        console.log("Handling 'PasarTurno'");
        setTurnoActual(message.turno);

      } else if (message.type === 'TerminarPartida') {
        console.log("Handling 'TerminarPartida'");
        window.alert(`No quedan más jugadores en la partida`);
        borrarPartidaEnCurso();
        redirectToEnd(message.data.idPartida, jugadorRestante);
        
      } else if (message.type === "AbandonarPartida") {
        console.log("Handling 'AbandonarPartida'");
        const jugadorAbandonaId = message.data.idJugador; 
        let nombreJug = "";
                
        if (partidaActual) { 
              const nuevaPartida: PartidaEnCurso = {
                ...partidaActual,
                jugadores: partidaActual.jugadores.filter((jugador: JugadorEnCurso) => jugador.id !== jugadorAbandonaId),
            };

        const jugadorAbandona = partidaActual.jugadores.find(
            (jugador: JugadorEnCurso) => jugador.id === jugadorAbandonaId
        );

        if (jugadorAbandona) nombreJug = jugadorAbandona.nombre;
          
          setPartida(nuevaPartida);
        }
        window.alert(`${nombreJug} ha abandonado la partida`);
      }
    };

    socket.onmessage = handleMessage;

    return () => {
      socket.onmessage = null;
    };
  }, [partidaActual, setTurnoActual, setPartida, redirectToEnd]);
};


export default ObtenerMensajes;