
class Jugador {
    id: number;
    nombre: string;
    isHost: boolean;
    
    constructor(id: number, nombre: string, isHost: boolean) { 
      this.id = id;
      this.nombre = nombre;
      this.isHost = isHost;
    }
}

export default Jugador;