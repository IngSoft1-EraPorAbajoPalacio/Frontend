import { obtenerPartida } from "../components/context/GameContext";

let WebSocketClient;

if (typeof window === 'undefined') {
  // Estamos en un entorno de pruebas (Node.js)
  WebSocketClient = require('ws');
} else {
  // Estamos en el navegador
  WebSocketClient = WebSocket;
}
const createSocketLobby = () => {
  const partida = obtenerPartida();
  const partidaId = partida.id;
  const WS_URL = `ws://localhost:8000/ws/lobby/${partidaId}`;

  const socketLobby = new WebSocketClient(WS_URL);

  socketLobby.onopen = () => {
    console.log('WebSocket connection established for Lobby');
  };

  socketLobby.onerror = (error: Event) => {
    console.error('WebSocket error for Lobby:', error);
  };

  socketLobby.onclose = () => {
    console.log('WebSocket connection closed for Lobby');
  };

  return socketLobby;
};

export default createSocketLobby;