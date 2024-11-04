// tests/ObtenerMensajes.test.tsx
import { act } from 'react';
import { describe, vi, it, expect } from 'vitest';
import ObtenerMensajes from '../components/hooks/Game/ObtenerMensajes';
import createSocketGame from '../services/socketGame';
import { fichasMock, j1Mock, j2Mock, j3Mock, j4Mock, j1CartasMock, j2CartasMock, j3CartasMock, j4CartasMock } from '../data/MockPartidaEnCurso';
import { borrarPartida, guardarFichasTablero, guardarFiguraJugador1, guardarFiguraJugador2, guardarFiguraJugador3, guardarFiguraJugador4, guardarJugador1, guardarJugador2, guardarJugador3, guardarJugador4 } from '../components/context/GameContext';
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
  let setColorProhibido: any;

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
    setColorProhibido = vi.fn();
  });

  beforeAll(() => {
    socket = createSocketGame;
  });

  beforeEach(() => {
    borrarPartida();
  });

  afterAll(() => {
    socket.close;
  });

  it('Debería actualizar el turno actual cuando recibe un mensaje de tipo PasarTurno', () => {
    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);

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
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);

    // Simulamos un mensaje de otro tipo
    const message = JSON.stringify({ type: 'OtroTipo', turno: 2 });

    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });

    // Verificamos que no se haya llamado setTurnoActual
    expect(setTurnoActual).not.toHaveBeenCalled();
  });

  it('Debería finalizar la partida y mostrar ganador si recibe un mensaje de tipo PartidaFinalizada', () => {

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);

    // Simulamos un mensaje de tipo PartidaEliminada
    const message = JSON.stringify({ 
      type: 'PartidaFinalizada',
      data: {
        idGanador: 1,
        nombreGanador: 'Ganador'
      }
     });

    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });

    // Verificamos si se finaliza la partida
    expect(setFinalizado).toHaveBeenCalledWith(true, 1, 'Ganador');
  });


  it('Debería eliminar al jugador 1 si recibe un mensaje de tipo AbandonarPartida con id del jugador 1', () => {

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);

    // Simulamos que hay jugadores en la partida
    guardarJugador1(j1Mock);
    setJugador1(j1Mock);
    guardarFiguraJugador1(j1CartasMock);
    setFiguraJug1(j1CartasMock);

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

  it('Debería eliminar al jugador 2 si recibe un mensaje de tipo AbandonarPartida con id del jugador 2', () => {

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);

    // Simulamos que hay jugadores en la partida
    guardarJugador2(j2Mock);
    setJugador2(j2Mock);
    guardarFiguraJugador2(j2CartasMock);
    setFiguraJug2(j2CartasMock);

    // Simulamos un mensaje de tipo AbandonarPartida
    const message = JSON.stringify({ type: 'AbandonarPartida', data: { idJugador: 6 } });

    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });

    // Verificamos si se elimina el jugador
    expect(setFiguraJug2).toHaveBeenCalledWith([]);
    expect(setJugador2).toHaveBeenCalledWith(null);
  });

  it('Debería eliminar al jugador 3 si recibe un mensaje de tipo AbandonarPartida con id del jugador 3', () => {

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);

    // Simulamos que hay jugadores en la partida
    guardarJugador3(j3Mock);
    setJugador3(j3Mock);
    guardarFiguraJugador3(j3CartasMock);
    setFiguraJug3(j3CartasMock);

    // Simulamos un mensaje de tipo AbandonarPartida
    const message = JSON.stringify({ type: 'AbandonarPartida', data: { idJugador: 7 } });

    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });

    // Verificamos si se elimina el jugador
    expect(setFiguraJug3).toHaveBeenCalledWith([]);
    expect(setJugador3).toHaveBeenCalledWith(null);
  });

  it('Debería eliminar al jugador 4 si recibe un mensaje de tipo AbandonarPartida con id del jugador 4', () => {

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);

    // Simulamos que hay jugadores en la partida
    guardarJugador4(j4Mock);
    setJugador4(j4Mock);
    guardarFiguraJugador4(j4CartasMock);
    setFiguraJug4(j4CartasMock);

    // Simulamos un mensaje de tipo AbandonarPartida
    const message = JSON.stringify({ type: 'AbandonarPartida', data: { idJugador: 8 } });

    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });

    // Verificamos si se elimina el jugador
    expect(setFiguraJug4).toHaveBeenCalledWith([]);
    expect(setJugador4).toHaveBeenCalledWith(null);
  });

  it('Debería agregar un movimiento si recibe un mensaje de tipo MovimientoParcial', () => {

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);

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

    guardarFichasTablero(fichasMock);

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);

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

    guardarFichasTablero(fichasMock);

    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);

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
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados,  setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);
  
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

  it('Debería actualizar la mano de figuras del jugador 1 si recibe un mensaje de tipo FiguraDescartar', () => {
    // Mock de setTurnoActual para capturar el valor del turno
    const mockSetTurnoActual = vi.fn();
  
    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(mockSetTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados, setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);
  
    // Simulamos que el turno actual es del jugador 1
    mockSetTurnoActual.mockImplementation((updateFn) => {
      const turno = updateFn(j1Mock.id);
      return turno;
    });
  
    setFiguraJug1(j1CartasMock);
    setJugador1(j1Mock);
  
    // Guardamos las figuras y el jugador en el contexto
    guardarFiguraJugador1(j1CartasMock);
    guardarJugador1(j1Mock);
  
    // Simulamos un mensaje de tipo FiguraDescartar  
    const data = {
      type: 'FiguraDescartar',
      data: {
        cartasFig: [
          { id: 17, figura: 17 },
          { id: 41, figura: 17 }
        ]
      }
    };
  
    const message = JSON.stringify(data);
  
    // Llamamos al evento onmessage
    act(() => {
      socket.onmessage({ data: message });
    });
  
    // Verificamos si se actualiza la mano de figuras
    expect(mockSetTurnoActual).toHaveBeenCalled();
    expect(setFiguraJug1).toHaveBeenCalledWith(data.data.cartasFig);
  });

  it('Debería actualizar la mano de figuras del jugador 2 si recibe un mensaje de tipo FiguraDescartar', () => {
    // Mock de setTurnoActual para capturar el valor del turno
    const mockSetTurnoActual = vi.fn();
  
    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(mockSetTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados, setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);
  
    // Simulamos que el turno actual es del jugador 2
    mockSetTurnoActual.mockImplementation((updateFn) => {
      const turno = updateFn(j2Mock.id);
      return turno;
    });
  
    setFiguraJug2(j2CartasMock);
    setJugador2(j2Mock);
  
    // Guardamos las figuras y el jugador en el contexto
    guardarFiguraJugador2(j2CartasMock);
    guardarJugador2(j2Mock);
  
    // Simulamos un mensaje de tipo FiguraDescartar  
    const data = {
      type: 'FiguraDescartar',
      data: {
        cartasFig: [
          { id: 17, figura: 17 },
          { id: 42, figura: 17 }
        ]
      }
    };
  
    const message = JSON.stringify(data);
  
    // Llamamos al evento onmessage
    act(() => {
      socket.onmessage({ data: message });
    });
  
    // Verificamos si se actualiza la mano de figuras
    expect(mockSetTurnoActual).toHaveBeenCalled();
    expect(setFiguraJug2).toHaveBeenCalledWith(data.data.cartasFig);
  });

  it('Debería actualizar la mano de figuras del jugador 3 si recibe un mensaje de tipo FiguraDescartar', () => {
    // Mock de setTurnoActual para capturar el valor del turno
    const mockSetTurnoActual = vi.fn();
  
    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(mockSetTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados, setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);
  
    // Simulamos que el turno actual es del jugador 3
    mockSetTurnoActual.mockImplementation((updateFn) => {
      const turno = updateFn(j3Mock.id);
      return turno;
    });
  
    setFiguraJug3(j3CartasMock);
    setJugador3(j3Mock);
  
    // Guardamos las figuras y el jugador en el contexto
    guardarFiguraJugador3(j3CartasMock);
    guardarJugador3(j3Mock);
  
    // Simulamos un mensaje de tipo FiguraDescartar  
    const data = {
      type: 'FiguraDescartar',
      data: {
        cartasFig: [
          { id: 17, figura: 17 },
          { id: 42, figura: 17 }
        ]
      }
    };
  
    const message = JSON.stringify(data);
  
    // Llamamos al evento onmessage
    act(() => {
      socket.onmessage({ data: message });
    });
  
    // Verificamos si se actualiza la mano de figuras
    expect(mockSetTurnoActual).toHaveBeenCalled();
    expect(setFiguraJug3).toHaveBeenCalledWith(data.data.cartasFig);
  });

  it('Debería actualizar la mano de figuras del jugador 4 si recibe un mensaje de tipo FiguraDescartar', () => {
    // Mock de setTurnoActual para capturar el valor del turno
    const mockSetTurnoActual = vi.fn();
  
    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(mockSetTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados, setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);
  
    // Simulamos que el turno actual es del jugador 4
    mockSetTurnoActual.mockImplementation((updateFn) => {
      const turno = updateFn(j4Mock.id);
      return turno;
    });
  
    setFiguraJug4(j4CartasMock);
    setJugador4(j4Mock);
  
    // Guardamos las figuras y el jugador en el contexto
    guardarFiguraJugador4(j4CartasMock);
    guardarJugador4(j4Mock);
  
    // Simulamos un mensaje de tipo FiguraDescartar  
    const data = {
      type: 'FiguraDescartar',
      data: {
        cartasFig: [
          { id: 17, figura: 17 },
          { id: 42, figura: 17 }
        ]
      }
    };
  
    const message = JSON.stringify(data);
  
    // Llamamos al evento onmessage
    act(() => {
      socket.onmessage({ data: message });
    });
  
    // Verificamos si se actualiza la mano de figuras
    expect(mockSetTurnoActual).toHaveBeenCalled();
    expect(setFiguraJug4).toHaveBeenCalledWith(data.data.cartasFig);
  });

  it('No debería actualizar la mano de figuras si el mensaje no es de tipo FiguraDescartar', () => {
    // Llamamos a la función que escucha los mensajes
    ObtenerMensajes(setTurnoActual, setMovimientos, setMovimientoAgregado, setMovimientoDeshecho, setMovimientosJugados, setFinalizado, socket, setMarcaFiguras, setFigurasDetectadas, figuraSeleccionada, marcadasPorSelec, setMarcadasPorSelec, setFiguraJug1, setFiguraJug2, setFiguraJug3, setFiguraJug4, setJugador1, setJugador2, setJugador3, setJugador4, setColorProhibido);
  
    // Simulamos un mensaje de otro tipo
    const message = JSON.stringify({ type: 'OtroTipo', turno: 2 });

    // Llamamos al evento onmessage
    act(() => {
        socket.onmessage({ data: message });
    });

    // Verificamos que no se haya llamado setFiguraJug1 ni setFiguraJug2
    expect(setFiguraJug1).not.toHaveBeenCalled();
    expect(setFiguraJug2).not.toHaveBeenCalled();
    expect(setFiguraJug3).not.toHaveBeenCalled();
    expect(setFiguraJug4).not.toHaveBeenCalled();
  });

});