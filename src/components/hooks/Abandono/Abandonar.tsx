import axios from "axios";

export const HandleAbandono = (idPartida: number, idJugador: number) => {

    
    const asyncDelete = async () => {
        try {           
            const url = `http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}`;
            const response = await axios.delete(url, {
                headers: {
                    'Content-Type': 'application/json',
                }});
            
            if (response.status !== 202) {                            
                throw new Error("Error al abandonar");
            }
        } catch (error) {
            console.error(error);
        }
    }
    asyncDelete();
};