import { Partida } from '../../../types/partida';
import obtenerPartidas from '../../hooks/ListaPartidas';
import { useState, useEffect } from 'react';

interface ListarPartidasProps {
  seleccionarPartida: (partida: Partida) => void;
}

function ListarPartidas({ seleccionarPartida }: ListarPartidasProps) {
  const [partidas, setPartidas] = useState<Partida[]>([]);

  useEffect(() => {
    obtenerPartidas(setPartidas);
    if (partidas.length > 0) {
      console.log("Agregando partidas:", partidas);
    }
  }, [])

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
