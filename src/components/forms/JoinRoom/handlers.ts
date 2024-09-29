import { obtenerJugador, obtenerPartida } from "../../context/GameContext";

export function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const {id, nombre, min, max} = obtenerPartida();
    const {idJugador, nombreJugador, isHost} = obtenerJugador();
    const data = nombreJugador;
    

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, //Ill send a json
        body: JSON.stringify(data), //Here is the json
    };
    const asyncPost = async () => {
        try {
            //Now i have to connect with the endpoint to send the info of the room
            const response = await fetch('http://127.0.0.1:8000/partida/'+ id +'/jugador', options);

            if (response.ok) {
                const ids = await response.json();
                
                const { id_partida, id_jugador} = await ids;
                
                console.log('Unido correctamente a la partida con ID:', id_partida);
                
            } else {
                console.log('Error al unirse a una partida');
            }
        } catch (error) {
            console.error(error);
        }
    }
    asyncPost();
}

export function handleAliasChange(e: React.ChangeEvent<HTMLInputElement>, setAlias: React.Dispatch<React.SetStateAction<string>>) {
    if(validateNames(e.target.value))setAlias(e.target.value);
}

export const validateNames = (name: string) => {
    return name.length <= 20;
};