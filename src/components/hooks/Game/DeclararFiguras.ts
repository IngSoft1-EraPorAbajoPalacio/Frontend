import { useState } from "react"

export const [marcaFiguras, setMarcaFiguras] = useState<Array<number>>([]);

export const fichasMarcadas = (marcada : number) => {
    setMarcaFiguras(prevFigMarcadas => [...prevFigMarcadas, marcada]);
};

export const limpiarFigMarcadas = () => {
    setMarcaFiguras([]);
};