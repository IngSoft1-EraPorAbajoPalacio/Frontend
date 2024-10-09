let WebSocketClient;

if (typeof window === 'undefined') {
  // Estamos en un entorno de pruebas (Node.js)
  WebSocketClient = require('ws');
} else {
  // Estamos en el navegador
  WebSocketClient = WebSocket;
}
const createSocketHome = () => {
  const WS_URL = 'ws://localhost:8000/ws';

  const socketHome = new WebSocketClient(WS_URL);

  socketHome.onopen = () => {
    console.log('WebSocket connection established');
  };

  socketHome.onerror = (error: Event) => {
    console.error('WebSocket error:', error);
  };
  
  return socketHome;
}

export default createSocketHome;