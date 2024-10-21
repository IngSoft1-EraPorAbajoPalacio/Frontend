import "../../../../styles/Game/Juego.css";
import { Movimiento, posicion } from '../../../../types/partidaEnCurso';
import { obtenerFichasTablero, obtenerFichaSeleccionada, borrarFichaSeleccionada, guardarFichaSeleccionada } from '../../../context/GameContext';
import { CartaMovimiento } from "../../../../types/partidaEnCurso";
import React from "react";
import JugarMovimiento from "../../../hooks/Game/JugarMovimiento";
import VerificarMovimiento from "./VerificarMovimiento";

interface TableroParams {
    setCartaMovimientoSeleccionado: React.Dispatch<React.SetStateAction<CartaMovimiento | null>>,
    cartaMovimientoSeleccionado: CartaMovimiento | null,
    setMovimientosJugados: React.Dispatch<React.SetStateAction<number>>,
    turnoActual: number | null,
    idPartida: number | null,
    idJugador: number | null
}

function Tablero ({ setCartaMovimientoSeleccionado, cartaMovimientoSeleccionado, setMovimientosJugados, turnoActual, idPartida, idJugador }: TableroParams) {

    const fichas = obtenerFichasTablero();
    let fichaSeleccionada : number = obtenerFichaSeleccionada();

    const handleClick = (
        posicion: number,
        setSeleccionada: React.Dispatch<React.SetStateAction<boolean>>
    ) => {

        // Si no hay carta seleccionada, no se hace nada
        if (cartaMovimientoSeleccionado) {

            // Si se selecciona una ficha diferente a la seleccionada, se juega el movimiento
            if (fichaSeleccionada !== -1 && fichaSeleccionada !== posicion) {

                if (idPartida && idJugador) {

                    // Luego, verifica si el movimiento es válido
                    const movimiento = new Movimiento(cartaMovimientoSeleccionado, fichas[fichaSeleccionada], fichas[posicion]);
                    const esValido = VerificarMovimiento(movimiento, idJugador, turnoActual);
                    
                    // Primero deselecciona la carta seleccionada y la ficha seleccionada
                    setCartaMovimientoSeleccionado(null);
                    cartaMovimientoSeleccionado.seleccionada = false;
                    setSeleccionada(false);
                    borrarFichaSeleccionada();
                    fichaSeleccionada = -1;

                    // Si el movimiento no es válido, se muestra una alerta
                    if (!esValido) window.alert("Movimiento inválido");

                    // Si el movimiento es válido, se juega el movimiento
                    else {
                        JugarMovimiento(idPartida, idJugador, movimiento);
                        setMovimientosJugados((movimientosJugados: number) => movimientosJugados + 1);
                    }
                }
            }

            // Si se selecciona una ficha ya seleccionada, se deselecciona
            else if (fichaSeleccionada !== -1 && fichaSeleccionada === posicion) {
                setSeleccionada(false);
                borrarFichaSeleccionada();      
                fichaSeleccionada = -1;          
            }

            // Si no hay ficha seleccionada, se selecciona la ficha
            else {
                setSeleccionada(true);
                guardarFichaSeleccionada(posicion);
                fichaSeleccionada = posicion;
            }
        }
    }

    const Cuadro: React.FC<{ x: posicion, y: posicion }> = ({ x, y }) => {

        const posicion = y*6+x;
        const color = fichas[posicion].color;
        const [seleccionada, setSeleccionada] = React.useState<boolean>(posicion === fichaSeleccionada);

        return (
            <div key={posicion} className='Tablero-casilla'>
                { (turnoActual === idJugador && cartaMovimientoSeleccionado) ? // Si se quiere jugar un movimiento
                    <button
                        className={color+`${seleccionada ? '-con-seleccion' : '-sin-seleccion' }`}
                        onClick={() => handleClick(posicion, setSeleccionada)}
                    ></button>
                : // Si no se quiere jugar una figura o no es el turno del jugador
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