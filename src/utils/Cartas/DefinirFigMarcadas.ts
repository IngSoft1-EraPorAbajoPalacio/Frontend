const definirFigMarcadas = (setMarcaFiguras: React.Dispatch<React.SetStateAction<number[]>>) => {
    

    const fichasMarcadas = (marcada: number) => {
        setMarcaFiguras(prevFigMarcadas => [...prevFigMarcadas, marcada]);
    };

    const limpiarFigMarcadas = () => {
        setMarcaFiguras([]);
    };
    
    return {
        fichasMarcadas,
        limpiarFigMarcadas
    };
};

export default definirFigMarcadas;