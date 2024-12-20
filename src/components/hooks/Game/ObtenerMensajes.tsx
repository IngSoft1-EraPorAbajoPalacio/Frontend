import { Figura } from "../../../types/figura";
import { CartaFigura, JugadorEnCurso } from "../../../types/partidaEnCurso";
import { borrarFichasTablero, borrarFiguraJugador1, borrarFiguraJugador2, borrarFiguraJugador3, borrarFiguraJugador4, borrarJugador1, borrarJugador2, borrarJugador3, borrarJugador4, borrarPartida, guardarColorProhibido, guardarFichasTablero, guardarFiguraJugador1, guardarFiguraJugador2, guardarFiguraJugador3, guardarFiguraJugador4, guardarTurnoActual, obtenerFichasTablero, obtenerJugador1, obtenerJugador2, obtenerJugador3, obtenerJugador4 } from "../../context/GameContext";
import { CartaMovimiento, Movimiento } from "../../../types/partidaEnCurso";
import declararFiguras from "../../views/Public/Game/DeclararFiguras";
import { color } from "../../../types/partidaEnCurso";
import showToast from "../../views/Public/Toast";
import handleIniciarPartida from "../../utils/Game/IniciarPartida";
import { avisoAccionChat } from "../../utils/Game/avisoAccionChat";


interface manejarFinalizacionFunc {
    (finalizado: boolean, idGanador?: number, nombreGanador?: string): void;
}

