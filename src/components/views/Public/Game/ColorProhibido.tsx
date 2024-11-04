import "../../../../styles/Game/ColorProhibido.css";
import { color } from "../../../../types/partidaEnCurso";

interface ColorProhibidoProps {
    colorProhibido: color | null;
}

const ColorProhibido: React.FC<ColorProhibidoProps> = ({ colorProhibido }) => {
    return (
        <div className="colorProhibido">
            <h3>Color prohibido: </h3>
            {colorProhibido ?
                <button className={colorProhibido}></button> :
                <p>Ninguno</p>
            }
        </div>
    );
}

export default ColorProhibido;