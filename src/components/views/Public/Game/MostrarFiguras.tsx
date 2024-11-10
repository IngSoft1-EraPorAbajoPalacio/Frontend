import { useEffect } from "react";
import "../../../../styles/Game/Juego.css";
import { CartaFigura, JugadorEnCurso } from "../../../../types/partidaEnCurso";
import { actualizarCartaFigDescarte, handleActualizarCartaFigDescarte } from "./figuraUtils";
import { useParams } from "react-router-dom";

const EXT = ".svg";

interface MostrarFigurasProps {
    jugador: JugadorEnCurso;
    turnoActual: number | null;
    cartaFiguraDescarte: string | null;
    setCartaFiguraDescarte: React.Dispatch<React.SetStateAction<string | null>>;
    manoFigura: CartaFigura[] | null;
}

export const MostrarFiguras: React.FC<MostrarFigurasProps> =
    ({ jugador, turnoActual, cartaFiguraDescarte, setCartaFiguraDescarte, manoFigura }) => {
        const PATH = "/figuras/fig";

        const { playerId } = useParams<{ playerId: string }>();
        const idJugador = Number(playerId);
        
        const cartasSrc: string[] = manoFigura ? manoFigura.map((carta: CartaFigura) => {
            if (carta.figura <= 9) return PATH + "0" + carta.figura + EXT;
            else if (carta.figura <= 25) return PATH + carta.figura + EXT;
    
            console.error("Error carta número");
            return "";
        }) : [];
        
        useEffect(() => {
            if (turnoActual !== idJugador) setCartaFiguraDescarte(null);
        }, [turnoActual]);

    return (
<div className="ManoHorizontal">
    <h2 className={`${turnoActual !== null && jugador.id === turnoActual ? "JugadorEnTurno" : "NoTurno"}`}> {jugador.nombre} </h2>
    <div>
        {cartasSrc?.map((src: string, index: number) =>
            <img 
                key={index}
                className={manoFigura ? actualizarCartaFigDescarte(manoFigura[index].id.toString(), cartaFiguraDescarte) : ""}
                onClick={() => {if (manoFigura && jugador.id === turnoActual)
                    handleActualizarCartaFigDescarte(manoFigura[index].id.toString(), idJugador, cartaFiguraDescarte, setCartaFiguraDescarte, turnoActual)}}
                src={src} 
            />)
        }
    </div>
</div>
    )
}

export default MostrarFiguras