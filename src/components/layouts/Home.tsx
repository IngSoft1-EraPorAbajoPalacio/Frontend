import '../../styles/Home/Home.css';
import ListarPartidas from '../views/Public/Home/ListarPartidas';
import { useEffect, useState } from 'react';
import FormularioUnirsePartida from '../views/Public/Home/FormularioUnirsePartida';
import Overlay from '../../components/views/Public/Overlay';
import FormCreateRoom from '../views/Public/Home/FormularioCrearPartida';
import useRouteNavigation from '../routes/RouteNavigation';
import ObtenerMensajes from '../hooks/Home/ObtenerMensajes';
import createSocketHome from '../../services/socketHome';
import { Partida } from '../../types/partidaListada';
import obtenerPartidas from '../hooks/Home/ObtenerPartidas';
import BusquedaPartidas from '../views/Public/Home/BusquedaPartidas';
import { usePartidaActiva } from '../utils/PartidaActiva';
import AbandonarPartida from '../hooks/AbandonarPartida';
import { obtenerJugador } from '../context/GameContext';
import showToast from '../views/Public/Toast';

const Home = () => {
    const [idPatida, setIdPartida] = useState<number|null>(null);
    const [idJugador, setIdJugador] = useState<number|null>(null);
    const [partidaCreada, setPartidaCreada] = useState<boolean>(false);
    const [tryJoinGame, setTryJoinGame] = useState(idPatida !== null);
    const [partidas, setPartidas] = useState<Partida[]>([]);
    const [newSocket, setSocket] = useState<WebSocket | null>(null);
    const [desconexionesHome, setDesconexionesHome] = useState(0);

    const [busqueda, setBusqueda] = useState<string>('');

    const [minPlayers, setMinPlayers] = useState<number>(2);
    const [maxPlayers, setMaxPlayers] = useState<number>(4);

    const { redirectToLobby } = useRouteNavigation();
    const { obtenerPartidaActiva, borrarPartidaActiva, terminarPartidaActiva } = usePartidaActiva();

    const seleccionarCrear = () => {
        setPartidaCreada(true);

        const partidaActiva = obtenerPartidaActiva();
        if (partidaActiva !== null) {
            const jugador = obtenerJugador();
            AbandonarPartida(partidaActiva.id, jugador.id);
            showToast({ message: 'Partida abandonada', type: 'success' });
            if(jugador.isHost) setPartidas([]);
            borrarPartidaActiva();
            terminarPartidaActiva();
        }
    }

    useEffect(() => {
        if (idJugador !== null && idPatida !== null){
            if (newSocket) newSocket.close();
            redirectToLobby(idPatida, idJugador);
        }
    }, [idJugador, idPatida]);

    useEffect(() => {
        const newSocket = createSocketHome(setDesconexionesHome);
        setSocket(newSocket);
        obtenerPartidas(setPartidas);
        return ObtenerMensajes(setPartidas, newSocket);
    }, [desconexionesHome]);

    useEffect(() => {
        setTryJoinGame(idPatida !== null);
    }, [idPatida]);

    const partidasFiltradas = partidas.filter(partida =>
        partida.nombre.toLowerCase().includes(busqueda.toLowerCase()) && // no es caseSensitive
        partida.cantJugadoresMin >= minPlayers &&
        partida.cantJugadoresMax <= maxPlayers
    );
    
    return (
        <div id='home'>
            <div id='crear'>
                <button onClick={() => seleccionarCrear()}>Crear partida</button>
            </div>            
            <div id='unirse'>
                <BusquedaPartidas busqueda={busqueda} setBusqueda={setBusqueda} minPlayers={minPlayers} maxPlayers={maxPlayers} setMinPlayers= {setMinPlayers} setMaxPlayers= {setMaxPlayers} />
                <ListarPartidas setIdPartida={setIdPartida} partidas={partidasFiltradas} newSocket={newSocket}/>
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