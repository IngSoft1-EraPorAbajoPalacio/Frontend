import CrearPartida from '../../components/hooks/Home/CrearPartida';
import { describe, it, expect, vi } from 'vitest';
import { act } from 'react';

describe('CrearPartida', () => {

    // Mock response
    const mockResponse = {
        id_partida: 1, 
        id_jugador: 1,  
    };

    // Constatnts
    const id_partida = 1;
    const id_jugador = 1;

    // Mock arguments
    let mockSetForm: any;
    let mockSetIdJugador: any;
    let mockSetIdPartida: any;
    let mockEvent: any;

    beforeEach(() => {
        mockSetForm = vi.fn();
        mockSetIdJugador = vi.fn();
        mockSetIdPartida = vi.fn();
        mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>;
    });

    it('Deberia llamar correctamente al metodo POST', async () => {
        // Mock fetch
        const mockFetchSpy = vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue(mockResponse), // Use the mock response directly
        });
        global.fetch = mockFetchSpy;

        const formInputs = {
            idPlayer: '',
            idRoom: '',
            playerName: 'Pepe',
            room: 'mockPart',
            minPlayers: 2,
            maxPlayers: 4,
        };

        await act(async () => {
            CrearPartida(mockEvent, mockSetForm, formInputs, mockSetIdJugador, mockSetIdPartida);
        });

        // Check that fetch was called with the correct URL and options
        expect(mockFetchSpy).toHaveBeenCalledWith('http://127.0.0.1:8000/partida', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre_host: formInputs.playerName,
                nombre_partida: formInputs.room,
                cant_min_jugadores: formInputs.minPlayers,
                cant_max_jugadores: formInputs.maxPlayers,
            }),
        });
        
        expect(mockSetForm).toHaveBeenCalledWith({
            ...formInputs,
            idRoom: id_partida, 
            idPlayer: id_jugador,
        });

        mockFetchSpy.mockRestore();
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        // Mock fetch
        const mockFetchSpy = vi.fn().mockResolvedValue({
            ok: false,
            json: vi.fn().mockResolvedValue(mockResponse), // Use the mock response directly
        });
        global.fetch = mockFetchSpy;

        const consoleErrorSpy = vi.spyOn(console, 'error');

        const formInputs = {
            idPlayer: '',
            idRoom: '',
            playerName: 'Pepe',
            room: 'mockPart',
            minPlayers: 2,
            maxPlayers: 4,
        };

        await act(async () => {
            CrearPartida(mockEvent, mockSetForm, formInputs, mockSetIdJugador, mockSetIdPartida);
        });

        // Check that fetch was called with the correct URL and options
        expect(mockFetchSpy).toHaveBeenCalledWith('http://127.0.0.1:8000/partida', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre_host: formInputs.playerName,
                nombre_partida: formInputs.room,
                cant_min_jugadores: formInputs.minPlayers,
                cant_max_jugadores: formInputs.maxPlayers,
            }),
        });
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

        mockFetchSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });
});

