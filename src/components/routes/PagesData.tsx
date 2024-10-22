import { routerType, Paths } from "../../types/routes.types";
import End from "../layouts/End";
import Home from '../layouts/Home';
import Game from '../layouts/Game';
import Lobby from "../layouts/Lobby";
import ValidateParameters from "./ValidateParameters";

const pagesData: routerType[] = [
    {
        path: Paths.Home,
        element: <Home/>,
        title: "home"
    },
    {
        path: Paths.Lobby,
        element: (
                <Lobby/>
        ),
        title: "lobby"
    },
    {
        path: Paths.Game,
        element: (
            <ValidateParameters paramNames={['gameId', 'playerId']} >
                <Game/>
            </ValidateParameters>
        ),
        title: "game"
    },
    {
        path: Paths.End,
        element: (
            <ValidateParameters paramNames={['gameId', 'playerId']} >
                <End/>
            </ValidateParameters>
        ),
        title: "end"
    },
    {
        path: Paths.NotFound,
        element: <div className="NotFound">Not Found</div>,
        title: "not found"
    }
];

export default pagesData;