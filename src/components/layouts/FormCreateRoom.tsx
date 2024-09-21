import { useState } from 'react';

import "../../styles/FormCreateRoom.css";

export function FormCreateRoom() {
	const [form, setForm] = useState(
		{
			room: '',
			minPlayers: 2,
			maxPlayers: 8,
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
		if (form.maxPlayers < 8) {
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
			<label>
				Nombre de la Sala:
				<input className='input'
					type='text'
					name='sala'
					placeholder="SalaDeTorval"
					value={form.room}
					onChange={handleRoomNameChange} />
			</label>
			<div className='max-min-container'>
				<div>
					Máximo de Jugadores:
					<label>
						<button type="button"
							onClick={() => decrementMaxPlayersAllowed()}>
							<b>-</b>
						</button>
						<span>{form.maxPlayers}</span>
						<button type="button"
							onClick={() => incrementMaxPlayersAllowed()}>
							<b>+</b>
						</button>
					</label>
				</div>
				<div>
					Mínimo de Jugadores:
					<label>


						<button type="button"
							onClick={decrementMinPlayersAllowed}>
							<b>-</b>
						</button>
						<span>{form.minPlayers}</span>
						<button type="button"
							onClick={incrementMinPlayersAllowed}>
							<b>+</b>
						</button>
					</label>
				</div>
			</div>
		</form>
	</div>);
};