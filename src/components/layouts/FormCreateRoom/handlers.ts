import { FormInputs } from "./types";
import {v4} from 'uuid';

export const handleSubmit = (e: React.FormEvent<HTMLFormElement>,
    setForm: React.Dispatch<React.SetStateAction<FormInputs>>,
    form :FormInputs) => {
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
                if(localStorage.getItem('id') === null){ //Id doesnt exist
                    const newId = v4(); //Get random id
                    localStorage.setItem('id', newId); //Save id in local storage
                    setForm({ 
                        ...form,
                        idPlayer: newId,
                    }); //Set it in the hook to send it to the backend 
                }
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
    if (validateRoomName(e.target.value)) {
        setForm({
            ...form,
            room: e.target.value,
        });
    }
};

export const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>,
    setForm: React.Dispatch<React.SetStateAction<FormInputs>>, form: FormInputs
) => {
    setForm({
        ...form,
        playerName: e.target.value,
    });
    }

export const validateRoomName = (roomName: string) => {
    return roomName.length <= 30;
};