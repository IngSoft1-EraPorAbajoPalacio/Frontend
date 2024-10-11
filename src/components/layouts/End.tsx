// import { obtenerJugador } from "../context/PlayerContext";
import "../../styles/End/finalizacion.css";
import useRouteNavigation from "../routes/RouteNavigation";

export default function End () {
    const { redirectToHome } = useRouteNavigation();

    return (
        <div className="container">
            <h1>Ganaste!</h1>
            <span>🏆</span>
            <button onClick={redirectToHome} className="botoninicio">Volver al inicio</button>
        </div>
    )
}