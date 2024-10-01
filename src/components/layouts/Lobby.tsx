import { ListarJugadores, iniciarPartida } from "../views/Public/Lobby/MenajesLobby";
import { obtenerJugador, obtenerPartida } from "../context/GameContext";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Lobby.css';

function Lobby() {
  const partida = obtenerPartida();
  const jugador = obtenerJugador();
  const [jugadores, setJugadores] = useState<{ id: number, nombre: string }[]>([]);
  const [CantidadJugadores, setCantidadJugadores] = useState<number>(1);
  const navigate = useNavigate();

  ListarJugadores(setJugadores, setCantidadJugadores);

  const handleIniciarPartida = () => {
    navigate('/game');
    iniciarPartida(partida.id, jugador.id);
  };

  return (
    <div className="lobby-container">
      <h1 className="lobby-title">{partida.nombre}</h1>
      <p className="lobby-subtitle">Esperando a jugadores...</p>
      <ul className="lobby-list">
        {jugadores.map((jugadorListado) => (
          <li key={jugadorListado.id} className="lobby-list-item">
            <p>{jugadorListado.nombre}</p>
          </li>
        ))}
      </ul>
      {jugador.isHost && CantidadJugadores >= 2 && (
        <button className="lobby-button" onClick={handleIniciarPartida}>Iniciar Partida</button>
      )}
    </div>
  );
}

export default Lobby;