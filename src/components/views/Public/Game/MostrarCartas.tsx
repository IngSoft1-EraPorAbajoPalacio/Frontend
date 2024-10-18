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
    idJugador: number;
    setFichasSeleccionadas: React.Dispatch<React.SetStateAction<Ficha[]>>;
    turnoActual: number | null;
    manoMovimiento: CartaMovimiento[];
}

export function MostrarMovimientos({ partida, idJugador, setFichasSeleccionadas, turnoActual, manoMovimiento }: MostrarMovimientosProps) {

    const handleClick = (carta: CartaMovimiento) => {
        setFichasSeleccionadas((fichasSeleccionadas: Ficha[]) => {

            //si hay fichas seleccionadas juega el movimiento
            if (fichasSeleccionadas.length !== 0) {
                const movimiento = new Movimiento(carta, fichasSeleccionadas[0], fichasSeleccionadas[1]);
                const esValido = VerificarMovimiento(movimiento, idJugador, turnoActual);

                borrarFichasSeleccionadas();
                setFichasSeleccionadas([]);

                if (!esValido) window.alert("Movimiento inválido");
                else JugarMovimiento(partida?.id ?? null, idJugador, movimiento);
            }

            return fichasSeleccionadas;

        });
    }

    return (
        <div className="ManoHorizontal">
            <div className="Cartas"> 
                {manoMovimiento.map((carta: CartaMovimiento) => (
                    <img
                        key={carta.id}
                        className="Movimiento"
                        src={"/movimientos/mov" + carta.movimiento + EXT}
                        alt="Movimiento"
                        onClick={() => {if (turnoActual === idJugador) handleClick(carta)}}
                    />
                ))} 
            </div>
        </div>
    );
}