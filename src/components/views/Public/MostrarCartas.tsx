import "../../../styles/Juego.css";
import { PartidaEnCurso, JugadorEnCurso, CartaMovimiento } from "../../../types/partidaEnCurso";
import { PasarTurno } from "../../hooks/PasarTurno";
import { obtenerPartidaEnCurso } from "../../context/GameContext";
import { SetStateAction } from "react";

const EXT = ".svg";

export function MostrarFiguras(jugador: JugadorEnCurso, turnoActual: number | null) {
    const cartas = jugador.cartasFigura;
    const PATH = "figuras/fig";
    const partida = obtenerPartidaEnCurso();

    const cartasSrc: string[] = cartas.map(carta => {
        if (carta.figura <= 9) return PATH + "0" + carta.figura + EXT;
        else if (carta.figura <= 18) return PATH + carta.figura + EXT;
        else return PATH + "0" + (carta.figura-18) + EXT;
    });

    return (
        <div className="ManoHorizontal">
            <h2 className={`${turnoActual !== null && jugador.id === partida.orden[turnoActual] ? "JugadorEnTurno" : "NoTurno"}`}> {jugador.nombre} </h2>
            <div className="Cartas">
                {cartasSrc?.map((src: string) => <img className="Figura" src={src}/>)}
            </div>
        </div>
    )
}

export function MostrarMovimientos({ partida, setPartida }: { partida: PartidaEnCurso | null, setPartida: React.Dispatch<SetStateAction<PartidaEnCurso | null>> }) {

    console.log("Turno actual: ", partida?.orden[partida?.turnoActual]);
    const jugadordado = partida?.jugadores.find((jugador: JugadorEnCurso) => jugador.id === 1); // Para moquear el contexto del jugador
    const cartasSrc = jugadordado?.cartasMovimiento.map((carta: CartaMovimiento) => "movimientos/mov" + carta.movimiento + EXT);

    const handlePasarTurno = () => {
        PasarTurno();
        const nuevaPartida = obtenerPartidaEnCurso();
        setPartida(nuevaPartida);
    }    

    return (
        <div id='ManoJugador'>
            <button>Abandonar Partida</button>
            {jugadordado?.id === partida?.orden[partida?.turnoActual] ?
                <button onClick={handlePasarTurno}>Pasar Turno</button> :
                <button disabled>Pasar Turno</button>
            }
            <div className="ManoHorizontal">
                <div className="Cartas">
                    {cartasSrc?.map((src: string | undefined) => <img className="Movimiento" src={src} alt="Movimiento" />)}
                </div>
            </div>
        </div>
    );
}