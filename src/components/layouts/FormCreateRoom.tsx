import { useState } from 'react';

export function FormCreateRoom() {
	const [form, setForm] = useState(
		{
			room: '',
			minPlayers: 2,
			maxPlayers: 8,
		}
	);

	return (<>
		<form onSubmit={()=>{}}>
			<label>
				Nombre de la Sala:
				<input type='text'
					name='sala'
					placeholder="SalaDeTorval"
					value={form.room}
					onChange={()=>{}}/>
			</label>
			<label>
				Máximo de Jugadores:
				<input type='number'
				name='maxJugadores'
				value={form.maxPlayers}
				onChange={()=>{}}/>
			</label>
			<label>
				Mínimo de Jugadores:
				<input type='number'
				name='minJugadores'
				value={form.minPlayers}
				onChange={()=>{}}/>
			</label>
		</form>
	</>);
};