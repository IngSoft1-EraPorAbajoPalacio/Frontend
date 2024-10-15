import Tablero from "../views/Public/Game/Tablero";
import "../../styles/Game/Juego.css";
import { MostrarFiguras, MostrarMovimientos } from "../views/Public/Game/MostrarCartas";
import { CartaMovimiento, JugadorEnCurso, Movimiento, PartidaEnCurso } from "../../types/partidaEnCurso";
import { useEffect, useState } from "react";
import { borrarPartidaEnCurso, obtenerPartidaEnCurso } from "../context/GameContext";
import ObtenerMensajes from "../hooks/Game/ObtenerMensajes";
import createSocketGame from "../../services/socketGame";
import useRouteNavigation from "../routes/RouteNavigation";
import { useParams } from 'react-router-dom';
import AbandonarPartida from "../hooks/AbandonarPartida";
import PasarTurno from "../hooks/Game/PasarTurno";
import JugarMovimiento from "../hooks/Game/JugarMovimiento";
import VerificarMovimiento from "../views/Public/Game/VerificarMovimiento";

function Juego () {
    const [partida, setPartida] = useState<PartidaEnCurso | null>(obtenerPartidaEnCurso())
    const [turnoActual, setTurnoActual] = useState<number | null>(partida?.orden[0] ?? null);
    const [newSocket, setSocket] = useState<WebSocket | null>(null);
    const [, setFinalizado] = useState(false);
    const [desconexionesGame, setDesconexionesGame] = useState(0);
    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
    const [movimientoAgregado, setMovimientoAgregado] = useState(false);

    const { redirectToNotFound, redirectToHome, redirectToEnd } = useRouteNavigation();
    const { gameId, playerId } = useParams<{ gameId: string; playerId: string }>();
    const idJugador = Number(playerId);
    const idPartida = Number(gameId);
    if (isNaN(idJugador) || isNaN(idPartida)) redirectToNotFound();



    useEffect(() => {
        const newSocket = createSocketGame(setDesconexionesGame);
        setSocket(newSocket);
        return ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, (finalizado) => {
            setFinalizado(finalizado);
            if (finalizado) {
                newSocket.close();
                borrarPartidaEnCurso();
                redirectToEnd(idPartida, idJugador);
            }
        }, newSocket);
    }, [desconexionesGame]);

    const handleAbandonarPartida = async () => {
        if (idJugador == turnoActual) await PasarTurno(idPartida, idJugador);
        AbandonarPartida(idPartida, idJugador);  
        if (newSocket) newSocket.close();
        redirectToHome();
    };

    const handlePasarTurno = () => {
        if (partida) PasarTurno(partida.id, idJugador);
        const nuevaPartida = obtenerPartidaEnCurso();
        setPartida(nuevaPartida);
    }  

    const MovimientoTrucho = () => {
        //Anda solo si el jugador que toca el botón es el primero y la partida es la primera (game/1/player/1)
        const carta = new CartaMovimiento(3, 3);
        const movimiento = new Movimiento(carta, obtenerPartidaEnCurso()?.fichas[0], obtenerPartidaEnCurso()?.fichas[1]);
        if(VerificarMovimiento(movimiento,idJugador, turnoActual)) JugarMovimiento(idPartida, idJugador, movimiento);
    }

        
    const jugador1 = partida?.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida?.orden[0]);
    const jugador2 = partida?.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida?.orden[1]);
    const jugador3 = (partida && partida.cantJugadores > 2) ? partida.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida.orden[2]) : null;
    const jugador4 = (partida && partida.cantJugadores > 3) ? partida?.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida?.orden[3]) : null;

    return (
        <div id='Juego'>
            <button onClick={MovimientoTrucho}>Enviar</button>
            <div id="Centro">
                <div className="ManosHorizontal">
                    {jugador1 ? MostrarFiguras(jugador1, turnoActual): <div className="ManoHorizontal"></div>}
                    {jugador4 ? MostrarFiguras(jugador4, turnoActual): <div className="ManoHorizontal"></div>}
                </div>
                <Tablero />
                <div className="ManosHorizontal">
                    {jugador2 ? MostrarFiguras(jugador2, turnoActual): <div className="ManoHorizontal"></div>}
                    {jugador3 ? MostrarFiguras(jugador3, turnoActual): <div className="ManoHorizontal"></div>}
                </div>
            </div>
            <div id='ManoJugador'>
                {idJugador === turnoActual ?
                    <button onClick={handlePasarTurno}>Pasar Turno</button> :
                    <button disabled>Pasar Turno</button>
                }
                <button onClick={handleAbandonarPartida}>Abandonar Partida</button>
                <MostrarMovimientos partida={partida} />
            </div>
        </div>
    )
}

export default Juego;