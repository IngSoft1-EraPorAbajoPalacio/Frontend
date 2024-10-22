import axios from "axios";

// Llama a la API para iniciar la partida
const iniciarPartida = async (idPartida:number, idJugador: number) => {
    try {
      const url = `http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`;
      const response = await axios.post(url);
      if ((response.status !== 200)) throw new Error("Hubo un problema tratando de iniciar el juego");
    } catch (error) {
      console.error(error);
    }
};

export default iniciarPartida;