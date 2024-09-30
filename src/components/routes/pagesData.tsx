import { routerType, Paths } from "../../types/routes.types";
import Home from '../layouts/Home';
import Juego from '../layouts/Juego';

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
    }
    // {
    //     path: Paths.Lobby,
    //     element: <Lobby/>,
    //     title: "lobby"
    // }
];

export default pagesData;