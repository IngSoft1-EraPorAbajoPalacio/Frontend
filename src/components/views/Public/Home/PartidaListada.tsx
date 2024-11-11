import { Partida } from '../../../../types/partidaListada';
import { guardarPartida, obtenerJugador } from '../../../context/GameContext';
import { usePartidaActiva } from '../../../utils/Home/PartidaActiva';
import AbandonarPartida from '../../../hooks/AbandonarPartida';
import showToast from '../../Public/Toast';

interface PartidaListadaProps {
  partida: Partida;
  setIdPartida: React.Dispatch<React.SetStateAction<number|null>>;
}

function PartidaListada({partida, setIdPartida}: PartidaListadaProps) {

    const { actualizarPartidaActiva, obtenerPartidaActiva, borrarPartidaActiva, terminarPartida } = usePartidaActiva();

    const seleccionarUnirse = () => {
        
        const partidaActiva = obtenerPartidaActiva();
        
        if (partidaActiva !== null) {
            AbandonarPartida(partidaActiva.id, obtenerJugador().id);
            showToast({ message: 'Partida abandonada', type: 'success' });
            borrarPartidaActiva();
            terminarPartida();
        }

        setIdPartida(partida.id);
        actualizarPartidaActiva(partida);
        guardarPartida(partida);
    }

    return (
        <button
        key={partida.id}
        className='partida-listada'
        onClick={() => {seleccionarUnirse()}}
        >
            <div>
                <h3>{ partida.nombre + " " + (partida.bloqueada? "🔐" : "🔓") }</h3>
                <p>Cantidad de jugadores: {partida.cantJugadoresMin} - {partida.cantJugadoresMax}</p>
            </div>
        </button>
    );
}

export default PartidaListada;
