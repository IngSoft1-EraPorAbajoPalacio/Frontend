import { useState } from "react";
import '../../styles/FormJoinRoom.css';
import { obtenerPartida } from "../context/PlayerContext";

export const FormJoinRoom = () => {
    const [alias, setAlias] = useState('');
    const [dirtyAlias, setDirtyAlias] = useState(false);

    const room = obtenerPartida();
    const roomName = room ? room.nombre : '';

    return (
        <div className="form-container">
            <form>
                <div className="form-title">
                    <h3><b>Unirse a Sala: </b></h3>
                    <span>{roomName}</span>
                </div>
                
                    <div className="alias-designation">
                        <h4>Alias: </h4>
                        <input className={'input' + (alias === '' && dirtyAlias ? ' input-invalid' : '')}
                            type='text'
                            placeholder="Player2"
                            value={alias}
                            onChange={() => { setDirtyAlias(true) }}
                            required />
                    </div>
                    <button className="submit-button"
                        type="submit">Unirse</button>
                
            </form>
        </div>
    );
}