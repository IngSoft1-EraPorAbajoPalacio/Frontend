import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import PasarTurno from '../../components/hooks/Game/PasarTurno';// Adjust the import path

describe('PasarTurno', () => {
    it('Deberia llamar correctamente el metodo PATCH', async () => {
        const idPartida = 1; 
        const idJugador = 2; 

        
        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({
            status: 202, // Simulating a successful response
        });

        await PasarTurno(idPartida, idJugador);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`);

        axiosPatchSpy.mockRestore();
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        const errorSpy = vi.spyOn(console, 'error');
        const idPartida = 1;
        const idJugador = 2; 

        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockRejectedValueOnce(new Error('Network error'));

        await PasarTurno(idPartida, idJugador);

        expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("Error pasando de turno"), expect.any(Error));

        axiosPatchSpy.mockRestore();
        errorSpy.mockRestore();
    });
});
