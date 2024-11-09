interface TemporizadorProps {
    temporizador: number | null;
}

const Temporizador: React.FC<TemporizadorProps> = ({ temporizador }) => {

    if(temporizador === null) return null;  // Si el temporizador es null, no se muestra nada

    const minutos = Math.floor(temporizador / 60);
    const segundos = temporizador % 60;

    if(temporizador === null) return null;
    return (
        <div className="Temporizador">
            <h3>{ "⏳" + minutos.toString() + ":" + segundos.toString() }</h3>
        </div>
    );
}

export default Temporizador;