import { SetStateAction } from "react"
import { Partida, idJugadores, cantidadJugadores } from "../../types/partidaListada"
import axios from "axios"

const obtenerPartidas = async (setLista: React.Dispatch<SetStateAction<Partida[]>>) => {
    try {
      const url = "http://localhost:8000/partidas";
      const response = await axios.get(url);
  
      if ((response?.status !== 200) || (response?.data?.partidas === undefined)) {
        throw new Error("Error obteniendo la lista de partidas");
      } else {
        const dataPartidas = response?.data?.partidas.map((partida: { idPartida: idJugadores; nombrePartida: string; cantJugadoresMin: cantidadJugadores; cantJugadoresMax: cantidadJugadores}) => (
          new Partida(partida.idPartida, partida.nombrePartida, partida.cantJugadoresMin, partida.cantJugadoresMax)
        ));

        if (Array.isArray(dataPartidas)) {
          setLista(dataPartidas);
        } else {
          console.error("La respuesta no es un array:", dataPartidas);
          setLista([]);
        }
      }
    } catch (error) {
      console.error("Error obteniendo la lista de partidas:", error);
      setLista([]);
    }
  };

export default obtenerPartidas;
