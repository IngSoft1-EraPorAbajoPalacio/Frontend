import { io } from "socket.io-client";
import { Jugador } from "../../../../types/partidaListada";
import { useState, useEffect } from 'react';
import '../../../../styles/Lobby.css'
import { socket } from "../../../hooks/ObtenerPartidaNueva";

export default function ListarJugadores ({ incrJugs, decrJugs }: { incrJugs: () => void, decrJugs: () => void }) {
    const [Players, setPlayers] = useState<Jugador[]>([]);
    const [isConnected, setIsConnected] = useState(false);
  
    useEffect(() => {
      socket.on('connect', () => setIsConnected(true));

      socket.on('JugadorUnido', (data) => {
        console.log(data);
        setPlayers(data.playerList);
        incrJugs();
      });

      socket.on('EliminarJugador', (data) => {
        setPlayers(data.playerList);
        decrJugs();
      });
  
      return () => {
        socket.off('JugadorUnido'); 
        socket.off('EliminarJugador');
      };
    }, [incrJugs, decrJugs]);

    return (
      <>
      <h2>{isConnected ? 'CONECTADO' : 'NO CONECTADO'}</h2>
        <ul>
            {Players.map(player =>
                <li key={player.id}>
                    {player.nombre} 
                </li>
            )}
        </ul>
        </>
    )
} 