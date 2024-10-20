import { useEffect } from "react";
import "../../../../styles/Game/Juego.css";
import { JugadorEnCurso } from "../../../../types/partidaEnCurso";
import { actualizarCartaFigDescarte, handleActualizarCartaFigDescarte } from "../../../../utils/Cartas/figuraUtils";
import { useParams } from "react-router-dom";

const EXT = ".svg";

interface MostrarFigurasProps {
    jugador: JugadorEnCurso;
    turnoActual: number | null;
    cartaFiguraDescarte: string | null;
    setCartaFiguraDescarte: React.Dispatch<React.SetStateAction<string | null>>;
}

export const MostrarFiguras: React.FC<MostrarFigurasProps> =
    ({ jugador, turnoActual, cartaFiguraDescarte, setCartaFiguraDescarte }) => {
        const PATH = "/figuras/fig";

        const { playerId } = useParams<{ playerId: string }>();
        const idJugador = Number(playerId);

        const claveCartaFigSeleccionada = (cartaFigNum: number, id: number) => {
            const cartaFiguraUnica: string = cartaFigNum.toString() + id.toString();
            return cartaFiguraUnica;
        }

        const cartasSrc: string[] = jugador.cartasFigura.map(carta => {
            if (carta.figura <= 9) return PATH + "0" + carta.figura + EXT;
            else if (carta.figura <= 25) return PATH + carta.figura + EXT;
            else {
                console.error("Error carta número");
                return "";
            }
        });

        useEffect(() => {
            if (turnoActual !== idJugador) {
                setCartaFiguraDescarte(null);
            }
        }, [turnoActual]);

    return (
<div className="ManoHorizontal">
                <h2 className={`${turnoActual !== null && jugador.id === turnoActual ? "JugadorEnTurno" : "NoTurno"}`}> {jugador.nombre} </h2>
                <div>
                    {cartasSrc?.map((src: string | undefined, index: number) =>
                        <img key={index} className={actualizarCartaFigDescarte(claveCartaFigSeleccionada(index, jugador.id), cartaFiguraDescarte)}
                            onClick={() => handleActualizarCartaFigDescarte(claveCartaFigSeleccionada(index, jugador.id), idJugador,
                                cartaFiguraDescarte, setCartaFiguraDescarte, turnoActual)} src={src} />)}
                </div>
            </div>
    )
}

export default MostrarFiguras