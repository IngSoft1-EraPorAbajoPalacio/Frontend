import axios from "axios"
import { Ficha } from "../../../types/partidaEnCurso";

// Llama a la API para pasar jugar movimiento
const JugarMovimiento = async(
  idPartida: number | null,
  idJugador: number | null,
  idCarta: number | null,
  primerPosicion: Ficha | null,
  segundaPosicion: Ficha | null 
) => {
  try {
    const url = `http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/jugar-movimiento`;
    const data = {
      idCarta: idCarta,
      posiciones: [
        {x: primerPosicion?.x, y: primerPosicion?.y},
        {x: segundaPosicion?.x, y: segundaPosicion?.y} 
      ]
    };
    const response = await axios.patch(url, data);
    if ((response.status !== 202)) throw new Error("Error jugando movimiento.");
    else {
        console.log("Movimiento jugado correctamente.");
    }
  } catch (error) {
    console.error("Error jugando movimiento:", error);
  }
};

export default JugarMovimiento;