import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import PasarTurno from '../../components/hooks/Game/PasarTurno';// Adjust the import path

describe('PasarTurno', () => {

    const idPartida = 1; 
    const idJugador = 2; 

    it('Deberia llamar correctamente el metodo PATCH', async () => {
        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({
            status: 202, // Simulating a successful response
        });

        await PasarTurno(idPartida, idJugador);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`);

        axiosPatchSpy.mockRestore();
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockRejectedValueOnce(new Error('Network Error'));
        const consoleErrorSpy = vi.spyOn(console, 'error');

        await PasarTurno(idPartida, idJugador);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error)); 

        axiosPatchSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    it('Deberia lanzar un error si la respuesta no es 202', async () => {
        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({ status: 400 });

        await PasarTurno(idPartida, idJugador);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`);

        axiosPatchSpy.mockRestore();
    });
});
