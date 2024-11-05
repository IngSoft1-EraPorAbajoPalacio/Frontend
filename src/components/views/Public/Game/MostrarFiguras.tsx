import { useEffect } from "react";
import "../../../../styles/Game/Juego.css";
import { CartaFigura, JugadorEnCurso } from "../../../../types/partidaEnCurso";
import { actualizarCartaFigDescarte, handleActualizarCartaFigDescarte } from "./figuraUtils";
import { useParams } from "react-router-dom";

const EXT = ".svg";
const PATH = "/figuras/fig";

interface MostrarFigurasProps {
    jugador: JugadorEnCurso;
    turnoActual: number | null;
    cartaFiguraDescarte: string | null;
    setCartaFiguraDescarte: React.Dispatch<React.SetStateAction<string | null>>;
    manoFigura: CartaFigura[];
}

export const MostrarFiguras: React.FC<MostrarFigurasProps> = ({ jugador, turnoActual, cartaFiguraDescarte, setCartaFiguraDescarte, manoFigura }) => {

    const { playerId } = useParams<{ playerId: string }>();
    const idJugador = Number(playerId);

    const obtenerSrc = (figura: number) => {
        if (figura <= 9) return PATH + "0" + figura + EXT;
        else if (figura <= 25) return PATH + figura + EXT;

        return "";
    }
    
    useEffect(() => {
        if (turnoActual !== idJugador) setCartaFiguraDescarte(null);
    }, [turnoActual]);

    return (
        <div className="ManoHorizontal">
            <h2 className={`${turnoActual !== null && jugador.id === turnoActual ? "JugadorEnTurno" : "NoTurno"}`}> {jugador.nombre} </h2>
            <div>
                {manoFigura?.map((carta: CartaFigura) => carta.bloqueada ?
                    <img key={carta.id} className={actualizarCartaFigDescarte(carta.id.toString(), cartaFiguraDescarte)} src="/figuras/back-fig.svg" /> :            
                    <img 
                        key={carta.id}
                        className={actualizarCartaFigDescarte(carta.id.toString(), cartaFiguraDescarte)}
                        onClick={() => {if (jugador.id === turnoActual)
                            handleActualizarCartaFigDescarte(carta.id.toString(), idJugador, cartaFiguraDescarte, setCartaFiguraDescarte, turnoActual)}}
                        src={obtenerSrc(carta.figura)} 
                    />
                )}
            </div>
        </div>
    )
}

export default MostrarFiguras