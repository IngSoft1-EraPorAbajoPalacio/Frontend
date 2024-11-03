import { Coord, Figura } from "../../../../types/figura";
import definirFigMarcadas from "./DefinirFigMarcadas";
import DeclararFigura from "../../../hooks/Game/DeclararFigura";


export const handleSeleccionFigura = (
    coordFichaSelec: Coord,
    figurasDetectadas: Figura[],
    setFiguraSeleccionada: React.Dispatch<React.SetStateAction<number | null>>,
    setMarcaFiguras: React.Dispatch<React.SetStateAction<number[]>>,
    setMarcadasPorSelec: React.Dispatch<React.SetStateAction<number[]>>,
    setMovimientosJugados: React.Dispatch<React.SetStateAction<number>>,
    cartaFiguraDescarte: string | null,
    idPartida: number | undefined,
    idJugador: number | undefined
) => {
    const { marcarFicha, limpiarFigMarcadas } = definirFigMarcadas(setMarcaFiguras);

    let figuraSeleccionadaLocal: number | null = null;
    let fichasDeSeleccionLocal: number[] = [];
    let figuraGuardadaParaJuan: number = 0;

    // Busco la figura seleccionada en las figuras detectadas
    for (let figura of figurasDetectadas) {
        for (let coordenadas of figura.coordenadas) {
            if (coordFichaSelec.toString() === coordenadas.toString()) {
                figuraSeleccionadaLocal = figura.idFig;
                setFiguraSeleccionada(figuraSeleccionadaLocal);
                break;
            }
        }
        if (figuraSeleccionadaLocal !== null) break;
    }

    // Limpio las marcas de las fichas seleccionadas
    setMarcadasPorSelec([]);
    
    figurasDetectadas.forEach((fig: Figura) => {
        fig.coordenadas.forEach((coord: Coord) => {
            let numFichaCajon: number = coord[1] * 6 + coord[0];

            // No hay ninguna ficha perteneciente a una figura seleccionada
            if (figuraSeleccionadaLocal === null) limpiarFigMarcadas([]);
            
            // Si selecciono una figura marco unicamente esa
            else if (figuraSeleccionadaLocal !== null && fig.idFig === figuraSeleccionadaLocal) {
                fichasDeSeleccionLocal.push(numFichaCajon);
                marcarFicha(numFichaCajon);
                limpiarFigMarcadas(fichasDeSeleccionLocal);
                figuraGuardadaParaJuan = fig.tipoFig;
            }
        })
    });

    // Si hay una carta de figura descarte seleccionada, se juega la figura
    setMarcadasPorSelec(fichasDeSeleccionLocal);

    // Si hay una carta de figura descarte seleccionada, se juega la figura
    DeclararFigura(idPartida ?? null, idJugador ?? null, figuraGuardadaParaJuan, cartaFiguraDescarte, setMovimientosJugados);
};