import { ListarJugadores, iniciarPartida } from '../views/Public/Lobby/MenajesLobby';
import { obtenerJugador, obtenerPartida, obtenerJugadoresUnidos } from '../context/GameContext';
import { useState, useEffect } from 'react';
import { Jugador , Partida } from '../../types/partidaListada';
import '../../styles/Lobby.css';
import Juego from './Juego';

function Lobby() {
  const jugadoresUnidos = obtenerJugadoresUnidos();
  const [jugadores, setJugadores] = useState<{ id: number, nombre: string }[]>(jugadoresUnidos);
  const [CantidadJugadores, setCantidadJugadores] = useState<number>(1);
  const [partidaEnCurso, setPartidaEnCurso] = useState(false);
  const [jugador, setJugador] = useState<Jugador>();
  const [partida, setPartida] = useState<Partida>();

  ListarJugadores(setJugadores, setCantidadJugadores, setPartidaEnCurso);

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
      {partidaEnCurso ? <Juego/> :
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
      }
    </>
  );
}

export default Lobby;