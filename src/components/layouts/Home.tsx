import '../../styles/Home/Home.css';
import ListarPartidas from '../views/Public/Home/ListarPartidas';
import { useState } from 'react';
import { Partida } from '../../types/partidaListada';
import { guardarPartida } from '../context/GameContext';
import FormularioUnirsePartida from '../views/Public/Home/FormularioUnirsePartida';
import Overlay from '../views/Public/Home/Overlay';
import { FormCreateRoom } from '../views/Public/Home/FormularioCrearPartida';

const Home = () => {
	const [partidaElegida, setPartidaElegida] = useState<Partida | null>(null);
	const [partidaCreada, setPartidaCreada] = useState<boolean>(false);

	const [tryJoinGame, setTryJoinGame] = useState(partidaElegida !== null);

	const seleccionarPartida = (partida: Partida) => {
		console.log('Partida seleccionada:', partida);
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
					<ListarPartidas seleccionarPartida={seleccionarPartida} setTryJoinGame={setTryJoinGame} />
				</div>
				<Overlay isOpen={partidaCreada} onClose={() => { setPartidaCreada(!partidaCreada) }}>
					<FormCreateRoom />
				</Overlay>
				<Overlay isOpen={tryJoinGame} onClose={() => { setTryJoinGame(!tryJoinGame) }}>
					<FormularioUnirsePartida />
				</Overlay>
			</div>
		</>
	);
}

export default Home;