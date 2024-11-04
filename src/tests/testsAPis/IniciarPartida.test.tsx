import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import iniciarPartida from '../../components/hooks/Lobby/IniciarPartida';// Adjust the import path

describe('iniciarPartida', () => {
    const idPartida = 1; 
    const idJugador = 2; 

    it('Deberia llamar al metodo POST correctamente', async () => {        
        const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({ status: 200 });

        await iniciarPartida(idPartida, idJugador);

        expect(axiosPostSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`);

        axiosPostSpy.mockRestore();
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        const axiosPostSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Network Error'));
        const consoleErrorSpy = vi.spyOn(console, 'error');

        await iniciarPartida(idPartida, idJugador);

        expect(axiosPostSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

        axiosPostSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    it('Deberia lanzar un error si la respuesta no es 202', async () => {
        const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({ status: 400 });

        await iniciarPartida(idPartida, idJugador);

        expect(axiosPostSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`);

        axiosPostSpy.mockRestore();
    });
});
