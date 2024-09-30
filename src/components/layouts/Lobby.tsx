import { ListarJugadores, iniciarPartida } from "../views/Public/Lobby/MenajesLobby";
import { obtenerJugador, obtenerPartida } from "../context/GameContext";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Lobby () {

  const partida = obtenerPartida();
  const jugador = obtenerJugador();
  const [jugadores, setJugadores] = useState<{id: number, nombre: string}[]>([]);
  const [CantidadJugadores, setCantidadJugadores] = useState<number>(1);
  const navigate = useNavigate();


  ListarJugadores(setJugadores, setCantidadJugadores);

  const handleIniciarPartida = () => {
    navigate('/game');
    iniciarPartida(partida.id, jugador.id);
  };
  
  return (
    <div>
      <h1>{partida.nombre}</h1>
      <p> Esperando a jugadores...</p>
      <ul>
        {jugadores.map((jugadorListado) => (
          <li key={jugadorListado.id}><p> {jugadorListado.nombre}</p></li>
        ))}
      </ul>
      {(CantidadJugadores >= 2 && jugador.isHost) ?
        <button onClick={handleIniciarPartida}> Iniciar Partida</button> : null
      }
    </div>
  )
}

export default Lobby;
