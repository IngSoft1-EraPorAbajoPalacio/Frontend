import { Coord, Figura } from "../../types/figura";
import definirFigMarcadas from "./DefinirFigMarcadas";


export const handleSeleccionFigura = (coordFichaSelec: Coord, figurasDetectadas: Figura[],
    setFiguraSeleccionada:React.Dispatch<React.SetStateAction<number | null>>,
    setMarcaFiguras: React.Dispatch<React.SetStateAction<number[]>>,
    setMarcadasPorSelec: React.Dispatch<React.SetStateAction<number[]>>,
    cartaFiguraDescarte: string |null,
    gameId: string|undefined,
    playerId: string|undefined
) => {
    const { marcarFicha, limpiarFigMarcadas } = definirFigMarcadas(setMarcaFiguras);
    let figuraSeleccionadaLocal :number|null = null;
    let fichasDeSeleccionLocal: number[] =[];
    let fichasParaJuan : Coord[] = [];


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
            let numFichaCajon: number = coord[1]*6 + coord[0];
            if (figuraSeleccionadaLocal === null) { // No hay ninguna ficha perteneciente a una figura seleccionada
                limpiarFigMarcadas([]);
            } else if (figuraSeleccionadaLocal !== null && fig.idFig === figuraSeleccionadaLocal) // Si selecciono una figura marco unicamente esa
            {
                fichasDeSeleccionLocal.push(numFichaCajon); // Agrego la ficha de cajón pertenecientes a la figura
                fichasParaJuan.push(coord);
                marcarFicha(numFichaCajon);
                limpiarFigMarcadas(fichasDeSeleccionLocal);
            }
        })
    });
    setMarcadasPorSelec(fichasDeSeleccionLocal); // Marco las fichas cajon de la seleccionada


    const data = {
        idCarta: Number(cartaFiguraDescarte),
        fichas: fichasParaJuan
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };

    const asyncPost = async () => {
        try {
            
            const response = 
                await fetch('http://127.0.0.1:8000/partida/' + Number(gameId) + "/jugador/" + Number(playerId) + "/tablero/declarar-figura", options);
            if (response.status === 202) {
                console.log("EPICO")
            } else {
                throw new Error('Hubo un problema tratando de enviar figura a descartar.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    asyncPost();
};