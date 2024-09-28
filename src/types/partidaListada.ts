export type idJugadores = 0 | 1 | 2 | 3;
export type cantidadJugadores = 2 | 3 | 4;

export class Partida {
  id: idJugadores;
  nombre: string;
  cantJugadoresMin: cantidadJugadores;
  cantJugadoresMax: cantidadJugadores;
  
  constructor(id: idJugadores, nombre: string, cantJugadoresMin: cantidadJugadores, cantJugadoresMax: cantidadJugadores) {
    this.id = id;
    this.nombre = nombre;
    this.cantJugadoresMin = cantJugadoresMin;
    this.cantJugadoresMax = cantJugadoresMax;
  }
}

export class Jugador {
    id: idJugadores;
    nombre: string;
    isHost: boolean;
    
    constructor(id: idJugadores, nombre: string, isHost: boolean) { 
      this.id = id;
      this.nombre = nombre;
      this.isHost = isHost;
    }
}