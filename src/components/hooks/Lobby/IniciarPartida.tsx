import axios from "axios";

// Llama a la API para iniciar la partida
const iniciarPartida = async (idPartida:number, idJugador: number) => {
    try {
      const url = `http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`;
      const response = await axios.post(url);
      if ((response.status !== 200)) throw new Error("Error iniciando el juego");
    } catch (error) {
      console.error("Error iniciando el juego:", error);
    }
};

export default iniciarPartida;