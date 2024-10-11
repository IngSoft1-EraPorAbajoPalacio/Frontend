import { useState } from "react";
import Modal from "./Modal";
import { obtenerJugador, obtenerPartida, borrarPartidaEnCurso } from "../../../context/GameContext";
import useRouteNavigation from "../../../routes/RouteNavigation";
import { HandleAbandono } from "../../../hooks/Abandono/Abandonar";
import PasarTurno from "../../../hooks/Game/PasarTurno";

interface AbandonoProps {
    turnoActual: number | null;
}

export default function Abandono({ turnoActual }: AbandonoProps) {
    const [isModalOpen, setModalOpen] = useState(false);
    const { redirectToHome } = useRouteNavigation();
    const idPartida = obtenerPartida().id;
    const idJugador = obtenerJugador()?.id;

    const openModal = () => {
        setModalOpen(true);
    };
    
  
    const closeModal = () => {
        setModalOpen(false);
    };


    const confirmAction = async () => {
        if (idJugador == turnoActual) await PasarTurno(idPartida, idJugador);
        HandleAbandono(idPartida, idJugador);  
        borrarPartidaEnCurso();
        
        redirectToHome();
    };

    return (
        <>
        <button onClick={openModal}>Abandonar juego</button>
        <Modal show={isModalOpen} onClose={closeModal} onConfirm={confirmAction} />
        </>
    )
}