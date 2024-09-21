import React from 'react';
import { partidas } from '../../../types/partida';
import obtenerListaPartidas from '../../hooks/ListaPartidas';

interface ListarPartidasProps {
  seleccionarPartida: (id: number) => void;
}

const ListarPartidas: React.FC<ListarPartidasProps> = ({ seleccionarPartida }) => {
  obtenerListaPartidas();

  return (
    <div id='unirse'>
      {partidas.map((partida) => (
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
