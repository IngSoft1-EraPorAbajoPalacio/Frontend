import { obtenerJugador1, obtenerJugador2, obtenerJugador3, obtenerJugador4, obtenerTurnoActual } from "../../context/GameContext";

export const avisoAccionChat = (
	idJug: number, 
	tipoAccion: string, 
    setListaMensajes: React.Dispatch<React.SetStateAction<string[]>>
) => {
	var nombreJugador;
	var avisoChat: string;

	var idJugadorTurnoActual:number = -1; 
	if(tipoAccion !== "Abandono") idJugadorTurnoActual = obtenerTurnoActual();
	if (obtenerJugador1() && (obtenerJugador1().id === idJug || obtenerJugador1().id === idJugadorTurnoActual)) {
		nombreJugador = obtenerJugador1().nombre;
	} else if (obtenerJugador2() && obtenerJugador2().id === idJug || obtenerJugador2().id === idJugadorTurnoActual) {
		nombreJugador = obtenerJugador2().nombre;
	} else if (obtenerJugador3() && obtenerJugador3().id === idJug || obtenerJugador3().id === idJugadorTurnoActual) {
		nombreJugador = obtenerJugador3().nombre;
	} else if (obtenerJugador4() && obtenerJugador4().id === idJug || obtenerJugador4().id === idJugadorTurnoActual) {
		nombreJugador = obtenerJugador4().nombre;
	}
	
	if (tipoAccion === "Abandono") {
		avisoChat = `'${nombreJugador}' ha abandonado la partida.`;
	} else if (tipoAccion === "Movimiento") {
		avisoChat = `'${nombreJugador}' ha intercambiado fichas.`;
	} else if (tipoAccion === "Deshacer1Mov") {
		avisoChat = `'${nombreJugador}' ha deshecho su movimiento.`;
	} else if (tipoAccion === "DeshacerTodos") {
		avisoChat = `Los movimientos de '${nombreJugador}' han sido deshechos.`;
	} else if (tipoAccion === "Figura") {
		avisoChat = `'${nombreJugador}' ha utilizado una de sus cartas figura.`;
	} else if (tipoAccion === 'Bloquear') {
		avisoChat = `'${nombreJugador}' ha bloqueado una carta figura ajena.`;
	} else if (tipoAccion === 'Desbloquear') {
		avisoChat = `'${nombreJugador}' ha desbloqueado su carta figura.`;
	}
	
	setListaMensajes(prevMensajes => [...prevMensajes, avisoChat]);
}