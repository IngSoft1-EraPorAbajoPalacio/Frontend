import axios from "axios"
import { Movimiento } from "../../../types/partidaEnCurso";

// Llama a la API para pasar jugar movimiento
const JugarMovimiento = async(
  idPartida: number | null,
  idJugador: number | null,
  movimiento: Movimiento
) => {

    try {
        const url = `http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/jugar-movimiento`;
        const data = {
            idCarta: movimiento.carta.id,
            posiciones: [
                {x: movimiento.primerFicha?.x, y: movimiento.primerFicha?.y},
                {x: movimiento.segundaFicha?.x, y: movimiento.segundaFicha?.y}
            ]
        };
        const response = await axios.patch(url, data);
        if ((response.status !== 202)) throw new Error("Hubo un problema tratando de jugando movimiento.");
    } catch (error) {
        console.error(error);
    }
};

export default JugarMovimiento;