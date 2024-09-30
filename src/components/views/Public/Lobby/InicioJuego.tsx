
import  { obtenerJugador, obtenerPartida } from "../../../context/GameContext";
import { Paths } from "../../../../types/routes.types";
import { useNavigate } from 'react-router-dom';


export default function InicioJuego() {

  const idPartida = obtenerPartida()?.id;
  const idJugador = obtenerJugador()?.id;
  const navigate = useNavigate();

  const handleClick = () => {
    fetch(`http://127.0.0.1:8000/partida/${idPartida}/jugador/${idJugador}/iniciar-partida`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',  // Specify the content type
      }
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));

      navigate(Paths.Game);

  };

  return (
    <div>
    <button 
        onClick={handleClick}
        style= {{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            backgroundColor: '#ff1493',
            border: '#fff',
            borderRadius: '5px', 
            cursor: 'pointer',
            }}
    >
      Comenzar juego
    </button>
    </div>
  );
};

