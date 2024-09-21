import "../../../styles/index.css"
import { obtenerPartida } from "../../context/PlayerContext";

const UnirsePartida = () => {
    let nombrePartida = obtenerPartida()?.nombre;

    return (
        <div>
            <h1>Unirse a {nombrePartida} </h1>
        </div>
    )
}

export default UnirsePartida;