import React, { useState, Dispatch, SetStateAction } from 'react';
import '../../../../styles/Home/Formularios.css';
import { obtenerPartida } from "../../../context/GameContext";
import UnirsePartida from "../../../hooks/Home/UnirsePartida";
import { handleUnitedPlayerNameChange, handleUnitedPasswordChange, handleInvalid, handleValid } from './HandlersFormularios';

interface FormCreateRoomProps {
    setIdJugador: Dispatch<SetStateAction<number | null>>;
    idPartida: number | null;
}

const FormularioUnirsePartida: React.FC<FormCreateRoomProps> = ({ setIdJugador, idPartida }) => {
    const [alias, setAlias] = useState('');
    const [dirtyAlias, setDirtyAlias] = useState(false);
    const [password, setPassword] = useState('');
    const [dirtyPassword, setDirtyPassword] = useState<boolean>(false);
    const room = obtenerPartida();
    const roomName = room ? room.nombre : '';

    return (
        <div className="form-container">
            <form onSubmit={(e) => UnirsePartida(e, alias, password, setIdJugador, idPartida)}>
                <h2>Unirse a Sala</h2>
                <span>{roomName}</span>
                
                <h3>Alias</h3>
                <input
                    className={'input' + (alias === '' && dirtyAlias ? ' input-invalid' : '')}
                    type='text'
                    placeholder="Ingrese su nombre"
                    value={alias}
                    onChange={(e) => { setDirtyAlias(true); handleUnitedPlayerNameChange(e, setAlias); handleValid(e); }}
                    onInvalid={handleInvalid}
                    required
                />
                {room.bloqueada && (
                    <>
                        <h3>Contraseña</h3>
                        <input
                            className={'input' + (alias === '' && dirtyPassword ? ' input-invalid' : '')}
                            type='password'
                            placeholder='Ingrese la contraseña'
                            value={password}
                            onChange={(e) => { setDirtyPassword(true); handleUnitedPasswordChange(e, setPassword); handleValid(e); }}
                            onInvalid={handleInvalid}
                            required
                        />
                    </>
                )}
                <button className="submit-button" type="submit">Unirse</button>
            </form>
        </div>
    );
}

export default FormularioUnirsePartida;