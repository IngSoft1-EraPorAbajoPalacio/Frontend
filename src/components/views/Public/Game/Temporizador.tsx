interface TemporizadorProps {
    temporizador: number;
}

const Temporizador: React.FC<TemporizadorProps> = ({ temporizador }) => {
    const tiempo = temporizador.toString();
    return (
        <div className="Temporizador">
            <h3>{"⏳" + tiempo[0] + ":" + tiempo[1] + tiempo[2] }</h3>
        </div>
    );
}

export default Temporizador;