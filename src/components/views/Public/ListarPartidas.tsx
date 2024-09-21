import React from 'react';
import { partidasEx } from '../../../types/partida';

interface ListarPartidasProps {
  seleccionarPartida: (id: number) => void;
}

const ListarPartidas: React.FC<ListarPartidasProps> = ({ seleccionarPartida }) => {
  return (
    <div id='unirse'>
      {partidasEx.map((partida) => (
        <button
          key={partida.idPartida}
          className='partida-listada'
          onClick={() => seleccionarPartida(partida.idPartida)}
        >
          <p>{partida.nombrePartida} <br /> jugadores: {partida.cantJugadores}</p>
        </button>
      ))}
    </div>
  );
};

export default ListarPartidas;
