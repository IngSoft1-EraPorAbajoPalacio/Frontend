// import { obtenerJugador } from "../context/PlayerContext";
import "../../styles/End/finalizacion.css";
import useRouteNavigation from "../routes/RouteNavigation";
import { useParams } from 'react-router-dom';

export default function End () {
    // if (ganador == obtenerJugador().nombre) {
    const { gameId, playerId } = useParams<{ gameId: string; playerId: string }>();
    const { redirectToHome } = useRouteNavigation();
    const {redirectToNotFound} = useRouteNavigation();
    const idJugador = Number(playerId);
    const idPartida = Number(gameId);
    if (isNaN(idJugador) || isNaN(idPartida)) return redirectToNotFound();


    const handleClick = () => {
       redirectToHome();
    }
 
    return (
            <>
                <img src= 'https://img.freepik.com/vector-gratis/trofeo-estilo-plano_78370-3222.jpg?size=626&ext=jpg'
                     className="trofeopic"
                />
                <div><h1 className="gano_perdio">Ganaste!</h1></div>
                <div><button onClick={handleClick} 
                      className="botoninicio"
                  >Volver al inicio</button></div>
            </>
        )}

        // caso de perdedor, pero ahora no se usa xd
    // else {
    //   return (
    //        <div>
    //           <div><h2 className="ganador">Ganador: {ganador}</h2></div>
    //           <div><h1 className="gano_perdio">Perdiste!</h1></div>
    //           <Inicioboton />
    //         </div>
    //    )
    //    }
// }