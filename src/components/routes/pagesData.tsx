import { routerType, Paths } from "../../types/routes.types";
import End from "../layouts/End";
import Home from '../layouts/Home';
import Game from '../layouts/Game';
import Lobby from "../layouts/Lobby";

const pagesData: routerType[] = [
    {
        path: Paths.Home,
        element: <Home/>,
        title: "home"
    },
    {
        path: Paths.Lobby,
        element: <Lobby/>,
        title: "lobby"
    },
    {
        path: Paths.Game,
        element: <Game/>,
        title: "game"
    },

    {
        path: Paths.End,
        element: <End/>,
        title: "end"
    }

];

export default pagesData;