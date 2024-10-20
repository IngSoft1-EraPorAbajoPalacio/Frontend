// tests/ObtenerMensajes.test.tsx
import { act } from 'react';
import { describe, vi, it, expect } from 'vitest';
import ObtenerMensajes from '../components/hooks/Game/ObtenerMensajes';
import createSocketGame from '../services/socketGame';
import { partidaMock, fichasMock } from '../data/MockPartidaEnCurso';
import { JugadorEnCurso } from '../types/partidaEnCurso';
import { guardarFichasTablero, guardarPartidaEnCurso } from '../components/context/GameContext';
import { Movimiento, CartaMovimiento } from '../types/partidaEnCurso';

// Mockeamos el módulo de socket
vi.mock('../services/socketGame', () => ({
  default: {onmessage: vi.fn()},
}));

describe('ObtenerMensajes', () => {

  let socket: any;

  beforeAll(() => {
    socket = createSocketGame;
  });

  afterAll(() => {
    socket.close;
  });

  it('Debería actualizar el turno actual cuando recibe un mensaje de tipo PasarTurno', () => {
    const setTurnoActual = vi.fn();
    const setPartida = vi.fn(); // No se usa en este test
    const setMovimientos = vi.fn(); // No se usa en este test
    const setMovimientoAgregado = vi.fn(); // No se usa en este test
    const setMovimientoDeshecho = vi.fn(); // No se usa en
    const setFinalizado = vi.fn(); // No se usa en este test

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho,  setFinalizado, socket);

    // Simulamos un mensaje de tipo PasarTurno
    const message = JSON.stringify({ type: 'PasarTurno', turno: 2 });


    // Simulamos recibir el mensaje desde el servidor
    act(() => {
      socket.onmessage({ data: message });
    });

    // Verificamos si se actualiza el turno correctamente
    expect(setTurnoActual).toHaveBeenCalledWith(2);
  });

  it('No debería actualizar el turno si el mensaje no es de tipo PasarTurno', () => {
    const setTurnoActual = vi.fn();
    const setPartida = vi.fn(); // No se usa en este test
    const setMovimientos = vi.fn(); // No se usa en este test
    const setMovimientoAgregado = vi.fn(); // No se usa en este test
    const setMovimientoDeshecho = vi.fn(); // No se usa en
    const setFinalizado = vi.fn(); // No se usa en este test

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho,  setFinalizado, socket);

    // Simulamos un mensaje de otro tipo
    const message = JSON.stringify({ type: 'OtroTipo', turno: 2 });

    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });

    // Verificamos que no se haya llamado setTurnoActual
    expect(setTurnoActual).not.toHaveBeenCalled();
  });

  it('Debería finalizar la partida si recibe un mensaje de tipo PartidaEliminada', () => {
    const setTurnoActual = vi.fn(); // No se usa en este test
    const setPartida = vi.fn(); // No se usa en este test
    const setMovimientos = vi.fn(); // No se usa en este test
    const setMovimientoAgregado = vi.fn(); // No se usa en este test
    const setMovimientoDeshecho = vi.fn(); // No se usa en
    const setFinalizado = vi.fn();

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho,  setFinalizado, socket);

    // Simulamos un mensaje de tipo PartidaEliminada
    const message = JSON.stringify({ type: 'PartidaEliminada' });

    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });

    // Verificamos si se finaliza la partida
    expect(setFinalizado).toHaveBeenCalledWith(true);
  });

  it('Debería eliminar un jugador si recibe un mensaje de tipo AbandonarPartida', () => {
    const setTurnoActual = vi.fn(); // No se usa en este test
    const setPartida = vi.fn();
    const setMovimientos = vi.fn(); // No se usa en este test
    const setMovimientoAgregado = vi.fn(); // No se usa en este test
    const setMovimientoDeshecho = vi.fn(); // No se usa en
    const setFinalizado = vi.fn(); // No se usa en este test

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho,  setFinalizado, socket);

    // Simulamos que hay dos jugadores en la partida
    guardarPartidaEnCurso(partidaMock);

    // Definimos la respuesta
    let partidaEsperada = partidaMock;
    partidaEsperada.jugadores = partidaEsperada.jugadores.filter((jugador: JugadorEnCurso) => jugador.id !== 5);

    // Simulamos un mensaje de tipo AbandonarPartida
    const message = JSON.stringify({ type: 'AbandonarPartida', data: { idJugador: 5 } });

    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });

    // Verificamos si se elimina el jugador
    expect(setPartida).toHaveBeenCalledWith(partidaEsperada);
  });

  it('Debería agregar un movimiento si recibe un mensaje de tipo MovimientoParcial', () => {
    const setTurnoActual = vi.fn(); // No se usa en este test
    const setPartida = vi.fn(); // No se usa en este test
    const setMovimientos = vi.fn();
    const setMovimientoAgregado = vi.fn();
    const setMovimientoDeshecho = vi.fn(); // No se usa en
    const setFinalizado = vi.fn(); // No se usa en este test

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho,  setFinalizado, socket);

    // Simulamos un mensaje de tipo MovimientoParcial
    guardarFichasTablero(fichasMock);
    const movimientoParcial = {
      carta: { id: 1, movimiento: 1 },
      fichas: [
        { x: 0, y: 0, color: 'Azul' },
        { x: 0, y: 1, color: 'Azul' }
      ]
    };

    const message = JSON.stringify({ type: 'MovimientoParcial', data: movimientoParcial });

    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });

    // Verificamos si se agrega el movimiento
    const carta = new CartaMovimiento(1, 1);
    const movimientoEsperado = new Movimiento(carta, { x: 0, y: 0, color: 'Azul' }, { x: 0, y: 1, color: 'Azul' });
    
    // Verificamos si se actualiza el estado de movimiento
    expect(setMovimientos).toHaveBeenCalledWith(movimientoEsperado);

    // Verificamos si se actualiza el estado de movimiento agregado
    expect(setMovimientoAgregado).toHaveBeenCalledWith(true);
  });

  it('Debería marcar un movimiento como deshecho si recibe un mensaje de tipo DeshacerMovimiento', () => {
    const setTurnoActual = vi.fn(); // No se usa en este test
    const setPartida = vi.fn(); // No se usa en este test
    const setMovimientos = vi.fn(); // No se usa en este test
    const setMovimientoAgregado = vi.fn(); // No se usa en este test
    const setMovimientoDeshecho = vi.fn();
    const setFinalizado = vi.fn(); // No se usa en este test

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho,  setFinalizado, socket);

    // Simulamos un mensaje de tipo DeshacerMovimiento
    const message = JSON.stringify({ type: 'DeshacerMovimiento', posiciones: [{ x: 0, y: 0 }, { x: 0, y: 1 }] });

    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });

    // Verificamos si se marca el movimiento como deshecho
    expect(setMovimientoDeshecho).toHaveBeenCalledWith(true);
  });

});