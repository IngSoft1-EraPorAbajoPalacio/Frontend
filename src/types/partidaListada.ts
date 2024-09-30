export type cantidadJugadores = 2 | 3 | 4;

export class Partida {
  id: number;
  nombre: string;
  cantJugadoresMin: cantidadJugadores;
  cantJugadoresMax: cantidadJugadores;
  
  constructor(id: number, nombre: string, cantJugadoresMin: cantidadJugadores, cantJugadoresMax: cantidadJugadores) {
    this.id = id;
    this.nombre = nombre;
    this.cantJugadoresMin = cantJugadoresMin;
    this.cantJugadoresMax = cantJugadoresMax;
  }
}

export class Jugador {
    id: number;
    nombre: string;
    isHost: boolean;
    
    constructor(id: number, nombre: string, isHost: boolean) { 
      this.id = id;
      this.nombre = nombre;
      this.isHost = isHost;
    }
}