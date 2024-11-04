import { toast } from 'react-toastify';

// Estilo de las notificaciones
const defaultConfig: object = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: true,
  progress: undefined,
  theme: 'colored',
};

// Parámetros de las notificaciones
interface ToastParams {
  type?: 'success' | 'error' | 'info' | 'warning';
  message: string;
  autoClose?: number;
}

// Mostrar notificaciones
const showToast = ({ type, message, autoClose = 3000 }: ToastParams) => {
    const config = { ...defaultConfig, autoClose };

    switch (type) {
        case 'success': 
            toast.success(message, config);
            break;
        case 'error': 
            toast.error(message, config);
            break;
        case 'info': 
            toast.info(message, config);
            break;
        case 'warning': 
            toast.warn(message, config);
            break;
        default: 
            toast(message, config);
    }
};

export default showToast;
