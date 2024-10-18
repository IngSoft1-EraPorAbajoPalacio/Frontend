import React from 'react';

type BusquedaPartidasProps = {
    busqueda: string;
    setBusqueda: React.Dispatch<React.SetStateAction<string>>;
    minPlayers: number;
    maxPlayers: number;
    setMinPlayers: React.Dispatch<React.SetStateAction<number>>;
    setMaxPlayers: React.Dispatch<React.SetStateAction<number>>;
};

const BusquedaPartidas: React.FC<BusquedaPartidasProps> = ({
    busqueda,
    setBusqueda,
    minPlayers,
    maxPlayers,
    setMinPlayers,
    setMaxPlayers,
}) => {

    const ajustarMin = (n: number) => {
        if (minPlayers + n >= 2 && minPlayers + n <= maxPlayers) {
            setMinPlayers(minPlayers + n);
        }
    };

    const ajustarMax = (n: number) => {
        if (maxPlayers + n >= minPlayers && maxPlayers + n <= 4) {
            setMaxPlayers(maxPlayers + n);
        }
    };

    return (
        <div className="filtrarPartidas">
            <input
                id='barraBusqueda'
                type="text"
                placeholder="Buscar partidas..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
            <div className="filtarJugs">
                <label><strong>Filtrar por cantidad de jugadores</strong></label>
                <div className="filtroJug">
                    <div className="filtroJugItem">
                        <label>Mín</label>
                        <div className="controlFiltro">
                            <button onClick={() => ajustarMin(-1)}>-</button>
                            <span>{minPlayers}</span>
                            <button onClick={() => ajustarMin(1)}>+</button>
                        </div>
                    </div>
                    <div className="filtroJugItem">
                        <label>Máx</label>
                        <div className="controlFiltro">
                            <button onClick={() => ajustarMax(-1)}>-</button>
                            <span>{maxPlayers}</span>
                            <button onClick={() => ajustarMax(1)}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default BusquedaPartidas;
