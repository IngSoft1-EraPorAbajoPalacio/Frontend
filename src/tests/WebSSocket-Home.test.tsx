// tests/ObtenerMensajes.test.tsx
import { act } from 'react';
import { describe, vi, it, expect } from 'vitest';
import { Partida } from '../types/partidaListada';
import ObtenerMensajes from '../components/hooks/Home/ObtenerMensajes';
import socket from '../services/sockets';

// Mockeamos el módulo de socket
vi.mock('../services/sockets', () => ({
  default: {onmessage: vi.fn()},
}));

describe('ObtenerMensajes', () => {
  it('Debería agregar una partida a la lista de partidas cuando recibe un mensaje de tipo NuevaPartida', () => {
    const setPartidas = vi.fn();

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setPartidas);

    // Simulamos un mensaje de tipo NuevaPartida
    const message = JSON.stringify({
        type: 'AgregarPartida',
        data: {
            idPartida: 5,
            nombrePartida: 'Partida Nueva',
            cantJugadoresMin: 3,
            cantJugadoresMax: 4
        }
    });

    // Simulamos recibir el mensaje desde el servidor
    act(() => {
      socket.onmessage({ data: message });
    });

    // Verificamos si se agrega la partida correctamente
    expect(setPartidas).toHaveBeenCalledWith(expect.any(Function));
    const updateFunction = setPartidas.mock.calls[0][0];
    const partidas = updateFunction([]);
    expect(partidas).toEqual([
      new Partida(5, 'Partida Nueva', 3, 4),
    ]);
  });

  it('Debería eliminar una partida de la lista de partidas cuando recibe un mensaje de tipo EliminarPartida', () => {
    const setPartidas = vi.fn();

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setPartidas);

    // Simulamos un mensaje de tipo EliminarPartida
    const message = JSON.stringify({
      type: 'EliminarPartida',
      data: {
        id: 5,
      },
    });

    // Simulamos recibir el mensaje desde el servidor
    act(() => {
      socket.onmessage({ data: message });
    });

    // Verificamos si se elimina la partida correctamente
    expect(setPartidas).toHaveBeenCalledWith(expect.any(Function));
    const updateFunction = setPartidas.mock.calls[0][0];
    const partidas = updateFunction([
      new Partida(5, 'Partida Nueva', 3, 4),
    ]);
    expect(partidas).toEqual([]);
  });

});