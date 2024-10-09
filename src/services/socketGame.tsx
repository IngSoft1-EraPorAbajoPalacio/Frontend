import { obtenerPartida } from "../components/context/GameContext";

let WebSocketClient;

if (typeof window === 'undefined') {
  // Estamos en un entorno de pruebas (Node.js)
  WebSocketClient = require('ws');
} else {
  // Estamos en el navegador
  WebSocketClient = WebSocket;
}
const partida = obtenerPartida();
const partidaId = partida.id;
const WS_URL = `ws://localhost:8000/ws/game/${partidaId}`;

const socket = new WebSocketClient(WS_URL);

socket.onopen = () => {
  console.log('WebSocket connection established');
};

socket.onerror = (error: Event) => {
  console.error('WebSocket error:', error);
};

socket.onclose = () => {
  console.log('WebSocket connection closed');
};

export default socket;