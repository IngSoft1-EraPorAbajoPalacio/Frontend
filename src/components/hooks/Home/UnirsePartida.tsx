import { guardarJugador, guardarJugadoresUnidos } from "../../context/GameContext";
import showToast from "../../views/Public/Toast";

// Llamada a la API para unirse a una partida
function UnirsePartida(
    e: React.FormEvent<HTMLFormElement>, 
    alias: string,
    password: string,
    setIdJugador: React.Dispatch<React.SetStateAction<number|null>>,
    IdPartida: number
) {
    e.preventDefault();
    const partida = IdPartida;
    const data = { nombreJugador: alias, contrasena: password }; // Crea un objeto con la propiedad esperada

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Indica que el contenido es JSON
        body: JSON.stringify(data), // Convierte el objeto a JSON
    };
    
    const asyncPost = async () => {
        try {       
            if(IdPartida === null) throw new Error('No se ha seleccionado una partida');
            
            const response = await fetch('http://127.0.0.1:8000/partida/' + partida + '/jugador', options);
            
            // Si la respuesta es 201, se unió correctamente
            if (response.status === 201) {                
                const mensaje = await response.json();
                guardarJugador({ id: mensaje.idJugador, nombre: data.nombreJugador, isHost: false });
                guardarJugadoresUnidos(mensaje.unidos);
                setIdJugador(mensaje.idJugador);
            }
            
            // Si la respuesta es 404, la partida está llena
            else if(response.status === 404) showToast({ type: 'error', message: "Arctic Monkeys 404 => Partida Llena" });

            // Si la respuesta es 401, la contraseña es incorrecta
            else if(response.status === 401) showToast({ type: 'error', message: "Contraseña incorrecta" });

            // Si la respuesta es otra, hubo un problema
            else throw new Error('Hubo un problema tratando de unirse a la partida.');
        } catch (error) {
            console.error(error);
        }
    }
    asyncPost();
}

export default UnirsePartida;