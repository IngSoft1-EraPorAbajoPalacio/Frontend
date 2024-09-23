import { Partida } from '../../../types/partida';
import obtenerPartidas from '../../hooks/ListaPartidas';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const url = 'http://localhost:5173/';
const socket = io(url);
interface ListarPartidasProps {
  seleccionarPartida: (partida: Partida) => void;
}

function ListarPartidas({ seleccionarPartida }: ListarPartidasProps) {
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {

    socket.on('connect', () => setIsConnected(true));

    socket.on('AgregarPartida', (mensaje: Partida) => {
      setPartidas((partidas) => [...partidas, mensaje]);
    });

    return () => {
      socket.off('connect');
    }

  }, []);

  useEffect(() => {
    obtenerPartidas(setPartidas);
    if (partidas.length > 0) {
      console.log("Agregando partidas:", partidas);
    }
  }, [])

  return (
    <>
      <p> {isConnected ? 'Conectado' : 'Desconectado'} </p>
      {partidas.map((partida) => (
        <button
          key={partida.id}
          className='partida-listada'
          onClick={() => seleccionarPartida(partida)}
        >
          <p>{partida.nombre}</p>
        </button>
      ))}
    </>
  );
}

export default ListarPartidas;
