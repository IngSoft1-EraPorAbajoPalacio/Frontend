import { describe, it, expect, vi } from 'vitest';
import UnirsePartida from '../../components/hooks/Home/UnirsePartida';
import { act } from 'react';
import { beforeEach } from 'vitest';


describe('UnirsePartida', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        vi.clearAllMocks();
    });

    it('Deberia mandar correctamente al metodo POST', async () => {
        // Mock response
        const mockResponse = { idJugador: 1 };

        // Mock fetch
        const mockFetch = vi.fn().mockResolvedValue({
            status: 201,
            json: vi.fn().mockResolvedValue(mockResponse),
        });
        global.fetch = mockFetch;

        // Mock arguments
        const mockSetIdJugador = vi.fn();
        const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent<HTMLFormElement>;
        const alias = 'Pepe';
        const IdPartida = 1; // Example ID

        // Call UnirsePartida
        await act(async () => {
            await UnirsePartida(mockEvent, alias, mockSetIdJugador, IdPartida);
        });
        
        // Check that fetch was called with the correct URL and options
        expect(mockFetch).toHaveBeenCalledWith('http://127.0.0.1:8000/partida/1/jugador', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombreJugador: alias }),
        });
       
    });
});
