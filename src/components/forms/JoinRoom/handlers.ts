import { obtenerJugador, obtenerPartida } from "../../context/GameContext";

export function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    setUnido: React.Dispatch<React.SetStateAction<boolean>>
) {
    e.preventDefault();
    const partida = obtenerPartida();
    const jugador = obtenerJugador();

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jugador.nombre),
    };

    const asyncPost = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/partida/' + partida.id + '/jugador', options);

            if (response.ok) {
                const ids = await response.json();
                const { id_partida, id_jugador } = await ids;
                console.log('Unido correctamente a la partida con ID:', id_partida);
                setUnido(true);
            } else {
                console.log('Error al unirse a una partida');
            }
        } catch (error) {
            console.error(error);
        }
    };

    asyncPost();
}

export function handleAliasChange(
    e: React.ChangeEvent<HTMLInputElement>,
    setAlias: React.Dispatch<React.SetStateAction<string>>
) {
    if (validateNames(e.target.value)) setAlias(e.target.value);
}

export const validateNames = (name: string) => {
    return name.length <= 20;
};