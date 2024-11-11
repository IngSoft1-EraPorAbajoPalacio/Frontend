import { createContext, useContext, useState, ReactNode } from 'react';

interface CartasContextProps {
    bloquearCarta: (carta: number) => void;
    bloquearCartas: (cartas: number[]) => void;
    desbloquearCarta: (carta: number) => void;
    esCartaBloqueada: (carta: number) => boolean;
}

const CartasContext = createContext<CartasContextProps | undefined>(undefined);

export const CartasProvider = ({ children }: { children: ReactNode }) => {
    const [cartasBloqueadas, setCartasBloqueadas] = useState<number[]>([]);

    // Agrega una carta a la lista de cartas bloqueadas
    const bloquearCarta = (cartaId: number) => {
        setCartasBloqueadas(prev => [...prev, cartaId]);
    };

    // Resetea la lista de cartas bloqueadas
    const bloquearCartas = (cartasIds: number[]) => {
        setCartasBloqueadas(cartasIds);
    };

    // Elimina una carta de la lista de cartas bloqueadas
    const desbloquearCarta = (cartaId: number) => {
        setCartasBloqueadas(prev => prev.filter(id => id !== cartaId));
    };

    // Verifica si una carta está bloqueada
    const esCartaBloqueada = (cartaId: number) => {
        return cartasBloqueadas.includes(cartaId);
    };

    return (
        <CartasContext.Provider value={{ bloquearCarta, bloquearCartas, desbloquearCarta, esCartaBloqueada }}>
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