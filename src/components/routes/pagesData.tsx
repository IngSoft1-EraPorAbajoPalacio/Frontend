import { routerType, Paths } from "../../types/routes.types";
import Home from '../layouts/Home';
import CrearPartida from '../layouts/CrearPartida';
import UnirsePartida from '../layouts/UnirsePartida';

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