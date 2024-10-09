import socket from "../../../services/socketGame";

// Escucha los mensajes del servidor para pasar el turno
const ObtenerMensajes = (setTurnoActual: React.Dispatch<React.SetStateAction<number|null>>) => {    
  socket.onmessage = (event: any) => {
    const message = JSON.parse(event.data);
    if (message.type === 'PasarTurno') {
      setTurnoActual(message.turno);
    } else if (message.type === 'TerminarPartida') {
      //navigate(Paths.End);
    }
  }
};

export default ObtenerMensajes;