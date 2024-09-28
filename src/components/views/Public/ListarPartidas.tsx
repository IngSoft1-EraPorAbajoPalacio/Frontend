import { Partida } from '../../../types/partidaListada';
import obtenerPartidas from '../../hooks/ObtenerPartidas';
import { useState, useEffect } from 'react';
import { ObtenerPartidaNueva } from '../../hooks/ObtenerPartidaNueva';

interface ListarPartidasProps {
  seleccionarPartida: (partida: Partida) => void;
}

function ListarPartidas({ seleccionarPartida }: ListarPartidasProps) {
  const [partidas, setPartidas] = useState<Partida[]>([]);

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
          onClick={() => seleccionarPartida(partida)}
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
