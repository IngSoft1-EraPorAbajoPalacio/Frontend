import Tablero from "../views/Public/Game/Tablero";
import "../../styles/Game/Juego.css";
import MostrarMovimientos from "../views/Public/Game/MostrarMovimientos";
import MostrarFiguras from "../views/Public/Game/MostrarFiguras";
import { CartaFigura, CartaMovimiento, color, JugadorEnCurso, Movimiento, PartidaEnCurso } from "../../types/partidaEnCurso";
import { useEffect, useState } from "react";
import { borrarPartida, obtenerPartidaEnCurso, borrarPartidaEnCurso, obtenerMovimientos, obtenerJugador1, obtenerJugador2, obtenerJugador3, obtenerJugador4, obtenerFiguraJugador1, obtenerFiguraJugador2, obtenerFiguraJugador4, obtenerFiguraJugador3, obtenerColorProhibido } from "../context/GameContext";
import ObtenerMensajes from "../hooks/Game/ObtenerMensajes";
import createSocketGame from "../../services/socketGame";
import useRouteNavigation from "../routes/RouteNavigation";
import { useParams } from 'react-router-dom';
import AbandonarPartida from "../hooks/AbandonarPartida";
import PasarTurno from "../hooks/Game/PasarTurno";
import ColorProhibido from "../views/Public/Game/ColorProhibido";
import Overlay from '../../components/views/Public/Overlay';
import '../../styles/Game/Overlay.css';
import DeshacerMovimientos from "../hooks/Game/DeshacerMovimientos";

import { Figura } from "../../types/figura";


