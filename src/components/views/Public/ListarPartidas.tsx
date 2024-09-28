import { Partida } from '../../../types/partida';
import obtenerPartidas from '../../hooks/ObtenerPartidas';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    obtenerPartidas(setPartidas);
  }, []);

  useSocketPartidas(setPartidas);

  return (
    <>
      {partidas.map((partida) => (
        <button
          key={partida.id}
          className='partida-listada'
          onClick={() => seleccionarPartida(partida)}
        >
          <div>
            <h3>{partida.nombre}</h3>
            <p>Cantidad de jugadores: {partida.cantJugadoresMin} - {partida.cantJugadoresMax} </p>
          </div>
        </button>
      ))}
    </>
  );
}

export default ListarPartidas;