// Escucha los mensajes del servidor para pasar el turno
const ObtenerMensajes = (
	setTurnoActual: React.Dispatch<React.SetStateAction<number | null>>,
	setMovimiento: React.Dispatch<React.SetStateAction<Movimiento | null>>,
	setMovimientoAgregado: React.Dispatch<React.SetStateAction<boolean>>,
	setMovimientoDeshecho: React.Dispatch<React.SetStateAction<boolean>>,
	setMovimientosJugados: React.Dispatch<React.SetStateAction<number>>,
	manejarFinalizacion: manejarFinalizacionFunc,
	socket: any,
	setMarcaFiguras: React.Dispatch<React.SetStateAction<number[]>>,
	setFigurasDetectadas: React.Dispatch<React.SetStateAction<Figura[]>>,
	figuraSeleccionada: number | null,
	marcadasPorSelec: number[],
	setMarcadasPorSelec: React.Dispatch<React.SetStateAction<number[]>>,
	setFiguraJug1: React.Dispatch<React.SetStateAction<CartaFigura[] | null>>,
	setFiguraJug2: React.Dispatch<React.SetStateAction<CartaFigura[] | null>>,
	setFiguraJug3: React.Dispatch<React.SetStateAction<CartaFigura[] | null>>,
	setFiguraJug4: React.Dispatch<React.SetStateAction<CartaFigura[] | null>>,
	setJugador1: React.Dispatch<React.SetStateAction<JugadorEnCurso | null>>,
	setJugador2: React.Dispatch<React.SetStateAction<JugadorEnCurso | null>>,
	setJugador3: React.Dispatch<React.SetStateAction<JugadorEnCurso | null>>,
	setJugador4: React.Dispatch<React.SetStateAction<JugadorEnCurso | null>>,
	setListaMensajes: React.Dispatch<React.SetStateAction<string[]>>,
	setColorProhibido: React.Dispatch<React.SetStateAction<color | null>>,
	actualizarTemporizador: (temporizador: number) => void, 
	setManoMovimiento: React.Dispatch<React.SetStateAction<CartaMovimiento[] | null>>,
	bloquearCarta: (carta: number) => void,
	bloquearCartas: (carta: number[]) => void,
    desbloquearCarta: (carta: number) => void,
) => {
	
	socket.onmessage = (event: any) => {
		const message = JSON.parse(event.data);

		// Si el mensaje es de tipo IniciarPartida, connfigura los datos de la partida
		if (message.type === 'InicioConexion') {
			handleIniciarPartida(message.data, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4);
			setTurnoActual(message.data.turnoActual);
			guardarTurnoActual(message.data.turnoActual);
			setColorProhibido(message.data.colorProhibido);
			setManoMovimiento(message.data.cartasMovimiento);
			setMovimientosJugados(message.data.cantMovimientosParciales);
			actualizarTemporizador(message.data.tiempo);
			bloquearCartas(message.data.cartasBloqueadas);
		}

		// Si el mensaje es de tipo PasarTurno, setea el turno actual
		if (message.type === 'PasarTurno') {
			setTurnoActual(message.turno);
			if (message.timeout) {
				showToast({ type: 'info', message: 'El tiempo se ha acabado' });
			};
			guardarTurnoActual(message.turno);
			actualizarTemporizador(120);
		}

		// Si el mensaje es de tipo PartidaEliminada, borra la partida
		else if (message.type === 'PartidaEliminada') {
			borrarPartida();
			manejarFinalizacion(true);
			return () => socket.close();
		}
		
		// Si el mensaje es de tipo PartidaEliminada, borra la partida
		else if (message.type === 'PartidaFinalizada') {
			borrarPartida();
			manejarFinalizacion(true, message.data.idGanador, message.data.nombreGanador);
			return () => socket.close();
		}

		// Si el mensaje es de tipo AbandonarPartida, borra al jugador idJugador de la partida
		else if (message.type === 'AbandonarPartida') {

			// Obtener al Jugador que abandona la partida
			const j1 = obtenerJugador1();
			const j2 = obtenerJugador2();
			const j3 = obtenerJugador3();
			const j4 = obtenerJugador4();

			if (j1 && (message.data.idJugador === j1.id)) {
				borrarFiguraJugador1();
				borrarJugador1();
				setFiguraJug1([]);
				setJugador1(null);
			}
			if (j2 && (message.data.idJugador === j2.id)) {
				borrarFiguraJugador2();
				borrarJugador2();
				setFiguraJug2([]);
				setJugador2(null);
			}
			if (j3 && (message.data.idJugador === j3.id)) {
				borrarFiguraJugador3();
				borrarJugador3();
				setFiguraJug3([]);
				setJugador3(null);
			}
			if (j4 && (message.data.idJugador === j4.id)) {
				borrarFiguraJugador4();
				borrarJugador4();
				setFiguraJug4([]);
				setJugador4(null);
				
			}

			avisoAccionChat(message.data.idJugador, "Abandono", setListaMensajes);			
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

			avisoAccionChat(message.data.idJugador, "Movimiento", setListaMensajes);
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

			avisoAccionChat(message.idJugador, "Deshacer1Mov", setListaMensajes);
		}
		
		// Si el mensaje es de tipo DeclararFigura
		else if (message.type === 'DeclararFigura') {
			declararFiguras(message.figuras.figura, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec);
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

			avisoAccionChat(message.idJugador, "DeshacerTodos", setListaMensajes);
		}
		
		// Si el mensaje es de tipo ReposicionFiguras o FiguraDescartar asigna las figuras a los jugadores
		else if (message.type === 'ReposicionFiguras' || message.type === 'FiguraDescartar') {
			if (message.type === 'FiguraDescartar') {
				avisoAccionChat(message.data.idJugador, "Figura", setListaMensajes);
			}
			if (message.data.cartasFig !== undefined) {
				const j1 = obtenerJugador1();
				const j2 = obtenerJugador2();
				const j3 = obtenerJugador3();
				const j4 = obtenerJugador4();

				setTurnoActual((turno: number | null) => {
					const manoFigura = message.data.cartasFig.map((carta: {"id": number, "figura": number}) => new CartaFigura(carta.id, carta.figura));
					if (j1 && j1.id === turno) {
						borrarFiguraJugador1();
						guardarFiguraJugador1(manoFigura);
						setFiguraJug1(manoFigura);
					} else if (j2 && j2.id === turno) {
						borrarFiguraJugador2();
						guardarFiguraJugador2(manoFigura);
						setFiguraJug2(manoFigura);
					} else if (j3 && j3.id === turno) {
						borrarFiguraJugador3();
						guardarFiguraJugador3(manoFigura);
						setFiguraJug3(manoFigura);
					} else if (j4 && j4.id === turno) {
						borrarFiguraJugador4();
						guardarFiguraJugador4(manoFigura);
						setFiguraJug4(manoFigura);
					}
					return turno;
				});

				if(message.type === 'FiguraDescartar') {
					setColorProhibido(message.data.colorProhibido);
					guardarColorProhibido(message.data.colorProhibido);
				}
			
			}
		}

		// Si el mensaje es de tipo FiguraBloqueada bloquea la carta
		else if (message.type === 'FiguraBloqueada') {
			bloquearCarta(message.data.idCarta);
			setColorProhibido(message.data.colorProhibido);
			guardarColorProhibido(message.data.colorProhibido);
		}

		// Si el mensaje es de tipo FiguraDesbloqueada desbloquea la carta
		else if (message.type === 'FiguraDesbloqueada') {
			desbloquearCarta(message.data.idCarta);
			setColorProhibido(message.data.colorProhibido);
			guardarColorProhibido(message.data.colorProhibido);
		}
	
		else if (message.type === 'Mensaje') {
			setListaMensajes(prevMensajes => [...prevMensajes, message.mensaje])
		}
	}
};

export default ObtenerMensajes;
