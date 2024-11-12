import { Partida } from '../../../../types/partidaListada';
import { guardarPartida, obtenerJugador, obtenerPartidaActivaContext } from '../../../context/GameContext';
import { usePartidaActiva } from '../../../utils/PartidaActiva';
import AbandonarPartida from '../../../hooks/AbandonarPartida';
import showToast from '../../Public/Toast';
import useRouteNavigation from '../../../routes/RouteNavigation';

interface PartidaListadaProps {
  partida: Partida;
  setIdPartida: React.Dispatch<React.SetStateAction<number|null>>;
  newSocket: any;
}

function PartidaListada({partida, setIdPartida, newSocket}: PartidaListadaProps) {

    const { actualizarPartidaActiva, obtenerPartidaActiva, borrarPartidaActiva, terminarPartidaActiva, enJuego } = usePartidaActiva();
    const { redirectToLobby, redirectToGame } = useRouteNavigation();

    const seleccionarUnirse = () => {

        const partidaActiva = obtenerPartidaActiva();

        // La partida seleccionada es una partida activa
        if (partidaActiva && partidaActiva.id === partida.id) {
            if (enJuego() || obtenerPartidaActivaContext()) redirectToGame(partida.id, obtenerJugador().id);
            else redirectToLobby(partida.id, obtenerJugador().id);
            if (newSocket) newSocket.close();
            return;
        }

        // Hay una partida activa y se seleccionó una partida diferente
        else if (partidaActiva) {
            AbandonarPartida(partidaActiva.id, obtenerJugador().id);
            borrarPartidaActiva();
            terminarPartidaActiva();
            showToast({ message: 'Partida abandonada', type: 'success' });
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
