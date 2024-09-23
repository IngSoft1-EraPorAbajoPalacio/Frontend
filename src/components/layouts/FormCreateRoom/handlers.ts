import { FormInputs } from "./types";

export const handleSubmit = (e: React.FormEvent<HTMLFormElement>, form :FormInputs) => {
    e.preventDefault();
    const data = {
        id_host: form.idPlayer,
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
                console.log('Room created');
            } else {
                console.log('Failed to create room');
            }
        } catch (error) {
            console.error(error);
        }
    }
    asyncPost();
};

export const handleRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>, 
    setForm: React.Dispatch<React.SetStateAction<FormInputs>>, form: FormInputs
) => {
    if (1/*checkAppropiateRoomName(e.target.value)*/) {
        setForm({
            ...form,
            room: e.target.value,
        });
    }
};