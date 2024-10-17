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
                <div className="form-title">
                    <h3><b>Unirse a Sala: </b></h3>
                    <span>{roomName}</span>
                </div>
                <div className="alias-designation">
                    <h4>Alias: </h4>
                    <input
                        className={'input' + (alias === '' && dirtyAlias ? ' input-invalid' : '')}
                        type='text'
                        placeholder="Player2"
                        value={alias}
                        onChange={(e) => { setDirtyAlias(true); handleAliasChange(e, setAlias); handleValid(e); }}
                        onInvalid={handleInvalid}
                        required
                    />
                </div>
                <button className="submit-button" type="submit">Unirse</button>
            </form>
        </div>
    );
}

export default FormularioUnirsePartida;