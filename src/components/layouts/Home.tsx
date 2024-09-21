import '../../styles/Home.css';
import { usePartida } from '../hooks';
import UnirsePartida from '../views/Public/UnirsePartida';
import CrearPartida from '../views/Public/CrearPartida';
import ListarPartidas from '../views/Public/ListarPartidas';


const Home = () => {
  const { partidaElegida, seleccionarPartida, partidaCreada, seleccionarCrear } = usePartida();

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