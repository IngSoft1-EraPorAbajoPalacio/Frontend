import definirFigMarcadas from "./DefinirFigMarcadas";
import { Coord, Figura, Figuras } from "../../types/figura"

const declararFiguras = (figurasJson: any, setMarcaFiguras: React.Dispatch<React.SetStateAction<number[]>>) => {
    const { fichasMarcadas, limpiarFigMarcadas } = definirFigMarcadas(setMarcaFiguras);
    limpiarFigMarcadas();

    /*const figuras: Figuras = {
        figura: [
            {
                tipoFig: 1,
                coordenadas: [
                    [0, 0],
                    [1, 1],
                    [2, 2]
                ]
            },
            {
                tipoFig: 2,
                coordenadas: [
                    [3, 3],
                    [4, 4],
                    [5, 5]
                ]
            }
        ]
    };*/ //Harcodeado
    const figuras: Figuras = JSON.parse(figurasJson);

    figuras.figura.forEach((fig: Figura) => {
        fig.coordenadas.forEach((coord: Coord) => {
            let numFichaCajon: number = coord[1] * 6 + coord[0] + 1;
            fichasMarcadas(numFichaCajon);
        })
    });
};

export default declararFiguras;