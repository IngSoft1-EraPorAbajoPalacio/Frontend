import { FormInputs } from "./types";

export const handleSubmit = (e: React.FormEvent<HTMLFormElement>,
    setForm: React.Dispatch<React.SetStateAction<FormInputs>>,
    form: FormInputs) => {
    e.preventDefault();
    const data = {
        id_host: '',
        nombre_host: form.playerName,
        cantJugadores: 1,
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
                const { id_partida, cantJugadores} = await ids;
                setForm({
                    ...form,
                    idRoom: id_partida,
                
                });
                localStorage.setItem("id_room", form.idRoom);
                console.log('Room created with ID:', id_partida);
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