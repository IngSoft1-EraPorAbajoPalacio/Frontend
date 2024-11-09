import { useState, useEffect } from 'react';

interface TemporizadorProps {
    temporizador: number;
}

const Temporizador = ({ temporizador }: TemporizadorProps) => {
  const tiempoInicial = temporizador;
  const [timeRemaining, setTimeRemaining] = useState(tiempoInicial);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime: any) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const minutos = Math.floor((timeRemaining % 3600) / 60);
  const segundos = timeRemaining % 60;

  return (
    <div>
        <h3>{ "⏳" + minutos.toString() + ":" + segundos.toString() }</h3>
    </div>
  );
};

export default Temporizador;