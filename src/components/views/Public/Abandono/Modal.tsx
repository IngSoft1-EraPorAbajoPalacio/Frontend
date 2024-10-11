import React from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onConfirm }) => {
  if (!show) return null; // Hide modal if 'show' is false

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Estas seguro de que querés abandonar la partida?</h2>
        <button style={styles.cancelButton} onClick={onClose}>Cancelar</button>
        <button style={styles.confirmButton} onClick={onConfirm}>Abandonar</button>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    textAlign: 'center' as 'center',
    width: '300px',
    color: '#000',
  },
  cancelButton: {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px',
    marginRight: '10px',
  },
  confirmButton: {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px',
  },
};

export default Modal;