import { useTemporizador } from '../../../utils/Game/Temporizador';

interface TemporizadorProps { }

export const Temporizador: React.FC<TemporizadorProps> = () => {

  const { obtenerTemporizador } = useTemporizador();

  const tiempo = Math.ceil(obtenerTemporizador());
  const minutos = Math.floor(tiempo / 60);
  const segundos = tiempo % 60;

  return (
    <h3>
      { "⏳" + String(minutos).padStart(2, '0') + ":" + String(segundos).padStart(2, '0') }
    </h3>
  );
};

export default Temporizador;