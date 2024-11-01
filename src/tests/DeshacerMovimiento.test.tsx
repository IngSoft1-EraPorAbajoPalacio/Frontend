import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import DeshacerMovimiento from '../components/hooks/Game/DeshacerMovimiento';
import { CartaMovimiento } from '../types/partidaEnCurso';

describe('DeshacerMovimiento', () => {

    const idPartida = 1;
    const idJugador = 2;

    it('Deberia llamar al metodo PATCH y reasignar la carta correctamente', async () => {
       
        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({ status: 202 });


        await DeshacerMovimiento(idPartida, idJugador);

        // Check that axios.patch was called with the correct URL and headers
        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimiento`);

        axiosPatchSpy.mockRestore();
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockRejectedValueOnce(new Error('Mensaje de error simulado.'));
        const consoleErrorSpy = vi.spyOn(console, 'error');


        await DeshacerMovimiento(idPartida, idJugador);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimiento`);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error)); 

        axiosPatchSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    it('Deberia devolver null si el mensaje no contiene cartas', async () => {

        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({ status: 202, data: { carta: [] } });
        const result = await DeshacerMovimiento(idPartida, idJugador);

        expect(result).toEqual(null);

        axiosPatchSpy.mockRestore();

    });

    it('Deberia lanzar un error si la respuesta no es 202', async () => {
        const setManoMovimiento = vi.fn();

        const initialCartas = [
            new CartaMovimiento(1, 1),
            new CartaMovimiento(2, 2),
        ];

        setManoMovimiento(initialCartas);

        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({ status: 400 });

        const idPartida = 1;
        const idJugador = 2;

        await DeshacerMovimiento(idPartida, idJugador);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimiento`);

        axiosPatchSpy.mockRestore();
    });

    it('Deberia devolver la carta correcta en caso de exito', async () => {
        const mockCarta = new CartaMovimiento(1, 1);
        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({ status: 202, data: { carta: [mockCarta] } });
        const result = await DeshacerMovimiento(idPartida, idJugador);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimiento`);
        expect(result).toEqual(mockCarta);

        axiosPatchSpy.mockRestore();
    });
});