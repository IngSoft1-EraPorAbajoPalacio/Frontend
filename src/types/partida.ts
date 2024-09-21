export type CantidadJugadores = 2 | 3 | 4;

export class Partida {
  idPartida: number;
  nombrePartida: string;
  cantJugadores: CantidadJugadores;
  
  constructor(idPartida: number, nombrePartida: string, cantJugadores: CantidadJugadores) { 
    this.idPartida = idPartida;
    this.nombrePartida = nombrePartida;
    this.cantJugadores = cantJugadores;
  }
}

// Partidas de prueba
const partida1 : Partida = new Partida(1, 'Partida 1', 2);
const partida2 : Partida = new Partida(2, 'Partida 2', 3);
const partida3 : Partida = new Partida(3, 'Partida 3', 4);
const partida4 : Partida = new Partida(4, 'partida 4', 4);

export const partidas : Partida[] = [partida1, partida2, partida3, partida4];