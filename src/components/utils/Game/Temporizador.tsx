import { createContext, useState, ReactNode, useContext, useEffect, useRef } from 'react';

interface TemporizadorProps {
    actualizarTemporizador: (temporizador: number) => void;
    obtenerTemporizador: () => number;
}

const TemporizadorContext = createContext<TemporizadorProps | undefined>(undefined);

export const Temporizador = ({ children }: { children: ReactNode }) => {

  const [segundosRestantes, setSegundosRestantes] = useState<number>(0);
  const requestRef = useRef<number | null>(null);
  const tiempoEstablecidoRef = useRef<number>(0);

  const actualizarTemporizador = (temporizador: number) => {
    setSegundosRestantes(temporizador);
    tiempoEstablecidoRef.current = Date.now() / 1000 + temporizador;
  };

  const obtenerTemporizador = () => {
    return segundosRestantes;
  };

  const tick = () => {
    const tiempoRestante = Math.ceil(tiempoEstablecidoRef.current - Date.now() / 1000);
    if (tiempoRestante <= 0) {
      setSegundosRestantes(0);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    } else {
      setSegundosRestantes(tiempoRestante);
      requestRef.current = requestAnimationFrame(tick);
    }
  };

  useEffect(() => {
    if (segundosRestantes > 0) {
      requestRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [segundosRestantes]);

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