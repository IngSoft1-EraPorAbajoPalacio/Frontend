import "../../../../styles/Game/Juego.css";
import { JugadorEnCurso } from "../../../../types/partidaEnCurso";

const EXT = ".svg";

interface MostrarFigurasProps {
    jugador: JugadorEnCurso;
    turnoActual: number | null;
}

function MostrarFiguras({jugador, turnoActual}: MostrarFigurasProps) {
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

export default MostrarFiguras