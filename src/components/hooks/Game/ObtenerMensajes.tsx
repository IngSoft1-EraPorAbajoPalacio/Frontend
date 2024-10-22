import { Figura } from "../../../types/figura";
import { CartaFigura, JugadorEnCurso } from "../../../types/partidaEnCurso";
import { borrarFichasTablero, borrarFiguraJugador1, borrarFiguraJugador2, borrarFiguraJugador3, borrarFiguraJugador4, borrarPartida, guardarFichasTablero, guardarFiguraJugador1, guardarFiguraJugador2, guardarFiguraJugador3, guardarFiguraJugador4, obtenerFichasTablero, obtenerJugador1, obtenerJugador2, obtenerJugador3, obtenerJugador4 } from "../../context/GameContext";
import { CartaMovimiento, Movimiento } from "../../../types/partidaEnCurso";
import declararFiguras from "../../../utils/Cartas/DeclararFiguras";

// Escucha los mensajes del servidor para pasar el turno
const ObtenerMensajes = (
	setTurnoActual: React.Dispatch<React.SetStateAction<number | null>>,
	setMovimiento: React.Dispatch<React.SetStateAction<Movimiento | null>>,
	setMovimientoAgregado: React.Dispatch<React.SetStateAction<boolean>>,
	setMovimientoDeshecho: React.Dispatch<React.SetStateAction<boolean>>,
	setMovimientosJugados: React.Dispatch<React.SetStateAction<number>>,
	setFinalizado: React.Dispatch<React.SetStateAction<boolean>>,
	socket: any,
	setMarcaFiguras: React.Dispatch<React.SetStateAction<number[]>>,
	setFigurasDetectadas: React.Dispatch<React.SetStateAction<Figura[]>>,
	figuraSeleccionada: number | null,
	marcadasPorSelec: number[], setMarcadasPorSelec: React.Dispatch<React.SetStateAction<number[]>>,
	setFiguraJug1: React.Dispatch<React.SetStateAction<CartaFigura[]>>,
	setFiguraJug2: React.Dispatch<React.SetStateAction<CartaFigura[]>>,
	setFiguraJug3: React.Dispatch<React.SetStateAction<CartaFigura[]>>,
	setFiguraJug4: React.Dispatch<React.SetStateAction<CartaFigura[]>>,
	setJugador1: React.Dispatch<React.SetStateAction<JugadorEnCurso | null>>,
	setJugador2: React.Dispatch<React.SetStateAction<JugadorEnCurso | null>>,
	setJugador3: React.Dispatch<React.SetStateAction<JugadorEnCurso | null>>,
	setJugador4: React.Dispatch<React.SetStateAction<JugadorEnCurso | null>>
) => {

	socket.onmessage = (event: any) => {
		const message = JSON.parse(event.data);
		// Si el mensaje es de tipo PasarTurno, setea el turno actual
		if (message.type === 'PasarTurno') {
			setTurnoActual(message.turno);
		} else if (message.type === 'PartidaEliminada') {
			borrarPartida();
			setFinalizado(true);
			return () => socket.close();
		}

		// Si el mensaje es de tipo AbandonarPartida, borra al jugador idJugador de la partida
		else if (message.type === 'AbandonarPartida') {

			// Obtener al Jugador que abandona la partida
			const j1 = obtenerJugador1();
			const j2 = obtenerJugador2();
			const j3 = obtenerJugador3();
			const j4 = obtenerJugador4();

			if (message.data.idJugador === j1.id) {
				borrarFiguraJugador1();
				setFiguraJug1([]);
				setJugador1(null);
			} else if (message.data.idJugador === j2.id) {
				borrarFiguraJugador2();
				setFiguraJug2([]);
				setJugador2(null);
			} else if (message.data.idJugador === j3.id) {
				borrarFiguraJugador3();
				setFiguraJug3([]);
				setJugador3(null);
			} else if (message.data.idJugador === j4.id) {
				borrarFiguraJugador4();
				setFiguraJug4([]);
				setJugador4(null);
			}
		}

		// Si el mensaje es de tipo MovimientoParcial setea la carta recibida
		else if (message.type === 'MovimientoParcial') {

			// Calcula las posiciones de las fichas en el array
			const f1 = message.data.fichas[0].x * 6 + message.data.fichas[0].y;
			const f2 = message.data.fichas[1].x * 6 + message.data.fichas[1].y;

			// Crea la carta y el movimiento 
			const newCarta = new CartaMovimiento(message.data.carta.id, message.data.carta.movimiento);
			const newMovimiento = new Movimiento(newCarta, message.data.fichas[0], message.data.fichas[1]);

			//Intercambia las fichas
			const fichas = obtenerFichasTablero();
			const aux = fichas[f1].color;
			fichas[f1].color = fichas[f2].color;
			fichas[f2].color = aux;

			//Actualiza los datos del storage
			borrarFichasTablero();
			guardarFichasTablero(fichas);

			// Setea el movimiento
			setMovimiento(newMovimiento);
			setMovimientoAgregado(true);

		}

		// Si el mensaje es de tipo DeshacerMovimiento 
		else if (message.type === 'DeshacerMovimiento') {

			// Calcula las posiciones de las fichas en el array
			const f1 = message.posiciones[0].x * 6 + message.posiciones[0].y;
			const f2 = message.posiciones[1].x * 6 + message.posiciones[1].y;

			//Intercambia las fichas
			const fichas = obtenerFichasTablero();
			const aux = fichas[f1].color;
			fichas[f1].color = fichas[f2].color;
			fichas[f2].color = aux;

			//Actualiza los datos del storage
			borrarFichasTablero();
			guardarFichasTablero(fichas);

			// Setea el movimiento
			setMovimientoDeshecho(true);


		} else if (message.type === 'DeclararFigura') {
			declararFiguras(message.figuras, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada,
				marcadasPorSelec, setMarcadasPorSelec
			);
		} else if (message.type === 'FiguraDescartar') { //Luego de descartar una carta de figura

			const j1 = obtenerJugador1();
			const j2 = obtenerJugador2();
			const j3 = obtenerJugador3();
			const j4 = obtenerJugador4();

			setTurnoActual((turno: number | null) => {
				if (j1 && (j1.id === turno)) {
					borrarFiguraJugador1();
					guardarFiguraJugador1(message.data.cartasFig);
					setFiguraJug1(message.data.cartasFig);
				} else if (j2 && (j2.id === turno)) {
					borrarFiguraJugador2();
					guardarFiguraJugador2(message.data.cartasFig);
					setFiguraJug2(message.data.cartasFig);
				} else if (j3 && (j3.id === turno)) {
					borrarFiguraJugador3();
					guardarFiguraJugador3(message.data.cartasFig);
					setFiguraJug3(message.data.cartasFig);
				} else if (j4 && (j4.id === turno)) {
					borrarFiguraJugador4();
					guardarFiguraJugador4(message.data.cartasFig);
					setFiguraJug4(message.data.cartasFig);
				}
				return turno;
			});
		}
		// Si el mensaje es de tipo DeshacerMovimientos
		else if (message.type === 'DeshacerMovimientos') {

			let index = message.cantMovimientosDesechos - 1;
			const fichas = obtenerFichasTablero();

			while (index >= 0) {

				// Calcula las posiciones de las fichas en el array
				const f1 = message.posiciones[index][0].x * 6 + message.posiciones[index][0].y;
				const f2 = message.posiciones[index][1].x * 6 + message.posiciones[index][1].y;

				//Intercambia las fichas
				const aux = fichas[f1].color;
				fichas[f1].color = fichas[f2].color;
				fichas[f2].color = aux;
				index -= 1;
			}

			//Actualiza los datos del storage
			borrarFichasTablero();
			guardarFichasTablero(fichas);

			// Setea el movimiento
			setMovimientoDeshecho(true);
			setMovimientosJugados(0);
		} else if (message.type === 'ReposicionFiguras') {
			if (message.data.cartasFig != undefined) {
				const j1 = obtenerJugador1();
				const j2 = obtenerJugador2();
				const j3 = obtenerJugador3();
				const j4 = obtenerJugador4();
				console.log(message);

				setTurnoActual((turno: number | null) => {
					if (j1.id === turno) {
						borrarFiguraJugador1();
						guardarFiguraJugador1(message.data.cartasFig);
						setFiguraJug1(message.data.cartasFig);
					} else if (j2.id === turno) {
						borrarFiguraJugador2();
						guardarFiguraJugador2(message.data.cartasFig);
						setFiguraJug2(message.data.cartasFig);
					} else if (j3.id === turno) {
						borrarFiguraJugador3();
						guardarFiguraJugador3(message.data.cartasFig);
						setFiguraJug3(message.data.cartasFig);
					} else if (j4.id === turno) {
						borrarFiguraJugador4();
						guardarFiguraJugador4(message.data.cartasFig);
						setFiguraJug4(message.data.cartasFig);
					}
					return turno;
				});
			}
		}
	}
};

export default ObtenerMensajes;
