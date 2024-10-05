import { Navigate, useParams } from 'react-router-dom';

interface ValidateParametersProps {
    paramNames: string[];
    children: React.ReactNode;
}

// Valida un parámetro de URL como un entero positivo
const ValidateParameters: React.FC<ValidateParametersProps> = ({ paramNames, children }) => {
    const params = useParams();

    for (const paramName of paramNames) {
        const paramValue = params[paramName];
        if (!paramValue || isNaN(Number(paramValue)) || Number(paramValue) <= 0)
            return <Navigate to='/*' />;
    }

    return <>{children}</>;
};

export default ValidateParameters;