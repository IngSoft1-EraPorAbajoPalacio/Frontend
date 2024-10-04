import { useState } from "react";
import Modal from "./Modal";
import { obtenerPartida, obtenerJugador } from "../../../context/GameContext";
import { useNavigate } from 'react-router-dom';

export default function Abandono() {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    
      // Handle closing the modal
    const closeModal = () => {
        setModalOpen(false);
    };
    
      // Handle confirm action MOVER A HOOKS DE GAME
    const confirmAction = () => {
        const idPartida = obtenerPartida()?.id;
        const idJugador = obtenerJugador()?.id;
        const navigate = useNavigate();
        
        localStorage.clear();

        fetch(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}`, {
            method: 'DELETE', 
            headers: {
              'Content-Type': 'application/json',  // Specify the content type
            }
          })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch(error => console.error('Error:', error));

        navigate('/');
    };

    return (
        <>
        <button 
        onClick={openModal}
        style= {{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            padding: '10px 20px',
            backgroundColor: '#dc143c',
            border: '#fff',
            borderRadius: '5px',
            cursor: 'pointer',
            }}
        >
        Abandonar juego
        </button>
        <Modal show={isModalOpen} onClose={closeModal} onConfirm={confirmAction} />
        </>
    )
}