import React from 'react';
import '../../../../styles/Abandono/Modal.css'

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onConfirm }) => {
  if (!show) return null; // Hide modal if 'show' is false

  return (
    <div className='modalOverlay'>
      <div className='modalContent'>
        <h2>Estas seguro de que querés abandonar la partida?</h2>
        <button className='cancelButton' onClick={onClose}>Cancelar</button>
        <button className='confirmButton' onClick={onConfirm}>Abandonar</button>
      </div>
    </div>
  );
};


export default Modal;