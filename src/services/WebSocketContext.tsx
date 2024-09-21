import { createContext, useContext, useState } from "react"
import { ReactNode } from "react";
import { urlBase } from "./url";

interface WebSocketContextType {
  event: string | null;
  initializeWebSocket: (id: any) => void;
}

export const WebSocketContext = createContext<WebSocketContextType | null>(null)

export function WebSocketProvider ({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [event, setEvent] = useState(null)

  const initializeWebSocket = (id: any) => {
    if (id) {
      const newSocket = new WebSocket(`${urlBase}/${id}`)
      setSocket(newSocket)

      newSocket.onopen = () => {
        console.log("Conexión de WebSocket abierta")
      }

      newSocket.onmessage = (e) => {
        console.log(e.data)
        setEvent(e.data)
      }

      newSocket.onclose = () => {
        console.log("Conexión de WebSocket cerrada")
        setSocket(new WebSocket(`${urlBase}/${id}`))
      }

      newSocket.onerror = (e) => {
        console.log("error", e)
      }
    }
  }

  return (
    <WebSocketContext.Provider value={{ event, initializeWebSocket }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  return useContext(WebSocketContext)
}