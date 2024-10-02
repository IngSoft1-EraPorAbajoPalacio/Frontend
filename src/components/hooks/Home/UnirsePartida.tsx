import { obtenerPartida, guardarJugador } from "../../context/GameContext";

// Llamada a la API para unirse a una partida
function UnirsePartida(
    e: React.FormEvent<HTMLFormElement>, 
    alias: string,
    setUnido: React.Dispatch<React.SetStateAction<boolean>>,
    setJugadoresUnidos: React.Dispatch<React.SetStateAction<{ id: number, nombre: string }[]>>
) {
    e.preventDefault();
    const partida = obtenerPartida();
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
           
            const response = await fetch('http://127.0.0.1:8000/partida/'+ partida.id +'/jugador', options);
            
            if (response.status === 201) {                
                const mensasje = await response.json();
                guardarJugador({ id: mensasje.id_jugador, nombre: data.nombreJugador, isHost: false });
                setUnido(true);
                setJugadoresUnidos(mensasje.unidos);
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

export default UnirsePartida;