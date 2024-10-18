import axios from "axios";

const AbandonarPartida = async (idPartida: number, idJugador: number) => {
    try {           
        const url = `http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}`;
        const response = await axios.delete(url);
        if (response.status !== 202) throw new Error("Hubo un problema tratando de abandonar la partida");
    } catch (error) {
        console.error(error);
    }
};

export default AbandonarPartida;