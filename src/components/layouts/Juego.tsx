import Tablero from "../views/Public/Tablero";
import obtenerDatosPartida from "../hooks/ObtenerDatosPartida";

function Juego () {

    obtenerDatosPartida();

    return (
        <>
            <Tablero />
        </>
    )
}

export default Juego;