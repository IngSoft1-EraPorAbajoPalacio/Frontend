import "../../../../styles/Game/Juego.css";
import { PartidaEnCurso, JugadorEnCurso, CartaMovimiento } from "../../../../types/partidaEnCurso";
import PasarTurno from "../../../hooks/Game/PasarTurno";
import { obtenerPartidaEnCurso } from "../../../context/GameContext";
import { SetStateAction, useState } from "react";

const EXT = ".svg";

export function MostrarFiguras(jugador: JugadorEnCurso, turnoActual: number | null) {
    const cartas = jugador.cartasFigura;
    const PATH = "/figuras/fig";
    const [figSelec, setFigSelec] = useState<number | null>(null);

    const cartasSrc: string[] = cartas.map(carta => {
        if (carta.figura <= 9) return PATH + "0" + carta.figura + EXT;
        else if (carta.figura <= 25) return PATH + carta.figura + EXT;
        else {console.error("Error carta número");
            return "";}
    });

    return (
        <div className="ManoHorizontal">
            <h2 className={`${turnoActual !== null && jugador.id === turnoActual ? "JugadorEnTurno" : "NoTurno"}`}> {jugador.nombre} </h2>
            <div>
                {cartasSrc?.map((src: string | undefined, index: number) => 
                    <img key={index} className={"Figura" + (figSelec === index ? "Selec" : "")} 
                        onClick={()=>setFigSelec(index)} src={src}/>)}
            </div>
        </div>
    )
}

interface MostrarMovimientosProps {
    partida: PartidaEnCurso | null;
}

export function MostrarMovimientos({ partida }: MostrarMovimientosProps) {

    const jugadordado = partida?.jugadores.find((jugador: JugadorEnCurso) => jugador.cartasMovimiento.length === 3);
    const cartasSrc = jugadordado?.cartasMovimiento.map((carta: CartaMovimiento) => "/movimientos/mov" + carta.movimiento + EXT);  

    return (
        <div id='ManoJugador'>
            <button>Abandonar Partida</button>
            {jugadordado?.id === turnoActual ?
                <button onClick={handlePasarTurno}>Pasar Turno</button> :
                <button disabled>Pasar Turno</button>
            }
            <div className="ManoHorizontal">
                <div> 
                    {cartasSrc?.map((src: string | undefined, index: number) => (
                        <img key={index} className="Movimiento" src={src} alt="Movimiento" />
                    ))} 
                </div>
            </div>
        </div>
    );
}