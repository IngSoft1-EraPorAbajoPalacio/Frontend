import axios from "axios"

// Llama a la API para pasar de turno
const PasarTurno = async (idPartida: number | null, idJugador: number | null) => {
  try {
    const url = `http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`;
    const response = await axios.patch(url);
    if ((response.status !== 202)) throw new Error("Error pasando de turno");
  } catch (error) {
    console.error("Error pasando de turno:", error);
  }
};

export default PasarTurno;