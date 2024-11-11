import React from "react"
import { createRoot } from "react-dom/client"
import App from "./src/components/layouts/App"
import "./src/styles/index.css"
import { CartasProvider } from "./src/components/utils/Game/CartasBloqueadas"
import { Temporizador } from "./src/components/utils/Game/Temporizador"

createRoot(document.getElementById("root")!).render(
    <Temporizador>
        <CartasProvider>
            <App />
        </CartasProvider>
    </Temporizador>
)
