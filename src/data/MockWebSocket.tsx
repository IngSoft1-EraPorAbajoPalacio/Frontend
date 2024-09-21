import { Server } from "mock-socket";
import { urlBase } from "../services/url";


// Configura el servidor WebSocket simulado
export const mockServer = new Server(urlBase);

// Define el evento que quieres mockear
export const mockEvent = {
  type: "AgregarPartida",
  data: {
    "idPatida": 5,
    "nombrePartida": "Partida de prueba por ws",
    "cantJugadores": 3
  }
};