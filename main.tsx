import React from "react"
import { createRoot } from "react-dom/client"
import App from "./src/components/layouts/App"
import "./src/styles/index.css"
import { CartasProvider } from "./src/components/utils/Game/CartasBloqueadas"
import { Temporizador } from "./src/components/utils/Game/Temporizador"
import { PartidaActiva } from "./src/components/utils/PartidaActiva"

createRoot(document.getElementById("root")!).render(
    <Temporizador>
        <CartasProvider>
            <PartidaActiva>
                <App />
            </PartidaActiva>
        </CartasProvider>
    </Temporizador>
)
