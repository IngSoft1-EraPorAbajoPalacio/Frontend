export class Partida {
  id: number;
  nombre: string;
  
  constructor(id: number, nombre: string) { 
    this.id = id;
    this.nombre = nombre;
  }
}

// Partidas de prueba
const partida1 : Partida = new Partida(1, 'Partida 1');
const partida2 : Partida = new Partida(2, 'Partida 2');
const partida3 : Partida = new Partida(3, 'Partida 3');
const partida4 : Partida = new Partida(4, 'partida 4');

export const partidas : Partida[] = [partida1, partida2, partida3, partida4];