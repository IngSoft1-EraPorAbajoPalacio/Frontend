import "../../../styles/Juego.css";
import { PartidaEnCurso, JugadorEnCurso, CartaMovimiento } from "../../../types/partidaEnCurso";
//import { obtenerJugador } from "../../context/GameContext";

const EXT = ".svg";

export function MostrarFiguras(jugador: JugadorEnCurso) {
    const cartas = jugador.cartasFigura;
    const PATH = "figuras/fig";

    const cartasSrc: string[] = cartas.map(carta => {
        if (carta.figura <= 9) return PATH + "0" + carta.figura + EXT;
        else if (carta.figura <= 18) return PATH + carta.figura + EXT;
        else return PATH + "0" + (carta.figura-18) + EXT;
    });

    return (
        <div className="ManoHorizontal">
            <h2> {jugador.nombre} </h2>
            <div className="Cartas">
                {cartasSrc?.map((src: string) => <img className="Figura" src={src}/>)}
            </div>
        </div>
    )
}

export function MostrarMovimientos(partida: PartidaEnCurso) {
    //const jugadordado = partida.jugadores.find(jugador => jugador.id === obtenerJugador().id);
    const jugadordado = partida.jugadores.find(jugador => jugador.id === 2); // Para moquear el contexto del jugador
    console.log("Jugador dado: ", jugadordado);
    const cartasSrc = jugadordado?.cartasMovimiento.map((carta: CartaMovimiento) => { return "movimientos/mov" + carta.movimiento + EXT; });
    console.log("Cartas de movimiento src: ", cartasSrc);

    return (
        <div id='ManoJugador'>
            <button>Abandonar Partida</button>
            <button>Pasar Turno</button>
            <div className="ManoHorizontal">
                <div className="Cartas">
                    {cartasSrc?.map(src => <img className="Movimiento" src={src}/>)}
                </div>
            </div>
        </div>
    )
}