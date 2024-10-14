import "../../../../styles/Game/Juego.css";
import { PartidaEnCurso, JugadorEnCurso, CartaMovimiento } from "../../../../types/partidaEnCurso";

const EXT = ".svg";

export function MostrarFiguras(jugador: JugadorEnCurso, turnoActual: number | null) {
    const cartas = jugador.cartasFigura;
    const PATH = "/figuras/fig";

    const cartasSrc: string[] = cartas.map(carta => {
        if (carta.figura <= 9) return PATH + "0" + carta.figura + EXT;
        else if (carta.figura <= 25) return PATH + carta.figura + EXT;
        else {console.error("Error carta número");
            return "";}
    });

    return (
        <div className="ManoHorizontal">
            <h2 className={`${turnoActual !== null && jugador.id === turnoActual ? "JugadorEnTurno" : "NoTurno"}`}> {jugador.nombre} </h2>
            <div className="Cartas">
                {cartasSrc?.map((src: string | undefined, index: number) => <img key={index} className="Figura" src={src}/>)}
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
        <div className="ManoHorizontal">
            <div className="Cartas"> 
                {cartasSrc?.map((src: string | undefined, index: number) => (
                    <img key={index} className="Movimiento" src={src} alt="Movimiento" />
                ))} 
            </div>
        </div>
    );
}