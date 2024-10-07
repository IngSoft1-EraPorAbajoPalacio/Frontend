const WebSocket = require('ws');
const WS_URL = 'ws://localhost:8000/ws';

const socket = new WebSocket(WS_URL);

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