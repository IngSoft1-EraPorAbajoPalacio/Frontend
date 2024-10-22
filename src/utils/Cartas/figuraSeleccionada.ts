import { Coord, Figura } from "../../types/figura";
import definirFigMarcadas from "./DefinirFigMarcadas";
import DeclararFigura from "../../components/hooks/Game/DeclararFigura";


export const handleSeleccionFigura = (coordFichaSelec: Coord, figurasDetectadas: Figura[],
    setFiguraSeleccionada: React.Dispatch<React.SetStateAction<number | null>>,
    setMarcaFiguras: React.Dispatch<React.SetStateAction<number[]>>,
    setMarcadasPorSelec: React.Dispatch<React.SetStateAction<number[]>>,
    cartaFiguraDescarte: string | null,
    idPartida: number | undefined,
    idJugador: number | undefined
) => {
    const { marcarFicha, limpiarFigMarcadas } = definirFigMarcadas(setMarcaFiguras);
    let figuraSeleccionadaLocal: number | null = null;
    let fichasDeSeleccionLocal: number[] = [];
    let figuraGuardadaParaJuan: number = 0;

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
    setMarcadasPorSelec([]); // Para que no se vayan acumulando las marcadas cada vez que se selecciona
    figurasDetectadas.forEach((fig: Figura) => {
        fig.coordenadas.forEach((coord: Coord) => {
            let numFichaCajon: number = coord[1] * 6 + coord[0];
            if (figuraSeleccionadaLocal === null) { // No hay ninguna ficha perteneciente a una figura seleccionada
                limpiarFigMarcadas([]);
            } else if (figuraSeleccionadaLocal !== null && fig.idFig === figuraSeleccionadaLocal) // Si selecciono una figura marco unicamente esa
            {
                fichasDeSeleccionLocal.push(numFichaCajon); // Agrego la ficha de cajón pertenecientes a la figura
                marcarFicha(numFichaCajon);
                limpiarFigMarcadas(fichasDeSeleccionLocal);
                figuraGuardadaParaJuan = fig.tipoFig;
            }
        })
    });
    setMarcadasPorSelec(fichasDeSeleccionLocal); // Marco las fichas cajon de la seleccionada

    DeclararFigura(idPartida ?? null, idJugador ?? null, figuraGuardadaParaJuan, cartaFiguraDescarte);
};