// tests/ObtenerMensajes.test.tsx
import { act } from 'react';
import { describe, vi, it, expect } from 'vitest';
import ObtenerMensajes from '../components/hooks/Lobby/ObtenerMensajes';
import socket from '../services/sockets';

// Mockeamos el módulo de socket
vi.mock('../services/sockets', () => ({
  default: {onmessage: vi.fn()},
}));

describe('ObtenerMensajes', () => {
    it('Debería actualizar la lista de jugadores cuando recibe un mensaje de tipo JugadorUnido', () => {
        const setJugadores = vi.fn();
        const setContador = vi.fn();
        const setList = vi.fn();
        const idJugador = 1; // No importa el valor
        const idPartida = 1; // No importa el valor


        // Llamamos a la función que escucha los mensajes
        ObtenerMensajes(setJugadores, setContador, setList, idJugador, idPartida);

        // Simulamos un mensaje de tipo JugadorUnido
        const message = JSON.stringify({
            type: 'JugadorUnido',
            ListaJugadores: ['Jugador1', 'Jugador2', 'Jugador3']
        });

        // Simulamos recibir el mensaje desde el servidor
        act(() => {
            socket.onmessage({ data: message });
        });

        // Verificamos si se actualiza la lista de jugadores correctamente
        expect(setJugadores).toHaveBeenCalledWith(['Jugador1', 'Jugador2', 'Jugador3']);
        expect(setContador).toHaveBeenCalledWith(3);
    });

});