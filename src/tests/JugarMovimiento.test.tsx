import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import JugarMovimiento from '../components/hooks/Game/JugarMovimiento';
import { act } from 'react';

describe('JugarMovimiento', () => {
    it('Deberia llamar al metodo PATCH correctamente', async () => {
       
        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({ status: 202 });
        const data = {
            idCarta: 1,
            posiciones: [
                {x: 1, y: 1},
                {x: 2, y: 2}
            ]
        };

        const idPartida = 1;
        const idJugador = 2;
        const movimiento = { carta: { id: 1 }, primerFicha: { x: 1, y: 1 }, segundaFicha: { x: 2, y: 2 } };

        await JugarMovimiento(idPartida, idJugador, movimiento);

        // Check that axios.patch was called with the correct URL and headers
        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/jugar-movimiento`, data);

        axiosPatchSpy.mockRestore();
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        const idPartida = 1;
        const idJugador = 2;
        const movimiento = { carta: { id: 1 }, primerFicha: { x: 1, y: 1 }, segundaFicha: { x: 2, y: 2 } };
        const data = {
            idCarta: 1,
            posiciones: [
                {x: 1, y: 1},
                {x: 2, y: 2}
            ]
        };

        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockRejectedValueOnce(new Error('Mensaje de error simulado.'));
        const consoleErrorSpy = vi.spyOn(console, 'error');


        await JugarMovimiento(idPartida, idJugador, movimiento);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/jugar-movimiento`, data);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error)); 

        axiosPatchSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });
});