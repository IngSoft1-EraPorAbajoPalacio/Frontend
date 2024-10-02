import { cantidadJugadores } from "../../../types/partidaListada";
import { guardarJugador, guardarPartida, guardarJugadoresUnidos } from "../../context/GameContext";
import { FormInputs } from "../../../types/formularioCrearPartida";

// Llamada a la API para crear una partida
const CrearPartida = (
    e: React.FormEvent<HTMLFormElement>,
    setForm: React.Dispatch<React.SetStateAction<FormInputs>>,
    form: FormInputs,
    setPartidaCreada: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    e.preventDefault();

    const data = {
        nombre_host: form.playerName,
        nombre_partida: form.room,
        cant_min_jugadores: form.minPlayers,
        cant_max_jugadores: form.maxPlayers,
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };

    const asyncPost = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/partida', options);
            if (response.ok) {
                const ids = await response.json();
                console.log(ids);
                const { id_partida, id_jugador } = await ids;
                setForm({
                    ...form,
                    idRoom: id_partida,
                    idPlayer: id_jugador,
                });
                guardarJugador({ id: id_jugador, nombre: data.nombre_host, isHost: true });
                console.log('Room created with ID:', id_partida);
                if (form.maxPlayers < 2 || form.maxPlayers > 4 || form.minPlayers < 2 || form.minPlayers > 4) {
                    console.error('Invalid number of players.');
                } else {
                    guardarPartida({ id: id_partida, nombre: data.nombre_partida, cantJugadoresMin: form.minPlayers as cantidadJugadores, cantJugadoresMax: form.maxPlayers as cantidadJugadores });
                    guardarJugadoresUnidos([{ id: id_jugador, nombre: data.nombre_host }]);
                    setPartidaCreada(true);
                }
            } else {
                console.log('Failed to create room');
            }
        } catch (error) {
            console.error(error);
        }
    };

    asyncPost();
};

export default CrearPartida;