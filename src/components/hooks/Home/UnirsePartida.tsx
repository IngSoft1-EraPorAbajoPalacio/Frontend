import { guardarJugador, guardarJugadoresUnidos } from "../../context/GameContext";

// Llamada a la API para unirse a una partida
function UnirsePartida(
    e: React.FormEvent<HTMLFormElement>, 
    alias: string,
    setIdJugador: React.Dispatch<React.SetStateAction<number|null>>,
    IdPartida: number|null
) {
    e.preventDefault();
    const partida = IdPartida;
    const data = { nombreJugador: alias }; // Crea un objeto con la propiedad esperada

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, //Ill send a json
        body: JSON.stringify(data), //Here is the json
    };
    
    const asyncPost = async () => {
        try {
            //Now i have to connect with the endpoint to send the info of the room
           
            const response = await fetch('http://127.0.0.1:8000/partida/' + (partida ? partida : '') + '/jugador', options);
            
            if (response.status === 201) {                
                const mensaje = await response.json();
                guardarJugador({ id: mensaje.idJugador, nombre: data.nombreJugador, isHost: false });
                guardarJugadoresUnidos(mensaje.unidos);
                setIdJugador(mensaje.idJugador);
            } else if(response.status === 404){
                alert("Arctic Monkeys 404 => Partida Llena");
            } 
            else {
                console.error('Error al unirse a una partida.');
            }
            
           
        } catch (error) {
            console.error(options.body);
            console.error(error);
        }
    }
    asyncPost();
}

export default UnirsePartida;