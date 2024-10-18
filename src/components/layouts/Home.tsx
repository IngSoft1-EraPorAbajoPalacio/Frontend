import '../../styles/Home/Home.css';
import ListarPartidas from '../views/Public/Home/ListarPartidas';
import { useEffect, useState } from 'react';
import FormularioUnirsePartida from '../views/Public/Home/FormularioUnirsePartida';
import Overlay from '../views/Public/Home/Overlay';
import FormCreateRoom from '../views/Public/Home/FormularioCrearPartida';
import useRouteNavigation from '../routes/RouteNavigation';

const Home = () => {
	const [idPatida, setIdPartida] = useState<number|null>(null);
	const [idJugador, setIdJugador] = useState<number|null>(null);
	const [partidaCreada, setPartidaCreada] = useState<boolean>(false);
	const [tryJoinGame, setTryJoinGame] = useState(idPatida !== null);

	const { redirectToLobby } = useRouteNavigation();
	const seleccionarCrear = () => setPartidaCreada(true);

	useEffect(() => {
		if (idJugador !== null && idPatida !== null) redirectToLobby(idPatida, idJugador);
	}, [idJugador, idPatida]);

	useEffect(() => {
        setTryJoinGame(idPatida !== null);
    }, [idPatida]);

	return (

		<div id='home'>
			<div id='crear'>
				<button onClick={() => seleccionarCrear()}>Crear partida</button>
			</div>
			<div id='unirse'>
				<ListarPartidas setIdPartida={setIdPartida} />
			</div>
			<Overlay isOpen={partidaCreada} onClose={() => { setPartidaCreada(!partidaCreada) }}>
				<FormCreateRoom setIdPartida={setIdPartida} setIdJugador={setIdJugador} />
			</Overlay>
			<Overlay isOpen={tryJoinGame} onClose={() => { setTryJoinGame(!tryJoinGame) }}>
				<FormularioUnirsePartida setIdJugador={setIdJugador} idPartida={idPatida} />
			</Overlay>
		</div>
	);
}

export default Home;