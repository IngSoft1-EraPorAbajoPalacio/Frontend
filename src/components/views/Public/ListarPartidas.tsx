import { Partida, partidas } from '../../../types/partida';
import obtenerListaPartidas from '../../hooks/ListaPartidas';

interface ListarPartidasProps {
  seleccionarPartida: (partida: Partida) => void;
}

function ListarPartidas({ seleccionarPartida }: ListarPartidasProps) {
  obtenerListaPartidas();

  return (
    <div id='unirse'>
      {partidas.map((partida) => (
        <button
          key={partida.id}
          className='partida-listada'
          onClick={() => seleccionarPartida(partida)}
        >
          <p>{partida.nombre}</p>
        </button>
      ))}
    </div>
  );
}

export default ListarPartidas;
