import axios from "axios"

// Llama a la API para pasar jugar movimiento
const DeshacerMovimiento = async(
  idPartida: number | null,
  idJugador: number | null,
) => {

    try {
        const url = `http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimiento`;
        const response = await axios.patch(url);

        if ((response.status !== 202)) throw new Error("Hubo un problema tratando de deshacer el movimiento jugado.");

        const carta = response.data.carta[0];

        return carta;

    } catch (error) {
        console.error(error);
    }
};

export default DeshacerMovimiento;