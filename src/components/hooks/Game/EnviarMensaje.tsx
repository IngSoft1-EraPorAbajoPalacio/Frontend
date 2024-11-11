import axios from "axios"


const EnviarMensaje = async( 
    idPartida: number | null,
    nombreJugador: string | null,
    mensaje: string ) => {

    try {
        const url = `http://localhost:8000/partida/${idPartida}/jugador/${nombreJugador}/mensaje`;
        const data = { mensaje: mensaje };
        const response = await axios.post(url, data);
        if ((response.status !== 202)) throw new Error("Hubo un problema para mandar mensaje del chat");
    } catch (error) {
        console.error(error);
    }
};

export default EnviarMensaje;