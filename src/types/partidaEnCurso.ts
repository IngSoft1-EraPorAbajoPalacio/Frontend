import { idJugadores, cantidadJugadores } from "./partidaListada";

export type movimiento = 'LíneaContiguo' | 'LíneaConUnEspacio' | 'DiagonalContiguo' | 'DiagonalConUnEspacio' | 'LDerechaConDosEspacios' | 'LIzquierdaConDosEspacios' | 'LíneaAlLateral';
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

    mover(x: posicion, y: posicion) {
        this.x = x;
        this.y = y;
    }

    getColor() {
        return this.color;
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

  constructor(id: number, movimiento: movimiento) {
    this.id = id;
    this.movimiento = movimiento;
  }
}

export class JugadorEnCurso {
  id: idJugadores;
  nombre: string;
  cartasFigura: CartaFigura[];
  cartasMovimiento: CartaMovimiento[]; // No es nulo para el jugador que guarda los datos
  enPartida: boolean; // Para ver si el jugador abandonó

  constructor(id: idJugadores, nombre: string, cartasFigura: CartaFigura[], cartasMovimiento: CartaMovimiento[], enPartida: boolean) {
    this.id = id;
    this.nombre = nombre;
    this.cartasFigura = cartasFigura;
    this.cartasMovimiento = cartasMovimiento;
    this.enPartida = enPartida;
  }
}

export class PartidaEnCurso {
  id: idJugadores;
  nombre: string;
  cantJugadores: cantidadJugadores;
  jugadores: JugadorEnCurso[];
  fichas: Ficha[];
  orden: idJugadores[];

  constructor(id: idJugadores, nombre: string, cantJugadores: cantidadJugadores, jugadores: JugadorEnCurso[], fichas: Ficha[], orden: idJugadores[]) {
    this.id = id;
    this.nombre = nombre;
    this.cantJugadores = cantJugadores;
    this.jugadores = jugadores;
    this.fichas = fichas;
    this.orden = orden;
  }
}