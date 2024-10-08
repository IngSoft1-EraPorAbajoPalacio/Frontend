import axios from "axios";

export const HandleAbandono = (id_Partida: number, id_Jugador: number) => {

    
    const asyncDelete = async () => {
        try {           
            console.log(id_Jugador, id_Partida);
            const url = `http://127.0.0.1:8000/partida/${id_Partida}/jugador/${id_Jugador}`;
            const response = await axios.delete(url, {
                headers: {
                    'Content-Type': 'application/json',
                }});
            
            if (response.status === 202) {                            
                console.log('Jugador con id ' + id_Jugador + 'ha abandonado exitosamente la partida');
            } else {
                throw new Error("Error al abandonar");
            }
        } catch (error) {
            console.error(error);
        }
    }
    asyncDelete();
};