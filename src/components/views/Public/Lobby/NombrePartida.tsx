import '../../../../styles/Lobby.css'
import  { obtenerPartida } from "../../../context/GameContext";

export default function NombrePartida () {
    let nombrePartida = obtenerPartida()?.nombre;

    return (
        <div>
            <div><h1>{nombrePartida}</h1></div>
            <div><h2>Esperando a jugadores...</h2></div>
        </div>
    )
}