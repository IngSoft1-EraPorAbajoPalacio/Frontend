import socket from "../../../services/sockets";
import { CartaMovimiento, Movimiento } from "../../../types/partidaEnCurso";

// Escucha los mensajes del servidor para pasar el turno
const ObtenerMensajes = (
  setTurnoActual: React.Dispatch<React.SetStateAction<number|null>>,
  setMovimientos: React.Dispatch<React.SetStateAction<Movimiento[]>>,
  setMovimientoAgregado: React.Dispatch<React.SetStateAction<boolean>>
) => {    
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'PasarTurno') {
      setTurnoActual(message.turno);
    } else if (message.type === 'TerminarPartida') {
      //navigate(Paths.End);
    } else if (message.type === 'MovimientoParcial') {
      setMovimientoAgregado(true);
      setMovimientos((movimientos: Movimiento[]) => {
        const newCarta = new CartaMovimiento(message.carta.id, message.carta.movimiento);
        const newMovimiento = new Movimiento(newCarta, message.ficha[0], message.ficha[1]);
        return [...movimientos, newMovimiento]
      });
    }
      
  }
};

export default ObtenerMensajes;