import { createContext, useState, ReactNode, useContext } from 'react';
import { Partida } from '../../../types/partidaListada';

interface PartidaActivaProps {
    actualizarPartidaActiva: (PartidaActiva: Partida) => void;
    obtenerPartidaActiva: () => Partida | null;
}

const PartidaActivaContext = createContext<PartidaActivaProps | undefined>(undefined);

export const PartidaActiva = ({ children }: { children: ReactNode }) => {

  const [partidaActiva, setPartidaActiva] = useState<Partida | null>(null);

  const actualizarPartidaActiva = (PartidaActiva: Partida) => setPartidaActiva(PartidaActiva);
  const obtenerPartidaActiva = () => partidaActiva;

  return (
    <PartidaActivaContext.Provider value={{ actualizarPartidaActiva, obtenerPartidaActiva }}>
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