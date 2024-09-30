import '../../styles/Home.css';
import ListarPartidas from '../views/Public/ListarPartidas';
import { useState } from 'react';
import { Partida } from '../../types/partidaListada';
import { guardarPartida } from '../context/GameContext';
import { FormJoinRoom } from '../forms/JoinRoom/FormJoinRoom';
import { Overlay } from '../overlay/Overlay';
import { FormCreateRoom } from '../forms/FormCreateRoom/FormCreateRoom';

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
					<FormJoinRoom />
				</Overlay>
			</div>
		</>
	);
}

export default Home;