import { createContext, useContext, useState, ReactNode } from 'react';

interface CartasContextProps {
    bloquearCarta: (carta: number) => void;
    desbloquearCarta: (carta: number) => void;
    esCartaBloqueada: (carta: number) => boolean;
}

const CartasContext = createContext<CartasContextProps | undefined>(undefined);

export const CartasProvider = ({ children }: { children: ReactNode }) => {
    const [cartasBloqueadas, setCartasBloqueadas] = useState<number[]>([]);

    console.log('CartasBloqueadas');
    console.log(cartasBloqueadas);

    const bloquearCarta = (carta: number) => {
        setCartasBloqueadas(prev => [...prev, carta]);
    };

    const desbloquearCarta = (carta: number) => {
        setCartasBloqueadas(prev => prev.filter(id => id !== carta));
    };

    const esCartaBloqueada = (carta: number) => {
        return cartasBloqueadas.includes(carta);
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