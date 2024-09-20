import '../../styles/App.css';

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

let partidaElegida = 0;

function SeleccionarPartida(id: number) {
  partidaElegida = id;
  console.log(partidaElegida);
};

function App() {

  return (
    <div id='home'>
      <div id='crear'>
        <button>
          Crear partida
        </button>
      </div>
      <div id='unirse'>
        {partidas.map((partida) => (
          <button className='partida-listada' onClick={() => SeleccionarPartida(partida.idPartida)}>
            <p>{partida.nombrePartida} <br></br> jugadores: {partida.cantJugadores}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;

// Ver para agregar muchas partidas y que se haga scroll (y que no afecte el boton de crear partida)
