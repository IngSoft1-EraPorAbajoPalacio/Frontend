import iniciarPartida from '../hooks/Lobby/IniciarPartida';
import ObtenerMensajes from '../hooks/Lobby/ObtenerMensajes';
import { obtenerJugador, obtenerPartida, obtenerJugadoresUnidos } from '../context/GameContext';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Jugador , Partida } from '../../types/partidaListada';
import '../../styles/Lobby/Lobby.css';
import useRouteNavigation from '../routes/RouteNavigation';
import createSocketLobby from '../../services/socketLobby';
import { HandleAbandono } from '../hooks/Abandono/Abandonar';

function Lobby() {
  const [jugadores, setJugadores] = useState<{ id: number, nombre: string }[]>(obtenerJugadoresUnidos());
  const [CantidadJugadores, setCantidadJugadores] = useState<number>(1);
  const [partidaEnCurso, setPartidaEnCurso] = useState(false);
  const [jugador, setJugador] = useState<Jugador>();
  const [partida, setPartida] = useState<Partida>();
  const [desconexionesLobby, setDesconexionesLobby] = useState(0);

  const { redirectToGame, redirectToNotFound, redirectToHome } = useRouteNavigation();
  const { gameId, playerId } = useParams<{ gameId: string; playerId: string }>();
  const idJugador = Number(playerId);
  const idPartida = Number(gameId);
  if (isNaN(idJugador) || isNaN(idPartida)) redirectToNotFound();

  useEffect(() => {
    if (partidaEnCurso) redirectToGame(idPartida, idJugador);
  }, [partidaEnCurso]);

  useEffect(() => {
    const socket = createSocketLobby();
    const cerrarSocketCon = ObtenerMensajes(setJugadores, setCantidadJugadores, setPartidaEnCurso, idJugador, idPartida, socket);
    
    socket.onclose = () => {
      console.log('WebSocket connection closed for Lobby');
      setTimeout(() => {
        setDesconexionesLobby(prev => prev + 1);
      }, 1000);
    };

    return cerrarSocketCon;
  }, [desconexionesLobby]);


  const handleIniciarPartida = () => {
    if (partida && jugador) {
      iniciarPartida(partida.id, jugador.id);
    }
  };

  const handleAbandono = () => {
    HandleAbandono(idPartida, idJugador);  
    redirectToHome();
  }

  useEffect(() => {
    setJugador(obtenerJugador());
    setPartida(obtenerPartida());
  }, []);

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
          {jugador && !jugador.isHost && (<button className='lobby-abandono' onClick={handleAbandono}>Abandonar</button>)}
        </div>
    </>
  );
}

export default Lobby;