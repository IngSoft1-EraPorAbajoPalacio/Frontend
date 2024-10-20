import axios from "axios"
import { CartaMovimiento } from "../../../types/partidaEnCurso";

// Llama a la API para pasar jugar movimiento
const DeshacerMovimientos = async(
  idPartida: number | null,
  idJugador: number | null,
  setManoMovimiento: React.Dispatch<React.SetStateAction<CartaMovimiento[]>>
) => {

    try {
        const url = `http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimientos`;
        const response = await axios.patch(url);

        if ((response.status !== 202)) throw new Error("Hubo un problema tratando de reponer la mano de movimientos.");

        setManoMovimiento((manoMovimiento: CartaMovimiento[]) => {
            return [...manoMovimiento, ...response.data.cartas];
        });
        
    } catch (error) {
        console.error(error);
    }
};

export default DeshacerMovimientos;