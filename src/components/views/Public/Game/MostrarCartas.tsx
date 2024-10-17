import "../../../../styles/Game/Juego.css";
import { PartidaEnCurso, JugadorEnCurso, CartaMovimiento, Movimiento, Ficha } from "../../../../types/partidaEnCurso";
import { borrarFichasSeleccionadas } from "../../../context/GameContext";
import JugarMovimiento from "../../../hooks/Game/JugarMovimiento";
import VerificarMovimiento from "./VerificarMovimiento";

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
    idPartida: number;
    idJugador: number;
    fichasSeleccionadas: Ficha[];
    turnoActual: number | null;
}

export function MostrarMovimientos({ partida, idPartida, idJugador, fichasSeleccionadas, turnoActual }: MostrarMovimientosProps) {

    const handleClick = (carta: CartaMovimiento) => {
        if (fichasSeleccionadas){
            const movimiento = new Movimiento(carta, fichasSeleccionadas[0], fichasSeleccionadas[1])
            const esValido = VerificarMovimiento(movimiento, idJugador, turnoActual);
            if(!esValido) window.alert("Movimiento inválido");
            else JugarMovimiento(idPartida, idJugador, movimiento);
            borrarFichasSeleccionadas();
        }
    }

    const jugadordado = partida?.jugadores.find((jugador: JugadorEnCurso) => jugador.cartasMovimiento.length === 3);

    return (
        <div className="ManoHorizontal">
            <div className="Cartas"> 
                {jugadordado?.cartasMovimiento?.map((carta: CartaMovimiento) => (
                    <img
                        key={carta.id}
                        className="Movimiento"
                        src={"/movimientos/mov" + carta.movimiento + EXT}
                        alt="Movimiento"
                        onClick={() => {handleClick(carta)}}
                    />
                ))} 
            </div>
        </div>
    );
}