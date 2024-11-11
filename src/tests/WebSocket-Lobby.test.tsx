import { act } from 'react';
import { describe, vi, it, expect } from 'vitest';
import ObtenerMensajes from '../components/hooks/Lobby/ObtenerMensajes';
import createSocketLobby from '../services/socketLobby';
import { Jugador } from '../types/partidaListada';

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
    let CantidadJugadores: any;

    beforeAll(() => {
        socket = createSocketLobby;
    });

    beforeEach(() => {
        setJugadores = vi.fn();
        setContador = vi.fn();
        CantidadJugadores = vi.fn();
        setPartidaIniciada = vi.fn();
        setCancelada = vi.fn();
    });

    afterAll(() => {
        socket.close;
        vi.restoreAllMocks();
        vi.clearAllMocks();
        
    });

    it('Debería actualizar la lista de jugadores cuando recibe un mensaje de tipo JugadorUnido', () => {

        // Llamamos a la función que escucha los mensajes
        ObtenerMensajes(setJugadores, setContador, setPartidaIniciada, CantidadJugadores ,setCancelada, socket);

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

    it('Deberia avisar cuando la partida haya sido cancelada por el host para que el usuario sea redireccionado al Home', () => {

        // Llamamos a la función que escucha los mensajes
        ObtenerMensajes(setJugadores, setContador, setPartidaIniciada, CantidadJugadores ,setCancelada, socket);

        // Simulamos un mensaje de tipo PartidaEliminada
        const message = JSON.stringify({ type: 'PartidaEliminada' });

        // Simulamos recibir el mensaje desde el servidor
        act(() => {
            socket.onmessage({ data: message });
        });

        // Verificamos si la partida fue seteada como cancelada
        expect(setCancelada).toHaveBeenCalledWith(true);
    });

    it('Debería setear la partida como iniciada cuando recibe un mensaje de tipo IniciarPartida', () => {

        // Llamamos a la función que escucha los mensajes
        ObtenerMensajes(setJugadores, setContador, setPartidaIniciada, CantidadJugadores ,setCancelada, socket);

        // Simulamos un mensaje de tipo IniciarPartida
        const message = JSON.stringify({ type: 'IniciarPartida' });

        // Simulamos recibir el mensaje desde el servidor
        act(() => {
            socket.onmessage({ data: message });
        });

        // Verificamos si la partida fue seteada como iniciada
        expect(setPartidaIniciada).toHaveBeenCalledWith(true);
    });

    it('No debería actualizar los datos de la partida si el mensaje no es de tipo IniciarPartida', () => {

        // Llamamos a la función que escucha los mensajes
        ObtenerMensajes(setJugadores, setContador, setPartidaIniciada, CantidadJugadores ,setCancelada, socket);

        // Simulamos un mensaje de otro tipo
        const message = JSON.stringify({ type: 'OtroTipo', ListaJugadores: ['Jugador1', 'Jugador2', 'Jugador3'] });

        // Llamamos al evento onmessage
        act(() => {
            socket.onmessage({ data: message });
        });

        // Verificamos que no se haya llamado setPartidaIniciada
        expect(setPartidaIniciada).not.toHaveBeenCalled();
    });

    it('Debería actualizar la lista de jugadores si el mensaje es de tipo AbandonarPartida', () => {

        // Mock de la lista de jugadores y del contador de jugadores
        const mockSetJugadores = vi.fn();
        const mockSetContador = vi.fn();
        
        // Mock de la función setJugadores
        mockSetJugadores.mockImplementation((updateFn: any) => {
            const jugadores = updateFn([
                new Jugador(1, 'Mauri', false),
                new Jugador(2, 'Cande', false),
            ]);
            return jugadores;
        });

        // Mock de la función setContador
        mockSetContador.mockImplementation((updateFn: any) => {
            const contador = updateFn(1);
            return contador;
        });

        // Llamamos a la función que escucha los mensajes
        ObtenerMensajes(mockSetJugadores, mockSetContador, setPartidaIniciada, CantidadJugadores ,setCancelada, socket);
    
        // Simulamos un mensaje de tipo AbandonarPartida
        const message = JSON.stringify({ type: 'AbandonarPartida', data: { idJugador: 1 } });

        // Llamamos al evento onmessage
        act(() => {
            socket.onmessage({ data: message });
        });

        // Verificamos que mockSetJugadores y mockSetContador hayan sido llamados con una función
        expect(mockSetJugadores).toHaveBeenCalledWith(expect.any(Function));
        expect(mockSetContador).toHaveBeenCalledWith(expect.any(Function));

        // Ejecutamos la función pasada a mockSetJugadores para verificar el resultado
        let updater = mockSetJugadores.mock.calls[0][0];
        const jugadoresActualizados = updater([
            new Jugador(1, 'Mauri', false),
            new Jugador(2, 'Cande', false),
        ]);

        // Ejecutamos la función pasada a mockSetContador para verificar el resultado
        updater = mockSetContador.mock.calls[0][0];
        const contadorActualizado = updater(2);

        // Esperamos que el jugador con id 1 haya sido eliminado
        expect(jugadoresActualizados).toEqual([
            new Jugador(2, 'Cande', false),
        ]);

        // Esperamos que el contador de jugadores haya sido actualizado
        expect(contadorActualizado).toEqual(1);
    });

    it('No se deberían actualizar los datos si recibe un mensaje de otro tipo', () => {

        // Llamamos a la función que escucha los mensajes
        ObtenerMensajes(setJugadores, setContador, setPartidaIniciada, CantidadJugadores ,setCancelada, socket);

        // Simulamos un mensaje de otro tipo
        const message = JSON.stringify({ type: 'OtroTipo' });

        // Llamamos al evento onmessage
        act(() => {
            socket.onmessage({ data: message });
        });

        // Verificamos que no se haya llamado setJugadores
        expect(setJugadores).not.toHaveBeenCalled();
        expect(setContador).not.toHaveBeenCalled();
        expect(setPartidaIniciada).not.toHaveBeenCalled();
        expect(setCancelada).not.toHaveBeenCalled();
    });

});