import { Partida } from '../../../../types/partidaListada';
import { guardarPartida } from '../../../context/GameContext';

interface ListarPartidasProps {
  setIdPartida: React.Dispatch<React.SetStateAction<number|null>>;
  partidas: Partida[];
}

function ListarPartidas({setIdPartida, partidas}: ListarPartidasProps) {
  return (
    <div className='listado'>
      <h2>Partidas Activas</h2>
      <button
          key={51}
          className='partida-listada'
          onClick={() => {setIdPartida(51);}}
        >
        <div>
          <h3>{ "Pepe 🔐" }</h3>
          <p>Cantidad de jugadores: {1} - {5}</p>
        </div>
      </button>

      <h2>Otras Partidas</h2>
      <div className='lista'>
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
      </div>
    </div>
  );
}

export default ListarPartidas;
