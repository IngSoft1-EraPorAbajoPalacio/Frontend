import { useState } from 'react';

import "../../styles/FormCreateRoom.css";

interface FormInputs {
	idPlayer: string,
	playerName: string,
	room: string,
	minPlayers: number,
	maxPlayers: number,
}

export function FormCreateRoom() {
	const [dirty, setDirty] = useState<boolean>(false); // To check if the information of the input is missing

	const [form, setForm] = useState<FormInputs>(
		{
			idPlayer: "aaa1",
			playerName: 'Player',
			room: '',
			minPlayers: 2,
			maxPlayers: 4,
		}
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = {
			id_host: form.idPlayer,
			nombre_host: form.playerName,
			nombre_partida: form.room,
			cant_min_jugadores: form.minPlayers,
			cant_max_jugadores: form.maxPlayers,
		};
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }, //Ill send a json
			body: JSON.stringify(data), //Here is the json
		};
		const asyncPost = async () => {
			try {
				//Now i have to connect with the endpoint to send the info of the room
				const response = await fetch('http://127.0.0.1:8000/partida', options);
				if (response.ok) {
					console.log('Room created');
				} else {
					console.log('Failed to create room');
				}
			} catch (error) {
				console.error(error);
			}
		}
		asyncPost();
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
			<div id='submit-button'>
				<button type='submit' >Crear Sala</button>
			</div>
		</form>
	</div>);
};