import { guardarPartida } from "../../context/GameContext";
import { FormInputs } from "./types";

export const handleSubmit = (e: React.FormEvent<HTMLFormElement>,
    setForm: React.Dispatch<React.SetStateAction<FormInputs>>,
    form: FormInputs) => {
    e.preventDefault();
    const data = {
        nombre_host: form.playerName,
        nombre_partida: form.room,
        cant_min_jugadores: form.minPlayers,
        cant_max_jugadores: form.maxPlayers,
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, //Ill send a json
        body: JSON.stringify(data), //Here is the json
    };
    const asyncPost = async () => {
        try {
            //Now i have to connect with the endpoint to send the info of the room
            const response = await fetch('http://127.0.0.1:8000/partida', options);
            if (response.ok) {
                const ids = await response.json();
                console.log(ids);
                const { id_partida, id_jugador} = await ids;
                setForm({
                    ...form,
                    idRoom: id_partida,
                    idPlayer: id_jugador,
                });
                localStorage.setItem("id_room", form.idRoom);
                localStorage.setItem("id_player", form.idPlayer);
                console.log('Room created with ID:', id_partida);
                //guardarPartida({id: id_partida, nombre: nombre_partida, cantJugadoresMin: form.minPlayers, cantJugadoresMax: form.maxPlayers});
            } else {
                console.log('Failed to create room');
            }
        } catch (error) {
            console.error(error);
        }
    }
    

    //Ahora cargo la data de la partida y jugdaor en el local storage
    

    asyncPost();
};

export const handleRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>,
    setForm: React.Dispatch<React.SetStateAction<FormInputs>>, form: FormInputs
) => {
    if (validateNames(e.target.value)) {
        setForm({
            ...form,
            room: e.target.value,
        });
    } else { e.target.setCustomValidity('Por favor, ingrese el nombre de la sala.'); }
};

export const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>,
    setForm: React.Dispatch<React.SetStateAction<FormInputs>>, form: FormInputs
) => {
    if (validateNames(e.target.value)) {
        setForm({
            ...form,
            playerName: e.target.value,
        });
    }
}

export const validateNames = (name: string) => {
    return name.length <= 20;
};