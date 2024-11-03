import React, { useState, Dispatch, SetStateAction } from 'react';
import '../../../../styles/Home/Formularios.css';
import { obtenerPartida } from "../../../context/GameContext";
import UnirsePartida from "../../../hooks/Home/UnirsePartida";
import { handleAliasChange, handleInvalid, handleValid } from './HandlersFormularios';

interface FormCreateRoomProps {
    setIdJugador: Dispatch<SetStateAction<number | null>>;
    idPartida: number | null;
}

const FormularioUnirsePartida: React.FC<FormCreateRoomProps> = ({ setIdJugador, idPartida }) => {
    const [alias, setAlias] = useState('');
    const [dirtyAlias, setDirtyAlias] = useState(false);
    const room = obtenerPartida();
    const roomName = room ? room.nombre : '';

    return (
        <div className="form-container">
            <form onSubmit={(e) => UnirsePartida(e, alias, setIdJugador, idPartida)}>
                <h2>Unirse a Sala</h2>
                <span>{roomName}</span>
                
                <h3>Alias</h3>
                <input
                    className={'input' + (alias === '' && dirtyAlias ? ' input-invalid' : '')}
                    type='text'
                    placeholder="Ingrege su nombre"
                    value={alias}
                    onChange={(e) => { setDirtyAlias(true); handleAliasChange(e, setAlias); handleValid(e); }}
                    onInvalid={handleInvalid}
                    required
                />
                {room.password && (
                    <>
                        <h3>Contraseña</h3>
                        <input
                            className='input'
                            type='password'
                            placeholder='Ingrese la contraseña'
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