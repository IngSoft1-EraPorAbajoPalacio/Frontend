import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import DeclararFigura from '../components/hooks/Game/DeclararFigura';
import { Coord } from '../types/figura';

describe('DeclararFigura', () => {
    it('Deberia llamar al metodo POST correctamente', async () => {
       
        const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({ status: 202 });

        const idPartida = 1;
        const idJugador = 2;
        const fichasParaJuan: Coord[] = [ [1, 1], [2, 2] ];
        const figuraGuardadaParaJuan = 1;
        const cartaFiguraDescarte = "1";

        const data = {
            idCarta: Number(cartaFiguraDescarte),
            fichas: fichasParaJuan,
            tipo_figura: figuraGuardadaParaJuan
        };

        await DeclararFigura(idPartida, idJugador, fichasParaJuan, figuraGuardadaParaJuan, cartaFiguraDescarte);

        // Check that axios.post was called with the correct URL and headers
        expect(axiosPostSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`, data);

        axiosPostSpy.mockRestore();
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        const idPartida = 1;
        const idJugador = 2;
        const fichasParaJuan: Coord[] = [ [1, 1], [2, 2] ];
        const figuraGuardadaParaJuan = 1;
        const cartaFiguraDescarte = "1";

        const data = {
            idCarta: Number(cartaFiguraDescarte),
            fichas: fichasParaJuan,
            tipo_figura: figuraGuardadaParaJuan
        };

        const axiosPostSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Mensaje de error simulado.'));
        const consoleErrorSpy = vi.spyOn(console, 'error');

        await DeclararFigura(idPartida, idJugador, fichasParaJuan, figuraGuardadaParaJuan, cartaFiguraDescarte);

        expect(axiosPostSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`, data);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error)); 

        axiosPostSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });
});