import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import DeshacerMovimientos from '../components/hooks/Game/DeshacerMovimientos';
import { CartaMovimiento } from '../types/partidaEnCurso';

describe('DeshacerMovimientos', () => {
    const idPartida = 1;
    const idJugador = 2;
    
    let setManoMovimiento: any;
    let axiosPatchSpy: any;
    let consoleErrorSpy: any;

    beforeEach(() => {
        setManoMovimiento = vi.fn();
    });

    afterEach(() => {
        setManoMovimiento.mockRestore();
        axiosPatchSpy.mockRestore();
    });

    it('Deberia llamar al metodo PATCH y reasignar las cartas de movimiento correctamente', async () => {

        const initialCartas = [
            new CartaMovimiento(1, 1),
            new CartaMovimiento(2, 2),
        ];

        // Simular el estado inicial de las cartas
        let manoMovimiento = initialCartas;

        // Mock de setManoMovimiento para actualizar el estado simulado
        setManoMovimiento.mockImplementation((updateFn: any) => {
            manoMovimiento = updateFn(manoMovimiento);
        });

        const data = { cartas: [ new CartaMovimiento(3, 3) ] };
       
        axiosPatchSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({ status: 202, data: data });

        await DeshacerMovimientos(idPartida, idJugador, setManoMovimiento);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimientos`);
        expect(setManoMovimiento).toHaveBeenCalledTimes(1);
        expect(manoMovimiento).toEqual([
            new CartaMovimiento(1, 1),
            new CartaMovimiento(2, 2),
            new CartaMovimiento(3, 3),
        ]);
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        axiosPatchSpy = vi.spyOn(axios, 'patch').mockRejectedValueOnce(new Error('Mensaje de error simulado.'));
        consoleErrorSpy = vi.spyOn(console, 'error');

        await DeshacerMovimientos(idPartida, idJugador, setManoMovimiento);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimientos`);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error)); 
        expect(setManoMovimiento).not.toHaveBeenCalled();
    });

    it('Deberia no modificar las cartas de movimiento si la respuesta no contiene cartas', async () => {
        const data = { cartas: [] };

        axiosPatchSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({ status: 202, data });

        await DeshacerMovimientos(idPartida, idJugador, setManoMovimiento);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimientos`);
        expect(setManoMovimiento).not.toHaveBeenCalled();
    });

    it('Deberia lanzar un error si la respuesta no es 202', async () => {
        axiosPatchSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({ status: 400 });

        await DeshacerMovimientos(idPartida, idJugador, setManoMovimiento);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimientos`);
        expect(setManoMovimiento).not.toHaveBeenCalled();
    });

    it('Debería reponer la mano de movimientos si setManoMovimiento es null y recibe cartas', async () => {

        // Simular el estado inicial de las cartas
        let manoMovimiento: CartaMovimiento[] | null = null;

        // Mock de setManoMovimiento para actualizar el estado simulado
        setManoMovimiento.mockImplementation((updateFn: any) => {
            manoMovimiento = updateFn(manoMovimiento);
        });

        // Mock de la respuesta de la API
        const data = {cartas: [
            new CartaMovimiento(1, 1),
            new CartaMovimiento(2, 2),
            new CartaMovimiento(3, 3),
        ]};

        // Mock de la llamada a la API
        axiosPatchSpy = vi.spyOn(axios, 'patch').mockResolvedValueOnce({ status: 202, data });

        await DeshacerMovimientos(idPartida, idJugador, setManoMovimiento);

        expect(axiosPatchSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}/tablero/deshacer-movimientos`);
        expect(setManoMovimiento).toHaveBeenCalledTimes(1);
        expect(manoMovimiento).toEqual([
            new CartaMovimiento(1, 1),
            new CartaMovimiento(2, 2),
            new CartaMovimiento(3, 3),
        ]);
    });
});