import { Partida } from '../../../../types/partidaListada';

interface PartidaListadaProps {
  partida: Partida;
  setIdPartida: React.Dispatch<React.SetStateAction<number|null>>;
}

function PartidaListada({partida, setIdPartida}: PartidaListadaProps) {

    return (
        <button
        key={partida.id}
        className='partida-listada'
        onClick={() => {setIdPartida(partida.id);}}
        >
            <div>
                <h3>{ partida.nombre + " " + (partida.bloqueada? "🔐" : "🔓") }</h3>
                <p>Cantidad de jugadores: {partida.cantJugadoresMin} - {partida.cantJugadoresMax}</p>
            </div>
        </button>
    );
}

export default PartidaListada;
