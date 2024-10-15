import "../../../../styles/Game/Juego.css";
import { posicion } from '../../../../types/partidaEnCurso';
import { obtenerPartidaEnCurso } from '../../../context/GameContext';

function Tablero () {

    const fichas = obtenerPartidaEnCurso().fichas;

    const Cuadro: React.FC<{ x: posicion, y: posicion }> = ({ x, y }) => {

        const posicion = y*6+x+1;
        const color = fichas[posicion-1].color;

        return (
            <div key={posicion} className='Tablero-casilla'>
                <button className={color}>({x}, {y})</button>
            </div>
        )
    }
    
    const Fila: React.FC<{ x: posicion }> = ({ x }) => {
        return (
            <div className='Tablero-fila'>
                <Cuadro x={x} y={0} />
                <Cuadro x={x} y={1} />
                <Cuadro x={x} y={2} />
                <Cuadro x={x} y={3} />
                <Cuadro x={x} y={4} />
                <Cuadro x={x} y={5} />
            </div>
        )
    }
    
    return (
        <>
            <div className='Tablero-columna'>
                <Fila x={0} />
                <Fila x={1} />
                <Fila x={2} />
                <Fila x={3} />
                <Fila x={4} />
                <Fila x={5} />
            </div>
        </>
    )
}

export default Tablero;