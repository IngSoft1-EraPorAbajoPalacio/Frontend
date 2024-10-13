import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { HandleAbandono } from '../../components/hooks/Abandono/Abandonar';
import { act } from 'react';

describe('HandleAbandono', () => {
    it('Deberia llamar al metodo DELETE correctamente', async () => {
       
        const axiosDeleteSpy = vi.spyOn(axios, 'delete').mockResolvedValueOnce({
            status: 202,
        });

        const idPartida = 1;
        const idJugador = 2;

        
        await act(async () => {
            await HandleAbandono(idPartida, idJugador);
        });        

        // Check that axios.delete was called with the correct URL and headers
        expect(axiosDeleteSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        axiosDeleteSpy.mockRestore();
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        const errorSpy = vi.spyOn(console, 'error');
        const axiosDeleteSpy = vi.spyOn(axios, 'delete').mockRejectedValueOnce(new Error('Network error'));

        const idPartida = 1;
        const idJugador = 2;

        
        await HandleAbandono(idPartida, idJugador);

        // Check that the error was logged
        expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining("Error al abandonar"), expect.any(Error));


        errorSpy.mockRestore();
        axiosDeleteSpy.mockRestore();
    });
});
