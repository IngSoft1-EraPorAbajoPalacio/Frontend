import Tablero from "../views/Public/Game/Tablero";
import "../../styles/Game/Juego.css";
import { MostrarFiguras, MostrarMovimientos } from "../views/Public/Game/MostrarCartas";
import { JugadorEnCurso, PartidaEnCurso } from "../../types/partidaEnCurso";
import { useEffect, useState } from "react";
import { obtenerPartidaEnCurso } from "../context/GameContext";
import ObtenerMensajes from "../hooks/Game/ObtenerMensajes";
import createSocketGame from "../../services/socketGame";

function Juego () {
    const [partida, setPartida] = useState<PartidaEnCurso | null>(obtenerPartidaEnCurso())
    const [turnoActual, setTurnoActual] = useState<number | null>(partida?.orden[0] ?? null);
    const [desconexionesGame, setDesconexionesGame] = useState(0);

    useEffect(()=> {
        const socket = createSocketGame();
        const cerrarSocketCon = ObtenerMensajes(setTurnoActual, socket);

        socket.onclose = () => {
            console.log('WebSocket connection closed');
            setTimeout(() => {
                setDesconexionesGame(prev => prev + 1);
            }, 1000);
        };
        return cerrarSocketCon;
    }, [desconexionesGame]);
           
        
    const jugador1 = partida?.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida?.orden[0]);
    const jugador2 = partida?.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida?.orden[1]);
    const jugador3 = (partida && partida.cantJugadores > 2) ? partida.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida.orden[2]) : null;
    const jugador4 = (partida && partida.cantJugadores > 3) ? partida?.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida?.orden[3]) : null;

    return (
        <div id='Juego'>
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
            <MostrarMovimientos partida={partida} turnoActual={turnoActual} setPartida={setPartida} />
        </div>
    )
}

export default Juego;