export const actualizarCartaFigDescarte = (clave :string | undefined, cartaFiguraDescarte :string | null) => {
    const baseStyle: string = "Figura";
    const descarteStyle: string = baseStyle + "Selec";
    
    if(clave === cartaFiguraDescarte) return descarteStyle;    
    return baseStyle;
};

export const handleActualizarCartaFigDescarte = (
    clave : string,
    idJugador: number,
    cartaFiguraDescarte :string | null,
    setCartaFiguraDescarte: React.Dispatch<React.SetStateAction<string | null>>,
    turnoActual : number | null
)=>{
    if(turnoActual === idJugador){
        if(cartaFiguraDescarte === clave) setCartaFiguraDescarte(null); //Ya estaba seleccionada la carta
        else setCartaFiguraDescarte(clave); //No estaba seleccionada, la seleccionamos
    }
}