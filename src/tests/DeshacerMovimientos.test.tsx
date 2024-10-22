import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import DeshacerMovimientos from '../components/hooks/Game/DeshacerMovimientos';
import { CartaMovimiento } from '../types/partidaEnCurso';

describe('DeshacerMovimientos', () => {
    it('Deberia llamar al metodo PATCH y reasignar las cartas de movimiento correctamente', async () => {

        const setManoMovimiento = vi.fn();

        const initialCartas = [
            new CartaMovimiento(1, 1),
            new CartaMovimiento(2, 2),
        ];

        // Simular el estado inicial de las cartas
        let manoMovimiento = initialCartas;

        // Mock de setManoMovimiento para actualizar el estado simulado
        setManoMovimiento.mockImplementation((updateFn) => {
            manoMovimiento = updateFn(manoMovimiento);
        });

        const data = {
            cartas: [
                new CartaMovimiento(3, 3),
            ]
        };
       
        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({ status: 202, data: data });

        const idPartida = 1;
        const idJugador = 2;

        await DeshacerMovimientos(idPartida, idJugador, setManoMovimiento);

        // Check that axios.patch was called with the correct URL and headers
        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimientos`);
        
        // Check that setManoMovimiento was called with the correct values
        expect(setManoMovimiento).toHaveBeenCalledTimes(1);
        expect(manoMovimiento).toEqual([
            new CartaMovimiento(1, 1),
            new CartaMovimiento(2, 2),
            new CartaMovimiento(3, 3),
        ]);

        axiosPatchSpy.mockRestore();
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        const idPartida = 1;
        const idJugador = 2;

        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockRejectedValueOnce(new Error('Mensaje de error simulado.'));
        const consoleErrorSpy = vi.spyOn(console, 'error');

        const setManoMovimiento = vi.fn();

        setManoMovimiento([
            new CartaMovimiento(1, 1),
            new CartaMovimiento(2, 2),
        ]);

        await DeshacerMovimientos(idPartida, idJugador, setManoMovimiento);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimientos`);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error)); 

        axiosPatchSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    it('Deberia no modificar las cartas de movimiento si la respuesta no contiene cartas', async () => {
        const setManoMovimiento = vi.fn();

        const initialCartas = [
            new CartaMovimiento(1, 1),
            new CartaMovimiento(2, 2),
        ];

        setManoMovimiento(initialCartas);

        const data = {
            cartas: []
        };

        const axiosPatchSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({ status: 202, data });

        const idPartida = 1;
        const idJugador = 2;

        await DeshacerMovimientos(idPartida, idJugador, setManoMovimiento);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimientos`);
        expect(setManoMovimiento).toHaveBeenCalledWith(initialCartas);

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

        await DeshacerMovimientos(idPartida, idJugador, setManoMovimiento);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimientos`);

        axiosPatchSpy.mockRestore();
    });
});