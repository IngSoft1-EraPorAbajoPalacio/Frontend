// tests/ObtenerMensajes.test.tsx
import { act } from 'react';
import { describe, vi, it, expect } from 'vitest';
import ObtenerMensajes from '../components/hooks/Game/ObtenerMensajes';
import createSocketGame from '../services/socketGame';
import { partidaMock, fichasMock } from '../data/MockPartidaEnCurso';
import { JugadorEnCurso } from '../types/partidaEnCurso';
import { guardarFichasTablero, guardarPartidaEnCurso } from '../components/context/GameContext';
import { Movimiento, CartaMovimiento } from '../types/partidaEnCurso';
import declararFiguras from '../utils/Cartas/DeclararFiguras';

// Mockeamos el módulo de socket
vi.mock('../services/socketGame', () => ({
  default: {onmessage: vi.fn()},
}));

// Mockeamos la función declararFiguras
vi.mock('../utils/Cartas/DeclararFiguras', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('ObtenerMensajes', () => {
  let socket: any;
  let setTurnoActual: any;
  let setPartida: any;
  let setMovimientos: any;
  let setMovimientoAgregado: any;
  let setMovimientoDeshecho: any;
  let setMovimientosJugados: any;
  let setFinalizado: any;
  let setMarcaFiguras: any;
  let setFigurasDetectadas: any;
  let figuraSeleccionada: number;
  let marcadasPorSelec: [1];
  let setMarcadasPorSelec: any;
  let setManoFigura: any; 

  beforeEach(() => {
    setTurnoActual = vi.fn();
    setPartida = vi.fn();
    setMovimientos = vi.fn();
    setMovimientoAgregado = vi.fn();
    setMovimientoDeshecho = vi.fn();
    setMovimientosJugados = vi.fn();
    setFinalizado = vi.fn();
    setMarcaFiguras = vi.fn();
    setFigurasDetectadas = vi.fn();
    figuraSeleccionada = 1;
    marcadasPorSelec = [1];
    setMarcadasPorSelec = vi.fn();
    setManoFigura = vi.fn();
  });

  beforeAll(() => {
    socket = createSocketGame;
  });

  afterAll(() => {
    socket.close;
  });

  it('Debería actualizar el turno actual cuando recibe un mensaje de tipo PasarTurno', () => {
    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setManoFigura);

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

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setManoFigura);

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

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setManoFigura);

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

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setManoFigura);

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

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setManoFigura);

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

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setManoFigura);

    // Simulamos un mensaje de tipo DeshacerMovimiento
    const message = JSON.stringify({ type: 'DeshacerMovimiento', posiciones: [{ x: 0, y: 0 }, { x: 0, y: 1 }] });

    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });

    // Verificamos si se marca el movimiento como deshecho
    expect(setMovimientoDeshecho).toHaveBeenCalledWith(true);
  });

  it('Debería marcar movimiento como deshecho y re-establecer la cantidad de movimientos si recibe un mensaje de tipo DeshacerMovimientos', () => {

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setManoFigura);

    // Inicializamos la cantidad de movimientos jugados
    setMovimientosJugados(2);

    // Simulamos un mensaje de tipo DeshacerMovimientos
    const message = JSON.stringify({
      type: 'DeshacerMovimientos',
      posiciones: [
        [{ x: 0, y: 0 }, { x: 0, y: 1 }],
        [{ x: 0, y: 0 }, { x: 0, y: 1 }]
      ],
      cantMovimientosDesechos: 2
    });

    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });

    // Verificamos si se marca el movimiento como deshecho
    expect(setMovimientoDeshecho).toHaveBeenCalledWith(true);

    // Verificamos si se re-establece la cantidad de movimientos jugados
    expect(setMovimientosJugados).toHaveBeenCalledWith(0);
  });

  it('Debería declarar figuras si recibe un mensaje de tipo DeclararFigura', () => {
    
    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setManoFigura);
  
    // Simulamos un mensaje de tipo DeclararFigura

    const figuras = { figura: [
      { idFig: 0, tipoFig: 1, coordenadas: [ [1, 0], [1, 1], [2, 2] ] },
      { idFig: 1, tipoFig: 2, coordenadas: [ [3, 3], [4, 4], [5, 5] ] }
    ]};

    const data = {
      type: 'DeclararFigura',
      figuras: JSON.stringify(figuras)
    };
  
    const message = JSON.stringify(data);
  
    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });
  
    // Verificamos si se declaran las figuras
    expect(declararFiguras).toHaveBeenCalledWith(JSON.stringify(figuras), setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec);

    // Verificamos que la función solo sea llamada una vez
    expect(declararFiguras).toHaveBeenCalledTimes(1);

  });

  it('Debería actualizar la mano de figuras si recibe un mensaje de tipo FiguraDescartar', () => {
    
    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setPartida, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setManoFigura);
  
    // Simulamos un mensaje de tipo FiguraDescartar
    const cartas = [
      { id: 1, figura: 1 },
      { id: 2, figura: 2 }
    ];

    const message = JSON.stringify({ type: 'FiguraDescartar', cartas: cartas });
  
    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });
  
    // Verificamos si se actualiza la mano de figuras
    expect(setManoFigura).toHaveBeenCalledWith(cartas);

  });

});