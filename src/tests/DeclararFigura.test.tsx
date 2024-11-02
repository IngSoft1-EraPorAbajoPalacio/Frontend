import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import DeclararFigura from '../components/hooks/Game/DeclararFigura';

describe('DeclararFigura', () => {

    let setMovimientosJugados: any;

    const idPartida = 1;
    const idJugador = 2;
    const figuraGuardadaParaJuan = 1;
    const cartaFiguraDescarte = "1";

    const data = {
        idCarta: Number(cartaFiguraDescarte),
        tipo_figura: figuraGuardadaParaJuan
    };

    beforeEach(() => {
        setMovimientosJugados = vi.fn();
    });

    it('Deberia llamar al metodo POST correctamente', async () => {
       
        const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({ status: 202 });

        await DeclararFigura(idPartida, idJugador, figuraGuardadaParaJuan, cartaFiguraDescarte, setMovimientosJugados);

        // Check that axios.post was called with the correct URL and headers
        expect(axiosPostSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`, data);
        expect(setMovimientosJugados).toHaveBeenCalledWith(0);

        axiosPostSpy.mockRestore();
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {

        const data = {
            idCarta: Number(cartaFiguraDescarte),
            tipo_figura: figuraGuardadaParaJuan
        };

        const axiosPostSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Mensaje de error simulado.'));
        const consoleErrorSpy = vi.spyOn(console, 'error');

        await DeclararFigura(idPartida, idJugador, figuraGuardadaParaJuan, cartaFiguraDescarte, setMovimientosJugados);

        expect(axiosPostSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`, data);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error)); 
        expect(setMovimientosJugados).not.toHaveBeenCalled();

        axiosPostSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    it('Deberia lanzar un error si la respuesta no es 202', async () => {
        const data = {
            idCarta: Number(cartaFiguraDescarte),
            tipo_figura: figuraGuardadaParaJuan
        };

        const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({ status: 400 });
        const consoleErrorSpy = vi.spyOn(console, 'error');

        await DeclararFigura(idPartida, idJugador, figuraGuardadaParaJuan, cartaFiguraDescarte, setMovimientosJugados);

        expect(axiosPostSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`, data);
        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("Hubo un problema tratando de jugando figura."));
        expect(setMovimientosJugados).not.toHaveBeenCalled();

        axiosPostSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });
});