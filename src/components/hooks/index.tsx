import { useState } from 'react';

export const usePartida = () => {
    const [partidaElegida, setPartidaElegida] = useState<number | null>(null);
    const [partidaCreada, setPartidaCreada] = useState<boolean>(false);

    const seleccionarPartida = (id: number) => {    
        setPartidaElegida(id);
    };

    const seleccionarCrear = () => {
        setPartidaCreada(true);
    };

    return { partidaElegida, seleccionarPartida, partidaCreada, seleccionarCrear };
};