import { CartaFigura, JugadorEnCurso } from "../../../types/partidaEnCurso";
import { guardarJugador1, guardarJugador2, guardarJugador3, guardarJugador4, guardarColorProhibido, guardarFichasTablero, guardarFiguraJugador1, guardarFiguraJugador2, guardarFiguraJugador3, guardarFiguraJugador4, guardarMovimientos, guardarTurnoActual} from "../../context/GameContext";

const handleIniciarPartida = (
	mensaje: any,
	setFiguraJug1: React.Dispatch<React.SetStateAction<CartaFigura[] | null>>,
	setFiguraJug2: React.Dispatch<React.SetStateAction<CartaFigura[] | null>>,
	setFiguraJug3: React.Dispatch<React.SetStateAction<CartaFigura[] | null>>,
	setFiguraJug4: React.Dispatch<React.SetStateAction<CartaFigura[] | null>>,
	setJugador1: React.Dispatch<React.SetStateAction<JugadorEnCurso | null>>,
	setJugador2: React.Dispatch<React.SetStateAction<JugadorEnCurso | null>>,
	setJugador3: React.Dispatch<React.SetStateAction<JugadorEnCurso | null>>,
	setJugador4: React.Dispatch<React.SetStateAction<JugadorEnCurso | null>>,
) => {

	guardarFichasTablero(mensaje.fichas);
	guardarTurnoActual(mensaje.turno);
	guardarColorProhibido(mensaje.colorProhibido);
	guardarMovimientos(mensaje.cartasMovimiento);


	let jugador1: JugadorEnCurso | null = null;
    let jugador2: JugadorEnCurso | null = null;
    let jugador3: JugadorEnCurso | null = null;
    let jugador4: JugadorEnCurso | null = null;

    // Asigna los jugadores segun id en el orden 1, 2, 3, 4
    mensaje.cartasFigura.forEach((jugador: any, index: number) => {
        if (jugador.idJugador !== null) {
            const jugadorActual = new JugadorEnCurso(jugador.idJugador, jugador.nombreJugador);
            if (index === 0) {
                jugador1 = jugadorActual;
            } else if (index === 1) {
                jugador2 = jugadorActual;
            } else if (index === 2) {
                jugador3 = jugadorActual;
            } else if (index === 3) {
                jugador4 = jugadorActual;
            }
        }
    });

	// Guarda los jugadores en el contexto
	guardarJugador1(jugador1);
	guardarJugador2(jugador2);
	guardarJugador3(jugador3);
	guardarJugador4(jugador4);

	// Settea los jugadores
	setJugador1(jugador1);
	setJugador2(jugador2);
	setJugador3(jugador3);
	setJugador4(jugador4);

	let cartasJugador1: any = null;
    let cartasJugador2: any = null;
    let cartasJugador3: any = null;
    let cartasJugador4: any = null;

	// Asigna las cartas de los jugadores en el orden 1, 2, 3, 4
    mensaje.cartasFigura.forEach((jugador: any, index: number) => {
        if (jugador.cartas !== null) {
            if (index === 0) {
                cartasJugador1 = jugador.cartas;
            } else if (index === 1) {
                cartasJugador2 = jugador.cartas;
            } else if (index === 2) {
                cartasJugador3 = jugador.cartas;
            } else if (index === 3) {
                cartasJugador4 = jugador.cartas;
            }
        }
    });


	// Guarda las cartas de las figuras en el contexto
	guardarFiguraJugador1(cartasJugador1);
	guardarFiguraJugador2(cartasJugador2);
	guardarFiguraJugador3(cartasJugador3);
	guardarFiguraJugador4(cartasJugador4);

	// Settea las cartas de las figuras
	setFiguraJug1(cartasJugador1);
	setFiguraJug2(cartasJugador2);
	setFiguraJug3(cartasJugador3);
	setFiguraJug4(cartasJugador4);

	// Guarda las fichas en el contexto
	guardarFichasTablero(mensaje.fichas);
};

export default handleIniciarPartida;