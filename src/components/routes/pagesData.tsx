import { routerType, Paths } from "../../types/routes.types";
import Home from '../layouts/Home';
import CrearPartida from '../views/Public/CrearPartida';
import UnirsePartida from '../views/Public/UnirsePartida';

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
];

export default pagesData;