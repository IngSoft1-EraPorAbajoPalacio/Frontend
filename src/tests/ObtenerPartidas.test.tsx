import { act } from 'react';
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import obtenerPartidas from "../components/hooks/Home/ObtenerPartidas";
import { afterEach, describe, it, expect, beforeAll, afterAll, vi } from "vitest";
import { Partida } from "../types/partidaListada";
import { partidasSinContrasena, partidasConContrasena } from "../data/MockListaPartidas";

let mock: MockAdapter;
let setLista: any;

describe("obtenerPartidas", () => {
  

  beforeAll(() => {
    mock = new MockAdapter(axios);
    setLista = vi.fn();
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("Debería obtener y establecer la lista de partidas correctamente", async () => {

    mock.onGet("http://localhost:8000/partidas").reply(200, partidasSinContrasena);

    await act(async () => {
      await obtenerPartidas(setLista);
    });

    expect(setLista).toHaveBeenCalledWith([
      new Partida(1, "Partida 1", 4, 4),
      new Partida(2, "Partida 2", 3, 3),
    ]);
  });

  it("Debería establecer la lista de partidas como vacía si hay un error", async () => {
    mock.onGet("http://localhost:8000/partidas").reply(500);

    await act(async () => {
      await obtenerPartidas(setLista);
    });

    expect(setLista).toHaveBeenCalledWith([]);
  });

  it ("Debería establecer la lista de partidas como vacía si la respuesta no es un array", async () => {
    mock.onGet("http://localhost:8000/partidas").reply(200, { message: "Error" });

    await act(async () => {
      await obtenerPartidas(setLista);
    });

    expect(setLista).toHaveBeenCalledWith([]);
  });

  it ("Debería asignar el valor por defecto de privada si no se recibe", async () => {
    mock.onGet("http://localhost:8000/partidas").reply(200, partidasConContrasena);

    await act(async () => {
      await obtenerPartidas(setLista);
    });

    expect(setLista).toHaveBeenCalledWith([
      new Partida(1, "Partida 1", 4, 4, true),
      new Partida(2, "Partida 2", 3, 3, false),
    ]);
  });

});