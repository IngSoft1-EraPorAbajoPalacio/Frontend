import axios from "axios"
import showToast from "../../views/Public/Toast";
import { color } from "../../../types/partidaEnCurso";

// Llama a la API para pasar declarar figura
const DeclararFigura = async(
    idPartida: number | null,
    idJugador: number | null,
    figuraGuardadaParaJuan: number,
    cartaFiguraDescarte: string | null,
    color: color,
    setMovimientosJugados: React.Dispatch<React.SetStateAction<number>>
) => {
    try {
        const url = `http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`;
        const data = {
            idCarta: Number(cartaFiguraDescarte),
            tipo_figura: figuraGuardadaParaJuan,
            color: color
        };
        const response = await axios.post(url, data);

        // Si la respuesta es 202, se jugó la figura correctamente
        if (response.status === 202) setMovimientosJugados(0);

        // Si el axios lanza un error no se ejecuta el código de abajo (queda por robustez)

        // Si la respuesta es 432, la carta de figura es inválida
        else if (response.status === 432) showToast({ type: 'error', message: "Carta de figura inválida" });

        // Si la respuesta es 436, el jugador ya tiene una carta de figura bloqueada
        else if (response.status === 436) showToast({ type: 'error', message: "El jugador ya tiene una carta de figura bloqueada" });

        // Si la respuesta es otra, hubo un problema
        else throw new Error("Hubo un problema tratando de jugando figura.");

    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 432) showToast({ type: 'error', message: "Carta de figura inválida" });
        else if (axios.isAxiosError(error) && error.response?.status === 436) showToast({ type: 'error', message: "El jugador ya tiene una carta de figura bloqueada" });
        else console.error(error);
    }
};

export default DeclararFigura;
