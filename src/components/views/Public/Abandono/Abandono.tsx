import { useState } from "react";
import Modal from "./Modal";
import { obtenerJugador, obtenerPartida } from "../../../context/GameContext";
import useRouteNavigation from "../../../routes/RouteNavigation";
import { HandleAbandono } from "../../../hooks/Abandono/Abandonar";

export default function Abandono() {
    const [isModalOpen, setModalOpen] = useState(false);
    const { redirectToHome } = useRouteNavigation();
    const idPartida = obtenerPartida().id;
    const idJugador = obtenerJugador()?.id;

    const openModal = () => {
        setModalOpen(true);
    };
    
      // Handle closing the modal
    const closeModal = () => {
        setModalOpen(false);
    };
    
      // Handle confirm action
    const confirmAction = () => {
        HandleAbandono(idPartida, idJugador);     
        redirectToHome();
    };

    return (
        <>
        <button onClick={openModal}>Abandonar juego</button>
        <Modal show={isModalOpen} onClose={closeModal} onConfirm={confirmAction} />
        </>
    )
}