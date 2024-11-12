

import { vi, describe, it, expect } from 'vitest';
import { avisoAccionChat } from '../components/utils/Game/avisoAccionChat';
import * as modulo from '../components/context/GameContext';

describe('avisoAccionChat', () => {
   let setListaMensajes: ReturnType<typeof vi.fn>;

   beforeEach(() => {
    setListaMensajes = vi.fn();
    vi.spyOn(modulo, 'obtenerJugador1').mockReturnValue({ id: 1, nombre: 'Jugador1' });
  });

  it('should call setListaMensajes with the correct message when a player performs an action', () => {

    avisoAccionChat(1, 'Abandono', setListaMensajes);

    // Verificar que se actualizo correctamente la lista de mensajes
    expect(setListaMensajes).toHaveBeenCalledWith(expect.any(Function));
    const updateFunction = setListaMensajes.mock.calls[0][0];
    const listaActualizada = updateFunction(['Que tal?']);
    expect(listaActualizada).toEqual(['Que tal?', "'Jugador1' ha abandonado la partida."]);
  });

  it('should add the correct message when a different type of action is passed', () => {
    
    avisoAccionChat(1, 'DeshacerTodos', setListaMensajes);

    // Verificar que se actualizo correctamente la lista de mensajes
    expect(setListaMensajes).toHaveBeenCalledWith(expect.any(Function));
    const updateFunction = setListaMensajes.mock.calls[0][0];
    const listaActualizada = updateFunction(['Que tal?']);
    expect(listaActualizada).toEqual(['Que tal?', "Los movimientos de 'Jugador1' han sido deshechos."]);
  });

  it('should add the correct message when a different type of action is passed', () => {
    
    avisoAccionChat(1, 'Deshacer1Mov', setListaMensajes);

    // Verificar que se actualizo correctamente la lista de mensajes
    expect(setListaMensajes).toHaveBeenCalledWith(expect.any(Function));
    const updateFunction = setListaMensajes.mock.calls[0][0];
    const listaActualizada = updateFunction(['Que tal?']);
    expect(listaActualizada).toEqual(['Que tal?', "'Jugador1' ha deshecho su movimiento."]);
  });

  it('should add the correct message when a different type of action is passed', () => {
    
    avisoAccionChat(1, 'DeshacerTodos', setListaMensajes);

    // Verificar que se actualizo correctamente la lista de mensajes
    expect(setListaMensajes).toHaveBeenCalledWith(expect.any(Function));
    const updateFunction = setListaMensajes.mock.calls[0][0];
    const listaActualizada = updateFunction(['Que tal?']);
    expect(listaActualizada).toEqual(['Que tal?', "Los movimientos de 'Jugador1' han sido deshechos."]);
  });

  it('should add the correct message when a different type of action is passed', () => {
   
    avisoAccionChat(1, 'Figura', setListaMensajes);

    // Verificar que se actualizo correctamente la lista de mensajes
    expect(setListaMensajes).toHaveBeenCalledWith(expect.any(Function));
    const updateFunction = setListaMensajes.mock.calls[0][0];
    const listaActualizada = updateFunction(['Que tal?']);
    expect(listaActualizada).toEqual(['Que tal?', "'Jugador1' ha utilizado una de sus cartas figura."]);
  });

  it('should add the correct message when a different type of action is passed', () => {
    
    avisoAccionChat(1, 'Bloquear', setListaMensajes);

    // Verificar que se actualizo correctamente la lista de mensajes
    expect(setListaMensajes).toHaveBeenCalledWith(expect.any(Function));
    const updateFunction = setListaMensajes.mock.calls[0][0];
    const listaActualizada = updateFunction(['Que tal?']);
    expect(listaActualizada).toEqual(['Que tal?', "'Jugador1' ha bloqueado una carta figura ajena."]);
  });

  it('should add the correct message when a different type of action is passed', () => {
    
    avisoAccionChat(1, 'Desbloquear', setListaMensajes);

    // Verificar que se actualizo correctamente la lista de mensajes
    expect(setListaMensajes).toHaveBeenCalledWith(expect.any(Function));
    const updateFunction = setListaMensajes.mock.calls[0][0];
    const listaActualizada = updateFunction(['Que tal?']);
    expect(listaActualizada).toEqual(['Que tal?', "'Jugador1' ha desbloqueado su carta figura."]);
  });

});
