import { Partida } from '../../../../types/partidaListada';
import obtenerPartidas from '../../../hooks/Home/ObtenerPartidas';
import { useState, useEffect } from 'react';
import ObtenerMensajes from '../../../hooks/Home/ObtenerMensajes';
import { guardarPartida } from '../../../context/GameContext';
import createSocketHome from '../../../../services/socketHome';

interface ListarPartidasProps {
  setIdPartida: React.Dispatch<React.SetStateAction<number|null>>;
}

function ListarPartidas({setIdPartida}: ListarPartidasProps) {
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [desconexionesHome, setDesconexionesHome] = useState(0);

  // Se ejecuta solamnte al montar el componente
  useEffect(() => {
    obtenerPartidas(setPartidas);
    const socket = createSocketHome();
    const cerrarSocketCon = ObtenerMensajes(setPartidas, socket);

    socket.onclose = () => {
      console.log('WebSocket connection closed');

      setTimeout(() => {
        setDesconexionesHome(prev => prev + 1);
      }, 1000);
    };

    return cerrarSocketCon;
  }, [desconexionesHome]);

  
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
