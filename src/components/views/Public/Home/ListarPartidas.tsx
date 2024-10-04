import { Partida } from '../../../../types/partidaListada';
import obtenerPartidas from '../../../hooks/Home/ObtenerPartidas';
import { useState, useEffect } from 'react';
import { ObtenerPartidaNueva } from '../../../hooks/Home/ObtenerMensajes';
import { guardarPartida } from '../../../context/GameContext';

interface ListarPartidasProps {
  seleccionarPartida: (partida: Partida) => void;
  setTryJoinGame : React.Dispatch<React.SetStateAction<boolean>> 
}

function ListarPartidas({ seleccionarPartida, setTryJoinGame}: ListarPartidasProps) {
  const [partidas, setPartidas] = useState<Partida[]>([]);

  // Se ejecuta solamnte al montar el componente
  useEffect(() => {
    obtenerPartidas(setPartidas);
  }, []);

  ObtenerPartidaNueva(setPartidas);

  return (
    <>
      {partidas.map((partida) => (
        <button
          key={partida.id}
          className='partida-listada'
          onClick={() => {seleccionarPartida(partida); setTryJoinGame(true); guardarPartida(partida);}}
        >
          <div>
            <h3>{partida.nombre}</h3>
            <p>Cantidad de jugadores: {partida.cantJugadoresMin} - {partida.cantJugadoresMax}</p>
          </div>
        </button>
      ))}
    </>
  );
}

export default ListarPartidas;
