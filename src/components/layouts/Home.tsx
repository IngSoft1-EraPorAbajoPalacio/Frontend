import '../../styles/Home.css';
import UnirsePartida from './UnirsePartida';
import CrearPartida from './CrearPartida';
import { useState } from 'react';

type CantidadJugadores = 2 | 3 | 4;

class Partida {
  idPartida: number;
  nombrePartida: string;
  cantJugadores: CantidadJugadores;
  
  constructor(idPartida: number, nombrePartida: string, cantJugadores: CantidadJugadores) { 
    this.idPartida = idPartida;
    this.nombrePartida = nombrePartida;
    this.cantJugadores = cantJugadores;
  }
}

const partida1 : Partida = new Partida(1, 'Partida 1', 2);
const partida2 : Partida = new Partida(2, 'Partida 2', 3);
const partida3 : Partida = new Partida(3, 'Partida 3', 4);
const partida4 : Partida = new Partida(4, 'Los mas kpos del condado', 4);

const partidas : Partida[] = [partida1, partida2, partida3, partida4];

const Home = () => {
  // Estado para controlar la partida seleccionada
  const [partidaElegida, setPartidaElegida] = useState<number | null>(null);
  const [partidaCreada, setPartidaCreada] = useState<boolean>(false);


  // Función para seleccionar una partida y actualizar el estado
  function SeleccionarPartida(id: number) {    
    setPartidaElegida(id);
  }

  // Función crear una partida
  function Crear() {
    setPartidaCreada(true);
  }

  // Componente para listar las partidas
  function ListarPartidas() {
    return (
      <div id='unirse'>
        {partidas.map((partida) => (
            <button
              key={partida.idPartida}
              className='partida-listada'
              onClick={() => SeleccionarPartida(partida.idPartida)}
            >
              <p>{partida.nombrePartida} <br></br> jugadores: {partida.cantJugadores}</p>
            </button>
        ))}
      </div>
    );
  }

  return (
    <>
      {!partidaElegida && !partidaCreada ? (
        <div id='home'>
          <div id='crear'>
            <button onClick={() => Crear()}>Crear partida</button>
          </div>
          <ListarPartidas />
        </div>
      ) : (
        partidaElegida ? <UnirsePartida /> : <CrearPartida />
      )}
    </>
  );
} 

export default Home;

// Ver para agregar muchas partidas y que se haga scroll (y que no afecte el boton de crear partida)
//Mejorar las importaciones de css
