import Tablero from "../views/Public/Game/Tablero";
import "../../styles/Game/Juego.css";
import { MostrarFiguras, MostrarMovimientos } from "../views/Public/Game/MostrarCartas";
import { JugadorEnCurso, PartidaEnCurso } from "../../types/partidaEnCurso";
import { useEffect, useState } from "react";
import { obtenerPasarTurno } from "../hooks/Game/ObtenerPasarTurno";
import socket from "../../services/sockets";
import { useNavigate } from 'react-router-dom';
import { Paths } from "../../types/routes.types";
import { obtenerPartidaEnCurso } from "../context/GameContext";

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

    }, [navigate]);

    obtenerPasarTurno(setPartida);

    useEffect(() => {
        setPartida(obtenerPartidaEnCurso())
    }, []);
    
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