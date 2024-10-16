import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import iniciarPartida from '../../components/hooks/Lobby/IniciarPartida';// Adjust the import path

describe('iniciarPartida', () => {
    it('Deberia llamar al metodo POST correctamente', async () => {
        const idPartida = 1; 
        const idJugador = 2; 

        
        const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
            status: 200, // Simulating a successful response
        });

        await iniciarPartida(idPartida, idJugador);

        expect(axiosPostSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`);

        axiosPostSpy.mockRestore();
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        const idPartida = 1;
        const idJugador = 2;


        const axiosPostSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Network Error'));

        const consoleErrorSpy = vi.spyOn(console, 'error');

        await iniciarPartida(idPartida, idJugador);

        expect(axiosPostSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

        axiosPostSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });
});
