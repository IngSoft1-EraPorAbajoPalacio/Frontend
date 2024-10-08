import iniciarPartida from '../hooks/Lobby/IniciarPartida';
import ObtenerMensajes from '../hooks/Lobby/ObtenerMensajes';
import { obtenerJugador, obtenerPartida, obtenerJugadoresUnidos } from '../context/GameContext';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Jugador , Partida } from '../../types/partidaListada';
import '../../styles/Lobby/Lobby.css';
import useRouteNavigation from '../routes/RouteNavigation';

function Lobby() {
  const [jugadores, setJugadores] = useState<{ id: number, nombre: string }[]>(obtenerJugadoresUnidos());
  const [CantidadJugadores, setCantidadJugadores] = useState<number>(1);
  const [partidaEnCurso, setPartidaEnCurso] = useState(false);
  const [jugador, setJugador] = useState<Jugador>();
  const [partida, setPartida] = useState<Partida>();

  const { redirectToGame, redirectToNotFound } = useRouteNavigation();
  const { gameId, playerId } = useParams<{ gameId: string; playerId: string }>();
  const idJugador = Number(playerId);
  const idPartida = Number(gameId);
  if (isNaN(idJugador) || isNaN(idPartida)) redirectToNotFound();

  useEffect(() => {
    if (partidaEnCurso) redirectToGame(idPartida, idJugador);
  }, [partidaEnCurso]);

  ObtenerMensajes(setJugadores, setCantidadJugadores, setPartidaEnCurso, idJugador, idPartida);

  const handleIniciarPartida = () => {
    if (partida && jugador) {
      iniciarPartida(partida.id, jugador.id);
    }
  };

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
        </div>
      
    </>
  );
}

export default Lobby;