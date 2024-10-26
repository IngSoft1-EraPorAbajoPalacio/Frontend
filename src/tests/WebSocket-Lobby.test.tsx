import { act } from 'react';
import { describe, vi, it, expect } from 'vitest';
import ObtenerMensajes from '../components/hooks/Lobby/ObtenerMensajes';
import createSocketLobby from '../services/socketLobby';
import { MockIniciarPartida } from '../data/MockMensajeLobby';

// Mockeamos el módulo de socket
vi.mock('../services/sockets', () => ({
  default: {onmessage: vi.fn()},
}));

describe('ObtenerMensajes', () => {
    let socket: any;
    let setJugadores: any;
    let setContador: any;
    let setPartidaIniciada: any;
    let setCancelada: any;
    const idJugador = 1;
    const idPartida = 1;

    beforeAll(() => {
        socket = createSocketLobby;
    });

    beforeEach(() => {
        setJugadores = vi.fn();
        setContador = vi.fn();
        setPartidaIniciada = vi.fn();
        setCancelada = vi.fn();
    });

    afterAll(() => {
        socket.close;
    });

    it('Debería actualizar la lista de jugadores cuando recibe un mensaje de tipo JugadorUnido', () => {

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

    it('Deberia avisar cuando la partida haya sido cancelada por el host para que el usuario sea redireccionado al Home', () => {

        // Llamamos a la función que escucha los mensajes
        ObtenerMensajes(setJugadores, setContador, setPartidaIniciada, idJugador, idPartida, setCancelada, socket);

        // Simulamos un mensaje de tipo PartidaEliminada
        const message = JSON.stringify({
            type: 'PartidaEliminada',
        });

        // Simulamos recibir el mensaje desde el servidor
        act(() => {
            socket.onmessage({ data: message });
        });

        // Verificamos si la partida fue seteada como cancelada
        expect(setCancelada).toHaveBeenCalledWith(true);
    });

    it('Debería actualizar los datos de la partida cuando recibe un mensaje de tipo IniciarPartida', () => {

        // Llamamos a la función que escucha los mensajes
        ObtenerMensajes(setJugadores, setContador, setPartidaIniciada, idJugador, idPartida, setCancelada, socket);

        // Simulamos un mensaje de tipo IniciarPartida
        const message = JSON.stringify(MockIniciarPartida);

        // Simulamos recibir el mensaje desde el servidor
        act(() => {
            socket.onmessage({ data: message });
        });

        // Verificamos si la partida fue seteada como iniciada
        expect(setPartidaIniciada).toHaveBeenCalledWith(true);
    });

    it('No debería actualizar los datos de la partida si el mensaje no es de tipo IniciarPartida', () => {

        // Llamamos a la función que escucha los mensajes
        ObtenerMensajes(setJugadores, setContador, setPartidaIniciada, idJugador, idPartida, setCancelada, socket);

        // Simulamos un mensaje de otro tipo
        const message = JSON.stringify({ type: 'OtroTipo', ListaJugadores: ['Jugador1', 'Jugador2', 'Jugador3'] });

        // Llamamos al evento onmessage
        act(() => {
            socket.onmessage({ data: message });
        });

        // Verificamos que no se haya llamado setPartidaIniciada
        expect(setPartidaIniciada).not.toHaveBeenCalled();
    });

    it('No debería actualizar la lista de jugadores si el mensaje no es de tipo AbandonarPartida', () => {

        // Llamamos a la función que escucha los mensajes
        ObtenerMensajes(setJugadores, setContador, setPartidaIniciada, idJugador, idPartida, setCancelada, socket);

        // Simulamos un mensaje de otro tipo
        const message = JSON.stringify({ type: 'OtroTipo', data: { idJugador: 1 } });

        // Llamamos al evento onmessage
        act(() => {
            socket.onmessage({ data: message });
        });

        // Verificamos que no se haya llamado setJugadores
        expect(setJugadores).not.toHaveBeenCalled();
        expect(setContador).not.toHaveBeenCalled();
    });

});