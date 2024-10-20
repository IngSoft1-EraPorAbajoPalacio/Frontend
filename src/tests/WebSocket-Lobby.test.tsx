// tests/ObtenerMensajes.test.tsx
import { act } from 'react';
import { describe, vi, it, expect } from 'vitest';
import ObtenerMensajes from '../components/hooks/Lobby/ObtenerMensajes';
import createSocketLobby from '../services/socketLobby';

// Mockeamos el módulo de socket
vi.mock('../services/sockets', () => ({
  default: {onmessage: vi.fn()},
}));

describe('ObtenerMensajes', () => {
    let socket: any;

    beforeAll(() => {
    socket = createSocketLobby;
    });

    afterAll(() => {
    socket.close;
    });

    it('Debería actualizar la lista de jugadores cuando recibe un mensaje de tipo JugadorUnido', () => {
        const setJugadores = vi.fn();
        const setContador = vi.fn();
        const setPartidaIniciada = vi.fn(); // No importa el valor
        const setCancelada = vi.fn(); // No importa el valor
        const idJugador = 1; // No importa el valor
        const idPartida = 1; // No importa el valor


        // Llamamos a la función que escucha los mensajes
        ObtenerMensajes(setJugadores, setContador, setPartidaIniciada, idJugador, idPartida, setCancelada, socket);

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

    it('No debería actualizar la lista de jugadores si el mensaje no es de tipo JugadorUnido', () => {
        const setJugadores = vi.fn();
        const setContador = vi.fn();
        const setPartidaIniciada = vi.fn(); // No importa el valor
        const setCancelada = vi.fn(); // No importa el valor
        const idJugador = 1; // No importa el valor
        const idPartida = 1; // No importa el valor

        // Llamamos a la función que escucha los mensajes
        ObtenerMensajes(setJugadores, setContador, setPartidaIniciada, idJugador, idPartida, setCancelada, socket);

        // Simulamos un mensaje de otro tipo
        const message = JSON.stringify({ type: 'OtroTipo', ListaJugadores: ['Jugador1', 'Jugador2', 'Jugador3'] });

        // Llamamos al evento onmessage
        act(() => {
            socket.onmessage({ data: message });
        });

        // Verificamos que no se haya llamado setJugadores
        expect(setJugadores).not.toHaveBeenCalled();
        expect(setContador).not.toHaveBeenCalled();
    });

});