function Juego () {
    const [partida, setPartida] = useState<PartidaEnCurso | null>(obtenerPartidaEnCurso())
    const [turnoActual, setTurnoActual] = useState<number | null>(partida?.orden[0] ?? null);
    const [newSocket, setSocket] = useState<WebSocket | null>(null);
    const [desconexionesGame, setDesconexionesGame] = useState(0);
    const [cartaFiguraDescarte, setCartaFiguraDescarte] = useState<string | null>(null);
    const [marcaFiguras, setMarcaFiguras] = useState<number[]>([]);
    const [movimiento, setMovimiento] = useState<Movimiento | null>(null);
    const [movimientoAgregado, setMovimientoAgregado] = useState<boolean>(false);
    const [movimientoDeshecho, setMovimientoDeshecho] = useState<boolean>(false);
    const [cartaMovimientoSeleccionado, setCartaMovimientoSeleccionado] = useState<CartaMovimiento | null>(null);
    const [manoMovimiento, setManoMovimiento] = useState<CartaMovimiento[]>(obtenerMovimientos());
    const [movimientosJugados, setMovimientosJugados] = useState(0);
    const [figurasDetectadas, setFigurasDetectadas] = useState<Figura[]>([]);
    const [figuraSeleccionada, setFiguraSeleccionada] = useState<number | null>(null);

    const [figuraJug1, setFiguraJug1] = useState<CartaFigura[] >(obtenerFiguraJugador1());
    const [figuraJug2, setFiguraJug2] = useState<CartaFigura[] >(obtenerFiguraJugador2());
    const [figuraJug3, setFiguraJug3] = useState<CartaFigura[] >(obtenerFiguraJugador3());
    const [figuraJug4, setFiguraJug4] = useState<CartaFigura[] >(obtenerFiguraJugador4());

    const [jugador1, setJugador1] = useState<JugadorEnCurso | null>(obtenerJugador1());
    const [jugador2, setJugador2] = useState<JugadorEnCurso | null>(obtenerJugador2());
    const [jugador3, setJugador3] = useState<JugadorEnCurso | null>(obtenerJugador3());
    const [jugador4, setJugador4] = useState<JugadorEnCurso | null>(obtenerJugador4());

    const [colorProhibido, setColorProhibido] = useState<color | null>(obtenerColorProhibido());
    
    const [marcadasPorSelec, setMarcadasPorSelec] = useState<number[]>([]);
    const { redirectToNotFound, redirectToHome, redirectToEnd } = useRouteNavigation();
    const { gameId, playerId } = useParams<{ gameId: string; playerId: string }>();
    const idJugador = Number(playerId);
    const idPartida = Number(gameId);
    if (isNaN(idJugador) || isNaN(idPartida)) redirectToNotFound();

    useEffect(() => {
        const newSocket = createSocketGame(setDesconexionesGame);
        setSocket(newSocket);
        return ObtenerMensajes(setTurnoActual, setMovimiento, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados, (finalizado, idGanador?: number, nombreGanador?: string) => {
            if (finalizado) {
                newSocket.close();
                borrarPartida();
                if (idGanador && nombreGanador) redirectToEnd(idPartida, idJugador, idGanador, nombreGanador);
                else redirectToEnd(idPartida, idJugador, idJugador, 'ganador');
            }
        }, newSocket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec,
        setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4,
        setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);
    }, [desconexionesGame]);

    const handleAbandonarPartida = async () => {
        if (idJugador == turnoActual){
            await DeshacerMovimientos(idPartida, idJugador, setManoMovimiento);
            await PasarTurno(idPartida, idJugador);
        }
        AbandonarPartida(idPartida, idJugador);  
        if (newSocket) newSocket.close();
        borrarPartidaEnCurso();
        redirectToHome();
    };

    const handlePasarTurno = () => {
        setCartaMovimientoSeleccionado((cartaSeleccionada: CartaMovimiento | null) => {
            if (cartaSeleccionada !== null) cartaSeleccionada.seleccionada = false;
            return null;
        });
        DeshacerMovimientos(idPartida, idJugador, setManoMovimiento);
        PasarTurno(idPartida, idJugador);
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

    return (
        <div id='Juego'>
            <ColorProhibido
                colorProhibido={colorProhibido}
            />
            <div id="Centro">
                <div className="ManosHorizontal">
                    {jugador1 ?
                     <MostrarFiguras
                        jugador={jugador1}
                        turnoActual={turnoActual} 
                        cartaFiguraDescarte={cartaFiguraDescarte}
                        setCartaFiguraDescarte={setCartaFiguraDescarte} 
                        manoFigura={figuraJug1}
                    /> : <div className="ManoHorizontal"></div>}
                    
                    {jugador4 ?
                    <MostrarFiguras
                        jugador={jugador4}
                        turnoActual={turnoActual} 
                        cartaFiguraDescarte={cartaFiguraDescarte}
                        setCartaFiguraDescarte={setCartaFiguraDescarte}
                        manoFigura={figuraJug4}
                    /> : <div className="ManoHorizontal"></div>}
                </div>

                <Tablero 
                    colorProhibido={colorProhibido}
                    marcaFiguras={marcaFiguras} 
                    figurasDetectadas={figurasDetectadas} 
                    setFiguraSeleccionada={setFiguraSeleccionada}
                    setMarcaFiguras={setMarcaFiguras}
                    marcadasPorSelec={marcadasPorSelec}
                    setMarcadasPorSelec={setMarcadasPorSelec}
                    setMovimientosJugados={setMovimientosJugados}
                    setCartaMovimientoSeleccionado={setCartaMovimientoSeleccionado}
                    cartaMovimientoSeleccionado={cartaMovimientoSeleccionado}
                    turnoActual={turnoActual}
                    idPartida={idPartida}
                    idJugador={idJugador}
                    cartaFiguraDescarte={cartaFiguraDescarte}
                    setCartaFiguraDescarte={setCartaFiguraDescarte}
                />
                <div className="ManosHorizontal">
                    {jugador2 ? 
                    <MostrarFiguras
                        jugador={jugador2}
                        turnoActual={turnoActual} 
                        cartaFiguraDescarte={cartaFiguraDescarte}
                        setCartaFiguraDescarte={setCartaFiguraDescarte} 
                        manoFigura={figuraJug2}
                    /> : <div className="ManoHorizontal"></div>}
                    {jugador3 ? 
                    <MostrarFiguras
                        jugador={jugador3}
                        turnoActual={turnoActual} 
                        cartaFiguraDescarte={cartaFiguraDescarte}
                        setCartaFiguraDescarte={setCartaFiguraDescarte} 
                        manoFigura={figuraJug3}
                    />
                    : <div className="ManoHorizontal"></div>}
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
                    setCartaMovimientoSeleccionado={setCartaMovimientoSeleccionado}
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