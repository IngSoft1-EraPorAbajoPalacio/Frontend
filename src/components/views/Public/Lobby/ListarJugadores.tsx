import React, { useEffect, useState } from "react"; // Ensure useState is imported
import { socket } from "../../../hooks/sockets";

const ListarJugadores = () => {
    // Define state variables here
    const [incrJugs, setIncrJugs] = useState(0); // Example initial state
    const [decrJugs, setDecrJugs] = useState(0); // Example initial state

    useEffect(() => {
        const handleEliminarJugador = (event: MessageEvent) => {
            // Logic to handle removing a player
        };

        socket.addEventListener('message', handleEliminarJugador);

        return () => {
            socket.removeEventListener('message', handleEliminarJugador);
        };
    }, [incrJugs, decrJugs]); // Dependency array includes incrJugs and decrJugs

    // Additional component logic here...

    return (
        <div>
            {/* Your JSX for rendering the player list */}
        </div>
    );
};

export default ListarJugadores;



