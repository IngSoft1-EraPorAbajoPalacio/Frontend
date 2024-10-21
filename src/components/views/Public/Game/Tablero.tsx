import "../../../../styles/Game/Juego.css";
import { Coord, Figura } from "../../../../types/figura";

import { Movimiento, posicion } from '../../../../types/partidaEnCurso';
import { obtenerFichasTablero, obtenerFichaSeleccionada, borrarFichaSeleccionada, guardarFichaSeleccionada } from '../../../context/GameContext';
import { CartaMovimiento } from "../../../../types/partidaEnCurso";
import React from "react";
import JugarMovimiento from "../../../hooks/Game/JugarMovimiento";
import VerificarMovimiento from "./VerificarMovimiento";

import { handleSeleccionFigura } from "../../../../utils/Cartas/figuraSeleccionada";

interface TableroProps {
    marcaFiguras: number[];

    setCartaMovimientoSeleccionado: React.Dispatch<React.SetStateAction<CartaMovimiento | null>>,
    cartaMovimientoSeleccionado: CartaMovimiento | null,
    setMovimientosJugados: React.Dispatch<React.SetStateAction<number>>,
    turnoActual: number | null;
    figurasDetectadas: Figura[];
    cartaFiguraDescarte: string | null;

    setFiguraSeleccionada: React.Dispatch<React.SetStateAction<number | null>>;
    setMarcaFiguras: React.Dispatch<React.SetStateAction<number[]>>;

    marcadasPorSelec: number[];
    setMarcadasPorSelec: React.Dispatch<React.SetStateAction<number[]>>;

    idPartida: number | undefined;
    idJugador: number | undefined;
}


const Tablero: React.FC<TableroProps> = ({ marcaFiguras, setCartaMovimientoSeleccionado, cartaMovimientoSeleccionado, setMovimientosJugados, figurasDetectadas,
    setFiguraSeleccionada, setMarcaFiguras, setMarcadasPorSelec, turnoActual, cartaFiguraDescarte, idPartida, idJugador }) => {


    const fichas = obtenerFichasTablero();
    let fichaSeleccionada: number = obtenerFichaSeleccionada();

    const handleClick = (
        posicion: Coord,
        setSeleccionada: React.Dispatch<React.SetStateAction<boolean>>
    ) => {

        let posicionFicha: number | null = (posicion[0] + posicion[1] * 6);
        if (cartaFiguraDescarte != null) { // Selección carta de figura previo a seleccionar la figura
            handleSeleccionFigura(posicion, figurasDetectadas, setFiguraSeleccionada
                , setMarcaFiguras, setMarcadasPorSelec, cartaFiguraDescarte, idPartida, idJugador);
        }
        
        // Si no hay carta seleccionada, no se hace nada
        if (cartaMovimientoSeleccionado) {

            // Si se selecciona una ficha diferente a la seleccionada, se juega el movimiento
            if (fichaSeleccionada !== -1 && fichaSeleccionada !== posicionFicha) {

                if (idPartida && idJugador) {

                    // Luego, verifica si el movimiento es válido
                    const movimiento = new Movimiento(cartaMovimientoSeleccionado, fichas[fichaSeleccionada], fichas[posicionFicha]);
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

            } // Si no hay ficha seleccionada, se selecciona la ficha
            else {
                setSeleccionada(true);
                guardarFichaSeleccionada(posicionFicha);
                fichaSeleccionada = posicionFicha;
            }
        } else if (fichaSeleccionada !== -1 && fichaSeleccionada === posicionFicha) {
            setSeleccionada(false);
            borrarFichaSeleccionada();
            fichaSeleccionada = -1;
        }
    }

    const Cuadro: React.FC<{ x: posicion, y: posicion }> = ({ x, y }) => {

        const posicion = x + y * 6;

        const color = fichas[posicion].color;

        const [seleccionada, setSeleccionada] = React.useState<boolean>(posicion === fichaSeleccionada);
        return (


            <>
                <div key={posicion} className={"Tablero-casilla"}>
                { ((turnoActual === idJugador && (cartaMovimientoSeleccionado) || cartaFiguraDescarte !== null)) ? // Si se quiere jugar un movimiento o descartar una figura
                        <button
                            className={color + `${seleccionada ? '-con-seleccion' : '-sin-seleccion'}`}
                            onClick={() => { handleClick([x, y], setSeleccionada); }}
                        ></button>
                        : // Si no se quiere jugar una figura o no es el turno del jugador
                        <button
                            className={color + '-sin-seleccion'}
                            disabled={true}
                        ></button>
                    }
                </div>

            </>


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