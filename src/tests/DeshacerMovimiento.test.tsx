import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import DeshacerMovimiento from '../components/hooks/Game/DeshacerMovimiento';

describe('DeshacerMovimiento', () => {
    it('Deberia llamar al metodo PATCH correctamente', async () => {
       
        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({ status: 202 });

        const idPartida = 1;
        const idJugador = 2;

        await DeshacerMovimiento(idPartida, idJugador);

        // Check that axios.patch was called with the correct URL and headers
        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimiento`);

        axiosPatchSpy.mockRestore();
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        const idPartida = 1;
        const idJugador = 2;

        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockRejectedValueOnce(new Error('Mensaje de error simulado.'));
        const consoleErrorSpy = vi.spyOn(console, 'error');


        await DeshacerMovimiento(idPartida, idJugador);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimiento`);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error)); 

        axiosPatchSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });
});