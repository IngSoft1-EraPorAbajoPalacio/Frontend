import { SetStateAction, useEffect, useState } from "react"
import { Partida, partidas, CantidadJugadores } from "../../types/partida"
import { mockData } from "../../data/mocking"
//import axios from "axios"

const obtenerPartidas = async (setLista: React.Dispatch<SetStateAction<Partida[]>>) => {
    try {
      // Simula una llamada a la API usando datos simulados
      const response = { status: 200, data: mockData };
  
      if (response?.status !== 200) {
        throw new Error("Error obteniendo la lista de partidas");
      } else {

        // Acede a la lista de "partidas" en la respuesta
        const dataPartidas = response.data.partidas;

        if (Array.isArray(dataPartidas)) {
          setLista(dataPartidas);
        } else {
          console.error("La respuesta no es un array:", dataPartidas);
          setLista([]); // Asegura que al menos se mantenga como un array vacío
        }
      }
    } catch (error) {
      console.error("Error obteniendo la lista de partidas:", error);
      setLista([]); // Inicializa como un array vacío en caso de error
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
            return new Partida(partida.idPartida, partida.nombrePartida, partida.cantJugadores as CantidadJugadores);
          });
      
          nuevasPartidas.forEach((partida) => {
            console.log(partida);
            partidas.push(partida); // Asegúrate de que `partidas` esté definido como array en otro lugar
          });
        }
      }, [Lista]);
}

export default obtenerListaPartidas;
