import '../../styles/Home.css';
import UnirsePartida from '../views/Public/UnirsePartida';
import CrearPartida from '../views/Public/CrearPartida';
import ListarPartidas from '../views/Public/ListarPartidas';
import { useState } from 'react';
import { Partida } from '../../types/partida';
import { guardarPartida } from '../context/PlayerContext';


const Home = () => {
  const [partidaElegida, setPartidaElegida] = useState<Partida | null>(null);
  const [partidaCreada, setPartidaCreada] = useState<boolean>(false);

  const seleccionarPartida = (partida: Partida) => {    
    setPartidaElegida(partida);
    guardarPartida(partida);
  };

  const seleccionarCrear = () => {
    setPartidaCreada(true);
  };

  return (
    <>
      {(!partidaElegida && !partidaCreada) ? (
        <div id='home'>
          <div id='crear'>
            <button onClick={() => seleccionarCrear()}>Crear partida</button>
          </div>
          <ListarPartidas seleccionarPartida={seleccionarPartida} />
        </div>
      ) : (
        partidaElegida ? <UnirsePartida /> : <CrearPartida />
      )}
    </>
  );
} 

export default Home;