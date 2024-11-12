import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import DeclararFigura from '../components/hooks/Game/DeclararFigura';
import showToast from '../components/views/Public/Toast';

let setMovimientosJugados: any;

const idPartida = 1;
const idJugador = 2;
const figuraGuardadaParaJuan = 1;
const cartaFiguraDescarte = "1";
const color = "Amarillo";

vi.mock('../components/views/Public/Toast', () => ({
    default: vi.fn(),
}));

const data = {
    idCarta: Number(cartaFiguraDescarte),
    tipo_figura: figuraGuardadaParaJuan,
    color: color
};

describe('DeclararFigura', () => {

    beforeEach(() => {
        setMovimientosJugados = vi.fn();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });
    

    it('Deberia llamar al metodo POST correctamente', async () => {
       
        const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({ status: 202 });

        await DeclararFigura(idPartida, idJugador, figuraGuardadaParaJuan, cartaFiguraDescarte, color, setMovimientosJugados);

        // Check that axios.post was called with the correct URL and headers
        expect(axiosPostSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`, data);
        expect(setMovimientosJugados).toHaveBeenCalledWith(0);
    });

    it('En caso de error, deberia mostrarlo en consola', async () => {
        const axiosPostSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce(new Error('Mensaje de error simulado.'));
        const consoleErrorSpy = vi.spyOn(console, 'error');

        await DeclararFigura(idPartida, idJugador, figuraGuardadaParaJuan, cartaFiguraDescarte, color, setMovimientosJugados);

        expect(axiosPostSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`, data);
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error)); 
        expect(setMovimientosJugados).not.toHaveBeenCalled();
    });

    it('Deberia lanzar un error si la respuesta no es 202 ni un error no controlado', async () => {
        const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({ status: 400 });
        const consoleErrorSpy = vi.spyOn(console, 'error');

        await DeclararFigura(idPartida, idJugador, figuraGuardadaParaJuan, cartaFiguraDescarte, color, setMovimientosJugados);

        expect(axiosPostSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`, data);
        expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("Hubo un problema tratando de jugando figura."));
        expect(setMovimientosJugados).not.toHaveBeenCalled();
    });

    it('Deberia mostrar un toast si la respuesta es 432 en el try', async () => {
        const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
            status: 432
        });      
        
        await DeclararFigura(idPartida, idJugador, figuraGuardadaParaJuan, cartaFiguraDescarte, color, setMovimientosJugados);

        expect(axiosPostSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`, data);
        expect(showToast).toHaveBeenCalledWith({ type: 'error', message: "Carta de figura inválida" });
        expect(setMovimientosJugados).not.toHaveBeenCalled();
    });

    it('Deberia mostrar un toast si la respuesta es 432 en el catch', async () => {
        const axiosPostSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce({
            isAxiosError: true,
            response: { status: 432 }
        });
    
        await DeclararFigura(idPartida, idJugador, figuraGuardadaParaJuan, cartaFiguraDescarte, color, setMovimientosJugados);
    
        expect(axiosPostSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`, data);
        expect(showToast).toHaveBeenCalledWith({ type: 'error', message: "Carta de figura inválida" });
        expect(setMovimientosJugados).not.toHaveBeenCalled();
    });

    it('Deberia mostrar un toast si la respuesta es 436 en el try', async () => {
        const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
            status: 436
        });      
        
        await DeclararFigura(idPartida, idJugador, figuraGuardadaParaJuan, cartaFiguraDescarte, color, setMovimientosJugados);

        expect(axiosPostSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`, data);
        expect(showToast).toHaveBeenCalledWith({ type: 'error', message: "No se puede bloquear 2 cartas de un mismo jugador" });
        expect(setMovimientosJugados).not.toHaveBeenCalled();
    });

    it('Deberia mostrar un toast si la respuesta es 436 en el catch', async () => {
        const axiosPostSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce({
            isAxiosError: true,
            response: { status: 436 }
        });
    
        await DeclararFigura(idPartida, idJugador, figuraGuardadaParaJuan, cartaFiguraDescarte, color, setMovimientosJugados);
    
        expect(axiosPostSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`, data);
        expect(showToast).toHaveBeenCalledWith({ type: 'error', message: "No se puede bloquear 2 cartas de un mismo jugador" });
        expect(setMovimientosJugados).not.toHaveBeenCalled();
    });

    it('Deberia mostrar un toast si la respuesta es 435 en el try', async () => {
        const axiosPostSpy = vi.spyOn(axios, 'post').mockResolvedValueOnce({
            status: 435
        });      
        
        await DeclararFigura(idPartida, idJugador, figuraGuardadaParaJuan, cartaFiguraDescarte, color, setMovimientosJugados);

        expect(axiosPostSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`, data);
        expect(showToast).toHaveBeenCalledWith({ type: 'error', message: "No se puede bloquear un jugador con una sola carta de figura" });
        expect(setMovimientosJugados).not.toHaveBeenCalled();
    });

    it('Deberia mostrar un toast si la respuesta es 435 en el catch', async () => {
        const axiosPostSpy = vi.spyOn(axios, 'post').mockRejectedValueOnce({
            isAxiosError: true,
            response: { status: 435 }
        });
    
        await DeclararFigura(idPartida, idJugador, figuraGuardadaParaJuan, cartaFiguraDescarte, color, setMovimientosJugados);
    
        expect(axiosPostSpy).toHaveBeenCalledWith(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/tablero/declarar-figura`, data);
        expect(showToast).toHaveBeenCalledWith({ type: 'error', message: "No se puede bloquear un jugador con una sola carta de figura" });
        expect(setMovimientosJugados).not.toHaveBeenCalled();
    });
});