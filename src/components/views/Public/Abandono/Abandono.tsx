import { useState } from "react";
import Modal from "./Modal";
import { obtenerJugador, obtenerPartida, borrarPartidaEnCurso } from "../../../context/GameContext";
import useRouteNavigation from "../../../routes/RouteNavigation";
import { HandleAbandono } from "../../../hooks/Abandono/Abandonar";


export default function Abandono({ pasarTurno, turnoActual }: {
    pasarTurno: () => void;
    turnoActual: number | null;
}) {
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


    const confirmAction = () => {
        HandleAbandono(idPartida, idJugador);  
        console.log(idJugador,turnoActual);
        idJugador === turnoActual ? pasarTurno() : {};  //esto no esta funcionando
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