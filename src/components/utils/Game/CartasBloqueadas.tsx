import { createContext, useContext, useState, ReactNode } from 'react';

interface CartasContextProps {
    bloquearCarta: (carta: number) => void;
    desbloquearCarta: (carta: number) => void;
    esCartaBloqueada: (carta: number) => boolean;
}

const CartasContext = createContext<CartasContextProps | undefined>(undefined);

export const CartasProvider = ({ children }: { children: ReactNode }) => {
    const [cartasBloqueadas, setCartasBloqueadas] = useState<number[]>([]);

    const bloquearCarta = (cartaId: number) => {
        setCartasBloqueadas(prev => [...prev, cartaId]);
    };

    const desbloquearCarta = (cartaId: number) => {
        const nuevasCartasBloqueadas = cartasBloqueadas.filter(id => id !== cartaId);
        setCartasBloqueadas(nuevasCartasBloqueadas);
    };

    const esCartaBloqueada = (cartaId: number) => {
        return cartasBloqueadas.includes(cartaId);
    };

    return (
        <CartasContext.Provider value={{ bloquearCarta, desbloquearCarta, esCartaBloqueada }}>
            {children}
        </CartasContext.Provider>
    );
};

export const useCartas = () => {
    const context = useContext(CartasContext);
    if (!context) {
        throw new Error('useCartas debe ser usado dentro de un CartasProvider');
    }
    return context;
};