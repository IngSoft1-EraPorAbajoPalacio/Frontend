import axios from "axios"
import { Coord } from "../../../types/figura";

// Llama a la API para pasar jugar movimiento
const DeclararFigura = async(
    idPartida: number | null,
    idJugador: number | null,
    fichasParaJuan: Coord[],
    figuraGuardadaParaJuan: number,
    cartaFiguraDescarte: string | null,
) => {
    try {
        const url = `http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`;
        const data = {
            idCarta: Number(cartaFiguraDescarte),
            fichas: fichasParaJuan,
            tipo_figura: figuraGuardadaParaJuan
        };
        const response = await axios.post(url, data);
        if ((response.status !== 202)) throw new Error("Hubo un problema tratando de jugando figura.");
    } catch (error) {
        console.error(error);
    }
};

export default DeclararFigura;
