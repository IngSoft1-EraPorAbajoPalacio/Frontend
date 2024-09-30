import NombrePartida from '../views/Public/Lobby/NombrePartida';
import InicioJuego from '../views/Public/Lobby/InicioJuego';
import ListarJugadores from '../views/Public/Lobby/ListarJugadores';
import { obtenerJugador, obtenerPartida } from "../context/GameContext";
import { useState } from 'react';
import Abandono from '../views/Public/Abandono/Abandono';


function Lobby () {

  const isHost = obtenerJugador()?.isHost;
  const minplayers = obtenerPartida()?.cantJugadoresMin;
  const [cantidadjugs, setCantidadJugs] = useState(1);

  function Incrementcant() {
    const x = cantidadjugs + 1;
    setCantidadJugs(x);
  }

  function Decrementcant() {
    const x = cantidadjugs - 1;
    setCantidadJugs(x);
  }
  
  return (
    <div>
      <NombrePartida />
      <ListarJugadores incrJugs={Incrementcant} decrJugs={Decrementcant} />
      {isHost && cantidadjugs >= minplayers && <InicioJuego />}
      {!isHost && <Abandono />}

    </div>
  )
}

export default Lobby