import "../../../../styles/Game/Juego.css";
import { CartaMovimiento } from "../../../../types/partidaEnCurso";
import DeshacerMovimiento from "../../../hooks/Game/DeshacerMovimiento";

const EXT = ".svg";

interface MostrarMovimientosProps {
    idPartida: number;
    idJugador: number;
    setCartaMovimientoSeleccionado: React.Dispatch<React.SetStateAction<CartaMovimiento | null>>;
    turnoActual: number | null;
    manoMovimiento: CartaMovimiento[] | null;
    setManoMovimiento: React.Dispatch<React.SetStateAction<CartaMovimiento[] | null>>;
    movimientosJugados: number;
    setMovimientosJugados: React.Dispatch<React.SetStateAction<number>>;
}

function MostrarMovimientos({ idPartida, idJugador, setCartaMovimientoSeleccionado, turnoActual, manoMovimiento, setManoMovimiento, movimientosJugados, setMovimientosJugados }
    : MostrarMovimientosProps) {
    const handleHacerMovimiento = (carta: CartaMovimiento) => {
        setCartaMovimientoSeleccionado((cartaSeleccionada: CartaMovimiento | null) => {

            // Si no hay carta seleccionada, selecciona la carta
            if (cartaSeleccionada === null) {
                carta.seleccionada = true;
                return carta;
            }

            // Si la carta seleccionada es la misma que la carta actual, la deselecciona
            else if (cartaSeleccionada.id === carta.id) {
                carta.seleccionada = false;
                return null;
            }

            // Si la carta seleccionada es diferente a la carta actual, no hace nada
            return cartaSeleccionada;
        });
    }

    const handleDeshacerMovimiento = async () => {
        const carta: CartaMovimiento | undefined = await DeshacerMovimiento(idPartida, idJugador);
        if (carta !== undefined) setManoMovimiento((manoMovimiento: CartaMovimiento[] | null) => {
            if (!manoMovimiento) return [];
            return [...manoMovimiento, carta]
        });
        setMovimientosJugados(movimientosJugados - 1);
    }

    return (
        <div className="ManoHorizontal">
            { movimientosJugados > 0 ?
                <button
                    id="DeshacerMovimiento"
                    onClick={() => handleDeshacerMovimiento()}
                > Deshacer Movimiento </button> :
                <div></div> }
            <div className="Cartas"> 
                {manoMovimiento ? manoMovimiento.map((carta: CartaMovimiento) => (
                    <img
                        key={carta.id}
                        className={"Movimiento"+`${carta.seleccionada ? '-con-seleccion' : '' }`}
                        src={"/movimientos/mov" + carta.movimiento + EXT}
                        alt="Movimiento"
                        onClick={() => {if (turnoActual === idJugador) handleHacerMovimiento(carta)}}
                    />
                )):<div></div>} 
            </div>
        </div>
    );
}

export default MostrarMovimientos;