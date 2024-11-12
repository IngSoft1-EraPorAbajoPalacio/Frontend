import { Partida } from '../../../../types/partidaListada';
import { obtenerPartidaActivaContext } from '../../../context/GameContext';
import { usePartidaActiva } from '../../../utils/PartidaActiva';
import PartidaListada from './PartidaListada';

interface ListarPartidasProps {
  setIdPartida: React.Dispatch<React.SetStateAction<number|null>>;
  partidas: Partida[];
  newSocket: any
}

function ListarPartidas({setIdPartida, partidas, newSocket}: ListarPartidasProps) {

  const { obtenerPartidaActiva } = usePartidaActiva();

  const partidaActiva = obtenerPartidaActiva();

  return (
    <div className='listado'>
      { partidaActiva && obtenerPartidaActivaContext() &&(
        <div>
          <h2>Partida Activa</h2>
          <PartidaListada partida={partidaActiva} setIdPartida={setIdPartida} newSocket={newSocket}></PartidaListada>
        </div>
      )}

      { partidas.length !== 0 && (
        <div>
          <h2>Otras Partidas</h2>
          <div className='lista'>
            {partidas.map((partida: Partida) => (
              (!partidaActiva || ( partidaActiva && partidaActiva.id !== partida.id ) ) &&
              <PartidaListada key={partida.id} partida={partida} setIdPartida={setIdPartida} newSocket={newSocket}></PartidaListada>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ListarPartidas;
