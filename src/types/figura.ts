export interface Figura{
    idFig: number,
    tipoFig: number;
    coordenadas: Array<[number, number]>;
};
export interface Figuras{
    figura: Array<Figura>;
};
export type Coord = [number, number];
