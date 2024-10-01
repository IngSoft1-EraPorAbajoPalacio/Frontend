import React, { useState, useEffect } from 'react';
import "../../../styles/FormCreateRoom.css";
import { FormInputs } from "./types.ts";
import { handleSubmit, handleRoomNameChange, handlePlayerNameChange } from "./handlers.ts";
import { incrementMaxPlayersAllowed, decrementMaxPlayersAllowed, incrementMinPlayersAllowed, decrementMinPlayersAllowed } from "./controlRoomLimit.ts";
import { useNavigate } from 'react-router-dom';

export function FormCreateRoom() {
    const [dirtyRoom, setDirtyRoom] = useState<boolean>(false); // To check if the information of the input is missing
    const [dirtyAlias, setDirtyAlias] = useState<boolean>(false); // To check if the information of the input is missing
    const [partidaCreada, setPartidaCreada] = useState<boolean>(false);
    const navigate = useNavigate();

    const [form, setForm] = useState<FormInputs>(
        {
            idPlayer: '',
            idRoom: '',
            playerName: '',
            room: '',
            minPlayers: 2,
            maxPlayers: 4,
        }
    );

    const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
        e.target.setCustomValidity('Por favor, rellene el campo.');
    };
    const handleValid = (e: React.InvalidEvent<HTMLInputElement>) => {
        e.target.setCustomValidity('');
    };

    useEffect(() => {
        if (partidaCreada) {
            navigate('/lobby');
        }
    }, [partidaCreada, navigate]);

    return (
        <div className='form-container'>
            <form onSubmit={(e) => handleSubmit(e, setForm, form, setPartidaCreada)}>
                <div className='room-name'>
                    <h3>Nombre de partida:</h3>
                </div>
                <div className='room-name'>
                    <input className={'input' + (form.room === '' && dirtyRoom ? ' input-invalid' : '')}
                        type='text'
                        name='sala'
                        placeholder="SalaDeTorval"
                        value={form.room}
                        onChange={(e) => { setDirtyRoom(true); handleRoomNameChange(e, setForm, form); handleValid(e); }}
                        onInvalid={handleInvalid}
                        required />
                </div>

                <div className='max-min-container'>
                    <div className='p-container'><p>Mínimo de Jugadores</p></div>
                    <div className='buttons-container'>
                        <button type="button"
                            onClick={() => decrementMinPlayersAllowed(setForm, form)}>
                            <b>-</b>
                        </button>
                        <b><span>{form.minPlayers}</span></b>
                        <button type="button"
                            onClick={() => incrementMinPlayersAllowed(setForm, form)}>
                            <b>+</b>
                        </button>
                    </div>
                    <div className='p-container'><p>Máximo de Jugadores</p></div>
                    <div className='buttons-container'>
                        <button type="button"
                            onClick={() => decrementMaxPlayersAllowed(setForm, form)}>
                            <b>-</b>
                        </button>
                        <b><span>{form.maxPlayers}</span></b>
                        <button type="button"
                            onClick={() => incrementMaxPlayersAllowed(setForm, form)}>
                            <b>+</b>
                        </button>
                    </div>
                </div>
                <div id="create-player">
                    <div>
                        <h4>Alias: </h4>
                    </div>
                    <div>
                        <input className={'input' + (form.playerName === '' && dirtyAlias ? ' input-invalid' : '')}
                            type='text'
                            placeholder='Player1'
                            value={form.playerName}
                            onChange={(e) => { setDirtyAlias(true); handlePlayerNameChange(e, setForm, form); handleValid(e) }}
                            onInvalid={handleInvalid}
                            required
                        />
                    </div>
                </div>
                <div id='submit-button'>
                    <button type='submit'>Crear Sala</button>
                </div>
            </form>
        </div>
    );
};