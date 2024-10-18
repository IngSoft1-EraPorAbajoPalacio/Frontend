import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import AbandonarPartida from '../../components/hooks/AbandonarPartida';
import { act } from 'react';

describe('HandleAbandono', () => {
    it('Deberia llamar al metodo DELETE correctamente', async () => {
       
        const axiosDeleteSpy = vi.spyOn(axios, 'delete').mockResolvedValueOnce({
            status: 202,
        });

        const idPartida = 1;
        const idJugador = 2;

        
        await act(async () => {
            await AbandonarPartida(idPartida, idJugador);
        });        

        // Check that axios.delete was called with the correct URL and headers
        expect(axiosDeleteSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}`);

        axiosDeleteSpy.mockRestore();
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        const idPartida = 1;
        const idJugador = 2;

        const axiosDeleteSpy = vi.spyOn(axios, 'delete').mockRejectedValueOnce(new Error('Network Error'));

        const consoleErrorSpy = vi.spyOn(console, 'error');

        await AbandonarPartida(idPartida, idJugador);

        expect(axiosDeleteSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}`);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error)); 

        axiosDeleteSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });
});
