import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import EnviarMensaje from '../components/hooks/Game/EnviarMensaje';

describe('MandarMensajePorChat', () => {

    const idPartida = 1;
    const nombreJugador = 'autor';
    const mensaje = 'Hola'
    const data = { mensaje: mensaje };

    it('Deberia llamar al metodo POST correctamente', async () => {       
        const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({ status: 202 });

        await EnviarMensaje(idPartida, nombreJugador, mensaje);

        expect(axiosPostSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${nombreJugador}/mensaje`, data);

        axiosPostSpy.mockRestore();
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        const axiosPostpy = vi.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Mensaje de error simulado.'));
        const consoleErrorSpy = vi.spyOn(console, 'error');

        await EnviarMensaje(idPartida, nombreJugador, mensaje);

        expect(axiosPostpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${nombreJugador}/mensaje`, data);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error)); 

        axiosPostpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    it('Deberia lanzar un error si la respuesta no es 202', async () => {
        const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({ status: 400 });

        await EnviarMensaje(idPartida, nombreJugador, mensaje);

        expect(axiosPostSpy).toHaveBeenCalledWith(`http://localhost:8000/partida/${idPartida}/jugador/${nombreJugador}/mensaje`, data);

        axiosPostSpy.mockRestore();
        
    });

});