let WebSocketClient;

if (typeof window === 'undefined') {
  // Estamos en un entorno de pruebas (Node.js)
  WebSocketClient = require('ws');
} else {
  // Estamos en el navegador
  WebSocketClient = WebSocket;
}

const WS_URL = 'ws://localhost:8000/ws';

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