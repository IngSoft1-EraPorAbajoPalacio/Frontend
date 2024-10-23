// tests/ObtenerMensajes.test.tsx
import { act } from 'react';
import { describe, vi, it, expect } from 'vitest';
import ObtenerMensajes from '../components/hooks/Game/ObtenerMensajes';
import createSocketGame from '../services/socketGame';
import { fichasMock, j1Mock, j2Mock, j1CartasMock } from '../data/MockPartidaEnCurso';
import { borrarFiguraJugador1, borrarJugador1, guardarFichasTablero, guardarFiguraJugador1, guardarFiguraJugador2, guardarJugador1, guardarJugador2 } from '../components/context/GameContext';
import { Movimiento, CartaMovimiento } from '../types/partidaEnCurso';
import declararFiguras from '../components/views/Public/Game/DeclararFiguras';

// Mockeamos el módulo de socket
vi.mock('../services/socketGame', () => ({
  default: {onmessage: vi.fn()},
}));

// Mockeamos la función declararFiguras
vi.mock('../components/views/Public/Game/DeclararFiguras', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('ObtenerMensajes', () => {
  let socket: any;
  let setTurnoActual: any;
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
  let setFiguraJug1: any;
  let setFiguraJug2: any;
  let setFiguraJug3: any;
  let setFiguraJug4: any;
  let setJugador1: any;
  let setJugador2: any;
  let setJugador3: any;
  let setJugador4: any;

  beforeEach(() => {
    setTurnoActual = vi.fn();
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
    setFiguraJug1 = vi.fn();
    setFiguraJug2 = vi.fn();  
    setFiguraJug3 = vi.fn();
    setFiguraJug4 = vi.fn();
    setJugador1 = vi.fn();
    setJugador2 = vi.fn();
    setJugador3 = vi.fn();
    setJugador4 = vi.fn();
  });

  beforeAll(() => {
    socket = createSocketGame;
  });

  afterAll(() => {
    socket.close;
  });

  it('Debería actualizar el turno actual cuando recibe un mensaje de tipo PasarTurno', () => {
    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4);

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
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4);

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
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4);

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
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4);

    // Simulamos que hay dos jugadores en la partida
    guardarJugador1(j1Mock);
    guardarJugador2(j2Mock);
    setJugador1(j1Mock);
    setJugador2(j2Mock);
    guardarFiguraJugador1(j1CartasMock);
    guardarFiguraJugador2(j1CartasMock);
    setFiguraJug1(j1CartasMock);
    setFiguraJug2(j1CartasMock);

    // Simulamos un mensaje de tipo AbandonarPartida
    const message = JSON.stringify({ type: 'AbandonarPartida', data: { idJugador: 5 } });

    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });

    // Verificamos si se elimina el jugador
    expect(setFiguraJug1).toHaveBeenCalledWith([]);
    expect(setJugador1).toHaveBeenCalledWith(null);
  });

  it('Debería agregar un movimiento si recibe un mensaje de tipo MovimientoParcial', () => {

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4);

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
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4);

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
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4);

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
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4);
  
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
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados, setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4);
  
    // Simulamos que el turno actual es del jugador 1
    setTurnoActual(j1Mock.id);
    setFiguraJug1(j1CartasMock);
    setJugador1(j1Mock);
  
    // Borramos la mano de figuras del jugador 1
    borrarFiguraJugador1();
    borrarJugador1();

    // Guardamos las figuras y el jugador en el contexto
    guardarFiguraJugador1(j1CartasMock);
    guardarJugador1(j1Mock);
  
    // Simulamos un mensaje de tipo FiguraDescartar  
    const message = JSON.stringify({
      type: 'FiguraDescartar',
      data:
      { cartasFig:
        [
          {id: 45, figura: 20},
          {id: 29, figura: 4},
        ]
      } 
    });
  
    // Llamamos al evento onmessage
    act(() => {
      socket.onmessage({ data: message });
    });
  
    // Verificamos si se actualiza la mano de figuras
    expect(setTurnoActual).toHaveBeenCalledWith(j1Mock.id);
    expect(setFiguraJug1).toHaveBeenCalledWith([{id: 45, figura: 20}, {id: 29, figura: 4}, {id: 43, figura: 18}]);
  });

});