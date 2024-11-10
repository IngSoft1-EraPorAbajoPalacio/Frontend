import React, { useState } from 'react';
import '../../../../styles/Game/Chat.css';
import { obtenerJugador, obtenerPartida } from '../../../context/GameContext';
import EnviarMensaje from '../../../hooks/Game/EnviarMensaje';
import { useEffect, useRef } from 'react';

interface ChatProps {
    listaMensajes: string[];
}

const Chat: React.FC<ChatProps> = ({ listaMensajes }) => {
    const [mostrarMensajes, setMostrarMensajes] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const nombreJugador = obtenerJugador().nombre;
    const idPartida = obtenerPartida().id;
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleToggle = () => {
        setMostrarMensajes((prev) => !prev);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMensaje(e.target.value);
    };

    const handleSend = () => {
        setMensaje('');
        EnviarMensaje(idPartida, nombreJugador, mensaje);
    };

    useEffect(() => {
        if (mostrarMensajes && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [listaMensajes, mostrarMensajes]);

    return (
        <div className="chat">
            {mostrarMensajes && (
            <div className="chatListaMensajes">
                {listaMensajes.length > 0 ? (
                    listaMensajes.map((msg, index) => {
                        const [sender, message] = msg.split(':', 2);
                        return (
                            <div key={index} className="chatMensaje">
                                <strong>{sender}</strong>
                                { message ? `: ${message}` : ''}
                            </div>
                        );
                    })
                ) : (
                    <div className="chatSinMensajes">Sin mensajes.</div>
                )}
                <div ref={messagesEndRef} />
            </div>
            )}

            <div className="chatCajaInput">
                <input
                    type="text"
                    value={mensaje}
                    onChange={handleInputChange}
                    className="chatInput"
                    placeholder="Envia un mensaje..."
                />
                <button onClick={handleSend} className="chatEnviar">
                    Enviar
                </button>
                <button onClick={handleToggle} className="chatToggle">
                    {mostrarMensajes ? '▼' : '▲'}
                </button>
            </div>
        </div>
  );
};

export default Chat;
