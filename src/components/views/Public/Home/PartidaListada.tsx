import { Partida } from '../../../../types/partidaListada';
import { usePartidaActiva } from '../../../utils/Home/PartidaActiva';

interface PartidaListadaProps {
  partida: Partida;
  setIdPartida: React.Dispatch<React.SetStateAction<number|null>>;
}

function PartidaListada({partida, setIdPartida}: PartidaListadaProps) {

    const { actualizarPartidaActiva } = usePartidaActiva();

    return (
        <button
        key={partida.id}
        className='partida-listada'
        onClick={() => {setIdPartida(partida.id); actualizarPartidaActiva(partida);}}
        >
            <div>
                <h3>{ partida.nombre + " " + (partida.bloqueada? "🔐" : "🔓") }</h3>
                <p>Cantidad de jugadores: {partida.cantJugadoresMin} - {partida.cantJugadoresMax}</p>
            </div>
        </button>
    );
}

export default PartidaListada;
