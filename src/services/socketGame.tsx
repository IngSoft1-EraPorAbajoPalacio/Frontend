import { obtenerJugador, obtenerPartida } from "../components/context/GameContext";

let WebSocketClient;

if (typeof window === 'undefined') {
  // Estamos en un entorno de pruebas
  WebSocketClient = require('ws');
} else {
  // Estamos en el navegador
  WebSocketClient = WebSocket;
}

const createSocketGame = (setDesconexionesGame: React.Dispatch<React.SetStateAction<number>>) => {

  const partida = obtenerPartida();
  const jugador = obtenerJugador();
  const jugadorId = jugador.id;
  const partidaId = partida.id;
  const WS_URL = 'ws://localhost:8000/ws/game/' + partidaId + "/jugador/"+ jugadorId;

  const socketGame = new WebSocketClient(WS_URL);

  socketGame.onopen = () => {
    console.log('WebSocket connection established for Game');
  };

  socketGame.onerror = (error: Event) => {
    console.error('WebSocket error for Game:', error);
  };

  socketGame.onclose = () => {
    console.log('WebSocket connection closed for Game');
    setTimeout(() => {
      setDesconexionesGame((prevDesconexionesGame) => prevDesconexionesGame + 1);
    }, 1000);
  };

  return socketGame;
}
export default createSocketGame;