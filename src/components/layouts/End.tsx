import "../../styles/End/finalizacion.css";
import useRouteNavigation from "../routes/RouteNavigation";
import { useParams } from "react-router-dom";
import { obtenerJugador } from "../context/GameContext";

interface RouteParams extends Record<string, string> {
    gameId: string;
    playerId: string;
    winnerId: string;
    winnerName: string
  }

export default function End () {
    const { redirectToHome, redirectToNotFound } = useRouteNavigation();
    const {gameId, playerId, winnerId, winnerName} = useParams<RouteParams>();
    const idJugador = Number(playerId);
    const idPartida = Number(gameId);
    const idGanador = Number(winnerId);
    if (isNaN(idJugador) || isNaN(idPartida) || isNaN(idGanador)) redirectToNotFound();
    if (idJugador != obtenerJugador().id) redirectToNotFound();
    
    if (idJugador === idGanador) {
        return (
            <div className="container">
                <h1>Ganaste!</h1>
                <span>🏆</span>
                <button onClick={redirectToHome} className="botoninicio">Volver al inicio</button>
            </div>
        )
    } else {
        return (
            <div className="container">
                <h2>Ganador: {winnerName}</h2>
                <h1>Perdiste</h1>
                <span>☹</span>
                <button onClick={redirectToHome} className="botoninicio">Volver al inicio</button>
            </div>
        )
    }
    
}