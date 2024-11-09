import React from "react"
import { createRoot } from "react-dom/client"
import App from "./src/components/layouts/App"
import "./src/styles/index.css"
import { CartasProvider } from "./src/components/utils/Game/CartasBloqueadas"

createRoot(document.getElementById("root")!).render(
    <CartasProvider>
        <App />
    </CartasProvider>,
)
