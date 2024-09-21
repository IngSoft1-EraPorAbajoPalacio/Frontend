import { SetStateAction, useEffect, useState } from "react"
import { Partida, partidas } from "../../types/partida"
//import { urlBase } from "../../services/url";
//import axios from "axios"
import { mockData } from "../../data/MockAPI"

const obtenerPartidas = async (setLista: React.Dispatch<SetStateAction<Partida[]>>) => {
    try {
      //const url = `${urlBase}/partidas`;

      // Simula una llamada a la API usando datos simulados
      const response = { status: 200, data: mockData };

      // Simula una llamada a la API real
      //const response = await axios.get(url);
  
      if (response?.status !== 200) {
        throw new Error("Error obteniendo la lista de partidas");
      } else {

        const dataPartidas = response.data.partidas;

        if (Array.isArray(dataPartidas)) {
          const partidasFormateadas = dataPartidas.map((partida) => 
            new Partida(partida.id, partida.nombre)
          );
          setLista(partidasFormateadas);
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


function obtenerListaPartidas () {
  const [Lista, setLista] = useState<Partida[]>([])

  useEffect(() => {
    obtenerPartidas(setLista)
  }, [])
  
  useEffect(() => {
    if (Lista.length > 0) {
      const nuevasPartidas = Lista.map((partida) => {
        return new Partida(partida.id, partida.nombre);
      });
  
      nuevasPartidas.forEach((partida) => {
        partidas.push(partida); 
      });
    }
  }, [Lista]);

}

export default obtenerListaPartidas;
