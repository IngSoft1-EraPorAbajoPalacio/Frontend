
enum Paths {
    Home = '/',
    Lobby = '/lobby/:gameId/player/:playerId',
    Game = '/game/:gameId/player/:playerId',
    End = '/end/:gameId/player/:playerId/winner/:winnerId/:winnerName',
    NotFound = '/*'
}

class routerType {
    path: Paths;
    element: JSX.Element;
    title: string;

    constructor(path: Paths, element: JSX.Element, title: string) {
        this.path = path;
        this.element = element;
        this.title = title;
    }
}

export { routerType, Paths };