import "../../../../styles/Game/Juego.css";
import { PartidaEnCurso, CartaMovimiento, Movimiento, Ficha } from "../../../../types/partidaEnCurso";
import { borrarFichasSeleccionadas } from "../../../context/GameContext";
import JugarMovimiento from "../../../hooks/Game/JugarMovimiento";
import VerificarMovimiento from "./VerificarMovimiento";
import DeshacerMovimiento from "../../../hooks/Game/DeshacerMovimiento";

const EXT = ".svg";

interface MostrarMovimientosProps {
    partida: PartidaEnCurso | null;
    idJugador: number;
    setFichasSeleccionadas: React.Dispatch<React.SetStateAction<Ficha[]>>;
    turnoActual: number | null;
    manoMovimiento: CartaMovimiento[];
    setManoMovimiento: React.Dispatch<React.SetStateAction<CartaMovimiento[]>>;
    movimientosJugados: number;
    setMovimientosJugados: React.Dispatch<React.SetStateAction<number>>;
}

function MostrarMovimientos({ partida, idJugador, setFichasSeleccionadas, turnoActual, manoMovimiento, setManoMovimiento, movimientosJugados, setMovimientosJugados }: MostrarMovimientosProps) {

    const handleHacerMovimiento = (carta: CartaMovimiento) => {
        setFichasSeleccionadas((fichasSeleccionadas: Ficha[]) => {

            //si hay fichas seleccionadas juega el movimiento
            if (fichasSeleccionadas.length !== 0) {
                const movimiento = new Movimiento(carta, fichasSeleccionadas[0], fichasSeleccionadas[1]);
                const esValido = VerificarMovimiento(movimiento, idJugador, turnoActual);

                borrarFichasSeleccionadas();

                if (!esValido) window.alert("Movimiento inválido");
                else{
                    JugarMovimiento(partida?.id ?? null, idJugador, movimiento);
                    setMovimientosJugados(movimientosJugados + 1);
                }

                return [];
            }

            return fichasSeleccionadas;
        });
    }

    const handleDeshacerMovimiento = async () => {
        const carta: CartaMovimiento | undefined = await DeshacerMovimiento(partida?.id ?? null, idJugador);
        if (carta !== undefined) setManoMovimiento((manoMovimiento: CartaMovimiento[]) => [...manoMovimiento, carta]);
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
                {manoMovimiento.map((carta: CartaMovimiento) => (
                    <img
                        key={carta.id}
                        className="Movimiento"
                        src={"/movimientos/mov" + carta.movimiento + EXT}
                        alt="Movimiento"
                        onClick={() => {if (turnoActual === idJugador) handleHacerMovimiento(carta)}}
                    />
                ))} 
            </div>
        </div>
    );
}

export default MostrarMovimientos;