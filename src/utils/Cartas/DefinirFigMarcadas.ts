const definirFigMarcadas = (setMarcaFiguras: React.Dispatch<React.SetStateAction<number[]>>) => {
    

    const marcarFicha = (marcada: number) => {
        setMarcaFiguras(prevFigMarcadas => [...prevFigMarcadas, marcada]);
    };

    const limpiarFigMarcadas = (marcadasPorSelec: number[]) => {
        setMarcaFiguras(marcadasPorSelec);
    };
    
    return {
        marcarFicha,
        limpiarFigMarcadas
    };
};

export default definirFigMarcadas;