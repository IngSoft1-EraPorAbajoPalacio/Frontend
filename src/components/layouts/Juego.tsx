import '../../styles/Juego.css'
import { posicion } from '../../types/partidaEnCurso';

const mockFichas = [
    { x: 0, y: 0, color: 'Rojo' },
    { x: 1, y: 0, color: 'Azul' },
    { x: 2, y: 0, color: 'Verde' },
    { x: 3, y: 0, color: 'Amarillo' },
    { x: 4, y: 0, color: 'Rojo' },
    { x: 5, y: 0, color: 'Azul' },
    { x: 0, y: 1, color: 'Verde' },
    { x: 1, y: 1, color: 'Amarillo' },
    { x: 2, y: 1, color: 'Rojo' },
    { x: 3, y: 1, color: 'Azul' },
    { x: 4, y: 1, color: 'Verde' },
    { x: 5, y: 1, color: 'Amarillo' },
    { x: 0, y: 2, color: 'Rojo' },
    { x: 1, y: 2, color: 'Azul' },
    { x: 2, y: 2, color: 'Verde' },
    { x: 3, y: 2, color: 'Amarillo' },
    { x: 4, y: 2, color: 'Rojo' },
    { x: 5, y: 2, color: 'Azul' },
    { x: 0, y: 3, color: 'Verde' },
    { x: 1, y: 3, color: 'Amarillo' },
    { x: 2, y: 3, color: 'Rojo' },
    { x: 3, y: 3, color: 'Azul' },
    { x: 4, y: 3, color: 'Verde' },
    { x: 5, y: 3, color: 'Amarillo' },
    { x: 0, y: 4, color: 'Rojo' },
    { x: 1, y: 4, color: 'Azul' },
    { x: 2, y: 4, color: 'Verde' },
    { x: 3, y: 4, color: 'Amarillo' },
    { x: 4, y: 4, color: 'Rojo' },
    { x: 5, y: 4, color: 'Azul' },
    { x: 0, y: 5, color: 'Verde' },
    { x: 1, y: 5, color: 'Amarillo' },
    { x: 2, y: 5, color: 'Rojo' },
    { x: 3, y: 5, color: 'Azul' },
    { x: 4, y: 5, color: 'Verde' },
    { x: 5, y: 5, color: 'Amarillo' },
]

const jugador1 = {
    id: 1,
    nombre: 'Jugador 1',
    cartasFigura: [{ id: 1, figura: 1 }, { id: 2, figura: 2 }],
    cartasMovimiento: [{ id: 1, movimiento: 1 }, { id: 2, movimiento: 2 }],
    enPartida: true
}

function Juego () {

    const fichas = mockFichas;

    const Cuadro: React.FC<{ x: posicion, y: posicion }> = ({ x, y }) => {

        const posicion = x*6+y+1;
        const color = fichas[posicion-1].color;

        return (
            <div key={posicion} className='Tablero-casilla'>
                <button className={color}> {posicion} </button>
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

export default Juego;