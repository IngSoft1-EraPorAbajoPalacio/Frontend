export type cantidadJugadores = 2 | 3 | 4;

export class Partida {
  id: number;
  nombre: string;
  cantJugadoresMin: cantidadJugadores;
  cantJugadoresMax: cantidadJugadores;
  bloqueada?: boolean;
  
  constructor(id: number, nombre: string, cantJugadoresMin: cantidadJugadores, cantJugadoresMax: cantidadJugadores, bloqueada?: boolean) {
    this.id = id;
    this.nombre = nombre;
    this.cantJugadoresMin = cantJugadoresMin;
    this.cantJugadoresMax = cantJugadoresMax;
    this.bloqueada = bloqueada? bloqueada : false;
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

export class JugadoresUnidos{
  id: number;
  nombre: string;
  
  constructor(id: number, nombre: string){
    this.id = id;
    this.nombre = nombre;
  }
}