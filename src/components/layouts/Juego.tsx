import Tablero from "../views/Public/Tablero";
import obtenerDatosPartida from "../hooks/ObtenerDatosPartida";
import "../../styles/Juego.css";
import { obtenerPartidaEnCurso } from "../context/GameContext";
import { MostrarFiguras, MostrarMovimientos } from "../views/Public/MostrarCartas";
import { JugadorEnCurso, PartidaEnCurso } from "../../types/partidaEnCurso";
import { useEffect, useState } from "react";
import { obtenerPasarTurno } from "../hooks/ObtenerPasarTurno";
import { socket } from "../hooks/sockets";
import { useNavigate } from 'react-router-dom';
import { Paths } from "../../types/routes.types";

function Juego () {
    const [partida, setPartida] = useState<PartidaEnCurso | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleTerminarPartida = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.type === 'TerminarPartida') {
                navigate(Paths.End);
            }
        };
    
        // Add event listener for messages
        socket.addEventListener('message', handleTerminarPartida);
    
        // Cleanup on unmount
        return () => {
            socket.removeEventListener('message', handleTerminarPartida);
        };
    }, [navigate])

    obtenerPasarTurno(setPartida);
    
    const jugador1 = partida?.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida?.orden[0]);
    const jugador2 = partida?.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida?.orden[1]);
    const jugador3 = (partida && partida.cantJugadores > 2) ? partida.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida.orden[2]) : null;
    const jugador4 = (partida && partida.cantJugadores > 3) ? partida?.jugadores.find((jugador: JugadorEnCurso) => jugador.id === partida?.orden[3]) : null;

    return (
        <div id='Juego'>
            <div id="Centro">
                <div className="ManosHorizontal">
                    {jugador1 ? MostrarFiguras(jugador1, partida?.turnoActual ?? null): <div className="ManoHorizontal"></div>}
                    {jugador4 ? MostrarFiguras(jugador4, partida?.turnoActual ?? null): <div className="ManoHorizontal"></div>}
                </div>
                <Tablero />
                <div className="ManosHorizontal">
                    {jugador2 ? MostrarFiguras(jugador2, partida?.turnoActual ?? null): <div className="ManoHorizontal"></div>}
                    {jugador3 ? MostrarFiguras(jugador3, partida?.turnoActual ?? null): <div className="ManoHorizontal"></div>}
                </div>
            </div>
            <MostrarMovimientos partida={partida} setPartida={setPartida} />
        </div>
    )
}

export default Juego;