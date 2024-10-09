import React from "react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./src/components/layouts/App"
import "./src/styles/index.css"

createRoot(document.getElementById("root")!).render(
    <App />
)
