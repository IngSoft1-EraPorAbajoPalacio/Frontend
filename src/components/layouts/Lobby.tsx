import iniciarPartida from '../hooks/Lobby/IniciarPartida';
import ObtenerMensajes from '../hooks/Lobby/ObtenerMensajes';
import { obtenerJugador, obtenerPartida, obtenerJugadoresUnidos } from '../context/GameContext';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Jugador , Partida } from '../../types/partidaListada';
import '../../styles/Lobby/Lobby.css';
import useRouteNavigation from '../routes/RouteNavigation';
import createSocketLobby from '../../services/socketLobby';
import AbandonarPartida from '../hooks/AbandonarPartida';

function Lobby() {
  const [jugadores, setJugadores] = useState<{ id: number, nombre: string }[]>(obtenerJugadoresUnidos());
  const [CantidadJugadores, setCantidadJugadores] = useState<number>(1);
  const [partidaEnCurso, setPartidaEnCurso] = useState(false);
  const [jugador, setJugador] = useState<Jugador>();
  const [partida, setPartida] = useState<Partida>();
  const [newSocket, setSocket] = useState<WebSocket | null>(null);

  const { redirectToGame, redirectToNotFound, redirectToHome } = useRouteNavigation();
  const { gameId, playerId } = useParams<{ gameId: string; playerId: string }>();
  const idJugador = Number(playerId);
  const idPartida = Number(gameId);
  if (isNaN(idJugador) || isNaN(idPartida)) redirectToNotFound();

  useEffect(() => {
    if (partidaEnCurso){
      if (newSocket) newSocket.close();
      redirectToGame(idPartida, idJugador);
    }
  }, [partidaEnCurso]);

  useEffect(() => {
    setJugador(obtenerJugador());
    setPartida(obtenerPartida());

    const newSocket = createSocketLobby();
    setSocket(newSocket);

    return ObtenerMensajes(setJugadores, setCantidadJugadores, setPartidaEnCurso, idJugador, idPartida, newSocket);
  }, []);


  const handleIniciarPartida = () => {
    if (partida && jugador) {
      iniciarPartida(partida.id, jugador.id);
    }
  };

  const handleAbandonarPartida = () => {
    AbandonarPartida(idPartida, idJugador);  
    if (newSocket) newSocket.close();
    redirectToHome();
  };

  return (
    <>
        <div className='lobby-container'>
          {partida && <h1 className='lobby-title'>{partida.nombre}</h1>}
          <p className='lobby-subtitle'>Esperando a jugadores...</p>
          <ul className='lobby-list'>
            {jugadores.map((jugadorListado) => (
              <li key={jugadorListado.id} className='lobby-list-item'> <p>{jugadorListado.nombre}</p> </li>
            ))}
          </ul>

          {partida && jugador && jugador.isHost && CantidadJugadores >= partida.cantJugadoresMin && (
            <button className='lobby-button' onClick={handleIniciarPartida}>Iniciar Partida</button>
          )}
          {jugador && !jugador.isHost && (<button className='lobby-button' onClick={handleAbandonarPartida}>Abandonar</button>)}
        </div>
      
    </>
  );
}

export default Lobby;