import { Partida } from "../../../types/partidaListada";
import axios from "axios";

const obtenerPartidas = async (setLista: React.Dispatch<React.SetStateAction<Partida[]>>) => {
    try {
        const url = "http://localhost:8000/partidas";
        const response = await axios.get(url);
        if (response?.status !== 200 || !Array.isArray(response?.data)) {
            throw new Error("Hubo un problema tratando de obtener la lista de partidas disponibles");
        } else {
            const dataPartidas = response.data.map((partida) => 
                new Partida(
                    partida.id_partida,
                    partida.nombre_partida,
                    partida.cant_min_jugadores,
                    partida.cant_max_jugadores,
                    partida.privada === undefined ? false : partida.privada
                )
            );
            setLista(dataPartidas);
        }
    } catch (error) {
        console.error(error);
        setLista([]);
    }
};

export default obtenerPartidas;
