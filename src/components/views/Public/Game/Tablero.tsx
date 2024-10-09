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
                <button className={color}></button>
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