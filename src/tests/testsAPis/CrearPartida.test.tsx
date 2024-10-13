import CrearPartida from '../../components/hooks/Home/CrearPartida';
import { describe, it, expect, vi } from 'vitest';
import { act } from 'react';

describe('CrearPartida', () => {
    it('Deberia llamar correctamente al metodo POST', async () => {
        // Mock response
        const mockResponse = {
            id_partida: 1, // Use any value for testing
            id_jugador: 1,  // Use any value for testing
        };

        // Mock fetch
        const mockFetch = vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue(mockResponse), // Use the mock response directly
        });
        global.fetch = mockFetch;

        // Mock arguments
        const mockSetForm = vi.fn();
        const mockSetIdJugador = vi.fn();
        const mockSetIdPartida = vi.fn();
        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>;

        const formInputs = {
            idPlayer: '',
            idRoom: '',
            playerName: 'Pepe',
            room: 'mockPart',
            minPlayers: 2,
            maxPlayers: 4,
        };

        // Call CrearPartida
        await act(async () => {
            await CrearPartida(mockEvent, mockSetForm, formInputs, mockSetIdJugador, mockSetIdPartida);
        });

        // Destructure the mock response to use in assertions
        const { id_partida, id_jugador } = mockResponse;
       // await new Promise(setImmediate);
        

        // Check that fetch was called with the correct URL and options
        expect(mockFetch).toHaveBeenCalledWith('http://127.0.0.1:8000/partida', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre_host: formInputs.playerName,
                nombre_partida: formInputs.room,
                cant_min_jugadores: formInputs.minPlayers,
                cant_max_jugadores: formInputs.maxPlayers,
            }),
        });
        

        console.log('mockSetForm calls:', mockSetForm.mock.calls);
        
        expect(mockSetForm).toHaveBeenCalledWith({
            ...formInputs,
            idRoom: id_partida, // This should match the mock response
            idPlayer: id_jugador, // This should match the mock response
        });
    });

    it('No deberia llamar a ninguna funcion que setee estados si la cantidad de jugadores no es valida', async () => {
    // Mock response
    const mockResponse = {
        id_partida: 1,
        id_jugador: 1,
    };

    // Mock fetch
    const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockResponse),
    });
    global.fetch = mockFetch;

    const mockSetForm = vi.fn();
    const mockSetIdJugador = vi.fn();
    const mockSetIdPartida = vi.fn();
    const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>;

    // Invalid player counts
    const formInputs = {
        idPlayer: '',
        idRoom: '',
        playerName: 'Pepe',
        room: 'mockPart',
        minPlayers: 1, // Invalid
        maxPlayers: 4,
    };

    // Call CrearPartida
    await CrearPartida(mockEvent, mockSetForm, formInputs, mockSetIdJugador, mockSetIdPartida);

    // Ensure setForm, setIdJugador, and setIdPartida were not called
    expect(mockSetForm).not.toHaveBeenCalled();
    expect(mockSetIdJugador).not.toHaveBeenCalled();
    expect(mockSetIdPartida).not.toHaveBeenCalled();
});

});



