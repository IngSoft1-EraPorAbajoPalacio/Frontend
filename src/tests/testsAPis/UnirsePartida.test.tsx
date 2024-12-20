import { describe, it, expect, vi } from 'vitest';
import UnirsePartida from '../../components/hooks/Home/UnirsePartida';
import { act } from 'react';
import { beforeEach } from 'vitest';
import { guardarJugador, guardarJugadoresUnidos } from '../../components/context/GameContext';
import showToast from '../../components/views/Public/Toast';

// Mock arguments
let mockSetIdJugador: any;
let mockEvent: any;
const alias = 'Pepe';
const IdPartida = 1; 
const password = '1234';

describe('UnirsePartida', () => {

    beforeEach(() => {
        mockSetIdJugador = vi.fn();
        mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>;
    });

    afterEach(() => {
        vi.resetAllMocks();
        vi.clearAllMocks();
    });

    vi.mock(import("../../components/context/GameContext"), async (importOriginal) => {
        const actual = await importOriginal()
        return {
          ...actual,
          guardarJugador: vi.fn(),
          guardarJugadoresUnidos: vi.fn(),
        }
    });

    vi.mock('../../components/views/Public/Toast', () => ({
        default: vi.fn(),
    }));

    it('Deberia mandar correctamente al metodo POST', async () => {
        // Mock response
        const mockResponse = { idJugador: 1, unidos: [{id: 2, nombre: 'pepito'},{id: 1, nombre: 'pepe'}] };

        // Mock fetch
        const mockFetch = vi.fn().mockResolvedValue({
            status: 201,
            json: vi.fn().mockResolvedValue(mockResponse),
        });
        global.fetch = mockFetch;

        await act(async () => {
            UnirsePartida(mockEvent, alias, password, mockSetIdJugador, IdPartida);
        });
        
        // Check that fetch was called with the correct URL and options
        expect(mockFetch).toHaveBeenCalledWith('http://127.0.0.1:8000/partida/1/jugador', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombreJugador: alias, contrasena: password }),
        });

        // check the call to other functions were made with the correct parameters
        expect(guardarJugador).toHaveBeenCalledWith({ id: 1, nombre: 'Pepe', isHost: false });

        expect(guardarJugadoresUnidos).toHaveBeenCalledWith(mockResponse.unidos);

        expect(mockSetIdJugador).toHaveBeenCalledWith(mockResponse.idJugador);
       
    });

    it('Deberia mostrar un toast si la partida esta llena', async () => {
        // Mock fetch
        const mockFetch = vi.fn().mockResolvedValue({
            status: 404,
        });
        global.fetch = mockFetch;

        await act(async () => {
            UnirsePartida(mockEvent, alias, password, mockSetIdJugador, IdPartida);
        });

        expect(showToast).toHaveBeenCalledWith({ type: 'error', message: "Arctic Monkeys 404 => Partida Llena" });
    });

    it('Deberia mostrar un toast si se pasa una contraseña', async () => {
        // Mock fetch
        const mockFetch = vi.fn().mockResolvedValue({
            status: 401,
        });
        global.fetch = mockFetch;

        await act(async () => {
            UnirsePartida(mockEvent, alias, password, mockSetIdJugador, IdPartida);
        });

        expect(showToast).toHaveBeenCalledWith({ type: 'error', message: "Contraseña incorrecta" });
    });

    it('Si no se pasa una partida, deberia lanzar un error', async () => {
        // Mock fetch
        const mockFetch = vi.fn().mockResolvedValue({
            status: 201,
            json: vi.fn().mockResolvedValue({ idJugador: 1, unidos: [{id: 2, nombre: 'pepito'},{id: 1, nombre: 'pepe'}] }),
        });
        global.fetch = mockFetch;

        const consoleErrorSpy = vi.spyOn(console, 'error');

        await act(async () => {
            UnirsePartida(mockEvent, alias, password, mockSetIdJugador, null);
        });

        // Check that fetch was not called and an error was thrown
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
        expect(mockFetch).not.toHaveBeenCalled();
    });

    it('En caso de error distinto a 404 y 401, deberia mostrarlo en consola', async () => {
        // Mock fetch
        const mockFetch = vi.fn().mockResolvedValue({
            status: 402,
        });
        global.fetch = mockFetch;

        const consoleErrorSpy = vi.spyOn(console, 'error');

        await act(async () => {
            UnirsePartida(mockEvent, alias, password, mockSetIdJugador, IdPartida);
        });

        // Check that fetch was called with the correct URL and options
        expect(mockFetch).toHaveBeenCalledWith('http://127.0.0.1:8000/partida/1/jugador', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombreJugador: alias, contrasena: password }),
        });
        
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

        consoleErrorSpy.mockRestore();
    });
});
