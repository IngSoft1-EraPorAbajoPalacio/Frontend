import Tablero from "../views/Public/Game/Tablero";
import "../../styles/Game/Juego.css";
import MostrarMovimientos from "../views/Public/Game/MostrarMovimientos";
import MostrarFiguras from "../views/Public/Game/MostrarFiguras";
import { CartaMovimiento, Ficha, JugadorEnCurso, Movimiento, PartidaEnCurso } from "../../types/partidaEnCurso";
import { useEffect, useState } from "react";
import { borrarPartida, obtenerPartidaEnCurso, borrarPartidaEnCurso, obtenerMovimientos } from "../context/GameContext";
import ObtenerMensajes from "../hooks/Game/ObtenerMensajes";
import createSocketGame from "../../services/socketGame";
import useRouteNavigation from "../routes/RouteNavigation";
import { useParams } from 'react-router-dom';
import AbandonarPartida from "../hooks/AbandonarPartida";
import PasarTurno from "../hooks/Game/PasarTurno";
import Overlay from '../../components/views/Public/Overlay';
import '../../styles/Game/MovimientoHecho.css';

function Juego () {
    const [partida, setPartida] = useState<PartidaEnCurso | null>(obtenerPartidaEnCurso())
    const [turnoActual, setTurnoActual] = useState<number | null>(partida?.orden[0] ?? null);
    const [newSocket, setSocket] = useState<WebSocket | null>(null);
    const [, setFinalizado] = useState(false);
    const [desconexionesGame, setDesconexionesGame] = useState(0);
    const [movimiento, setMovimiento] = useState<Movimiento | null>(null);
    const [movimientoAgregado, setMovimientoAgregado] = useState<boolean>(false);
    const [movimientoDeshecho, setMovimientoDeshecho] = useState<boolean>(false);
    const [, setFichasSeleccionadas] = useState<Ficha[]>([]);
    const [manoMovimiento, setManoMovimiento] = useState<CartaMovimiento[]>(obtenerMovimientos());
    const [movimientosJugados, setMovimientosJugados] = useState(0);

    const { redirectToNotFound, redirectToHome, redirectToEnd } = useRouteNavigation();
    const { gameId, playerId } = useParams<{ gameId: string; playerId: string }>();
    const idJugador = Number(playerId);
    const idPartida = Number(gameId);
    if (isNaN(idJugador) || isNaN(idPartida)) redirectToNotFound();

    useEffect(() => {
        const newSocket = createSocketGame(setDesconexionesGame);
        setSocket(newSocket);
        return ObtenerMensajes(setTurnoActual, setPartida, setMovimiento, setMovimientoAgregado, setMovimientoDeshecho, (finalizado) => {
            setFinalizado(finalizado);
            if (finalizado) {
                newSocket.close();
                borrarPartida();
                redirectToEnd(idPartida, idJugador);
            }
        }, newSocket);
    }, [desconexionesGame]);

    const handleAbandonarPartida = async () => {
        if (idJugador == turnoActual) await PasarTurno(idPartida, idJugador);
        AbandonarPartida(idPartida, idJugador);  
        if (newSocket) newSocket.close();
        borrarPartidaEnCurso();
        redirectToHome();
    };

    const handlePasarTurno = () => {
        if (partida) PasarTurno(partida.id, idJugador);
        const nuevaPartida = obtenerPartidaEnCurso();
        setPartida(nuevaPartida);
    }

    useEffect(() => {
        if(turnoActual === idJugador) setManoMovimiento((cartas: CartaMovimiento[]) => cartas.filter(carta => carta.id !== movimiento?.carta.id));
        setTimeout(() => setMovimientoAgregado(false), 1500);
    }, [movimientoAgregado]);

    useEffect(() => {
        setTimeout(() => setMovimientoDeshecho(false), 1500);
    }, [movimientoDeshecho]);
        
    const jugador1 = partida?.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida?.orden[0]);
    const jugador2 = partida?.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida?.orden[1]);
    const jugador3 = (partida && partida.cantJugadores > 2) ? partida.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida.orden[2]) : null;
    const jugador4 = (partida && partida.cantJugadores > 3) ? partida?.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida?.orden[3]) : null;

    return (
        <div id='Juego'>
            <div id="Centro">
                <div className="ManosHorizontal">
                    { jugador1 ? <MostrarFiguras jugador={jugador1} turnoActual={turnoActual} /> : <div className="ManoHorizontal"></div> }
                    { jugador4 ? <MostrarFiguras jugador={jugador4} turnoActual={turnoActual} /> : <div className="ManoHorizontal"></div> }
                </div>
                <Tablero setFichasSeleccionadas={setFichasSeleccionadas} turnoActual={turnoActual} idJugador={idJugador} />
                <div className="ManosHorizontal">
                    { jugador2 ? <MostrarFiguras jugador={jugador2} turnoActual={turnoActual} /> : <div className="ManoHorizontal"></div> }
                    { jugador3 ? <MostrarFiguras jugador={jugador3} turnoActual={turnoActual} /> : <div className="ManoHorizontal"></div> }
                </div>
            </div>
            <div id='ManoJugador'>
                <button id="AbandonarPartida" onClick={handleAbandonarPartida}>Abandonar Partida</button>
                {idJugador === turnoActual ?
                    <button id="PasarTurno" onClick={handlePasarTurno}>Pasar Turno</button> :
                    <button id="PasarTurno" disabled>Pasar Turno</button>
                }
                <MostrarMovimientos
                    partida={partida}
                    idJugador={idJugador}
                    setFichasSeleccionadas={setFichasSeleccionadas}
                    turnoActual={turnoActual}
                    manoMovimiento={manoMovimiento}
                    setManoMovimiento={setManoMovimiento}
                    movimientosJugados={movimientosJugados}
                    setMovimientosJugados={setMovimientosJugados}
                />
            </div>
            <Overlay isOpen={movimientoAgregado} onClose={() => { setMovimientoAgregado(!movimientoAgregado) }}>
                <div className='MovimientoRealizado'>
                    <h1>Movimiento Realizado</h1>
                    <img src={"/movimientos/mov" + movimiento?.carta.movimiento + ".svg"}></img>
                </div>
            </Overlay>
            <Overlay isOpen={movimientoDeshecho} onClose={() => { setMovimientoDeshecho(!movimientoDeshecho) }}>
                <div className='MovimientoRealizado'>
                    <h1>Movimiento Deshecho</h1>
                </div>
            </Overlay>
        </div>
    )
}

export default Juego;