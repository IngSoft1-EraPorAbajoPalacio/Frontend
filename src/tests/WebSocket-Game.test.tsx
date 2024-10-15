// tests/ObtenerMensajes.test.tsx
import { act } from 'react';
import { describe, vi, it, expect } from 'vitest';
import ObtenerMensajes from '../components/hooks/Game/ObtenerMensajes';
import createSocketGame from '../services/socketGame';

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
    const setFinalizado = vi.fn(); // No se usa en este test

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setFinalizado, socket);

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
    const setFinalizado = vi.fn(); // No se usa en este test

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setFinalizado, socket);

    // Simulamos un mensaje de otro tipo
    const message = JSON.stringify({ type: 'OtroTipo', turno: 2 });

    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });

    // Verificamos que no se haya llamado setTurnoActual
    expect(setTurnoActual).not.toHaveBeenCalled();
  });
});