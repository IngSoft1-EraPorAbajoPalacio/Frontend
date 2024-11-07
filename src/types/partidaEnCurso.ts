import { cantidadJugadores } from "./partidaListada";

export type movimiento = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type figura = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;
export type color = "Rojo" | "Azul" | "Verde" | "Amarillo";
export type posicion = 0 | 1 | 2 | 3 | 4 | 5;

export class Ficha {
    x: posicion;
    y: posicion;
    color: color;

    constructor(x: posicion, y: posicion, color: color) {
      this.x = x;
      this.y = y;
      this.color = color;
    }
}

export class fichasMovimiento {
  primerFicha: Ficha;
  segundaFicha: Ficha;

  constructor(primerFicha: Ficha, segundaFicha: Ficha) {
    this.primerFicha = primerFicha;
    this.segundaFicha = segundaFicha;
  }
}

export class CartaFigura {
  id: number;
  figura: number;

  constructor(id: number, figura: number) {
    this.id = id;
    this.figura = figura;
  }
}

export class CartaMovimiento {
  id: number;
  movimiento: movimiento;
  seleccionada: boolean;

  constructor(id: number, movimiento: movimiento) {
    this.id = id;
    this.movimiento = movimiento;
    this.seleccionada = false;
  }
}

export class JugadorEnCurso {
  id: number;
  nombre: string;
  enPartida: boolean; // Para ver si el jugador abandonó
  esGuardador: boolean; // Nueva propiedad para identificar al jugador que guarda los datos

  constructor(id: number, nombre: string, enPartida: boolean, esGuardador: boolean) {
    this.id = id;
    this.nombre = nombre;
    this.enPartida = enPartida;
    this.esGuardador = esGuardador;
  }
}

export class PartidaEnCurso {
  id: number;
  nombre: string;
  cantJugadores: cantidadJugadores;
  orden: number[];

  constructor(id: number, nombre: string, cantJugadores: cantidadJugadores, orden: number[]) {
    this.id = id;
    this.nombre = nombre;
    this.cantJugadores = cantJugadores;
    this.orden = orden;
  } 
}

export class Movimiento{
  carta: CartaMovimiento;
  primerFicha: Ficha;
  segundaFicha: Ficha;

  constructor(carta: CartaMovimiento, primerFicha: Ficha, segundaFicha: Ficha) {
    this.carta = carta;
    this.primerFicha = primerFicha;
    this.segundaFicha = segundaFicha;
  }
}