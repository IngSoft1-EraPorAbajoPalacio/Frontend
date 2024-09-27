import React, { useState } from 'react';

import "../../../styles/FormCreateRoom.css";
import {FormInputs} from "./types.ts";
import {handleSubmit, handleRoomNameChange, handlePlayerNameChange} from "./handlers.ts";
import {incrementMaxPlayersAllowed, decrementMaxPlayersAllowed, 
	incrementMinPlayersAllowed, decrementMinPlayersAllowed} from "./controlRoomLimit.ts";

export function FormCreateRoom() {
	const [dirty, setDirty] = useState<boolean>(false); // To check if the information of the input is missing

	const [form, setForm] = useState<FormInputs>(
		{
			idPlayer: '',
			playerName: '',
			room: '',
			minPlayers: 2,
			maxPlayers: 4,
		}
	);

	return (<div className='form-container'>
		<form onSubmit={(e) => handleSubmit(e, setForm, form)}>
			<div className='room-name'>
				<h3>Nombre de la Sala</h3>
			</div>
			<div className='room-name'>
				<input className={'input' + (form.room === '' && dirty ? ' input-invalid' : '')}
					type='text'
					name='sala'
					placeholder="SalaDeTorval"
					value={form.room}
					onChange={(e) => { setDirty(true); handleRoomNameChange(e,setForm, form); }}
					required />
			</div>

			<div className='max-min-container'>
				<div className='p-container'><p>Mínimo de Jugadores</p></div>
				<div className='buttons-container'>
					<button type="button"
						onClick={() => decrementMinPlayersAllowed(setForm,form)}>
						<b>-</b>
					</button>
					<b><span>{form.minPlayers}</span></b>
					<button type="button"
						onClick={() => incrementMinPlayersAllowed(setForm,form)}>
						<b>+</b>
					</button>
				</div>
				<div className='p-container'><p>Máximo de Jugadores</p></div>
				<div className='buttons-container'>
					<button type="button"
						onClick={() => decrementMaxPlayersAllowed(setForm,form)}>
						<b>-</b>
					</button>
					<b><span>{form.maxPlayers}</span></b>
					<button type="button"
						onClick={() => incrementMaxPlayersAllowed(setForm,form)}>
						<b>+</b>
					</button>
				</div>
			</div>
			<div id="create-player">
				<div>
				<h4>Alias: </h4>
				</div>
				<div>
				<input className={'input' + (form.room === '' && dirty ? ' input-invalid' : '')}
					type='text' 
					placeholder='Player1'
					value={form.playerName}
					onChange={(e) => { setDirty(true); handlePlayerNameChange(e,setForm, form); }}
					required
				/>
				</div>
			</div>
			<div id='submit-button'>
				<button type='submit'>Crear Sala</button>
			</div>
		</form>
	</div>);
};