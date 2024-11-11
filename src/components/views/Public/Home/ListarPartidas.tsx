import { Partida } from '../../../../types/partidaListada';
import { usePartidaActiva } from '../../../utils/Home/PartidaActiva';
import PartidaListada from './PartidaListada';

interface ListarPartidasProps {
  setIdPartida: React.Dispatch<React.SetStateAction<number|null>>;
  partidas: Partida[];
}

function ListarPartidas({setIdPartida, partidas}: ListarPartidasProps) {

  const { obtenerPartidaActiva } = usePartidaActiva();

  const partidaActiva = obtenerPartidaActiva();

  return (
    <div className='listado'>
      { partidaActiva && (
        <div>
          <h2>Partida Activa</h2>
          <PartidaListada partida={partidaActiva} setIdPartida={setIdPartida} ></PartidaListada>
        </div>
      )}

      { partidas.length !== 0 && (
        <div>
          <h2>Otras Partidas</h2>
          <div className='lista'>
            {partidas.map((partida: Partida) => (
              (!partidaActiva || ( partidaActiva && partidaActiva.id !== partida.id ) ) &&
              <PartidaListada key={partida.id} partida={partida} setIdPartida={setIdPartida} ></PartidaListada>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ListarPartidas;
