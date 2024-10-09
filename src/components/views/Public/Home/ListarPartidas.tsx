import { Partida } from '../../../../types/partidaListada';
import obtenerPartidas from '../../../hooks/Home/ObtenerPartidas';
import { useState, useEffect } from 'react';
import ObtenerMensajes from '../../../hooks/Home/ObtenerMensajes';
import { guardarPartida } from '../../../context/GameContext';

interface ListarPartidasProps {
  setIdPartida: React.Dispatch<React.SetStateAction<number|null>>;
}

function ListarPartidas({setIdPartida}: ListarPartidasProps) {
  const [partidas, setPartidas] = useState<Partida[]>([]);

  // Se ejecuta solamnte al montar el componente
  useEffect(() => {
    obtenerPartidas(setPartidas);
    ObtenerMensajes(setPartidas);
  }, []);

  
  return (
    <>
      {partidas.map((partida) => (
        <button
          key={partida.id}
          className='partida-listada'
          onClick={() => {setIdPartida(partida.id); guardarPartida(partida);}}
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
