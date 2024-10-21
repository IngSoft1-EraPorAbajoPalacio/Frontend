import { Figura } from "../../../types/figura";
import { CartaFigura, JugadorEnCurso, PartidaEnCurso } from "../../../types/partidaEnCurso";
import { borrarFichasTablero, borrarPartida, borrarPartidaEnCurso, guardarFichasTablero, guardarPartidaEnCurso, obtenerFichasTablero, obtenerPartidaEnCurso } from "../../context/GameContext";
import { CartaMovimiento, Movimiento } from "../../../types/partidaEnCurso";
import declararFiguras from "../../../utils/Cartas/DeclararFiguras";

// Escucha los mensajes del servidor para pasar el turno
const ObtenerMensajes = (
	setTurnoActual: React.Dispatch<React.SetStateAction<number | null>>,
	setPartida: React.Dispatch<React.SetStateAction<PartidaEnCurso | null>>,
	setMovimiento: React.Dispatch<React.SetStateAction<Movimiento | null>>,
	setMovimientoAgregado: React.Dispatch<React.SetStateAction<boolean>>,
	setMovimientoDeshecho: React.Dispatch<React.SetStateAction<boolean>>,
	setMovimientosJugados: React.Dispatch<React.SetStateAction<number>>,
	setFinalizado: React.Dispatch<React.SetStateAction<boolean>>,
	socket: any
	, setMarcaFiguras: React.Dispatch<React.SetStateAction<number[]>>,
	setFigurasDetectadas: React.Dispatch<React.SetStateAction<Figura[]>>,

	figuraSeleccionada: number | null,
	marcadasPorSelec: number[], setMarcadasPorSelec: React.Dispatch<React.SetStateAction<number[]>>,
	setManoFigura: React.Dispatch<React.SetStateAction<CartaFigura[]>>
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
			const partida = obtenerPartidaEnCurso();
			partida.jugadores = partida.jugadores.filter((jugador: JugadorEnCurso) => jugador.id !== message.data.idJugador);
			borrarPartidaEnCurso();
			guardarPartidaEnCurso(partida);
			setPartida(partida);
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
			setManoFigura(message.cartas);
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
		}
	}
};

export default ObtenerMensajes;
