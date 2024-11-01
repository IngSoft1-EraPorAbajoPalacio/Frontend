import { act } from 'react';
import { describe, vi, it, expect } from 'vitest';
import ObtenerMensajes from '../components/hooks/Lobby/ObtenerMensajes';
import createSocketLobby from '../services/socketLobby';
import { MockIniciarPartida2Jugadores, MockIniciarPartida3Jugadores, MockIniciarPartida4Jugadores } from '../data/MockMensajeLobby';
import { Jugador } from '../types/partidaListada';
import { guardarMovimientos, guardarJugador1, guardarJugador2, guardarJugador3,  guardarJugador4, guardarFiguraJugador1, guardarFiguraJugador2, guardarFiguraJugador3,  guardarFiguraJugador4, guardarPartidaEnCurso, guardarFichasTablero } from '../components/context/GameContext';

// Mockeamos el módulo de socket
vi.mock('../services/sockets', () => ({
  default: {onmessage: vi.fn()},
}));

vi.mock(import("../components/context/GameContext"), async (importOriginal) => {
    const actual = await importOriginal()
    return {
      ...actual,
        guardarMovimientos: vi.fn(),
        guardarJugador1: vi.fn(),
        guardarJugador2: vi.fn(),
        guardarJugador3: vi.fn(),
        guardarJugador4: vi.fn(),
        guardarFiguraJugador1: vi.fn(),
        guardarFiguraJugador2: vi.fn(),
        guardarFiguraJugador3: vi.fn(),
        guardarFiguraJugador4: vi.fn(),
        guardarPartidaEnCurso: vi.fn(),
        guardarFichasTablero: vi.fn(),
    }
});


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

    it('Debería actualizar los datos de la partida cuando recibe un mensaje de tipo IniciarPartida para 2 jugadores', () => {

        // Llamamos a la función que escucha los mensajes
        ObtenerMensajes(setJugadores, setContador, setPartidaIniciada, idJugador, idPartida, setCancelada, socket);

        // Simulamos un mensaje de tipo IniciarPartida
        const message = JSON.stringify(MockIniciarPartida2Jugadores);

        // Simulamos recibir el mensaje desde el servidor
        act(() => {
            socket.onmessage({ data: message });
        });

        // Verificamos si la partida fue seteada como iniciada
        expect(setPartidaIniciada).toHaveBeenCalledWith(true);

        // Verificamos si se llamaron correctamente todas las funciones de guardar los datos de la partida en el contexto
        expect(guardarMovimientos).toHaveBeenCalledWith(MockIniciarPartida2Jugadores.cartasMovimiento[0].cartas);
        expect(guardarJugador1).toHaveBeenCalledWith({id: 1, nombre: '1', enPartida: true, esGuardador: true});
        expect(guardarJugador2).toHaveBeenCalledWith({id: 2, nombre: '2', enPartida: true, esGuardador: false});
        expect(guardarJugador3).not.toHaveBeenCalledWith();
        expect(guardarJugador4).not.toHaveBeenCalledWith();
        expect(guardarFiguraJugador1).toHaveBeenCalledWith(MockIniciarPartida2Jugadores.cartasFigura[0].cartas);
        expect(guardarFiguraJugador2).toHaveBeenCalledWith(MockIniciarPartida2Jugadores.cartasFigura[1].cartas);
        expect(guardarFiguraJugador3).not.toHaveBeenCalledWith();
        expect(guardarFiguraJugador4).not.toHaveBeenCalledWith();
        expect(guardarPartidaEnCurso).toHaveBeenCalled();
        expect(guardarFichasTablero).toHaveBeenCalledWith(MockIniciarPartida2Jugadores.fichas);

    });

    it('Debería actualizar los datos de la partida cuando recibe un mensaje de tipo IniciarPartida para 3 jugadores', () => {

        // Llamamos a la función que escucha los mensajes
        ObtenerMensajes(setJugadores, setContador, setPartidaIniciada, idJugador, idPartida, setCancelada, socket);

        // Simulamos un mensaje de tipo IniciarPartida
        const message = JSON.stringify(MockIniciarPartida3Jugadores);

        // Simulamos recibir el mensaje desde el servidor
        act(() => {
            socket.onmessage({ data: message });
        });

        // Verificamos si la partida fue seteada como iniciada
        expect(setPartidaIniciada).toHaveBeenCalledWith(true);

        // Verificamos si se llamaron correctamente todas las funciones de guardar los datos de la partida en el contexto
        expect(guardarMovimientos).toHaveBeenCalledWith(MockIniciarPartida3Jugadores.cartasMovimiento[0].cartas);
        expect(guardarJugador1).toHaveBeenCalledWith({id: 1, nombre: '1', enPartida: true, esGuardador: true});
        expect(guardarJugador2).toHaveBeenCalledWith({id: 2, nombre: '2', enPartida: true, esGuardador: false});
        expect(guardarJugador3).toHaveBeenCalledWith({id: 3, nombre: '3', enPartida: true, esGuardador: false});
        expect(guardarJugador4).not.toHaveBeenCalledWith();
        expect(guardarFiguraJugador1).toHaveBeenCalledWith(MockIniciarPartida3Jugadores.cartasFigura[0].cartas);
        expect(guardarFiguraJugador2).toHaveBeenCalledWith(MockIniciarPartida3Jugadores.cartasFigura[1].cartas);
        expect(guardarFiguraJugador3).toHaveBeenCalledWith(MockIniciarPartida3Jugadores.cartasFigura[2].cartas);
        expect(guardarFiguraJugador4).not.toHaveBeenCalledWith();
        expect(guardarPartidaEnCurso).toHaveBeenCalled();
        expect(guardarFichasTablero).toHaveBeenCalledWith(MockIniciarPartida3Jugadores.fichas);

    });

    it('Debería actualizar los datos de la partida cuando recibe un mensaje de tipo IniciarPartida para 4 jugadores', () => {

        // Llamamos a la función que escucha los mensajes
        ObtenerMensajes(setJugadores, setContador, setPartidaIniciada, idJugador, idPartida, setCancelada, socket);

        // Simulamos un mensaje de tipo IniciarPartida
        const message = JSON.stringify(MockIniciarPartida4Jugadores);

        // Simulamos recibir el mensaje desde el servidor
        act(() => {
            socket.onmessage({ data: message });
        });

        // Verificamos si la partida fue seteada como iniciada
        expect(setPartidaIniciada).toHaveBeenCalledWith(true);

        // Verificamos si se llamaron correctamente todas las funciones de guardar los datos de la partida en el contexto
        expect(guardarMovimientos).toHaveBeenCalledWith(MockIniciarPartida4Jugadores.cartasMovimiento[0].cartas);
        expect(guardarJugador1).toHaveBeenCalledWith({id: 1, nombre: '1', enPartida: true, esGuardador: true});
        expect(guardarJugador2).toHaveBeenCalledWith({id: 2, nombre: '2', enPartida: true, esGuardador: false});
        expect(guardarJugador3).toHaveBeenCalledWith({id: 3, nombre: '3', enPartida: true, esGuardador: false});
        expect(guardarJugador4).toHaveBeenCalledWith({id: 4, nombre: '4', enPartida: true, esGuardador: false});
        expect(guardarFiguraJugador1).toHaveBeenCalledWith(MockIniciarPartida4Jugadores.cartasFigura[0].cartas);
        expect(guardarFiguraJugador2).toHaveBeenCalledWith(MockIniciarPartida4Jugadores.cartasFigura[1].cartas);
        expect(guardarFiguraJugador3).toHaveBeenCalledWith(MockIniciarPartida4Jugadores.cartasFigura[2].cartas);
        expect(guardarFiguraJugador4).toHaveBeenCalledWith(MockIniciarPartida4Jugadores.cartasFigura[3].cartas);
        expect(guardarPartidaEnCurso).toHaveBeenCalled();
        expect(guardarFichasTablero).toHaveBeenCalledWith(MockIniciarPartida4Jugadores.fichas);

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

    it('Debería manejar IniciarPartida sin cartas de movimiento', () => {
        const mockSetJugadores = vi.fn();
        const mockSetContador = vi.fn();
        const mockSetPartidaIniciada = vi.fn();
        const mockSetCancelada = vi.fn();
    
        const mensajeIniciarPartidaSinMovimientos = {
            type: 'IniciarPartida',
            cartasMovimiento: [],
            cartasFigura: [
                { idJugador: 1, nombreJugador: 'Jugador1', cartas: [] },
                { idJugador: 2, nombreJugador: 'Jugador2', cartas: [] },
            ],
            orden: [1, 2],
            fichas: [],
        };
    
        ObtenerMensajes(mockSetJugadores, mockSetContador, mockSetPartidaIniciada, 1, 1, mockSetCancelada, socket);
    
        act(() => {
            socket.onmessage({ data: JSON.stringify(mensajeIniciarPartidaSinMovimientos) });
        });
    
        expect(guardarMovimientos).toHaveBeenCalledWith([]);
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
        ObtenerMensajes(mockSetJugadores, mockSetContador, setPartidaIniciada, idJugador, idPartida, setCancelada, socket);

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
        updater = mockSetContador.mock.calls[0][0]; // Cambiado de [2][0] a [0][0]
        const contadorActualizado = updater(2);

        // Esperamos que el jugador con id 1 haya sido eliminado
        expect(jugadoresActualizados).toEqual([
            new Jugador(2, 'Cande', false),
        ]);

        // Esperamos que el contador de jugadores haya sido actualizado
        expect(contadorActualizado).toEqual(1);
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