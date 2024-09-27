import { Partida } from '../../../types/partida';
import obtenerPartidas from '../../hooks/ObtenerPartidas';
import { useState } from 'react';
import useSocketPartidas from '../../hooks/ObtenerPartidaNueva';

const partidasPrueba: Partida[] = [
  new Partida(1, 'Partida 1', 4, 4),
  new Partida(2, 'Partida 2', 3, 3),
];

interface ListarPartidasProps {
  seleccionarPartida: (partida: Partida) => void;
}

function ListarPartidas({ seleccionarPartida }: ListarPartidasProps) {
  const [partidas, setPartidas] = useState<Partida[]>(partidasPrueba);

  obtenerPartidas(setPartidas);
  useSocketPartidas(setPartidas);

  return (
    <>
      {partidas.map((partida) => (
        <button
          key={partida.id}
          className='partida-listada'
          onClick={() => seleccionarPartida(partida)}
        >
          <p>
            <h3>{partida.nombre}</h3>
            Cantidad de jugadores: {partida.cantJugadoresMin} - {partida.cantJugadoresMax}
          </p>
        </button>
      ))}
    </>
  );
}

export default ListarPartidas;
