import { CartaFigura, JugadorEnCurso, PartidaEnCurso } from "../../../types/partidaEnCurso";
import { guardarPartidaEnCurso, guardarJugador1, guardarJugador2, guardarJugador3, guardarJugador4, guardarColorProhibido, guardarFichasTablero, guardarFiguraJugador1, guardarFiguraJugador2, guardarFiguraJugador3, guardarFiguraJugador4, guardarMovimientos } from "../../context/GameContext";
import useRouteNavigation from "../../routes/RouteNavigation";
import { useParams } from "react-router-dom";

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

	const { redirectToNotFound } = useRouteNavigation();
    const { gameId, playerId } = useParams<{ gameId: string; playerId: string }>();
    const idJugador = Number(playerId);
    const idPartida = Number(gameId);
    if (isNaN(idJugador) || isNaN(idPartida)) redirectToNotFound();

	guardarFichasTablero(mensaje.fichas);
	//guardarTurnoActual(mensaje.turno);
	guardarColorProhibido(mensaje.colorProhibido);
	guardarMovimientos(mensaje.cartasMovimiento);
  
	const cantJugadores = mensaje.orden.length;

	// Crea una nueva instancia de JugadorEnCurso
	const jugador1 = new JugadorEnCurso(mensaje.cartasFigura[0].idJugador, mensaje.cartasFigura[0].nombreJugador, true, mensaje.cartasFigura[0].idJugador === idJugador);
	const jugador2 = new JugadorEnCurso(mensaje.cartasFigura[1].idJugador, mensaje.cartasFigura[1].nombreJugador, true, mensaje.cartasFigura[1].idJugador === idJugador);
	const jugador3 = (cantJugadores > 2) ? new JugadorEnCurso(mensaje.cartasFigura[2].idJugador, mensaje.cartasFigura[2].nombreJugador, true, mensaje.cartasFigura[2].idJugador === idJugador) : null;
	const jugador4 = (cantJugadores > 3) ? new JugadorEnCurso(mensaje.cartasFigura[3].idJugador, mensaje.cartasFigura[3].nombreJugador, true, mensaje.cartasFigura[3].idJugador === idJugador) : null;
  
	// Guarda los jugadores en el contexto
	guardarJugador1(jugador1);
	guardarJugador2(jugador2);
	if (jugador3) guardarJugador3(jugador3);
	if (jugador4) guardarJugador4(jugador4);

	// Settea los jugadores
	setJugador1(jugador1);
	setJugador2(jugador2);
	if (jugador3) setJugador3(jugador3);
	if (jugador4) setJugador4(jugador4);
  
	// Crea una nueva instancia de PartidaEnCurso
	const cartaJugador1 = mensaje.cartasFigura[0].cartas;
	const cartaJugador2 = mensaje.cartasFigura[1].cartas;
	const cartaJugador3 = (cantJugadores > 2) ? mensaje.cartasFigura[2].cartas : null;
	const cartaJugador4 = (cantJugadores > 3) ? mensaje.cartasFigura[3].cartas : null;
  
	// Guarda las cartas de las figuras en el contexto
	guardarFiguraJugador1(cartaJugador1);
	guardarFiguraJugador2(cartaJugador2);
	if (cartaJugador3) guardarFiguraJugador3(cartaJugador3);
	if (cartaJugador4) guardarFiguraJugador4(cartaJugador4);

	// Settea las cartas de las figuras
	setFiguraJug1(cartaJugador1);
	setFiguraJug2(cartaJugador2);
	if (cartaJugador3) setFiguraJug3(cartaJugador3);
	if (cartaJugador4) setFiguraJug4(cartaJugador4);
	
	// Crea una nueva instancia de PartidaEnCurso
	const partida = new PartidaEnCurso(
	  idPartida, 
	  mensaje.orden.length, 
	  mensaje.orden
	);
  
	// Guarda la partida en el contexto
	guardarPartidaEnCurso(partida);
	guardarFichasTablero(mensaje.fichas);
  
};

export default handleIniciarPartida;