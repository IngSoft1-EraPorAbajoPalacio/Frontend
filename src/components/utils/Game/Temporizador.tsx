import { createContext, useState, ReactNode, useContext } from 'react';

interface TemporizadorProps {
    actualizarTemporizador: (temporizador: number) => void;
    obtenerTemporizador: () => number;
}

const TemporizadorContext = createContext<TemporizadorProps | undefined>(undefined);

export const Temporizador = ({ children }: { children: ReactNode }) => {

  const [segundosRestantes, setSegundosRestantes] = useState(120);

  const actualizarTemporizador = (temporizador: number) => {
    setSegundosRestantes(temporizador);
  };

  const obtenerTemporizador = () => {
    return segundosRestantes;
  };

  return (
    segundosRestantes ? 
    <TemporizadorContext.Provider value={{ actualizarTemporizador, obtenerTemporizador }}>
        {children}
    </TemporizadorContext.Provider> :
    <div></div>
  );
}

export const useTemporizador = () => {
  const context = useContext(TemporizadorContext);
  if (!context) {
    throw new Error('useTemporizador debe ser usado dentro de un Temporizador');
  }
  return context;
};