import { createContext, useState, ReactNode, useContext } from 'react';
import { Partida } from '../../../types/partidaListada';

interface PartidaActivaProps {
  actualizarPartidaActiva: (PartidaActiva: Partida) => void;
  obtenerPartidaActiva: () => Partida | null;
  borrarPartidaActiva: () => void;
  enJuego: () => boolean;
  iniciarPartidaActiva: () => void;
  terminarPartidaActiva: () => void;
}

const PartidaActivaContext = createContext<PartidaActivaProps | undefined>(undefined);

export const PartidaActiva = ({ children }: { children: ReactNode }) => {

  const [partidaActiva, setPartidaActiva] = useState<Partida | null>(null);
  const [partidaIniciada, setPartidaIniciada] = useState<boolean>(false);

  const actualizarPartidaActiva = (PartidaActiva: Partida) => setPartidaActiva(PartidaActiva);
  const obtenerPartidaActiva = () => partidaActiva;
  const borrarPartidaActiva = () => setPartidaActiva(null);
  const enJuego = () => partidaIniciada;
  const iniciarPartidaActiva = () => setPartidaIniciada(true);
  const terminarPartidaActiva = () => setPartidaIniciada(false);


  return (
    <PartidaActivaContext.Provider value={{ actualizarPartidaActiva, obtenerPartidaActiva, borrarPartidaActiva, enJuego, iniciarPartidaActiva, terminarPartidaActiva }}>
        {children}
    </PartidaActivaContext.Provider>
  );
}

export const usePartidaActiva = () => {
  const context = useContext(PartidaActivaContext);
  if (!context) {
    throw new Error('usePartidaActiva debe ser usado dentro de un PartidaActiva');
  }
  return context;
};