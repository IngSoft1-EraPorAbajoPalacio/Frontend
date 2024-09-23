import { SetStateAction } from "react"
import { Partida } from "../../types/partida"
//import axios from "axios"
import { mockData } from "../../data/MockAPI"

const obtenerPartidas = async (setLista: React.Dispatch<SetStateAction<Partida[]>>) => {
    try {
      //const url = 'http://localhost:5173/';

      // Simula una llamada a la API usando datos simulados
      const response = { status: 200, data: mockData };

      // Simula una llamada a la API real
      //const response = await axios.get(url);
  
      if (response?.status !== 200) {
        throw new Error("Error obteniendo la lista de partidas");
      } else {
        const dataPartidas = response.data.partidas;

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
