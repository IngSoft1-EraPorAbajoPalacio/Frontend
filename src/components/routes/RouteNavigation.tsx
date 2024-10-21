import { useNavigate } from "react-router-dom";

const useRouteNavigation = () => {
    const navigate = useNavigate();

    const redirectToHome = () => navigate(`/`);
    const redirectToLobby = (gameId: number, playerId: number) => navigate(`/lobby/${gameId}/player/${playerId}`);
    const redirectToGame = (gameId: number, playerId: number) => navigate(`/game/${gameId}/player/${playerId}`);
    const redirectToEnd = (gameId: number, playerId: number, winnerId: number, winnerName: string) => navigate(`/end/${gameId}/player/${playerId}/${winnerId}/${winnerName}`);
    const redirectToNotFound = () => navigate(`/*`);

    return {
        redirectToHome,
        redirectToLobby,
        redirectToGame,
        redirectToEnd,
        redirectToNotFound
    };
}

export default useRouteNavigation;