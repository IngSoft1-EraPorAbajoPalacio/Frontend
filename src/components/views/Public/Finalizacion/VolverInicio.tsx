import { useNavigate } from 'react-router-dom';

export default function Inicioboton() {
   const navigate = useNavigate();

   const handleClick = () => {
      navigate('/');
   }

   return (
    <div>
        <button 
        onClick={handleClick}
        style= {{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 20px',
            backgroundColor: '#dc143c',
            border: '#fff',
            borderRadius: '5px',
            cursor: 'pointer',
            }}
    >
       Volver al inicio
    </button>
    </div>
   )
}