import '../../styles/App.css'

function App() {

  const nombrepartida = ['Partida 1', 'Partida 2', 'Partida 3', 'Partida 4'];
  const cantidadjugadores = ['2', '3', '4', '5'];

  return (
    <div id='home'>
      <div id='crear'>
        <button>
          Crear partida
        </button>
      </div>
      <div id='unirse'>
        <button className='partida-listada'>
            <p>{nombrepartida[0]} <br></br> jugadores: {cantidadjugadores[0]}</p>

          </button>
          <button className='partida-listada'>
            <p>{nombrepartida[1]} <br></br> jugadores: {cantidadjugadores[1]}</p>
          </button>

          <button className='partida-listada'>
            <p>{nombrepartida[2]} <br></br> jugadores: {cantidadjugadores[2]}</p>
          </button>

          <button className='partida-listada'>
            <p>{nombrepartida[3]} <br></br> jugadores: {cantidadjugadores[3]}</p>
          </button>
      </div>
    </div>
  )
}

export default App