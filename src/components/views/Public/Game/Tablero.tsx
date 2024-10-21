import "../../../../styles/Game/Juego.css";
import { Movimiento, posicion } from '../../../../types/partidaEnCurso';
import { obtenerFichasTablero, obtenerFichaSeleccionada, borrarFichaSeleccionada, guardarFichaSeleccionada } from '../../../context/GameContext';
import { CartaMovimiento } from "../../../../types/partidaEnCurso";
import React from "react";
import JugarMovimiento from "../../../hooks/Game/JugarMovimiento";
import VerificarMovimiento from "./VerificarMovimiento";

interface TableroParams {
    setCartaMovimientoSeleccionado: React.Dispatch<React.SetStateAction<CartaMovimiento | null>>,
    setMovimientosJugados: React.Dispatch<React.SetStateAction<number>>,
    turnoActual: number | null,
    idPartida: number | null,
    idJugador: number | null
}

function Tablero ({ setCartaMovimientoSeleccionado, setMovimientosJugados, turnoActual, idPartida, idJugador }: TableroParams) {

    const fichas = obtenerFichasTablero();
    let fichaSeleccionada : number = obtenerFichaSeleccionada();

    const handleClick = ( posicion: number, ) => {

        // Si se selecciona una ficha diferente a la seleccionada, se juega el movimiento
        if (fichaSeleccionada !== -1 && fichaSeleccionada !== posicion) {
            setCartaMovimientoSeleccionado((cartaSeleccionada: CartaMovimiento | null) => {
                if (cartaSeleccionada && idPartida && idJugador) {
                    const movimiento = new Movimiento(cartaSeleccionada, fichas[fichaSeleccionada], fichas[posicion]);
                    const esValido = VerificarMovimiento(movimiento, idJugador, turnoActual);
                    borrarFichaSeleccionada();
                    if (!esValido) window.alert("Movimiento inválido");
                    else {
                        JugarMovimiento(idPartida, idJugador, movimiento);
                        setMovimientosJugados((movimientosJugados: number) => movimientosJugados + 1);
                    }
                    cartaSeleccionada.seleccionada = false;
                }
                fichaSeleccionada = -1;
                return null;
            });
        }

        // Si se selecciona una ficha ya seleccionada, se deselecciona
        else if (fichaSeleccionada !== -1 && fichaSeleccionada === posicion) {
            borrarFichaSeleccionada();                
            fichaSeleccionada = -1;
        }

        // Si no hay ficha seleccionada, se selecciona la ficha
        else {
            guardarFichaSeleccionada(posicion);
            fichaSeleccionada = posicion;
        }
    }

    const Cuadro: React.FC<{ x: posicion, y: posicion }> = ({ x, y }) => {

        const posicion = y*6+x;
        const color = fichas[posicion].color;

        return (
            <div key={posicion} className='Tablero-casilla'>
                { turnoActual === idJugador ?
                    <button
                        className={color+`${posicion === fichaSeleccionada ? '-con-seleccion' : '-sin-seleccion' }`}
                        onClick={() => {handleClick(posicion)}}
                    ></button>
                :
                    <button
                        className={color+'-sin-seleccion'}
                        disabled={true}
                    ></button>
                }
            </div>
        )
    }
    
    const Fila: React.FC<{ y: posicion }> = ({ y }) => {
        return (
            <div className='Tablero-fila'>
                <Cuadro y={y} x={0} />
                <Cuadro y={y} x={1} />
                <Cuadro y={y} x={2} />
                <Cuadro y={y} x={3} />
                <Cuadro y={y} x={4} />
                <Cuadro y={y} x={5} />
            </div>
        )
    }
    
    return (
        <>
            <div className='Tablero-columna'>
                <Fila y={0} />
                <Fila y={1} />
                <Fila y={2} />
                <Fila y={3} />
                <Fila y={4} />
                <Fila y={5} />
            </div>
        </>
    )
}

export default Tablero;