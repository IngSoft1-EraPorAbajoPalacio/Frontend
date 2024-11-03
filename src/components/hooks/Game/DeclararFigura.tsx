import axios from "axios"

// Llama a la API para pasar declarar figura
const DeclararFigura = async(
    idPartida: number | null,
    idJugador: number | null,
    figuraGuardadaParaJuan: number,
    cartaFiguraDescarte: string | null,
    setMovimientosJugados: React.Dispatch<React.SetStateAction<number>>
) => {
    try {
        const url = `http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`;
        const data = {
            idCarta: Number(cartaFiguraDescarte),
            tipo_figura: figuraGuardadaParaJuan
        };
        const response = await axios.post(url, data);
        if ((response.status !== 202)) throw new Error("Hubo un problema tratando de jugando figura.");
        setMovimientosJugados(0);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 432) window.alert("Carta de figura inválida");
        else console.error(error);
    }
};

export default DeclararFigura;
