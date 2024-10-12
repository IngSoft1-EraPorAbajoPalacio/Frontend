let WebSocketClient;

if (typeof window === 'undefined') {
  // Estamos en un entorno de pruebas
  WebSocketClient = require('ws');
} else {
  // Estamos en el navegador
  WebSocketClient = WebSocket;
}
const createSocketHome = () => {
  const WS_URL = 'ws://localhost:8000/ws';

  const socketHome = new WebSocketClient(WS_URL);

  socketHome.onopen = () => {
    console.log('WebSocket connection established for Home');
  };

  socketHome.onerror = (error: Event) => {
    console.error('WebSocket error for Home:', error);
  };

  socketHome.onclose = () => {
    console.log('WebSocket connection closed for Home');
  };
  
  return socketHome;
}

export default createSocketHome;