export class Partida {
  id: number;
  nombre: string;
  cantJugadoresMin: number;
  cantJugadoresMax: number;
  
  constructor(id: number, nombre: string, cantJugadoresMin: number, cantJugadoresMax: number) {
    this.id = id;
    this.nombre = nombre;
    this.cantJugadoresMin = cantJugadoresMin;
    this.cantJugadoresMax = cantJugadoresMax;
  }
}