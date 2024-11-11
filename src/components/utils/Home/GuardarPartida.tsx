import { Partida } from "../../../types/partidaListada";

export const guardarPartida = (message: any): Partida => {
    const partidaActiva : Partida = new Partida(
      message.data.idPartida,
      message.data.nombrePartida,
      message.data.cantJugadoresMin,
      message.data.cantJugadoresMax,
      message.data.privada
    );
    return partidaActiva;
}