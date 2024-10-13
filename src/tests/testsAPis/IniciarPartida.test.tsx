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

        // Check that axios.post was called with the correct URL
        expect(axiosPostSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${idJugador}`);

        axiosPostSpy.mockRestore();
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        const errorSpy = vi.spyOn(console, 'error');
        const idPartida = 1; 
        const idJugador = 2; 

        const axiosPostSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Network error'));

        await iniciarPartida(idPartida, idJugador);

        expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("Error iniciando el juego"), expect.any(Error));

        axiosPostSpy.mockRestore();
        errorSpy.mockRestore();
    });
});
