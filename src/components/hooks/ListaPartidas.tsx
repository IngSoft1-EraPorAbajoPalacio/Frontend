import { SetStateAction, useEffect, useState } from "react"
import { Partida, partidas, CantidadJugadores } from "../../types/partida"
//import { urlBase } from "../../services/url";
import { useWebSocket } from "../../services/WebSocketContext";
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

        // Acede a la lista de "partidas" en la respuesta
        const dataPartidas = response.data.partidas;

        if (Array.isArray(dataPartidas)) {
          const partidasFormateadas = dataPartidas.map((partida) => 
            new Partida(partida.idPartida, partida.nombrePartida, partida.cantJugadores as CantidadJugadores)
          );
          setLista(partidasFormateadas);
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

  const webSocketContext = useWebSocket();
  const event = webSocketContext ? webSocketContext.event : null;
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
        partidas.push(partida); 
      });
    }
  }, [Lista]);

  useEffect(() => {
    const type = event ? JSON.parse(event)?.type : null;
    if (type === "agregarPartida" && event) {
      const data = JSON.parse(event)?.data;
      const nuevaPartida = new Partida(data.idPartida, data.nombrePartida, data.cantJugadores as CantidadJugadores);
      console.log(nuevaPartida);
      partidas.push(nuevaPartida);
    }
  }, [event])
}

export default obtenerListaPartidas;
