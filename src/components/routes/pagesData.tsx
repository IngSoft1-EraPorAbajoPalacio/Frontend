import { routerType, Paths } from "../../types/routes.types";
import Home from '../layouts/Home';
import CrearPartida from '../views/Public/CrearPartida';
import Juego from '../layouts/Juego';

const pagesData: routerType[] = [
    {
        path: Paths.Home,
        element: <Home />,
        title: "home"
    },
    {
        path: Paths.Create,
        element: <CrearPartida />,
        title: "create"

    },
    {
        path: Paths.Game,
        element: <Juego/>,
        title: "game"
    }
];

export default pagesData;