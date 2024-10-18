import definirFigMarcadas from "./DefinirFigMarcadas";
import { Coord, Figura, Figuras } from "../../types/figura"

const declararFiguras = (figurasJson: any, setMarcaFiguras: React.Dispatch<React.SetStateAction<number[]>>,
    setFigurasDetectadas: React.Dispatch<React.SetStateAction<Figura[]>>, figuraSeleccionada: number | null,
    marcadasPorSelec: number[], setMarcadasPorSelec: React.Dispatch<React.SetStateAction<number[]>>
) => {
    const { marcarFicha, limpiarFigMarcadas } = definirFigMarcadas(setMarcaFiguras);
    limpiarFigMarcadas(marcadasPorSelec);
/*
    const figuras: Figuras = {
        figura: [
            {
                idFig: 0
                tipoFig: 1,
                coordenadas: [
                    [1, 0],
                    [1, 1],
                    [2, 2]
                ]
            },
            {
                idFig:1
                tipoFig: 2,
                coordenadas: [
                    [3, 3],
                    [4, 4],
                    [5, 5]
                ]
            }
        ]
    };*/ //Harcodeado
    const figuras: Figuras = typeof figurasJson === 'string' ? JSON.parse(figurasJson) : figurasJson;

    setFigurasDetectadas([]); //Lo vacío para agregar las nuevas figuras detectadas
    figuras.figura.forEach((fig: Figura) => {
        setFigurasDetectadas(prevFiguras => [...prevFiguras, fig]); //Agrego las nuevas figuras detectadas
        fig.coordenadas.forEach((coord: Coord) => {

            let numFichaCajon: number = coord[1]*6 + coord[0] ;
            if (figuraSeleccionada === null) { // No hay ninguna ficha perteneciente a una figura seleccionada
                setMarcadasPorSelec([]);
                marcarFicha(numFichaCajon);
                console.log("figuraSeleccionada === null");
            } else if (figuraSeleccionada !== null && fig.tipoFig === figuraSeleccionada) // Si selecciono una figura marco unicamente esa
            {
                console.log("ENTROO figuraSeleccionada !== null && fig.tipoFig === figuraSeleccionada");
                setMarcadasPorSelec(prevFichasMarcadas => [...prevFichasMarcadas, numFichaCajon]); // Marco la ficha cajon de la seleccionada
                marcarFicha(numFichaCajon);
            } else if (figuraSeleccionada !== null) {
                limpiarFigMarcadas(marcadasPorSelec); // Borrar todas las marcas excepto de la seleccionada
                console.log("ENTROO figuraSeleccionada !== null")
            }

        })
    });
};

export default declararFiguras;