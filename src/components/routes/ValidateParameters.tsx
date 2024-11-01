import { Navigate, useParams } from 'react-router-dom';

interface ValidateParametersProps {
    paramNames: string[];
    children: React.ReactNode;
}


const ValidateParameters: React.FC<ValidateParametersProps> = ({ paramNames, children }) => {
    const params = useParams();

    for (const paramName of paramNames) {
        const paramValue = params[paramName];
        if (paramName === 'winnerName') {
            // Chequea que winnerName sea un string no vacio
            if (!paramValue || typeof paramValue !== 'string' || paramValue.trim() === '') {
                return <Navigate to='/*' />;
            }
        } else {
            // Para los demas parametros chequea que sean enteros positivos
            if (!paramValue || isNaN(Number(paramValue)) || Number(paramValue) <= 0) {
                return <Navigate to='/*' />;
            }
        }
    }

    return <>{children}</>;
};

export default ValidateParameters;