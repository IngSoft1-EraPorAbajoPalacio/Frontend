import "../../../../styles/Game/Juego.css";
import { posicion } from '../../../../types/partidaEnCurso';
import { borrarFichasSeleccionadas, guardarFichasSeleccionadas, obtenerFichasSeleccionadas, obtenerFichasTablero } from '../../../context/GameContext';
import { Ficha } from "../../../../types/partidaEnCurso";
import React, { useState } from "react";

interface TableroParams {
    setFichasSeleccionadas: React.Dispatch<React.SetStateAction<Ficha[]>>;
    turnoActual: number | null,
    idJugador: number | null
}

function Tablero ({ setFichasSeleccionadas, turnoActual, idJugador }: TableroParams) {

    const fichas = obtenerFichasTablero();
    const fichasSeleccionadas = obtenerFichasSeleccionadas();

    let primerPosicion: number | null = fichasSeleccionadas[0];
    let segundaPosicion: number | null = fichasSeleccionadas[1];

    const handleClick = (
        posicion: number,
        seleccionada: boolean,
        setSeleccionada: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        if (seleccionada) {
            if (primerPosicion === posicion) {
                primerPosicion = null;
                setSeleccionada(!seleccionada)
            } else if (segundaPosicion === posicion) {
                segundaPosicion = null;
                setSeleccionada(!seleccionada)
            }

        } else {
            if (primerPosicion == null){
                primerPosicion = posicion;
                setSeleccionada(!seleccionada)
            } else if (segundaPosicion == null) {
                segundaPosicion = posicion;
                setSeleccionada(!seleccionada)
                if (fichasSeleccionadas) borrarFichasSeleccionadas();
                guardarFichasSeleccionadas([primerPosicion, segundaPosicion]);
                setFichasSeleccionadas([fichas[primerPosicion], fichas[segundaPosicion]]);
            }

        }
    }

    const Cuadro: React.FC<{ x: posicion, y: posicion }> = ({ x, y }) => {

        const posicion = y*6+x;
        const color = fichas[posicion].color;

        const [seleccionada, setSeleccionada] = useState<boolean>( fichasSeleccionadas ? (primerPosicion === posicion || segundaPosicion === posicion) : false );

        return (
            <div key={posicion} className='Tablero-casilla'>
                { turnoActual === idJugador ?
                    <button
                        className={color+`${seleccionada ? '-con-seleccion' : '-sin-seleccion' }`}
                        onClick={() => {handleClick(posicion, seleccionada, setSeleccionada)}}
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