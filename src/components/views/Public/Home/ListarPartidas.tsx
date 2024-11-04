import { Partida } from '../../../../types/partidaListada';
import { guardarPartida } from '../../../context/GameContext';

interface ListarPartidasProps {
  setIdPartida: React.Dispatch<React.SetStateAction<number|null>>;
  partidas: Partida[];
}

function ListarPartidas({setIdPartida, partidas}: ListarPartidasProps) {
  return (
    <>
      {partidas.map((partida: Partida) => (
        <button
          key={partida.id}
          className='partida-listada'
          onClick={() => {setIdPartida(partida.id); guardarPartida(partida);}}
        >
          <div>
            <h3>{ partida.nombre + " " + (partida.bloqueada? "🔐" : "🔓") }</h3>
            <p>Cantidad de jugadores: {partida.cantJugadoresMin} - {partida.cantJugadoresMax}</p>
          </div>
        </button>
      ))}
    </>
  );
}

export default ListarPartidas;
