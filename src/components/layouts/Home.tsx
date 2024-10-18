import '../../styles/Home/Home.css';
import ListarPartidas from '../views/Public/Home/ListarPartidas';
import { useEffect, useState } from 'react';
import FormularioUnirsePartida from '../views/Public/Home/FormularioUnirsePartida';
import Overlay from '../views/Public/Home/Overlay';
import FormCreateRoom from '../views/Public/Home/FormularioCrearPartida';
import useRouteNavigation from '../routes/RouteNavigation';
import ObtenerMensajes from '../hooks/Home/ObtenerMensajes';
import createSocketHome from '../../services/socketHome';
import { Partida } from '../../types/partidaListada';
import obtenerPartidas from '../hooks/Home/ObtenerPartidas';

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
    const seleccionarCrear = () => setPartidaCreada(true);

    useEffect(() => {
        if (idJugador !== null && idPatida !== null){
            if (newSocket) newSocket.close();
            redirectToLobby(idPatida, idJugador);
        }
    }, [idJugador, idPatida]);

    useEffect(() => {
		obtenerPartidas(setPartidas);
        const newSocket = createSocketHome(setDesconexionesHome);
        setSocket(newSocket);
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

    const ajustarMin = (n: number) => {
        if (minPlayers + n >= 2 && minPlayers + n <= maxPlayers) {
            setMinPlayers(minPlayers + n);
        }
    };

    const ajustarMax = (n: number) => {
        if (maxPlayers + n >= minPlayers && maxPlayers + n <= 4) {  
            setMaxPlayers(maxPlayers + n);
        }
    };
    
    return (
        <div id='home'>
            <div id='crear'>
                <button onClick={() => seleccionarCrear()}>Crear partida</button>
            </div>            
            <div id='unirse'>
                <div className="filtrarPartidas">
                    <input
                        id='barraBusqueda'
                        type="text"
                        placeholder="Buscar partidas..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <div className="filtarJugs">
                        <label><strong>Filtrar por cantidad de jugadores</strong></label>
                        <div className="filtroJug">
                            <div className="filtroJugItem">
                                <label>Mín</label>
                                <div className="controlFiltro">
                                    <button onClick={() => ajustarMin(-1)}>-</button>
                                    <span>{minPlayers}</span>
                                    <button onClick={() => ajustarMin(1)}>+</button>
                                </div>
                            </div>
                            <div className="filtroJugItem">
                                <label>Máx</label>
                                <div className="controlFiltro">
                                    <button onClick={() => ajustarMax(-1)}>-</button>
                                    <span>{maxPlayers}</span>
                                    <button onClick={() => ajustarMax(1)}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ListarPartidas setIdPartida={setIdPartida} partidas={partidasFiltradas} />
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