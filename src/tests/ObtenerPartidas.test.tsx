import { act } from 'react';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import obtenerPartidas from "../components/hooks/Home/ObtenerPartidas";
import { afterEach, describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { Partida } from "../types/partidaListada";
import { partidasMock } from "../data/MockListaPartidas";

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

  it("Debería obtener y establecer la lista de partidas correctamente", async () => {

    mock.onGet("http://localhost:8000/partidas").reply(200, partidasMock);

    const setLista = vi.fn();

    await act(async () => {
      await obtenerPartidas(setLista);
    });

    expect(setLista).toHaveBeenCalledWith([
      new Partida(1, "Partida 1", 4, 4),
      new Partida(2, "Partida 2", 3, 3),
    ]);
  });
});