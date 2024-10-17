import { Coord, Figura } from "../../types/figura";
import definirFigMarcadas from "./DefinirFigMarcadas";


export const handleSeleccionFigura = (coordFichaSelec: Coord, figurasDetectadas: Figura[],
    setFiguraSeleccionada:React.Dispatch<React.SetStateAction<number | null>>,
    setMarcaFiguras: React.Dispatch<React.SetStateAction<number[]>>,
    marcadasPorSelec: number[], setMarcadasPorSelec: React.Dispatch<React.SetStateAction<number[]>>
) => {
    const { marcarFicha, limpiarFigMarcadas } = definirFigMarcadas(setMarcaFiguras);
    let figuraSeleccionadaLocal :number|null = null;


    for (let figura of figurasDetectadas) {
        for (let coordenadas of figura.coordenadas) {
            if (coordFichaSelec.toString() === coordenadas.toString()) {
                figuraSeleccionadaLocal = figura.tipoFig;
                setFiguraSeleccionada(figuraSeleccionadaLocal);
                break;
            }
        }
        if (figuraSeleccionadaLocal !== null) break;
    }

    figurasDetectadas.forEach((fig: Figura) => {
        fig.coordenadas.forEach((coord: Coord) => {
            let numFichaCajon: number = coord[1] + coord[0]*6;
            if (figuraSeleccionadaLocal === null) { // No hay ninguna ficha perteneciente a una figura seleccionada
                setMarcadasPorSelec([]);
            } else if (figuraSeleccionadaLocal !== null && fig.tipoFig === figuraSeleccionadaLocal) // Si selecciono una figura marco unicamente esa
            {
                console.log("ESTA ES FACTO: "+ numFichaCajon);
                setMarcadasPorSelec(prevFichasMarcadas => [...prevFichasMarcadas, numFichaCajon]); // Marco la ficha cajon de la seleccionada
                marcarFicha(numFichaCajon);
            } else if (figuraSeleccionadaLocal !== null) {
                limpiarFigMarcadas(marcadasPorSelec); // Borrar todas las marcas excepto de la seleccionada
            }

        })
    });
};