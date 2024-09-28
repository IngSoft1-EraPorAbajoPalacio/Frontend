import '../../styles/Home.css';
import CrearPartida from '../views/Public/CrearPartida';
import ListarPartidas from '../views/Public/ListarPartidas';
import { useState } from 'react';
import { Partida } from '../../types/partidaListada';
import { guardarPartida } from '../context/GameContext';
import { FormJoinRoom } from '../forms/JoinRoom/FormJoinRoom';
import { Overlay } from '../overlay/Overlay';

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