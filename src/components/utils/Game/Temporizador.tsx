import { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface TemporizadorProps {
    actualizarTemporizador: (temporizador: number) => void;
    obtenerTemporizador: () => number;
}

const TemporizadorContext = createContext<TemporizadorProps | undefined>(undefined);

export const Temporizador = ({ children }: { children: ReactNode }) => {

  const [segundosRestantes, setSegundosRestantes] = useState<number>(0);

  useEffect(() => {
    let timer = setInterval(() => {
      setSegundosRestantes((temporizador: number) => {
        if (temporizador === 0) {
          clearInterval(timer);
          return 0;
        } else return temporizador - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  
  }, [setSegundosRestantes, segundosRestantes]);

  const actualizarTemporizador = (temporizador: number) => {
    setSegundosRestantes(temporizador);
  };

  const obtenerTemporizador = () => {
    return segundosRestantes;
  };

  return (
    <TemporizadorContext.Provider value={{ actualizarTemporizador, obtenerTemporizador }}>
        {children}
    </TemporizadorContext.Provider>
  );
}

export const useTemporizador = () => {
  const context = useContext(TemporizadorContext);
  if (!context) {
    throw new Error('useTemporizador debe ser usado dentro de un Temporizador');
  }
  return context;
};