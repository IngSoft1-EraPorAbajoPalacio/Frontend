interface TemporizadorProps {
    temporizador: string | null;
}

const Temporizador: React.FC<TemporizadorProps> = ({ temporizador }) => {
    if(temporizador === null) return null;
    return (
        <div className="Temporizador">
            <h3>{"⏳" + temporizador[0] + ":" + temporizador[1] + temporizador[2] }</h3>
        </div>
    );
}

export default Temporizador;