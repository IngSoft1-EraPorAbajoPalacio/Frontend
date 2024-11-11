import React, { useState, Dispatch, SetStateAction } from 'react';
import "../../../../styles/Home/Formularios.css";
import { FormInputs } from '../../../../types/formularioCrearPartida.ts';
import CrearPartida from "../../../hooks/Home/CrearPartida.tsx";
import { incrementMaxPlayersAllowed, decrementMaxPlayersAllowed, incrementMinPlayersAllowed, decrementMinPlayersAllowed } from "./ControlFormulario.tsx";
import { handleRoomNameChange, handleInvalid, handlePlayerNameChange, handleValid, handlePasswordChange } from './HandlersFormularios.tsx'
import { usePartidaActiva } from '../../../utils/PartidaActiva.tsx';

interface FormCreateRoomProps {
    setIdJugador: Dispatch<SetStateAction<number | null>>;
    setIdPartida: Dispatch<SetStateAction<number | null>>;
}

const FormCreateRoom: React.FC<FormCreateRoomProps> = ({ setIdJugador, setIdPartida }) => {
    const [dirtyRoom, setDirtyRoom] = useState<boolean>(false); // To check if the information of the input is missing
    const [dirtyAlias, setDirtyAlias] = useState<boolean>(false); // To check if the information of the input is missing
    const [dirtyPassword, setDirtyPassword] = useState<boolean>(false); // To check if the information of the input is missing
    const [password, setPassword] = useState<boolean>(false); // To show the password input

    const { actualizarPartidaActiva } = usePartidaActiva();

    const [form, setForm] = useState<FormInputs>({
        idPlayer: '',
        idRoom: '',
        playerName: '',
        room: '',
        minPlayers: 2,
        maxPlayers: 4,
        password: '',
    });

    return (
        <div className='form-container'>
            <form onSubmit={(e) => CrearPartida(e, setForm, form, setIdJugador, setIdPartida, actualizarPartidaActiva)}>
                <h2>Crear Sala</h2>

                <h3>Nombre de partida</h3> 
                <input className={'input' + (form.room === '' && dirtyRoom ? ' input-invalid' : '')}
                    type='text'
                    name='sala'
                    placeholder="Sala de Torval"
                    value={form.room}
                    onChange={(e) => { setDirtyRoom(true); handleRoomNameChange(e, setForm, form); handleValid(e) }}
                    onInvalid={handleInvalid}
                    required
                />

                <h3>Mínimo de Jugadores</h3>
                <div className='buttons-container'>
                    <button type="button" onClick={() => decrementMinPlayersAllowed(setForm, form)}> <b>-</b> </button>
                    <span>{form.minPlayers}</span>
                    <button type="button" onClick={() => incrementMinPlayersAllowed(setForm, form)}> <b>+</b> </button>
                </div>

                <h3>Máximo de Jugadores</h3>
                <div className='buttons-container'>
                    <button type="button" onClick={() => decrementMaxPlayersAllowed(setForm, form)}> <b>-</b> </button>
                    <b><span>{form.maxPlayers}</span></b>
                    <button type="button" onClick={() => incrementMaxPlayersAllowed(setForm, form)}> <b>+</b> </button>
                </div>

                <h3>Alias</h3>
                <input
                    className={'input' + (form.playerName === '' && dirtyAlias ? ' input-invalid' : '')}
                    type='text'
                    placeholder='Ingrese su nombre'
                    value={form.playerName}
                    onChange={(e) => { setDirtyAlias(true); handlePlayerNameChange(e, setForm, form); handleValid(e) }}
                    onInvalid={handleInvalid}
                    required
                />

                <h3>Contraseña</h3>
                <div className='password'>
                    <input id='enable-password'  type="checkbox" onClick={() => setPassword(!password)} />
                    <input
                        className={'input' + ( password && form.password === '' && dirtyPassword ? ' input-invalid' : '')}
                        id='password'
                        type='password'
                        disabled={!password}
                        placeholder={password ? 'Ingrese su contraseña' : 'Sin contraseña'}
                        value={form.password}
                        onChange={(e) => { setDirtyPassword(true); handlePasswordChange(e, setForm, form, password); handleValid(e) }}
                        onInvalid={handleInvalid}
                        required={password}
                    />
                </div>
                <button id='submit-button' type='submit'>Crear Sala</button>
            </form>
        </div>
    );
};

export default FormCreateRoom;