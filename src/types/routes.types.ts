
enum Paths {
    Home = '/',
    Lobby = '/lobby',
    Game = '/game',
    End = '/end'
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