export const actualizarCartaFigDescarte = (clave :string, cartaFiguraDescarte :string | null) => {
    const baseStyle: string = "Figura";
    const descarteStyle: string = baseStyle + "Selec";
    
    if(clave === cartaFiguraDescarte){
        return descarteStyle;    
    }else{
        return baseStyle;
    }
    
};

export const handleActualizarCartaFigDescarte = (clave : string, idJugador: number,
    cartaFiguraDescarte :string | null, setCartaFiguraDescarte: React.Dispatch<React.SetStateAction<string | null>>,
    turnoActual : number | null
)=>{
    if(turnoActual === idJugador){
        if(cartaFiguraDescarte === clave){ //Ya estaba seleccionada la carta
            setCartaFiguraDescarte(null); 
        } else{ //No estaba seleccionada, la seleccionamos
            setCartaFiguraDescarte(clave);
        }
    }
}