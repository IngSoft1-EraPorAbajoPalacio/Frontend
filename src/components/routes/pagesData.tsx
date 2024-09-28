import { routerType, Paths } from "../../types/routes.types";
import Home from '../layouts/Home';
import CrearPartida from '../views/Public/CrearPartida';
import UnirsePartida from '../views/Public/UnirsePartida';
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
        path: Paths.Join,
        element: <UnirsePartida />,
        title: "join"
    },
    {
        path: Paths.Game,
        element: <Juego/>,
        title: "game"
    }
];

export default pagesData;