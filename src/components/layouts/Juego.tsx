import Tablero from "../views/Public/Tablero";
import obtenerDatosPartida from "../hooks/ObtenerDatosPartida";
import "../../styles/Juego.css";
import { obtenerPartidaEnCurso } from "../context/GameContext";
import { MostrarFiguras, MostrarMovimientos } from "../views/Public/MostrarCartas";
import { JugadorEnCurso } from "../../types/partidaEnCurso";

function Juego () {

    obtenerDatosPartida();
    const partida = obtenerPartidaEnCurso();

    const jugador1 = partida.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida.orden[0]);
    const jugador2 = partida.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida.orden[1]);
    const jugador3 = (partida.cantJugadores > 2) ? partida.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida.orden[2]) : null;
    const jugador4 = (partida.cantJugadores > 3) ? partida.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida.orden[3]) : null;

    return (
        <div id='Juego'>
            <div id="Centro">
                <div className="ManosHorizontal">
                    {jugador1 ? MostrarFiguras(jugador1): <div className="ManoHorizontal"></div>}
                    {jugador4 ? MostrarFiguras(jugador4): <div className="ManoHorizontal"></div>}
                </div>
                <Tablero />
                <div className="ManosHorizontal">
                    {jugador2 ? MostrarFiguras(jugador2): <div className="ManoHorizontal"></div>}
                    {jugador3 ? MostrarFiguras(jugador3): <div className="ManoHorizontal"></div>}
                </div>
            </div>
            {MostrarMovimientos(partida)}
        </div>
    )
}

export default Juego;