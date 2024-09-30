import { routerType, Paths } from "../../types/routes.types";
import FinPartida from "../layouts/Finalizacion";
import Home from '../layouts/Home';
import Juego from '../layouts/Juego';
import Lobby from "../layouts/Lobby";

const pagesData: routerType[] = [
    {
        path: Paths.Home,
        element: <Home />,
        title: "home"
    },
    {
        path: Paths.Game,
        element: <Juego/>,
        title: "game"
    },
    {
        path: Paths.Lobby,
        element: <Lobby/>,
        title: "lobby"
    },
    {
        path: Paths.End,
        element: <FinPartida/>,
        title: "lobby"
    }

];

export default pagesData;