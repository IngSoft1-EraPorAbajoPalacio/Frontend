import { cantidadJugadores } from "../../../types/partidaListada";
import { guardarJugador, guardarPartida, guardarJugadoresUnidos } from "../../context/GameContext";
import { FormInputs } from "../../../types/formularioCrearPartida";

// Llamada a la API para crear una partida
function CrearPartida (
    e: React.FormEvent<HTMLFormElement>,
    setForm: React.Dispatch<React.SetStateAction<FormInputs>>,
    form: FormInputs,
    setIdJugador: React.Dispatch<React.SetStateAction<number|null>>,
    setIdPartida: React.Dispatch<React.SetStateAction<number|null>>
) {
    e.preventDefault();

    const data = {
        nombre_host: form.playerName,
        nombre_partida: form.room,
        cant_min_jugadores: form.minPlayers,
        cant_max_jugadores: form.maxPlayers,
        contrasena: form.password, // Envía una cadena vacía si es una partida pública
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };

    const asyncPost = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/partida', options);
            
            if (!response.ok) throw new Error('Hubo un problema tratando de crear la partida.');
            
            const ids = await response.json();
            const { id_partida, id_jugador } = await ids;
            setForm({
                ...form,
                idRoom: id_partida,
                idPlayer: id_jugador,
            });
            guardarJugador({ id: id_jugador, nombre: data.nombre_host, isHost: true });
            guardarPartida({ id: id_partida, nombre: data.nombre_partida, cantJugadoresMin: form.minPlayers as cantidadJugadores, cantJugadoresMax: form.maxPlayers as cantidadJugadores });
            guardarJugadoresUnidos([{ id: id_jugador, nombre: data.nombre_host }]);
            setIdJugador(id_jugador);
            setIdPartida(id_partida);
        
        } catch (error) {
            console.error(error);
        }
    };

    asyncPost();
};

export default CrearPartida;