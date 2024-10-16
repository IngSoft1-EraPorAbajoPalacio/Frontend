import { useState } from "react";
import { Coord, Figura } from "../../types/figura";
import definirFigMarcadas from "./DefinirFigMarcadas";


export const handleSeleccionFigura = (coordFichaSelec: Coord, figurasDetectadas: Figura[],
    setFiguraSeleccionada:React.Dispatch<React.SetStateAction<number | null>>,
    figuraSeleccionada: number | null,
    setMarcaFiguras: React.Dispatch<React.SetStateAction<number[]>>,
    marcadasPorSelec: number[], setMarcadasPorSelec: React.Dispatch<React.SetStateAction<number[]>>
) => {
    const { marcarFicha, limpiarFigMarcadas } = definirFigMarcadas(setMarcaFiguras);
    

    figurasDetectadas.forEach( (figura) =>{
        console.log(figura)
        figura.coordenadas.forEach((coordenadas)=>{
            if(coordFichaSelec === coordenadas){
                setFiguraSeleccionada(figura.tipoFig); // Seteo la figura seleccionada
                console.log(figura.tipoFig);
            }
        })
    })

    figurasDetectadas.forEach((fig: Figura) => {
        fig.coordenadas.forEach((coord: Coord) => {
            let numFichaCajon: number = coord[1] * 6 + coord[0];
            if (figuraSeleccionada === null) { // No hay ninguna ficha perteneciente a una figura seleccionada
                setMarcadasPorSelec([]);
            } else if (figuraSeleccionada !== null && fig.tipoFig === figuraSeleccionada) // Si selecciono una figura marco unicamente esa
            {
                setMarcadasPorSelec(prevFichasMarcadas => [...prevFichasMarcadas, numFichaCajon]); // Marco la ficha cajon de la seleccionada
                
            } else if (figuraSeleccionada !== null) {
                limpiarFigMarcadas(marcadasPorSelec); // Borrar todas las marcas excepto de la seleccionada
            }

        })
    });
};