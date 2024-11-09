import axios from "axios"
import { CartaMovimiento } from "../../../types/partidaEnCurso";

// Llama a la API para pasar jugar movimiento
const DeshacerMovimientos = async(
  idPartida: number | null,
  idJugador: number | null,
  setManoMovimiento: React.Dispatch<React.SetStateAction<CartaMovimiento[] | null>>
) => {

    try {
        const url = `http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimientos`;
        const response = await axios.patch(url);

        if ((response.status !== 202)) throw new Error("Hubo un problema tratando de reponer la mano de movimientos.");

        if (response.data.cartas && response.data.cartas.length > 0) {
            setManoMovimiento((manoMovimiento: CartaMovimiento[] | null) => {
                if (!manoMovimiento) return response.data.cartas;
                return [...manoMovimiento, ...response.data.cartas];
            });
        }
        
    } catch (error) {
        console.error(error);
    }
};

export default DeshacerMovimientos;