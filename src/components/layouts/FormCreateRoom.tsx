import { useState } from 'react';

import "../../styles/FormCreateRoom.css";

interface FormInputs {
	room: string,
	minPlayers: number,
	maxPlayers: number,
}

export function FormCreateRoom() {
	const [dirty, setDirty] = useState<boolean>(false);

	const [form, setForm] = useState<FormInputs>(
		{
			room: '',
			minPlayers: 2,
			maxPlayers: 4,
		}
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(form);
	};

	const handleRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (1/*checkAppropiateRoomName(e.target.value)*/) {
			setForm({
				...form,
				room: e.target.value,
			});
		}
	};

	const incrementMaxPlayersAllowed = () => {
		if (form.maxPlayers < 4) {
			setForm({
				...form,
				maxPlayers: form.maxPlayers + 1,
			});
		}
	};

	const decrementMaxPlayersAllowed = () => {
		if (2 < form.maxPlayers && form.minPlayers < form.maxPlayers) {
			setForm({
				...form,
				maxPlayers: form.maxPlayers - 1,
			});
		}
	};

	const incrementMinPlayersAllowed = () => {
		if (form.minPlayers < 8 && form.minPlayers < form.maxPlayers) {
			setForm({
				...form,
				minPlayers: form.minPlayers + 1,
			});
		}
	};

	const decrementMinPlayersAllowed = () => {
		if (2 < form.minPlayers) {
			setForm({
				...form,
				minPlayers: form.minPlayers - 1,
			});
		}
	};

	return (<div className='form-container'>
		<form onSubmit={handleSubmit}>
			<div className='room-name'>
				<h3>Nombre de la Sala</h3>
			</div>
			<div className='room-name'>
				<input className={'input' + (form.room === '' && dirty ? ' input-invalid' : '')}
					type='text'
					name='sala'
					placeholder="SalaDeTorval"
					value={form.room}
					onChange={(e) => { setDirty(true); handleRoomNameChange(e); }}
					required />
			</div>

			<div className='max-min-container'>
				<div className='p-container'><p>Mínimo de Jugadores</p></div>
				<div className='buttons-container'>
					<button type="button"
						onClick={decrementMinPlayersAllowed}>
						<b>-</b>
					</button>
					<b><span>{form.minPlayers}</span></b>
					<button type="button"
						onClick={incrementMinPlayersAllowed}>
						<b>+</b>
					</button>
				</div>
				<div className='p-container'><p>Máximo de Jugadores</p></div>
				<div className='buttons-container'>
					<button type="button"
						onClick={decrementMaxPlayersAllowed}>
						<b>-</b>
					</button>
					<b><span>{form.maxPlayers}</span></b>
					<button type="button"
						onClick={incrementMaxPlayersAllowed}>
						<b>+</b>
					</button>
				</div>
			</div>
		</form>
	</div>);
};