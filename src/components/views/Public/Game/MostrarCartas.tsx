import "../../../../styles/Game/Juego.css";
import { PartidaEnCurso, JugadorEnCurso, CartaMovimiento } from "../../../../types/partidaEnCurso";
import PasarTurno from "../../../hooks/Game/PasarTurno";
import { obtenerPartidaEnCurso } from "../../../context/GameContext";
import { SetStateAction, useState } from "react";
import { useParams } from "react-router-dom";

const EXT = ".svg";

interface MostrarFigurasProps{
    jugador: JugadorEnCurso;
    turnoActual: number | null;
    cartaFiguraDescarte: string | null;
    setCartaFiguraDescarte: React.Dispatch<React.SetStateAction<string | null>>;
};

export const MostrarFiguras : React.FC<MostrarFigurasProps> = 
({jugador, turnoActual, cartaFiguraDescarte, setCartaFiguraDescarte}) => {
    const PATH = "/figuras/fig";

    const { playerId } = useParams<{ playerId: string }>();
    const idJugador = Number(playerId);

    const claveCartaFigSeleccionada = (cartaFigNum : number, id :number) =>{
        const cartaFiguraUnica: string = cartaFigNum.toString() + id.toString();
        return cartaFiguraUnica;
    }
    
    const actualizarCartaFigDescarte = (clave :string) => {
        const baseStyle: string = "Figura";
        const descarteStyle: string = baseStyle + "Selec";
        
        if(clave === cartaFiguraDescarte){
            return descarteStyle;    
        }else{
            return baseStyle;
        }
        
    };

    const handleActualizarCartaFigDescarte = (clave : string)=>{
        if(turnoActual === idJugador){
            if(cartaFiguraDescarte === clave){ //Ya estaba seleccionada la carta
                setCartaFiguraDescarte(null); 
            } else{ //No estaba seleccionada, la seleccionamos
                setCartaFiguraDescarte(clave);
            }
        }
    }

    const cartasSrc: string[] = jugador.cartasFigura.map(carta => {
        if (carta.figura <= 9) return PATH + "0" + carta.figura + EXT;
        else if (carta.figura <= 25) return PATH + carta.figura + EXT;
        else {console.error("Error carta número");
            return "";}
    });

    return (
        <div className="ManoHorizontal">
            <h2 className={`${turnoActual !== null && jugador.id === turnoActual ? "JugadorEnTurno" : "NoTurno"}`}> {jugador.nombre} </h2>
            <div>
                {cartasSrc?.map((src: string | undefined, index: number) => 
                    <img key={index} className={actualizarCartaFigDescarte(claveCartaFigSeleccionada(index, jugador.id))} 
                        onClick={()=>handleActualizarCartaFigDescarte(claveCartaFigSeleccionada(index, jugador.id))} src={src}/>)}
            </div>
        </div>
    )
}

interface MostrarMovimientosProps {
    partida: PartidaEnCurso | null;
}

export function MostrarMovimientos({ partida }: MostrarMovimientosProps) {

    const jugadordado = partida?.jugadores.find((jugador: JugadorEnCurso) => jugador.cartasMovimiento.length === 3);
    const cartasSrc = jugadordado?.cartasMovimiento.map((carta: CartaMovimiento) => "/movimientos/mov" + carta.movimiento + EXT);  

    return (
        <div id='ManoJugador'>
            <button>Abandonar Partida</button>
            {jugadordado?.id === turnoActual ?
                <button onClick={handlePasarTurno}>Pasar Turno</button> :
                <button disabled>Pasar Turno</button>
            }
            <div className="ManoHorizontal">
                <div> 
                    {cartasSrc?.map((src: string | undefined, index: number) => (
                        <img key={index} className="Movimiento" src={src} alt="Movimiento" />
                    ))} 
                </div>
            </div>
        </div>
    );
}