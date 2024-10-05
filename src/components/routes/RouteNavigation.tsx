// useRouteNavigation.ts
import { useNavigate, useParams } from "react-router-dom";

const useRouteNavigation = () => {
    const navigate = useNavigate();
    const params = useParams<{ gameId: string; playerId: string }>();

    const redirectToHome = () => navigate(`/`);
    const redirectToLobby = (gameId: number, playerId: number) => navigate(`/lobby/${gameId}/player/${playerId}`);
    const redirectToGame = (gameId: number, playerId: number) => navigate(`/game/${gameId}/player/${playerId}`);
    const redirectToEnd = (gameId: number, playerId: number) => navigate(`/end/${gameId}/player/${playerId}`);
    const redirectToNotFound = () => navigate(`/*`);

    const obtenerParametros = () => {
        const { gameId, playerId } = params;
        const numericgameId = Number(gameId);
        const numericplayerId = Number(playerId);
        if (isNaN(numericgameId) || isNaN(numericplayerId)) return redirectToNotFound();
        return { gameId: numericgameId, playerId: numericplayerId };
    }

    return {
        redirectToHome,
        redirectToLobby,
        redirectToGame,
        redirectToEnd,
        redirectToNotFound,
        obtenerParametros
    };
}

export default useRouteNavigation;