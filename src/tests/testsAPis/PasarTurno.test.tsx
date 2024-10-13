import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import PasarTurno from '../../components/hooks/Game/PasarTurno';// Adjust the import path

describe('PasarTurno', () => {
    it('Deberia llamar correctamente el metodo PATCH', async () => {
        const idPartida = 1; // Example partida ID
        const idJugador = 2; // Example jugador ID

        // Spy on axios.patch to mock its implementation
        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({
            status: 202, // Simulating a successful response
        });

        // Call PasarTurno
        await PasarTurno(idPartida, idJugador);

        // Check that axios.patch was called with the correct URL
        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`);

        // Restore the original axios.patch
        axiosPatchSpy.mockRestore();
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        const errorSpy = vi.spyOn(console, 'error');
        const idPartida = 1; // Example partida ID
        const idJugador = 2; // Example jugador ID

        // Spy on axios.patch to mock its implementation
        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockRejectedValueOnce(new Error('Network error'));

        // Call PasarTurno
        await PasarTurno(idPartida, idJugador);

        // Check that the error was logged
        expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("Error pasando de turno"), expect.any(Error));

        // Restore the original implementations
        axiosPatchSpy.mockRestore();
        errorSpy.mockRestore();
    });
});
