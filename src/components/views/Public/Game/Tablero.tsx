import "../../../../styles/Game/Juego.css";
import { posicion } from '../../../../types/partidaEnCurso';
import { obtenerPartidaEnCurso } from '../../../context/GameContext';

function Tablero () {

    const fichas = obtenerPartidaEnCurso().fichas;

    const Cuadro: React.FC<{ x: posicion, y: posicion }> = ({ x, y }) => {

        const posicion = x*6+y;
        const color = fichas[posicion].color;

        return (
            <div key={posicion} className='Tablero-casilla'>
                <button className={color}>({x}, {y})</button>
            </div>
        )
    }
    
    const Fila: React.FC<{ y: posicion }> = ({ y }) => {
        return (
            <div className='Tablero-fila'>
                <Cuadro x={0} y={y} />
                <Cuadro x={1} y={y} />
                <Cuadro x={2} y={y} />
                <Cuadro x={3} y={y} />
                <Cuadro x={4} y={y} />
                <Cuadro x={5} y={y} />
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