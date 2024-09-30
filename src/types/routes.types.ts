
enum Paths {
    Home = '/',
    Create = '/create',
    Join = '/join',
    Lobby = '/lobby',
    Game = '/game',
    End = '/finpartida'
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