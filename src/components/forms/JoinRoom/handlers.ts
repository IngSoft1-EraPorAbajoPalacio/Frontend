import { obtenerJugador, obtenerPartida, guardarJugador } from "../../context/GameContext";

export function handleSubmit(e: React.FormEvent<HTMLFormElement>, alias: string, setUnido: React.Dispatch<React.SetStateAction<boolean>>) {
    e.preventDefault();
    const {id, nombre, min, max} = obtenerPartida();
    const data = { nombreJugador: alias }; // Crea un objeto con la propiedad esperada
    console.log(data);

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, //Ill send a json
        body: JSON.stringify(data), //Here is the json
    };
    
    const asyncPost = async () => {
        try {
            //Now i have to connect with the endpoint to send the info of the room
           
            const response = await fetch('http://127.0.0.1:8000/partida/'+ id +'/jugador', options);
            
            if (response.status === 201) {                
                const id_jugador = await response.json();
                guardarJugador({ id: id_jugador, nombre: data.nombreJugador, isHost: false });
                setUnido(true);
            } else {
                console.log('Error al unirse a una partida');
            }
            
           
        } catch (error) {
            console.log(options.body);
            console.error(error);
        }
    }
    asyncPost();
}

export function handleAliasChange(e: React.ChangeEvent<HTMLInputElement>, setAlias: React.Dispatch<React.SetStateAction<string>>) {
    if(validateNames(e.target.value)){setAlias(e.target.value);console.log(e.target.value)};
}

export const validateNames = (name: string) => {
    return name.length <= 20;
};