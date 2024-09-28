import '../../styles/Home.css';
import UnirsePartida from '../views/Public/UnirsePartida';
import CrearPartida from '../views/Public/CrearPartida';
import ListarPartidas from '../views/Public/ListarPartidas';
import { useState } from 'react';
<<<<<<< HEAD
import { Partida } from '../../types/partidaListada';
import { guardarPartida } from '../context/GameContext';
=======
import { Partida } from '../../types/partida';
import { guardarPartida } from '../context/PlayerContext';
import { FormJoinRoom } from '../forms/FormJoinRoom';
import { Overlay } from '../overlay/Overlay';
>>>>>>> 10b936c (feature_ING-39 Formulario sin lógica integrado a lista de partidas con Overlay)

const Home = () => {
	const [partidaElegida, setPartidaElegida] = useState<Partida | null>(null);
	const [partidaCreada, setPartidaCreada] = useState<boolean>(false);
	const [isOverlayOpen, setIsOverlayOpen] = useState(false);

	const seleccionarPartida = (partida: Partida) => {
		setPartidaElegida(partida);
		guardarPartida(partida);
	};

	const seleccionarCrear = () => {
		setPartidaCreada(true);
	};

	return (
		<>
      
        <div id='home'>
          <div id='crear'>
            <button onClick={() => seleccionarCrear()}>Crear partida</button>
          </div>
          <div id='unirse'>
			<ListarPartidas seleccionarPartida={seleccionarPartida} setIsOverlayOpen={setIsOverlayOpen} />
          </div>
		  <Overlay isOpen={isOverlayOpen} onClose={() => { setIsOverlayOpen(!isOverlayOpen) }}>
			<FormJoinRoom />
		</Overlay> 
        </div>
    </>
	);
}

export default Home;