import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import obtenerPartidas from '../../components/hooks/Home/ObtenerPartidas';
import { act } from 'react';
import { beforeAll,afterAll,afterEach } from 'vitest';
import { Partida } from '../../types/partidaListada';


describe("obtenerPartidas", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("Deberia llamar al metodo GET y establecer la lista de partidas correctamente", async () => {
    const partidasMock = [
      { id_partida: 1, nombre_partida: "Partida 1", cant_min_jugadores: 4, cant_max_jugadores: 4 },
      { id_partida: 2, nombre_partida: "Partida 2", cant_min_jugadores: 3, cant_max_jugadores: 3 }
    ];

    mock.onGet("http://localhost:8000/partidas").reply(200, partidasMock);

    const setLista = vi.fn();

    await act(async () => {
      await obtenerPartidas(setLista);
    });

    // checkear como se llamo la api
    expect(mock.history.get.length).toBe(1);
    expect(mock.history.get[0].url).toBe("http://localhost:8000/partidas");

    
    expect(setLista).toHaveBeenCalledWith([
      expect.objectContaining(new Partida(1, "Partida 1", 4, 4)),
      expect.objectContaining(new Partida(2, "Partida 2", 3, 3)),
    ]);
  });

  it("Si hay un error deberia setear la lista de partidas como vacia", async () => {
    mock.onGet("http://localhost:8000/partidas").reply(500);

    const setLista = vi.fn();

    await act(async () => {
      await obtenerPartidas(setLista);
    });

    expect(mock.history.get.length).toBe(1);
    expect(setLista).toHaveBeenCalledWith([]);
  });

  it("Si la respuesta no es un array deberia setear la lista de partidas como vacia", async () => {
    mock.onGet("http://localhost:8000/partidas").reply(200, { message: "Error" });

    const setLista = vi.fn();

    await act(async () => {
      await obtenerPartidas(setLista);
    });

    expect(mock.history.get.length).toBe(1);
    expect(setLista).toHaveBeenCalledWith([]);
  });
});
