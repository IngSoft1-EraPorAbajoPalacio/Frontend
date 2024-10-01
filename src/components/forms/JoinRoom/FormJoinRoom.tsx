import { useEffect, useState } from "react";
import '../../../styles/FormJoinRoom.css';
import { obtenerPartida, guardarJugadoresUnidos } from "../../context/GameContext";
import { handleSubmit, handleAliasChange } from "./handlers";
import { useNavigate } from 'react-router-dom';
import { JugadoresUnidos } from "../../../types/partidaListada";

export const FormJoinRoom = () => {
    const [alias, setAlias] = useState('');
    const [dirtyAlias, setDirtyAlias] = useState(false);
    const navigate = useNavigate();
    const [unido, setUnido] = useState(false);
    const [jugadoresUnidos, setJugadoresUnidos] = useState<JugadoresUnidos[]>([]);

    const room = obtenerPartida();
    const roomName = room ? room.nombre : '';

    const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
        e.target.setCustomValidity('Por favor, rellene el campo.');
    };
	const handleValid = (e: React.InvalidEvent<HTMLInputElement>) => {
        e.target.setCustomValidity('');
    };

    useEffect(() => {
        if (unido) {
            guardarJugadoresUnidos(jugadoresUnidos);
            navigate('/lobby');
        }
    }, [unido, navigate]);

    return (
        <div className="form-container">
            <form onSubmit={(e) => {console.log(alias);handleSubmit(e, alias, setUnido, setJugadoresUnidos);}}>
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
                            onChange={(e) => { setDirtyAlias(true); handleAliasChange(e, setAlias); handleValid(e);}}
                            onInvalid={handleInvalid}
                            required />
                    </div>
                    <button className="submit-button"
                        type="submit">Unirse</button>
                
            </form>
        </div>
    );
}