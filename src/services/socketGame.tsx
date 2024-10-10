import { obtenerPartida } from "../components/context/GameContext";

let WebSocketClient;

if (typeof window === 'undefined') {
  // Estamos en un entorno de pruebas
  WebSocketClient = require('ws');
} else {
  // Estamos en el navegador
  WebSocketClient = WebSocket;
}

const createSocketGame = () => {

  const partida = obtenerPartida();
  const partidaId = partida.id;
  const WS_URL = 'ws://localhost:8000/ws/game/' + partidaId;

  const socketGame = new WebSocketClient(WS_URL);

  socketGame.onopen = () => {
    console.log('WebSocket connection established');
  };

  socketGame.onerror = (error: Event) => {
    console.error('WebSocket error:', error);
  };

  socketGame.onclose = () => {
    console.log('WebSocket connection closed');
  };

  return socketGame;
}
export default createSocketGame;